# Prompt maestro — carruseles (para Claude Design)

No es un sistema aparte: es el mismo [`PROMPT-MAESTRO-STORIES.md`](PROMPT-MAESTRO-STORIES.md)
(colores, tipografía, sistema de highlights, reglas de fondo — todo probado y funcionando),
con un puñado de cambios puntuales para que sirva para un carrusel de feed en vez de una
secuencia de stories. Se pegan los dos juntos, en ese orden, como un solo mensaje, en un
chat nuevo de Claude Design (con el sistema de diseño ya enganchado).

## Cómo usarlo

1. Pegá el contenido completo de `PROMPT-MAESTRO-STORIES.md`.
2. Pegá, justo debajo, el bloque de cambios de acá abajo.
3. Mandá los dos juntos como un solo mensaje.
4. Esperá "OK, mándame el guión", subí las fotos, y pegá el guión del carrusel
   (formato `SLIDE N`, ver ejemplos en el repo).

## Bloque de cambios (pegar debajo del prompt de stories)

```
CAMBIOS respecto al sistema de arriba, para este caso puntual — es un carrusel de
feed, no una secuencia de stories:

1. Tamaño: 1080×1350px (4:5) en las 6 slides, NO 1080×1920. Todas las slides del
   carrusel miden exactamente igual.

2. Sin progress bar ni counter "0X/0N" arriba — Instagram ya muestra los puntitos
   de swipe abajo del carrusel, no lo dupliques.

3. El input viene como "SLIDE N" en vez de "STORY N · TIPO" — no hay tipos
   HOOK/PRUEBA/CIERRE distintos, todas las slides intermedias usan el mismo layout
   de texto simple sobre foto. La Slide 1 es la portada (hook más grande, tiene que
   funcionar como miniatura de feed) y la última slide siempre lleva el CTA.

4. Respetá el orden de las slides EXACTO como viene en el guión — 1, 2, 3, 4, 5, 6
   en ese orden, sin invertir ni reordenar ninguna.

5. Jerarquía de color estricta: el texto de cuerpo va SIEMPRE en blanco. El cyan
   --accent es solo para una palabra/frase puntual destacada o para el CTA final —
   nunca pintes un párrafo completo en cyan.

6. Todo lo demás (paleta, tipografía Satoshi/Manrope/Inter, sistema de highlights,
   reglas de fondo con degradado, sin logo/marca) queda IDÉNTICO al prompt de
   stories — no inventes una tipografía ni un layout nuevo para el carrusel.

Guardá el archivo como Carrusel.html en vez de Historia.html.
```
