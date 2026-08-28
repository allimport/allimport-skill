# Prompt maestro — carruseles (para Claude Design)

Hermano de [`PROMPT-MAESTRO-STORIES.md`](PROMPT-MAESTRO-STORIES.md), mismo sistema visual de marca,
pero para posts de carrusel del feed (1080×1350, no 1080×1920). Se pega **como texto**,
tal cual, en un chat nuevo de Claude Design (con el sistema de diseño ya enganchado — no
en "None").

No editar el contenido de acá sin actualizar también `docs/DISEÑO.md` si cambia algo del
sistema de diseño (colores, reglas de estilo).

---

# 🎨 PROMPT DE DISEÑO — CARRUSELES ALL IMPORT (sistema visual reutilizable)

Vas a recibir más abajo un **guión de carrusel** (texto plano, una slide por bloque, con
una foto indicada entre corchetes para cada una). Tu trabajo: convertirlo en un único
archivo HTML llamado `Carrusel.html` que renderice las slides como **imágenes 1080×1350px
(relación 4:5)** siguiendo EXACTAMENTE el sistema visual de marca **ALL IMPORT** que
defino acá. No inventes texto: usá solo el del guión.

## 0. CONTEXTO DEL REPO (leer antes de generar)

Este prompt vive en el repo `allimport-skill`. Antes de generar el HTML:

- Sistema de diseño real (colores/tipografía exactos): `skills/allimport-web-design/references/DESIGN.md`
- Reglas de estilo validadas (máx. 2 estilos de texto, 1 solo acento, degradado no velo
  plano): `docs/DISEÑO.md`
- Las fotos van indicadas en el guión entre `[FOTO: descripción]` — si el dueño no las
  subió todavía en el chat, avisá antes de usar una foto genérica de internet.
- Marca: All Import · Carrusel para la cuenta personal, @_agus_moreno_ (por eso: sin
  logo, sin watermark de marca — top-left vacío, igual que en las stories).

Si el sistema de diseño de la sección 1 de `docs/DISEÑO.md` no está enganchado en este
chat, o si algún archivo de los de arriba no existe, avisá antes de inventar valores.

## 1. DIFERENCIAS CLAVE CON EL PROMPT DE STORIES

- **Tamaño:** 1080×1350px (4:5), NO 1080×1920. Todas las slides del mismo carrusel
  miden exactamente igual.
- **Sin progress bar ni counter "0X/0N":** Instagram ya muestra los puntitos de swipe
  abajo del carrusel — no lo dupliques en el diseño.
- **La Slide 1 es la portada:** además de ser la primera al deslizar, es la miniatura
  que se ve en el feed y en el perfil. Tiene que funcionar sola — hook grande, legible
  incluso en miniatura chica.
- **La última slide siempre lleva el CTA**, bien visible — es donde el usuario decide
  comentar o escribir.
- Todo lo demás (paleta, tipografía, sistema de highlights, reglas de fondo) es el mismo
  sistema que las stories, para que el contenido se sienta de la misma marca.

## 2. ESTRUCTURA DEL ARCHIVO

- HTML único, autocontenido, con `<style>` y `<script>` inline.
- En `<head>`: precarga de Google Fonts (Manrope, Inter pesos 400/500/700/900) + Fontshare
  Satoshi (400/500/700/900).
- Toolbar superior sticky: marca "All Import" + separador + meta
  `Carrusel · [tema] · N slides · 1080×1350` + botones **"Descargar una"** (ghost) +
  **"Descargar las N (PNG)"** (cyan sólido).
- Body fondo `#020408`, `.stage` flex horizontal con wrap, gap 28px, padding 40px 24px 80px.
- Cada slide dentro de un `.slide-shell` con label superior `Slide 0X · CARRUSEL`.
- Cada slide se renderiza a 1080×1350 dentro de un `.slide-scale` escalado (mismo patrón
  `transform: scale()` que el prompt de stories, `transform-origin: top left`).
- Script de descarga con `html-to-image@1.11.11`: mismo criterio que stories (quitar
  transform al capturar, esperar fuentes e imágenes, pixelRatio 2, fondo `#000`).

## 3. PALETA EXACTA (idéntica a stories)

```
--accent:   #00D4D4   /* ÚNICO color de acento */
--card-bg:  #131F38
fondo app:  #020408
texto:      #FFFFFF
gris meta:  #8a8a92
```

Regla de oro: el cyan `#00D4D4` es el ÚNICO acento. Cero rojos/verdes/morados/amarillos
decorativos.

## 4. TIPOGRAFÍA

Mismo stack: `'Satoshi', 'Manrope', 'Inter', system-ui, sans-serif`. Como hay menos alto
disponible que en una story (1350px vs 1920px), los tamaños de hook/punchline bajan un
escalón respecto al prompt de stories:

| Rol | Tamaño | Peso |
|---|---|---|
| Hook de portada (Slide 1) | 70–84px | 900 |
| Texto de desarrollo (slides intermedias) | 48–58px | 500–700 |
| CTA de cierre (última slide) | 52–64px | 900 |
| Kicker / footer label | 26–30px | 900 uppercase |

## 5. FONDO DE CADA SLIDE

Mismas 3 capas que stories: `.bg-photo` full-bleed (la foto indicada en `[FOTO: ...]`),
`.vignette` con degradado vertical asimétrico (más claro arriba, oscuro abajo para que
se lea el texto), `.noise` sutil. Si el guión indica "repetir esta misma foto" en varias
slides consecutivas, usá el mismo archivo en todas esas — es intencional (ver §1 del
guión de carrusel, refuerza la sensación de repetición/rutina).

## 6. SISTEMA DE HIGHLIGHTS

Igual que stories (`hl-solid`, `hl-dashed`, `hl-underline`, todos en `--accent`) — ver
`PROMPT-MAESTRO-STORIES.md` §6 si necesitás el detalle CSS exacto.

## 7. INPUT QUE RECIBIRÁS

```
SLIDE N
[FOTO: descripción o "misma que slide X"]
[texto de la slide]

SLIDE N+1
…
```

Tu trabajo: asignar cada `[FOTO: ...]` a la imagen correspondiente (subida en el chat o
ya existente en `historias/stock-fotos/`), aplicar el layout que corresponda según la
posición (portada / desarrollo / cierre), y no inventar texto que no esté en el guión.

## 8. ENTREGABLE

Un archivo HTML único `Carrusel.html`, con preview escalado de las N slides en horizontal
y descarga PNG individual + bulk de las N a 1080×1350.

---

Confirmá con "OK, mándame el guión" y esperá. Cuando lleguen el guión y las fotos,
devolvé directamente el HTML completo.
