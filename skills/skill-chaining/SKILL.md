---
name: skill-chaining
description: Use when a task requires multiple skills run in sequence, passing the output of one as the input of the next, rather than one skill handling everything.
---

# Skill Chaining

## When to use
- A task naturally splits into stages each better handled by a different skill (e.g. serp-analysis → landing-page-copy → conversion-rate-optimization)
- User wants an end-to-end pipeline, not isolated single-skill output

## Process
1. **Map the pipeline** — list each stage and which skill owns it, in order.
2. **Define the handoff contract** — what exact output format stage N produces and stage N+1 expects (e.g. structured findings, not prose, if the next stage needs to parse it).
3. **Run stages in order** — don't parallelize stages that depend on each other's output.
4. **Validate at each handoff** — confirm the output actually satisfies the next stage's input contract before proceeding.
5. **Surface the final synthesis**, not just the last stage's raw output, if earlier stages produced decisions worth keeping visible.

## Checklist
- [ ] Each stage's output format matches what the next stage consumes
- [ ] No stage started before its required input was ready
- [ ] Final output reflects the whole chain, not just the last link
