---
tags: [infra, obsidian, graphify, segundo-cerebro]
aliases: [Obsidian + Graphify, Segundo cerebro setup]
---

# Unir Obsidian + Graphify (segundo cerebro)

Los dos leen los MISMOS archivos del repo. Nada de sync. Obsidian = grafo visual +
edición; Graphify = grafo consultable para que Claude gaste menos tokens. Centro de todo:
[[MAPA-CONOCIMIENTO]].

Qué ya dejé listo (🤖): el mapa hub con `[[wikilinks]]`, frontmatter con tags, y todo el
conocimiento en `.md` (docs/ · _research/ · contenido/). El grafo ya tiene forma.

Lo que hacés vos, una vez (💻, ~10 min):

## 1. Obsidian (grafo visual)
1. Descargá Obsidian: https://obsidian.md
2. "Abrir carpeta como bóveda" → elegí **la raíz del repo** (`allimport-skill/`).
   (Así entran docs/, _research/ y contenido/ en el grafo.)
3. Abrí [[MAPA-CONOCIMIENTO]] y tocá el ícono de **grafo** (Graph view). Vas a ver todo
   conectado desde el hub.
4. Opcional: Settings → Files & Links → activar "Automatically update internal links".

> Nota: `skills/` tiene muchísimos `.md` de terceros. Si el grafo se ve ruidoso, en
> Settings → Files & Links → "Excluded files" agregá `skills/` y `web/`.

## 2. Graphify (grafo consultable, ahorra tokens)
1. Instalá el motor (sin cuenta): `pip install graphifyy`
2. En la raíz del repo, corré la skill: `/graphify` (o `graphify .`).
3. Genera `graphify-out/` (ya está en `.gitignore`, queda local).
4. Después, cuando Claude necesita entender el repo, consulta el grafo en vez de releer
   todo → menos tokens. Ver `skills/graphify/ENGINE.md`.

## 3. Cómo se "unen"
- Mismo repo, mismos `.md`. Editás en Obsidian → Claude y Graphify lo ven al instante.
- El hub [[MAPA-CONOCIMIENTO]] es el centro de los dos grafos.
- Regla: cada doc nuevo se enlaza desde el mapa → nada queda huérfano.

## Mantenimiento
- Después de agregar/mover docs importantes: volver a correr `/graphify` para refrescar el grafo.
- Obsidian se actualiza solo al guardar.
