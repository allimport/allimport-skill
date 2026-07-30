# Prompt maestro — secuencias de stories (para Claude Design)

Adaptado del sistema de Nico Azero (video, 2026-07-30) a la marca All Import. Se pega
**como texto**, tal cual, en un chat nuevo de Claude Design (con el sistema de diseño de
la sección 1 de [`DISEÑO.md`](../docs/DISEÑO.md) ya enganchado — no en "None").

No editar el contenido de acá sin actualizar también `docs/DISEÑO.md` §4 si cambia algo
del sistema de diseño (colores, reglas de estilo).

---

# 🎨 PROMPT DE DISEÑO — STORIES ALL IMPORT (sistema visual reutilizable)

Vas a recibir más abajo un **guión de stories** (texto plano, una story por bloque). Tu
trabajo: convertirlo en un único archivo HTML llamado `Historia.html` que renderice las
stories como **slides verticales 1080×1920px** siguiendo EXACTAMENTE el sistema visual de
marca **ALL IMPORT** que defino aquí. No inventes texto: usa SOLO el del guión, mapeando
cada línea al rol que le corresponde en el layout (hook / mention / proof / punchline /
CTA / kicker).

## 0. CONTEXTO DEL REPO (leer antes de generar)

Este prompt vive en el repo `allimport-skill`. Antes de generar el HTML:

- Sistema de diseño real (colores/tipografía exactos): `skills/allimport-web-design/references/DESIGN.md`
- Reglas de estilo validadas para stories (máx. 2 estilos de texto, 1 solo acento,
  degradado no velo plano): `docs/DISEÑO.md`
- Fotos reales de producto para `.bg-photo`: `historias/stock-fotos/` — usá las que
  encuentres ahí. Si está vacía, avisá antes de usar una foto genérica de internet.
- Marca: All Import · Cuenta destino de estas stories: personal, @_agus_moreno_
  (por eso: sin logo, sin watermark de marca — ver §4, top-left vacío)

Skills a aplicar si están disponibles en la sesión:
- `ui-ux-pro-max` — para decisiones de diseño que este prompt no cubra explícitamente
  (ej. si hay que improvisar un layout nuevo que no sea Hook/Prueba/Cierre)
- `impeccable` — antes de entregar el HTML final, corré una pasada de `polish`/`audit`
  sobre el archivo: contraste de color, alineación, jerarquía tipográfica. Solo
  disponible en sesiones de Claude Code en tu compu (no en Claude Design ni en la nube)

Si alguno de estos archivos no existe o no lo podés leer, avisá antes de inventar
valores por tu cuenta.

## 1. ESTRUCTURA DEL ARCHIVO

- HTML único, autocontenido, con `<style>` y `<script>` inline
- En `<head>`: precarga de Google Fonts (Manrope, Inter pesos 400/500/700/900) + Fontshare Satoshi (400/500/700/900)
- Toolbar superior sticky:
  - Marca "All Import" con dot cyan glow + separador + meta `Historia · [tema] · N slides · 1080×1920`
  - Botones a la derecha: **"Descargar una"** (ghost) + **"Descargar las N (PNG)"** (cyan sólido)
- Body fondo `#020408`, contenido en `.stage` flex horizontal, gap 28px, wrap, padding 40px 24px 80px
- Cada story va dentro de un `.story-shell` con label superior tipo `Historia 0X · [TIPO]` (cyan el número)
- Cada story se renderiza a 1080×1920 dentro de un `.story-scale` 324×576 con `transform: scale(0.3)` aplicado al `.story` interno (`transform-origin: top left`)
- Script de descarga con `html-to-image@1.11.11`: quita el transform al capturar, espera `document.fonts.ready` + carga de imágenes, exporta PNG a pixelRatio 2, fondo `#000`

## 2. PALETA EXACTA

```
--accent:   #00D4D4   /* ÚNICO color de acento — cyan de marca All Import */
--card-bg:  #131F38
fondo app:  #020408
texto:      #FFFFFF
gris meta:  #8a8a92
borde dark: #12151F / #161A26
```

**Regla de oro:** el cyan `#00D4D4` es el ÚNICO color de acento. Cero rojos/verdes/morados/amarillos. Solo blanco, negro, gris y cyan. (Excepción: el tick verificado azul `#1d9bf0` SÓLO si hay un mention `@usuario` con verificación — se mantiene azul porque imita el badge real de la plataforma, no es un color decorativo de marca.)

## 3. TIPOGRAFÍA

Stack: `'Satoshi', 'Manrope', 'Inter', system-ui, sans-serif`

| Rol | Tamaño | Peso | Tracking | Line-height |
|---|---|---|---|---|
| Hook número gigante (ej. "99%") | 380–420px | 900 | −0.04em | 0.9 |
| Hook pre/post | 56–64px | 500–700 | −0.01em | 1.15 |
| Headline punchline | 60–72px | 400 (con b 900) | −0.012em | 1.2 |
| Texto top ("Esta es la cuenta de") | 40–56px | 500 | −0.005em | 1.2 |
| Texto bottom (cierre de slide) | 38–40px | 500 | normal | 1.35 |
| Mention pill (@usuario) | 32px | 900 | 0.01em | 1 |
| CTA pill | 30px | 900 uppercase | 0.04em | 1 |
| Counter "0X / 0N" | 22px | 400 | 0.2em | 1 |
| Kicker / footer label | 22–24px | 900 uppercase | 0.18em | 1 |
| Logo pill text | 22px | 900 | 0.14em uppercase | 1 |

## 4. CHROME COMÚN A TODAS LAS STORIES

Padding interior 80px en los 4 lados.

**Top — Progress bar:** N segmentos del mismo ancho, altura 6px, gap 8px, radius 3px. Estados:
- `done`: `background: #fff` (100%)
- `active`: `background: #fff` + `box-shadow: 0 0 18px rgba(255,255,255,0.6)`
- vacío: `background: rgba(255,255,255,0.25)`

**Top-left:** vacío — sin logo-pill ni watermark de marca. Estas stories son para la
cuenta personal @_agus_moreno_, sin branding visible (ver §0).

**Top-right:** counter "0X / 0N" en blanco, 22px, tracking 0.2em.

**Bottom-right (slides intermedias):** `swipe` con texto "SIGUIENTE" gris 18px tracking 0.18em + flecha "→".

**Capa noise:** SVG fractal `feTurbulence baseFrequency=0.9` opacity 0.06 mix-blend overlay sobre todo.

## 5. FONDO DE CADA STORY (4 capas en orden Z)

1. **`.bg-photo`** full-bleed, `background-size: cover`, `position: center`, `filter: contrast(1.05) brightness(1.05)`, opacity 1
2. **`.vignette`** `radial-gradient(ellipse at center, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.78) 100%)`
3. **`.glow`** circular cyan difuso (1000–1100px), `radial-gradient(circle, rgba(0,212,212,0.45) 0%, rgba(0,212,212,0) 60%)`, `filter: blur(80px)`, posicionado según slide
4. **`.noise`** SVG fractal opacity 0.06

Las fotos de fondo van en `historias/stock-fotos/` (ver §0). Si no existen, avisar antes de usar una alternativa.

## 6. SISTEMA DE HIGHLIGHTS (3 estilos — todos en `--accent`)

Cada vez que el guión use **mayúsculas**, comillas dobles, asteriscos, o palabras claramente enfatizadas, mapea a uno de estos:

1. **`hl-solid`** → claim/dato principal de la slide
   `background: var(--accent); color: #0A0C10; font-weight: 900; padding: 4px 10px; border-radius: 6px; white-space: nowrap;`

2. **`hl-dashed`** → conceptos secundarios fuertes
   `border: 3px dashed var(--accent); padding: 6px 14px; border-radius: 8px; color: #fff; font-weight: 900;`

3. **`hl-underline`** → énfasis suave
   `position: relative;` + `::after { content: ''; position: absolute; left: -2px; right: -2px; bottom: -4px; height: 8px; background: var(--accent); z-index: -1; border-radius: 2px; }`

**Heurística de mapeo automático:**
- Palabra/frase en MAYÚSCULAS dentro de una frase → `hl-solid` (si es claim) o `hl-dashed` (si es concepto)
- Palabras en minúsculas que el guión claramente quiere enfatizar → `hl-underline`
- Números enormes (porcentajes, cifras) → su propio bloque gigante con color `var(--accent)` y glow cyan detrás (ver layout HOOK)
- Si una misma frase tiene 2 enfatizados, alterna los estilos para crear jerarquía

## 7. LAYOUTS POR TIPO DE SLIDE

### TIPO A · HOOK (apertura impactante con número/palabra gigante)
- `.content` con `display: flex; flex-direction: column; justify-content: space-between; padding-top: 220px;`
- Bloque hook centrado: pre arriba → número/palabra gigante color `var(--accent)` 380–420px black con glow (`text-shadow: 0 0 80px rgba(0,212,212,0.5)`) → post debajo
- Kicker abajo: barra cyan 40×3px + texto uppercase

### TIPO B · PRUEBA / VISUAL (mention + proof card)
- `.content` con `padding-top: 220px; justify-content: center; gap: 80px;`
- Top: texto medium "Esta es la cuenta de" + `mention` pill blanca (avatar circular gradient `linear-gradient(135deg, #00D4D4, #0090A8)` con "@" blanco bold, tick verificado azul `#1d9bf0`)
- Centro: `proof-wrap` con glow radial cyan `rgba(0,212,212,0.55)` blur 80px + borde dashed cyan 3px + card interior `--card-bg`
- Bottom: texto cierre con highlights + kicker uppercase

### TIPO C · CIERRE / CTA
- `.content` con `padding-top: 180px; justify-content: space-between;`
- Punchline grande (60–72px) arriba con highlights
- Bloque inferior: texto medium 40px + **CTA pill** cyan sólido (`background: var(--accent); color: #0A0C10;` padding 22×44px, radius 999px, font 30px black uppercase, glow `box-shadow: 0 14px 50px rgba(0,212,212,0.5)`) + kicker abajo

## 8. COMPONENTES REUTILIZABLES (clases CSS)

```
.text-top      .text-bottom      .kicker (con .bar cyan 40×3px antes)
.mention       .proof-wrap       .proof-glow      .proof-dashed     .proof-card
.cta-btn       .swipe (con .arrow)
.progress      .seg / .seg.active / .seg.done
.counter
.glow          .noise            .vignette        .bg-photo
.hl-solid      .hl-dashed        .hl-underline
```

## 9. INPUT QUE RECIBIRÁS

```
STORY N · TIPO
[texto en pantalla, una línea por línea]

— [opcional: kicker/footer en mayúsculas precedido de em-dash]

STORY N+1 · TIPO
…
```

**Tu trabajo:**
1. Contá cuántas STORY hay → ajustá progress bar y counter.
2. Identificá el TIPO y aplicá el layout (§7). Detectá highlights (§6). Líneas con `—` → kicker. `@usuario` → mention pill. Línea entre `[corchetes]` o que empiece por "VER " → CTA pill.
3. Asigná fondos alternando las fotos disponibles en `historias/stock-fotos/`.
4. Mantené el orden y NO inventes texto que no esté en el guión.
5. NO añadas iconografía SVG decorativa fuera de la marca, ni emojis que no estén en el guión.

## 10. ENTREGABLE

Un archivo HTML único `Historia.html` listo para abrir en el navegador, con preview escalado de las N stories en horizontal y descarga PNG individual + bulk de las N a 1080×1920.

---

Confirmá con "OK, mándame el guión" y esperá. Cuando llegue el guión, devolvé directamente el HTML completo.
