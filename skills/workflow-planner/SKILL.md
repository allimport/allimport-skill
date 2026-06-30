---
name: workflow-planner
description: Use when a high-level goal needs to be converted into a concrete, ordered, verifiable plan of steps before execution starts.
---

# Workflow Planner

## When to use
- User states a goal ("ship feature X", "fix the SEO problem") without a step-by-step plan
- A task is large enough that jumping straight to execution risks missing dependencies

## Process
1. **Clarify the end state** — what does "done" look like, concretely.
2. **Decompose into steps** — each step should have a clear input, action, and verifiable output.
3. **Order by dependency** — sequence steps so nothing runs before its prerequisite is satisfied.
4. **Attach a verification method to each step** — how you'll know it actually succeeded (test, manual check, metric).
5. **Flag risk points** — steps that are hard to reverse or likely to fail get called out before execution starts.

## Checklist
- [ ] Every step has an explicit success criterion
- [ ] Dependencies are ordered correctly, not just listed
- [ ] Irreversible/risky steps are flagged before execution
