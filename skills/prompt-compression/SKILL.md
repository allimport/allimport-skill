---
name: prompt-compression
description: Use when a prompt or context block is too long and needs to be shortened without dropping any requirement, constraint, or fact it conveys.
---

# Prompt Compression

## When to use
- A prompt is hitting context/token limits or costing too much per call
- Verbose instructions repeat information or use more words than needed

## Process
1. **Separate signal from filler** — identify which sentences carry a constraint/requirement/fact vs which are restating something already said.
2. **Cut, don't paraphrase-bloat** — remove filler phrases, redundant examples, and repeated context; keep every distinct requirement.
3. **Use structured shorthand** where it preserves meaning — bullet lists, key:value pairs instead of full sentences for constraints.
4. **Verify nothing was lost** — diff the compressed version against the original requirement list; every requirement must still be present.
5. **Don't over-compress** — if compression makes the prompt ambiguous, it's a net loss even if shorter.

## Checklist
- [ ] Every original requirement/constraint still present after compression
- [ ] No new ambiguity introduced
- [ ] Token/character count actually reduced, measured not assumed
