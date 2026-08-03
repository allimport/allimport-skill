# generadas/ — historias editadas puntuales

Piezas editadas a mano (no por `editar_fotos.py`, que matchea por keyword de producto)
para pedidos específicos del dueño. Cada una queda documentada acá.

## restock-01.jpg
Foto real de stock (parlantes JBL, ELFBAR, cajas Apple) con fondo navy casi opaco (foto
apenas visible, pedido explícito) + mensaje de reposición + CTA de reventa/inversión.
Basada en hallazgo de investigación: minimalismo + foto real + coherencia visual genera
confianza (ver `allimport/contenido/HALLAZGOS-VIRALES.md`). Lista para subir a historias de Instagram.

## restock-02-organico.jpg
Versión sin marca (sin logo, sin marco, sin caja de botón), texto alineado a la
izquierda como si lo hubiera escrito la persona directo en Instagram. CTA cambiado a
"hablame por acá" (no WhatsApp — es para publicar como el dueño, desde su cuenta personal).

## restock-03-organico.jpg
Mensaje reescrito por Claude (no el texto literal dictado por el dueño) + estilo de
texto nativo de Instagram investigado y replicado: el estilo **"Strong"** de IG Stories
(pill blanco redondeado detrás de cada línea, texto en negro, negrita) para el titular,
combinado con texto plano estilo **"Classic"** para el resto — son 2 de los 4 estilos
nativos que ofrece Instagram (Classic, Modern, Neon, Typewriter, Strong). Mismo fondo
casi negro y foto apenas visible que la v2, sin logo ni marco. CTA propio: invita a
vender o invertir y cierra con "hablame por acá, te cuento cómo arranqué yo".

## restock-04-organico.jpg
Segunda tanda de stock (foto nueva: cables, cargadores, JBL, ELFBAR, cajas Apple), mismo
tratamiento validado: fondo casi negro (foto apenas visible), estilo "Strong" de IG en el
titular ("repusimos todo / otra vez"), texto plano abajo, CTA propio "hablame por acá".
Nota técnica: la foto original era más "ancha" que el 9:16 de una story — se probó primero
contener la imagen entera sobre un fondo plano y quedó un borde visible (se notaba el
recorte); se corrigió recortando a pantalla completa (mismo método que v2/v3), sin costuras.

## restock-05-organico.jpg
Misma foto que v4, texto elegido por el dueño (opción 3, con el detalle de productos
cambiado por "consultame precios y productos disponibles" en vez de listarlos). Se evaluó
armarla con Claude en Chrome directo en Instagram (falló: el editor de historias de IG es
un canvas, no navegable por un agente de browser) y con Canva (bloqueado: el conector no
permite subir fotos privadas del dueño a menos que ya sean públicas — no se hizo por
seguridad). Se resolvió con el mismo método de Pillow ya validado.

## restock-06-organico.jpg
Misma foto y texto que v5, con la regla de "look profesional" aplicada: un solo estilo
para el título (Strong: pill blanco + texto negro) y un solo estilo para el resto
(Classic), sin mezclar. Un único color de acento en toda la pieza — la frase "hablame por
acá" resaltada en el celeste/cyan real de la marca (`#00d4d4`, el mismo de `web/`) dentro
del renglón del CTA — el resto del texto queda en blanco/negro. Menos variedad = más
prolijo. También se armó una versión equivalente directo en Canva (diseño del dueño,
`DAHQzI7tICs`): fondo semi-transparente + pills + texto ya está, falta que el dueño
inserte su foto ahí y la mande al fondo (instrucciones dadas en el chat).
