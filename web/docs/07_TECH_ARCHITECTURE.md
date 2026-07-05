# 07 — TECH ARCHITECTURE

Referencia técnica definitiva. Explica cómo está construido el sistema, no cómo reconstruirlo. Sin código ni ejemplos. Complementa los documentos anteriores: donde `03` describe la experiencia de la Intro, este describe la arquitectura que la sostiene.

## 1. Objetivo del documento

Protege la integridad estructural del proyecto: el orden de capas, el flujo del tiempo y las fronteras entre sistemas que hacen que la experiencia funcione. Existe para que cualquier persona que agregue contenido futuro entienda dónde puede construir y qué no puede tocar sin romper la Intro congelada. Evita los problemas típicos de una experiencia 3D madura: romper el orden de render, reiniciar animaciones por accidente, mezclar responsabilidades entre motor e interfaz, o introducir dependencias que degraden el rendimiento. Es la barrera entre "agregar una sección" y "romper todo".

## 2. Arquitectura general

El proyecto se organiza en cuatro dominios con fronteras claras.

- Motor: la escena 3D y todo lo que vive dentro del canvas —logo, fondo, luces, cámara, tiempo—. Es el corazón congelado. Se ejecuta continuamente y nunca se desmonta.
- Interfaz: las capas que el usuario lee y toca fuera del canvas —overlay de texto de la Hero, futuros controles y contenido DOM—. Se monta sobre el motor sin interferir con él.
- Contenido: el material que llena las secciones futuras —textos, productos, testimonios—. Vive en la interfaz, nunca en el motor.
- Sistema visual: las reglas transversales de marca, color, tipografía y motion que gobiernan tanto motor como interfaz para que todo se lea como un solo producto.

La regla estructural: el motor no conoce el contenido; la interfaz se apoya en el motor; el sistema visual manda sobre ambos.

## 3. Pipeline de render

El render sigue un orden fijo de profundidad, de atrás hacia adelante:

1. Canvas: la superficie única donde vive toda la escena. Ocupa el fondo permanente; nunca se recrea.
2. Escena y fondo: el negro con volumen, las estrellas y la atmósfera, dibujados primero para dar profundidad.
3. Objeto y materiales: el logo y sus superficies, iluminados y compuestos sobre el fondo.
4. Postprocesado: un único pase que realza solo lo que emite luz, sin tocar el resto.
5. Overlay: la capa DOM de interfaz que se sitúa por encima del canvas, sin formar parte de él.
6. Scroll: la dimensión que reencuadra todo lo anterior como respuesta al usuario, sin alterar el orden de las capas.

Cada capa tiene una única responsabilidad y un lugar fijo en la profundidad. Agregar contenido significa sumar a la capa de overlay, nunca reordenar las de abajo.

## 4. Sistema de tiempo

El tiempo es la columna vertebral. Un reloj único gobierna toda la Intro de forma determinista: cada estado visual se deriva de ese valor, no de animaciones independientes.

- Depende del tiempo: la secuencia de ensamblaje de la Intro, del primer frame hasta el estado idle.
- Depende del usuario: la respuesta del logo y del espacio al puntero, que solo cobra efecto una vez alcanzado el estado idle.
- Depende del scroll: el reencuadre hacia el contenido, que solo cobra efecto una vez terminado el ensamblaje.

El reloj nunca se reinicia: avanza una sola vez y queda vivo. La interacción está condicionada al fin del ensamblaje y el scroll a su vez está condicionado por el mismo hito, de modo que ningún gesto temprano puede alterar la secuencia. Reiniciar el tiempo, o desacoplar un sistema de este reloj, rompe la coherencia de toda la escena.

## 5. Cámara

La cámara representa la mirada del usuario dentro del mundo, no una herramienta de espectáculo. Es casi inmóvil: el que se mueve es el objeto, no el punto de vista.

Se comporta con encuadre consciente del formato, de modo que el logo entero entra en cualquier pantalla, y responde al usuario solo con un susurro de movimiento tras el idle. Para el contenido, encuentra un punto de vista nuevo dentro del mismo espacio en lugar de saltar a otro.

Prohibido: movimientos bruscos, giros de cámara, recorridos automáticos que compitan con el objeto, o cualquier desplazamiento que haga sentir que se cambió de escena. La cámara acompaña; nunca protagoniza.

## 6. Iluminación

La luz existe para dar credibilidad y profundidad, no para adornar. Su jerarquía es estricta: un conjunto mínimo de luces fijas modela el objeto, y una única fuente emocional —la energía del logo— es la protagonista lumínica y la única que se realza en el postprocesado.

Nunca se ilumina el fondo de forma que compita con el objeto, ni se agregan fuentes nuevas para "mejorar" una sección. La profundidad se mantiene dejando que la oscuridad domine: el negro es el mayor recurso de iluminación del sistema, porque hace que la poca luz que existe tenga valor. Cada luz nueva sería una deuda contra esa profundidad.

## 7. Materiales

Los materiales buscan lectura de objeto real y fotografiado. Cada familia tiene un rol definido:

- Cerámica: la superficie de la marca. Limpia, mate al frente, con una laca fina que hace reaccionar los bordes a la luz. Comunica calidad tangible.
- Metal: reservado para acentos estructurales; reflectante y sobrio, nunca brillante ni ostentoso.
- Vidrio: presencia sutil, para dar cuerpo y refracción donde haga falta profundidad, sin llamar la atención.
- Glow: exclusivo de la energía emisiva de la marca; contenido, nunca neón, y la única superficie que cruza el realce del postprocesado.

Nunca debe parecer plástico: eso ocurre cuando el brillo es uniforme y ancho, cuando falta micro-rugosidad, o cuando el material tiene tinte gris en lugar de blanco puro. La regla es que la superficie se sienta pesada y captada por una cámara, no calculada.

## 8. Interacción

La interacción se rige por un principio: el usuario influye levemente sobre el objeto, nunca comanda la escena.

- Mouse: mueve solo el logo, con un rango pequeño y respuesta amortiguada. El resto del mundo apenas reacciona.
- Touch: equivalente sobrio en pantallas táctiles; nunca introduce gestos propios ni controles visibles que rompan la calma.
- Scroll: es la única dimensión que reencuadra la escena y descubre el contenido; pertenece al usuario y su ritmo.
- Parallax: la profundidad responde con capas que se desplazan a distinto ritmo, siempre sutil, para reforzar la sensación de espacio real.
- Inercia: todo movimiento arranca tarde, acelera despacio y asienta sin rebote. La masa es la sensación central; nada se siente liviano ni pegado al cursor.

La interacción solo puede comenzar una vez que el ensamblaje de la Intro terminó y la escena alcanzó su estado estable. Antes de ese momento, ningún gesto del usuario altera nada: la primera impresión está protegida por diseño.
