---
name: smart-file-selector
description: Use when a task only needs a small, relevant subset of a large repo's files loaded into context, instead of reading everything.
---

# Smart File Selector

## When to use
- A repo is large and the task only touches a specific feature or module
- Context budget is limited and indiscriminate file reading would waste it

## Process
1. **Start from the task's stated target** — file path, symbol name, or feature mentioned by the user.
2. **Expand minimally** — pull in direct dependencies/callers of the target, not the whole directory tree.
3. **Use search before read** — grep/glob for the symbol or string first; only `Read` files that actually match.
4. **Stop expanding once the task is answerable** — don't keep pulling in "just in case" files.
5. **Re-expand only if blocked** — if the minimal set turns out insufficient, add specifically what's missing, not a broad net.

## Checklist
- [ ] Every file read was justified by a concrete reference to the task
- [ ] Search (grep/glob) used before full-file reads on a large repo
- [ ] No speculative "just in case" files loaded into context
