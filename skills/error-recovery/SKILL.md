---
name: error-recovery
description: Use when an error occurs and needs to be classified by type (transient, logic, permission, data) so the right recovery strategy is applied instead of a generic retry.
---

# Error Recovery

## When to use
- An operation fails and the next action should depend on *why* it failed
- User wants robust handling of failures, not a single catch-all retry

## Process
1. **Classify the error**:
   - Transient (network blip, rate limit, timeout) → retry with backoff
   - Permission/auth → stop and surface, don't retry blindly
   - Logic/validation error → fix the input or code, retrying won't help
   - Data corruption/missing dependency → halt and report, don't proceed on bad state
2. **Match strategy to type** — only transient errors get automatic retries.
3. **Bound retries** — max attempts and backoff ceiling; never infinite-loop.
4. **Escalate clearly** — when recovery isn't possible, report exactly what failed and what was already tried.

## Checklist
- [ ] Error type identified before choosing a recovery action
- [ ] Retries are bounded and only used for transient failures
- [ ] Unrecoverable errors are surfaced, not silently swallowed
