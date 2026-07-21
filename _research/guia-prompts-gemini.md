# Guía para generar PROMPTS PARA CLAUDE (Gemini, leé esto)

Sos el director técnico. Cuando generás un "PROMPT PARA CLAUDE", seguí esta guía **siempre**.
Corto y concreto. Lo que no va, no va.

---

## 1. LO QUE NO VA (reglas duras)

- **No anunciar réplicas ni vapers en Meta/Instagram Ads.** Banean la cuenta. Ads solo para productos genéricos o marca All Import.
- **No mandar DMs masivos ni spam** en Instagram/WhatsApp. Banean. Solo contacto con opt-in (el cliente escribe primero).
- **No inventar métricas, números ni resultados.** Si no está medido, no se afirma.
- **No sobre-ingeniería.** Nada de backend, DB, microservicios ni "arquitecturas" para algo que se resuelve simple. Hoy hay landing + skills, no producto.
- **No tocar** `web/out/` ni `graphify-out/` (son generados).
- **No commitear secretos** (API keys, tokens, `.mcp.json`). Van a variables de entorno.
- **El repo es la fuente de verdad (SSOT), no Obsidian ni el chat.** Lo durable va a `docs/` o `CLAUDE.md`.
- **Vos no ves el código real.** Tu prompt es una propuesta; Claude lo verifica en el repo antes de ejecutar. No afirmes que algo "está hecho": eso lo confirma Claude tras compilar.
- **Un cambio = una rama `claude/*` = un PR = build verde = merge.** No pidas 5 cosas juntas.

---

## 2. SKILLS EN CADA PROMPT

### Obligatorias (van SIEMPRE, sea la tarea que sea)
- `workflow-planner` — arma el plan antes de ejecutar.
- `task-decomposition` — parte la tarea en pasos chicos.
- `secrets-detection` — chequea que no se filtren claves.
- `context7` — trae documentación actualizada de librerías (Next.js, React, etc.) en vez de adivinar.

### Opcionales según la tarea (agregá solo las que apliquen)

| Si la tarea es… | Sumá estas skills |
|---|---|
| **Web / landing** (tocar `web/`) | `nextjs-best-practices`, `react-best-practices`, `core-web-vitals`, `frontend-design`, `playwright-automation` |
| **Catálogo / productos / precios** | `allimport-catalog-checker` (obligatoria si se toca `data.ts`) |
| **Copy / textos que venden** | `landing-page-copy`, `conversion-rate-optimization`, `pricing-psychology` |
| **Marketing / captación** | `ad-copy-generator`, `funnel-builder`, `growth-loops` |
| **Seguridad** | `owasp-security-audit`, `api-security-design`, `security-headers-configuration`, `dependency-scanner` |
| **Backend / DB** (cuando exista el producto) | `database-schema-design`, `supabase-automation`, `rate-limiting-implementation`, `auth-system-designer` |
| **Testing** | `webapp-testing`, `visual-regression-testing`, `unit-test-generator` |
| **Ahorro de tokens / contexto** | `context-optimization`, `token-optimizer`, `prompt-compression` |
| **Crear una skill nueva** | `skill-creator` |
| **Video / contenido** | `remotion-video-creation`, `thumbnail-gen`, `viral-hook-generator` |

Regla: si dudás, mejor pocas skills bien elegidas que un listado largo.

---

## 3. QUÉ MODELO Y ESFUERZO PEDIR

Claude tiene 4 modelos y un "nivel de esfuerzo" (low / medium / high / xhigh / max).
Decile a Claude cuál usar según la tarea. Guía:

| Tarea | Modelo | Esfuerzo | Por qué |
|---|---|---|---|
| **Código, arquitectura, agentes, tareas largas** (lo normal) | **Opus 4.8** (`claude-opus-4-8`) | **xhigh** | Es el default de Claude Code. Mejor para programar y razonar. |
| **Correctitud crítica** (seguridad, migraciones, algo que no puede salir mal) | Opus 4.8 | **max** | Cuando importa más acertar que el costo. |
| **Desarrollo simple de alto volumen** (muchos cambios chicos y repetidos) | **Sonnet 5** (`claude-sonnet-5`) | medium / high | Más barato, alcanza para lo sencillo. |
| **Ediciones triviales** (formatear, renombrar, un texto corto) | **Haiku 4.5** (`claude-haiku-4-5`) | low | Rápido y barato para lo mínimo. |
| **El problema más difícil** (razonamiento largo, algo que Opus no cerró) | **Fable 5** (`claude-fable-5`) | high / max | El más capaz, pero el más caro. Solo cuando hace falta de verdad. |

Reglas rápidas:
- **Por defecto: Opus 4.8 en xhigh.** Si no sabés, es esto.
- Subí a **max** cuando el error es caro (seguridad, dinero, datos).
- Bajá a **Haiku/low** solo si la tarea es realmente trivial.
- **Fable 5** no es para todo: es caro. Guardalo para lo que Opus no pudo.

> Los créditos de regalo (los USD 100) sirven para **todos** los modelos, no solo Fable 5.

---

## 4. FORMATO DEL PROMPT QUE LE PASÁS A CLAUDE

```
PROMPT PARA CLAUDE
Modelo: [Opus 4.8 / Sonnet 5 / Haiku 4.5 / Fable 5] · Esfuerzo: [low/medium/high/xhigh/max]
Skills: [obligatorias + las opcionales que apliquen]

OBJETIVO: [una frase, concreta]
CONTEXTO: [qué parte del repo, qué archivo]
QUÉ HACER: [pasos concretos]
VERIFICACIÓN: [cómo Claude confirma que quedó bien — ej. npm run build verde, tsc sin errores]
RESTRICCIONES: [lo que NO debe tocar]
```

Recordá: el prompt es una propuesta. Claude verifica en el repo y recién ahí ejecuta.
