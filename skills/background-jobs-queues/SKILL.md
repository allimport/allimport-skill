---
name: background-jobs-queues
description: Use when designing or implementing asynchronous background jobs and queues for work that shouldn't block the request/response cycle.
---

# Background Jobs & Queues

## When to use
- A request handler does slow work (email sending, image processing, report generation) that shouldn't block the response
- Need reliable retry/backoff for work that can transiently fail

## Process
1. **Decide what's a job** — anything slow, non-critical-path, or that can be retried independently of the original request.
2. **Pick a queue** appropriate to scale and durability needs (Redis-backed for simple cases, a managed queue/broker for high throughput or strict delivery guarantees).
3. **Make jobs idempotent** — a job may be retried or delivered more than once; design handlers so re-running has no harmful side effect (e.g. check-before-act, idempotency keys).
4. **Define retry/backoff and dead-letter handling** — bounded retries, then move to a dead-letter queue for manual inspection instead of dropping silently.
5. **Monitor queue depth and failure rate** — a growing backlog or rising failure rate needs alerting, not silent accumulation.

## Checklist
- [ ] Jobs are idempotent or have deduplication logic
- [ ] Retries are bounded with backoff; failures don't loop forever
- [ ] Failed jobs are visible (dead-letter queue/logging), not silently dropped
- [ ] Queue depth/latency is monitored
