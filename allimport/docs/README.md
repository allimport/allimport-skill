# docs/ — Núcleo documental (SSOT)

Toda la documentación durable del ecosistema vive acá, versionada en git. Claude Code
la lee nativo; Gemini la usa como memoria/contexto. Sin puentes, sin sync.

## Índice
| # | Archivo | Qué es |
|---|---|---|
| 00 | [VISION](00-VISION.md) | Filosofía, principios, reglas |
| 01 | [ROADMAP](01-ROADMAP.md) | Olas, prioridades, dependencias |
| 02 | [ARCHITECTURE](02-ARCHITECTURE.md) | Cómo se conecta todo (+ diagramas) |
| 03 | [CLAUDE-CODE](03-CLAUDE-CODE.md) | El Ingeniero: rol, flujo, comandos |
| 04 | [GEMINI](04-GEMINI.md) | El Director Técnico: rol, límites |
| 05 | [SKILLS](05-SKILLS.md) | Inventario y reorganización |
| 06 | [MCP](06-MCP.md) | Servidores MCP actuales y futuros |
| 07 | [GRAPHITE](07-GRAPHITE.md) | Stacked PRs (diferido) |
| 08 | [GITHUB](08-GITHUB.md) | Ramas, PRs, CI, deploy |
| 09 | [AUTOMATIONS](09-AUTOMATIONS.md) | Automatizaciones |
| 10 | [FRONTEND](10-FRONTEND.md) | La landing (real) |
| 11 | [BACKEND](11-BACKEND.md) | Producto (futuro) |
| 12 | [TESTING](12-TESTING.md) | Estrategia de pruebas |
| 13 | [DESIGN-SYSTEM](13-DESIGN-SYSTEM.md) | Filosofía visual |
| 14 | [DOCUMENTATION](14-DOCUMENTATION.md) | Cómo documentar |
| 15 | [DECISIONS](15-DECISIONS.md) | ADRs |
| 16 | [FUTURE](16-FUTURE.md) | Radar de ideas |
| 17 | [BUSINESS](17-BUSINESS.md) | Todo el negocio All Import |
| 18 | [WORKFLOW](18-WORKFLOW.md) | De la idea a producción |
| 19 | [TOOLS](19-TOOLS.md) | Herramientas: rol y cuándo usar |
| 20 | [CONTEXT-RULES](20-CONTEXT-RULES.md) | Reglas para toda IA |
| 21 | [BACKLOG](21-BACKLOG.md) | Pendientes priorizados |
| 22 | [KNOWLEDGE-GAPS](22-KNOWLEDGE-GAPS.md) | Qué info falta (preguntas) |
| — | [decisions/](decisions/) | ADRs numeradas |

## Plan, contenido y análisis (foco: redes)
Además de los docs numerados, el conocimiento operativo vive en estas carpetas:

| Ruta | Qué es |
|---|---|
| [_research/PLAN-DEFINITIVO.md](../_research/PLAN-DEFINITIVO.md) | **Plan maestro:** 34 pasos + opcionales, priorizado por el foco en redes |
| [_research/videos-analisis.md](../_research/videos-analisis.md) | Análisis de los videos de estrategia (12 nuevos + previos) |
| [_research/fotos-analisis.md](../_research/fotos-analisis.md) | Análisis de fotos de producto |
| [_research/gem/](../_research/gem/) | Pack de instrucciones + conocimiento para el Gem de Gemini |
| [contenido/](../contenido/) | Motor de contenido: calendario, ganchos/guiones, branding (DESIGN) |
| [historias/](../historias/) | Editor de fotos → historias de Instagram |
| [video/](../video/) | Clips de producto animados (Remotion) |
| [proveedores/](../proveedores/) | Analizador de chats WhatsApp + base de clientes |
| [TERCEROS-PENDIENTES.md](TERCEROS-PENDIENTES.md) | Herramientas de terceros que quedaron sin instalar y por qué |
| [ESTADO-INICIAL.md](ESTADO-INICIAL.md) | Reporte de la pasada `init-todo` + hoja de ruta |
| [MAPA-CONOCIMIENTO.md](MAPA-CONOCIMIENTO.md) | 🧠 Hub del segundo cerebro: enlaza todo con `[[wikilinks]]` (Obsidian + Graphify) |
| [OBSIDIAN-GRAPHIFY.md](OBSIDIAN-GRAPHIFY.md) | Cómo unir Obsidian + Graphify sobre esta base |
| [FLUJOS-DE-TRABAJO.md](FLUJOS-DE-TRABAJO.md) | Cómo separar las sesiones de Claude en 3 módulos (contenido, visual, agente+CRM) |
| [REMOTE-CONTROL.md](REMOTE-CONTROL.md) | Claude Code corriendo en la compu real (Remote Control) |
| [DISEÑO.md](DISEÑO.md) | 🎨 Índice único de todo lo visual: sistema de marca, reglas validadas, skills y herramientas |
| [contenido/SISTEMA-VENTAS-MARCA-PERSONAL.md](../contenido/SISTEMA-VENTAS-MARCA-PERSONAL.md) | Sistema de ventas por marca personal (4 etapas: atracción → WhatsApp → difusión → posventa) |

## Cómo usar Obsidian con esto (#07)
Instalá Obsidian → "Abrir una carpeta como bóveda" → elegí **esta carpeta `allimport/docs/`**.
Obsidian y Claude leen los mismos archivos. Cero sync.

## Regla
Si un agente lo necesita para trabajar, va acá o en `CLAUDE.md`.
Lo estratégico/de negocio va en Gemini/Claude Projects.
