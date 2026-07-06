# 16 — IMPLEMENTATION RULES

Reglas obligatorias para implementar All Import V2 sin romper la filosofía del proyecto. Referencia obligatoria: `01`–`15`. Complementa `02` (sistema visual), `03` (Intro congelada) y `07` (arquitectura técnica) sin repetirlos: esto no describe cómo está construido, sino qué está permitido y qué no al construir V2. Nota: es un documento de reglas; las 11 secciones estándar se reinterpretan al dominio de implementación.

## 1. Objetivo del documento

Proteger la continuidad narrativa y la identidad premium cuando se pase de la documentación al código. Evita que una decisión de implementación —una librería, un patrón, un efecto— contradiga la experiencia definida en `01`–`15`. Justificación: toda la narrativa vale cero si la implementación la traiciona; este documento es el guardián.

## 2. Estado del proyecto al empezar V2

La Intro está congelada y documentada (`03`, `07`). La landing DOM existe en estado inicial e incompleto (componente `Reveal`, datos en `data.ts`, secciones en `sections/`), sin terminar. El hosting es export estático a GitHub Pages: no hay servidor. Justificación: partir de este estado real evita reconstruir lo que ya sirve y respeta el techo técnico existente.

## 3. Qué debe lograr la implementación

Una sola experiencia continua: la Intro fluye al Hero y a las secciones sin cortes ni cambios de página. Cada sección implementa exactamente la intención de su documento (`08`–`15`), con el peso de movimiento y la paleta del sistema. El resultado debe sentirse como un producto, no como páginas pegadas. Justificación: `04` y `02` exigen continuidad y consistencia; la implementación es donde se ganan o se pierden.

## 4. Función dentro del sistema de documentos

Es la capa de traducción: convierte la filosofía (`01`), el sistema visual (`02`) y las experiencias (`08`–`15`) en restricciones concretas de código. No inventa dirección; hace cumplir la existente. Justificación: cierra el círculo entre diseño e implementación sin abrir decisiones nuevas.

## 5. Principios de implementación

- No tocar la Intro: es congelada. V2 se construye alrededor, nunca encima (`03`).
- Reutilizar antes que reconstruir: motor 3D, `Reveal`, `data.ts`, docs, CI ya existen.
- Datos separados de presentación: todo el contenido (productos, pasos, testimonios) vive en datos, no en el markup.
- WhatsApp es la única acción: no hay carrito, checkout ni pago en el sitio.
- Un solo CTA por sección; el cyan solo como acción o acento mínimo.
- Movimiento con peso siempre; revelado por scroll respetando la jerarquía.
- Accesibilidad: la marca 3D lleva nombre accesible; foco visible; `prefers-reduced-motion` respetado.
- Mobile-first: la mayoría llega desde el celular; el botón de contacto siempre a un toque.

Justificación: cada principio hace cumplir una regla de `01`/`02`/`03` o una realidad del negocio (`05`).

## 6. Qué comunicar en cada implementación

Que todo pertenece al mismo mundo: mismo negro dominante, misma tipografía, mismo peso de movimiento, misma proporción de color. Cada sección comunica su única intención documentada y nada más. Justificación: `02` exige que una sección se lea al lado de cualquier otra como el mismo producto.

## 7. Qué nunca hacer

- Modificar la Intro, su timeline, cámara, materiales, luz o parámetros (`03`).
- Introducir carrito, pago online, backend de pedidos o auth sin decidir antes el hosting (hoy es estático — `07`).
- Usar nombres de marca registrada o imágenes de producto con marca visible (riesgo legal).
- Servir imágenes sin optimizar: hay que comprimirlas/convertir a formato liviano antes de usarlas.
- Copiar patrones de e-commerce tradicional (filtros, grillas densas, estrellas, urgencia).
- Agregar librerías pesadas o efectos nuevos sin propósito narrativo.
- Un cuarto color, cyan como fondo amplio, o texto largo que nadie lee.

Justificación: cada prohibición evita romper la Intro, la ley (marcas), el rendimiento (imágenes) o la identidad (`01`, `02`, `10`).

## 8. Errores prohibidos

- Empezar V2 sobre un árbol git sucio o un build roto: primero dejar el repo limpio y compilando.
- Meter contenido hardcodeado en los componentes en vez de en datos.
- Romper la continuidad con la Intro (corte, carga, pantalla intermedia).
- Implementar una sección ignorando su documento de experiencia.
- Subir imágenes de varios MB sin optimizar y hundir Core Web Vitals.
- Duplicar lógica ya resuelta (revelado, enlaces a WhatsApp, datos).

Justificación: cada error nace de la auditoría del proyecto y de `04`/`07`; todos son prevenibles.

## 9. Relación con la sección anterior (documentos 01–15)

Depende de todos: hace cumplir la marca (`01`), el sistema visual (`02`), la Intro congelada (`03`), la arquitectura (`07`) y cada experiencia de sección (`08`–`15`). No los repite; los convierte en límites de código. Justificación: es la última capa del sistema documental, la que aterriza todo lo anterior.

## 10. Relación con lo que sigue (el código)

Es la puerta al desarrollo: ninguna línea de V2 debería escribirse sin pasar este filtro. Toda propuesta de implementación se valida contra estas reglas y contra el checklist de `02`. Justificación: garantiza que el salto a código no degrade la experiencia diseñada.

## 11. Regla final

Si una decisión de implementación no puede justificarse contra un documento del `01` al `15`, no entra a All Import V2. Ante la duda: no rompas la Intro, no imites un e-commerce, y elegí la solución más simple que cumpla la intención.
