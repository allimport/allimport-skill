---
name: caching-strategy
description: Use when designing or fixing HTTP, CDN, or application-data caching to reduce latency and backend load without serving stale data.
---

# Caching Strategy

## When to use
- Repeated requests hit the origin/server for data that rarely changes
- User wants faster response times or lower backend cost

## Process
1. **Classify the data** — static asset, semi-static (changes rarely), or dynamic/user-specific.
2. **Pick the layer**:
   - Static assets: long `Cache-Control: max-age=31536000, immutable` + content-hashed filenames
   - Semi-static API responses: CDN/edge cache with `stale-while-revalidate`
   - Dynamic/user data: in-memory or Redis cache with short TTL, keyed correctly (include user/tenant in key)
3. **Set invalidation rules** — TTL expiry, explicit purge on write, or tag-based invalidation. Never cache without a way to invalidate.
4. **Avoid cache stampedes** — use request coalescing or jittered TTLs for high-traffic keys.
5. **Verify** — confirm cache hit ratio improves and stale data isn't served past acceptable freshness.

## Checklist
- [ ] Every cached value has a defined invalidation path
- [ ] Cache keys include all dimensions that vary the response (user, locale, etc.)
- [ ] No sensitive/user-specific data cached at a shared (CDN) layer
- [ ] Hit ratio measured, not assumed
