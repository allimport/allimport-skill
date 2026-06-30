---
name: core-web-vitals
description: Use when diagnosing or fixing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), or Cumulative Layout Shift (CLS) issues on a web page.
---

# Core Web Vitals

## When to use
- Field or lab data shows poor LCP, INP, or CLS
- User reports a "slow" or "janky" page and you need to pinpoint which metric is failing

## Process
1. **Identify the failing metric** — check PageSpeed Insights, CrUX, or `web-vitals` JS library output.
2. **LCP (target < 2.5s)**:
   - Preload the LCP image/font, avoid lazy-loading it
   - Reduce server response time (TTFB), use a CDN
   - Remove render-blocking CSS/JS above the fold
3. **INP (target < 200ms)**:
   - Break up long JS tasks (`setTimeout`/`scheduler.yield`)
   - Reduce main-thread work from third-party scripts
   - Debounce expensive event handlers
4. **CLS (target < 0.1)**:
   - Set explicit `width`/`height` or `aspect-ratio` on images/embeds
   - Reserve space for ads/dynamic content
   - Avoid inserting content above existing content without user interaction
5. **Re-measure** in the field (CrUX/RUM) since lab tools can miss real-world variance.

## Checklist
- [ ] Each metric measured before and after the fix
- [ ] Fix targets the actual bottleneck (not a guess)
- [ ] No new layout shift introduced by the fix itself
