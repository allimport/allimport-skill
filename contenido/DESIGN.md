# DESIGN.md — Branding de All Import

Guía visual y de voz para TODA pieza de contenido (historias, carruseles, videos,
reels). Coherente con la landing (`web/`).

## Colores
| Uso | Nombre | HEX | RGB |
|---|---|---|---|
| Fondo / base | NAVY | `#0a0f1a` | 10, 15, 26 |
| Acento / marca | CYAN | `#00d4d4` | 0, 212, 212 |
| Texto claro | WHITE | `#f8fafa` | 248, 250, 250 |
| Urgencia / "últimas" | RED | `#e22a2a` | 226, 42, 42 |
| Detalle secundario | CELESTE | `#78b4eb` | 120, 180, 235 |
| Precio destacado (dorado, opcional) | GOLD | `#c9a227` | 201, 162, 39 |

- **Fondo** siempre oscuro (NAVY). Nunca fondo blanco puro.
- **Acento** cyan para marca, precios, marcos y CTA.
- **Rojo** SOLO para urgencia real ("últimas unidades", "no traemos más"). Nunca falsa escasez.

## Tipografía
- **Sans-serif bold** para títulos y precios (DejaVu Sans Bold / Arial Bold / Montserrat).
- Jerarquía: título grande → precio en pill cyan → subtexto → CTA.
- Alto contraste: texto claro sobre navy, o navy sobre cyan.

## Marca en la pieza
- Marco cyan de ~14px alrededor de la imagen.
- Header: **ALL IMPORT** en cyan + "Córdoba · Entrega en mano" debajo.
- CTA de cierre: "Escribinos por WhatsApp" en celeste.
- Formato historia/reel: **1080×1920**.

## Tono de voz (argentino, cordobés, directo)
- Hablás de vos (informal), como a un amigo que quiere arrancar.
- Frases cortas. Sin vueltas. Sin corporativismo.
- Honesto por sobre todo: si es réplica, no se miente; si quedan pocas, es verdad.

### Frases que SÍ
- "Lo ves en mano antes de pagar."
- "Entrega en Córdoba, donde te quede cómodo."
- "Calidad real, precio de importación."
- "Últimas unidades — no traemos más." *(solo si es verdad)*
- "Cualquier duda, escribime."

### Frases que NO
- ❌ "¡OFERTA IMPERDIBLE!!! ÚLTIMO DÍA" (falsa urgencia)
- ❌ Nombres de marca ajena (AirPods, JBL, etc.) → usar descripciones ("Auriculares TWS").
- ❌ Promesas que no podés cumplir ("el mejor del mundo", "garantía de por vida").
- ❌ Métricas inventadas ("+1000 clientes felices" si no es real).
- ❌ Sobrevender en cada historia. El valor primero, la venta después.

## Coherencia con la web
Los mismos colores viven en `web/`. Si cambian allá, se actualizan acá. La landing
usa descripciones marca-seguras de producto (ver `web/src/components/site/data.ts`);
el contenido de redes sigue el mismo criterio.
