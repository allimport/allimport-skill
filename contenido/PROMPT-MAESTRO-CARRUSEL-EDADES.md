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

**Regla anti-vacío (la más importante de esta sección):** el banner NO puede quedar como
un bloque negro con texto flotando en el medio y aire muerto alrededor — eso es lo que
lo hace ver genérico y feo. El número y la frase van agrupados, pegados entre sí, con
padding controlado, no centrados sueltos dentro de un espacio grande.

- **Banner superior oscuro**, ~22% de la altura de la slide (≈300px de 1350px, NO más —
  si mediste bien y da 350px+ de banner con mucho negro vacío arriba/abajo del texto,
  está mal, achicalo).
  - Fondo `#020408` sólido.
  - Padding interno del banner: 32px arriba, 40px a los costados, 28px abajo — nada de
    dejar el número "flotando" en el medio de un banner grande.
  - Número de la edad (si la slide lo tiene): **cyan `#00D4D4`**, bold (900), tamaño
    ~90-100px, centrado horizontalmente, `line-height: 0.95` (pegado, sin aire arriba).
  - Frase entre comillas: **blanco `#FFFFFF`**, bold (700-800), tamaño ~32-38px,
    centrada, `margin-top: 8px` como máximo respecto al número — van pegados como una
    sola unidad visual, no como dos elementos separados.
  - Las slides sin número (como "Pero después...") solo llevan la frase en blanco,
    centrada verticalmente en el banner, tamaño ~44-50px ya que está sola.
  - **Línea divisoria cyan** de 4px de alto, `background: var(--accent)`, ancho 72px,
    centrada horizontalmente, ubicada 20px debajo de la frase (o del número si no hay
    frase con número) — es el único elemento decorativo del banner, reemplaza el corte
    seco banner→foto por un detalle que se sienta diseñado.
- **Foto abajo**, el resto de la slide: `background-size: cover`, `background-position:
  center`, a página completa, **sin degradado, sin overlay, sin filtro** — la foto tal
  cual es, natural. Esto no cambia: la foto sigue siendo protagonista, sin vignette ni
  glow encima.
- **Elegí bien el encuadre de la foto real que llega**: si la foto tiene elementos que
  tapan mucho el centro de la composición (ej. un volante, un objeto en primer plano muy
  cerca de cámara, algo borroso en foco), usá `background-position` para recortar hacia
  la parte más limpia de la imagen en vez de centrarla a ciegas — priorizá que se vea
  nítido y compuesto, no solo que "entre" la foto completa.
- Tipografía: stack `'Satoshi', 'Manrope', 'Inter', system-ui, sans-serif` — pesos 900 y
  700/800 EXACTOS como se indica arriba. Si el resultado usa una tipografía redondeada
  tipo Poppins/Quicksand en vez de Satoshi/Manrope, está mal — revisá que la fuente haya
  cargado (`document.fonts.ready`) antes de dar por bueno el resultado.
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
