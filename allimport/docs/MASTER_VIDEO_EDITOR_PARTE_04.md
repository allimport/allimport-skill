# MASTER VIDEO EDITOR — PARTE 04
## Manual profesional de edición de video para Claude Code
### Capítulos 25–32: Safe Zones, Formatos, Exportación, Audio Avanzado, Motion Graphics, Thumbnails, Historias de Instagram, Carruseles

---

# TABLA DE CONTENIDO — PARTE 04

25. [Capítulo 25: Safe Zones por plataforma](#capítulo-25-safe-zones-por-plataforma)
26. [Capítulo 26: Formatos y Aspect Ratio](#capítulo-26-formatos-y-aspect-ratio)
27. [Capítulo 27: Exportación — especificaciones técnicas completas](#capítulo-27-exportación--especificaciones-técnicas-completas)
28. [Capítulo 28: Audio avanzado — mezcla y masterización](#capítulo-28-audio-avanzado--mezcla-y-masterización)
29. [Capítulo 29: Motion Graphics y animación de texto](#capítulo-29-motion-graphics-y-animación-de-texto)
30. [Capítulo 30: Thumbnails y portadas](#capítulo-30-thumbnails-y-portadas)
31. [Capítulo 31: Historias de Instagram — edición especializada](#capítulo-31-historias-de-instagram--edición-especializada)
32. [Capítulo 32: Carruseles — edición de imagen secuencial](#capítulo-32-carruseles--edición-de-imagen-secuencial)

---

# Capítulo 25: Safe Zones por plataforma

## 25.1 Concepto de safe zone

Las safe zones son las regiones de un video vertical (1080x1920) donde **no hay elementos de la interfaz de usuario** de la plataforma (nombre de usuario, botones de like, barra de música, caption, etc.). Todo texto, logo, precio, CTA o elemento informativo del video DEBE estar dentro de la safe zone para que el espectador lo lea sin obstrucciones.

### 25.1.1 Por qué importa para All Import

Si un precio de producto ("$15.000") queda detrás del botón de "Seguir" de Instagram, se pierde la información clave de venta. Si el logo de @allimport.cba queda tapado por la barra de música de TikTok, la marca no se registra. Las safe zones no son una sugerencia: son obligatorias.

## 25.2 Mapa de safe zones por plataforma

### 25.2.1 Instagram Reels — Mapa completo

```
                    1080px
    ┌──────────────────────────────────────┐  0px
    │  ████████████████████████████████████ │  ← Status bar (reloj, batería)
    │  ████████████████████████████████████ │    0-64px → ZONA MUERTA
    ├──────────────────────────────────────┤  64px
    │                                      │
    │         ┌──────────────────┐         │  ← Nombre de cuenta (esquina sup izq)
    │         │                  │         │    64-130px → ZONA PARCIAL
    ├─────────┴──────────────────┴─────────┤  130px
    │                                      │
    │                                      │
    │                                      │
    │      ╔══════════════════════╗        │
    │      ║                      ║        │  ← SAFE ZONE PRINCIPAL
    │      ║   ÁREA SEGURA PARA   ║        │    130-1400px verticalmente
    │      ║   TEXTO, PRECIOS,    ║        │    80-920px horizontalmente
    │      ║   LOGOS, CTAs        ║        │
    │      ║                      ║        │
    │      ╚══════════════════════╝        │
    │                                      │
    │                              ┌─────┐ │  ← Botones laterales derechos
    │                              │ ❤️  │ │    (Like, Comentar, Compartir,
    │                              │ 💬  │ │     Guardar, Audio, Más)
    │                              │ ➤   │ │    Zona: 920-1080px horizontal
    │                              │ 🔖  │ │    desde y=1100 hasta y=1650
    │                              │ 🎵  │ │
    │                              │ ⋯   │ │
    │                              └─────┘ │
    ├──────────────────────────────────────┤  1400px
    │  ████ @usuario                       │  ← Nombre de usuario
    │  ████ Caption del reel que puede     │  ← Caption (1-3 líneas)
    │  ████ ocupar varias líneas...        │    1400-1680px → ZONA MUERTA
    ├──────────────────────────────────────┤  1680px
    │  ████ ♫ Nombre del audio · Artista   │  ← Barra de audio/música
    │  ████████████████████████████████████ │    1680-1760px → ZONA MUERTA
    ├──────────────────────────────────────┤  1760px
    │  ████████████████████████████████████ │  ← Barra de navegación inferior
    │  ████ 🏠  🔍  ➕  🎬  👤 ████████ │    (Home, Buscar, Crear, Reels, Perfil)
    │  ████████████████████████████████████ │    1760-1920px → ZONA MUERTA
    └──────────────────────────────────────┘  1920px
```

### 25.2.2 TikTok — Mapa completo

```
                    1080px
    ┌──────────────────────────────────────┐  0px
    │  ████████████████████████████████████ │  ← Status bar + island dinámico
    │  ████████████████████████████████████ │    0-80px → ZONA MUERTA
    ├──────────────────────────────────────┤  80px
    │     Para ti  │  Siguiendo            │  ← Tabs de navegación superior
    │  ████████████████████████████████████ │    80-150px → ZONA MUERTA
    ├──────────────────────────────────────┤  150px
    │                                      │
    │                                      │
    │      ╔══════════════════════╗        │
    │      ║                      ║        │  ← SAFE ZONE PRINCIPAL
    │      ║   ÁREA SEGURA PARA   ║        │    150-1350px verticalmente
    │      ║   TEXTO Y OVERLAYS   ║        │    60-900px horizontalmente
    │      ║                      ║        │
    │      ╚══════════════════════╝        │
    │                                      │
    │                              ┌─────┐ │
    │                              │ 👤  │ │  ← Botones laterales derechos
    │                              │ ❤️  │ │    (Perfil, Like, Comentar,
    │                              │ 💬  │ │     Guardar, Compartir, Audio)
    │                              │ 🔖  │ │    Zona: 900-1080px horizontal
    │                              │ ➤   │ │    desde y=1000 hasta y=1550
    │                              │ 🎵  │ │
    │                              └─────┘ │
    ├──────────────────────────────────────┤  1350px
    │  @usuario · descripción del video    │  ← Caption (hasta 3 líneas)
    │  con hashtags que se expanden al     │    1350-1550px → ZONA PARCIAL
    │  tocar...                            │
    ├──────────────────────────────────────┤  1550px
    │  ♫ Sonido original — @usuario        │  ← Marquesina de audio
    │  ████████████████████████████████████ │    1550-1650px → ZONA MUERTA
    ├──────────────────────────────────────┤  1650px
    │  ████████████████████████████████████ │  ← Barra de navegación inferior
    │  ████ 🏠  🔍  ➕  📥  👤 ████████ │    (Inicio, Descubrir, Crear,
    │  ████████████████████████████████████ │     Bandeja, Perfil)
    │  ████████████████████████████████████ │    1650-1920px → ZONA MUERTA
    └──────────────────────────────────────┘  1920px
```

### 25.2.3 YouTube Shorts — Mapa completo

```
                    1080px
    ┌──────────────────────────────────────┐  0px
    │  ████████████████████████████████████ │  ← Status bar
    │  ████████████████████████████████████ │    0-64px → ZONA MUERTA
    ├──────────────────────────────────────┤  64px
    │  ← ⋮  (menú de opciones superior)   │
    │  ████████████████████████████████████ │    64-120px → ZONA PARCIAL
    ├──────────────────────────────────────┤  120px
    │                                      │
    │      ╔══════════════════════╗        │
    │      ║                      ║        │  ← SAFE ZONE PRINCIPAL
    │      ║   ÁREA SEGURA PARA   ║        │    120-1350px verticalmente
    │      ║   TEXTO Y OVERLAYS   ║        │    60-920px horizontalmente
    │      ║                      ║        │
    │      ╚══════════════════════╝        │
    │                                      │
    │                              ┌─────┐ │
    │                              │ 👍  │ │  ← Botones laterales derechos
    │                              │ 👎  │ │    (Like, Dislike, Comentar,
    │                              │ 💬  │ │     Compartir, Remix, Más)
    │                              │ ➤   │ │    Zona: 920-1080px horizontal
    │                              │ 🔄  │ │    desde y=900 hasta y=1500
    │                              │ ⋯   │ │
    │                              └─────┘ │
    ├──────────────────────────────────────┤  1350px
    │  @Canal · descripción del Short      │  ← Nombre del canal + caption
    │  con descripción expandible...       │    1350-1580px → ZONA PARCIAL
    │  ♫ Audio original                    │
    ├──────────────────────────────────────┤  1580px
    │  ████ [Suscribirse] ████████████████ │  ← Botón de suscripción
    │  ████████████████████████████████████ │    1580-1680px → ZONA MUERTA
    ├──────────────────────────────────────┤  1680px
    │  ████████████████████████████████████ │  ← Barra de navegación inferior
    │  ████ 🏠  📺  ➕  🔔  📚 ████████ │    (Inicio, Shorts, Crear,
    │  ████████████████████████████████████ │     Suscripciones, Biblioteca)
    │  ████████████████████████████████████ │    1680-1920px → ZONA MUERTA
    └──────────────────────────────────────┘  1920px
```

### 25.2.4 Instagram Stories — Mapa completo

```
                    1080px
    ┌──────────────────────────────────────┐  0px
    │  ████████████████████████████████████ │  ← Status bar
    │  ████████████████████████████████████ │    0-64px → ZONA MUERTA
    ├──────────────────────────────────────┤  64px
    │  ░░░░░░░░░░ ─ ─ ─ ─ ░░░░░░░░░░░░░░ │  ← Barras de progreso de stories
    │  ████████████████████████████████████ │    64-90px → ZONA MUERTA
    ├──────────────────────────────────────┤  90px
    │  📷 @usuario · 3h        ✕           │  ← Avatar + nombre + botón cerrar
    │  ████████████████████████████████████ │    90-170px → ZONA MUERTA
    ├──────────────────────────────────────┤  170px
    │                                      │
    │      ╔══════════════════════╗        │
    │      ║                      ║        │  ← SAFE ZONE PRINCIPAL
    │      ║   ÁREA SEGURA PARA   ║        │    170-1500px verticalmente
    │      ║   TEXTO, STICKERS,   ║        │    60-1020px horizontalmente
    │      ║   ENCUESTAS, etc.    ║        │
    │      ║                      ║        │
    │      ╚══════════════════════╝        │
    │                                      │
    ├──────────────────────────────────────┤  1500px
    │                                      │
    │  ████ [Responder] ██████████████████ │  ← Caja de respuesta + acciones
    │  ████████████████████████████████████ │    1500-1700px → ZONA MUERTA
    │  ████ ❤️ ✈️ ████████████████████████ │
    ├──────────────────────────────────────┤  1700px
    │  ████ [Ver más / Link] █████████████ │  ← Sticker de link (si existe)
    │  ████████████████████████████████████ │    1700-1820px → ZONA PARCIAL
    ├──────────────────────────────────────┤  1820px
    │  ████████████████████████████████████ │  ← Indicador de swipe up / home
    │  ████████████████████████████████████ │    1820-1920px → ZONA MUERTA
    └──────────────────────────────────────┘  1920px
```

## 25.3 Tabla resumen de safe zones (en píxeles)

| Plataforma       | Top safe (px) | Bottom safe (px) | Left (px) | Right (px) | Centro seguro (WxH)  |
|:-----------------|:--------------|:-----------------|:-----------|:-----------|:---------------------|
| Instagram Reels  | 130           | 1400             | 80         | 920        | 840 x 1270           |
| TikTok           | 150           | 1350             | 60         | 900        | 840 x 1200           |
| YouTube Shorts   | 120           | 1350             | 60         | 920        | 860 x 1230           |
| Instagram Stories| 170           | 1500             | 60         | 1020       | 960 x 1330           |
| Cruce universal  | 170           | 1350             | 80         | 900        | **820 x 1180**       |

> **Cruce universal:** si querés que el mismo video funcione en TODAS las plataformas sin rehacer, usá la safe zone más restrictiva de cada lado. La fila "Cruce universal" es esa intersección.

## 25.4 Árbol de decisión: dónde colocar texto según plataforma

```
¿El video se publica en UNA SOLA plataforma?
├── SÍ
│   ├── ¿Cuál?
│   │   ├── Instagram Reels
│   │   │   → Top safe: y >= 130px
│   │   │   → Bottom safe: y <= 1400px
│   │   │   → Right safe: x <= 920px (evitar botones laterales)
│   │   │   → Texto principal: centrar entre y=300 y y=800
│   │   │   → Precios/CTA: y=900-1100 (centro-bajo, antes del caption)
│   │   │
│   │   ├── TikTok
│   │   │   → Top safe: y >= 150px
│   │   │   → Bottom safe: y <= 1350px
│   │   │   → Right safe: x <= 900px
│   │   │   → Texto principal: centrar entre y=300 y y=750
│   │   │   → Precios/CTA: y=850-1100
│   │   │   → NOTA: TikTok tiene más UI que IG → zona más chica abajo
│   │   │
│   │   ├── YouTube Shorts
│   │   │   → Top safe: y >= 120px
│   │   │   → Bottom safe: y <= 1350px
│   │   │   → Right safe: x <= 920px
│   │   │   → Texto principal: centrar entre y=300 y y=750
│   │   │   → Precios/CTA: y=850-1100
│   │   │   → NOTA: botón de Suscribirse ocupa más espacio abajo
│   │   │
│   │   └── Instagram Stories
│   │       → Top safe: y >= 170px
│   │       → Bottom safe: y <= 1500px
│   │       → Texto principal: centrar entre y=400 y y=900
│   │       → CTA/Link: y=1100-1400 (arriba de la caja de respuesta)
│   │       → NOTA: las stories tienen más espacio abajo que Reels
│   │
│   └── Usar la safe zone específica de esa plataforma
│
└── NO (se publica en múltiples plataformas)
    ├── ¿Se puede hacer una versión por plataforma?
    │   ├── SÍ → Hacer versiones separadas con safe zones específicas
    │   │        (más trabajo pero mejor resultado)
    │   └── NO (recursos limitados)
    │       → Usar CRUCE UNIVERSAL:
    │         Top: y >= 170px
    │         Bottom: y <= 1350px
    │         Left: x >= 80px
    │         Right: x <= 900px
    │         → Centro seguro: 820x1180px
    │         → TODO el texto dentro de esa caja
    │
    └── Verificar con la checklist §25.7
```

## 25.5 Fórmulas de posición para ffmpeg drawtext

### 25.5.1 Variables de referencia

```
w  = ancho del video (1080)
h  = alto del video (1920)
tw = ancho del texto renderizado (calculado automáticamente)
th = alto del texto renderizado (calculado automáticamente)
```

### 25.5.2 Posicionamiento por plataforma

**Instagram Reels — texto centrado en safe zone:**
```bash
# Título principal centrado horizontalmente, tercio superior
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='NUEVO DROP':fontsize=72:fontcolor=#f8fafa:\
  x=(w-tw)/2:\
  y=400:\
  enable='between(t,0,3)'" \
  -codec:a copy output_ig.mp4

# Precio en pill (parte baja de la safe zone)
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='  \$15.000  ':fontsize=56:fontcolor=#0a0f1a:\
  box=1:boxcolor=#00d4d4@0.95:boxborderw=18:\
  x=(w-tw)/2:\
  y=1050:\
  enable='between(t,1,4)'" \
  -codec:a copy output_ig.mp4
```

**TikTok — texto con margen izquierdo (estilo más orgánico):**
```bash
# Texto alineado a la izquierda (estilo personal @_agus_moreno_)
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-SemiBold.ttf':\
  text='Llegaron los TWS':fontsize=64:fontcolor=#f8fafa:\
  x=80:\
  y=450:\
  enable='between(t,0,3)'" \
  -codec:a copy output_tiktok.mp4

# Texto con sombra para legibilidad
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-SemiBold.ttf':\
  text='Llegaron los TWS':fontsize=64:fontcolor=#f8fafa:\
  shadowcolor=#0a0f1a@0.7:shadowx=3:shadowy=3:\
  x=80:\
  y=450:\
  enable='between(t,0,3)'" \
  -codec:a copy output_tiktok.mp4
```

**YouTube Shorts — texto centrado con fondo semi-transparente:**
```bash
# Texto con fondo navy semi-transparente
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='TOP 5 GADGETS':fontsize=68:fontcolor=#f8fafa:\
  box=1:boxcolor=#0a0f1a@0.65:boxborderw=14:\
  x=(w-tw)/2:\
  y=350:\
  enable='between(t,0,4)'" \
  -codec:a copy output_yt.mp4
```

**Cruce universal — funciona en todas las plataformas:**
```bash
# Posición universal segura (la más conservadora)
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='OFERTA LIMITADA':fontsize=60:fontcolor=#f8fafa:\
  x=(w-tw)/2:\
  y=500:\
  enable='between(t,0,3)'" \
  -codec:a copy output_universal.mp4
```

### 25.5.3 Tabla rápida de coordenadas Y para drawtext

| Ubicación deseada         | IG Reels (y=) | TikTok (y=) | YT Shorts (y=) | IG Stories (y=) | Universal (y=) |
|:--------------------------|:--------------|:------------|:----------------|:----------------|:----------------|
| Título principal (arriba) | 300-450       | 300-450     | 280-420         | 350-500         | 350-500         |
| Subtítulo                 | 500-650       | 500-620     | 470-600         | 550-700         | 550-650         |
| Centro visual             | 750-900       | 700-850     | 700-850         | 800-950         | 750-900         |
| Precio / dato clave       | 950-1100      | 900-1050    | 900-1050        | 1000-1200       | 950-1050        |
| CTA (último texto)        | 1100-1300     | 1050-1250   | 1050-1250       | 1200-1400       | 1100-1250       |

## 25.6 Reglas de colocación para las dos cuentas de All Import

```
¿Es contenido de @allimport.cba (cuenta de marca)?
├── SÍ
│   → Logo: esquina superior izquierda, x=60, y=safe_top+20
│   → Texto: CENTRADO horizontalmente
│   → Pill de precio: centrado, fondo CYAN #00d4d4, texto NAVY #0a0f1a
│   → CTA: centrado, debajo del precio
│   → Usar safe zone de la plataforma destino
│
└── NO → Es contenido de @_agus_moreno_ (cuenta personal)
    → SIN LOGO (nunca, bajo ninguna circunstancia)
    → Texto: ALINEADO A LA IZQUIERDA (x=80)
    → Pill de precio: alineado a la izquierda, estilo más sutil
    → CTA: alineado a la izquierda
    → Tipografía ligeramente más chica (-4px) para que se vea "personal"
```

## 25.7 Checklist de verificación de safe zones

- [ ] Identificar la plataforma de destino (IG Reels / TikTok / YT Shorts / Stories)
- [ ] SI multiplataforma: usar cruce universal (top=170, bottom=1350, left=80, right=900)
- [ ] Verificar que NINGÚN texto cae fuera de la safe zone en ningún frame
- [ ] Verificar que el logo (si @allimport.cba) no colisiona con el nombre de usuario de la plataforma
- [ ] Verificar que el precio no queda oculto por botones de Like/Compartir (lado derecho)
- [ ] Verificar que el CTA no queda detrás del caption de la plataforma
- [ ] Verificar que las barras de texto animadas no se salen de la safe zone en ningún punto de la animación
- [ ] Testear abriendo el video en un celular real (o emulador) con la app de la plataforma
- [ ] SI hay sticker de link en Stories: verificar que no tapa texto propio del video
- [ ] Verificar que los subtítulos/captions del video no colisionan con el caption de la plataforma
- [ ] SI se usa B-roll con texto incrustado: verificar que ese texto también cumple safe zones
- [ ] Revisión final: ¿se lee TODO el contenido importante sin scrollear el caption de la plataforma?

---

# Capítulo 26: Formatos y Aspect Ratio

## 26.1 Tabla maestra de aspect ratios

| Aspect Ratio | Resolución estándar | Orientación | Uso principal                                          |
|:-------------|:--------------------|:------------|:-------------------------------------------------------|
| 9:16         | 1080 x 1920         | Vertical    | Reels, TikTok, Shorts, Stories, WhatsApp Status        |
| 16:9         | 1920 x 1080         | Horizontal  | YouTube largo, presentaciones, pantalla completa        |
| 4:5          | 1080 x 1350         | Vertical    | Feed de Instagram (foto/video), Facebook Feed           |
| 1:1          | 1080 x 1080         | Cuadrado    | Feed de Instagram, Facebook, LinkedIn, Twitter/X        |
| 4:3          | 1440 x 1080         | Horizontal  | Presentaciones clásicas, TV tradicional                 |
| 21:9         | 2560 x 1080         | Ultra-wide  | Cine, trailers, contenido premium horizontal            |
| 2:3          | 1000 x 1500         | Vertical    | Pinterest pins                                          |

## 26.2 Resoluciones detalladas por formato

| Formato    | Resolución mínima | Resolución recomendada | Resolución máxima | FPS recomendados |
|:-----------|:------------------|:-----------------------|:-------------------|:-----------------|
| 9:16       | 720 x 1280        | 1080 x 1920           | 2160 x 3840 (4K)  | 30 fps           |
| 16:9       | 1280 x 720        | 1920 x 1080           | 3840 x 2160 (4K)  | 30 fps           |
| 4:5        | 864 x 1080        | 1080 x 1350           | 2160 x 2700       | 30 fps           |
| 1:1        | 600 x 600         | 1080 x 1080           | 2160 x 2160       | 30 fps           |
| 4:3        | 960 x 720         | 1440 x 1080           | 2880 x 2160       | 30 fps           |
| 21:9       | 1680 x 720        | 2560 x 1080           | 5120 x 2160       | 24 fps (cine)    |
| 2:3        | 600 x 900         | 1000 x 1500           | 2000 x 3000       | N/A (estático)   |

## 26.3 Árbol de decisión: qué aspect ratio usar

```
¿Cuál es el destino principal del contenido?
│
├── Instagram
│   ├── ¿Es un Reel?
│   │   └── SÍ → 9:16 (1080x1920)
│   ├── ¿Es una Story?
│   │   └── SÍ → 9:16 (1080x1920)
│   ├── ¿Es un post de Feed (video)?
│   │   ├── ¿Se quiere máximo impacto visual?
│   │   │   └── SÍ → 4:5 (1080x1350) — ocupa más pantalla en el feed
│   │   └── ¿Es un producto cuadrado o simétrico?
│   │       └── SÍ → 1:1 (1080x1080)
│   └── ¿Es un carrusel?
│       ├── Carrusel vertical → 4:5 (1080x1350) RECOMENDADO
│       └── Carrusel cuadrado → 1:1 (1080x1080) ACEPTABLE
│
├── TikTok
│   └── SIEMPRE → 9:16 (1080x1920)
│       → No hay otro formato viable en TikTok
│
├── YouTube
│   ├── ¿Es un Short?
│   │   └── SÍ → 9:16 (1080x1920)
│   ├── ¿Es un video largo?
│   │   └── SÍ → 16:9 (1920x1080)
│   │       → SI se quiere look cinematográfico:
│   │         considerar 21:9 con letterbox (barras negras arriba/abajo)
│   └── ¿Es una thumbnail?
│       └── SÍ → 16:9 (1280x720 mínimo, 1920x1080 recomendado)
│
├── WhatsApp Status
│   └── 9:16 (1080x1920)
│       → IMPORTANTE: WhatsApp comprime mucho
│       → Ver §27.5 para export optimizado
│
├── Facebook
│   ├── ¿Es un Reel de Facebook?
│   │   └── SÍ → 9:16 (1080x1920)
│   ├── ¿Es un video de Feed?
│   │   ├── Máximo engagement → 4:5 (1080x1350)
│   │   └── Contenido informativo → 1:1 (1080x1080)
│   └── ¿Es una Story de Facebook?
│       └── 9:16 (1080x1920)
│
├── LinkedIn
│   ├── Video → 1:1 (1080x1080) o 16:9 (1920x1080)
│   └── Imagen → 1:1 (1080x1080) RECOMENDADO
│
├── Pinterest
│   └── 2:3 (1000x1500)
│
└── Multiplataforma (el video va a VARIAS plataformas)
    ├── ¿Todas las plataformas son vertical-first? (IG Reels + TikTok + Shorts)
    │   └── SÍ → 9:16 (1080x1920) y listo
    ├── ¿Mezcla vertical + horizontal? (IG Reels + YouTube largo)
    │   └── Grabar/generar en 9:16, luego reencuadrar a 16:9 para YouTube
    │       (ver §26.5 Reframing)
    └── ¿Mezcla vertical + cuadrado? (IG Reels + Feed IG)
        └── Grabar/generar en 9:16, luego cropear a 4:5 o 1:1 para Feed
```

## 26.4 Plataforma → Requisitos exactos

| Plataforma        | Formato requerido | Resolución     | FPS   | Duración máxima     | Tamaño máx     |
|:------------------|:------------------|:---------------|:------|:--------------------|:---------------|
| Instagram Reels   | 9:16              | 1080x1920      | 30    | 90 seg (15m con app)| 650 MB          |
| Instagram Stories | 9:16              | 1080x1920      | 30    | 60 seg (corta a 15) | 250 MB          |
| Instagram Feed    | 4:5 / 1:1         | 1080x1350/1080 | 30    | 60 seg              | 650 MB          |
| TikTok            | 9:16              | 1080x1920      | 30    | 10 min (60s ideal)  | 287 MB (móvil)  |
| YouTube Shorts    | 9:16              | 1080x1920      | 30    | 60 seg              | Sin límite real |
| YouTube largo     | 16:9              | 1920x1080+     | 30/60 | 12 horas (verif.)   | 256 GB          |
| WhatsApp Status   | 9:16              | 1080x1920      | 30    | 30 seg              | 16 MB           |
| Facebook Reels    | 9:16              | 1080x1920      | 30    | 90 seg              | 4 GB            |
| LinkedIn          | 1:1 / 16:9        | 1080x1080+     | 30    | 10 min              | 5 GB            |

## 26.5 Estrategias de reframing (cambio de aspect ratio)

### 26.5.1 De 9:16 a 16:9 (vertical a horizontal)

```
Problema: el video vertical tiene mucho contenido arriba y abajo
         que se pierde al cropear a horizontal.

Estrategia 1: Crop centrado (pierde arriba y abajo)
┌──────────────────────────────────────┐
│          (se pierde arriba)          │
│  ┌──────────────────────────────┐   │ 9:16
│  │    ← ESTO se conserva →     │   │ original
│  │      (zona central)         │   │
│  └──────────────────────────────┘   │
│          (se pierde abajo)          │
└──────────────────────────────────────┘
   → Resultado: 16:9 con la zona central del video

Estrategia 2: Blur+stack (video centrado con fondo borroso)
┌──────────────────────────────────────────────────────┐
│  ░░░░░░░░░░┌────────────┐░░░░░░░░░░░                │ 16:9
│  ░ BLURRED ░│  VIDEO     │░ BLURRED ░                │ resultado
│  ░ VERSION ░│  ORIGINAL  │░ VERSION ░                │
│  ░░░░░░░░░░└────────────┘░░░░░░░░░░░                │
└──────────────────────────────────────────────────────┘
   → El video 9:16 se pone centrado, con versión borrosa de fondo

Estrategia 3: Side-by-side (para comparaciones)
┌──────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────┐                  │ 16:9
│  │  CLIP A       │  │  CLIP B       │                  │ resultado
│  │  (vertical)  │  │  (vertical)  │                  │
│  └──────────────┘  └──────────────┘                  │
└──────────────────────────────────────────────────────┘
```

**Comandos ffmpeg para cada estrategia:**

```bash
# Estrategia 1: Crop centrado de 9:16 a 16:9
ffmpeg -i vertical.mp4 -vf \
  "crop=1080:608:0:656" \
  -c:a copy horizontal_crop.mp4
# 608 = 1080 * 9/16 → mantiene proporciones 16:9
# 656 = (1920-608)/2 → centra el crop verticalmente

# Estrategia 2: Blur + stack (fondo borroso)
ffmpeg -i vertical.mp4 -filter_complex \
  "[0:v]scale=1920:1080,boxblur=25:5[bg];\
   [0:v]scale=-1:1080[fg];\
   [bg][fg]overlay=(W-w)/2:(H-h)/2" \
  -c:a copy horizontal_blur.mp4

# Estrategia 3: Side-by-side (2 clips verticales)
ffmpeg -i clipA.mp4 -i clipB.mp4 -filter_complex \
  "[0:v]scale=540:960[a];\
   [1:v]scale=540:960[b];\
   [a][b]hstack=inputs=2,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
  -c:a copy sidebyside.mp4
```

### 26.5.2 De 16:9 a 9:16 (horizontal a vertical)

```bash
# Crop centrado de 16:9 a 9:16
ffmpeg -i horizontal.mp4 -vf \
  "crop=608:1080:236:0,scale=1080:1920" \
  -c:a copy vertical_crop.mp4
# 608 = 1080 * 9/16
# 236 = (1920-608)/2 → centra horizontalmente

# Stack vertical: video arriba + texto/info abajo
ffmpeg -i horizontal.mp4 -filter_complex \
  "[0:v]scale=1080:608[top];\
   color=c=#0a0f1a:s=1080x1312:d=$(ffprobe -v error -select_streams v -show_entries stream=duration -of csv=p=0 horizontal.mp4)[bottom];\
   [top][bottom]vstack=inputs=2" \
  -c:a copy vertical_stack.mp4
```

### 26.5.3 De 9:16 a 4:5 (vertical a feed de Instagram)

```bash
# Crop centrado de 9:16 a 4:5 (corta arriba y abajo)
ffmpeg -i vertical.mp4 -vf \
  "crop=1080:1350:0:285" \
  -c:a copy feed_4x5.mp4
# 285 = (1920-1350)/2 → centra verticalmente

# De 9:16 a 1:1 (cuadrado, corta más)
ffmpeg -i vertical.mp4 -vf \
  "crop=1080:1080:0:420" \
  -c:a copy feed_1x1.mp4
# 420 = (1920-1080)/2
```

### 26.5.4 Higgsfield reframe

```
Herramienta: Higgsfield reframe

Para cambiar el aspect ratio de un video con IA (re-encuadre inteligente
que sigue al sujeto):

1. Subir el video original a Higgsfield (media_upload)
2. Llamar a reframe con el aspect ratio destino
3. Higgsfield detecta al sujeto principal y re-encuadra
   automáticamente siguiéndolo

Ventajas sobre crop manual:
- Sigue al sujeto (si la persona se mueve, el crop la sigue)
- Mejor para contenido con movimiento
- No requiere definir coordenadas manualmente

Desventajas:
- Puede fallar con múltiples sujetos
- Consume créditos de Higgsfield
- Menor control que el crop manual

CUÁNDO USAR HIGGSFIELD REFRAME vs FFMPEG CROP:
├── Sujeto estático (producto en mesa) → ffmpeg crop (más control)
├── Persona hablando a cámara fija → ffmpeg crop (no hay movimiento)
├── Persona moviéndose → Higgsfield reframe (sigue al sujeto)
└── Escena con múltiples sujetos → ffmpeg crop manual por segmento
```

## 26.6 Checklist de formato y aspect ratio

- [ ] Definir plataforma(s) de destino ANTES de empezar a editar
- [ ] Confirmar resolución correcta (ver tabla §26.4)
- [ ] SI el material fuente no coincide con el destino: elegir estrategia de reframing (§26.5)
- [ ] Verificar que el video resultante tiene el aspect ratio correcto con ffprobe:
  ```bash
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,display_aspect_ratio -of csv=p=0 output.mp4
  ```
- [ ] Verificar que no hay barras negras no deseadas (letterbox/pillarbox)
- [ ] SI es multiplataforma: generar una versión por formato necesario
- [ ] Verificar que el texto/overlays siguen siendo legibles después del reframing
- [ ] Verificar safe zones del formato final (ver Capítulo 25)
- [ ] SI se usó Higgsfield reframe: verificar que no recortó información clave
- [ ] Verificar FPS correcto para la plataforma (30 fps es el estándar)

---

# Capítulo 27: Exportación — especificaciones técnicas completas

## 27.1 Tabla maestra de exportación por plataforma

| Plataforma       | Resolución  | Codec video | Bitrate video  | Codec audio | Bitrate audio | FPS | Duración máx | Tamaño máx | CRF sugerido |
|:-----------------|:------------|:------------|:---------------|:------------|:--------------|:----|:-------------|:-----------|:-------------|
| Instagram Reels  | 1080x1920   | H.264       | 8-12 Mbps      | AAC         | 128 kbps      | 30  | 90s          | 650 MB     | 18-20        |
| Instagram Stories| 1080x1920   | H.264       | 6-10 Mbps      | AAC         | 128 kbps      | 30  | 60s          | 250 MB     | 20-22        |
| Instagram Feed   | 1080x1350   | H.264       | 6-10 Mbps      | AAC         | 128 kbps      | 30  | 60s          | 650 MB     | 18-20        |
| TikTok           | 1080x1920   | H.264       | 8-12 Mbps      | AAC         | 128 kbps      | 30  | 600s         | 287 MB     | 18-20        |
| YouTube Shorts   | 1080x1920   | H.264       | 10-15 Mbps     | AAC         | 192 kbps      | 30  | 60s          | Sin límite | 17-19        |
| YouTube largo    | 1920x1080   | H.264/H.265 | 15-25 Mbps     | AAC         | 256 kbps      | 30  | 12h          | 256 GB     | 16-18        |
| YouTube 4K       | 3840x2160   | H.265/VP9   | 35-50 Mbps     | AAC         | 384 kbps      | 30  | 12h          | 256 GB     | 15-17        |
| WhatsApp Status  | 720x1280    | H.264       | 1.5-3 Mbps     | AAC         | 64 kbps       | 30  | 30s          | 16 MB      | 28-32        |
| Facebook Reels   | 1080x1920   | H.264       | 8-12 Mbps      | AAC         | 128 kbps      | 30  | 90s          | 4 GB       | 18-20        |
| LinkedIn         | 1080x1080   | H.264       | 6-10 Mbps      | AAC         | 128 kbps      | 30  | 600s         | 5 GB       | 18-20        |

## 27.2 Árbol de exportación — Instagram Reels

```
Exportar para Instagram Reels
│
├── ¿El video ya es 1080x1920?
│   ├── SÍ → Continuar
│   └── NO → Escalar a 1080x1920 (ver §26.5)
│
├── ¿La duración es <= 90 segundos?
│   ├── SÍ → Continuar
│   └── NO → Cortar a 90s o dividir en partes
│       → PARTE 1: 0-90s con CTA "Parte 2 en perfil"
│       → PARTE 2: 90s-fin con hook de continuidad
│
├── ¿El audio está normalizado a -14 LUFS?
│   ├── SÍ → Continuar
│   └── NO → Normalizar (ver §28.4)
│
├── Exportar con ffmpeg:
│   ffmpeg -i input.mp4 \
│     -c:v libx264 -preset slow -crf 18 \
│     -profile:v high -level 4.0 \
│     -pix_fmt yuv420p \
│     -vf "scale=1080:1920:force_original_aspect_ratio=decrease,\
│          pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a" \
│     -r 30 \
│     -c:a aac -b:a 128k -ar 44100 \
│     -movflags +faststart \
│     output_ig_reels.mp4
│
├── ¿El archivo pesa <= 650 MB?
│   ├── SÍ → Listo
│   └── NO → Subir CRF a 22-24 y re-exportar
│       → SI sigue siendo grande: usar two-pass (§27.8)
│
└── Verificación final (§27.10)
```

## 27.3 Árbol de exportación — TikTok

```
Exportar para TikTok
│
├── ¿El video ya es 1080x1920?
│   ├── SÍ → Continuar
│   └── NO → Escalar
│
├── ¿La duración es razonable? (idealmente 15-60s para máximo alcance)
│   ├── <= 60s → Óptimo para el algoritmo
│   ├── 60-180s → Aceptable si el watch time se mantiene
│   └── > 180s → Considerar dividir, TikTok penaliza videos largos con baja retención
│
├── ¿El archivo pesará <= 287 MB? (límite móvil)
│   ├── SÍ → Exportar con calidad alta (CRF 18)
│   └── NO → Exportar con CRF 22-24 o usar two-pass apuntando a 280 MB
│
├── Exportar con ffmpeg:
│   ffmpeg -i input.mp4 \
│     -c:v libx264 -preset slow -crf 20 \
│     -profile:v high -level 4.0 \
│     -pix_fmt yuv420p \
│     -vf "scale=1080:1920:force_original_aspect_ratio=decrease,\
│          pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a" \
│     -r 30 \
│     -c:a aac -b:a 128k -ar 44100 \
│     -movflags +faststart \
│     output_tiktok.mp4
│
└── Verificación final (§27.10)
```

## 27.4 Árbol de exportación — YouTube Shorts

```
Exportar para YouTube Shorts
│
├── ¿El video ya es 1080x1920?
│   ├── SÍ → Continuar
│   └── NO → Escalar (YouTube acepta hasta 4K vertical)
│
├── ¿La duración es <= 60 segundos?
│   ├── SÍ → Continuar
│   └── NO → YouTube Shorts requiere <= 60s ESTRICTO
│       → SI es 61-90s: cortar o acelerar secciones no esenciales
│       → SI es > 90s: replantear como YouTube largo (16:9)
│
├── Exportar con ffmpeg (calidad más alta porque YouTube re-comprime menos):
│   ffmpeg -i input.mp4 \
│     -c:v libx264 -preset slow -crf 17 \
│     -profile:v high -level 4.2 \
│     -pix_fmt yuv420p \
│     -vf "scale=1080:1920:force_original_aspect_ratio=decrease,\
│          pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a" \
│     -r 30 \
│     -c:a aac -b:a 192k -ar 48000 \
│     -movflags +faststart \
│     output_yt_shorts.mp4
│
│   NOTA: YouTube acepta audio a 48kHz (a diferencia de IG/TT que usan 44.1kHz)
│   NOTA: Bitrate de audio más alto (192k) porque YouTube no lo re-comprime tanto
│
└── Verificación final (§27.10)
```

## 27.5 Árbol de exportación — YouTube largo (16:9)

```
Exportar para YouTube largo
│
├── ¿El video es 1920x1080 o superior?
│   ├── SÍ → Continuar
│   └── NO → Escalar a mínimo 1920x1080
│       → SI el material fuente es 720p: escalar con lanczos
│          ffmpeg -i input.mp4 -vf "scale=1920:1080:flags=lanczos" ...
│
├── ¿Se busca calidad máxima o tamaño reducido?
│   ├── Calidad máxima → CRF 16, preset veryslow
│   │   → Subida más lenta pero YouTube re-procesará con mejor base
│   └── Balance → CRF 18, preset slow
│       → Buen compromiso para la mayoría de videos
│
├── ¿El video tiene más de 30 minutos?
│   ├── SÍ → Considerar H.265 para reducir tamaño
│   │   ffmpeg -i input.mp4 \
│   │     -c:v libx265 -preset slow -crf 20 \
│   │     -tag:v hvc1 \
│   │     -pix_fmt yuv420p \
│   │     -c:a aac -b:a 256k -ar 48000 \
│   │     -movflags +faststart \
│   │     output_yt_long_h265.mp4
│   └── NO → Usar H.264 (más compatible)
│       ffmpeg -i input.mp4 \
│         -c:v libx264 -preset slow -crf 18 \
│         -profile:v high -level 4.2 \
│         -pix_fmt yuv420p \
│         -c:a aac -b:a 256k -ar 48000 \
│         -movflags +faststart \
│         output_yt_long.mp4
│
└── Verificación final (§27.10)
```

## 27.6 Árbol de exportación — WhatsApp Status

```
Exportar para WhatsApp Status
│
├── RESTRICCIÓN CRÍTICA: máximo 16 MB y 30 segundos
│
├── ¿La duración es <= 30 segundos?
│   ├── SÍ → Continuar
│   └── NO → Cortar a 30s
│       → Usar la parte más impactante del reel
│       → Agregar texto "Video completo en IG → @allimport.cba"
│
├── Calcular bitrate necesario para caber en 16 MB:
│   Bitrate total = (16 MB * 8 * 1024) / duración_en_segundos kbps
│   Para 30s: (16 * 8 * 1024) / 30 = ~4370 kbps total
│   → Video: ~4100 kbps
│   → Audio: ~64 kbps (mono)
│
├── Exportar con two-pass para control exacto de tamaño:
│
│   # Pass 1
│   ffmpeg -y -i input.mp4 \
│     -c:v libx264 -preset slow -b:v 4100k -pass 1 \
│     -vf "scale=720:1280" \
│     -r 30 -an \
│     -f null /dev/null
│
│   # Pass 2
│   ffmpeg -i input.mp4 \
│     -c:v libx264 -preset slow -b:v 4100k -pass 2 \
│     -vf "scale=720:1280" \
│     -r 30 \
│     -c:a aac -b:a 64k -ac 1 -ar 44100 \
│     -movflags +faststart \
│     output_whatsapp.mp4
│
│   NOTA: Resolución reducida a 720x1280 para ahorrar bits
│   NOTA: Audio mono (-ac 1) para ahorrar bits
│
├── ¿El archivo pesa <= 16 MB?
│   ├── SÍ → Listo
│   └── NO → Reducir bitrate de video a 3000k y re-exportar
│       → SI sigue excediendo: reducir resolución a 540x960
│
└── Verificación: abrir en WhatsApp y verificar que se ve aceptable
    → WhatsApp re-comprime, así que algo de pérdida es inevitable
```

## 27.7 Valores CRF y cuándo usar cada uno

CRF (Constant Rate Factor) controla la calidad: número más bajo = más calidad = archivo más grande.

| CRF | Calidad percibida    | Uso recomendado                                           | Tamaño relativo |
|:----|:---------------------|:----------------------------------------------------------|:----------------|
| 15  | Visualmente lossless | Master/archivo, YouTube 4K                                | 200%            |
| 17  | Excelente            | YouTube Shorts, YouTube largo premium                     | 150%            |
| 18  | Muy buena            | Instagram Reels, TikTok, YouTube Shorts estándar          | 130%            |
| 20  | Buena                | TikTok, Facebook Reels, LinkedIn                          | 100% (base)     |
| 22  | Aceptable            | Previews, versiones de prueba                             | 75%             |
| 24  | Aceptable-baja       | WhatsApp cuando el tamaño es problema                     | 55%             |
| 28  | Baja                 | WhatsApp Status (último recurso para caber en 16 MB)      | 35%             |
| 32  | Muy baja             | Solo para previews internos, NUNCA para publicación final  | 20%             |

### 27.7.1 Árbol de decisión: qué CRF usar

```
¿Cuál es la prioridad?
│
├── CALIDAD MÁXIMA (no importa el tamaño)
│   ├── YouTube → CRF 15-17
│   ├── Portfolio/Archivo → CRF 15
│   └── Instagram/TikTok → CRF 18 (más bajo no tiene sentido, la plataforma re-comprime)
│
├── BALANCE (buena calidad, tamaño razonable)
│   ├── Instagram Reels → CRF 18-20
│   ├── TikTok → CRF 18-20
│   ├── YouTube Shorts → CRF 17-19
│   └── Facebook → CRF 20
│
├── TAMAÑO MÍNIMO (hay restricción de peso)
│   ├── WhatsApp Status → CRF 28-32 + resolución reducida
│   ├── Email/adjunto → CRF 24-28
│   └── Preview para aprobación → CRF 24-26
│
└── EN CASO DE DUDA → CRF 18 (funciona bien para todo excepto WhatsApp)
```

## 27.8 Two-pass encoding (control exacto de tamaño)

Usar two-pass cuando hay un límite estricto de tamaño de archivo (WhatsApp Status, adjuntos de email, etc.).

### 27.8.1 Fórmula de cálculo de bitrate

```
Bitrate de video (kbps) = [(Tamaño máximo en MB) * 8 * 1024 / (Duración en segundos)] - Bitrate de audio (kbps)

Ejemplo para WhatsApp Status (16 MB, 30 segundos, audio 64 kbps):
  = [(16 * 8 * 1024) / 30] - 64
  = 4369 - 64
  = 4305 kbps de video

Ejemplo para adjunto de email (25 MB, 60 segundos, audio 128 kbps):
  = [(25 * 8 * 1024) / 60] - 128
  = 3413 - 128
  = 3285 kbps de video
```

### 27.8.2 Comando two-pass completo

```bash
# Variables (ajustar según necesidad)
INPUT="input.mp4"
OUTPUT="output_2pass.mp4"
VIDEO_BITRATE="4300k"
AUDIO_BITRATE="64k"
RESOLUTION="720:1280"

# Pass 1 (análisis)
ffmpeg -y -i "$INPUT" \
  -c:v libx264 -preset slow -b:v "$VIDEO_BITRATE" -pass 1 \
  -vf "scale=$RESOLUTION" \
  -r 30 -pix_fmt yuv420p -an \
  -f null /dev/null

# Pass 2 (encoding final)
ffmpeg -i "$INPUT" \
  -c:v libx264 -preset slow -b:v "$VIDEO_BITRATE" -pass 2 \
  -vf "scale=$RESOLUTION" \
  -r 30 -pix_fmt yuv420p \
  -c:a aac -b:a "$AUDIO_BITRATE" -ar 44100 \
  -movflags +faststart \
  "$OUTPUT"

# Limpiar archivos temporales de two-pass
rm -f ffmpeg2pass-0.log ffmpeg2pass-0.log.mbtree
```

## 27.9 Normalización de audio a -14 LUFS

```bash
# Paso 1: Medir loudness actual
ffmpeg -i input.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | tail -12

# Paso 2: Aplicar normalización con los valores medidos
# (reemplazar measured_* con los valores del paso 1)
ffmpeg -i input.mp4 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-23.5:measured_TP=-4.2:measured_LRA=7.1:measured_thresh=-34.2:offset=-0.5:linear=true" \
  -c:v copy \
  output_normalized.mp4

# Comando de un solo paso (menos preciso pero más rápido):
ffmpeg -i input.mp4 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:v copy \
  output_normalized_quick.mp4
```

## 27.10 Checklist de pre-subida (verificación exhaustiva)

### Verificación técnica
- [ ] Resolución correcta para la plataforma (ffprobe -v error -select_streams v:0 -show_entries stream=width,height)
- [ ] FPS correcto (ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate)
- [ ] Codec de video es H.264 (ffprobe -v error -select_streams v:0 -show_entries stream=codec_name)
- [ ] Perfil de video es High (ffprobe -v error -select_streams v:0 -show_entries stream=profile)
- [ ] Pixel format es yuv420p (ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt)
- [ ] Codec de audio es AAC (ffprobe -v error -select_streams a:0 -show_entries stream=codec_name)
- [ ] Sample rate de audio correcto (44100 o 48000 Hz)
- [ ] Duración dentro del límite de la plataforma
- [ ] Tamaño de archivo dentro del límite de la plataforma
- [ ] Flag faststart presente (-movflags +faststart) → verificar con: `ffprobe -v trace input.mp4 2>&1 | grep moov`

### Verificación de contenido
- [ ] El video empieza inmediatamente (sin frames negros al inicio)
- [ ] El video termina limpio (sin frames negros al final)
- [ ] El audio comienza sin pop/click
- [ ] El audio termina sin corte abrupto (fade out de al menos 0.1s)
- [ ] Los subtítulos son legibles en pantalla de celular (5.5-6.7 pulgadas)
- [ ] Los colores de marca son correctos (NAVY #0a0f1a, CYAN #00d4d4, WHITE #f8fafa)
- [ ] El logo de @allimport.cba está presente (si corresponde) y es legible
- [ ] Los precios mostrados son correctos y actuales
- [ ] No hay errores tipográficos en el texto visible
- [ ] Las safe zones están respetadas (ver Capítulo 25)

### Verificación de calidad
- [ ] No hay artefactos de compresión visibles (macroblock, banding)
- [ ] No hay glitches de audio (pops, clicks, distorsión)
- [ ] El audio está normalizado a -14 LUFS (±1 dB)
- [ ] La imagen no está pixelada ni borrosa
- [ ] El color grading es consistente en todo el video
- [ ] No hay frames duplicados o congelados no intencionales

---

# Capítulo 28: Audio avanzado — mezcla y masterización

## 28.1 Flujo de trabajo completo de audio

```
Material grabado (voz, ambiente)
        │
        ▼
┌──────────────────┐
│ 1. LIMPIEZA      │ ← Noise reduction, de-essing, noise gate
│    (restaurar)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. PROCESAMIENTO │ ← EQ, compresión, de-essing
│    (mejorar)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. CAPAS         │ ← Agregar música, SFX, ambiente
│    (mezclar)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. BALANCE       │ ← Nivelar volúmenes entre capas
│    (mezcla)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. DUCKING       │ ← Bajar música cuando habla la voz
│    (sidechain)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 6. NORMALIZACIÓN │ ← Llevar a -14 LUFS para redes sociales
│    (masterizar)  │
└────────┬─────────┘
         │
         ▼
    Audio final
```

## 28.2 Jerarquía de capas de audio

| Prioridad | Capa             | Nivel relativo | Nivel absoluto (dBFS) | Descripción                              |
|:----------|:-----------------|:---------------|:----------------------|:-----------------------------------------|
| 1 (máx)   | Voz principal    | 0 dB (ref)     | -6 a -3 dBFS         | La voz del speaker/narrador              |
| 2         | SFX de impacto   | -6 dB          | -12 a -9 dBFS        | Whoosh, boom, transiciones               |
| 3         | SFX ambientales  | -12 dB         | -18 a -15 dBFS       | Clicks, pops sutiles, notificaciones     |
| 4         | Música de fondo  | -18 a -24 dB   | -24 a -18 dBFS       | Beat, melodía (se baja cuando habla voz) |
| 5 (mín)   | Room tone        | -30 dB         | -36 a -30 dBFS       | Ambiente de fondo (casi inaudible)       |

### 28.2.1 Regla fundamental

> La voz SIEMPRE se escucha claramente. Si hay que elegir entre que se escuche la música o la voz, la voz gana. En contenido de producto de All Import, si la voz dice un precio, el precio tiene que ser 100% inteligible.

## 28.3 Procesamiento de voz — cadena completa con ffmpeg

### 28.3.1 Noise gate (eliminar ruido en silencios)

```bash
# Noise gate: cuando la señal cae debajo del umbral, se silencia
ffmpeg -i input_voz.wav \
  -af "agate=threshold=0.01:ratio=8:attack=10:release=200" \
  output_gated.wav

# Parámetros explicados:
# threshold=0.01  → umbral de activación (valores más bajos = gate más sensible)
# ratio=8         → cuánto se reduce cuando está bajo el umbral (8:1 es agresivo)
# attack=10       → milisegundos para abrir el gate cuando llega señal
# release=200     → milisegundos para cerrar el gate cuando la señal cae
```

### 28.3.2 EQ para voz en parlantes de celular

```bash
# EQ optimizado para reproducción en celulares
ffmpeg -i input_voz.wav \
  -af "highpass=f=80,\
       equalizer=f=200:t=q:w=2:g=-3,\
       equalizer=f=800:t=q:w=1.5:g=2,\
       equalizer=f=2500:t=q:w=2:g=4,\
       equalizer=f=4000:t=q:w=1.5:g=3,\
       equalizer=f=8000:t=q:w=2:g=-2,\
       lowpass=f=16000" \
  output_eq.wav

# Explicación de cada banda:
# highpass=f=80         → Corta todo debajo de 80 Hz (rumble, viento, golpes)
# 200 Hz, -3 dB        → Reduce "muddiness" (voz empastada, baja calidad de mic)
# 800 Hz, +2 dB        → Refuerza cuerpo de la voz (calidez)
# 2500 Hz, +4 dB       → Refuerza presencia (la voz "sale" del mix)
# 4000 Hz, +3 dB       → Mejora claridad/articulación
# 8000 Hz, -2 dB       → Reduce sibilancia/dureza en frecuencias altas
# lowpass=f=16000       → Corta ultrasonidos inútiles
```

### 28.3.3 Compresor de voz

```bash
# Compresión para nivelar dinámicas (partes fuertes y suaves de la voz)
ffmpeg -i input_voz.wav \
  -af "acompressor=threshold=-20dB:ratio=4:attack=5:release=100:makeup=6dB:knee=6dB" \
  output_compressed.wav

# Parámetros:
# threshold=-20dB  → Comprimir cuando la señal supera -20 dB
# ratio=4          → Reducir 4:1 por encima del threshold
# attack=5         → 5ms para reaccionar (rápido, captura picos)
# release=100      → 100ms para soltar (natural, no bombea)
# makeup=6dB       → Ganancia de compensación (sube el nivel general)
# knee=6dB         → Transición suave alrededor del threshold
```

### 28.3.4 De-esser (reducir sibilantes S, T, CH)

```bash
# De-esser usando bandreject dinámico
ffmpeg -i input_voz.wav \
  -af "firequalizer=gain_entry='entry(0,0);entry(4000,0);entry(5500,-8);entry(8000,-8);entry(9000,0);entry(20000,0)':multi=on" \
  output_deessed.wav

# Alternativa más simple con highshelf:
ffmpeg -i input_voz.wav \
  -af "treble=gain=-4:frequency=6000:width_type=s:width=1" \
  output_deessed_simple.wav
```

### 28.3.5 Cadena completa de procesamiento de voz

```bash
# Cadena completa: gate → EQ → compresor → de-esser → limiter
ffmpeg -i voz_cruda.wav \
  -af "\
    agate=threshold=0.01:ratio=8:attack=10:release=200,\
    highpass=f=80,\
    equalizer=f=200:t=q:w=2:g=-3,\
    equalizer=f=2500:t=q:w=2:g=4,\
    equalizer=f=4000:t=q:w=1.5:g=3,\
    acompressor=threshold=-20dB:ratio=4:attack=5:release=100:makeup=6dB:knee=6dB,\
    treble=gain=-4:frequency=6000:width_type=s:width=1,\
    alimiter=limit=0.95:attack=1:release=50\
  " \
  voz_procesada.wav
```

## 28.4 Normalización loudnorm (-14 LUFS)

### 28.4.1 Por qué -14 LUFS

```
Plataformas y sus targets de loudness:
│
├── YouTube        → -14 LUFS (normaliza automáticamente)
├── Instagram      → -14 LUFS (normaliza agresivamente si es más fuerte)
├── TikTok         → -14 LUFS (referencia)
├── Spotify        → -14 LUFS
├── Apple Music    → -16 LUFS
├── Broadcast TV   → -24 LUFS (EBU R128)
│
└── CONCLUSIÓN: -14 LUFS es el estándar de facto para redes sociales
    → SI exportás a -14 LUFS, no hay re-normalización agresiva por la plataforma
    → SI exportás más fuerte (ej. -8 LUFS), la plataforma lo baja y suena peor
    → SI exportás más bajo (ej. -20 LUFS), la plataforma lo sube y amplifica ruido
```

### 28.4.2 Flujo de normalización de dos pasos

```bash
# PASO 1: Medir loudness actual
ffmpeg -i input.mp4 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json" \
  -f null - 2>&1 | grep -A 12 "input_"

# La salida incluye valores como:
# "input_i" : "-23.54"          → loudness integrado actual
# "input_tp" : "-4.18"          → true peak actual
# "input_lra" : "7.13"          → rango de loudness actual
# "input_thresh" : "-34.21"     → umbral de medición
# "target_offset" : "-0.47"     → offset para alcanzar el target

# PASO 2: Aplicar normalización con valores medidos (más preciso)
ffmpeg -i input.mp4 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:\
       measured_I=-23.54:\
       measured_TP=-4.18:\
       measured_LRA=7.13:\
       measured_thresh=-34.21:\
       offset=-0.47:\
       linear=true" \
  -c:v copy \
  output_normalized.mp4

# NOTA: linear=true mantiene las relaciones dinámicas originales
# (no aplica compresión extra, solo cambia el nivel general)
```

## 28.5 Ducking / sidechain: bajar música cuando habla la voz

### 28.5.1 Concepto

```
Sin ducking:
  VOZ:   ███░░░████░░░███████░░░░░███
  MÚSICA: ██████████████████████████████  (siempre al mismo nivel)
  → La voz compite con la música. El espectador no entiende el precio.

Con ducking:
  VOZ:   ███░░░████░░░███████░░░░░███
  MÚSICA: ░██████░███████░░░░░██████░██  (baja cuando hay voz)
  → La voz se escucha clara. La música llena los silencios.
```

### 28.5.2 Implementación con ffmpeg sidechaincompress

```bash
# Ducking: la voz controla el volumen de la música
ffmpeg -i voz.wav -i musica.wav -filter_complex \
  "[1:a]asplit=2[sc][music];\
   [sc]aformat=sample_fmts=fltp[scf];\
   [music][scf]sidechaincompress=threshold=0.02:ratio=6:attack=50:release=400:level_sc=1[ducked];\
   [0:a][ducked]amix=inputs=2:weights=1 0.3:duration=first" \
  -c:v copy \
  output_ducked.mp4

# Parámetros de sidechaincompress:
# threshold=0.02    → La música se reduce cuando la voz supera este nivel
# ratio=6           → La música se reduce 6:1 (agresivo pero natural)
# attack=50         → 50ms para empezar a reducir (suave, no abrupto)
# release=400       → 400ms para que la música vuelva (natural)
# level_sc=1        → Nivel de la señal sidechain (1 = sin cambio)
#
# amix weights: 1 para voz, 0.3 para música (la voz domina)
```

### 28.5.3 Ducking simplificado (sin sidechain, por volumen fijo)

```bash
# Alternativa más simple: bajar la música a un nivel fijo
# Útil cuando no hay voz compleja (ej. solo texto en pantalla con música)
ffmpeg -i video_sin_audio.mp4 -i musica.mp3 \
  -filter_complex \
  "[1:a]volume=0.15[quiet_music]" \
  -map 0:v -map "[quiet_music]" \
  -shortest \
  -c:v copy -c:a aac -b:a 128k \
  output_con_musica.mp4

# volume=0.15 → la música suena al 15% (bueno para fondo suave)
# volume=0.25 → la música suena al 25% (fondo moderado)
# volume=0.4  → la música suena al 40% (fondo notable, solo sin voz)
```

## 28.6 Estéreo vs mono por plataforma

| Plataforma       | Audio recomendado | Razón                                                    |
|:-----------------|:------------------|:---------------------------------------------------------|
| Instagram Reels  | Estéreo            | IG preserva estéreo, mejora experiencia con auriculares  |
| TikTok           | Estéreo            | TikTok preserva estéreo                                  |
| YouTube Shorts   | Estéreo            | YouTube preserva estéreo siempre                         |
| YouTube largo    | Estéreo            | YouTube soporta hasta 5.1 surround                       |
| WhatsApp Status  | Mono               | Ahorra bitrate (crítico con límite de 16 MB)             |
| Instagram Stories| Estéreo            | IG preserva estéreo                                      |

```bash
# Convertir a mono (para WhatsApp):
ffmpeg -i input.mp4 -ac 1 -c:v copy output_mono.mp4

# Verificar canales de audio:
ffprobe -v error -select_streams a:0 -show_entries stream=channels -of csv=p=0 input.mp4
# Salida: 2 (estéreo) o 1 (mono)
```

## 28.7 Sincronización de audio

### 28.7.1 Detectar desfase de audio-video

```bash
# Ver información de streams para detectar offsets
ffprobe -v error -show_entries stream=codec_type,start_time -of csv=p=0 input.mp4

# Si hay desfase, corregir con -itsoffset:
# Audio adelantado 0.5s respecto al video → retrasar audio
ffmpeg -i input.mp4 -itsoffset 0.5 -i input.mp4 \
  -map 0:v -map 1:a \
  -c copy \
  output_synced.mp4

# Audio retrasado 0.3s respecto al video → adelantar audio
ffmpeg -i input.mp4 -itsoffset -0.3 -i input.mp4 \
  -map 0:v -map 1:a \
  -c copy \
  output_synced.mp4
```

## 28.8 Room tone y ambiente

```bash
# Generar room tone (ruido suave de fondo para rellenar silencios)
ffmpeg -f lavfi -i "anoisesrc=d=10:c=pink:r=44100:a=0.003" \
  room_tone.wav

# Parámetros:
# d=10       → duración 10 segundos (se puede loopear después)
# c=pink     → ruido rosa (más natural que blanco para ambientes)
# r=44100    → sample rate
# a=0.003    → amplitud muy baja (casi inaudible)

# Agregar room tone a un video (debajo de todo lo demás):
ffmpeg -i video.mp4 -i room_tone.wav -filter_complex \
  "[1:a]aloop=loop=-1:size=44100*10[rt];\
   [0:a][rt]amix=inputs=2:weights=1 0.05:duration=first" \
  -c:v copy \
  output_con_room.mp4
```

## 28.9 Árbol de decisión: qué efecto de audio aplicar

```
¿Qué problema tiene el audio?
│
├── Se escucha ruido de fondo (ventilador, calle, zumbido)
│   ├── Ruido constante (ventilador, AC) → Noise gate + EQ highpass
│   ├── Ruido intermitente (autos, perros) → Noise gate agresivo
│   └── Zumbido eléctrico (50/60 Hz) → Notch filter:
│       ffmpeg -i in.wav -af "equalizer=f=50:t=q:w=5:g=-30,equalizer=f=100:t=q:w=5:g=-20" out.wav
│
├── La voz suena opaca / sin presencia
│   → EQ: boost en 2.5-4 kHz (+3 a +5 dB)
│
├── La voz suena estridente / áspera
│   → De-esser + EQ: cut en 5-8 kHz (-3 a -6 dB)
│
├── Partes de la voz muy fuertes y otras muy bajas
│   → Compresor (threshold -20dB, ratio 3-4:1)
│
├── La música tapa la voz
│   → Ducking / sidechain (§28.5)
│
├── El audio suena bajo / no tiene punch
│   → Normalización a -14 LUFS (§28.4)
│
├── Hay pops/explosivas (P, B) en la voz
│   → Highpass a 100 Hz + de-plosive:
│       ffmpeg -i in.wav -af "highpass=f=100:poles=2" out.wav
│
├── Los silencios no son silenciosos (se escucha ruido)
│   → Noise gate (§28.3.1)
│
└── La voz suena "hueca" / con eco
    → No hay solución perfecta con ffmpeg
    → Prevención: grabar más cerca del micrófono
    → Mitigación: gate agresivo + EQ de presencia
```

## 28.10 Checklist de QA de audio

- [ ] El audio se escucha claramente en parlantes de celular (no solo en auriculares)
- [ ] La voz se entiende sin esfuerzo en TODOS los segmentos
- [ ] No hay pops, clicks o distorsión en ningún punto
- [ ] No hay ruido de fondo audible en las pausas del hablante
- [ ] La música no tapa la voz en ningún momento
- [ ] El volumen es consistente de principio a fin (sin saltos)
- [ ] El audio comienza sin click/pop (fade in de al menos 10ms si es necesario)
- [ ] El audio termina sin corte abrupto (fade out de 50-200ms)
- [ ] La normalización está entre -15 y -13 LUFS (target -14 LUFS)
- [ ] El true peak no excede -1.0 dBFS (margen contra clipping)
- [ ] Los SFX no son más fuertes que la voz
- [ ] La música de fondo es apropiada para el tono del contenido
- [ ] SI hay precio mencionado verbalmente: se escucha 100% claro
- [ ] SI es para WhatsApp: el audio es mono y suena aceptable
- [ ] Verificación en al menos 2 dispositivos (celular + auriculares)
- [ ] SI hay cambio de escena: no hay discontinuidad de audio entre escenas

---

# Capítulo 29: Motion Graphics y animación de texto

## 29.1 Patrones de animación de texto

### 29.1.1 Catálogo de animaciones disponibles

| Animación     | Descripción                             | Uso ideal                        | Complejidad |
|:--------------|:----------------------------------------|:---------------------------------|:------------|
| Fade In       | El texto aparece gradualmente (opacidad)| Subtítulos, textos informativos  | Baja        |
| Slide In      | El texto se desliza desde un borde      | Títulos, nombres, lower thirds   | Baja        |
| Bounce        | El texto aparece con rebote elástico    | Precios, datos impactantes       | Media       |
| Typewriter    | Las letras aparecen una a una           | Mensajes de WhatsApp simulados   | Media       |
| Pop / Scale   | El texto escala de 0% a 100% (con ease) | CTAs, emojis, emphasis           | Baja        |
| Glitch        | El texto aparece con efecto de distorsión| Contenido tech, gaming          | Alta        |
| Wipe          | El texto se revela con un barrido       | Títulos cinematográficos         | Media       |
| Counter       | Números que suben/bajan hasta un valor  | Precios, stats, contadores       | Media       |

### 29.1.2 Árbol de decisión: qué animación usar

```
¿Qué tipo de contenido estás animando?
│
├── Título principal / Hook del video
│   ├── ¿Es contenido de marca (@allimport.cba)?
│   │   └── SÍ → Slide In desde la izquierda + fade, con pill CYAN
│   └── ¿Es contenido personal (@_agus_moreno_)?
│       └── SÍ → Pop/Scale sutil, texto plano sin pill
│
├── Precio de producto
│   ├── ¿Es un precio promocional / oferta?
│   │   └── SÍ → Counter (anima de $0 al precio) + bounce al llegar
│   └── ¿Es precio normal?
│       └── SÍ → Pop/Scale en pill CYAN
│
├── Subtítulo / Caption informativo
│   └── Fade In simple (no distraer del contenido principal)
│
├── CTA (Call to Action)
│   ├── "Seguinos en @allimport.cba" → Slide In desde abajo + bounce
│   ├── "Link en bio" → Pop/Scale + pulse (escala rítmica sutil)
│   └── "Escribinos por WhatsApp" → Slide In + icono de WhatsApp animado
│
├── Dato / Estadística
│   └── Counter (números que suben) + enfoque con zoom de cámara
│
├── Nombre / Lower Third
│   └── Slide In desde la izquierda + línea CYAN que aparece primero
│
└── Texto de transición entre secciones
    └── Fade In + Fade Out (duración corta, 0.5s cada uno)
```

## 29.2 Animaciones con ffmpeg drawtext y enable

### 29.2.1 Fade In (opacidad gradual)

```bash
# Texto que aparece gradualmente entre t=1s y t=2s (1 segundo de fade)
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='NUEVO DROP':fontsize=64:fontcolor=#f8fafa@%{eif\\:if(lt(t\\,1)\\,0\\,if(lt(t\\,2)\\,(t-1)\\,1))\\:d\\:2}:\
  x=(w-tw)/2:y=400:\
  enable='between(t,1,5)'" \
  -codec:a copy output_fadein.mp4

# Explicación del alpha dinámico:
# t < 1     → alpha = 0 (invisible)
# 1 <= t < 2 → alpha sube de 0 a 1 linealmente (fade in)
# t >= 2     → alpha = 1 (visible completo)
```

### 29.2.2 Slide In desde la izquierda

```bash
# Texto que se desliza desde fuera de pantalla (izquierda) entre t=0.5 y t=1.5s
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='OFERTA':fontsize=72:fontcolor=#f8fafa:\
  x='if(lt(t\\,0.5)\\,-tw\\,if(lt(t\\,1.5)\\,-tw+(tw+80)*(t-0.5)\\,80))':\
  y=400:\
  enable='between(t,0.5,5)'" \
  -codec:a copy output_slidein.mp4

# Explicación de x:
# t < 0.5     → x = -tw (fuera de pantalla a la izquierda)
# 0.5-1.5     → x se mueve linealmente de -tw a 80 (posición final)
# t >= 1.5     → x = 80 (posición final, alineado izquierda)
```

### 29.2.3 Pop / Scale (zoom de 0 a 100%)

```bash
# Simular pop/scale requiere cambiar fontsize dinámicamente
# Texto que hace "pop" entre t=2s y t=2.5s
ffmpeg -i input.mp4 -vf \
  "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='\$15.000':fontcolor=#0a0f1a:\
  fontsize='if(lt(t\\,2)\\,1\\,if(lt(t\\,2.3)\\,72*(t-2)/0.3\\,if(lt(t\\,2.5)\\,72+8*sin((t-2.3)*10)\\,72)))':\
  box=1:boxcolor=#00d4d4@0.95:boxborderw=16:\
  x='(w-tw)/2':y=500:\
  enable='between(t,2,6)'" \
  -codec:a copy output_pop.mp4

# Desglose del fontsize:
# t < 2       → fontsize = 1 (prácticamente invisible)
# 2.0-2.3     → fontsize sube de 0 a 72 (escala rápida)
# 2.3-2.5     → fontsize oscila alrededor de 72 (efecto bounce/rebote)
# t >= 2.5     → fontsize = 72 (estable)
```

### 29.2.4 Texto temporizado (aparece y desaparece)

```bash
# Secuencia de textos: cada uno aparece 2 segundos
ffmpeg -i input.mp4 -vf "\
  drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='PRIMER TEXTO':fontsize=56:fontcolor=#f8fafa:\
  x=(w-tw)/2:y=400:\
  enable='between(t,0,2)',\
  \
  drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='SEGUNDO TEXTO':fontsize=56:fontcolor=#00d4d4:\
  x=(w-tw)/2:y=400:\
  enable='between(t,2,4)',\
  \
  drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='TERCER TEXTO':fontsize=56:fontcolor=#f8fafa:\
  x=(w-tw)/2:y=400:\
  enable='between(t,4,6)'" \
  -codec:a copy output_secuencia.mp4
```

## 29.3 Animaciones ASS (Advanced SubStation Alpha) para motion complejo

### 29.3.1 Cuándo usar ASS en vez de drawtext

```
¿Qué necesitás?
│
├── Texto simple (una línea, posición fija, fade básico)
│   └── Usar drawtext de ffmpeg (más simple, menos overhead)
│
├── Texto con movimiento complejo (path curvo, rotación, scale + fade combinados)
│   └── Usar ASS subtitles (más potente, requiere archivo .ass)
│
├── Texto karaoke / kinetic captions (ya cubierto en Capítulo 19)
│   └── Usar ASS subtitles
│
├── Múltiples textos con timings complejos y animaciones diferentes
│   └── Usar ASS subtitles (un archivo controla todo)
│
└── Lower thirds con gráficos (línea + texto + animación)
    └── Usar ASS subtitles o overlay de imagen con ffmpeg
```

### 29.3.2 Estructura de un archivo ASS con animaciones

```ass
[Script Info]
Title: All Import Motion Graphics
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Titulo,Montserrat Alternates,72,&H00FAFAF8,&H00FAFAF8,&H001A0F0A,&H801A0F0A,-1,0,0,0,100,100,0,0,1,3,2,5,80,80,400,1
Style: Precio,Montserrat Alternates,64,&H001A0F0A,&H001A0F0A,&H00D4D400,&H00D4D400,-1,0,0,0,100,100,0,0,3,0,0,5,80,80,500,1
Style: CTA,Montserrat Alternates,48,&H00FAFAF8,&H00FAFAF8,&H001A0F0A,&H801A0F0A,-1,0,0,0,100,100,0,0,1,2,1,2,80,80,100,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
; Título con slide in desde izquierda + fade
Dialogue: 0,0:00:01.00,0:00:05.00,Titulo,,0,0,0,,{\move(-500,400,80,400,0,500)\fad(0,500)}NUEVO DROP
; Precio con scale pop + bounce
Dialogue: 1,0:00:02.00,0:00:06.00,Precio,,0,0,0,,{\an5\pos(540,550)\fscx0\fscy0\t(0,300,\fscx110\fscy110)\t(300,500,\fscx100\fscy100)}$15.000
; CTA con fade in desde abajo
Dialogue: 2,0:00:04.00,0:00:08.00,CTA,,0,0,0,,{\move(80,1600,80,1450,0,400)\fad(300,500)}Seguinos @allimport.cba
```

```bash
# Renderizar el archivo ASS sobre el video
ffmpeg -i input.mp4 -vf \
  "ass=motion_graphics.ass:fontsdir='allimport/historias/fonts/'" \
  -c:a copy output_con_motion.mp4
```

## 29.4 Lower thirds (tercios inferiores) con estilo de marca

### 29.4.1 Diseño de lower third para @allimport.cba

```
   ┌─────────────────────────────────────────────┐
   │  ┌──────────┐                               │
   │  │ LÍNEA    │  Agustín Moreno               │  ← Nombre (Montserrat Bold)
   │  │ CYAN     │  Fundador · All Import         │  ← Cargo (Montserrat Regular)
   │  │ (4px)    │                               │
   │  └──────────┘                               │
   └─────────────────────────────────────────────┘
        ↑                                    
   Acento vertical          Fondo: NAVY #0a0f1a @ 80%
   CYAN #00d4d4             Texto: WHITE #f8fafa
```

### 29.4.2 Implementación con ffmpeg

```bash
# Lower third con línea de acento cyan
ffmpeg -i input.mp4 -filter_complex "\
  color=c=#0a0f1a@0.8:s=500x80:d=4[bg];\
  color=c=#00d4d4:s=4x80:d=4[accent];\
  [bg][accent]overlay=0:0[bar];\
  [0:v][bar]overlay=60:1300:enable='between(t,2,6)'[v1];\
  [v1]drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='Agustín Moreno':fontsize=32:fontcolor=#f8fafa:\
  x=74:y=1310:enable='between(t,2,6)',\
  drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Regular.ttf':\
  text='Fundador · All Import':fontsize=24:fontcolor=#f8fafa@0.7:\
  x=74:y=1348:enable='between(t,2,6)'" \
  -c:a copy output_lowerthird.mp4
```

## 29.5 Animación de pill de precio (estilo All Import)

```bash
# Pill CYAN con precio que hace pop
# Paso 1: Crear el pill como overlay
ffmpeg -i input.mp4 -vf "\
  drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='  \$15.000  ':\
  fontsize='if(lt(t\\,3)\\,1\\,if(lt(t\\,3.2)\\,56*(t-3)/0.2\\,if(lt(t\\,3.4)\\,56+5*sin((t-3.2)*15)\\,56)))':\
  fontcolor=#0a0f1a:\
  box=1:boxcolor=#00d4d4@0.95:\
  boxborderw=14:\
  x='(w-tw)/2':\
  y=550:\
  enable='between(t,3,8)'" \
  -codec:a copy output_precio_pill.mp4

# Variante: pill con borde redondeado simulado (usando borderw más grueso)
# NOTA: ffmpeg drawtext no soporta border-radius nativamente
# Para bordes redondeados reales, usar overlay de imagen PNG con transparencia
```

## 29.6 Animación de counter (números que suben)

```bash
# Counter que sube de 0 a 15000 en 2 segundos (para precio)
# Se genera un video de texto animado frame by frame
ffmpeg -f lavfi -i "color=c=#0a0f1a@0:s=1080x1920:d=5:r=30" \
  -vf "\
  drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
  text='\$%{eif\\:if(lt(t\\,1)\\,0\\,if(lt(t\\,3)\\,15000*(t-1)/2\\,15000))\\:d}':\
  fontsize=72:fontcolor=#00d4d4:\
  x=(w-tw)/2:y=500:\
  enable='between(t,1,5)'" \
  -pix_fmt yuva420p counter_overlay.mov

# Luego superponer sobre el video:
ffmpeg -i input.mp4 -i counter_overlay.mov -filter_complex \
  "[0:v][1:v]overlay=0:0:shortest=1" \
  -c:a copy output_counter.mp4
```

## 29.7 Logo reveal (revelación de logo)

```bash
# Revelación del logo de All Import con fade + scale
# Requiere logo como PNG con transparencia: allimport_logo.png

ffmpeg -i input.mp4 -i allimport_logo.png -filter_complex "\
  [1:v]scale=200:200[logo_raw];\
  [logo_raw]format=rgba,\
  geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':\
  a='if(lt(T,2),0,if(lt(T,3),alpha(X,Y)*(T-2),alpha(X,Y)))'[logo_anim];\
  [0:v][logo_anim]overlay=60:180:enable='between(t,2,10)'" \
  -c:a copy output_logo_reveal.mp4

# Alternativa más simple: fade in del logo con enable + formato
ffmpeg -i input.mp4 -i allimport_logo.png -filter_complex "\
  [1:v]scale=150:-1,format=rgba[logo];\
  [0:v][logo]overlay=60:200:enable='between(t,1,10)':alpha=if(lt(t-1\\,1)\\,(t-1)\\,1)" \
  -c:a copy output_logo_simple.mp4
```

## 29.8 Barra de progreso / timeline indicator

```bash
# Barra de progreso que avanza con el video (parte inferior de la safe zone)
# La barra va de x=80 a x=1000 durante toda la duración del video

ffmpeg -i input.mp4 -vf "\
  drawbox=x=80:y=1380:w=920:h=6:color=#f8fafa@0.3:t=fill,\
  drawbox=x=80:y=1380:\
  w='920*t/$(ffprobe -v error -select_streams v -show_entries format=duration -of csv=p=0 input.mp4)':\
  h=6:color=#00d4d4:t=fill" \
  -codec:a copy output_progress.mp4

# Explicación:
# Primer drawbox: fondo gris tenue (la barra completa, como "track")
# Segundo drawbox: barra CYAN que crece con el tiempo (el progreso)
# w= avanza proporcionalmente al tiempo vs la duración total
```

## 29.9 Checklist de QA de motion graphics

- [ ] ¿Las animaciones usan la tipografía correcta (Montserrat Alternates)?
- [ ] ¿Los colores de las animaciones coinciden con la paleta de marca?
  - NAVY #0a0f1a para fondos
  - CYAN #00d4d4 para acentos y pills
  - WHITE #f8fafa para texto sobre fondo oscuro
  - RED #e22a2a solo para urgencia/oferta limitada
- [ ] ¿El texto animado permanece dentro de la safe zone durante TODA la animación?
- [ ] ¿Las animaciones de entrada no son más lentas que 0.5s? (atención corta del espectador)
- [ ] ¿Hay animación de salida (fade out) o el texto simplemente desaparece?
  - Para reels/shorts: desaparición abrupta está OK (ritmo rápido)
  - Para contenido más largo: fade out de 0.3s
- [ ] ¿Los textos se leen completos antes de desaparecer? (mínimo 1.5s visibles)
- [ ] ¿Las animaciones tienen SFX asociado? (whoosh para slide in, pop para scale)
- [ ] ¿El lower third no tapa contenido importante del video?
- [ ] ¿Los counters llegan al valor final y se estabilizan? (no quedan "contando")
- [ ] ¿El logo de @allimport.cba aparece con reveal? (no solo pegado estático)
- [ ] ¿La barra de progreso (si se usa) es sutil y no distrae?
- [ ] SI hay múltiples textos animados: ¿no se superponen?
- [ ] Verificación en celular: ¿las animaciones se perciben bien en pantalla chica?

---

# Capítulo 30: Thumbnails y portadas

## 30.1 Principios de diseño de thumbnails

### 30.1.1 La fórmula universal de thumbnail efectivo

```
THUMBNAIL EFECTIVO = CARA con EMOCIÓN + TEXTO GRANDE + CONTRASTE ALTO

Los 3 elementos:
┌──────────────────────────────────────────────┐
│                                              │
│     ┌──────────┐   ┌─────────────────────┐   │
│     │          │   │  TEXTO             │   │
│     │  CARA    │   │  GRANDE            │   │
│     │  con     │   │  2-5 PALABRAS      │   │
│     │  EMOCIÓN │   │  MÁXIMO            │   │
│     │          │   │                     │   │
│     └──────────┘   └─────────────────────┘   │
│                                              │
│     FONDO CON CONTRASTE ALTO                 │
│     (nunca gris medio, nunca pastel)         │
│                                              │
└──────────────────────────────────────────────┘
```

### 30.1.2 Reglas de contraste para lectura en tamaño pequeño

| Elemento         | Color recomendado                   | Contra qué fondo              | Ratio mínimo |
|:-----------------|:------------------------------------|:------------------------------|:--------------|
| Texto principal  | WHITE #f8fafa o GOLD #c9a227        | NAVY #0a0f1a                  | 7:1           |
| Texto de acento  | CYAN #00d4d4                        | NAVY #0a0f1a                  | 4.5:1         |
| Precio           | NAVY #0a0f1a (texto) en pill CYAN   | CYAN #00d4d4                  | 7:1           |
| Texto urgencia   | WHITE #f8fafa                       | RED #e22a2a                   | 4.5:1         |
| Borde de cara    | CYAN #00d4d4 o GOLD #c9a227        | Cualquier fondo               | N/A (decorativo)|

> La thumbnail se ve a 168x94 px en el feed de YouTube, a 161x161 px en IG Reels, y a ~110x196 px en TikTok. Si el texto no se lee a esos tamaños, no sirve.

## 30.2 Tipografía para thumbnails

| Propiedad        | Valor para @allimport.cba              | Valor para @_agus_moreno_             |
|:-----------------|:---------------------------------------|:--------------------------------------|
| Fuente           | Montserrat Alternates Bold              | Montserrat Alternates SemiBold        |
| Tamaño mínimo    | 72px (en canvas 1280x720)              | 64px                                   |
| Peso             | Bold (-1 / 700)                        | SemiBold / Bold                        |
| Color            | WHITE #f8fafa o CYAN #00d4d4           | WHITE #f8fafa                          |
| Outline/stroke   | NAVY #0a0f1a, 4px                      | Negro 50% opacidad, 3px               |
| Máx palabras     | 3-5 palabras                           | 2-4 palabras                           |
| Ubicación        | Centro o centro-derecha                 | Centro o izquierda                     |

## 30.3 Estrategia de A/B testing para thumbnails

```
Para CADA video importante de All Import:
│
├── Crear MÍNIMO 2 variantes de thumbnail:
│   ├── Variante A: Cara + texto (fórmula clásica)
│   └── Variante B: Producto solo + texto grande
│
├── ¿La plataforma soporta A/B nativo?
│   ├── YouTube → SÍ (Test & Compare en YouTube Studio)
│   │   → Subir ambas variantes, YouTube las rota automáticamente
│   │   → Esperar 2 semanas mínimo para datos significativos
│   │   → Elegir la ganadora basándose en CTR (Click-Through Rate)
│   │
│   ├── Instagram → NO nativo
│   │   → Publicar el mismo reel 2 veces (en horarios similares)
│   │     con portadas diferentes (medir alcance/engagement)
│   │   → O publicar una semana con estilo A, otra con estilo B
│   │     y comparar métricas
│   │
│   └── TikTok → NO nativo
│       → Misma estrategia que Instagram
│       → La portada de TikTok es un frame del video
│         (la thumbnail es menos controlable)
│
└── Registrar resultados en un archivo de tracking:
    | Video          | Var A (desc)     | Var B (desc)     | CTR A | CTR B | Ganadora |
    |:---------------|:-----------------|:-----------------|:------|:------|:---------|
    | Drop camisetas | Cara + texto     | Producto solo    | 8.2%  | 5.1%  | A        |
    | TWS review     | Close-up TWS     | Usando auricular | 6.7%  | 9.3%  | B        |
```

## 30.4 Extracción de mejores frames con ffmpeg

```bash
# Extraer frames clave (1 cada 2 segundos) para elegir el mejor
ffmpeg -i input.mp4 -vf "fps=0.5" \
  -q:v 2 \
  frames/frame_%04d.jpg

# Extraer un frame específico (en el segundo 3.5)
ffmpeg -ss 3.5 -i input.mp4 -frames:v 1 -q:v 2 thumbnail_candidate.jpg

# Extraer el frame con mayor "actividad" (cambio de escena)
ffmpeg -i input.mp4 -vf "select='gt(scene,0.3)'" -frames:v 5 -q:v 2 \
  best_frames/frame_%02d.jpg
# scene > 0.3 selecciona frames con alto cambio de escena (expresiones fuertes)

# Extraer y escalar a tamaño de thumbnail de YouTube (1280x720)
ffmpeg -ss 5.0 -i input.mp4 -frames:v 1 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,\
       pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a" \
  -q:v 2 thumbnail_yt.jpg
```

## 30.5 Thumbnails con Higgsfield generate_image

```
Herramienta: Higgsfield generate_image

Prompt para thumbnail de producto All Import:

  "Product photography thumbnail for social media,
   [nombre del producto] centered on a dark navy (#0a0f1a) background,
   dramatic studio lighting with cyan (#00d4d4) accent light from the left,
   high contrast, sharp focus, clean composition,
   16:9 aspect ratio, professional product shot"

Prompt para thumbnail con cara/emoción:

  "YouTube thumbnail style photo, young man with surprised/excited expression
   looking at [producto], holding it up, dark background,
   dramatic side lighting, high contrast, vibrant colors,
   16:9 aspect ratio, social media thumbnail aesthetic"

DESPUÉS de generar:
  1. Agregar texto con ffmpeg (más control que hacerlo en el prompt)
  2. Verificar legibilidad a tamaño reducido (168x94 px)
  3. Verificar que los colores de marca son correctos
```

## 30.6 Templates de thumbnail por tipo de contenido

### 30.6.1 Thumbnail de producto (camiseta, auricular, etc.)

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  FONDO: degradado NAVY #0a0f1a → #131f38              │
│                                                        │
│     ┌────────────────┐    ┌─────────────────────────┐  │
│     │                │    │  TEXTO GRANDE           │  │
│     │   PRODUCTO     │    │  "NUEVO"                │  │
│     │   (foto/render │    │  en WHITE #f8fafa       │  │
│     │    recortado)  │    │                         │  │
│     │                │    │  ┌───────────────────┐  │  │
│     │                │    │  │  $15.000           │  │  │
│     │                │    │  │  pill CYAN         │  │  │
│     └────────────────┘    │  └───────────────────┘  │  │
│                           └─────────────────────────┘  │
│                                                        │
│  [Logo @allimport.cba]                      ← esquina  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 30.6.2 Thumbnail de comparación/review

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  FONDO: split diagonal NAVY / más claro                │
│                                                        │
│  ┌──────────┐     VS     ┌──────────┐                  │
│  │ PRODUCTO │    (texto   │ PRODUCTO │                  │
│  │    A     │     grande  │    B     │                  │
│  │          │    CYAN)    │          │                  │
│  └──────────┘             └──────────┘                  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  "¿CUÁL ES MEJOR?"  (texto WHITE, outline NAVY) │   │
│  └─────────────────────────────────────────────────┘   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## 30.7 Árbol de decisión: estilo de thumbnail por tipo de contenido

```
¿Qué tipo de video es?
│
├── Producto nuevo / drop
│   └── Producto centrado + "NUEVO" en grande + precio
│
├── Review / unboxing
│   └── Cara con expresión + producto en mano + "VALE LA PENA?"
│
├── Comparación
│   └── 2 productos lado a lado + "VS" en CYAN + "CUÁL GANA?"
│
├── Tutorial / how-to
│   └── Resultado final (antes/después) + texto descriptivo
│
├── Oferta / promoción
│   └── Precio grande en RED #e22a2a + producto + "ÚLTIMAS UNIDADES"
│
├── Lifestyle / personal (@_agus_moreno_)
│   └── Foto personal usando el producto + texto mínimo + sin logo
│
└── Entretenimiento / meme
    └── Frame expresivo del video + texto de gancho en grande
```

## 30.8 Checklist de QA de thumbnails

- [ ] El texto se lee a 168x94 px (tamaño mínimo en feeds)
- [ ] Máximo 5 palabras de texto
- [ ] El contraste entre texto y fondo cumple ratio mínimo 4.5:1
- [ ] Los colores de marca son correctos (no colores similares pero incorrectos)
- [ ] SI es @allimport.cba: el logo está presente y es reconocible
- [ ] SI es @_agus_moreno_: NO hay logo
- [ ] La cara/producto es reconocible incluso en tamaño pequeño
- [ ] No hay más de 3 elementos visuales principales (simplicidad)
- [ ] La thumbnail se diferencia de las anteriores del mismo canal (variedad)
- [ ] SI hay precio: es legible y correcto
- [ ] La thumbnail genera curiosidad o emoción (no es genérica/aburrida)
- [ ] Verificar en modo oscuro Y modo claro del celular

---

# Capítulo 31: Historias de Instagram — edición especializada

## 31.1 Stories vs Reels: diferencias clave de edición

| Aspecto                  | Stories                              | Reels                                |
|:-------------------------|:-------------------------------------|:-------------------------------------|
| Duración por segmento    | 15 segundos (se auto-corta)          | Hasta 90 segundos continuo           |
| Orientación              | 9:16 (1080x1920)                     | 9:16 (1080x1920)                     |
| Descubrimiento           | Solo seguidores (feed de stories)    | Explore, Reels tab, hashtags         |
| Vida útil                | 24 horas (salvo Destacados)          | Permanente                           |
| Interactividad           | Encuestas, preguntas, quiz, slider   | No hay elementos interactivos nativos|
| Edición ideal            | Rápida, casual, "del momento"        | Pulida, con pattern interrupts       |
| Música                   | Sticker de música (limitado)         | Audio original o biblioteca completa |
| Swipe up / Links         | Sticker de link disponible           | No disponible directamente           |
| Métricas clave           | Taps forward, exits, replies         | Views, likes, shares, saves          |
| Subtítulos               | Opcionales (la gente no mira con audio)| Esenciales (la mayoría mira sin audio)|

## 31.2 Optimización de segmentos de 15 segundos

### 31.2.1 Estructura de una story de 15 segundos

```
Segundo 0-3:   HOOK (captar atención para que NO haga tap forward)
Segundo 3-10:  CONTENIDO (el mensaje principal)
Segundo 10-13: REFUERZO (dato clave, precio, producto)
Segundo 13-15: TRANSICIÓN (prepara para la siguiente story)

REGLA: cada story de 15 segundos debe funcionar como unidad independiente
       pero también como parte de la secuencia si hay más stories
```

### 31.2.2 Tap-forward rate y cómo reducirlo

```
Tap-forward rate = % de personas que tocan para ir a la siguiente story
                   sin ver la actual completa

BENCHMARK:
├── < 3% → Excelente (la story retiene)
├── 3-5% → Bueno (promedio aceptable)
├── 5-10% → Regular (hay que mejorar el hook)
└── > 10% → Malo (la gente se saltea la story)

¿Cómo reducir el tap-forward rate?
│
├── HOOK más fuerte en los primeros 2 segundos
│   ├── Movimiento (no empezar con imagen estática)
│   ├── Texto grande que genere curiosidad
│   ├── Cara/producto en primer plano
│   └── SFX de entrada (whoosh, pop)
│
├── Contenido que REQUIERE los 15 segundos
│   ├── Revelación progresiva (la info se da de a poco)
│   ├── Countdown visual (3... 2... 1... PRODUCTO)
│   ├── Antes/después (el "después" viene al final)
│   └── Encuesta/quiz que necesita tiempo para responder
│
├── Elementos interactivos
│   ├── Encuesta → la gente se queda para votar
│   ├── Slider de emoji → la gente interactúa
│   ├── Pregunta → genera respuestas
│   └── Quiz → genera curiosidad por la respuesta
│
└── Continuidad con la story siguiente
    ├── "Esperá a ver la siguiente..."
    ├── Texto cortado que continúa en la próxima
    └── Cliffhanger visual (mostrar algo parcialmente)
```

## 31.3 Diseño de secuencias multi-slide

### 31.3.1 Estructura de secuencia de producto (All Import)

```
STORY 1/5: HOOK
  ┌─────────────────────────┐
  │  "No puedo creer        │  ← Texto de gancho
  │   lo que llegó"         │
  │                         │
  │  ┌───────────────┐      │
  │  │  📦 Caja      │      │  ← Producto en caja cerrada
  │  │  cerrada      │      │
  │  └───────────────┘      │
  │                         │
  │  → (tap para abrir) →   │  ← Indicación de continuidad
  └─────────────────────────┘

STORY 2/5: REVEAL
  ┌─────────────────────────┐
  │                         │
  │  ┌───────────────┐      │
  │  │  Producto     │      │  ← Producto fuera de la caja
  │  │  revelado     │      │
  │  │  (close-up)   │      │
  │  └───────────────┘      │
  │                         │
  │  ← Encuesta:            │
  │  "¿Lo conocés?"         │
  │  [Sí] [No]              │
  └─────────────────────────┘

STORY 3/5: INFO
  ┌─────────────────────────┐
  │  Características:       │
  │  ✓ Bluetooth 5.3        │  ← Datos clave del producto
  │  ✓ 30hs de batería      │
  │  ✓ Cancelación de ruido │
  │                         │
  │  ← Slider:              │
  │  "¿Cuánto creés que     │
  │   sale? 🔥"             │
  └─────────────────────────┘

STORY 4/5: PRECIO
  ┌─────────────────────────┐
  │                         │
  │     ┌─────────────┐     │
  │     │  $15.000    │     │  ← Precio en pill CYAN
  │     │  (pill)     │     │
  │     └─────────────┘     │
  │                         │
  │  "Retirá en Córdoba     │
  │   o envío a todo        │
  │   el país"              │
  └─────────────────────────┘

STORY 5/5: CTA
  ┌─────────────────────────┐
  │                         │
  │  "Escribime para        │
  │   reservar el tuyo"     │
  │                         │
  │  📱 → WhatsApp          │
  │                         │
  │  ┌─────────────────┐    │
  │  │ [LINK STICKER]  │    │  ← Sticker de link a WhatsApp
  │  └─────────────────┘    │
  │                         │
  │  @allimport.cba         │
  └─────────────────────────┘
```

## 31.4 Elementos interactivos y edición alrededor de ellos

### 31.4.1 Encuestas y quizzes

```
Zona de posicionamiento de elementos interactivos:
┌──────────────────────────────────────┐
│  ████ (barras + nombre) ████████████ │  0-170px (ZONA MUERTA)
│                                      │
│      ┌──────────────────┐            │
│      │  TEXTO/IMAGEN    │            │  170-800px → contenido propio
│      │  del video       │            │
│      └──────────────────┘            │
│                                      │
│  ╔══════════════════════════════╗     │
│  ║  ZONA IDEAL PARA STICKERS   ║     │  800-1300px → zona interactiva
│  ║  INTERACTIVOS               ║     │  (encuestas, quizzes, sliders)
│  ║  (encuestas, quizzes, etc)  ║     │
│  ╚══════════════════════════════╝     │
│                                      │
│  ████ (responder + acciones) ██████  │  1500-1920px (ZONA MUERTA)
└──────────────────────────────────────┘

REGLA: NUNCA colocar texto del video donde irá un sticker interactivo.
       El sticker lo tapará.
```

### 31.4.2 Árbol de decisión: qué elemento interactivo usar

```
¿Cuál es el objetivo de esta story?
│
├── Engagement (que la gente interactúe)
│   ├── Pregunta con 2 opciones → ENCUESTA ("¿Cuál preferís?" / "¿Lo comprarías?")
│   ├── Pregunta con respuesta numérica → SLIDER ("¿Cuánto creés que sale?")
│   ├── Pregunta con respuesta correcta → QUIZ ("¿Qué marca es?")
│   └── Pregunta abierta → CAJA DE PREGUNTA ("¿Qué querés que traigamos?")
│
├── Información (dar datos al espectador)
│   ├── Countdown para drop → STICKER DE CUENTA REGRESIVA
│   └── Ubicación → STICKER DE UBICACIÓN (Córdoba, Argentina)
│
├── Tráfico (llevar a otro lugar)
│   ├── A WhatsApp → STICKER DE LINK (api.whatsapp.com/send?phone=...)
│   ├── A la web → STICKER DE LINK (allimport.cba web URL)
│   └── A otro perfil → MENCIÓN (@allimport.cba o @_agus_moreno_)
│
└── Sin interacción (solo visual/informativo)
    └── No agregar sticker interactivo (está bien, no toda story necesita uno)
```

## 31.5 Safe zones específicas para Stories

Las Stories tienen safe zones diferentes a los Reels porque tienen elementos UI distintos (barras de progreso arriba, caja de respuesta abajo, nombre de usuario).

```
DIFERENCIA CLAVE vs Reels:
│
├── Stories tiene más espacio abajo (la caja de respuesta es más baja que
│   el caption de Reels) → bottom safe = 1500px (vs 1400px en Reels)
│
├── Stories tiene barras de progreso arriba (multi-story) → top safe = 170px
│   (vs 130px en Reels que no tiene barras de progreso)
│
├── Stories NO tiene botones de Like/Comentar en el lateral derecho
│   → right safe = 1020px (vs 920px en Reels)
│   → MÁS espacio horizontal disponible
│
└── SI hay sticker de link: bottom safe se reduce a 1400px
    (el link ocupa espacio entre 1400-1500px)
```

## 31.6 Música para Stories (reglas diferentes a Reels)

| Aspecto              | Stories                                | Reels                                |
|:---------------------|:---------------------------------------|:-------------------------------------|
| Fuente de música     | Sticker de música de IG o audio propio | Biblioteca de IG o audio propio      |
| Duración de clip     | Hasta 15 segundos por story            | Clip completo (hasta 90s)            |
| Volumen              | No hay control fino nativo             | Control de volumen del audio original |
| Recomendación        | Música suave como fondo                | Beat que marque el ritmo de edición  |
| Licencia             | Biblioteca IG (segura)                 | Biblioteca IG (segura)               |
| Audio propio         | Agregar con ffmpeg antes de subir      | Agregar con ffmpeg antes de subir    |

```bash
# Agregar música de fondo a una story de 15 segundos
ffmpeg -i story_visual.mp4 -i musica.mp3 -filter_complex \
  "[1:a]atrim=start=30:end=45,asetpts=PTS-STARTPTS,volume=0.2,\
   afade=t=in:st=0:d=1,afade=t=out:st=13:d=2[music];\
   [0:a][music]amix=inputs=2:weights=1 0.3:duration=first" \
  -c:v copy -c:a aac -b:a 128k \
  -t 15 \
  story_con_musica.mp4

# Explicación:
# atrim=start=30:end=45  → usar segundos 30-45 de la canción (el mejor tramo)
# volume=0.2             → bajar la música al 20% (fondo sutil)
# afade in 1s, fade out 2s → entradas/salidas suaves
# -t 15                  → limitar a 15 segundos exactos
```

## 31.7 Templates de marca para Stories

### 31.7.1 Template @allimport.cba (cuenta de marca)

```
┌──────────────────────────────────────┐
│                                      │
│  ┌──┐  ALL IMPORT                    │  ← Logo + nombre (Montserrat Bold)
│  └──┘                                │     y=200, x=60
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │      IMAGEN/VIDEO            │    │  ← Contenido principal
│  │      DEL PRODUCTO            │    │     (centrado)
│  │                              │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │  TEXTO PRINCIPAL             │    │  ← Montserrat Bold, 48px
│  │  (centrado)                  │    │     WHITE #f8fafa
│  └──────────────────────────────┘    │
│                                      │
│  ┌────────────────┐                  │
│  │  $15.000       │                  │  ← Pill CYAN, centrado
│  │  (pill CYAN)   │                  │     Montserrat Bold, 40px
│  └────────────────┘                  │     Texto: NAVY #0a0f1a
│                                      │
│  Fondo: degradado NAVY               │
│  arriba/abajo oscuro, centro suave   │
└──────────────────────────────────────┘
```

### 31.7.2 Template @_agus_moreno_ (cuenta personal)

```
┌──────────────────────────────────────┐
│                                      │
│  (SIN LOGO)                          │
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │      IMAGEN/VIDEO            │    │  ← Contenido principal
│  │      (más casual,            │    │     (puede ser selfie,
│  │       más personal)          │    │      foto del momento)
│  │                              │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  TEXTO PRINCIPAL                     │  ← Montserrat SemiBold, 44px
│  (alineado izquierda, x=80)         │     WHITE #f8fafa
│                                      │     Alineado a la IZQUIERDA
│  precio más sutil                    │  ← Sin pill, solo texto
│  (sin pill)                          │     CYAN #00d4d4, 36px
│                                      │
│  Fondo: degradado más sutil          │
│  más transparente que @allimport.cba │
└──────────────────────────────────────┘
```

## 31.8 Árbol de decisión: selección de formato de story

```
¿Qué querés comunicar?
│
├── Producto nuevo (drop/restock)
│   ├── ¿Tenés video del producto?
│   │   ├── SÍ → Secuencia de 3-5 stories con reveal progresivo (§31.3)
│   │   └── NO → Story estática con foto + texto + encuesta
│   └── ¿Es urgente (últimas unidades)?
│       └── SÍ → Agregar sticker de cuenta regresiva + texto RED #e22a2a
│
├── Promoción / descuento
│   → Story 1: Hook ("OFERTA FLASH")
│   → Story 2: Producto + precio tachado + precio nuevo
│   → Story 3: CTA con link a WhatsApp
│
├── Behind the scenes (recibiendo mercadería, preparando pedido)
│   → Video casual, sin over-editar
│   → Texto mínimo, dejar que la escena hable
│   → Cuenta: @_agus_moreno_ (más personal)
│
├── Encuesta / feedback
│   → 1 sola story con encuesta interactiva
│   → Pregunta clara, 2 opciones simples
│   → Fondo producto/lifestyle
│
├── Información / educación
│   → Secuencia de 3-4 stories con datos progresivos
│   → Texto grande y claro por slide
│   → Usar slider o quiz para engagement
│
└── Redirección (mandar tráfico a otro lugar)
    → 1-2 stories máximo
    → CTA claro + sticker de link prominente
    → "Deslizá" o flecha apuntando al link
```

## 31.9 Checklist de QA de Stories

- [ ] ¿Cada story dura exactamente 15 segundos? (IG corta en 15s automáticamente)
- [ ] ¿El hook de la primera story es fuerte (primeros 2 segundos)?
- [ ] ¿El texto es legible sobre el fondo? (contraste suficiente)
- [ ] ¿Los stickers interactivos no tapan texto del video?
- [ ] ¿El sticker de link está visible y es claro el destino?
- [ ] ¿La secuencia tiene sentido si alguien entra en la story 3 de 5? (cada una debe tener mínimo contexto)
- [ ] ¿La cuenta correcta está seleccionada? (@allimport.cba con logo vs @_agus_moreno_ sin logo)
- [ ] ¿La música de fondo no es más fuerte que la voz? (si hay voz)
- [ ] ¿Los elementos están en la safe zone? (top=170, bottom=1500, ver §31.5)
- [ ] ¿Hay CTA en la última story de la secuencia?
- [ ] ¿La story se guardó en Destacados si es contenido evergreen? (ej. precios, info de contacto)
- [ ] ¿Los colores de marca son correctos?
- [ ] ¿La story funciona con y sin audio? (texto legible para quienes miran en silencio)

---

# Capítulo 32: Carruseles — edición de imagen secuencial

## 32.1 El carrusel como formato "mini-documental"

El carrusel de Instagram es una secuencia de hasta 20 imágenes/videos que el usuario desliza horizontalmente. Es el formato con mayor alcance orgánico en Instagram (2024-2025) porque:

1. Instagram muestra la primera imagen en el feed y, si no se desliza, vuelve a mostrar la segunda imagen más tarde (doble impresión).
2. El tiempo que el usuario pasa deslizando cuenta como engagement para el algoritmo.
3. Los carruseles tienen un "save rate" más alto que los reels (la gente guarda para leer después).

### 32.1.1 Cuándo usar carrusel vs reel vs story

```
¿Qué tipo de contenido tenés?
│
├── Información que requiere LECTURA (datos, specs, comparación detallada)
│   └── CARRUSEL (la gente puede leer a su ritmo, deslizar para atrás)
│
├── Información visual DINÁMICA (demostración, unboxing, antes/después)
│   └── REEL (el movimiento mantiene la atención)
│
├── Contenido EFÍMERO del momento (behind the scenes, día a día)
│   └── STORY (desaparece en 24h, casual)
│
├── Contenido EDUCATIVO (tutorial paso a paso, tips)
│   ├── ¿Requiere ver el proceso en movimiento?
│   │   ├── SÍ → REEL
│   │   └── NO → CARRUSEL (más fácil de seguir, se puede guardar)
│   │
│   └── ¿Es contenido que la gente va a querer GUARDAR para consultar después?
│       ├── SÍ → CARRUSEL (alto save rate)
│       └── NO → REEL o STORY
│
├── Producto con MÚLTIPLES ángulos/colores/variantes
│   └── CARRUSEL (cada slide = un ángulo/color/variante)
│
├── Contenido de PRECIO/CATÁLOGO
│   └── CARRUSEL (cada slide = un producto con precio)
│
└── EN CASO DE DUDA
    ├── ¿Tenés video? → REEL
    ├── ¿Tenés fotos? → CARRUSEL
    └── ¿Es algo del momento? → STORY
```

## 32.2 Estructura slide-by-slide

### 32.2.1 Estructura base (Hook → Contenido → CTA)

```
SLIDE 1: HOOK (la más importante — decide si desliza o no)
┌──────────────────────────────────────┐
│                                      │
│       TEXTO GRANDE                   │  ← Pregunta o afirmación provocadora
│       que genera                     │     Montserrat Bold, 56-72px
│       curiosidad                     │     WHITE #f8fafa
│                                      │
│       Imagen/fondo atractivo         │
│                                      │
│  ··· ● ○ ○ ○ ○ ○ ○  ← indicador     │  ← Muestra que hay más slides
│                                      │     (esto lo pone IG automáticamente)
│  → deslizá                           │
└──────────────────────────────────────┘

SLIDES 2-8: CONTENIDO (1 idea por slide, nunca más)
┌──────────────────────────────────────┐
│                                      │
│  SLIDE N                             │
│                                      │
│  ┌─────────────────────────────────┐ │
│  │  TÍTULO del punto (corto)      │ │  ← Montserrat Bold, 40-48px
│  └─────────────────────────────────┘ │     CYAN #00d4d4
│                                      │
│  Texto explicativo                   │  ← Montserrat Regular, 28-32px
│  (máximo 3-4 líneas)                 │     WHITE #f8fafa
│                                      │
│  [Imagen/icono de apoyo]             │  ← Opcional pero recomendado
│                                      │
│  ··· ○ ○ ● ○ ○ ○ ○  ← indicador     │
└──────────────────────────────────────┘

ÚLTIMO SLIDE: CTA (Call to Action)
┌──────────────────────────────────────┐
│                                      │
│       "¿Te interesa?"                │  ← Pregunta de cierre
│                                      │
│       ┌──────────────────┐           │
│       │  ESCRIBIME POR   │           │  ← CTA principal
│       │  WHATSAPP         │           │     Pill CYAN, texto NAVY
│       └──────────────────┘           │
│                                      │
│       @allimport.cba                 │  ← Nombre de cuenta
│       📍 Córdoba, Argentina          │  ← Ubicación
│                                      │
│  ··· ○ ○ ○ ○ ○ ○ ●  ← indicador     │
│                                      │
│  GUARDAR 🔖 para después             │  ← Pedir el save explícitamente
└──────────────────────────────────────┘
```

### 32.2.2 Densidad de texto por slide

| Tipo de slide     | Palabras máximo | Líneas máximo | Tamaño fuente mínimo |
|:------------------|:----------------|:--------------|:---------------------|
| Hook (slide 1)    | 8-12            | 3-4           | 48px                 |
| Contenido         | 20-30           | 5-6           | 28px                 |
| Dato/estadística  | 5-10            | 2-3           | 56px (el dato grande)|
| CTA (último)      | 10-15           | 3-4           | 36px                 |

> REGLA DE ORO: si tenés que achicar la fuente por debajo de 24px para que entre todo el texto, tenés DEMASIADO texto. Dividí en 2 slides.

## 32.3 Consistencia de diseño entre slides

### 32.3.1 Elementos que DEBEN ser consistentes

| Elemento          | Regla                                               |
|:------------------|:----------------------------------------------------|
| Fondo             | MISMO degradado o color en todas las slides          |
| Tipografía        | MISMA fuente y tamaños entre slides equivalentes     |
| Posición del título| MISMA coordenada Y en todas las slides              |
| Paleta de colores | Solo los 6 colores de marca, distribuidos igual      |
| Márgenes          | MISMOS márgenes laterales (80px izq, 80px der)       |
| Numeración        | SI usás "1.", "2.", etc. → formato consistente       |
| Logo              | Mismo tamaño y posición en todas las slides (si hay) |

### 32.3.2 Elementos que DEBEN variar

| Elemento               | Razón                                              |
|:------------------------|:--------------------------------------------------|
| Imagen/ilustración      | Cada slide necesita visual diferente (sino aburre) |
| Color de acento         | Alternar CYAN y WHITE para jerarquía visual        |
| Composición             | Variar izquierda/derecha/centro para dinamismo     |

## 32.4 Técnicas de motivación de swipe

### 32.4.1 Continuidad visual (el truco más efectivo)

```
Técnica: un elemento gráfico CRUZA el borde entre slides

SLIDE 3                          SLIDE 4
┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │
│  Texto de slide 3   │    │  Texto de slide 4   │
│                     │    │                     │
│              ┌──────│────│──────┐              │
│              │ IMAGEN│que │cruza │              │
│              │      │    │      │              │
│              └──────│────│──────┘              │
│                     │    │                     │
└─────────────────────┘    └─────────────────────┘

→ Al deslizar, el usuario VE que la imagen continúa
→ Esto MOTIVA a seguir deslizando

Implementación: hacer una imagen de 2160x1350 (ancho doble),
posicionar el elemento a cruzar en el medio (x=1080±200),
y cortarla en 2 imágenes de 1080x1350.
```

```bash
# Cortar una imagen panorámica en slides de carrusel
# Imagen fuente: 2160x1350 (2 slides)
ffmpeg -i panoramica.jpg -vf "crop=1080:1350:0:0" slide_01.jpg
ffmpeg -i panoramica.jpg -vf "crop=1080:1350:1080:0" slide_02.jpg

# Para 3 slides (imagen de 3240x1350):
ffmpeg -i panoramica_3x.jpg -vf "crop=1080:1350:0:0" slide_01.jpg
ffmpeg -i panoramica_3x.jpg -vf "crop=1080:1350:1080:0" slide_02.jpg
ffmpeg -i panoramica_3x.jpg -vf "crop=1080:1350:2160:0" slide_03.jpg
```

### 32.4.2 Revelación parcial

```
Técnica: mostrar parcialmente un dato en el borde derecho
para generar curiosidad

SLIDE 2                          SLIDE 3
┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │
│  "Los 3 mejores     │    │  ┌─────────────┐   │
│   auriculares       │    │  │ #1: Samsung  │   │
│   baratos"          │    │  │ Galaxy Buds  │   │
│                     │    │  │ $25.000      │   │
│  ┌─────────────┐    │    │  └─────────────┘   │
│  │ #3: Xiaomi  │    │    │                     │
│  │ $12.000     │    │    │  (Y la respuesta   │
│  └─────────────┘    │    │   que estabas       │
│  ┌─────────────┐    │    │   esperando...)     │
│  │ #2: QCY     │    │    │                     │
│  │ $15.000     │    │    │                     │
│  └─────────────┘    │    │                     │
│  ┌──────            │    │                     │
│  │ #1: ???──→       │    │  ← El #1 estaba     │
│  └──────            │    │     cortado, se      │
│  → deslizá          │    │     revela aquí      │
└─────────────────────┘    └─────────────────────┘
```

### 32.4.3 Indicadores de progreso

```bash
# Agregar indicador de "slide X de N" a cada imagen
# Para un carrusel de 7 slides:

for i in $(seq 1 7); do
  ffmpeg -i "slide_${i}_raw.jpg" -vf "\
    drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Regular.ttf':\
    text='${i}/7':fontsize=24:fontcolor=#f8fafa@0.5:\
    x=w-tw-40:y=40" \
    "slide_${i}_final.jpg"
done
```

## 32.5 Procesamiento batch de imágenes con ffmpeg

### 32.5.1 Redimensionar todas las imágenes a 4:5

```bash
# Redimensionar y pad a 1080x1350 (4:5 para IG Feed)
for img in slide_*.jpg; do
  ffmpeg -i "$img" \
    -vf "scale=1080:1350:force_original_aspect_ratio=decrease,\
         pad=1080:1350:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a" \
    -q:v 2 \
    "processed_${img}"
done
```

### 32.5.2 Agregar overlay de marca a todas las slides

```bash
# Agregar logo + degradado inferior a todas las slides
for img in slide_*.jpg; do
  ffmpeg -i "$img" -i allimport_logo.png -filter_complex "\
    [0:v]drawbox=x=0:y=1100:w=1080:h=250:color=#0a0f1a@0.7:t=fill[bg];\
    [1:v]scale=120:-1[logo];\
    [bg][logo]overlay=40:40" \
    -q:v 2 "branded_${img}"
done
```

### 32.5.3 Agregar texto diferente a cada slide

```bash
# Agregar texto personalizado a cada slide
TEXTS=("NUEVO DROP" "Camiseta Boca" "Camiseta River" "Camiseta Racing" "PEDÍ LA TUYA")

for i in "${!TEXTS[@]}"; do
  n=$((i + 1))
  ffmpeg -i "slide_${n}.jpg" -vf "\
    drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
    text='${TEXTS[$i]}':fontsize=48:fontcolor=#f8fafa:\
    x=(w-tw)/2:y=1200" \
    -q:v 2 "text_slide_${n}.jpg"
done
```

## 32.6 Templates de carrusel por tipo de contenido

### 32.6.1 Carrusel de catálogo de productos

```
Estructura: 1 slide hook + 1 slide por producto + 1 slide CTA

SLIDE 1 (HOOK):
  Fondo: degradado NAVY
  Texto: "CATÁLOGO [MES] 📦" (Montserrat Bold, 64px, WHITE)
  Subtexto: "Deslizá para ver todo →" (Montserrat Regular, 32px, CYAN)

SLIDES 2-N (PRODUCTO):
  Fondo: degradado NAVY (consistente)
  Foto del producto: centrada, 600x600px aprox
  Nombre: Montserrat SemiBold, 36px, WHITE
  Precio: pill CYAN, Montserrat Bold, 40px, NAVY texto
  Disponibilidad: "En stock ✓" o "Últimas unidades ⚡"

SLIDE N+1 (CTA):
  Fondo: degradado NAVY
  Texto: "¿Cuál querés?" (Montserrat Bold, 48px, WHITE)
  CTA: "Escribime por WhatsApp" (pill CYAN)
  @allimport.cba
  "Envíos a todo el país 🇦🇷"
  "🔖 Guardá este post para después"
```

### 32.6.2 Carrusel educativo/informativo

```
Estructura: 1 hook + 5-7 contenido + 1 CTA

SLIDE 1 (HOOK):
  Pregunta provocadora: "¿CÓMO SABER SI TUS TWS SON BUENOS?"
  Imagen: auriculares con signo de interrogación
  "Deslizá y aprendé en 7 slides →"

SLIDES 2-8 (CONTENIDO):
  1 dato/tip por slide
  Número grande (1, 2, 3...) en CYAN
  Título del tip en WHITE Bold
  Explicación breve en WHITE Regular
  Icono/imagen de apoyo

SLIDE 9 (CTA):
  "¿Buscás unos buenos?"
  "Los que vendemos cumplen TODOS estos puntos ✓"
  Pill con precio
  WhatsApp link
```

## 32.7 Árbol de decisión: carrusel vs reel vs story

```
¿Qué tenés para publicar?
│
├── FOTOS (no video)
│   ├── ¿Son fotos de producto con info (precio, specs)?
│   │   └── SÍ → CARRUSEL (la gente puede leer a su ritmo)
│   ├── ¿Son fotos de lifestyle/personal?
│   │   └── SÍ → STORY (casual, efímero) o CARRUSEL (si querés que quede)
│   └── ¿Son fotos tipo tutorial paso a paso?
│       └── SÍ → CARRUSEL (cada paso = un slide)
│
├── VIDEO
│   ├── ¿Es un video corto editado (< 90s)?
│   │   └── SÍ → REEL (máximo alcance para video)
│   ├── ¿Es un video casual/del momento?
│   │   └── SÍ → STORY (efímero, casual)
│   └── ¿Es un video largo que se puede fragmentar en puntos?
│       └── SÍ → CARRUSEL (cada punto = una slide con frame del video)
│            o REEL (editado con pattern interrupts)
│
├── TEXTO/INFORMACIÓN
│   ├── ¿Es mucha info que requiere lectura?
│   │   └── SÍ → CARRUSEL (el formato más cómodo para leer)
│   ├── ¿Es un dato rápido (1 frase)?
│   │   └── SÍ → STORY (rápido, al punto)
│   └── ¿Es info que la gente quiere guardar?
│       └── SÍ → CARRUSEL (el formato con más saves)
│
└── MEZCLA (fotos + texto + video)
    ├── ¿El video es el centro y las fotos son complemento?
    │   └── SÍ → REEL (con fotos como B-roll estático)
    └── ¿Las fotos son el centro y el video es complemento?
        └── SÍ → CARRUSEL con mix de foto+video
            (IG permite mezclar fotos y videos en carruseles)
```

## 32.8 Checklist de QA de carruseles

### Verificación de contenido
- [ ] ¿La slide 1 (hook) genera curiosidad o interés inmediato?
- [ ] ¿Cada slide tiene UNA sola idea principal? (no saturar de info)
- [ ] ¿El texto es legible sin hacer zoom? (fuente >= 24px en 1080x1350)
- [ ] ¿La última slide tiene CTA claro? (WhatsApp, link, "seguinos")
- [ ] ¿Se pide explícitamente guardar el post? ("🔖 Guardá para después")
- [ ] ¿El carrusel funciona si alguien ve solo las slides 1 y 10? (hook + CTA)
- [ ] ¿Los precios mostrados son correctos y actualizados?
- [ ] ¿No hay errores ortográficos o tipográficos en ninguna slide?

### Verificación de diseño
- [ ] ¿El fondo es consistente en TODAS las slides?
- [ ] ¿La tipografía es consistente (misma fuente, mismos tamaños entre slides equivalentes)?
- [ ] ¿Los márgenes son iguales en todas las slides? (80px laterales recomendado)
- [ ] ¿Los colores de marca son correctos? (NAVY, CYAN, WHITE, no aproximaciones)
- [ ] ¿El logo de @allimport.cba está presente y consistente? (si corresponde)
- [ ] ¿SI es @_agus_moreno_: no hay logo?
- [ ] ¿Las imágenes tienen buena resolución? (no pixeladas ni borrosas)
- [ ] ¿Hay técnica de motivación de swipe? (continuidad visual, revelación parcial, o progreso)

### Verificación técnica
- [ ] ¿Todas las imágenes son 1080x1350 (4:5)? → formato preferido
  - Alternativa aceptable: 1080x1080 (1:1)
- [ ] ¿Los archivos están en JPEG de alta calidad (q >= 90) o PNG?
- [ ] ¿El total de slides es entre 3 y 10? (menos de 3 no justifica carrusel, más de 10 la gente no llega)
  - Excepción: catálogo de productos puede tener hasta 20 slides
- [ ] ¿SI hay video en el carrusel: cumple las specs de IG Feed? (ver §27.1)
- [ ] ¿Las imágenes no tienen metadatos sensibles? (ubicación GPS, etc.)
  ```bash
  # Limpiar metadatos de todas las imágenes
  for img in slide_*.jpg; do
    ffmpeg -i "$img" -map_metadata -1 -q:v 2 "clean_${img}"
  done
  ```
- [ ] ¿Las imágenes se ven bien en modo oscuro Y modo claro de Instagram?

---

> **Fin de PARTE 04** — Continúa en [MASTER_VIDEO_EDITOR_PARTE_05.md](MASTER_VIDEO_EDITOR_PARTE_05.md): Capítulos 33-40 (YouTube, Podcast Video, Ads/Comerciales, QA Completo, Iteración/Analytics, Optimización por Plataforma, Consistencia de Marca, Colaboración).
