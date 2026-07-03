"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/**
 * Single post pass: selective bloom. Only emissive surfaces (bolt, brackets,
 * strike flash) cross the luminance threshold — the white ring and the
 * background stay clean. `mipmapBlur` keeps the pass cheap on mobile.
 */
export default function Effects({ mobile }: { mobile: boolean }) {
  return (
    <EffectComposer multisampling={0} resolutionScale={mobile ? 0.5 : 0.75}>
      <Bloom
        intensity={0.75}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.2}
        mipmapBlur
      />
    </EffectComposer>
  );
}
