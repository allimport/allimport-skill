# CLAUDE.md — All Import

Memoria del proyecto para Claude Code. Leé esto antes de trabajar.

## Qué es esto
Repo de **All Import** (Córdoba, Argentina · @allimport.cba). Contiene:
- **`web/`** — landing de la marca (Next.js 15 + React 19 + three.js/R3F + Tailwind 4 + TypeScript). Se deploya como export estático a GitHub Pages.
- **`skills/`** — biblioteca de skills para Claude Code (77 skills, cada una en `skills/<nombre>/SKILL.md`).
- **`_research/`** — conocimiento del proyecto: plan maestro, análisis de videos/fotos, prompts útiles. **Leé `_research/PLAN-MAESTRO.md` para el contexto y las prioridades.**

> El **producto/app de All Import todavía no existe como código** en este repo. Hoy hay landing + skills. Cuando exista el producto (con backend/DB), va con el mismo estándar.

## Negocio (contexto que no cambia)
- Vende **producto físico** importado: camisetas de fútbol (réplica), auriculares TWS, parlante, power bank, cables, vaper.
- Canales: **WhatsApp + Instagram**. Quiere sumar MercadoLibre + e-commerce.
- También quiere **vender webs y agentes de WhatsApp a terceros**.
- Trabaja **solo**. Herramientas pagas: Claude + Gemini (+ Higgsfield si hace falta).

## Stack y comandos (la web)
Trabajá siempre dentro de `web/`:
```bash
cd web
npm install      # instalar deps
npm run dev      # desarrollo local
npm run build    # build de producción (export estático)
npm run lint     # linter
```
- Catálogo (fuente única): `web/src/components/site/data.ts`
- El deploy lo hace GitHub Actions (`.github/workflows/pages.yml`) al pushear.

## Convenciones
- **Ramas:** trabajar en `claude/<descripcion>`. Nunca pushear directo a la rama por defecto sin permiso.
- **Commits:** claros y descriptivos, en español o inglés, un cambio lógico por commit.
- **Un cambio = una rama = un PR = validación verde = merge.** De a un paso.
- **Nombres/estilo:** seguí el estilo del código que ya existe alrededor.

## Reglas de oro (no negociables)
1. **Nunca dejes de compilar.** Antes de dar por hecho un cambio en `web/`, corré `npm run lint` y `npm run build`.
2. **Nunca commitees secretos** (API keys, tokens). Van a variables de entorno. Ojo con `.mcp.json`.
3. **Nunca `git push --force`** ni `git add -A` a ciegas.
4. **No toques `web/out/`** (es build generado) ni `graphify-out/`.
5. Migraciones (cuando haya DB): **aditivas e idempotentes** (`IF NOT EXISTS`).
6. Para tareas grandes o delicadas: **plan primero** (mostrá el plan, esperá OK), después ejecutá.

## Seguridad (cuando exista el producto con backend)
Aplicar: RLS en Supabase, CORS restringido, credenciales en env vars, rate limiting, sanitizar inputs. Prompts listos en `_research/prompts-utiles.md`.

## Cómo trabajar acá
- Empezá leyendo `_research/PLAN-MAESTRO.md` (prioridades vigentes).
- Tarea concreta > pedido vago. Verificá lo que hacés (build/lint/screenshot), no solo lo escribas.
- Contexto = plata: una tarea por sesión, `/clear` entre tareas distintas.
