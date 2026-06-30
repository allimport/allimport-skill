---
name: semantic-diff
description: Use when a code diff needs to be summarized by intent and impact (what behavior changed and why it matters) rather than just line-by-line additions/deletions.
---

# Semantic Diff

## When to use
- Reviewing a PR/diff and a plain line diff doesn't convey what actually changed behaviorally
- User wants a summary of "what changed and why it matters," not a line count

## Process
1. **Group changes by intent** — which lines belong to the same logical change (a bug fix, a refactor, a new feature), even if they're scattered across files.
2. **Identify behavioral impact** — does this change output, performance, security posture, or just internal structure with no behavior change?
3. **Flag risk** — changes to shared code, error handling, or auth/security paths get called out explicitly.
4. **Summarize per logical group**, not per file — "Fixed null check in auth flow (auth.ts, middleware.ts)" beats two separate file-level notes.
5. **Skip noise** — formatting-only or generated-file changes get a one-line mention, not detailed analysis.

## Checklist
- [ ] Summary organized by logical change, not by file
- [ ] Behavioral impact stated, not just "lines changed"
- [ ] Risky changes (security, shared code) explicitly flagged
