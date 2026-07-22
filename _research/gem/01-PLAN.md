# 01 — PLAN (los 22 pasos, estado real y cómo se hace cada uno)

Este archivo es tu mapa de trabajo, Gemini. Cada paso tiene: prioridad, símbolo de quién actúa, estado honesto y su especificación comprimida. Usá la especificación del paso para armar el PROMPT PARA CLAUDE — no inventes nada que no esté acá.

**Símbolos:** 🤖 = generás el prompt y Claude ejecuta · 🙋 = tarea del dueño (explicale los pasos, sin prompt de código) · 🤝 = el dueño consigue algo primero (cuenta/token) y DESPUÉS generás el prompt.
**Estados:** ✅ HECHO (verificado por Claude) · ⬜ FALTA. "Guardado" no es "hecho".

## Base ya construida (no la rehagas)
CLAUDE.md (memoria del repo) · higiene de secretos · CI (typecheck + build en cada PR) · Context Pack `docs/` (24 documentos) · páginas error/404/carga de la web · subagentes `reviewer` y `web-qa` · skill `allimport-catalog-checker` · el Gem (#21) y esta configuración.

## Mapa del repo (para el campo CONTEXTO de tus prompts)
- `web/` — landing (Next.js 15 + React 19 + Tailwind 4 + TypeScript, export estático a GitHub Pages).
- `web/src/components/site/data.ts` — catálogo (fuente única: productos, precios, WhatsApp).
- `skills/` — biblioteca de skills de Claude Code.
- `docs/` — documentación del ecosistema (00-VISION … 22-KNOWLEDGE-GAPS).
- `_research/` — plan, análisis y este paquete.
- Verificación estándar: `cd web && npx tsc --noEmit && npm run build`.

## Tabla de prioridad

| Orden | # | Paso | Estado | Quién |
|---|---|---|---|---|
| 1 | 19 | 5 comandos de Claude | ⬜ | 🙋 |
| 2 | 20 | Crear skills / usar Claude | ⬜ | 🙋/🤖 |
| 3 | 18 | Plan 7 días para dominar Claude | ⬜ | 🙋 |
| 4 | 04 | 5 cosas para no ser hackeado | ⬜ | 🤝 |
| 5 | 12 | Proteger a Claude (3 prompts) | ⬜ | 🤝 |
| 6 | 06 | Ahorro de tokens | ⬜ | 🤖 |
| 7 | 08 | Graphify (grafo) | ⬜ | 🤖 |
| 8 | 07 | Obsidian (segundo cerebro) | ⬜ | 🙋 |
| 9 | 15 | Conectores | ⬜ | 🤝 |
| 10 | 16 | Claude trabaja solo | ⬜ | 🙋 |
| 11 | 21 | Proyecto en Gemini | ✅ | — |
| 12 | 11 | Claude + Google Stitch | ⬜ | 🤝 |
| 13 | 13 | 4 cosas que se rompen en web | ✅ | — |
| 14 | 02 | Agente de WhatsApp | ⬜ | 🤝 |
| 15 | 05 | Claude + Meta (campañas) | ⬜ | 🤝 |
| 16 | 10 | IA consigue clientes (legal) | ⬜ | 🤝 |
| 17 | 03 | Repo de agentes | ⬜ | 🤖 |
| 18 | 17 | Repo que edita videos | ⬜ | 🤖 |
| 19 | 09 | 7 prompts | ⬜ | 🙋 |
| 20 | 22 | Proyectos en Claude | ⬜ | 🙋 |
| 21 | 01 | Terminar la web | ⬜ | 🤝 (ÚLTIMO) |

## Especificaciones por paso

### #19 — 5 comandos de Claude Code 🙋
El dueño practica los comandos nativos: `/init` (genera CLAUDE.md al abrir carpeta nueva), `/context` (% de ventana usada), `/compact` (comprime chat en tarea larga), `/plan` (propone antes de ejecutar; para cambios grandes), `/agents` (crear subagentes de tarea fija). Regla extra: `/clear` entre tareas distintas (lo que más tokens ahorra). Ya están documentados en el repo (`docs/03-CLAUDE-CODE.md`); esto es práctica, no código.

### #20 — Crear skills 🙋/🤖
El dueño ya creó una skill real (`allimport-catalog-checker`) con `skill-creator`. Flujo: describir muy específico qué hace la skill → skill-creator pregunta (alcance, formato) → genera `SKILL.md` con frontmatter name/description. Si el dueño quiere otra skill a medida, generá prompt 🤖 usando `skill-creator`.

### #18 — Plan 7 días 🙋
Es sobre Claude.ai/Cowork (app de escritorio), NO Claude Code. Setup: app de escritorio → 4 carpetas (About Me / Projects / Templates / Outputs) → 2 archivos base (`about-me.md`, `anti-ai-style.md`) → dejar que Claude pregunte → un solo plugin → conectores → un Proyecto → tarea programada. Explicáselo por días; sin prompt de código.

### #04 — 5 cosas para no ser hackeado 🤝
5 reglas: RLS en Supabase · CORS restringido · credenciales en variables de entorno · rate limiting · sanitizar inputs. **Variables de entorno ya está aplicado en el repo.** RLS/CORS/rate-limit aplican recién cuando exista backend/Supabase (no generes prompt de eso hoy — sería sobreingeniería). Skills: owasp-security-audit, secrets-detection, rate-limiting-implementation.

### #12 — Proteger a Claude 🤝
Continuación del #04. 3 prompts: (1) encontrar vulnerabilidades y explicarlas simple; (2) detectar endpoints sin autenticación/validación; (3) validar datos de usuario contra inyección. Aplica de lleno cuando exista backend. Skills: owasp-security-audit, api-security-design.

### #06 — Ahorro de tokens 🤖
Objetivo: que Claude no relea archivos enteros. Lo que ya está: reglas de tokens en CLAUDE.md, skills context-optimization / token-optimizer / repo-indexer / smart-file-selector. El video proponía un paquete de terceros "execution-runtime" (99% de ahorro = marketing; y correr código de terceros es riesgo → descartado). Si el dueño pide más, generá prompt para afinar las reglas del repo, no para instalar paquetes externos.

### #08 — Graphify 🤖
Grafo de conocimiento del código: se corre una vez, escanea, y las sesiones siguientes navegan el grafo en vez de releer. Dato: el repo ya tiene `graphify-out/` en el .gitignore (se probó alguna vez). Prompt sugerido: que Claude evalúe qué generó graphify y si aporta sobre lo que ya hacen las skills de contexto. URL del repo real: sin confirmar — que Claude la verifique antes de instalar nada.

### #07 — Obsidian 🙋
En la compu del dueño: instalar Obsidian (obsidian.md) → "Abrir carpeta como bóveda" → elegir la carpeta `docs/` del repo clonado. Obsidian y Claude leen los MISMOS archivos; cero sincronización. Requiere tener el repo clonado localmente.

### #15 — Conectores 🤝
De los 15 del video, útiles HOY: GitHub, Playwright, Supabase (futuro), Figma, Obsidian, Vercel (futuro). NO instalar los 15. El dueño consigue el token del conector que toque; después generás el prompt para activarlo.

### #16 — Claude trabaja solo 🙋
Plan nocturno autónomo: escribir un `NIGHT-PLAN` con tareas por bloques y reglas de oro (nunca romper build, nunca `git add -A` ni `push --force`, migraciones aditivas). Los guardrails (CI, permisos) ya existen. Hay plantilla en `_research/night-plan-template.md`. El dueño lo lanza en su sesión; explicale cómo.

### #11 — Google Stitch 🤝
Stitch (gratis) genera pantallas/design system; se conecta a Claude Code por MCP. El dueño consigue su API key de Google. Después, prompt con el comando: `claude mcp add stitch --transport http --url "https://stitch.googleapis.com/mcp" --header "X-Goog-Api-Key: <SU_KEY>"`. ⚠️ La key del video estaba expuesta: JAMÁS usarla; el dueño genera la suya. Útil para terminar la web (#01) y para vender webs.

### #02 — Agente de WhatsApp 🤝
Agente que responde clientes 24/7. El dueño decide proveedor (**Meta API o Twilio**) y consigue credenciales + API key de Anthropic. Definir: nombre del negocio, rubro, para qué (responder/pedidos), nombre del agente, tono, horario, archivos de conocimiento (catálogo/precios/FAQ). La URL del repo "builder" del video no está confirmada — Claude evalúa si usar un repo o armarlo directo. Solo responde a quien escribe (opt-in).

### #05 — Claude + Meta 🤝
Estructurar campañas/catálogos de Meta. Requiere cuenta Meta Business. **Restricción dura: réplicas y vapers NO se anuncian (ban). Solo accesorios genéricos.** Claude estructura segmentación/copies; el dueño los carga en el Administrador de Anuncios. Skills: ad-copy-generator, funnel-builder.

### #10 — IA consigue clientes (versión legal) 🤝
El video original era un bot de spam masivo por DM = ban seguro → DESCARTADO tal cual. Versión legal: atender y hacer follow-up a quien TE escribe o comenta (opt-in) + link en bio a WhatsApp + contenido orgánico. Depende del agente #02. Nunca propongas outbound masivo.

### #03 — Repo de agentes 🤖
Repo verificado: `github.com/contains-studio/agents` (38 subagentes por departamento; el "144 agentes" del video era falso). Ya se crearon 2 a medida (`reviewer`, `web-qa`). Prompt: cherry-pickear 2-3 útiles (ej. growth-hacker) a `.claude/agents/`, adaptados a All Import. NO instalar los 38 (relleno).

### #17 — Repo que edita videos 🤖
OpenMontage (URL sin confirmar: `calesthio/OpenMontage`): pipelines de video con Piper (voz), Remotion (render), footage libre (Pexels/NASA/Wikimedia). Ya existe la skill `remotion-video-creation`. Prompt: verificar el repo real y evaluar si aporta sobre Remotion + Higgsfield. Para fase de marketing; no urgente.

### #09 — 7 prompts 🙋
Prompts genéricos de productividad (partir tareas en micro-pasos, abogado del diablo, estratega 30 días…). Guardados en `_research/prompts-utiles.md`. Son plantillas de chat; no montan nada. Prioridad baja.

### #22 — Proyectos en Claude 🙋
El dueño crea Proyectos en claude.ai (ej. marketing) con instrucciones globales pegadas. Tarea de navegador; explicale qué pegar (puede salir de `docs/17-BUSINESS.md`). Cerca del final.

### #01 — Terminar la web 🤝 (ÚLTIMO, decisión del dueño)
La web ya compila y tiene páginas de error/404/carga. Queda: feedback de diseño del dueño, renombrar "Kit iPhone Premium" (marca registrada) en `data.ts`, y pulir. Cada cambio: rama `claude/*` + build verde + skill allimport-catalog-checker si se toca el catálogo.

## Rutina de trabajo
1. El dueño te dice qué paso quiere hacer.
2. Vos mirás símbolo + especificación de ese paso (solo ese).
3. Respondés según el protocolo de tus instrucciones.
4. Un paso pasa a ✅ solo cuando Claude lo verificó en el repo.
