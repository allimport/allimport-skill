---
name: continuous-improvement
description: Use when a recurring task should get better over time by tracking outcomes from past runs and adjusting the approach, rather than repeating the same process blindly.
---

# Continuous Improvement

## When to use
- A task repeats regularly (recurring report, recurring code-review pass, recurring deploy check)
- Past runs revealed friction or recurring failure patterns worth not repeating

## Process
1. **Record outcomes** of each run — what worked, what failed, what took longer than expected.
2. **Look for patterns** across runs, not just the most recent one — a single bad run is noise, a repeated failure mode is signal.
3. **Adjust the process**, not just the output — fix the step that keeps causing the problem.
4. **Keep changes incremental** — one adjustment at a time so you can tell what caused the improvement.
5. **Avoid overfitting to one run** — don't rewrite the whole process because of a single edge case.

## Checklist
- [ ] Adjustment is based on a repeated pattern, not a single incident
- [ ] Change is incremental and attributable
- [ ] Previous outcomes are actually recorded somewhere reusable, not just in memory
