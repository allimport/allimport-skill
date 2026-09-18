# Prompt maestro — carrusel "edades" (para Claude Design)

Formato minimalista, sin marca, sin acento de color — pensado para el carrusel de
"Cuando..." (postergar el momento de emprender por edad), guardado en
`GUIONES-CARRUSEL.md`. Versión completa, lista para copiar y pegar de una sola vez en
un chat nuevo de Claude Design (con el sistema de diseño ya enganchado — no en "None").

---

# 🎨 PROMPT DE DISEÑO — CARRUSEL "EDADES" (minimalista, blanco y negro)

Vas a recibir más abajo un guión de carrusel (texto plano, una slide por bloque). Tu
trabajo: convertirlo en un único archivo HTML llamado `Carrusel.html` que renderice las
slides como imágenes **1080×1080px (1:1)**. Es un formato DISTINTO al sistema oscuro de
marca (nada de cyan, nada de fondo `#020408`, nada de logo) — acá todo es blanco y
negro, sobrio, con la foto como protagonista.

## 0. CONTEXTO

Cuenta destino: personal, @_agus_moreno_. Sin logo, sin marca, sin watermark — esta
pieza en particular ni siquiera necesita el sistema de diseño de marca enganchado,
porque es deliberadamente distinta (blanco y negro, tipografía neutra).

**Notación de fotos:** `[FOTO: descripción]` entre corchetes = foto real que el dueño
sube en el chat, esperala antes de generar. `(sugerencia: descripción)` entre
paréntesis = elegís vos de `historias/stock-fotos/` o pedís que suban una.

## 1. ESTRUCTURA DEL ARCHIVO

- HTML único, autocontenido, con `<style>` y `<script>` inline.
- Toolbar superior sticky simple: meta `Carrusel · Edades · N slides · 1080×1080` +
  botones "Descargar una" / "Descargar las N (PNG)".
- `.stage` flex horizontal wrap, fondo neutro claro (`#f2f2f0` o similar, NO el
  `#020408` de marca — esta pieza es blanca, no oscura).
- Cada slide en `.slide-shell` con label de referencia `Slide 0X` (solo en el editor,
  no en la imagen final).
- Cada slide se renderiza a 1080×1080px, escalado en el preview igual que los otros
  prompts (`transform: scale()`, `transform-origin: top left`).
- Descarga con `html-to-image@1.11.11`, mismo criterio que los otros prompts (esperar
  fuentes e imágenes, pixelRatio 2).

## 2. LAYOUT DE CADA SLIDE (fijo, igual en las 8)

- **Banner superior blanco**, ~28% de la altura de la slide (≈300px de 1080px).
  - Fondo `#FFFFFF` sólido.
  - Número de la edad (si la slide lo tiene): negro `#111111`, bold (800-900),
    tamaño grande (~90-110px), centrado horizontalmente, arriba del banner.
  - Frase entre comillas debajo del número: negro `#111111`, bold (700-800), tamaño
    medio (~34-42px), centrada, con salto de línea si no entra en una sola.
  - Las slides sin número (como "Pero después...") solo llevan la frase, centrada
    verticalmente en el banner, tamaño un poco más grande (~44-52px) ya que está sola.
- **Foto abajo**, el 72% restante de la slide: `object-fit: cover`, a página completa,
  **sin degradado, sin overlay oscuro, sin filtro** — la foto tal cual es, natural.
- Tipografía: una sans-serif neutra y bien legible (`Inter` o `Manrope`, peso 700-900
  para todo el texto de esta pieza) — nada de la Satoshi/Manrope combinada de las otras
  piezas de marca, esta es más simple, un solo peso pesado.
- Sin logo, sin acento de color, sin iconos, sin emojis.

## 3. INPUT QUE RECIBIRÁS

```
SLIDE N — [edad] — "frase"
```
o, para las slides sin edad:
```
SLIDE N — "frase"
```

Cada SLIDE trae además, en el guión completo, indicada la foto correspondiente (ver
notación del §0). Generá las slides en el mismo orden exacto en que vienen — no
reordenes ninguna.

## 4. ENTREGABLE

Un archivo HTML único `Carrusel.html`, con preview escalado de las N slides en
horizontal y descarga PNG individual + bulk de las N a 1080×1080.

---

Confirmá con "OK, mándame el guión y las fotos" y esperá. Cuando lleguen, devolvé
directamente el HTML completo.
