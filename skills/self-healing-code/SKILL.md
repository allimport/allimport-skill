---
name: self-healing-code
description: Use when a failure (test, build, runtime error) is detected and should be diagnosed and fixed automatically, with the fix verified before being considered done.
---

# Self-Healing Code

## When to use
- A test, build, or CI step fails and the cause is likely a small, fixable bug
- User wants automatic detection + fix + verification, not just a diagnosis

## Process
1. **Capture the failure** — exact error message, stack trace, failing test/assertion.
2. **Diagnose root cause** — read the actual code path, don't guess from the error message alone.
3. **Apply the minimal fix** — change only what's needed to address the root cause; don't refactor unrelated code.
4. **Verify** — re-run the exact failing test/build. If it still fails, revise the diagnosis rather than re-applying the same fix.
5. **Guard against masking** — never "fix" by disabling the test, catching and swallowing the error, or loosening an assertion unless that's genuinely correct.

## Checklist
- [ ] Root cause identified, not just the symptom
- [ ] Fix verified by re-running the original failing check
- [ ] No test/assertion was weakened just to make it pass
