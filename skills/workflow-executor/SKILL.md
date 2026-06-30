---
name: workflow-executor
description: Use when running a multi-step plan that needs checkpoints, retries, and rollback on failure rather than blind sequential execution.
---

# Workflow Executor

## When to use
- A task has multiple dependent steps where a mid-way failure shouldn't silently corrupt state
- User asks to "run this plan" or "execute these steps and handle failures"

## Process
1. **Break the plan into discrete steps** with clear pre/post conditions for each.
2. **Checkpoint after each step** — record what completed so a re-run can resume instead of restarting from zero.
3. **Define retry policy per step** — transient failures (network, rate limit) get N retries with backoff; logic errors do not get blindly retried.
4. **On failure**: stop forward progress, report which step failed and why, and either roll back side effects already applied or leave state consistent for manual resume.
5. **On success**: report the full step list with outcomes, not just "done."

## Checklist
- [ ] Each step's success/failure is independently verifiable (not assumed)
- [ ] Retries are bounded and only applied to transient failure types
- [ ] Failure leaves the system in a known, reportable state
