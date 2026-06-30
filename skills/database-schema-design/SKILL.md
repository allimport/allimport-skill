---
name: database-schema-design
description: Use when designing or reviewing database schemas, indexes, and migrations for correctness, performance, and safe evolution over time.
---

# Database Schema Design

## When to use
- Designing a new schema or table
- Reviewing a migration before it runs against production data

## Process
1. **Normalize first, denormalize deliberately** — start from a normalized model; only denormalize for a specific, measured performance need.
2. **Define constraints at the DB level** — foreign keys, NOT NULL, unique constraints; don't rely solely on application code to enforce data integrity.
3. **Index for actual query patterns** — index columns used in WHERE/JOIN/ORDER BY on large tables; avoid over-indexing write-heavy tables.
4. **Plan migrations for zero downtime on large tables** — additive changes first (add nullable column, backfill, then add constraint), avoid locking rewrites on hot tables.
5. **Version and make migrations reversible** where possible; never edit a migration that already ran in any shared environment.

## Checklist
- [ ] Constraints enforced at the database level, not just app-level validation
- [ ] Indexes match real query patterns, not guessed
- [ ] Migration plan avoids long table locks on large/hot tables
- [ ] Migration is reversible or has a clear rollback plan
