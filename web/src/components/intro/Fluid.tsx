"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, clamp01 } from "./timeline";
import { useIntroClock } from "./Scene";
import { CENTER_Y } from "./Emblem";

/**
 * Fluid — polished-obsidian energy field behind the logo.
 *
 * Not smoke, water, fire, or fog: the void itself, slightly deformed. A
 * single quad, domain-warped fbm (coords bent by a second noise → organic,
 * never a repeating texture, never a nameable shape). It breathes in place
 * (no lateral drift) and stays radially confined to ~50% of the logo width,
 * centered — never covers letters, never crosses the bolt (it sits behind).
 *
 * Base is near-black, a hair above the background — visible only where
 * internal energy passes, as tiny cells of cold white OR electric cyan
 * (never both, never saturated). The pointer only injects a brief phase
 * kick into the internal pattern (decays < 1s); it never follows the cursor
 * or the logo. The logo stays the protagonist.
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
  uniform float uKick;     // pointer-speed perturbation, decays < 1s
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

    // Radial confinement: concentrated at the logo center, soft edges.
    float d = length(uv * vec2(1.2, 1.9));
    float mask = smoothstep(0.5, 0.06, d);
    if (mask < 0.004) discard;

    // Breathing warp: coordinates bent by a slow in-place noise field.
    float br = 0.5 + 0.5 * sin(uTime * 0.15);
    vec2 q = vec2(
      fbm(uv * 2.4 + vec2(0.0, uTime * 0.03)),
      fbm(uv * 2.4 + vec2(5.2, -uTime * 0.025))
    );
    float warp = fbm(uv * 2.6 + q * (1.1 + 0.25 * br) + uKick * 0.6);

    // Base: near-black obsidian, a hair above the void.
    vec3 base = vec3(0.010, 0.016, 0.024) * mask;

    // Internal energy: tiny cells that resolve to cold white OR cyan,
    // never both. A slow selector decides which per region.
    float cell = smoothstep(0.58, 0.74, warp);
    float sel = fbm(uv * 1.6 + vec2(uTime * 0.02, 0.0)); // white<->cyan chooser
    vec3 white = vec3(0.6, 0.68, 0.78);
    vec3 cyan  = vec3(0.0, 0.62, 0.68);
    vec3 energy = mix(cyan, white, smoothstep(0.45, 0.62, sel));
    float amt = cell * mask * (0.16 + 0.06 * br + uKick * 0.14);

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
  const prev = useRef({ x: 0, y: 0 });
  const kick = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uKick: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;

    // Pointer speed → brief internal perturbation, fast up / slow decay.
    const dx = pointer.x - prev.current.x;
    const dy = pointer.y - prev.current.y;
    prev.current.x = pointer.x;
    prev.current.y = pointer.y;
    const speed = Math.hypot(dx, dy) / Math.max(dt, 1e-4);
    const target = clamp01(speed * 0.25);
    kick.current += (target - kick.current) * (target > kick.current ? 0.4 : 0.06);

    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uKick.value = kick.current;
    mat.current.uniforms.uReveal.value = seg(t, BEATS.boltOn);
  });

  return (
    <mesh position={[0, CENTER_Y, -1.2]}>
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
