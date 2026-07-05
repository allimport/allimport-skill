# INTRO EXPERIENCE v2.0 — FREEZE SPEC

**Estado:** CONGELADO · **Commit de referencia:** `f04f11e` · **Rama:** `claude/allimport-skill-setup-0m43zg`

Este documento es la referencia oficial de la Intro Experience de All Import. Cualquier
modificación futura debe compararse contra esta especificación antes de aplicarse. El código
descrito acá está congelado: no se toca sin una decisión explícita que actualice también este
documento.

Archivos que componen la experiencia (`web/src/components/intro/`):
`timeline.ts`, `Scene.tsx`, `CameraRig.tsx`, `Emblem.tsx`, `Particles.tsx`, `Fluid.tsx`,
`DepthField.tsx`, `Atmosphere.tsx`, `Effects.tsx`, `IntroExperience.tsx`, `logo-full-paths.ts`.

---

## 1. Dirección Creativa

**Qué transmite.** Una marca seria, tecnológica y confiable. No un emprendimiento: una casa
internacional. El logo completo de All Import existe como una pieza física de cerámica industrial
suspendida en un vacío oscuro, iluminada por su propia energía (el rayo).

**Qué emociones genera.** Silencio, tensión contenida, exclusividad. El usuario no ve "una
animación 3D": ve un objeto que tiene masa y presencia. La lectura emocional es "esto es de
verdad", "esto es premium", "puedo confiar".

**Filosofía visual.**
- La oscuridad domina el 95% del cuadro. El negro tiene volumen, no es una pantalla apagada.
- El logo es el único protagonista. Todo lo demás existe para aumentar su percepción de calidad.
- El rayo es la firma de la marca y la única fuente de emisión de la escena: la marca se enciende
  a sí misma.
- Nada decorativo. Cada elemento tiene propósito o no está.

---

## 2. Arquitectura

Sistemas, en orden de render (fondo → frente). Ninguno se documenta con código; solo su función.

- **Timeline (`timeline.ts`)** — Reloj maestro determinista. Todas las propiedades visuales
  derivan de un único valor `t` (segundos desde el inicio) más un valor `scroll` (0..1) gateado por
  el ensamblaje. Define los beats. Fuente de verdad temporal de toda la escena.

- **Scene (`Scene.tsx`)** — Monta el Canvas, el fondo negro absoluto, la niebla del color exacto
  del fondo, las tres luces fijas y el orden de capas. Provee el reloj compartido por contexto.
  El logo nunca se desmonta.

- **CameraRig (`CameraRig.tsx`)** — Encuadre consciente del aspect ratio: el logo entero encaja en
  cualquier viewport. Dolly de entrada, susurro de sway con el mouse (solo tras el settle),
  reencuadre a masthead para Hero y Scroll. La cámara casi no se mueve: el que se mueve es el logo.

- **Lighting (en Scene)** — Tres luces fijas: ambient baja, key blanca frontal, rim cyan lateral
  tenue. Más el point light del rayo (en Emblem) que se enciende en la activación. No hay más luces.

- **Materials (en Emblem)** — Letras de cerámica blanca industrial. Rayo y halo emisivos cyan.
  Ver sección 4.

- **Particles (`Particles.tsx`)** — Estrellas para escala, muy pocas (~50), estáticas, distribuidas
  por rejection-sampling contra una máscara de ruido (clusters orgánicos + grandes vacíos). Sin
  deriva, sin rotación, sin parallax. Sprites radiales suaves, nunca puntos cuadrados.

- **DepthField (`DepthField.tsx`)** — El negro con volumen. Un quad con dos funciones: (a) masas de
  luminancia de frecuencia bajísima que rompen la uniformidad del negro sin textura nombrable; (b)
  la densidad gravitacional que responde a la velocidad del mouse con inercia. Ver sección 5.

- **Atmosphere (`Atmosphere.tsx`)** — La luz del rayo ocupando volumen. Un sprite radial cyan
  oscuro detrás del logo que despierta con el rayo. Es lo que suspende el logo DENTRO del espacio en
  lugar de pegarlo encima. Casi imperceptible.

- **Fluid (`Fluid.tsx`)** — Campo de energía obsidiana detrás del logo. fbm con domain-warping que
  respira in-place, confinado radialmente al ~50% del ancho del logo. Celdas internas mínimas de
  blanco frío o cyan. Nunca protagonista.

- **Emblem (`Emblem.tsx`)** — El logo completo: cada letra, el rayo, el halo, extruidos desde los
  paths vectoriales reales (`logo-full-paths.ts`). Contiene la secuencia de ensamblaje, el material
  y la física de la interacción.

- **Effects (`Effects.tsx`)** — Un único post-pass: bloom selectivo. Solo el rayo (emisivo) cruza el
  umbral. MSAA en desktop para matar el aliasing de los cantos.

- **Mouse Interaction (en Emblem + CameraRig + DepthField + Fluid)** — Ver sección 5.

- **Hero Transition / Scroll (`IntroExperience.tsx` + CameraRig)** — Tras el settle, el scroll
  (gateado por el ensamblaje) eleva el logo a masthead y descubre el escenario inferior. Aditivo:
  durante la Intro el scroll no puede alterar un solo frame, por construcción.

---

## 3. Timeline Oficial

Beats en segundos. Cada uno con intención narrativa. Fuente: `timeline.ts`.

| Beat | Tiempo | Qué pasa | Intención |
|---|---|---|---|
| **Void** | 0.00 – 0.50 | Negro absoluto. Nada existe. | Establecer el vacío antes de dar valor a lo que aparece. |
| **Particles** | 0.50 – 1.80 | El campo de estrellas emerge lento. | Profundidad espacial: el lugar tiene escala. |
| **Emerge** | 1.60 – 3.00 | El logo de metal aflora de la oscuridad como silueta especular. | El objeto ya está ahí; la oscuridad lo revela, no lo crea. |
| **BoltOn** | 3.00 – 3.60 | El rayo se activa como única fuente de luz de la escena. | La firma de la marca. La marca se enciende con su propia energía. |
| **Stabilize** | 3.60 – 4.30 | Los materiales asientan a su reflectancia final; micro-settle de masa. | Peso físico: la pieza aterriza. |
| **Settle → Idle** | 4.30 – 5.00 | Blend al estado idle. Recién acá se habilita la interacción del mouse. | Control absoluto. El objeto queda vivo pero dominado, listo para Hero. |

Reglas del timeline:
- Todo deriva de `t`. Determinista y scrubbable.
- La interacción del mouse está gateada: cero efecto antes del settle.
- El scroll está gateado por el ensamblaje: cero efecto durante la Intro.

---

## 4. Materiales (conceptos, no parámetros)

**Colores de marca.** Negro profundo del vacío (base de la escena), blanco cerámico del logo, cyan
eléctrico del rayo. Nunca se introduce un cuarto color.

**Letras — cerámica industrial.** La referencia es Apple / Nothing / Teenage Engineering: blanco
dieléctrico puro (sin tinte metálico gris), frente ligeramente mate, laca clearcoat fina y nítida
que hace que los bordes biselados reaccionen a la luz y los laterales rasantes se lean apenas más
reflectivos. La calidad viene de cómo el material captura la luz existente, no de agregar luz. Debe
parecer una pieza fotografiada, no un modelo renderizado.

**Rayo — energía contenida.** Emisivo cyan. Es la única superficie que emite y la única que cruza
el umbral del bloom. Su glow es controlado, nunca neón. Ilumina las letras cercanas con un gradiente
celeste real (backlight desde detrás del logo), dejando las letras lejanas blancas.

**Halo y atmósfera.** El rim cyan de la o y el sprite atmosférico son la luz del rayo tomando
volumen. Casi imperceptibles: su ausencia se notaría, no su presencia.

**Filosofía del render.** La oscuridad domina. La luz siempre tiene un origen físico y un propósito.
El bloom es selectivo (solo el rayo). El objetivo es fotografía de producto, no demo técnica.

---

## 5. Interacción

**Cómo responde el logo.** Como una pieza de aluminio macizo suspendida en un campo magnético
invisible. Modelo de resorte sobreamortiguado con estado de velocidad real: arranca tarde y perezoso
(nunca persigue el cursor), acelera lentamente, y al detenerse el usuario, simplemente termina de
acomodarse — sin rebote, sin elasticidad. La amplitud es pequeña y controlada. En reposo el logo
siempre queda perfectamente derecho; la única inclinación es una micro-rotación consecuencia de la
velocidad, que existe solo mientras se mueve y nunca llama la atención.

**Cómo responde el mouse (resto de la escena).**
- **Cámara:** apenas un susurro de sway. El que se mueve es el logo, no la cámara.
- **Partículas / estrellas:** no se mueven. El espacio permanece quieto.
- **DepthField (densidad gravitacional):** el negro gana densidad hacia el cursor con inercia
  pesada — reacción rápida, disolución lenta. Se descubre a los segundos; invisible en quietud.
- **Fluid:** la velocidad del mouse inyecta un kick de fase en el patrón interno que decae en menos
  de un segundo. No sigue el cursor ni el logo.

**Qué sensación busca transmitir.** Masa, peso, inercia, control. "El logo tiene masa", nunca "el
logo sigue el mouse". El material reacciona; no es una animación.

**Qué está prohibido modificar.** La física del resorte (rigidez/amortiguación), la amplitud, la
regla de reposo-derecho, el gateo por settle, y el principio de que solo el logo es interactivo de
forma directa.

---

## 6. Performance

**FPS objetivo:** 60 fps sostenidos en desktop y en móvil de gama media.

**Presupuesto y restricciones.**
- DPR clampeado (nunca renderiza a la densidad nativa completa en pantallas de alto DPI).
- Un solo post-pass (bloom selectivo). MSAA solo en desktop; en móvil se apaga.
- Partículas en buffers estáticos, poblaciones reducidas en móvil.
- Fondo procedural: quads con shaders ligeros (DepthField, Fluid, Atmosphere), sin simulación de
  fluidos, sin física, sin texturas externas.
- El canvas nunca se desmonta; las lecturas a 60 fps usan refs mutables, no estado de React (cero
  re-renders por frame).

**Optimizaciones obligatorias.** Reloj y scroll por ref compartida. `dt` clampeado (estabilidad al
cambiar de pestaña). Geometría del logo cacheada en `useMemo`. Sprites pre-renderizados en canvas,
no shaders, cuando alcanza.

**Prohibido agregar.** Nuevos post-procesados, simulaciones de fluido/física, cientos de partículas,
segundas fuentes de bloom, texturas pesadas, o cualquier sistema que baje de 60 fps.

---

## 7. Reglas de Diseño

Cada regla defiende la identidad de marca de All Import.

1. **El rayo es siempre la fuente principal de luz y emisión.** Es la firma de la marca.
2. **El logo es siempre el protagonista.** Si el usuario mira primero cualquier otra cosa, está mal.
3. **La oscuridad siempre domina** (≈95% del cuadro). El silencio es parte de la marca.
4. **La luz siempre tiene propósito y origen físico.** Nada se ilumina "porque queda lindo".
5. **Nunca agregar HUD, corchetes, marcos, esquinas ni UI decorativa.**
6. **Nunca volver a la grilla / wireframe / estética de scanner o sci-fi genérico.**
7. **Nunca agregar efectos gratuitos.** Cada elemento aporta profundidad o presencia, o no está.
8. **Nunca introducir un cuarto color.** Solo negro, blanco cerámico, cyan.
9. **El fondo acompaña, nunca compite.** Existe para hacer el logo más importante.
10. **El movimiento transmite masa**, nunca liviandad ni persecución del cursor.
11. **La marca se comunica solo por el logo 3D y la experiencia visual** — sin texto flotante dentro
    de la Intro.
12. **Menos, pero perfecto.** Ante la duda, eliminar antes que agregar.

---

## 8. Checklist de Calidad

Validación obligatoria antes de aceptar cualquier cambio que roce la Intro.

- [ ] El logo sigue siendo el protagonista absoluto.
- [ ] No hay sensación de "demo Three.js" ni de template.
- [ ] No existen efectos gratuitos ni decorativos.
- [ ] El movimiento del logo transmite masa (inercia, sin rebote, reposo derecho).
- [ ] El render de las letras parece fotografía de producto (cerámica, no plástico).
- [ ] El rayo es la única emisión y la fuente de luz principal.
- [ ] La interacción es elegante, se descubre, nunca persigue el cursor.
- [ ] El fondo acompaña: negro dominante, estrellas para escala, sin protagonismo.
- [ ] No hay artefactos de contraste (ninguna "mancha" o forma bajo/alrededor del logo).
- [ ] El logo se lee suspendido dentro del espacio, no pegado sobre un fondo.
- [ ] El usuario entiende que es una marca seria sin leer una sola palabra.
- [ ] 60 fps sostenidos en desktop y móvil de gama media.
- [ ] `prefers-reduced-motion` respetado (pose final estática).
- [ ] El logo entero encaja en cualquier viewport (desktop y móvil).

---

## 9. Restricciones Futuras

**✔ Permitido (construir encima, sin tocar la Intro):**
- Construir nuevas secciones de la landing (Historia, Cómo funciona, Productos, Comparativa,
  Testimonios, CTA final) dentro del escenario que abre el scroll.
- Agregar contenido, copy y catálogo en esas secciones.
- Modificar el catálogo, precios y textos de producto.
- Agregar el overlay DOM de la Hero (headline, CTAs) sobre el escenario del scroll, respetando la
  jerarquía y sin tapar el logo.
- Optimizaciones de carga (poster/LCP, SEO, meta tags) que no alteren un solo frame de la escena.

**✘ Prohibido (congelado — requiere decisión explícita + actualizar este documento):**
- Modificar el Timeline (beats, tiempos, orden).
- Modificar la Cámara (encuadre, dolly, sway, reencuadre).
- Modificar el Motion / la física de la interacción.
- Modificar los Materiales del logo (colores, cerámica, laca, emisivos).
- Modificar la Iluminación (las tres luces + el point light del rayo).
- Modificar el Logo, su geometría o el pipeline de vectorización.
- Modificar el Rayo, el Fluid, el DepthField, la Atmosphere o las Partículas.
- Modificar el ensamblaje, el Hero o la lógica de Scroll de la Intro.
- Modificar la Arquitectura, los shaders, los parámetros, la composición o los colores.
- Agregar cualquier sistema, efecto, post-proceso o luz nueva a la escena de la Intro.

---

**Referencia de congelamiento:** commit `f04f11e`. Todo cambio futuro sobre la Intro debe justificarse
contra este documento y actualizarlo en el mismo acto. En caso de duda, la Intro no se toca.
