# Análisis de FOTOS (leídas por Claude vía OCR de Drive)
### Fuente: capturas @sebas.soto22

---

## 04 - No ser hackeado (5 cosas que decirle a Claude)
Portada: *"No necesitás entender cómo funciona cada cosa. Solo saber cómo se llama, se lo decís a Claude, y él lo hace."*

Las 5 reglas de seguridad (cada una con el prompt que le decís a Claude):
1. **Row Level Security (RLS)** — sin esto cualquier usuario ve datos de otros.
   → *"Activá RLS en Supabase para que cada usuario solo vea sus propios datos."*
2. **CORS** — sin esto cualquier web le puede hablar a tu servidor.
   → *"Configurá CORS para que solo mi app pueda hacer peticiones al backend."*
3. **Variables de entorno** — API keys en el código = cualquiera las ve en GitHub.
   → *"Mové todas las credenciales sensibles a variables de entorno."*
4. **Rate limiting** — sin esto te tiran el servidor con peticiones.
   → *"Agregá rate limiting para limitar peticiones por usuario por minuto."*
5. **Sanitizar inputs** — sin esto inyectan código malicioso (SQL injection).
   → *"Sanitizá todos los inputs para prevenir inyecciones SQL."*

**✅ Nota mía:** Sólido, cero humo. Son 5 básicos reales de seguridad. Es tu #4 y va directo a la **Ola 1** (blindaje). Ojo: RLS/CORS/rate-limiting aplican **cuando exista el producto con backend/Supabase**; "variables de entorno" aplica **YA** (justo lo que marqué del `.mcp.json` con tokens). Tenemos skills que cubren esto: `secrets-detection`, `rate-limiting-implementation`, `security-headers-configuration`, `nextjs-supabase-auth`.

---

## 12 - Proteger a Claude (3 prompts de seguridad) — @sebas.soto22
Mismo autor que el #04. Es la CONTINUACIÓN del #04. "Dile esto a Claude y protegé tu app/web en minutos":
- **PROMPT #1 — Encontrar vulnerabilidades:** *"Revisá mi código y decime qué vulnerabilidades de seguridad tiene. Explicame cada una en términos simples y cómo arreglarla."*
- **PROMPT #2 — Proteger endpoints:** *"Analizá mis rutas de API y decime cuáles no tienen autenticación o validación. Dame el código para protegerlas."*
- **PROMPT #3 — Validar datos del usuario:** *"Revisá dónde recibo datos del usuario y decime si hay riesgo de inyección o datos maliciosos. Mostrame cómo validarlos correctamente."*

**✅ Nota mía:** #04 y #12 son **el mismo tema (seguridad)** → los fusiono en un solo bloque "Blindaje". Reales y útiles. Cubiertos por skills `owasp-security-audit`, `secrets-detection`, `api-security-design`. Aplican de lleno cuando exista el producto con backend.

---

## 19 - 5 comandos de Claude Code — @adrian.alvarezl
Los 5 comandos (todos reales y nativos de Claude Code):
1. **`/init`** → genera `CLAUDE.md` (memoria del proyecto). "Al empezar en carpeta nueva."
2. **`/context`** → muestra cuánta ventana llevás usada (ej. "62% en uso"). "Si sentís que se pierde."
3. **`/compact`** → comprime el chat y guarda lo importante. "Antes de que se llene la ventana."
4. **`/plan`** → modo plan: propone primero, ejecuta después de que aprobás. "Cambios grandes/delicados."
5. **`/agents`** → abre panel para crear subagentes con tarea fija. "Para repetir el mismo trabajo."

**✅ Nota mía:** **ORO.** Los 5 son reales y son EXACTO lo que veníamos diciendo: `/init` = el CLAUDE.md (Ola 1), `/agents` = subagentes (Ola 2), `/plan` = plan mode, `/context`+`/compact` = tu obsesión por tokens. Esto es la base del aprendizaje (#19). Nota: `/compact` existe pero conviene `/clear` entre tareas distintas.

---

## 20 - Crear una Skill con skill-creator — @dimoni.ai
(La carpeta se llamaba "cómo usar Claude Code" pero el contenido es un tutorial de **crear skills**.)
1. **PASO 1 — Instalar skill-creator:** en Claude Code `/plugin` → buscar `skill-creator` → instalar → `/reload-plugins`.
2. **PASO 2 — Crear la skill con 1 prompt:** describir muy específico qué hace la skill (ej. "Resumen semanal de YouTube…").
3. **PASO 3 — Afinar:** skill-creator te hace preguntas (acceso a datos, alcance, formato del informe, genérica vs personalizada).
4. **PASO 4 — Genera `SKILL.md`:** con frontmatter `name`/`description` en `.claude/skills/<nombre>/SKILL.md`.
5. **PASO 5 — Skill creada:** queda en `~/.claude/skills/<nombre>/`.

**✅ Nota mía:** Real y útil. Es justo lo que YA hicimos esta sesión (registrar/crear skills, arreglé el frontmatter de una). Tenés `skill-creator` disponible. Sirve para tu #20 y para fabricar skills a medida (ej. una skill "calendario de fechas All Import").

---

## 09 - 7 prompts (valen más que 4 personas) — @dozeroaia (portugués)
Prompts genéricos de pensamiento/productividad:
1. **Destructor de procrastinación:** "Tengo que hacer [tarea]. Partila en 5 micro-pasos de 10 min. Dame el primero ahora."
2. **Editor implacable:** "Reescribí este texto como si lo publicara Harvard Business Review. Cortá lo innecesario, subí la autoridad."
3. **Abogado del diablo:** "Acá está mi idea. Dame las 5 razones por las que va a fracasar. Sé brutal."
4. "Simulá una reunión difícil. Sos el cliente escéptico. Yo presento. Empezá."
5. "Analizá este dato y decime qué NO estoy viendo."
6. "Creá 10 títulos para este post. Los 3 mejores con justificación."
7. **El más poderoso:** "Sos mi estratega personal. Mi objetivo es [X]. Dame un plan de 30 días, semana por semana, con acciones específicas."

**⚠️ Nota mía:** Están bien pero son **genéricos** (sirven en cualquier chat, no son técnicos ni específicos de tu negocio). No es "reemplazar 4 personas" — es marketing. Prioridad **baja**. Los guardo como plantillas y listo; no montan nada.

---

## 18 - Plan para dominar Claude (setup en 10 pasos) — @laia.academy
OJO: es sobre **Claude.ai / Cowork (app de escritorio)**, no Claude Code CLI. Igual es muy relevante para tu #18 y #22.
- **Problema:** "La mayoría usa Claude como chat. Error. Es un sistema de trabajo." 7 pasos, 7 días.
1. Descargar **app de escritorio** (claude.com/download, Mac/Win; Cowork solo en desktop; Pro $20/mes).
2. Elegir modo: Chat / Proyectos / **Cowork** (trabajo con archivos reales) / Code. "Para trabajo serio, Cowork."
3. Crear **4 carpetas**: About Me · Projects · Templates · Claude Outputs.
4. Escribir **2 archivos base**: `about-me.md` (quién sos, prioridades) + `anti-ai-style.md` (frases que Claude nunca debe usar).
5. Dejar de escribir prompts: **template maestro** que carga tu contexto (Text Shortcut en Mac).
6. Dejar que **Claude te pregunte** (AskUserQuestion, multi-select, drag-to-rank).
7. Instalar **un solo plugin** (marketing/data/legal) y dominarlo.
8. **Conectar herramientas** (Conectores: Google, Notion, Slack).
9. Construir un **Proyecto para tu equipo** (instrucciones globales + subcarpeta por proyecto).
10. Programar tarea automática con **`/schedule`** (Cowork corre mientras dormís).

**✅ Nota mía:** Muy bueno para el #18 y conecta directo con el #22 (Projects). `about-me.md` + `anti-ai-style.md` = versión personal del `CLAUDE.md`. Es de **Cowork (claude.ai)**, distinto de Claude Code — aclarar para no confundir las dos herramientas. Los 4 folders + 2 archivos = buena estructura para tu "segundo cerebro" (se combina con #07 Obsidian).

---

## 15 - 15 conectores de Claude Code
"15 Claude Code Combinations That Turn AI Into Your Full Tech Team":
1. **+ Obsidian** = Second Brain
2. **+ GitHub** = Autopilot Reviews (revisar PRs)
3. **+ Notion** = Wiki auto-actualizada
4. **+ Playwright** = QA Engineer (tests de browser)
5. **+ Figma** = Design-to-Code
6. **+ Supabase** = Weekend SaaS (DB, auth, storage)
7. **+ Excel** = Data Analyst
8. **+ Chrome** = Web Automation
9. **+ Docker** = DevOps Sidekick
10. **+ Postgres** = SQL Whisperer
11. **+ Slack** = Team Assistant
12. **+ Vercel** = Live-Site (deploy)
13. **+ Jupyter** = Research Partner
14. **+ AWS** = Cloud Architect
15. **+ Terminal** = 10x Developer

**✅ Nota mía:** Es tu **#15**, es una lista de referencia. Para All Import los que importan HOY: **GitHub, Playwright, Supabase, Figma, Obsidian, Vercel**. El resto (AWS, Docker, Jupyter, Postgres directo, Slack, Notion, Excel) = no aplican a tu caso ahora. No instalar los 15 — instalar los ~6 útiles.
