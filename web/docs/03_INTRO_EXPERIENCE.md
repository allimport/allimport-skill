# 03 — INTRO EXPERIENCE

Estado: v2.0 APROBADA Y CONGELADA. Referencia base: commit `f04f11e`. Cualquier modificación futura debe compararse contra este documento y actualizarlo en el mismo acto. Ante la duda, la Intro no se toca.

## Narrativa

El logo completo de All Import existe como una pieza física de cerámica industrial suspendida en un vacío oscuro, encendida por su propia energía. No es una animación 3D: es un objeto con masa y presencia. La marca se afirma sin gritar. El usuario debe sentir "esto es de verdad, esto es premium, puedo confiar".

## Beats y timing

- Void (0.00 – 0.50 s): negro absoluto. Da valor a lo que aparecerá.
- Particles (0.50 – 1.80 s): el campo de estrellas emerge lento. Escala espacial.
- Emerge (1.60 – 3.00 s): el logo aflora de la oscuridad como silueta. El objeto ya estaba ahí; la oscuridad lo revela.
- BoltOn (3.00 – 3.60 s): el rayo se activa como única fuente de luz. La firma de la marca; se enciende a sí misma.
- Stabilize (3.60 – 4.30 s): los materiales asientan; micro-settle de masa. Peso físico.
- Settle → Idle (4.30 – 5.00 s): blend al idle. Recién acá se habilita la interacción. Control absoluto, listo para el scroll.

Todo deriva de un reloj único; determinista. La interacción está gateada hasta el settle; el scroll está gateado hasta terminar el ensamblaje.

## Interacción

El logo responde como aluminio macizo suspendido en un campo magnético: arranca tarde y perezoso, nunca persigue el cursor, y al detenerse el usuario solo termina de acomodarse, sin rebote. Amplitud pequeña. En reposo queda perfectamente derecho; la única inclinación es consecuencia de la velocidad. El resto de la escena casi no reacciona: la cámara apenas respira, las estrellas no se mueven, el fondo gana densidad con inercia, el fluido altera su patrón interno sin seguir a nadie. Sensación buscada: masa, peso, control. Nunca "sigue el mouse".

## Iluminación

Tres luces fijas —ambient baja, key blanca frontal, rim cyan tenue— más el punto de luz del rayo, que se enciende en la activación y es la única emisión de la escena. La luz del rayo pinta de celeste las letras cercanas y deja blancas las lejanas. Solo el rayo cruza el umbral del bloom.

## Cámara

Encuadre consciente del aspect ratio: el logo entero entra en cualquier viewport. La cámara casi no se mueve; el que se mueve es el logo. Reencuadra a masthead cuando llega el scroll, encontrando un punto de vista nuevo dentro del mismo mundo.

## Materiales

Letras de cerámica blanca industrial: dieléctrico puro, frente mate, laca fina que hace reaccionar los bordes a la luz. Rayo y halo emisivos cyan, energía contenida, nunca neón. Negro profundo del vacío como base. Objetivo: fotografía de producto, no render.

## Comportamiento

El logo no se comunica con texto: la marca habla solo por el objeto 3D y la escena. Un título accesible existe para lectores y buscadores, invisible en pantalla. `prefers-reduced-motion` respetado: pose final estática.

## Reglas

- El rayo es siempre la fuente principal de luz y la firma de la marca.
- El logo es siempre el protagonista absoluto.
- La oscuridad siempre domina.
- Nunca HUD, corchetes, marcos, grilla ni estética de scanner.
- Nunca efectos gratuitos ni un cuarto color.
- El movimiento siempre transmite masa, nunca liviandad.
- El fondo acompaña, nunca compite.

## Qué nunca modificar

Congelado: timeline, cámara, motion, materiales, iluminación, logo, rayo, fluido, campo de profundidad, atmósfera, partículas, interacción, ensamblaje, arquitectura, parámetros, composición y colores. Se permite construir contenido nuevo encima; no alterar un solo valor de la Intro.
