---
name: skill-router
description: Use when it's unclear which available skill best fits an incoming task, and the right skill should be selected before starting work instead of guessing.
---

# Skill Router

## When to use
- Multiple skills could plausibly apply and picking wrong wastes a full pass
- A new task arrives and the right entry point isn't obvious

## Process
1. **Extract the task's core verb and domain** — what action is being requested, on what kind of artifact (code, text, image, SERP, etc.).
2. **Match against available skill descriptions** — compare against each skill's `description:` frontmatter, not just its name.
3. **Disambiguate near-ties** — if two skills could both apply (e.g. `serp-analysis` vs `programmatic-seo`), pick based on whether the task is about analysis or production.
4. **Chain when needed** — if no single skill covers the whole task, hand off to `skill-chaining` instead of forcing one skill to do everything.
5. **Default to asking** only when the choice meaningfully changes the outcome and isn't recoverable by switching later.

## Checklist
- [ ] Decision based on the skill's actual description, not assumption from its name
- [ ] Near-tie cases explicitly reasoned through, not coin-flipped
- [ ] Multi-skill tasks routed to chaining instead of forced into one skill
