# 09 — Automatizaciones

## Propósito
Documentar las automatizaciones presentes y las planeadas.

## Alcance
GitHub Actions, hooks de Claude Code, scripts del repo.

## Actuales
| Automatización | Qué hace | Dónde |
|---|---|---|
| CI (web) | typecheck + build en cada PR | `.github/workflows/ci.yml` |
| Deploy Pages | build + export + gh-pages en push | `.github/workflows/pages.yml` |
| `register-skills.sh` | registra skills del repo en `.claude/skills/` | raíz |

## Planeadas
| Automatización | Qué hará | Ola |
|---|---|---|
| Claude Code Action (`@claude`) | review/fix agéntico en PRs | 3 |
| Visual regression | screenshot diff de la landing 3D | 2 |
| SessionStart hook | `npm ci` + registrar skills al abrir | 3 |
| Sentry alerts | avisos de error en prod | 5 (con producto) |

## Filosofía
- **Versionado > No-code.** Nada de Zapier/Make para mover código/docs (opaco, no versionable). Se usa Actions + scripts en el repo.
- Automatizar lo repetitivo y verificable, no lo delicado sin red.

## Qué NO automatizar
- Sync bidireccional de docs con LLM en cada merge (caro, deriva) → descartado.
- Deploys a prod sin gate.

## Herramientas
GitHub Actions, hooks de Claude Code, Bash.

## Errores comunes
- Automatizar algo frágil sin CI que lo respalde.
- Autonomía sin guardrails (ver `allimport/_research/night-plan-template.md`).

## Checklist
- [ ] ¿Es repetitivo y verificable? · [ ] ¿Está versionado? · [ ] ¿Tiene red (CI)?

## Mejoras futuras
Pipeline de release; auto-actualización de `allimport/docs/` con revisión humana.
