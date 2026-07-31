# whatsapp-obsidian — carpeta central de integración

Une tres piezas del repo en un solo pipeline:

```
whatsapp-agentkit  →  graphify              →  vault/ (Obsidian)
(skills/whatsapp-agentkit)  (skills/graphify)     (esta carpeta)
```

1. **`skills/whatsapp-agentkit/`** — genera y corre el agente de WhatsApp. Produce dos fuentes de
   datos: `agent/memory.db` (historial de conversaciones por contacto) y `knowledge/` (archivos
   del negocio: menú, precios, FAQ).
2. **`skills/graphify/`** — toma esas dos fuentes y las convierte en notas Markdown enlazadas
   (`[[wikilinks]]`), una por contacto y una por archivo de knowledge, más un `index.md`.
3. **`vault/`** (esta carpeta) — el vault de Obsidian resultante. Se abre directo en Obsidian con
   *"Open folder as vault"*; el grafo nativo de la app muestra contactos y temas conectados.

## Cómo correr el pipeline

Desde la raíz de un proyecto generado por `whatsapp-agentkit`:

```bash
python /ruta/a/allimport-skill/skills/graphify/scripts/graphify.py \
  --source agent/memory.db --source-type sqlite \
  --knowledge knowledge/ \
  --out /ruta/a/allimport-skill/integrations/whatsapp-obsidian/vault
```

Después abrí `integrations/whatsapp-obsidian/vault/` como vault en Obsidian.

## Por qué está separado de las skills

`skills/whatsapp-agentkit` y `skills/graphify` son reusables por separado (podés graphificar
cualquier otra fuente de datos, o correr el agente sin tocar Obsidian). Esta carpeta es sólo el
punto central donde se cablean una con otra y vive el vault de salida — no tiene lógica propia
más que el README y el vault generado.
