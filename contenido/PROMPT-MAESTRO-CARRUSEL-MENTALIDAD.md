# Prompt maestro — carrusel "mentalidad" (para Claude Design)

Formato para el carrusel de frase + foto épica (sin banner, texto directo sobre la
foto), investigado y guardado en `CARRUSEL-MENTALIDAD.md`. Versión completa, lista para
copiar y pegar de una sola vez en un chat nuevo de Claude Design (con el sistema de
diseño ya enganchado — no en "None").

---

# 🎨 PROMPT DE DISEÑO — CARRUSEL "MENTALIDAD" (frase sobre foto, sin banner)

Vas a recibir más abajo un guión de carrusel (texto plano, una slide por bloque). Tu
trabajo: convertirlo en un único archivo HTML llamado `Carrusel.html` que renderice las
slides como imágenes **1080×1350px (4:5, vertical de feed)**. Es un formato DISTINTO a
los otros dos sistemas de la marca: acá NO hay banner, NO hay acento cyan, NO hay logo —
el texto va directo sobre la foto, a página completa.

## 0. CONTEXTO

- Cuenta destino: personal, @_agus_moreno_ — sin logo, sin marca, sin watermark. Esta
  pieza en particular ni siquiera usa el sistema de diseño de marca (nada de cyan,
  nada de `#020408`) — es deliberadamente distinta, más cercana a la estética de cuentas
  de frases que a la identidad de marca.
- **Notación de fotos:** `[FOTO: descripción]` entre corchetes = foto real que el dueño
  sube en el chat, esperala antes de generar. `(sugerencia: descripción + link)` entre
  paréntesis = ya viene con una foto de stock elegida (Unsplash, gratis) — usá esa
  imagen directamente si el link está en el guión, o buscá una equivalente si no podés
  acceder al link.

## 1. ESTRUCTURA DEL ARCHIVO

- HTML único, autocontenido, con `<style>` y `<script>` inline.
- En `<head>`: precarga de Google Fonts (Montserrat o Inter, pesos 700/800/900 — ver
  tipografía en sección 3).
- Toolbar superior sticky: meta `Carrusel · Mentalidad · N slides · 1080×1350` + botones
  "Descargar una" (ghost) / "Descargar las N (PNG)".
- Body fondo neutro oscuro (`#111111`) para el editor — no es el fondo de marca, es solo
  el fondo de la página de trabajo. `.stage` flex horizontal, wrap, gap 28px, padding
  40px 24px 80px.
- Cada slide en `.slide-shell` con label de referencia `Slide 0X · MENTALIDAD` — solo en
  el editor, no en la imagen final.
- Cada slide se renderiza a **1080×1350px** dentro de un `.slide-scale` 324×405
  (mantiene la relación 4:5) con `transform: scale(0.3)`, `transform-origin: top left`.
- Descarga con `html-to-image@1.11.11`: quitar el transform al capturar, esperar
  `document.fonts.ready` + carga de imágenes, pixelRatio 2, fondo `#000`.

## 2. PALETA — NO HAY UNA FIJA, DEPENDE DE CADA FOTO

A diferencia de los otros dos sistemas, acá no hay un acento de marca ni una paleta
única. Dos variantes válidas, elegí la que mejor contraste dé con cada foto puntual:

- **Blanco y negro / duotono:** foto desaturada (o con un tinte azul noche sutil),
  texto en blanco puro `#FFFFFF` con sombra o contorno oscuro suave para que se lea
  sobre cualquier zona de la foto.
- **Color real:** foto tal cual, sin desaturar, texto en **negro sólido `#111111`** (NO
  blanco) si la foto es clara (cielo, nieve, playa) o blanco si la foto es oscura —
  elegí según el fondo de esa foto puntual, no una regla fija para todas las slides.

**Regla de oro:** nunca un color de acento (nada de cyan, rojo, amarillo) — solo blanco
o negro sobre la foto, según lo que contraste mejor.

## 3. LAYOUT DE CADA SLIDE

- **Sin banner.** La foto ocupa el 100% de la slide: `background-size: cover`,
  `background-position: center`, a página completa.
- **Texto superpuesto directo sobre la foto**, sin placa de fondo ni degradado debajo
  (a diferencia de `PROMPT-MAESTRO-CARRUSEL.md`) — el contraste lo da el color del
  texto (blanco/negro), no un overlay oscuro.
- **Posición del texto:** normalmente en el tercio superior de la slide (deja la parte
  de abajo para que se vea la foto/acción), pero puede ir centrado verticalmente si la
  foto tiene una zona vacía ahí (cielo, pared lisa) — priorizá que no tape la parte más
  interesante de la imagen.
- **Jerarquía de tamaño dentro de la misma frase (obligatorio, es el rasgo visual más
  característico del formato):** la frase no va toda al mismo tamaño. La palabra o
  frase corta final — la "pegada" — va bien más grande (hasta el doble) que el resto de
  la oración. Ejemplos de referencia: "Mejor que ayer, no mejor que **NADIE**.", "Nos
  falta maldad, pero nos sobra **humildad**."
  - Resto de la frase: ~44-56px, bold (800).
  - Palabra/frase de cierre destacada: ~90-130px, bold (900), en mayúsculas si el tono
    de esa frase puntual lo pide (no todas tienen que ir en mayúscula, depende de la
    frase).
  - Todo centrado horizontalmente, interlineado ajustado (`line-height: 1.05-1.15`),
    sin dejar aire muerto entre líneas.
- **Tipografía:** sans-serif bold tipo impact — `'Montserrat', 'Inter', system-ui,
  sans-serif`, pesos 800/900. Nada de tipografías redondeadas ni script.
- Sin logo, sin iconos, sin emojis, sin marca de agua.

## 4. INPUT QUE RECIBIRÁS

```
SLIDE N
"frase completa de la slide"
[FOTO: descripción] o (sugerencia: descripción — link si lo hay)
```

Generá las slides en el mismo orden exacto en que vienen — no reordenes ninguna.
Cada bloque de guión puede venir en un post separado (banco de frases distintas, no
todas van juntas necesariamente) — fijate si el guión aclara "Banco 1" / "Banco 2" o
similar, son carruseles separados aunque compartan el mismo prompt de diseño.

## 5. ENTREGABLE

Un archivo HTML único `Carrusel.html`, con preview escalado de las N slides en
horizontal y descarga PNG individual + bulk de las N a **1080×1350**.

---

Confirmá con "OK, mándame el guión y las fotos" y esperá. Cuando lleguen, devolvé
directamente el HTML completo.
