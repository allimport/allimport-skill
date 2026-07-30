---
tags: [infra, diseno, marca]
aliases: [Diseño, Sistema de diseño]
---

# 🎨 Diseño — índice único (no duplica nada, solo enlaza)

Todo lo relacionado con el look de la marca en un solo lugar. Si buscás algo de diseño,
empezá acá antes de bucear entre las 108 carpetas de `skills/`.

## 1. Tu sistema de diseño real (la marca)
- [`web/src`](../web/src) — el código real (fuente de verdad de colores/tipografía, Next.js + Tailwind).
- [`skills/allimport-web-design/references/DESIGN.md`](../skills/allimport-web-design/references/DESIGN.md)
  — resumen extraído del código con `skillui`: fondo oscuro `#020408`, surface `#131f38`,
  acento cyan `#00d4d4`, tipografía **Montserrat Alternates**, grid de 4px, 15 patrones
  de componente.
- [`contenido/DESIGN.md`](../contenido/DESIGN.md) — el branding original (tono de voz,
  frases sí/no, tono argentino).
- [`historias/fonts/`](../historias/fonts) — las fuentes Montserrat Alternates
  vendorizadas (Bold/SemiBold/Medium/Regular), para usarlas fuera de la web.

## 2. Reglas de estilo ya validadas
*(aprendidas a los golpes en las historias de restock — 7 iteraciones — para no repetir
los mismos errores)*
- Máximo **2 estilos de texto** por pieza: "Strong" (pill claro + texto oscuro) para el
  título, "Classic" (texto plano) para el resto.
- **Un solo color de acento** por pieza — el cyan de marca `#00d4d4` — nunca todo
  coloreado. Si el fondo del elemento es sólido en el acento (pill, botón CTA), el texto
  va oscuro encima, no blanco — el cyan es demasiado claro para contraste con blanco.
- Fondo con **degradado**, nunca un velo plano parejo. Dos variantes válidas según el
  layout:
  - Piezas Pillow (título arriba + CTA abajo, como `historias/`): oscuro arriba/abajo
    donde va el texto, más suave al medio para que se insinúe el producto.
  - Piezas del sistema de stories HTML (Claude Design, punchline arriba + CTA abajo):
    degradado vertical asimétrico — **más claro arriba** (se ve el producto), **bien
    oscuro abajo** (donde va el texto, para que se lea siempre). Ver
    `PROMPT-MAESTRO-STORIES.md` §5.
- Texto **alineado a la izquierda**, no centrado, para contenido de cuenta personal (se
  ve como hecho a mano, no como placa de marca).
- **Sin logo ni marco** en contenido de la cuenta personal `@_agus_moreno_` — sí se puede
  usar logo en contenido de `@allimport.cba` (cuenta de negocio).

## 3. Skills de diseño disponibles (conocimiento general, se activan solas)
No hace falta "apuntarlas" a nada — Claude Code las usa automático cuando la tarea las
necesita:
- `ui-ux-pro-max` — sistema de diseño por tipo de producto (paletas, tipografía, layout).
- `taste-skill` — colección de skills de gusto/estética (minimalista, brutalista, etc).
- `frontend-design` / `frontend-design-direction` — dirección estética para UI nueva.
- `web-design-guidelines` — buenas prácticas generales de diseño web.
- `canvas-design` — arte visual estático (.png/.pdf) con criterio de diseño.
- `impeccable` — vocabulario de diseño con comandos (`polish`, `audit`, `critique`).
  Solo funciona en sesiones de Claude Code en la compu real (bloqueado por red en la
  nube) — ver `TERCEROS-PENDIENTES.md` §4.

## 4. Herramientas externas y su estado
- **Canva** (conector MCP) — diseño `DAHQzI7tICs` armado (fondo + texto), pendiente que
  el dueño suba su foto real ahí (por privacidad, eso lo hace él, no Claude).
- **Claude Design** (`claude.ai/design`) — sistema de diseño en curso, generado a partir
  de `web/src` + blurb de marca. Ver bitácora de la conversación para el paso a paso.
- **skillui** (`npx skillui`) — la herramienta que generó el `DESIGN.md` de la sección 1.
  Se re-corre solo si la web cambia de look; no es algo para usar todo el tiempo.
- **Prompt maestro de stories** — [`contenido/PROMPT-MAESTRO-STORIES.md`](../contenido/PROMPT-MAESTRO-STORIES.md)
  (adaptado del sistema de Nico Azero) — genera un HTML con secuencias de stories
  (hook/prueba/cierre) usando el sistema de diseño de arriba. Se pega como texto en un
  chat nuevo de Claude Design (con el design system enganchado). Fotos reales en
  [`historias/stock-fotos/`](../historias/stock-fotos). Guiones ya escritos en
  [`contenido/GUIONES-STORIES.md`](../contenido/GUIONES-STORIES.md).

## 5. Dónde están las piezas ya hechas
- [`historias/generadas/`](../historias/generadas) — las historias de restock ya editadas,
  documentadas una por una en su README.
- [`historias/editar_historia_pro.py`](../historias/editar_historia_pro.py) — script
  reutilizable (Pillow + Montserrat + degradado + acento único) para editar una foto de
  producto al estilo validado.

## 6. Cuándo actualizar este archivo
- Si cambia la paleta o tipografía de la web → correr `skillui` de nuevo, actualizar la
  sección 1, y avisar para actualizar también el blurb cargado en Claude Design.
- Si se valida una regla de estilo nueva (o se descarta una de la sección 2) → agregarla
  acá antes que en ningún otro lado, es la fuente única.
