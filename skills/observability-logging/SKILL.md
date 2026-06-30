---
name: observability-logging
description: Use when setting up or improving logs, metrics, and traces so production issues can be diagnosed quickly instead of guessed at.
---

# Observability & Logging

## When to use
- Debugging a production issue is slow because there's not enough signal
- Setting up a new service that needs baseline observability

## Process
1. **Logs** — structured (JSON), include request/trace ID, avoid logging secrets or full PII; log at the right level (error for actionable failures, not every request).
2. **Metrics** — track the few that matter: request rate, error rate, latency percentiles (p50/p95/p99) per endpoint/service. Avoid metric sprawl that nobody looks at.
3. **Traces** — propagate a trace/correlation ID across service boundaries so a single request can be followed end-to-end.
4. **Alerts** — alert on symptoms users would notice (elevated error rate, latency spike), not on every internal warning.
5. **Make it queryable** — logs/metrics are only useful if searchable by trace ID, user ID, or time range when debugging.

## Checklist
- [ ] Every request traceable end-to-end via a correlation/trace ID
- [ ] No secrets or raw PII in logs
- [ ] Alerts tied to user-visible symptoms, not internal noise
- [ ] Latency tracked as percentiles, not just averages
