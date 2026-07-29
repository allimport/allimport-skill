# 01 — PLAN (lista completa, precisa, sin comprimir)

Mapa de trabajo, Gemini. 38 pasos + opcionales + sueltos. Cada uno con símbolo, estado
REAL (verificado por Claude, no supuesto) y su especificación. No inventes nada que no
esté acá — si falta un dato, preguntale al dueño.

**Símbolos:** 🤖 generás el prompt, Claude ejecuta · 🙋 tarea del dueño (sin prompt de
código) · 🤝 el dueño consigue algo (cuenta/token) primero, DESPUÉS generás el prompt.
**Estados:** ✅ HECHO (verificado) · ⬜ FALTA · 🔶 EN CURSO (empezado, falta cerrar).

## Objetivos (fijados, no volver a redefinir)
- **O1 — Crecer en redes** (marca personal `@_agus_moreno_`, foco #1): contenido asistido,
  vos grabás/fotografiás, Claude edita+guiona+investiga.
- **O2 — Agente de WhatsApp**: responde 12-19hs, detecta mayorista/minorista, asesora,
  arma pedido, sugiere entrega, **NUNCA cobra** — avisa al dueño (handoff) para cerrar y cobrar.
- **O3 — CRM**: ficha por cliente (tipo_compra, presupuesto, zona, etiqueta, notas).
- **Modelo de negocio real:** All Import es sobre todo **mayorista/reventa + mentoría** a
  emprendedores 18-28 años ("no solo te llevás el producto, te llevás mi experiencia").

## Mapa del repo (para el campo CONTEXTO de tus prompts)
- `web/` — landing (Next.js 15, catálogo en `web/src/components/site/data.ts`).
- `skills/` — biblioteca (propias + contains-studio agents + claude-seo + graphify + openmontage).
- `.claude/agents/` — subagentes: `reviewer`, `web-qa` (propios) + 37 contains-studio + 18 claude-seo.
- `docs/` — núcleo documental (SSOT) + `MAPA-CONOCIMIENTO.md` (hub Obsidian/Graphify).
- `contenido/` — CALENDARIO-SEMANAL, GANCHOS-Y-GUIONES, DESIGN, VOZ-AGUS, AGENTE-WHATSAPP, EJEMPLOS-RESPUESTAS.
- `historias/` — editor de fotos → historias IG. `video/` — proyecto Remotion.
- `proveedores/` — analizador de chats + template CRM.
- `_research/` — plan, objetivos, investigación (este paquete).
- Verificación estándar: `cd web && npx tsc --noEmit && npm run build`.

## FASE A · Contenido (O1, foco #1, hacer primero)
| # | Paso | Estado | Quién |
|---|---|---|---|
| A1 | Investigar viralidad del nicho (qué funciona + por qué) | ✅ `contenido/HALLAZGOS-VIRALES.md` | — |
| A2 | 3 guiones de reel basados en esa investigación | ✅ `contenido/GANCHOS-Y-GUIONES.md` | — |
| A3 | Perfil `@_agus_moreno_` (bio, foto, link WhatsApp) | ⬜ | 🙋 |
| A4 | Bloque fijo diario (horario no negociable) | ⬜ | 🙋 |
| A5 | Grabar los 3 reels + CapCut (+ subtítulos de Claude) | ⬜ | 🙋+🤖 |
| A6 | Semana de historias (según lo viral) | ⬜ | 🤖 |
| A7 | Carrusel de marca (DESIGN) | ⬜ | 🤖 |
| A8 | Fotos de producto → editar a historias | ⬜ | 🙋+🤖 |
| A9 | Clips de producto (Remotion) cuando haga falta | ⬜ | 🤖 |
| A10 | Video IA hiperrealista (opcional, ojo "fake") | ⬜ | 🤝 |

**Ya hecho de base para esta fase:** `CALENDARIO-SEMANAL.md`, `GANCHOS-Y-GUIONES.md` (10
ganchos genéricos), `DESIGN.md` (branding), editor de fotos y Remotion ya funcionando,
skill `allimport-viral-research` lista para A1.

## FASE B · Agente de WhatsApp (O2, en paralelo)
| # | Paso | Estado | Quién |
|---|---|---|---|
| B1 | Precios + combos de reventa | ⬜ **BLOQUEA TODO B** | 🙋 |
| B2 | Más mensajes reales para afinar voz | 🔶 (ya hay base sólida) | 🙋 |
| B3 | Docker n8n + WAHA + API key Anthropic + QR WhatsApp | ⬜ | 🙋+🤝 |
| B4 | Armar el workflow n8n (responde+etiqueta+handoff+memoria) | ⬜ (depende B3) | 🤖 |
| B5 | Captación de leads legal (opt-in, follow-up) | ⬜ (depende B4) | 🤝 |

**Ya hecho:** `AGENTE-WHATSAPP.md` (spec completa: horario 12-19, NUNCA cobra, flujo
mayorista/minorista, entrega por zona, garantía, confianza, diferencial, consigue a
pedido), `VOZ-AGUS.md` (voz real con respuestas por escenario), `EJEMPLOS-RESPUESTAS.md`
(conversaciones completas), `n8n-whatsapp.md` (stack investigado: n8n+WAHA+Claude+planilla).

## FASE C · CRM / memoria (O3, sale del agente)
| # | Paso | Estado | Quién |
|---|---|---|---|
| C1 | Agente carga cada cliente en la planilla | ⬜ (depende B4) | 🤖 |
| C2 | Etiquetar y seguir por WhatsApp | ⬜ | 🙋 |
| C3 | Reportes (potenciales a seguir, compras del mes) | ⬜ | 🤖 |
| C4 | Correr analizador de proveedores del mes | ⬜ | 🙋 (on demand) |

**Ya hecho:** template CSV con columnas `tipo_compra/presupuesto/primera_vez_emprende/
zona/etiqueta/notas`, skill `allimport-crm`.

## FASE D · Investigación y rutinas
| # | Paso | Estado | Quién |
|---|---|---|---|
| D1 | Marco de viralidad/competencia (continuo) | ⬜ | 🤖 |
| D2 | Rutinas: métricas IG + plan nocturno autónomo | ⬜ | 🙋 |

## FASE E · Tooling / infra
| # | Paso | Estado | Quién |
|---|---|---|---|
| E1 | Ahorro de tokens | ✅ nativo + Graphify | — |
| E2 | Obsidian + Graphify (segundo cerebro) | ✅ **HECHO Y FUNCIONANDO** | — |
| E3 | Conectores (GitHub/Figma/Supabase/Vercel) | ⬜ | 🤝 |
| E4 | Verificar comandos Revolutia | ⬜ | 🤖 |
| E5 | Proyectos en Claude (marketing, etc.) | ⬜ | 🙋 |
| E6 | Plan 7 días para dominar Cowork | ⬜ | 🙋 |
| E7 | 7 prompts de productividad | ✅ guardados (baja prioridad) | — |

**E2 detalle (recién completado):** Obsidian instalado apuntando a la raíz del repo +
Graphify (`graphifyy` vía pipx) instalado, indexando `_research/` con extracción semántica
por Gemini (API key propia), volcado dentro de la bóveda de Obsidian (`--obsidian`). Los
dos leen los mismos archivos, sin sync. Ver `docs/OBSIDIAN-GRAPHIFY.md`.

## FASE F · Seguridad (recién cuando exista backend — hoy NO aplica)
| # | Paso | Estado | Quién |
|---|---|---|---|
| F1 | 5 cosas anti-hackeo (RLS/CORS/env/rate-limit/sanitizar) | ⬜ | 🤝 |
| F2 | Proteger Claude (3 prompts de seguridad) | ⬜ | 🤝 |

## FASE G · Web (última prioridad — el dueño decide cuándo)
| # | Paso | Estado | Quién |
|---|---|---|---|
| G1 | Terminar la web | ⬜ | 🤖 |
| G2 | Web cinemática GSAP/parallax | ⬜ | 🤖 |
| G3 | Deploy en Vercel | ⬜ | 🤝 |
| G4 | SEO de la web | ⬜ (claude-seo ya instalado, listo) | 🤖 |
| G5 | Google Stitch (diseño→código MCP) | ⬜ | 🤝 |

## Opcionales / con cuidado (no se descartan)
| # | Paso | Nota |
|---|---|---|
| OP1 | Claude + Meta (ads) | ⚠️ NO anunciar réplicas ni vapers (ban) |
| OP2 | Seedance / video IA | Ojo look "fake"; ya hay Remotion/Higgsfield |
| OP3 | Chat/Cowork/Code | Referencia, leer nomás |

## Pendientes sueltos (Drive)
- Arrastrar los 14 videos sueltos del Drive a las 13 carpetas ya creadas (V01-V12 + V00). 🙋
- Identificar los 2 videos sobrantes (Drive tiene 14, Gemini identificó 12). 🙋

---

## YA HECHO — resumen (no rehacer)
5 comandos Claude · Gem configurado · web errores/404/carga · skill
`allimport-catalog-checker` · analizador de chats proveedores · editor de fotos ·
Remotion · 4 figuritas editadas · CALENDARIO-SEMANAL · GANCHOS-Y-GUIONES (10) · DESIGN ·
template CRM · repos instalados (contains-studio 37 agentes, claude-seo 25 skills+18
agentes, graphify, openmontage skills) · find-skills/skills.sh documentado ·
OBJETIVOS.md · n8n-whatsapp.md investigado · skills `allimport-viral-research` y
`allimport-crm` creadas · VOZ-AGUS.md · AGENTE-WHATSAPP.md · EJEMPLOS-RESPUESTAS.md ·
drive-catalogo.md (12 videos mapeados) · MAPA-CONOCIMIENTO.md · OBSIDIAN-GRAPHIFY.md ·
GUIA-PASO-A-PASO.md · **Obsidian + Graphify instalado y funcionando en la compu del dueño**.

## Rutina de trabajo
1. El dueño te dice qué paso quiere hacer.
2. Buscás ESE paso en la tabla de la fase correspondiente (no otro).
3. Respondés según el protocolo de tus instrucciones (ver `INSTRUCCIONES-GEM.md`).
4. Un paso pasa a ✅ solo cuando Claude lo verificó en el repo — no antes.
