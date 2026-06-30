---
name: owasp-security-audit
description: Use when auditing an application against the OWASP Top 10 (injection, broken auth, XSS, SSRF, etc.) before a release or security review.
---

# OWASP Security Audit

## When to use
- Pre-release security review of a web app/API
- User asks for an OWASP-style audit or general security check

## Process
1. **Walk the OWASP Top 10** systematically:
   - Injection (SQL, command, LDAP) — parameterized queries, no string-built queries
   - Broken authentication/session management — secure session handling, no weak password policies
   - Sensitive data exposure — encryption at rest/in transit, no secrets in code/logs
   - XML/External entities (XXE) — disable external entity processing
   - Broken access control — verify authorization on every endpoint, not just authentication
   - Security misconfiguration — no default credentials, no verbose error leaks, security headers set
   - XSS — output encoding, CSP, no unsanitized HTML injection
   - Insecure deserialization — validate/sign serialized data
   - Vulnerable dependencies — check for known CVEs in packages
   - Insufficient logging/monitoring — auth failures and access to sensitive data are logged
2. **Prioritize by exploitability and impact**, not just checklist completion.
3. **Report findings with concrete reproduction steps**, not vague warnings.
4. **Recommend the minimal fix**, not a rewrite, unless the architecture itself is the vulnerability.

## Checklist
- [ ] Each OWASP category explicitly checked, not skipped
- [ ] Findings include reproduction steps and severity
- [ ] Fixes recommended are scoped to the actual vulnerability
