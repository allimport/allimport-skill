---
tags: [infra, obsidian, graphify, segundo-cerebro]
aliases: [Obsidian + Graphify, Segundo cerebro setup]
---

# Unir Obsidian + Graphify (segundo cerebro)

Los dos leen los MISMOS archivos del repo. Nada de sync. Obsidian = grafo visual +
edición; Graphify = grafo consultable para que Claude gaste menos tokens (y no alucine).
Centro de todo: [[MAPA-CONOCIMIENTO]].

Ya listo (🤖): el hub con `[[wikilinks]]`, frontmatter con tags, y todo el conocimiento en
`.md` (docs/ · _research/ · contenido/). Comandos verificados contra el README oficial.

Lo que hacés vos, una vez (💻 Windows):

## 1. Bajar el repo
GitHub Desktop → Clone `allimport/allimport-skill` → rama **`claude/skills-workflow-audit-22vj5r`**.
(O ZIP desde GitHub con esa rama seleccionada.)

## 2. Obsidian (grafo visual)
1. Instalá Obsidian: https://obsidian.md
2. "Abrir carpeta como bóveda" → elegí **la raíz del repo** (`allimport-skill/`).
3. Abrí [[MAPA-CONOCIMIENTO]] → ícono de **grafo** (Graph view).
4. Si se ve ruidoso: Settings → Files & Links → Excluded files → `skills/` y `web/`.

## 3. Graphify (grafo consultable)
**No se clona el repo** — se instala el paquete `graphifyy` (el comando es `graphify`):

```powershell
uv tool install graphifyy      # recomendado (o: pipx install graphifyy)
graphify install               # registra el skill (Windows se autodetecta)
```

⚠️ **Evitá `pip install` en Windows** — el README lo desaconseja (rompe con
`ModuleNotFoundError`). Si el comando no aparece: `uv tool update-shell` y terminal nueva.

Indexar (parado en la carpeta del repo):
```powershell
graphify update _research      # local, SIN LLM ni API key
graphify update docs
graphify update contenido
```

⚠️ **No corras `graphify update .` sobre todo el repo.** Probado: da **16.025 nodos** y los
hubs quedan dominados por `skills/` y `web/` (código de terceros) — ruido puro. Sobre
`_research/` da **197 nodos** y los hubs son tu negocio real (plan, agente, videos,
próximos pasos). **Indexá solo las carpetas de conocimiento.**

> En PowerShell es `graphify .` — **no** `/graphify .` (la barra es separador de rutas).
> `graphify update` es el modo local sin LLM. Para extracción semántica de docs/PDFs/imágenes
> se usa `/graphify` desde el asistente, o seteás `GEMINI_API_KEY` (tenés Gemini).

Genera `graphify-out/` (local, ya en `.gitignore` a cualquier nivel — no ensucia el repo).

## 4. La unión real: volcar el grafo DENTRO de tu bóveda
Graphify puede escribir el grafo como notas de Obsidian, en tu bóveda existente
(no pisa tus notas ni tu config `.obsidian`). Usá las carpetas de conocimiento, no todo:

```powershell
graphify _research --obsidian --obsidian-dir "C:\ruta\a\allimport-skill"
```

Resultado: las conexiones que detecta Graphify aparecen como notas enlazadas en el mismo
grafo de Obsidian, al lado de [[MAPA-CONOCIMIENTO]].

Otras salidas útiles: `--svg` (imagen del grafo) · `--wiki` (wiki markdown) ·
`--watch` (auto-sync al guardar).

## Mantenimiento
- Después de agregar/mover docs: `graphify . --update` y volver a correr `--obsidian`.
- Obsidian se actualiza solo al guardar.
- Si actualizás graphify y usás hooks de git: re-correr `graphify hook install`.

## Nota
La indexación completa (docs, PDFs, imágenes) usa subagentes del asistente; `--code-only`
es 100% local sin API. Fuente: https://github.com/safishamsi/graphify
