"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Fluid — white ink trail that follows the hand (reference: statue.mp4).
 *
 * A viewport-sized quad behind the logo renders a metaball field built
 * from the last N pointer positions: as the cursor / finger moves, a
 * soft-edged white ink blob appears under it, SMEARS along the path
 * (consecutive blobs fuse into one elongated body), wobbles organically
 * (fbm), and each sample dissolves in under a second — exactly the
 * ink-in-water behaviour of the reference. At rest nothing is drawn.
 *
 * Trail points live in a fixed ring buffer uploaded as a uniform array —
 * no allocations per frame, no textures, no ping-pong FBOs.
 */

const N = 24;
/** Seconds for a trail sample to dissolve completely. */
const LIFE = 0.85;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  #define N ${N}
  uniform vec3 uTrail[N];  // xy = position (aspect-corrected NDC), z = strength 0..1
  uniform float uTime;
  uniform float uAspect;
  uniform float uReveal;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
               mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.0, a=0.5;
    for(int i=0;i<3;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=0.5; }
    return v;
  }

  void main(){
    // Aspect-corrected space so blobs stay round on any viewport.
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;

    // Metaball field: gaussian per trail sample. Older samples are weaker
    // and slightly wider — the ink relaxes as it dissolves.
    float field = 0.0;
    float fOff = 0.0; // same field, sampled toward the light — for volume
    vec2 L = vec2(-0.016, 0.022);
    for (int i = 0; i < N; i++) {
      vec3 tp = uTrail[i];
      if (tp.z <= 0.001) continue;
      float r = 0.055 + 0.07 * (1.0 - tp.z);
      vec2 d = p - tp.xy;
      field += tp.z * exp(-dot(d, d) / (r * r));
      vec2 d2 = p + L - tp.xy;
      fOff += tp.z * exp(-dot(d2, d2) / (r * r));
    }

    // Organic wobble: the ink's edge is never a clean circle.
    field *= 0.8 + 0.45 * fbm(p * 5.0 + uTime * 0.35);

    // Soft threshold → ink body with a translucent halo.
    float body = smoothstep(0.32, 1.15, field);
    float halo = smoothstep(0.10, 0.55, field) * 0.22;
    float ink = min(body + halo, 1.0);
    if (ink < 0.004) discard;

    // Volume: the offset sample acts as a light probe — the side facing
    // the key light brightens, the far side falls into its own shadow.
    float relief = clamp((fOff - field) * 2.2, -0.45, 0.6);
    float shade = 0.78 + relief;

    // Cold white with the faintest cyan breath at the edges.
    vec3 col = mix(vec3(0.35, 0.85, 0.9), vec3(0.94, 0.97, 1.0), body) * shade;
    gl_FragColor = vec4(col * ink * uReveal, ink * uReveal);
  }
`;

export default function Fluid() {
  const clock = useIntroClock();
  const { pointer, viewport, camera } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const prev = useRef({ x: 10, y: 10 });
  // Ring buffer: [x, y, age] per sample; age < 0 = empty slot.
  const trail = useRef(
    Array.from({ length: N }, () => ({ x: 0, y: 0, age: -1 })),
  );
  const head = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTrail: { value: Array.from({ length: N }, () => new THREE.Vector3()) },
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);

    // Record a sample whenever the pointer moved as a continuous gesture.
    // Large jumps (finger lift resets to center, cursor re-entering the
    // window elsewhere) are teleports, not strokes — no ink for those.
    const dx = pointer.x - prev.current.x;
    const dy = pointer.y - prev.current.y;
    const step = Math.hypot(dx, dy);
    if (inter > 0 && step > 0.004 && step < 0.35) {
      const s = trail.current[head.current];
      s.x = pointer.x;
      s.y = pointer.y;
      s.age = 0;
      head.current = (head.current + 1) % N;
    }
    prev.current.x = pointer.x;
    prev.current.y = pointer.y;

    // Age + upload. Strength eases out so the ink dissolves smoothly.
    const aspect = viewport.width / viewport.height;
    const arr = uniforms.uTrail.value as THREE.Vector3[];
    for (let i = 0; i < N; i++) {
      const s = trail.current[i];
      if (s.age >= 0) s.age += dt;
      const k = s.age < 0 ? 0 : Math.max(0, 1 - s.age / LIFE);
      arr[i].set(s.x * aspect, s.y, k * k * inter);
    }

    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uAspect.value = aspect;
    mat.current.uniforms.uReveal.value = seg(t, BEATS.boltOn);

    // Fill the camera's view at this depth — the ink can appear anywhere
    // the hand goes, like the reference.
    const dist = camera.position.z - mesh.current.position.z;
    const h =
      2 * dist * Math.tan((((camera as THREE.PerspectiveCamera).fov ?? 42) * Math.PI) / 360);
    mesh.current.scale.set(h * aspect, h, 1);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 1.15]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
