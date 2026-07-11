"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, clamp01 } from "./timeline";
import { useIntroClock } from "./Scene";
import { CENTER_Y } from "./Emblem";

/**
 * Fluid — white energy field that answers the hand (owner request).
 *
 * A single quad, domain-warped fbm. At rest it is almost invisible — a
 * faint breathing in the void. When the pointer / finger MOVES, the field
 * wakes: cold white energy cells bloom, the whole body trails the cursor
 * with lag, and the noise field is smeared along the motion direction so
 * it visibly DEFORMS with the gesture. When the hand stops, the energy
 * decays smoothly (~1.5 s) back to rest. Sits behind the logo (additive,
 * no depth write) — the logo remains the protagonist.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;   // intro fade-in
  uniform float uKick;     // pointer speed, fast attack / slow decay
  uniform vec2  uVel;      // smoothed pointer velocity (deform direction)
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
    for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.02+vec2(3.1,1.7); a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv - 0.5;

    // Radial confinement — expands a little while energized.
    float d = length(uv * vec2(1.2, 1.9));
    float mask = smoothstep(0.52 + uKick * 0.10, 0.05, d);
    if (mask < 0.004) discard;

    // Breathing warp + directional smear: coordinates are dragged along
    // the motion vector, so the pattern visibly deforms with the gesture.
    float br = 0.5 + 0.5 * sin(uTime * 0.15);
    vec2 smear = uVel * (1.4 * uKick);
    vec2 q = vec2(
      fbm(uv * 2.4 - smear + vec2(0.0, uTime * 0.05)),
      fbm(uv * 2.4 - smear * 0.6 + vec2(5.2, -uTime * 0.04))
    );
    float warp = fbm(uv * 2.6 + q * (1.1 + 0.6 * uKick + 0.25 * br) - smear);

    // Base: near-black obsidian, a hair above the void.
    vec3 base = vec3(0.010, 0.016, 0.024) * mask;

    // Energy cells: cold white, with a cyan fringe chosen per region.
    float cell = smoothstep(0.52 - uKick * 0.10, 0.72, warp);
    float sel = fbm(uv * 1.6 + vec2(uTime * 0.02, 0.0));
    vec3 white = vec3(0.85, 0.92, 1.0);
    vec3 cyan  = vec3(0.05, 0.72, 0.78);
    vec3 energy = mix(cyan, white, smoothstep(0.4, 0.6, sel));

    // Rest: whisper. Motion: bloom — the fluid APPEARS with the hand.
    float amt = cell * mask * (0.05 + 0.04 * br + 0.85 * uKick);

    vec3 col = base + energy * amt;
    float a = (max(col.r, max(col.g, col.b)) ) * uReveal;
    if (a < 0.003) discard;
    gl_FragColor = vec4(col * uReveal, a);
  }
`;

export default function Fluid() {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const prev = useRef({ x: 0, y: 0 });
  const kick = useRef(0);
  const vel = useRef(new THREE.Vector2());
  const follow = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uKick: { value: 0 },
      uVel: { value: new THREE.Vector2() },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;

    // Pointer speed → energy. Fast attack, ~1.5 s smooth decay.
    const dx = pointer.x - prev.current.x;
    const dy = pointer.y - prev.current.y;
    prev.current.x = pointer.x;
    prev.current.y = pointer.y;
    const speed = Math.hypot(dx, dy) / Math.max(dt, 1e-4);
    const target = clamp01(speed * 0.4);
    kick.current += (target - kick.current) * (target > kick.current ? 0.5 : 0.035);

    // Smoothed motion direction for the shader's deformation smear.
    vel.current.x += (dx / Math.max(dt, 1e-4) * 0.25 - vel.current.x) * 0.12;
    vel.current.y += (dy / Math.max(dt, 1e-4) * 0.25 - vel.current.y) * 0.12;

    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uKick.value = kick.current;
    (mat.current.uniforms.uVel.value as THREE.Vector2)
      .set(vel.current.x, vel.current.y)
      .clampLength(0, 1);
    mat.current.uniforms.uReveal.value = seg(t, BEATS.boltOn);

    // The fluid trails the cursor — a following energy field, gated by
    // settle so it only tracks once the logo is assembled.
    const inter = seg(t, BEATS.settle);
    const f = follow.current;
    f.x += (pointer.x * 3.2 * inter - f.x) * 0.06;
    f.y += (pointer.y * 2.0 * inter - f.y) * 0.06;
    mesh.current.position.set(f.x, CENTER_Y + f.y, -1.2);
  });

  return (
    <mesh ref={mesh} position={[0, CENTER_Y, -1.2]}>
      <planeGeometry args={[4.4, 2.6]} />
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
