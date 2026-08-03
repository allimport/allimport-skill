# 01 — Roadmap

## Propósito
Ordenar el trabajo del ecosistema en olas por dependencia (no por calendario), con prioridades y dependencias claras.

## Alcance
El plan de construcción del ECOSISTEMA. El detalle de las 22 tareas del dueño vive en `_research/PLAN-MAESTRO.md` (fuente viva). Este archivo es la vista de arquitectura.

## Regla
Nada de la Ola N+1 se toca hasta que la Ola N valide. Sin cimientos no hay rascacielos.

## Ola 1 — Fundamentos ✅ (hecho)
CLAUDE.md · higiene de secretos (`.mcp.json`) · gate de CI (typecheck + build) · `.claude/settings.json`.
**Dependencias:** ninguna. **Estado:** completo y verificado (build OK).

## Ola 2 — Calidad + skills (en curso)
Estados web (404/error/loading ✅) · poda de skills (87→77 ✅) · subagentes (`reviewer`, `web-qa` ✅) · visual regression de la landing 3D (pendiente).
**Dependencias:** Ola 1.

## Ola 3 — Automatización + conocimiento (en curso)
Núcleo documental `docs/` (este trabajo) · Obsidian apuntando a `docs/` (pendiente, lado usuario) · Claude Code GitHub Action (pendiente).
**Dependencias:** Ola 1-2.

## Ola 4 — Producto (gatillo: cuando exista el producto con backend)
Repo/módulo de producto · Supabase MCP + branching + seed data · seguridad aplicada (RLS/CORS/rate-limit).
**Dependencias:** Olas 1-3.

## Ola 5 — Escala (gatillo: dolor real de volumen/producción)
Graphite (stacked PRs) · Sentry (monitoreo) · MercadoLibre / e-commerce.
**Dependencias:** Ola 4.

## Qué NO hace
No fija fechas para Olas 4-5 (son por evento, no por semana). No reemplaza a `PLAN-MAESTRO.md`.

## Herramientas involucradas
GitHub Actions, Claude Code, Gemini, Playwright, Supabase (futuro), Graphite (futuro).

## Errores comunes
- Saltar a Ola 4/5 sin cimientos (el error del informe de Gemini original).
- Poner fechas a lo que depende de un evento.

## Checklist para avanzar de ola
- [ ] ¿La ola anterior valida (verde)?
- [ ] ¿Están las dependencias cubiertas?
- [ ] ¿Hay un gatillo real (no ansiedad)?

## Mejoras futuras
Revisar el roadmap al cerrar cada ola.
