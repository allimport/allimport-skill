---
name: ci-cd-pipeline
description: Use when setting up or fixing a CI/CD pipeline that should run tests and deploy safely, with rollback if something breaks.
---

# CI/CD Pipeline

## When to use
- Setting up automated build/test/deploy for a project that doesn't have one
- An existing pipeline is flaky, too slow, or deploys without adequate checks

## Process
1. **CI stage**: run lint, type-check, and tests on every push/PR; fail fast on the cheapest checks first (lint before full test suite).
2. **Build stage**: produce a reproducible artifact (container image, build output) versioned by commit SHA, not "latest."
3. **Deploy stage**: deploy to staging automatically, require an explicit gate (manual approval or passing smoke tests) before production.
4. **Rollback plan**: every deploy should have a fast rollback path (previous artifact redeploy or feature flag) — verify it actually works, don't assume.
5. **Keep pipelines fast** — cache dependencies, parallelize independent jobs, so feedback loop stays short enough to be useful.

## Checklist
- [ ] Tests run automatically before any deploy
- [ ] Production deploys are gated, not automatic on every push
- [ ] Rollback path exists and has been verified to work
- [ ] Pipeline failure clearly identifies which stage/check failed
