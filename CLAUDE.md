# CLAUDE.md — All Import

Memoria del proyecto para Claude Code. Leé esto antes de trabajar.

## Qué es esto
Repo de **All Import** (Córdoba, Argentina · @allimport.cba). Contiene:
- **`web/`** — landing de la marca (Next.js 15 + React 19 + three.js/R3F + Tailwind 4 + TypeScript). Se deploya como export estático a GitHub Pages.
- **`skills/`** — biblioteca de skills para Claude Code (77 skills, cada una en `skills/<nombre>/SKILL.md`).
- **`_research/`** — conocimiento del proyecto: plan maestro, análisis de videos/fotos, prompts útiles. **Leé `_research/PLAN-DEFINITIVO.md` para el plan y las prioridades vigentes** (foco en redes).
- **`contenido/`** — motor de contenido para redes: calendario semanal, 10 ganchos+guiones de reel, `DESIGN.md` (branding).
- **`historias/`** — editor de fotos → historias de Instagram (Python + Pillow).
- **`video/`** — clips de producto animados (proyecto Remotion).
- **`proveedores/`** — analizador de chats de WhatsApp (→ HTML/CSV) + plantilla de base de clientes.
- **`docs/`** — núcleo documental (SSOT). Índice en `docs/README.md`; reporte de estado en `docs/ESTADO-INICIAL.md`; terceros diferidos en `docs/TERCEROS-PENDIENTES.md`.
- **`.claude/agents/`** — subagentes: `reviewer` y `web-qa` (propios) + 37 agentes de `contains-studio/agents` (solo `.md`).

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

## Comandos Frecuentes y Control de Sesión
Uso obligatorio de los 5 comandos nativos de Claude Code en el flujo de All Import:
1. **`/init`** — Generar o actualizar la memoria base y reglas de `CLAUDE.md` al iniciar un entorno o repositorio.
2. **`/context`** — Chequear el porcentaje de la ventana de contexto utilizada.
3. **`/compact`** — Comprimir la conversación cuando el contexto esté alto, antes de cambiar de tarea o alcanzar el límite.
4. **`/plan`** — Activar el modo de planificación explícita antes de ejecutar cambios arquitectónicos o tareas complejas de múltiples archivos.
5. **`/agents`** — Acceder y gestionar el panel de subagentes especializados (ej. `reviewer`, `web-qa`).

Regla de sesión: **una tarea = una sesión**; `/clear` entre tareas distintas; `/compact` dentro de una tarea larga; `/context` para vigilar la ventana. Detalle ampliado en `docs/03-CLAUDE-CODE.md`.

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
- Empezá leyendo `_research/PLAN-DEFINITIVO.md` (prioridades vigentes; foco en redes). `_research/PLAN-MAESTRO.md` queda como contexto histórico.
- Tarea concreta > pedido vago. Verificá lo que hacés (build/lint/screenshot), no solo lo escribas.

## Eficiencia de contexto (tokens)
- **Buscá antes de leer:** usá `grep`/`find` para ubicar lo puntual antes de abrir carpetas o archivos enteros. No leas todo un directorio si necesitás una función.
- **Una tarea = una sesión.** `/clear` entre tareas distintas; `/compact` dentro de una tarea larga; `/context` para vigilar la ventana.
- Detalle durable → `docs/` (se lee bajo demanda), no repetido en el chat.
- **Seguridad:** nunca commitear secretos ni `.mcp.json` (está en `.gitignore`); credenciales solo en variables de entorno.
