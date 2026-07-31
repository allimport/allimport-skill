---
name: whatsapp-agentkit
description: Construye un agente de WhatsApp con IA (FastAPI + Claude API + Meta/Twilio) siguiendo el flujo entrevista-generación-test-deploy de AgentKit (github.com/Hainrixz/whatsapp-agentkit). Úsala cuando el usuario pida crear, generar o personalizar un bot/agente de WhatsApp para su negocio.
---

# whatsapp-agentkit

Skill "instalada" desde [Hainrixz/whatsapp-agentkit](https://github.com/Hainrixz/whatsapp-agentkit) (MIT).
Vendorizada acá como carpeta central de la integración WhatsApp → grafo de conocimiento → Obsidian
(ver `integrations/whatsapp-obsidian/` y la skill `graphify`).

## Qué hace

Guía al usuario, en español y paso a paso, para construir un agente de WhatsApp con IA sin que
necesite programar:

1. **Bienvenida y entorno** — verifica Python 3.11+, crea `agent/`, `config/`, `knowledge/`, `tests/`.
2. **Entrevista del negocio** — 10 preguntas (nombre, rubro, objetivo, nombre del agente, tono,
   horario, archivos de conocimiento, API key de Anthropic, proveedor WhatsApp, credenciales).
3. **Generación** — arma `agent/main.py` (FastAPI + webhook), `agent/brain.py` (Claude API),
   `agent/memory.py` (SQLite, historial por número de teléfono), `agent/tools.py`,
   `agent/providers/{twilio,meta}.py`, `config/business.yaml`, `config/prompts.yaml`.
4. **Testing local** — corre `tests/test_local.py`, un simulador de chat en terminal.
5. **Deploy opcional** — Docker + Railway + configuración del webhook.

Instrucciones completas y el flujo de 5 fases: ver `reference/CLAUDE.md` y `reference/build-agent.md`
(contenido original del repo, sin modificar).

## Cómo usarla

En un proyecto nuevo:

```bash
git clone https://github.com/Hainrixz/whatsapp-agentkit.git
cd whatsapp-agentkit
bash start.sh   # valida Python 3.11+ y Claude Code
claude
# dentro de Claude Code:
/build-agent
```

Si ya estás dentro de una sesión de Claude Code con esta skill instalada, decile al agente que
lea `skills/whatsapp-agentkit/reference/CLAUDE.md` y siga las 5 fases ahí descriptas.

## Conexión con graphify + Obsidian

`agent/memory.py` guarda el historial de cada cliente y `knowledge/` guarda los archivos del
negocio (menú, precios, FAQ). Esos dos datasets son el input de la skill **graphify**
(`skills/graphify/`), que los convierte en notas Markdown con `[[wikilinks]]` para un vault de
Obsidian. El pipeline completo vive en `integrations/whatsapp-obsidian/` — esa es la carpeta
central que une las tres piezas (agentkit → graphify → vault de Obsidian).
