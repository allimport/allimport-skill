---
name: image-optimization
description: Use when images on a page are too heavy, wrong format, not responsive, or not lazy-loaded. Picks the right format, size, and loading strategy per image.
---

# Image Optimization

## When to use
- Lighthouse/PageSpeed flags "properly size images" or "serve images in next-gen formats"
- Page weight is dominated by images

## Process
1. **Audit current images** — format, dimensions vs displayed size, file size.
2. **Pick the right format**: AVIF/WebP for photos with PNG/JPEG fallback; SVG for icons/logos; avoid GIF for anything but tiny animations (use video instead).
3. **Resize to actual display size** — never ship a 4000px image into a 400px container; use `srcset`/`sizes` or a framework image component (`next/image`, Astro `<Image>`).
4. **Lazy-load below the fold** — `loading="lazy"`, but keep the LCP image eager and preloaded.
5. **Compress** — run through `sharp`, `squoosh`, or build-time image pipelines; target visually lossless compression.

## Checklist
- [ ] Modern format with fallback in place
- [ ] Responsive `srcset`/`sizes` or framework image component used
- [ ] LCP image is NOT lazy-loaded; everything else below the fold is
- [ ] File sizes reduced without visible quality loss
