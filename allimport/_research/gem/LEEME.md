# Gem de Gemini — paquete completo v4 (+ catálogo de skills, PDFs)

Todo lo que necesita el Gem está en esta carpeta. Nada más. También hay versión en PDF de
cada archivo (misma carpeta, `.pdf`) por si tu Gem solo acepta PDFs para conocimiento.

| Archivo | Dónde va en el Gem |
|---|---|
| `INSTRUCCIONES-GEM.md` | Campo **Instrucciones** (copiá y pegá TODO el contenido) |
| `01-PLAN.md` | **Conocimiento** (subir el archivo o su PDF) |
| `02-NEGOCIO.md` | **Conocimiento** (subir el archivo o su PDF) |
| `03-HERRAMIENTAS-Y-MODELOS.md` | **Conocimiento** (subir el archivo o su PDF) |
| `04-CATALOGO-SKILLS.md` | **Conocimiento** (subir el archivo o su PDF) — NUEVO, 106 skills + 57 agentes |

## Pasos
1. Abrí tu Gem → **Editar**.
2. Borrá TODOS los archivos de conocimiento viejos (incluida cualquier versión anterior de estos mismos).
3. Subí `01-PLAN`, `02-NEGOCIO`, `03-HERRAMIENTAS-Y-MODELOS` y `04-CATALOGO-SKILLS` (.md o .pdf, lo que acepte tu Gem).
4. Vaciá el campo Instrucciones y pegá el contenido completo de `INSTRUCCIONES-GEM.md`.
5. Guardá. Prueba: escribile *"Quiero hacer el paso A1 (investigar viralidad)"* — tiene
   que responder con bloque MODELO + skills correctas (`allimport-viral-research`) + prompt,
   citando el catálogo si corresponde.

## Qué es nuevo en esta versión (v4)
- **`04-CATALOGO-SKILLS.md` (nuevo):** las 106 skills instaladas + 57 subagentes, cada una
  con qué hace, organizadas por categoría. Antes Gemini solo conocía una selección; ahora
  tiene el universo completo — nunca más inventa una skill que no existe.
- **INSTRUCCIONES-GEM.md ampliado:** ejemplo completo de un prompt bien armado de punta a
  punta, y separación clara de **Graphify (lo corre Claude solo, automático)** vs
  **Obsidian (lo corre el dueño en su Windows, manual, solo cuando quiere ver el grafo)**.
- **Plan reescrito completo (v3):** 38 pasos por FASE (A-G) + opcionales + sueltos, estado
  real (contenido, agente WhatsApp, repos instalados, Obsidian+Graphify funcionando).
- **Modelo de negocio actualizado (v3):** mayorista/reventa + mentoría a emprendedores
  18-28, reglas exactas del agente de WhatsApp.

## Si Gemini vuelve a divagar
Decile literal: **"Protocolo. Respondé solo esto."**

## Mantenimiento
Cuando un paso se complete de verdad, actualizá su estado en `01-PLAN.md` (⬜ → ✅ o 🔶),
volvé a subir el archivo al Gem y borrá la versión vieja. El estado lo confirma Claude,
no Gemini.
