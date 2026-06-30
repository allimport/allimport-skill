---
name: bundle-analyzer
description: Use when a JS/TS app's bundle is too large and needs to be reduced. Identifies heavy dependencies, duplicate code, and unused exports, then applies splitting/tree-shaking fixes.
---

# Bundle Analyzer

## When to use
- Build output warns about large chunks
- User asks to reduce bundle size or improve load time caused by JS weight

## Process
1. **Generate a visual breakdown** — `webpack-bundle-analyzer`, `source-map-explorer`, or framework-native (`next build` stats, `vite-bundle-visualizer`).
2. **Find the biggest offenders** — look for: duplicate versions of the same package, large libraries used for a tiny feature (e.g. moment.js for one date format), unused exports pulled in by barrel files.
3. **Apply fixes**:
   - Replace heavy libs with lighter alternatives (date-fns vs moment, native fetch vs axios when simple)
   - Dynamic `import()` for routes/components not needed on first load
   - Tree-shake by importing named exports directly, avoid `import * as`
   - Dedupe via lockfile resolution or package manager overrides
4. **Re-run the analyzer** and compare total bundle size and largest chunk.

## Checklist
- [ ] Before/after bundle size reported
- [ ] No duplicate package versions remain
- [ ] Code-split routes load on demand, verified in network tab
