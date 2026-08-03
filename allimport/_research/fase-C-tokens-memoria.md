# FASE C — Memoria / tokens (ejecución)
### Ítems #06, #08, #07, #15. Info de los videos + decisiones.

---

## #06 — Ahorro de tokens (info sin releer)

**Qué mostró el video:** un paquete "Claude Code Execution Runtime" (de un "skills marketplace") que promete "99% de ahorro" ejecutando en local y devolviendo solo el resultado.

**Veredicto (honesto):** el CONCEPTO es real y correcto, pero el "99%" es marketing y **Claude Code ya lo hace nativo** (corre comandos con Bash y devuelve solo el resultado, no vuelca los archivos). Instalar un paquete de terceros que **ejecuta código en tu PC** es un riesgo de seguridad sin beneficio claro. **Decisión: NO instalarlo por ahora.** Lo replicamos gratis con hábitos + lo que ya tenés.

**Manual de ahorro de tokens para All Import (esto SÍ hacé):**
1. **CLAUDE.md** (✅ ya hecho) → Claude no re-aprende el proyecto cada vez.
2. **`allimport/docs/`** (✅ ya hecho) → el conocimiento durable está escrito, no se re-explica.
3. **Hábitos con comandos (del #19):**
   - `/clear` entre tareas distintas (lo que más ahorra).
   - `/context` para ver cuánta ventana llevás.
   - `/compact` si una tarea larga se llena.
   - **Una tarea = una sesión.**
4. **Skills de foco** (ya instaladas): `smart-file-selector` (carga solo los archivos que importan) y `repo-indexer` (índice del repo). Se usan pidiéndole a Claude "usá smart-file-selector para tocar solo lo necesario".

**Estado #06: ✅ resuelto** (nativo + hábitos). Paquete de terceros descartado.

---

## #08 — Graphify (grafo)

**Qué mostró el video:** escanear el código una vez → grafo de conocimiento → Claude navega el grafo en vez de releer.

**Hallazgo:** tu repo **ya tiene `graphify-out/` en el `.gitignore`** (se corrió alguna vez), pero **no dejó nada en este checkout** (es output local, no versionado). La URL que dio Gemini estaba contaminada (repitió la del #03).

**Veredicto:** mismo objetivo que el #06. Para un repo de tu tamaño (una landing + skills), un grafo completo es **sobreingeniería** — `repo-indexer` + `smart-file-selector` + CLAUDE.md ya cubren "que Claude no relea todo". **Decisión: no montar graphify ahora.** Si algún día el producto crece mucho, se reevalúa.

**Estado #08: ✅ evaluado y descartado por ahora** (cubierto por lo nativo).

---

## #07 — Obsidian segundo cerebro

**Del lado del repo: ✅ LISTO.** Ya existe `allimport/docs/` con `README`, `architecture.md` y decisiones. Obsidian se conecta apuntando la bóveda ahí.

**Tu parte (10 min, en tu PC):**
1. Descargar Obsidian (obsidian.md).
2. "Abrir una carpeta como bóveda" → elegir la carpeta `allimport/docs/` del repo clonado.
3. Listo: Obsidian y Claude leen los mismos archivos, sin sync.

**Estado #07: ✅ repo listo · 🔑 falta que lo instales vos.**

---

## #15 — 15 conectores

De los 15 del video, para All Import sirven **6**. El resto (AWS, Docker, Jupyter, Postgres directo, Slack, Notion, Excel) no aplica hoy.

| Conector | Para qué | Necesita |
|---|---|---|
| GitHub | tu código + revisiones | ya conectado |
| Playwright | probar/QA la web | ya en `.mcp.json.example` |
| Supabase | DB del futuro producto | tu token (cuando haya producto) |
| Figma | diseño→código | tu token |
| Obsidian | segundo cerebro | #07 |
| Vercel | deploy con preview | cuando muevas la web ahí |

**Estado #15: ✅ definidos los 6 · 🔑 faltan tus tokens (los activo cuando me los pases).**
