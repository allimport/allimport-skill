"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/**
 * Single post pass: selective bloom. In the void ONLY the bolt (and its
 * halo) emit — the black-metal letters and the background never cross the
 * threshold. Intensity restrained: controlled emission, not neon.
 */
export default function Effects({ mobile }: { mobile: boolean }) {
  return (
    // MSAA 4 on desktop: jagged letter edges are the #1 "WebGL demo" tell.
    <EffectComposer multisampling={mobile ? 0 : 4} resolutionScale={mobile ? 0.5 : 0.75}>
      <Bloom
        intensity={0.65}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
    </EffectComposer>
  );
}
