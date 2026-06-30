---
name: auth-system-designer
description: Use when designing or reviewing an authentication/authorization system — sessions, roles, OAuth, or MFA — for correctness and security.
---

# Auth System Designer

## When to use
- Building auth from scratch or integrating a new auth provider
- Reviewing an existing auth flow for security gaps

## Process
1. **Pick the right primitive**:
   - Sessions: server-side session store, httpOnly+secure+sameSite cookies
   - Tokens: short-lived access tokens + refresh token rotation, never long-lived JWTs for sensitive actions
   - OAuth: use a vetted library, validate `state`/PKCE, never roll your own OAuth flow
2. **Design roles/permissions** — RBAC for simple cases, attribute-based when permissions depend on resource ownership; check authorization on every protected route, server-side.
3. **Add MFA where stakes are high** — TOTP or WebAuthn for accounts with sensitive access; SMS only as a fallback, not the only factor.
4. **Handle the edge cases**: password reset token expiry/single-use, account lockout after repeated failures, session invalidation on password change.
5. **Never store secrets/passwords in plaintext** — use a vetted hashing algorithm (bcrypt/argon2) with proper salt.

## Checklist
- [ ] Authorization checked server-side on every protected action, not just hidden in UI
- [ ] Passwords/secrets hashed with a vetted algorithm, never plaintext or reversible encryption
- [ ] Token/session expiry and rotation defined
- [ ] MFA available for high-risk accounts/actions
