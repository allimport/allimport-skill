# Prompt maestro — carruseles (para Claude Design)

Versión completa y autocontenida, lista para copiar y pegar de una sola vez en un chat
nuevo de Claude Design (con el sistema de diseño ya enganchado — no en "None"). No hace
falta pegar nada más aparte de esto.

No editar sin actualizar también [`PROMPT-MAESTRO-STORIES.md`](PROMPT-MAESTRO-STORIES.md)
si cambia algo del sistema de diseño base (colores, reglas de estilo) — son el mismo
sistema visual, aplicado a dos formatos distintos.

---

# 🎨 PROMPT DE DISEÑO — CARRUSEL ALL IMPORT (sistema visual reutilizable)

Vas a recibir más abajo un **guión de carrusel** (texto plano, una slide por bloque). Tu
trabajo: convertirlo en un único archivo HTML llamado `Carrusel.html` que renderice las
slides como **imágenes 1080×1350px (relación 4:5)** siguiendo EXACTAMENTE el sistema
visual de marca **ALL IMPORT** que defino acá. No inventes texto: usá solo el del guión.

## 0. CONTEXTO DEL REPO (leer antes de generar)

Este prompt vive en el repo `allimport-skill`. Antes de generar el HTML:

- Sistema de diseño real (colores/tipografía exactos): `skills/allimport-web-design/references/DESIGN.md`
- Reglas de estilo validadas: `docs/DISEÑO.md`
- Marca: All Import · Cuenta destino: personal, @_agus_moreno_ (por eso: sin logo, sin
  watermark de marca — top-left vacío).

**Notación de fotos en el guión (importante, no confundirlas):**
- `[FOTO: descripción]` **entre corchetes** → es una foto real que el dueño va a subir
  (o ya subió) en este chat. Esperá a que esté subida antes de usarla; si no está, avisá
  antes de reemplazarla por cualquier otra cosa — no inventes una genérica de internet
  sin avisar.
- `(sugerencia: descripción)` **entre paréntesis** → es una sugerencia de qué tipo de
  imagen buscar, no una foto puntual ya elegida. Ahí sí podés elegir vos vos mismo de
  `historias/stock-fotos/` (o pedir que suban una si la carpeta está vacía) — pero
  decime qué elegiste al entregar.

## 1. ESTRUCTURA DEL ARCHIVO

- HTML único, autocontenido, con `<style>` y `<script>` inline.
- En `<head>`: precarga de Google Fonts (Manrope, Inter pesos 400/500/700/900) +
  Fontshare Satoshi (400/500/700/900).
- Toolbar superior sticky: marca "All Import" + separador + meta
  `Carrusel · [tema] · N slides · 1080×1350` + botones **"Descargar una"** (ghost) +
  **"Descargar las N (PNG)"** (cyan sólido).
- Body fondo `#020408`, contenido en `.stage` flex horizontal, gap 28px, wrap, padding
  40px 24px 80px.
- Cada slide dentro de un `.slide-shell` con label superior `Slide 0X · CARRUSEL`
  (cyan el número) — esto es solo un label de referencia en el editor, NO va dentro de
  la imagen final descargable.
- Cada slide se renderiza a **1080×1350px** dentro de un `.slide-scale` 324×405
  (mantiene la relación 4:5) con `transform: scale(0.3)` aplicado al `.slide` interno
  (`transform-origin: top left`).
- Script de descarga con `html-to-image@1.11.11`: quita el transform al capturar, espera
  `document.fonts.ready` + carga de imágenes, exporta PNG a pixelRatio 2, fondo `#000`.

## 2. PALETA EXACTA

```
--accent:   #00D4D4   /* ÚNICO color de acento — cyan de marca All Import */
--card-bg:  #131F38
fondo app:  #020408
texto:      #FFFFFF
gris meta:  #8a8a92
```

**Regla de oro:** el cyan `#00D4D4` es el ÚNICO color de acento. Cero rojos, verdes,
morados o amarillos decorativos.

**Regla de jerarquía de color (estricta, no negociable):** el texto de cuerpo va
SIEMPRE en blanco `#FFFFFF`, en las 6 slides. El cyan se usa ÚNICAMENTE para: (a) una
palabra o frase corta destacada dentro de una oración, o (b) el CTA de la última slide.
**Nunca pintes un párrafo completo en cyan** — eso rompe la jerarquía visual y hace que
nada resalte, porque todo grita al mismo tiempo.

## 3. TIPOGRAFÍA — UNA SOLA FAMILIA EN LAS 6 SLIDES

Stack: `'Satoshi', 'Manrope', 'Inter', system-ui, sans-serif`. La misma familia en TODAS
las slides — nada de mezclar una fuente para la portada y otra distinta (redonda, tipo
"burbuja", manuscrita) para el resto. Si el resultado usa dos tipografías visualmente
distintas entre la Slide 1 y las demás, está mal.

| Rol | Tamaño | Peso | Line-height |
|---|---|---|---|
| Hook de portada (Slide 1) | 70–84px | 900 | 1.05 |
| Texto de desarrollo (slides intermedias) | 48–58px | 500–700 | 1.3 |
| CTA de cierre (última slide) | 52–64px | 900 | 1.15 |
| Kicker / footer label (si el guión trae uno) | 26–30px | 900 uppercase | 1 |

## 4. CHROME COMÚN A TODAS LAS SLIDES

Padding interior 80px en los 4 lados.

- **Sin progress bar ni counter "0X/0N"** — Instagram ya muestra los puntitos de swipe
  debajo del carrusel; no lo dupliques dentro del diseño.
- **Top-left vacío** — sin logo-pill ni watermark de marca (cuenta personal).
- **Capa noise:** SVG fractal `feTurbulence baseFrequency=0.9` opacity 0.06 mix-blend
  overlay sobre todo, igual que en las stories.

## 5. FONDO DE CADA SLIDE (4 capas en orden Z)

1. **`.bg-photo`** full-bleed, `background-size: cover`, `position: center`,
   `filter: contrast(1.05) brightness(1.0)`.
2. **`.vignette`** — degradado vertical asimétrico, NO radial parejo: claro arriba
   (se tiene que ver la foto), oscuro abajo (donde va el texto, para que se lea
   siempre): `linear-gradient(to bottom, rgba(2,4,8,0.15) 0%, rgba(2,4,8,0.3) 40%, rgba(2,4,8,0.55) 70%, rgba(2,4,8,0.8) 100%)`.
3. **`.glow`** circular cyan difuso opcional, solo si una slide lo pide explícitamente.
4. **`.noise`** SVG fractal opacity 0.06.

Si el guión indica "misma foto que Slide X" en varias slides seguidas, usá el mismo
archivo en todas esas — es intencional, no un error.

## 6. SISTEMA DE HIGHLIGHTS (3 estilos — todos en `--accent`)

1. **`hl-solid`** → `background: var(--accent); color: #0A0C10; font-weight: 900; padding: 4px 10px; border-radius: 6px; white-space: nowrap;` — para la palabra/frase puntual más importante de esa slide.
2. **`hl-dashed`** → `border: 3px dashed var(--accent); padding: 6px 14px; border-radius: 8px; color: #fff; font-weight: 900;` — para conceptos secundarios.
3. **`hl-underline`** → subrayado fino cyan debajo de una palabra/frase, para énfasis suave, sin cambiar el color del texto.

Usá como máximo UN highlight por slide, sobre una palabra o frase corta — nunca sobre
un párrafo entero.

## 7. LAYOUT SEGÚN POSICIÓN DE LA SLIDE

- **Slide 1 (portada):** además de ser la primera al deslizar, es la miniatura del feed
  y del perfil — tiene que funcionar sola. Hook grande (ver tabla de tipografía),
  centrado verticalmente en el tercio inferior de la imagen.
- **Slides intermedias (desarrollo):** texto de cuerpo en blanco, alineado abajo sobre
  el degradado, mismo tamaño y posición en todas para que el swipe se sienta consistente.
- **Última slide (cierre):** párrafo de cuerpo en blanco + el CTA final en cyan bold,
  como línea aparte, más grande que el cuerpo — es lo último que lee la persona antes
  de decidir escribir o no.

## 8. INPUT QUE RECIBIRÁS

```
SLIDE N
[FOTO: descripción] o (sugerencia: descripción)
[texto de esa slide]

SLIDE N+1
…
```

**Tu trabajo:**
1. Contá cuántas SLIDE hay y generá esa cantidad exacta, en el mismo orden que vienen
   en el guión — **1, 2, 3, 4, 5, 6, sin invertir ni reordenar ninguna.** Verificá esto
   antes de entregar: es el error más común, revisalo dos veces.
2. Asigná el layout según posición (§7): primera = portada, última = cierre, el resto
   = desarrollo.
3. Resolvé la notación de fotos según la regla del §0 (corchetes vs paréntesis).
4. Detectá highlights (mayúsculas, comillas, palabras claramente enfatizadas) y aplicá
   el estilo que corresponda (§6), como máximo uno por slide.
5. No inventes texto que no esté en el guión. No agregues iconografía ni emojis que no
   estén ya en el guión.

## 9. ENTREGABLE

Un archivo HTML único `Carrusel.html`, con preview escalado de las N slides en
horizontal y descarga PNG individual + bulk de las N a **1080×1350**.

---

Confirmá con "OK, mándame el guión" y esperá. Cuando lleguen el guión y las fotos,
devolvé directamente el HTML completo.
