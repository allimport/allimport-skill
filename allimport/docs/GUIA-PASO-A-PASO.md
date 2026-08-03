---
tags: [guia, obsidian, graphify, principiante]
aliases: [Guía paso a paso, Setup Windows]
---

# GUÍA PASO A PASO — Obsidian + Graphify en Windows

Para hacer de cero, sin saber nada. Seguí en orden. Si algo falla, copiá el error y pasámelo.

> **Obsidian NO necesita cuenta.** Es un programa gratis que se instala y listo.

---

# PARTE 1 — Bajar el repo a la compu

1. Abrí el navegador y entrá a: `https://github.com/allimport/allimport-skill`
   (si te pide, iniciá sesión con tu cuenta de GitHub).
2. Arriba a la izquierda hay un botón que dice **`main`** (es el selector de rama).
   Hacé clic y elegí: **`claude/skills-workflow-audit-22vj5r`**
   ⚠️ Importante: si no cambiás la rama, te bajás una versión vieja sin nada de lo nuestro.
3. Botón verde **`Code`** (arriba a la derecha) → **`Download ZIP`**.
4. Se baja a la carpeta **Descargas**. Clic derecho al archivo → **Extraer todo** →
   elegí **Documentos** → Extraer.
5. Te queda una carpeta con nombre largo, algo como
   `allimport-skill-claude-skills-workflow-audit-22vj5r`.
   **Renombrala** (clic derecho → Cambiar nombre) a: **`allimport-skill`**
6. **Anotá la ruta.** Entrá a la carpeta, hacé clic en la barra de arriba del Explorador
   (donde dice la ruta) y copiala. Va a ser algo como:
   `C:\Users\TuNombre\Documents\allimport-skill`
   La vas a necesitar después.

---

# PARTE 2 — Obsidian (ver el grafo)

7. Entrá a `https://obsidian.md` → botón **Download** → se baja un instalador → doble clic → siguiente, siguiente, instalar.
8. Abrí Obsidian. En la primera pantalla elegí **"Open folder as vault"**
   (Abrir carpeta como bóveda).
9. Buscá y seleccioná la carpeta **`allimport-skill`** de la Parte 1. Aceptar.
10. Si aparece un cartel de confianza, elegí **"Trust author and enable plugins"**.
11. En la barra lateral izquierda vas a ver las carpetas. Entrá a **`docs`** y abrí
    **`MAPA-CONOCIMIENTO`**.
12. Para ver el grafo: en la barra lateral izquierda, el ícono de **círculos conectados**
    (Graph view). También con `Ctrl+G`.
13. Si se ve un despelote de puntos: arriba a la izquierda → Configuración (rueda dentada)
    → **Files & Links** → **Excluded files** → agregá `skills/` y `web/`.

✅ **Con esto ya tenés el segundo cerebro funcionando.** Lo de abajo es opcional (suma
memoria para Claude y ahorra tokens).

---

# PARTE 3 — Graphify (opcional, ahorra tokens)

## 3.1 Ver si tenés Python
14. Apretá la tecla **Windows** y escribí **PowerShell** → abrilo.
15. Escribí y dale Enter:
    ```
    python --version
    ```
    - Si dice `Python 3.x.x` → seguí al 17.
    - Si da error o abre la Microsoft Store → paso 16.

16. (Solo si no tenés Python) Entrá a `https://python.org/downloads` → Download →
    ejecutá el instalador → **⚠️ TILDÁ la casilla "Add Python to PATH"** (abajo de todo,
    es clave) → Install Now. Cerrá y reabrí PowerShell.

## 3.2 Instalar Graphify
17. En PowerShell:
    ```
    python -m pip install --user pipx
    python -m pipx ensurepath
    ```
18. **Cerrá PowerShell y abrilo de nuevo** (para que tome los cambios).
19. ```
    pipx install graphifyy
    ```
    (el paquete es `graphifyy` con doble y; el comando después se llama `graphify`)
20. ```
    graphify install
    ```

## 3.3 Indexar tu conocimiento
21. Ir a la carpeta del repo (usá TU ruta de la Parte 1):
    ```
    cd C:\Users\TuNombre\Documents\allimport-skill
    ```
22. ```
    graphify update _research
    graphify update docs
    graphify update contenido
    ```
    ⚠️ **NO uses `graphify update .`** (con el punto solo). Probado: indexa todo el repo,
    da 16.025 nodos de ruido de terceros. Por carpeta da ~197 nodos útiles.

23. Probalo:
    ```
    graphify god-nodes --top 10
    graphify query "cómo funciona el agente de WhatsApp"
    ```

## 3.4 Volcar el grafo dentro de Obsidian
24. ```
    graphify _research --obsidian --obsidian-dir "C:\Users\TuNombre\Documents\allimport-skill"
    ```
    (poné TU ruta entre comillas). No pisa tus notas ni la configuración de Obsidian.

---

# PARTE 4 — API key de Gemini (opcional, mejora el grafo)

Tu suscripción de Gemini **no es** una API key: son cosas distintas. La key es gratis.

25. Entrá a `https://aistudio.google.com/apikey` → iniciá sesión con tu Google.
26. **Create API key** → copiala.
27. En PowerShell, ANTES de indexar:
    ```
    $env:GEMINI_API_KEY = "pegá-tu-clave-acá"
    ```
28. Volvé a correr el paso 22. Ahora entiende el *contenido* de los docs, no solo los títulos.

🔒 **La clave es como una contraseña.** No la pegues en chats, no la subas al repo, no la
compartas.

---

# Actualizar más adelante
El ZIP es una foto fija. Cuando yo agregue cosas nuevas, repetí la Parte 1 (bajar ZIP de
nuevo). Cuando te sientas cómodo, se puede usar GitHub Desktop y actualizar con un botón.

# Si algo falla
Copiá el mensaje de error completo y pasámelo. Errores comunes:
- `graphify no se reconoce` → repetí el paso 17-18 y abrí PowerShell nuevo.
- `python no se reconoce` → falta tildar "Add Python to PATH" (paso 16).
