---
name: graphify
description: Convierte datos conversacionales o de negocio (historial de chats, archivos de knowledge base, notas) en un grafo de entidades/relaciones y lo exporta como notas Markdown con [[wikilinks]] compatibles con un vault de Obsidian. Úsala cuando el usuario pida "graphify", "armar un grafo de conocimiento", o conectar datos de un agente (ej. whatsapp-agentkit) con Obsidian.
---

# graphify

Toma datos estructurados o semi-estructurados (SQLite, JSON, .txt/.md) y los convierte en un
grafo: cada entidad (contacto, tema, producto, negocio) se vuelve una nota `.md`, y cada relación
se vuelve un enlace `[[wikilink]]` entre notas. El resultado es un vault de Obsidian navegable por
el grafo nativo de la app.

## Cuándo usarla

- El usuario dice "graphify esto", "conectalo con Obsidian", "armá un grafo de conocimiento".
- Hay que convertir el historial de conversaciones de un agente (ej. `whatsapp-agentkit`) en notas
  vinculadas por contacto/tema en vez de una tabla plana.
- Se necesita un mapa navegable de entidades y relaciones a partir de datos de negocio.

## Cómo funciona

1. **Extracción** — lee la fuente de datos:
   - SQLite (`agent/memory.py` de whatsapp-agentkit): tabla de mensajes por `phone_number`.
   - JSON: lista de objetos con campos libres.
   - Carpeta de texto/markdown (`knowledge/`): un archivo = una entidad.
2. **Entidades** — cada contacto/negocio/tema/producto se vuelve una nota (`vault/<entidad>.md`)
   con frontmatter YAML (`tags`, `type`, metadata) y contenido.
3. **Relaciones** — se detectan por:
   - Co-ocurrencia (un contacto menciona un producto → link contacto↔producto).
   - Campos explícitos (`related_to`, `provider`, `topic` en el dato fuente).
   - Se insertan como `[[Nombre de la otra nota]]` en el cuerpo de cada nota.
4. **Índice** — genera `vault/index.md` con un listado de todas las entidades agrupadas por tipo,
   como punto de entrada al grafo.

## Uso

```bash
python skills/graphify/scripts/graphify.py \
  --source agent/memory.db --source-type sqlite \
  --knowledge knowledge/ \
  --out integrations/whatsapp-obsidian/vault
```

Flags:
- `--source` ruta al dato conversacional (sqlite o json). Opcional si sólo hay `--knowledge`.
- `--source-type` `sqlite` o `json`.
- `--knowledge` carpeta con archivos de texto/markdown a graphificar como entidades propias.
- `--out` carpeta de salida (un vault de Obsidian; se puede abrir directo con "Open folder as vault").

## Integración con whatsapp-agentkit y Obsidian

Ver `integrations/whatsapp-obsidian/README.md` para el pipeline end-to-end: agente de WhatsApp
(`whatsapp-agentkit`) → `graphify` → vault de Obsidian.
