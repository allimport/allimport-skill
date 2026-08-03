# 03 — HERRAMIENTAS, SKILLS, GRAPHIFY Y MODELOS (guía específica)

Este archivo responde "¿con qué herramienta exacta hago esto?" — para que tus prompts a
Claude sean precisos, no genéricos. Usalo junto con `01-PLAN.md` (qué hacer) y
`INSTRUCCIONES-GEM.md` (protocolo/formato).

---

## 1. Qué modelo usar, según la tarea

| Tipo de tarea | Modelo | Esfuerzo | Por qué |
|---|---|---|---|
| Guion de reel / copy creativo / investigación de viralidad | `claude-opus-4-8` | xhigh | Necesita criterio, tono, síntesis — no es mecánico |
| Armar/ajustar el system prompt del agente de WhatsApp | `claude-opus-4-8` | xhigh | Lógica de negocio + seguridad (que nunca cobre) |
| Código de la web (componentes, features nuevas) | `claude-opus-4-8` | xhigh | Arquitectura y correctitud |
| Cambios masivos repetitivos (renombrar en muchos archivos, formatear) | `claude-sonnet-5` | medium | Alto volumen, bajo criterio |
| Edición trivial (typo, un valor, un color) | `claude-haiku-4-5` | low | Mecánico, no vale gastar Opus |
| Debug difícil que Opus no resolvió en 2 intentos | `claude-fable-5` | high/max | Reservado para atascos reales, es el más caro |
| Investigación con datos actuales (tendencias, precios de mercado) | `claude-opus-4-8` | xhigh, **Web: Sí** | Necesita buscar, no solo razonar |
| Auditoría SEO de la web | `claude-opus-4-8` | high | Usa la skill `seo`/`seo-audit` (claude-seo), no requiere xhigh siempre |

**Regla general:** default `claude-opus-4-8` xhigh. Bajás a Sonnet solo si la tarea es
mecánica y de alto volumen. Subís a Fable 5 solo si Opus se atascó de verdad (no por
default). Nunca inventes un modelo fuera de estos 4.

---

## 2. Cuándo usar Graphify (específico — no es "siempre")

Graphify **YA ESTÁ INSTALADO Y FUNCIONANDO** (Obsidian + Graphify unidos, con extracción
semántica por Gemini). No hay que instalarlo de nuevo. Reglas de uso:

**Usar Graphify (`graphify query "..."`) CUANDO:**
- Claude arranca una sesión nueva y necesita entender el estado del proyecto (en vez de
  releer 10+ archivos de `allimport/_research/` o `allimport/docs/` uno por uno).
- El dueño pregunta algo tipo "¿cómo se conecta X con Y?" o "¿qué depende de tal cosa?" —
  eso es exactamente lo que `graphify query`/`graphify explain`/`graphify path` resuelven.
- Se necesita ahorrar tokens en una tarea que toca muchos documentos de conocimiento
  (no código).

**NO hace falta Graphify CUANDO:**
- Es un cambio puntual en 1-2 archivos conocidos (Claude los lee directo, más rápido que
  consultar el grafo).
- Es código de `web/` (Graphify se usa hoy sobre `allimport/_research/`, no sobre la app).

**Mantenimiento (decirle a Claude que lo corra cuando corresponda):**
Después de agregar o cambiar documentos importantes en `allimport/_research/`, `allimport/docs/` o
`allimport/contenido/`, Claude debe re-indexar:
```
graphify update _research
```
Y si el dueño quiere verlo reflejado en su Obsidian (ejecuta él, en su Windows, no Claude):
```
graphify _research --obsidian --obsidian-dir "C:\Users\Bangho\Documents\allimport-skill"
```
**Importante:** nunca indexar todo el repo (`graphify update .`) — mete ruido de
`skills/` y `web/` (probado: 16.025 nodos vs 197 útiles solo en `allimport/_research/`). Indexar por
carpeta de conocimiento.

---

## 3. Qué skill usar, según la tarea (específico, con nombre exacto)

### Contenido / redes (O1)
| Necesito... | Skill exacta |
|---|---|
| Saber qué es viral en el nicho y por qué, antes de escribir | `allimport-viral-research` |
| Variantes de gancho para un reel | `viral-hook-generator` |
| Loop de crecimiento / estrategia de adquisición | `growth-loops` |
| Que el texto no suene a IA (guiones, captions) | `humanizer` |
| Clip de producto animado | `remotion-video-creation` (proyecto real en `allimport/video/`) |
| Miniatura/thumbnail | `thumbnail-gen` |
| Investigar tendencias de mercado más amplio | agente `trend-researcher` (contains-studio) |
| Estrategia específica de TikTok | agente `tiktok-strategist` (contains-studio) |
| Curaduría de contenido Instagram | agente `instagram-curator` (contains-studio) |

### Agente de WhatsApp (O2)
| Necesito... | Skill exacta |
|---|---|
| Ajustar el comportamiento/reglas del agente | editar `allimport/contenido/AGENTE-WHATSAPP.md` directo (no hay skill; es un doc de spec) |
| Que suene como el dueño | `allimport/contenido/VOZ-AGUS.md` (fuente de verdad del tono) |
| Humanizar las respuestas generadas | `humanizer` |

### CRM / clientes (O3)
| Necesito... | Skill exacta |
|---|---|
| Cargar/consultar/filtrar clientes | `allimport-crm` |
| Editar la planilla como Excel | skill `xlsx` |

### Web (FASE G, última prioridad)
| Necesito... | Skill exacta |
|---|---|
| Verificar el catálogo antes de un PR | `allimport-catalog-checker` (obligatoria si se toca `data.ts`) |
| Auditoría SEO completa | `seo-audit` (delega a 15 especialistas) |
| SEO técnico puntual | `seo-technical`, `seo-schema`, `seo-sitemap`, según el caso |
| React/Next.js best practices | `react-best-practices`, `nextjs-best-practices` |
| Performance | `core-web-vitals`, `lighthouse-optimizer`, `bundle-analyzer` |
| Seguridad (cuando haya backend) | `owasp-security-audit`, `api-security-design` |

### Siempre (en todo prompt, sin excepción)
`workflow-planner`, `task-decomposition`, `secrets-detection`, `context7`.

### Terceros instalados — cuándo usarlos
- **`claude-seo`** (25 skills + 18 agentes): recién en FASE G (web es última prioridad). No
  proponerlo para tareas de contenido/redes.
- **`graphify`**: ver sección 2 arriba.
- **`openmontage`** (skills vendorizadas, sin motor pesado instalado): solo si Remotion se
  queda corto para un video más elaborado. No es la opción por default — Remotion sí.
- **`contains-studio` agentes** (37): usar el agente puntual que aplique (`growth-hacker`,
  `frontend-developer`, `tiktok-strategist`, etc.), no invocar "todos".

---

## 4. Errores a NO repetir (aprendidos esta sesión)
- No instalar terceros sin revisar el install script primero (varios repos con el mismo
  nombre existen — verificar cuál es el oficial).
- No correr `graphify update .` sobre todo el repo (ruido).
- Instalar Graphify en Windows: usar `pipx install graphifyy` (doble y), NUNCA `pip install`
  directo (rompe con `ModuleNotFoundError` por resolución de entorno). Si pipx falla con
  "missing internal pipx metadata", el fix es `pipx install graphifyy --force`.
- Extracción semántica de Graphify (`--obsidian` sobre docs) necesita `GEMINI_API_KEY` (o
  Anthropic/OpenAI/DeepSeek) — sin key, solo indexa estructura de código, no analiza texto.
- API keys: nunca pedirle al dueño que las pegue en el chat. Se cargan como variable de
  entorno (`$env:GEMINI_API_KEY = "..."` en PowerShell) y punto.
