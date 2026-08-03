# PLAN MAESTRO — All Import
### Orden de prioridad definitivo + conocimiento aprendido. 2026-07-20
### Base: 11 videos (Gemini) + 37 fotos (OCR) + auditoría del repo. Ver `videos-analisis.md` y `fotos-analisis.md`.

---

## Contexto del negocio (para no perderlo nunca)
- **All Import** (Córdoba, @allimport.cba): importa y vende **producto físico** (camisetas de fútbol réplica, auriculares TWS, parlante, power bank, cables, vaper).
- Vende por **WhatsApp + Instagram**. Quiere sumar **MercadoLibre + e-commerce propio**.
- Además quiere **vender webs y agentes de WhatsApp a terceros** (línea de servicios).
- Trabaja **solo**. Paga **Claude + Gemini** (+ Higgsfield si hace falta). ~USD 60/mes.
- Stack del repo: Next.js 15 + React 19 + three/R3F + Tailwind 4 (landing). El producto/app aún no existe como código.

---

## ORDEN DE PRIORIDAD DEFINITIVO (22 items, sin agrupar)

### FASE A — Aprender Claude (gratis, YA, desbloquea todo)
| # | Qué | Verdad |
|---|---|---|
| 19 | 5 comandos: `/init` `/context` `/compact` `/plan` `/agents` | 🟢 Oro — base |
| 20 | Crear skills con `skill-creator` | 🟢 Útil |
| 18 | Rutina para dominar (Cowork + `about-me.md`) | 🟢 Útil (es Cowork, no CLI) |

### FASE B — Cimientos del repo (gratis, YA)
| # | Qué | Verdad |
|---|---|---|
| — | **CLAUDE.md** (`/init`) + limpiar secretos `.mcp.json` + gate CI | 🟢 **Arrancá acá** |
| 04 | 5 cosas para no ser hackeado (RLS, CORS, env, rate-limit, sanitizar) | 🟢 Oro |
| 12 | 3 prompts para proteger (vulns, endpoints, validar) | 🟢 Oro (mismo tema que 04) |

### FASE C — Memoria / tokens (gratis)
| # | Qué | Verdad |
|---|---|---|
| 06 | Ahorro de tokens (ejecutar local) | 🟡 Real, "99%" humo, replicar nativo |
| 08 | Graphify (grafo) — **ya corrió en tu repo** (`graphify-out/` en .gitignore) | 🟡 Revisar qué dejó |
| 07 | Obsidian segundo cerebro (vault = carpeta del repo) | 🟢 Valida mi propuesta |
| 15 | Conectores — instalar solo ~6: GitHub, Playwright, Supabase, Figma, Obsidian, Vercel | 🟢 Referencia |

### FASE D — Autonomía
| 16 | Claude trabaja solo (reglas de oro) — **con la red de Fase B puesta primero** | 🟡 Bueno con guardrails |

### FASE E — Cerebros (config, en paralelo)
| 21 | Proyecto en Gemini (estratega) | 🟢 Config |
| 22 | Proyectos en Claude (marketing/videos) | 🟢 Config |

### FASE F — Construir producto
| # | Qué | Verdad |
|---|---|---|
| 11 | Claude + Google Stitch (diseño) | 🟢 Oro (gratis, comando real) |
| 01 | Terminar la web profesional | 🟢 Tu producto |
| 13 | 4 cosas que se rompen en web/app (+ Sentry) | 🟢 Oro |
| 02 | Agente de WhatsApp | 🟡 Núcleo negocio; falta URL repo |
| 05 | Claude + Meta | 🔴 Humo genérico; valor lo pongo yo |
| 10 | IA consigue clientes (versión legal, sin spam) | 🔴🚩 Reescribir |
| 03 | Repo de agentes (verificar URL) | 🟡 Verificar |
| 17 | OpenMontage (video) | 🟡 Marketing, no urgente |

### FASE G — Baja prioridad
| 09 | 7 prompts genéricos | 🟡 Plantillas (ver `prompts-utiles.md`) |

---

## Conocimiento nuevo aprendido (resumen para los dos)

**De los videos:**
- **#11 Google Stitch:** `claude mcp add stitch --transport http --url "https://stitch.googleapis.com/mcp" --header "X-Goog-Api-Key: <TU_KEY>"`. Diseño gratis → código. ⚠️ generar TU propia key.
- **#13:** Next trae nativo `error.tsx` (error boundary), `loading.tsx` (estado carga), `not-found.tsx` (404). + Sentry para monitoreo.
- **#08 Graphify:** ya se corrió en el repo — revisar `graphify-out/`.
- **#17 OpenMontage:** `github.com/calesthio/OpenMontage` (verificar) — video con Remotion + Piper + footage libre.
- **#10:** bot de DMs masivos en IG = **ban de cuentas**. Reescribir a opt-in/atención.

**De las fotos:**
- **5 comandos reales:** `/init` (crea CLAUDE.md), `/context` (% ventana), `/compact` (comprime), `/plan` (plan mode), `/agents` (subagentes).
- **skill-creator:** `/plugin` → instalar `skill-creator` → 1 prompt específico → responde preguntas → genera `SKILL.md`.
- **Setup Cowork (laia.academy):** 4 carpetas (About Me / Projects / Templates / Claude Outputs) + `about-me.md` + `anti-ai-style.md` + `/schedule` para tareas automáticas.
- **Seguridad (sebas.soto22):** los prompts están en `prompts-utiles.md`.
- **15 conectores:** para All Import sirven GitHub, Playwright, Supabase, Figma, Obsidian, Vercel. El resto (AWS, Docker, Jupyter, Slack, Notion, Excel) no aplica hoy.

---

## Empezar por
**FASE A completa → FASE B (CLAUDE.md + seguridad).** El 80% de los videos/fotos dicen lo mismo: configurá bien la base antes de construir. WhatsApp/Meta/web rinden 3x con la base puesta.
