# Análisis de videos (vía Gemini) — materia prima
### Recopilado para procesar en Claude Code. Uno por video, tal como llega.

---

## 02 - Agente de WhatsApp
**TEMA:** Crear un agente inteligente de WhatsApp automatizado sin programar, usando Claude Code + APIs externas.
**RESULTADO FINAL:** Agente de WhatsApp que responde consultas de clientes 24/7, personalizado al negocio.

**HERRAMIENTAS / REPOS / APPS:**
- Repo: "AgentKit - WhatsApp AI Agent Builder" (nombres vistos: agentwhatsapp / WhatsApp-AI-Agent-Builder / AgentKit) → github.com [path exacto NO especificado]
- Claude Code (escritorio) → claude.com
- Meta Developers (API de Meta) → https://developers.facebook.com
- Twilio → [URL no especificada]
- Anthropic (Claude) → [URL no especificada]

**REQUISITOS PREVIOS:**
- Claude Code instalado.
- Credenciales de API de Meta o Twilio.
- Cuenta Anthropic (API key).

**PASO A PASO:**
1. Instalar el repo del builder desde Claude Code (interfaz GitHub: carpetas .github, agent, docs, knowledge…).
2. Entrevista de Claude Code: 10 preguntas para definir el agente:
   1. Nombre del negocio
   2. A qué se dedica
   3. Para qué querés el agente (responder, agendar, tomar pedidos)
   4. Nombre del agente (el que ve el cliente)
   5. Tono (profesional/amigable/vendedor/empático)
   6. Horario de atención
   7. Archivos del negocio (menú, precios, FAQ) → carpeta `knowledge`
   8. API Key de Anthropic
   9. Proveedor de WhatsApp (Meta o Twilio)
   10. Credenciales del proveedor (token/keys)
3. Cargar credenciales de Meta/Twilio + Claude para la lógica.

**COMANDOS / CONFIG:** (el cuestionario de arriba; sin comandos literales de terminal capturados)
**COSTOS / LÍMITES:** [no especificado]

**⚠️ Pendientes que necesito para ejecutar:** URL exacta del repo · qué proveedor usa (Meta vs Twilio) · si el repo es una skill o un proyecto Node.

---

## 03 - Repo open source (miles de agentes)
**TEMA:** Usar un repo open source con 144 agentes especializados organizados por departamentos, desde Claude Code.
**RESULTADO FINAL:** Sistema de agentes especializados encadenados (ej: estrategia de growth + landing page en una misma conversación), sin costo extra.

**HERRAMIENTAS / REPOS / APPS:**
- Claude Code
- Repo de agentes → Gemini leyó: `github.com/msltarzewski/agency-agents` ⚠️ **probablemente mal leído** (ver nota abajo)
- Firebase Analytics · Mixpanel (free) · OneSignal (push) · Adjust Free (atribución) · Google Search Console · CapCut Pro → [URLs no especificadas]

**REQUISITOS PREVIOS:** Claude Code instalado.

**PASO A PASO:**
1. Pedirle a Claude Code que clone el repo y copie los archivos a `.claude/agents/`.
   - Comando visto: *"Clona el repositorio github.com/msltarzewski/agency-agents y copia todos los archivos de claude/agents/"*
2. Invocar un agente específico (ej. Growth Hacker):
   - *"Usa el agente Growth Hacker. Mi cliente tiene una app de fitness y un presupuesto de 500€/mes. Diseña una estrategia de adquisición con canales, métricas y loops virales."*
3. Encadenar con otro agente en la misma conversación (ej. Frontend Developer):
   - *"Ahora usa el agente Frontend Developer y crea la landing page de esta app en React con Tailwind basándote en la estrategia que acabas de generar."*

**COSTOS / LÍMITES:** [no especificado]

**✅ VERIFICADO (2026-07-20):** El repo real es **`github.com/contains-studio/agents`** — 38 subagentes por departamentos (engineering 7, product 3, marketing 7, design 5, PM 3, ops 5, testing 5, bonus 2), incluye `growth-hacker` y `frontend-developer`. El `msltarzewski/agency-agents` y el "144" del video estaban MAL. Los subagentes van a `.claude/agents/`. **Decisión: NO instalar los 38** (bloat); creamos 2 curados a medida (`reviewer`, `web-qa`) y cherry-pickeamos de contains-studio si hace falta.

---

## 05 - Claude + Meta (campañas, catálogos, ads)
**TEMA:** Crear/gestionar campañas y catálogos de Meta usando Claude para estructurar.
**RESULTADO FINAL:** Estructura de campañas, catálogos y anuncios lista para desplegar en Meta.

**HERRAMIENTAS / REPOS / APPS:** Claude · Meta Ads / Meta Developers [URLs no especificadas]
**REQUISITOS PREVIOS:** Cuenta Meta Ads / Business Manager · acceso a Claude.

**PASO A PASO:**
1. Decirle a Claude objetivos, público, presupuesto y catálogo.
2. Claude devuelve segmentación, copies y organización del catálogo.
3. Implementar en el Administrador de Anuncios de Meta.

**COMANDOS / CONFIG:** [no especificado]
**COSTOS / LÍMITES:** [no especificado]

**⚠️ Nota mía:** Video genérico, sin método concreto (no muestra API ni comandos). Recordar la restricción real: **camisetas réplica y vapers NO se pueden anunciar en Meta** (ban de cuenta). Ads solo para accesorios genéricos; el resto, orgánico + WhatsApp.

---

## 06 - Ahorro de tokens (info sin releer)
**TEMA:** Ahorrar hasta 99% de tokens en Claude Code con un paquete que ejecuta en runtime local.
**RESULTADO FINAL:** Sistema que ejecuta procesos en la PC local y devuelve solo el resultado a Claude, en vez de que Claude lea archivo por archivo.

**HERRAMIENTAS / REPOS / APPS:**
- Claude Code
- "Claude Skill Marketplace" (claude-skills-marketplace) [URL no especificada]
- "Claude Code - Execution Runtime" (paquete de Python) [URL no especificada]
  - Descripción vista: *"Python package for Claude Code implementing the execution-runtime tool for 99% token savings."*

**REQUISITOS PREVIOS:** Claude Code instalado.

**PASO A PASO:**
1. Entrar al marketplace de skills de Claude.
2. Buscar/instalar el paquete `execution-runtime`.
3. En vez de leer archivos uno a uno (gasta tokens), lanza un script local que procesa y devuelve solo el resultado final.

**COSTOS / LÍMITES:** afirma hasta 99% de ahorro de tokens.

**⚠️ Nota mía:** El concepto es **real y correcto** (ejecutar local + devolver solo resultado = lo que ya hacemos con Bash/repo-indexer/smart-file-selector). El **"99%" es marketing** — depende de la tarea. Claude Code ya hace gran parte nativo. Este es el video clave de tu obsesión por tokens (#6): vale evaluarlo, pero probablemente lo replicamos sin depender de un paquete de terceros. Verificar qué es exactamente ese "marketplace" y el paquete (riesgo de terceros ejecutando código local).

---

## 07 - Segundo cerebro Obsidian (grafo)
**TEMA:** Montar un "segundo cerebro" en Obsidian conectado con Claude, archivos en grafo vía Markdown.
**RESULTADO FINAL:** Obsidian interconecta visualmente los archivos y Claude los lee/encuentra más rápido (ahorro de tokens).

**HERRAMIENTAS / REPOS / APPS:**
- Obsidian → obsidian.md
- Claude app de **escritorio** (no navegador)

**REQUISITOS PREVIOS:** app de escritorio de Claude instalada.

**PASO A PASO:**
1. Descargar/instalar Obsidian desde obsidian.md.
2. En Obsidian: "Abrir una carpeta como bóveda" → elegir la carpeta local donde vive la info de Claude.
3. En Claude escritorio, pegar el prompt de configuración; Claude arma el sistema solo, haciendo preguntas.
   - Prompt visto: *"Quiero que me ayudes a crear mi 'segundo cerebro' en esta carpeta."*
   - Reglas vistas (transcripción imperfecta): todo en español simple · formato Markdown (bold, enlaces `[[página]]`, frontmatter, etiquetas) · estructura simple para arrancar · no tocar código.

**COSTOS / LÍMITES:** [no especificado]

**⚠️ Nota mía:** Coincide EXACTO con lo que propuse en la auditoría: **apuntar el vault de Obsidian a la carpeta del repo (`allimport/docs/`), que Obsidian y Claude lean los MISMOS archivos, sin sync**. El video valida la idea. Clave: la bóveda tiene que ser la carpeta del repo, no un almacén separado. Esto es tu #7 y encaja con la Ola 3 del roadmap.

---

## 08 - Graphify (grafo, mejor camino)
**TEMA:** Ahorrar tokens escaneando el código y creando un grafo de conocimiento; Claude navega el grafo en vez de releer archivos.
**RESULTADO FINAL:** Grafo interconectado que mapea archivos/relaciones/decisiones; sesiones siguientes navegan el grafo, no releen todo.

**HERRAMIENTAS / REPOS / APPS:**
- "Graphify" (repo GitHub) → Gemini repitió `msltarzewski/agency-agents` ⚠️ **arrastre del video 03, casi seguro incorrecto**
- Claude / Claude Code

**REQUISITOS PREVIOS:** Claude Code + un repo de código propio.

**PASO A PASO:**
1. Correr Graphify una vez → escanea todo el código.
2. Construye el grafo de conocimiento (conexiones, arquitectura, decisiones).
3. Sesiones siguientes: Claude navega el grafo en vez de leer archivo por archivo.
   - Frame visto: *"ingesting (34k → 670 tokens)"* (compresión fuerte).

**COSTOS / LÍMITES:** dice que evita planes caros ($250/mes) bajando el consumo de tokens.

**⚠️ Nota mía — DATO FUERTE:** tu repo **YA tiene `graphify-out/` en el `.gitignore`** (commit "Ignore graphify-out (generated knowledge-graph output)"). O sea: **graphify ya se corrió/probó en este repo.** Hay que ver qué generó y si sirvió. Este es tu #8 y es hermano del #6 (mismo objetivo: menos relectura). La URL real de Graphify hay que confirmarla (la de Gemini está contaminada del video 03).

---

## 10 - IA consigue clientes
**TEMA:** Captación automática en Instagram: un bot abre pestañas y envía mensajes automáticos a prospectos.
**RESULTADO FINAL:** Panel local que gestiona chats, responde, agenda llamadas y registra métricas de conversión "en piloto automático".

**HERRAMIENTAS / REPOS / APPS:**
- Instagram
- Panel local "Smart Acquisition" → `http://127.0.0.1:5000` (app Flask/Python local)

**REQUISITOS PREVIOS:** cuentas de Instagram configuradas + el software de automatización.

**PASO A PASO:**
1. El software abre pestañas e interactúa con **múltiples cuentas de Instagram** mandando DMs a prospectos.
2. Panel local (127.0.0.1:5000) con métricas en tiempo real.
3. Responde automático y agenda llamadas.

**COSTOS / LÍMITES:** [no especificado]

**🚩🚩 BANDERA ROJA (la más fuerte):** esto es un **bot de spam masivo por DM que viola los Términos de Instagram/Meta**. Consecuencia real: **ban de las cuentas** (shadowban primero, baneo después), y con "múltiples cuentas" acelerás el baneo. Instagram detecta automatización de DMs. NO lo voy a montar así. **Alternativa legal que sí escala:** responder/seguir a quien TE escribe o comenta (opt-in), + link en bio a WhatsApp + contenido orgánico. Ese sistema sí es vendible a clientes (#B) sin quemarte las cuentas. El #10 se reescribe como "agente que atiende y hace follow-up a leads que entraron", no "outbound masivo".

---

## 11 - Claude + Google Stitch
**TEMA:** Combinar Claude Code + Google Stitch para generar UIs/design systems vía MCP.
**RESULTADO FINAL:** Landing/app lista para producción, conectando el diseño de Stitch directo con Claude Code por MCP.

**HERRAMIENTAS / REPOS / APPS:** Google Stitch (gratis) · Claude Code.
**REQUISITOS PREVIOS:** acceso a Google Stitch + Claude Code.

**PASO A PASO:**
1. En Google Stitch: describir la app, subir referencias (Pinterest/Dribbble) → genera pantallas + design system.
2. Exportar → **MCP** → **Setup MCP**.
3. Elegir Claude Code, copiar el comando y correrlo en la terminal.

**COMANDO (literal del video):**
```
claude mcp add stitch \
  --transport http \
  --url "https://stitch.googleapis.com/mcp" \
  --header "X-Goog-Api-Key: <TU_API_KEY>"
```
**COSTOS / LÍMITES:** presentado como gratis.

**⚠️ Nota mía — SEGURIDAD:** el video mostró una **API key real** en pantalla (`AQAb8RN6I4-...`). **NO la uses** — es la del que grabó el video (o quedó expuesta y ya no sirve). Vos generás **tu propia** X-Goog-Api-Key. Este video es **útil y real** (Stitch es gratis, la integración MCP existe) → es tu #11 y sirve directo para terminar la web (#1) y para vender webs (#B). Buen candidato.

---

## 13 - 4 cosas que se rompen en web/app
**TEMA:** 4 errores comunes al lanzar una web/app y cómo corregirlos.
**RESULTADO FINAL:** App con error boundaries, estados de carga correctos, monitoreo de errores y páginas 404 propias.

**HERRAMIENTAS / REPOS / APPS:** Sentry.
**REQUISITOS PREVIOS:** una web/app lista para lanzar.

**PASO A PASO (las 4 cosas):**
1. **Error Boundaries** → evitar pantalla en blanco cuando falla un componente; mostrar mensaje amable + botón reintentar.
2. **Estados async** → 3 estados claros (cargando / error / vacío) + skeleton + reintento; evitar spinners infinitos.
3. **Monitoreo en producción** → integrar **Sentry** para enterarte del error antes que el cliente deje mala reseña.
4. **Páginas 404 propias** → para rutas inexistentes, imágenes rotas, links vacíos.

**COSTOS / LÍMITES:** [no especificado] (Sentry tiene free tier).

**⚠️ Nota mía:** **Excelente y 100% aplicable** a tu landing/app. Es tu #13 y coincide con la Ola 2-3 del roadmap (calidad de la web + Sentry). Los 4 puntos son buenas prácticas reales, no humo. Next.js ya trae `error.tsx`, `loading.tsx` y `not-found.tsx` nativos → esto se implementa rápido cuando toque la web.

---

## 16 - Claude trabaja solo hasta terminar
**TEMA:** Plan nocturno autónomo: Claude Code ejecuta múltiples tareas/agentes sin supervisión.
**RESULTADO FINAL:** Sistema que de noche despliega agentes en secuencia, cumple tareas, hace commits y migraciones mientras dormís.

**HERRAMIENTAS / REPOS / APPS:** Claude Code.
**REQUISITOS PREVIOS:** Claude Code + un plan de tareas detallado.

**PASO A PASO:**
1. Planificar las tareas nocturnas en un documento (ej. `NIGHT-PLAN`).
2. Comando `goal` con reglas para que ejecute el flujo sin pedir permiso en cada paso.
3. Ver en la terminal la tabla de fases: estado, modelo (Sonnet/Haiku/Opus) y tokens.

**CONFIG (vista en pantalla):**
- `NIGHT-PLAN — Ejecución autónoma nocturna` (plan por bloques).
- Reglas de oro (no negociables):
  1. Nunca dejes de compilar (nunca `git add -A`, nunca `git push --force`).
  2. Migraciones aditivas/idempotentes (`IF NOT EXISTS`), correr con `node --env-file=.env.local`.

**COSTOS / LÍMITES:** [no especificado]

**⚠️ Nota mía:** Es tu #16. El concepto (autonomía + reglas de oro + plan escrito) es **bueno y real** — de hecho las "reglas de oro" son EXACTO lo que propuse (CI que no rompe build, migraciones seguras). PERO: la autonomía sin supervisión es **peligrosa sin los guardrails de la Ola 1** (CI gate + permisos + allowlist). Orden correcto: primero cimientos, DESPUÉS soltarlo de noche. `goal` parece un `/command` custom o un script; hay que ver cuál. En este entorno remoto ya existe algo parecido (plan mode + tareas). Fuerte candidato, pero con red puesta primero.

---

## 17 - Repo que edita videos solo
**TEMA:** OpenMontage — repo open source de producción de video con agentes + pipelines.
**RESULTADO FINAL:** Estudio de video automatizado que convierte guiones/referencias en videos terminados, con herramientas libres.

**HERRAMIENTAS / REPOS / APPS:**
- **OpenMontage** → `github.com/calesthio/OpenMontage` ⚠️ (verificar URL)
- Piper (voz/TTS) · Remotion (render) · Pexels / NASA / Wikimedia (footage libre)
- Tags vistos: python, agent, flux, tts, ffmpeg, remotion, text-to-video, stable-diffusion, elevenlabs, agentic-ai

**REQUISITOS PREVIOS:** Python, FFmpeg, Node.js instalados + saber usar GitHub.

**PASO A PASO:**
1. Entrar al repo OpenMontage.
2. Dar un link o idea de video (TikTok/YouTube) → la IA analiza ritmo/hook/estructura y devuelve plan de producción.
3. Correr los pipelines: Piper (voz) + Remotion (render) + footage de Pexels/NASA/Wikimedia → pieza final.

**COSTOS / LÍMITES:** ruta 100% gratis con alternativas sin APIs pagas.

**⚠️ Nota mía:** Tu #17. Coincide con la skill `remotion-video-creation` que ya tenés. Útil para generar contenido de marketing (reels de productos, fechas del calendario). Verificar el repo real (`calesthio/OpenMontage`) y su estado. Alternativa/atajo pago: Higgsfield (ya lo tenés como opción). Candidato para la fase de marketing, no urgente.

---

# ✅ TODOS LOS VIDEOS PROCESADOS (11/11): 02, 03, 05, 06, 07, 08, 10, 11, 13, 16, 17
## Faltan las FOTOS (las leo yo): 04, 09, 12, 15, 18, 19, 20
