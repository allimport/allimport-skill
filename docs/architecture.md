# Arquitectura del repo

## Qué contiene
- **`web/`** — landing de All Import. Next.js 15 (App Router) + React 19 + three.js/R3F (intro 3D) + Tailwind 4 + TypeScript. Export estático a GitHub Pages.
- **`skills/`** — biblioteca de skills de Claude Code (`skills/<nombre>/SKILL.md`).
- **`.claude/`** — config local: `settings.json` (permisos), `agents/` (subagentes), `skills/` (symlinks, no versionados).
- **`_research/`** — conocimiento del proyecto (plan maestro, análisis, prompts, setups de Gemini/Claude).
- **`docs/`** — esta carpeta: SSOT + ADRs.

## La web (detalle)
- Entrada: `web/src/app/page.tsx` (Intro 3D + Hero + Secciones).
- Estados: `error.tsx`, `loading.tsx`, `not-found.tsx` (on-brand).
- **Catálogo = fuente única:** `web/src/components/site/data.ts` (productos, precios, WhatsApp, IG).
- Marca/colores: `--bg #0a0f1a`, `--cyan #00d4d4`, `--white`. Fuente: Montserrat Alternates.
- Deploy: GitHub Actions `pages.yml` (push) → export estático.
- CI: `.github/workflows/ci.yml` (typecheck + build en cada PR sobre `web/`).
- Docs de diseño/marca detalladas: `web/docs/` (01_BRAND … 16_IMPLEMENTATION_RULES).

## El producto (todavía no existe como código)
Cuando exista (backend/DB): mismo estándar. Seguridad en `_research/prompts-utiles.md`
(RLS, CORS, env vars, rate limiting, sanitizar inputs).

## Comandos
```bash
cd web && npm install && npm run dev   # desarrollo
cd web && npm run build                # build/export (corre lint+types internos)
cd web && npx tsc --noEmit             # typecheck
```
