---
name: lazy-loading
description: Use when deferring the load of images, components, or routes to reduce initial page weight and speed up first render.
---

# Lazy Loading

## When to use
- Initial bundle/page load includes content not needed immediately
- User wants faster first paint without removing functionality

## Process
1. **Images** — `loading="lazy"` for below-the-fold images; never lazy-load the LCP element.
2. **Components** — dynamic `import()` / framework lazy APIs (`React.lazy`, `defineAsyncComponent`, `lazy()` in Solid) for heavy or rarely-used components (modals, charts, editors).
3. **Routes** — route-based code splitting so each page only loads its own JS.
4. **Third-party scripts** — load on interaction or after main content (`requestIdleCallback`, load-on-scroll, or facade pattern for embeds like YouTube).
5. **Add loading states** — skeleton/placeholder so layout doesn't shift when the lazy content arrives (pairs with CLS prevention).

## Checklist
- [ ] Above-the-fold/critical content loads eagerly
- [ ] Lazy boundaries have a placeholder sized to avoid layout shift
- [ ] Verified via network tab that deferred resources actually load later, not all upfront
