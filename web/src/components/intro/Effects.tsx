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
    <EffectComposer multisampling={mobile ? 0 : 4} resolutionScale={mobile ? 0.65 : 0.75}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
    </EffectComposer>
  );
}
