---
name: repo-indexer
description: Use when a large codebase needs a fast-lookup index of symbols, files, and dependencies so subsequent tasks don't re-scan the whole repo from scratch.
---

# Repo Indexer

## When to use
- Repeated tasks in the same large repo each re-discover the same file locations
- A task needs to know what depends on what before making a change

## Process
1. **Index by symbol** — function/class/component names mapped to their defining file.
2. **Index by dependency** — which modules import/depend on which others, especially for risky changes (shared utils, config).
3. **Index by directory convention** — where tests, types, and config typically live in this repo.
4. **Keep it incremental** — update the index for changed files rather than rebuilding from scratch every time.
5. **Use the index to scope searches** — when a task touches symbol X, check the index for its dependents before editing.

## Checklist
- [ ] Index reflects current repo state, not a stale snapshot
- [ ] Dependency lookups used before editing shared/widely-imported code
- [ ] Index used to narrow search instead of re-grepping the whole repo every time
