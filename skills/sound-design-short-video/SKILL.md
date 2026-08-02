---
name: sound-design-short-video
description: Use when scripting, editing, or annotating short-form vertical video (TikTok/Reels/Shorts) and deciding which sound effect, foley, or transition goes at each beat. Covers SFX categorization by narrative function (hook, anticipation, emphasis, foley, gamification), cinematic risers/impacts, UI/tech sounds, and A-roll/B-roll/typography rules for retention.
---

# Sound Design for Short-Form Video

Diseño sonoro y de edición para video vertical corto (TikTok/Reels/Shorts), basado en patrones observados en creadores de alta retención. Convierte un guion en una lista de efectos de sonido y transiciones beat-a-beat.

## Cuándo usar
- Al convertir un guion en una lista de SFX/transiciones línea por línea
- Al revisar un corte ya editado y detectar qué efecto falta en cada momento (emoji, dato clave, corte de cámara, remate)
- Al definir el estilo de edición (A-roll/B-roll, tipografía, transiciones) de un video corto

## Proceso
1. Leer el guion línea por línea e identificar la función narrativa de cada momento: gancho, anticipación, dato/remate, corte de cámara, enumeración, ironía/sarcasmo, acción física/escritura, CTA.
2. Asignar un efecto de la tabla de categorías (abajo) según la función de ese momento, no al azar ni repitiendo el mismo efecto para todo.
3. Marcar cada línea del guion con el efecto entre corchetes `[efecto — momento exacto]`, indicando cuándo suena (al aparecer una palabra, al cortar de plano, al mostrar un emoji).
4. No reutilizar el mismo efecto genérico (whoosh, pop) para dos categorías distintas — cada categoría tiene su propio sonido para que el espectador aprenda el "lenguaje" del video.
5. Si aplica, agregar indicaciones de A-roll/B-roll y tipografía (ver reglas visuales).

## Tabla rápida: categoría → efecto → momento

| Categoría | Efecto sugerido | Cuándo colocarlo |
|---|---|---|
| Gancho / ruptura de patrón | Vine Boom, Metallic Riser | Primer segundo del video |
| Anticipación | Riser (sonido ascendente) | Justo antes de revelar el dato clave |
| Corte de cámara / énfasis | Impact (golpe grave), Trailer Impact | En cada corte, o solo en el momento más polémico |
| Transición entre planos | Whoosh seco/rápido, Camera Shutter texturizado | Cambios de escena o de toma |
| Interfaz / tecnología | Mouse click, Toggle, Digital Loading, Digital Text | Acciones en pantalla (suscribirse, cargar, pantalla de carga) |
| Enumeración / listas | Enter/Select, campana sutil (Glocken) | Al contar pasos o conceptos (1, 2, 3) |
| Anclaje visual | Pop | Al aparecer palabras clave, emojis o imágenes |
| Foley de acción | Sonidos hiperrealistas (brushing, pouring water, teclado mecánico, roce de lápiz/papel) | Movimientos físicos del creador o escritura/dibujo en pantalla |
| Cartoon / quitar seriedad | Running, Slide Whistle | Movimientos torpes o para restarle peso a un tema |
| Gamificación | Level up, Coin collect | Al premiar un aprendizaje o logro del espectador |
| Dinero | Amount display (digital) — evitar la caja registradora clásica | Menciones de dinero o cifras |
| Sorpresa / censura | Alerta tipo Metal Gear | Dato chocante, o para cortar la música abruptamente |
| Disonancia / error | Sonido de error, Prohibition terms | Algo que "no tiene sentido" o contradice lo anterior |
| Ironía | Ruido creepy (de terror) | Dudas irónicas o sarcasmo |
| Revelación sarcástica | Glitter | "Descubrimientos" presentados con ironía |

## Reglas visuales (A-roll / B-roll / tipografía)
- **A-roll** define el 80% del estilo: luz suave, fondo con profundidad, buen audio, zooms sutiles.
- **B-roll** cuenta la historia sin palabras; pasarlo a blanco y negro cuando haya texto en pantalla que deba resaltar sobre el video.
- Las transiciones (flash blanco, zoom cut, film burn) van solo en cambios de escena importantes, y deben sentirse naturales — el espectador no debería notarlas conscientemente.
- Tipografía: una fuente principal fuerte + una secundaria limpia, siempre animada — el movimiento constante sostiene la retención.

## Reglas críticas
- Nunca uses el mismo SFX genérico para dos funciones narrativas distintas dentro del mismo guion — rompe el "lenguaje sonoro" que el espectador aprende a lo largo del video.
- Prioriza foleys hiper-específicos (lápiz, teclado, papel) sobre efectos genéricos "quemados" (sobreutilizados) para un acabado profesional.
- Un riser o impact va SIEMPRE antes del dato más importante o polémico, nunca después — es anticipación, no reacción.
- Los pops/clics de anclaje deben sincronizarse frame-accurate con la aparición del elemento en pantalla, no aproximado.

## Output esperado
Guion devuelto línea por línea con las marcas `[efecto — momento]` insertadas en cada beat, listo para pasarle a un editor humano o a un motor de generación de video.

Para el detalle completo por creador (timestamps, ejemplos y el prompt de síntesis original), ver `references/creator-methods.md`.
