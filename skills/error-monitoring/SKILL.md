---
name: error-monitoring
description: Use when setting up production error capture, grouping, and alerting so real issues are surfaced and triaged instead of buried in logs.
---

# Error Monitoring

## When to use
- Production errors currently only show up in raw logs with no aggregation
- Need to know when error rates spike, not just after a user reports it

## Process
1. **Capture errors centrally** — use an error tracker (Sentry or equivalent) that records stack trace, request context, and user/session info (without sensitive data).
2. **Group intelligently** — errors should group by root cause (same stack signature), not flood as thousands of identical individual events.
3. **Set alert thresholds on rate, not raw count** — alert on "error rate jumped X%" rather than "any error occurred," to avoid alert fatigue on known low-level noise.
4. **Triage by impact** — prioritize errors affecting many users or critical paths (checkout, auth) over rare edge cases.
5. **Close the loop** — once fixed, verify the error stops recurring in the next deploy, don't just mark it resolved.

## Checklist
- [ ] Errors grouped by root cause, not flooding as duplicates
- [ ] Alerts based on rate/trend, not absolute single-occurrence noise
- [ ] No sensitive data captured in error context
- [ ] Fix verified to actually stop the error before closing it out
