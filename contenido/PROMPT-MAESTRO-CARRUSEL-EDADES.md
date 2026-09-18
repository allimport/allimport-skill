# Prompt maestro — carrusel "edades" (para Claude Design)

Formato para el carrusel de "Cuando..." (postergar el momento de emprender por edad),
guardado en `GUIONES-CARRUSEL.md`. Versión completa, lista para copiar y pegar de una
sola vez en un chat nuevo de Claude Design (con el sistema de diseño ya enganchado — no
en "None").

---

# 🎨 PROMPT DE DISEÑO — CARRUSEL "EDADES" (vertical de feed, con acento de marca)

Vas a recibir más abajo un guión de carrusel (texto plano, una slide por bloque). Tu
trabajo: convertirlo en un único archivo HTML llamado `Carrusel.html` que renderice las
slides como imágenes **1080×1350px (4:5, vertical de feed)** — mismo formato que
`PROMPT-MAESTRO-CARRUSEL.md`, para que se vea consistente con el resto del feed. A
diferencia de ese otro prompt, acá el banner de texto es sobrio (sin degradado sobre la
foto), pero SÍ lleva el acento cyan de marca — nada de banner blanco plano.

## 0. CONTEXTO

- Sistema de diseño real (colores/tipografía exactos): `skills/allimport-web-design/references/DESIGN.md`
- Reglas de estilo validadas: `docs/DISEÑO.md`
- Cuenta destino: personal, @_agus_moreno_ — por eso: **sin logo, sin watermark de
  marca** (eso solo va en contenido de @allimport.cba), pero sí el acento cyan de marca.

**Notación de fotos:** `[FOTO: descripción]` entre corchetes = foto real que el dueño
sube en el chat, esperala antes de generar. `(sugerencia: descripción)` entre
paréntesis = elegís vos de `historias/stock-fotos/` o pedís que suban una.

## 1. ESTRUCTURA DEL ARCHIVO

- HTML único, autocontenido, con `<style>` y `<script>` inline.
- En `<head>`: precarga de Google Fonts (Manrope, Inter pesos 400/500/700/900) +
  Fontshare Satoshi (400/500/700/900) — mismo stack que el resto de las piezas de marca.
- Toolbar superior sticky: meta `Carrusel · Edades · N slides · 1080×1350` + botones
  "Descargar una" (ghost) / "Descargar las N (PNG)" (cyan sólido).
- Body fondo `#020408`, `.stage` flex horizontal, wrap, gap 28px, padding 40px 24px 80px.
- Cada slide en `.slide-shell` con label de referencia `Slide 0X · EDADES` (cyan el
  número) — solo en el editor, no en la imagen final.
- Cada slide se renderiza a **1080×1350px** dentro de un `.slide-scale` 324×405
  (mantiene la relación 4:5) con `transform: scale(0.3)`, `transform-origin: top left`.
- Descarga con `html-to-image@1.11.11`, mismo criterio que los otros prompts (quitar el
  transform al capturar, esperar `document.fonts.ready` + carga de imágenes, pixelRatio
  2, fondo `#000`).

## 2. PALETA (igual al resto del sistema de marca)

```
--accent:   #00D4D4   /* único color de acento — cyan de marca All Import */
--dark-bg:  #020408   /* fondo del banner de texto */
texto banner: #FFFFFF (frase) / #00D4D4 (número)
foto: sin filtro, sin degradado, tal cual es
```

**Regla de oro:** el cyan es el ÚNICO acento. Nada de otros colores decorativos. El
banner es oscuro (`#020408`), no blanco — es lo que le da identidad de marca a la pieza
sin perder la sobriedad del formato original.

## 3. LAYOUT DE CADA SLIDE (fijo, igual en las 8)

- **Banner superior oscuro**, ~26% de la altura de la slide (≈350px de 1350px).
  - Fondo `#020408` sólido (el mismo oscuro de marca, no negro puro ni blanco).
  - Número de la edad (si la slide lo tiene): **cyan `#00D4D4`**, bold (900), tamaño
    grande (~100-120px), centrado horizontalmente.
  - Frase entre comillas debajo del número: **blanco `#FFFFFF`**, bold (700-800),
    tamaño medio (~36-44px), centrada, con salto de línea si no entra en una sola.
  - Las slides sin número (como "Pero después...") solo llevan la frase en blanco,
    centrada verticalmente en el banner, tamaño un poco más grande (~46-54px) ya que
    está sola.
- **Foto abajo**, el 74% restante de la slide: `background-size: cover`, a página
  completa, **sin degradado, sin overlay, sin filtro** — la foto tal cual es, natural.
  Esto no cambia respecto a la versión anterior: la foto sigue siendo protagonista, sin
  vignette ni glow encima.
- Tipografía: stack `'Satoshi', 'Manrope', 'Inter', system-ui, sans-serif` — la misma
  familia en las 8 slides, un solo peso pesado (900 para el número, 700-800 para la
  frase). Nada de mezclar tipografías distintas entre slides.
- Sin logo, sin iconos, sin emojis.

## 4. INPUT QUE RECIBIRÁS

```
SLIDE N — [edad] — "frase"
[FOTO: descripción]
```
o, para las slides sin edad:
```
SLIDE N — "frase"
[FOTO: descripción]
```

Generá las slides en el mismo orden exacto en que vienen — no reordenes ninguna;
verificalo antes de entregar, es el error más común.

## 5. ENTREGABLE

Un archivo HTML único `Carrusel.html`, con preview escalado de las N slides en
horizontal y descarga PNG individual + bulk de las N a **1080×1350**.

---

Confirmá con "OK, mándame el guión y las fotos" y esperá. Cuando lleguen, devolvé
directamente el HTML completo.
