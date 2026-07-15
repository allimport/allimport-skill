"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Screen-space composite for the logo colour reaction.
 *
 * The effect is a COMPOSITION, not a material/lighting change: the logo is
 * rendered to its own target (RT_LOGO, RGB = colour, A = mask) via a
 * dedicated layer, and a fullscreen pass will later recolour it toward
 * cyan only where the fluid's dye covers it. Nothing touches the solver,
 * the PBR material, the bloom or the background.
 *
 * ETAPA 1: RT_LOGO only. Renders the logo-layer to the target and exposes
 * a coverage probe so the target can be verified before anything is drawn
 * to screen.
 */

/** Objects on this layer are the ones the mask render captures. The logo
 *  letters enable it (in addition to layer 0) so the main render is
 *  unaffected. */
export const LOGO_LAYER = 2;

export default function CompositePass() {
  const { gl, scene, camera } = useThree();

  const rtLogo = useMemo(
    () =>
      new THREE.WebGLRenderTarget(2, 2, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
      }),
    [],
  );

  useEffect(() => () => rtLogo.dispose(), [rtLogo]);

  useFrame(() => {
    const ctx = gl.getContext();
    const w = ctx.drawingBufferWidth;
    const h = ctx.drawingBufferHeight;
    if (rtLogo.width !== w || rtLogo.height !== h) rtLogo.setSize(w, h);

    // Render ONLY the logo layer to RT_LOGO (RGB = colour, A = coverage).
    const prevMask = camera.layers.mask;
    const prevTarget = gl.getRenderTarget();
    const prevClearAlpha = gl.getClearAlpha();
    const prevClearColor = new THREE.Color();
    gl.getClearColor(prevClearColor);

    camera.layers.set(LOGO_LAYER);
    gl.setRenderTarget(rtLogo);
    gl.setClearColor(0x000000, 0);
    gl.clear(true, true, false);
    gl.render(scene, camera);

    gl.setRenderTarget(prevTarget);
    gl.setClearColor(prevClearColor, prevClearAlpha);
    camera.layers.mask = prevMask;
  }, 4);

  return null;
}
