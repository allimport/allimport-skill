# 05 — Skills

## Propósito
Inventario y organización de las skills de Claude Code del repo.

## Alcance
Las skills en `skills/<nombre>/SKILL.md` (registradas en `.claude/skills/` vía `register-skills.sh`). Hoy: **77 skills** (se podaron 10 de teoría pura desde 87).

## Cómo se registran
Claude Code solo escanea `.claude/skills/`, no `skills/`. El script `register-skills.sh` crea los symlinks. Reiniciar la sesión para que aparezcan como `/comandos`.

## Clasificación por categoría (resumen)
- **Meta/agentes:** find-skills, skill-router, skill-creator, task-decomposition, workflow-planner, workflow-executor, skill-chaining, self-healing-code, error-recovery, continuous-improvement.
- **Contexto/tokens:** context-optimization, context-compression, prompt-compression, token-optimizer, filesystem-context, repo-indexer, smart-file-selector, semantic-diff, composition-patterns.
- **Frontend/diseño:** frontend-design, ui-ux-pro-max, web-design-guidelines, taste-skill, shadcn-ui, figma-*.
- **Performance:** lighthouse-optimizer, core-web-vitals, bundle-analyzer, image-optimization, lazy-loading.
- **Seguridad:** owasp-security-audit, api-security-design, secrets-detection, security-headers-configuration, rate-limiting-implementation, dependency-scanner.
- **Testing/browser:** playwright-automation, webapp-testing, visual-regression-testing, unit-test-generator, browser-automation, agent-browser.
- **Marketing/SEO:** landing-page-*, conversion-rate-optimization, ad-*, viral-hook-generator, pricing-psychology, funnel-builder, growth-loops, programmatic-seo, serp-analysis, internal-linking-optimizer, marketing-skills.
- **Media:** thumbnail-gen, remotion-video-creation, napkin.
- **Backend (futuro):** database-schema-design, background-jobs-queues, caching-strategy, nextjs-supabase-auth, supabase-automation, error-monitoring, observability-logging.

## Estado por prioridad
- **Esenciales (mantener):** workflow-planner, task-decomposition, skill-creator, context7, playwright-automation, visual-regression-testing, nextjs-best-practices, react-best-practices, core-web-vitals, image-optimization, frontend-design, web-design-guidelines, secrets-detection, database-schema-design, semantic-diff.
- **Opcionales:** marketing/SEO/media (útiles para la línea de servicios, no para dev diario).
- **Redundantes (candidatas a fusionar):** los 6 de contexto → 1; los 4 de landing → 1; browser/testing → 1; seguridad → 1; perf → 1.
- **Futuras a crear:** `allimport-conventions` (mejor como CLAUDE.md), `visual-qa-3d`, `pr-ready`.

## Reorganización propuesta
De 77 → ~20 skills enfocadas (ver `_research/PLAN-MAESTRO.md` Parte 5). Fusionar clusters, archivar teoría, sacar marketing/video del repo de dev.

## Qué NO hacer
No instalar skills por instalar (ya pasó: 87 muertas). No mega-skills con XML anidado.

## Errores comunes
- Skills en `skills/` sin registrar → no aparecen.
- Frontmatter sin `name`/`description` → no cargan.

## Checklist para una skill nueva
- [ ] ¿Aporta valor operativo real? · [ ] ¿frontmatter válido? · [ ] ¿no duplica otra?

## Mejoras futuras
Ejecutar la poda a ~20 (Ola 2). Cherry-pick de `contains-studio/agents` si hace falta.
