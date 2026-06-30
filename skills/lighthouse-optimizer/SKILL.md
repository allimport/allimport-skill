---
name: lighthouse-optimizer
description: Use when a page or app needs a higher Lighthouse score across Performance, Accessibility, Best Practices, and SEO. Audits the report and applies targeted fixes for the lowest-scoring categories.
---

# Lighthouse Optimizer

## When to use
- User asks to "improve Lighthouse score" or shares a Lighthouse/PageSpeed report
- Before a launch, to catch easy wins across all four categories
- After a perf regression is suspected

## Process
1. **Run/read the report** — get scores for Performance, Accessibility, Best Practices, SEO. If no report exists, run `lighthouse <url> --view` or use Chrome DevTools Lighthouse panel.
2. **Triage by weight** — Performance audits are weighted (LCP, TBT, CLS matter most); fix the highest-weight failing audits first.
3. **Apply fixes per category**:
   - Performance: defer non-critical JS, preconnect/preload key resources, compress images, eliminate render-blocking CSS
   - Accessibility: add alt text, form labels, color contrast, ARIA roles
   - Best Practices: fix console errors, use HTTPS, avoid deprecated APIs
   - SEO: meta description, viewport tag, valid `robots.txt`, crawlable links
4. **Re-run** the audit and confirm score deltas before/after.

## Checklist
- [ ] Performance score and Core Web Vitals reported separately
- [ ] No regressions introduced in other categories
- [ ] Fixes verified with a second Lighthouse run, not just code inspection
