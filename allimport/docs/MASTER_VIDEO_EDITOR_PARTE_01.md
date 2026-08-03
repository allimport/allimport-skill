# MASTER VIDEO EDITOR — PARTE 01
## Manual profesional de edición de video para Claude Code
### Capítulos 1–8: Filosofía, Objetivos, Roles, Mentalidad, Principios, Workflow, Pipeline y Descubrimiento

---

> **Propósito de este documento:** ser la referencia definitiva, exhaustiva y operativa para que un agente de IA (Claude Code) o un editor humano edite video de cualquier tipo, formato, plataforma y nivel de complejidad. No es un resumen, no es un overview, no es una guía rápida. Es un manual completo con árboles de decisión IF/THEN/ELSE, checklists, tablas, diagramas y ejemplos concretos, calibrado para el ecosistema de herramientas y el contexto de marca de All Import (@allimport.cba / @_agus_moreno_).

> **Cómo navegar:** cada capítulo tiene su tabla de contenido interna. Los cross-references entre partes usan el formato `[→ PARTE_XX §Capítulo]`. Las decisiones en formato de árbol usan indentación con IF/THEN/ELSE explícito.

---

# TABLA DE CONTENIDO — PARTE 01

1. [Capítulo 1: Filosofía de la edición](#capítulo-1-filosofía-de-la-edición)
2. [Capítulo 2: Objetivos por tipo de video](#capítulo-2-objetivos-por-tipo-de-video)
3. [Capítulo 3: Roles del editor](#capítulo-3-roles-del-editor)
4. [Capítulo 4: Mentalidad del editor de alto rendimiento](#capítulo-4-mentalidad-del-editor-de-alto-rendimiento)
5. [Capítulo 5: Principios fundamentales](#capítulo-5-principios-fundamentales)
6. [Capítulo 6: Workflow maestro (de guion a publicación)](#capítulo-6-workflow-maestro-de-guion-a-publicación)
7. [Capítulo 7: Pipeline técnico completo](#capítulo-7-pipeline-técnico-completo)
8. [Capítulo 8: Descubrimiento del proyecto](#capítulo-8-descubrimiento-del-proyecto)

---

# Capítulo 1: Filosofía de la edición

## 1.1 Qué es editar video (y qué no es)

Editar video no es "cortar y pegar clips". Editar video es **construir una experiencia temporal** — una secuencia de estímulos visuales, sonoros y textuales que controla la atención del espectador segundo a segundo. El editor no es un operador técnico; es un **arquitecto de la atención**.

### 1.1.1 Las tres capas de la edición

```
┌─────────────────────────────────────────────────────┐
│                  CAPA NARRATIVA                     │
│   ¿Qué historia se cuenta? ¿Qué arco tiene?        │
│   ¿Qué debe sentir el espectador al final?          │
├─────────────────────────────────────────────────────┤
│                  CAPA RÍTMICA                        │
│   ¿A qué velocidad se entregan los estímulos?       │
│   ¿Dónde están los picos y los valles de energía?   │
│   ¿Cuántos beats por segundo tiene cada sección?    │
├─────────────────────────────────────────────────────┤
│                  CAPA TÉCNICA                        │
│   ¿Qué herramienta ejecuta cada decisión?           │
│   ¿Qué codec, qué resolución, qué filtro?           │
│   ¿Cómo se mantiene el sync audio/video?            │
└─────────────────────────────────────────────────────┘
```

**Regla inquebrantable:** la capa narrativa manda sobre la rítmica, y la rítmica manda sobre la técnica. Nunca se toma una decisión técnica (codec, transición, filtro) sin tener clara la decisión narrativa que la origina.

### 1.1.2 El editor como traductor

El editor traduce **intención** a **estímulo**:
- El guionista dice "acá el espectador debería sentir que se perdió de algo" → el editor traduce eso a un corte abrupto + riser + notificación falsa de celular + texto "¿ya lo sabías?"
- El creador dice "quiero que se sientan identificados" → el editor traduce eso a B-roll de situaciones cotidianas + foley hiper-real (sonido de WhatsApp, tecleo de celular) + subtítulo con emojis en tono conversacional

### 1.1.3 Árbol de decisión: ¿Estoy editando o estoy decorando?

```
IF el corte/efecto/transición que voy a agregar tiene una razón narrativa clara
    (retener atención, reforzar un dato, crear anticipación, cambiar de tema)
    THEN es edición → proceder
ELSE IF el corte/efecto es "porque queda lindo" o "porque vi que otro lo hacía"
    THEN es decoración → PAUSA
    IF eliminar el efecto empobrece el video
        THEN mantenerlo, pero documentar la razón real (no "queda lindo")
    ELSE
        eliminarlo — cada elemento sin función es ruido que baja la retención
    END
END
```

## 1.2 Las tres leyes de la edición de formato corto

### Ley 1: El primer segundo es el video entero

```
IF la retención al segundo 1 es menor al 70%
    THEN el video está muerto antes de empezar
    → Rehacer el hook (visual + sonoro + textual)
    → No tiene sentido optimizar el resto hasta que el hook funcione
END
```

El primer segundo no es "la intro". Es una promesa comprimida de lo que el espectador va a recibir si se queda. Elementos que deben estar presentes en el primer segundo:

| Elemento | Función | Ejemplo concreto |
|---|---|---|
| Movimiento visual inmediato | Detener el scroll | Whip-pan, snap-zoom, hard cut desde negro |
| Sonido de impacto | Anclaje auditivo | Bass hit, Vine Boom, impact cinematográfico |
| Texto gancho (2-5 palabras) | Promesa narrativa | "Nadie te dice esto", "Error #1", "Probé por vos" |
| Rostro/sujeto en frame | Conexión humana | Close-up, mirada a cámara |

### Ley 2: Cada 3-5 segundos, algo debe cambiar

```
IF pasaron más de 5 segundos sin ningún cambio de estímulo
    (cambio de plano, SFX, texto nuevo, B-roll, zoom, corte)
    THEN insertar un pattern interrupt
    → Tipos válidos: cambio de tamaño de plano, corte a B-roll,
      screen recording, resultado antes del proceso, subtítulo reformulado
END
```

El cerebro humano procesa la novedad como señal de relevancia. Si el estímulo se mantiene estático por más de 5 segundos, el algoritmo interno del espectador dice "ya vi esto, siguiente". Esto no significa que cada 3 segundos haya que poner un efecto de fuegos artificiales — significa que cada 3-5 segundos **algo** tiene que ser distinto al intervalo anterior.

### Ley 3: El audio es el 50% de la retención (mínimo)

```
IF el video tiene buen visual pero audio plano (sin SFX, sin música, sin variación)
    THEN la retención caerá entre un 20-35% respecto a la versión con audio diseñado
    → Nunca entregar un video sin diseño sonoro completo
    → El diseño sonoro no es "agregar música de fondo" — es asignar un efecto
      a cada función narrativa [→ PARTE_01 §5.3]
END
```

## 1.3 Filosofía específica por plataforma

### 1.3.1 Tabla comparativa: la edición no es universal

| Dimensión | TikTok | Instagram Reels | YouTube Shorts | YouTube largo | Podcast video |
|---|---|---|---|---|---|
| Duración óptima | 15-60s | 30-90s | 15-60s | 8-25min | 30-120min |
| Tolerancia a edición agresiva | Muy alta | Media | Alta | Baja-media | Muy baja |
| SFX por minuto (rango ideal) | 12-20 | 8-14 | 10-18 | 4-8 | 1-3 |
| Pattern interrupts por minuto | 12-20 (1 cada 3-5s) | 8-15 (1 cada 4-7s) | 10-18 | 4-8 | 1-3 |
| Música de fondo | Trending audio o sin música | Trending o marca propia | Trending | Marca propia/library | Opcional/ambiente |
| Subtítulos | Obligatorios, kinetic | Obligatorios, kinetic | Obligatorios, kinetic | Recomendados, más simples | Recomendados |
| Formato | 9:16 vertical | 9:16 vertical | 9:16 vertical | 16:9 horizontal | 16:9 horizontal |
| Primer frame | Movimiento + impacto visual | Curado, "portada compartible" | Movimiento + impacto | Thumbnail estática | Thumbnail estática |
| Métrica clave | % de finalización | Sends per reach + watch time | % finalización | CTR + watch time | Retención minuto 8 |

### 1.3.2 Árbol de decisión: ¿Cómo ajusto mi edición según la plataforma?

```
IF plataforma destino = TikTok
    THEN
        densidad_sfx = MÁXIMA (tabla de sound-design-short-video completa)
        pattern_interrupts = cada 3 segundos mínimo
        pacing = frenético, cortes rápidos, zoom punches
        primer_frame = energía cruda, movimiento inmediato
        transiciones = agresivas (glitch, whip, snap-zoom)
        música = trending audio SI está disponible, SINO beat original
ELSE IF plataforma destino = Instagram Reels
    THEN
        densidad_sfx = MEDIA-ALTA (mismos SFX, pero menos impacts por segundo)
        pattern_interrupts = cada 4-5 segundos
        pacing = dinámico pero no frenético
        primer_frame = curado, "portada compartible" (pensar en sends)
        transiciones = limpias (whoosh suave, fade corto, zoom cut)
        música = trending O marca propia
ELSE IF plataforma destino = YouTube Shorts
    THEN
        densidad_sfx = ALTA (similar a TikTok)
        pattern_interrupts = cada 3-4 segundos
        pacing = rápido
        primer_frame = hook visual fuerte
        transiciones = variadas
        música = trending O original
ELSE IF plataforma destino = YouTube largo
    THEN
        densidad_sfx = BAJA-MEDIA (4-8 por minuto)
        pattern_interrupts = cada 15-30 segundos
        pacing = respirado, con momentos de calma intencional
        primer_frame = N/A (thumbnail estática)
        transiciones = sutiles (dissolve, L-cut, J-cut)
        música = library/marca propia
ELSE IF plataforma destino = podcast video
    THEN
        densidad_sfx = MÍNIMA (solo en transiciones de tema)
        pattern_interrupts = cambio de cámara/plano cada 15-45s
        pacing = conversacional
        transiciones = corte directo o dissolve suave
        música = intro/outro solamente, o ambient muy bajo
END
```

## 1.4 La ética del editor

### 1.4.1 Lo que NUNCA se hace

| Práctica prohibida | Por qué | Alternativa |
|---|---|---|
| Falsear prueba social (vistas/likes inventados) | Destruye la confianza a largo plazo | Mostrar resultados reales, por modestos que sean |
| Usar nombres de marca ajena (AirPods, JBL, Samsung) | Riesgo legal de trademark | Descripciones genéricas: "Auriculares TWS", "Parlante portátil" |
| Falsa escasez ("¡ÚLTIMO DÍA!") cuando no es verdad | Desgasta el recurso para cuando sea real | Escasez honesta: "Últimas X unidades — no traemos más" si es verdad |
| Prometer lo que no se puede cumplir ("mejor del mundo") | Expectativas imposibles → devoluciones | Afirmaciones verificables: "Calidad real, precio de importación" |
| Métricas inventadas ("+1000 clientes felices" si no es real) | Es mentir | Omitir o usar las reales |
| Sobrevender en cada pieza | Fatiga de audiencia | Valor primero, venta después: 80% contenido / 20% venta |

### 1.4.2 La honestidad como estrategia

```
IF el producto es réplica
    THEN decirlo (no mentir) pero posicionarlo:
        "Calidad de importación directa, sin el markup de marca"
        "Lo probás en mano antes de pagar"
ELSE IF el stock es real y bajo
    THEN se puede usar escasez honesta:
        "Últimas unidades — cuando se acaban, se acaban"
ELSE IF el stock no es bajo
    THEN NO usar escasez → enfocarse en el valor del producto
END
```

---

# Capítulo 2: Objetivos por tipo de video

## 2.1 Taxonomía completa de tipos de video

```
VIDEOS
├── FORMATO CORTO (< 3 min)
│   ├── Talking Head Reel (1 persona a cámara)
│   ├── Producto en mano (showcase/unboxing)
│   ├── Tutorial rápido / How-to
│   ├── Behind the scenes (BTS)
│   ├── Storytime / Anécdota
│   ├── Trend / Challenge
│   ├── Comparación (Producto A vs B)
│   ├── Reacción
│   ├── Lista / Top X
│   ├── Antes/Después
│   ├── Screen recording (demostración digital)
│   └── Meme / humor puro
│
├── FORMATO MEDIO (3-15 min)
│   ├── Vlog de emprendimiento
│   ├── Tutorial paso a paso
│   ├── Review de producto extendido
│   ├── Day in the life
│   ├── Q&A con audiencia
│   └── Haul de productos
│
├── FORMATO LARGO (> 15 min)
│   ├── Documental de marca
│   ├── Podcast video (2+ personas)
│   ├── Curso / clase
│   ├── Análisis profundo
│   └── Compilación / recopilación
│
├── HISTORIAS (efímeras, 24h)
│   ├── Restock (producto nuevo)
│   ├── Encuesta / Interacción
│   ├── Detrás de escena informal
│   ├── Promoción directa
│   └── Secuencia narrativa (3-7 stories)
│
├── CARRUSELES (estáticas con scroll)
│   ├── Educativo (paso a paso)
│   ├── Catálogo de productos
│   ├── Antes/Después
│   ├── Mini-guía visual
│   └── Storytelling visual (sin video)
│
└── COMERCIALES / ADS
    ├── Ad para feed (in-feed)
    ├── Ad para stories
    ├── Ad para Reels
    └── UGC ad (aspecto orgánico)
```

## 2.2 Matriz de objetivos por tipo de video

| Tipo de video | Objetivo primario | Objetivo secundario | Métrica clave | Duración ideal |
|---|---|---|---|---|
| Talking Head Reel | Alcance / viralidad | Autoridad personal | % finalización | 15-45s |
| Producto en mano | Venta directa | Confianza | Saves + DMs | 15-30s |
| Tutorial rápido | Saves / valor percibido | Alcance | Saves | 30-60s |
| BTS | Humanización de marca | Engagement | Comentarios | 15-30s |
| Storytime | Engagement emocional | Alcance viral | Shares | 30-90s |
| Trend / Challenge | Alcance masivo | Relevancia cultural | Shares + views | 7-15s |
| Comparación | Decisión de compra | Autoridad | Saves + DMs | 30-60s |
| Reacción | Engagement | Alcance | Comentarios | 15-30s |
| Lista / Top X | Saves / valor | Alcance | Saves | 30-60s |
| Antes/Después | Prueba visual | Venta | Shares | 15-30s |
| Screen recording | Tutorial / prueba | Credibilidad | Saves | 30-60s |
| Meme / humor | Shares / viralidad | Identidad de marca | Shares | 7-15s |
| Vlog emprendimiento | Comunidad / conexión | Autoridad | Watch time | 5-10min |
| Tutorial extenso | Autoridad / SEO | Suscriptores | Watch time + saves | 5-15min |
| Podcast video | Autoridad profunda | Comunidad | Retención min 8+ | 30-120min |
| Historia de restock | Venta directa | Urgencia honesta | Swipe-ups / DMs | 15s (por historia) |
| Carrusel educativo | Saves / alcance | Autoridad | Saves + shares | 5-10 slides |
| Ad in-feed | Conversión | Conocimiento de marca | CTR + CPA | 15-30s |
| UGC ad | Conversión con confianza | Engagement | CTR + conv. rate | 15-45s |

## 2.3 Árboles de decisión: ¿Qué tipo de video necesito?

### 2.3.1 Según el objetivo de negocio

```
IF objetivo = "conseguir más seguidores / alcance"
    THEN
        IF tengo un dato/opinión/historia impactante
            THEN → Talking Head Reel o Storytime
        ELSE IF hay un trend activo relevante al nicho
            THEN → Trend / Challenge adaptado al producto
        ELSE IF tengo un resultado visual impactante
            THEN → Antes/Después o Comparación
        ELSE
            → Lista / Top X (siempre funciona como fallback de alcance)
        END
ELSE IF objetivo = "vender un producto específico"
    THEN
        IF el producto se ve mejor en mano
            THEN → Producto en mano (showcase)
        ELSE IF necesito explicar cómo funciona
            THEN → Tutorial rápido con el producto
        ELSE IF tengo stock limitado (de verdad)
            THEN → Historia de restock con urgencia honesta
        ELSE
            → Comparación con alternativa más cara
        END
ELSE IF objetivo = "construir autoridad / confianza"
    THEN
        IF tengo conocimiento específico del nicho
            THEN → Tutorial extenso o Carrusel educativo
        ELSE IF tengo una historia personal relevante
            THEN → Storytime o Vlog de emprendimiento
        ELSE IF puedo mostrar el "detrás de" lo que hago
            THEN → BTS
        ELSE
            → Q&A respondiendo preguntas reales de la audiencia
        END
ELSE IF objetivo = "engagement / comunidad"
    THEN
        IF quiero risas/compartidos
            THEN → Meme o Reacción
        ELSE IF quiero opiniones/debate
            THEN → Comparación o pregunta polémica (Talking Head)
        ELSE IF quiero interacción directa
            THEN → Historia con encuesta/quiz
        ELSE
            → BTS casual (humaniza sin esfuerzo)
        END
END
```

### 2.3.2 Según los recursos disponibles

```
IF tengo menos de 15 minutos para grabar
    THEN
        IF tengo buena luz natural ahora
            THEN → Talking Head Reel (1 toma, cortar silencios)
        ELSE
            → Screen recording + voz en off
        END
ELSE IF tengo 15-60 minutos para grabar
    THEN
        IF tengo producto físico
            THEN → Producto en mano + B-roll del producto
        ELSE
            → Tutorial o Storytime con A-roll + B-roll
        END
ELSE IF tengo más de 1 hora
    THEN
        IF tengo a otra persona disponible
            THEN → Podcast video o Vlog largo
        ELSE
            → Tutorial extenso paso a paso o Vlog de emprendimiento
        END
END
```

## 2.4 Checklist: objetivos definidos antes de editar

Antes de tocar cualquier clip, responder estas 8 preguntas:

- [ ] **¿Cuál es el objetivo primario?** (alcance / venta / autoridad / engagement)
- [ ] **¿Cuál es la plataforma principal de destino?** (TikTok / IG Reels / YouTube / Historias)
- [ ] **¿Se adapta a alguna plataforma secundaria?** (mismo clip, distinta intensidad)
- [ ] **¿Cuál es la métrica clave?** (% finalización / saves / shares / DMs / watch time)
- [ ] **¿Qué tipo de video es?** (según taxonomía §2.1)
- [ ] **¿Cuánto dura idealmente?** (según tabla §2.2)
- [ ] **¿Qué debe sentir el espectador al final?** (motivado / informado / entretenido / urgido)
- [ ] **¿Cuál es la acción deseada del espectador?** (seguir / guardar / compartir / escribir por WhatsApp / comprar)

---

# Capítulo 3: Roles del editor

## 3.1 Los 7 sombreros del editor solitario

Cuando se trabaja solo (como en All Import), el editor usa todos los sombreros. Cada sombrero tiene su propio conjunto de preguntas y criterios de decisión.

```
┌──────────────────────────────────────────────────────────┐
│                    EL EDITOR SOLITARIO                    │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ DIRECTOR │  │ COLORISTA│  │ SONIDISTA│              │
│  │ DE CORTE │  │          │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │TIPÓGRAFO │  │ MOTION   │  │  QUALITY │              │
│  │          │  │ DESIGNER │  │ ASSURANCE│              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────────────────────┐                            │
│  │   PUBLICADOR / EXPORTADOR│                            │
│  └──────────────────────────┘                            │
└──────────────────────────────────────────────────────────┘
```

### 3.1.1 Director de corte

**Responsabilidades:**
- Decidir qué se queda y qué se corta del material crudo
- Establecer el ritmo y el pacing del video
- Determinar el orden de las tomas
- Colocar los pattern interrupts

**Preguntas que debe hacerse:**
- "¿Este segmento aporta a la narrativa o solo llena tiempo?"
- "¿El ritmo de este tramo es coherente con los 3-5 segundos anteriores?"
- "¿Hay un pattern interrupt en los últimos 5 segundos?"
- "¿El hook del primer segundo es lo suficientemente agresivo?"

**Árbol de decisión: ¿Corto o conservo este segmento?**

```
IF el segmento es silencio/pausa de más de 0.5 segundos
    THEN
        IF es una pausa dramática intencional (pausa para efecto, no para pensar)
            THEN conservar, pero acortar a 0.3-0.5s máximo
        ELSE
            cortar (usar pipeline cut-silence.mjs con threshold -30dB)
        END
ELSE IF el segmento repite algo que ya se dijo
    THEN cortar la versión más débil, conservar la más enérgica
ELSE IF el segmento es interesante pero no aporta al objetivo del video
    THEN cortar → guardarlo como clip para otro video futuro
ELSE IF el segmento tiene un error técnico (foco, audio, iluminación)
    THEN
        IF el error es corregible en post (ruido de audio, color)
            THEN conservar y corregir
        ELSE IF el contenido es irremplazable (reacción única, dato clave)
            THEN conservar con el error — el contenido > la perfección técnica
        ELSE
            cortar
        END
ELSE
    conservar
END
```

### 3.1.2 Colorista

**Responsabilidades:**
- Establecer el look visual del video (LUT, corrección de color, contraste)
- Coherencia de color entre tomas
- B-roll a blanco y negro cuando hay texto en pantalla

**Árbol de decisión: ¿Qué tratamiento de color aplico?**

```
IF tipo de video = contenido orgánico (reel, BTS, storytime)
    THEN
        IF el material crudo se ve bien con luz natural
            THEN ajuste mínimo: contraste +5-10%, saturación -5%, highlights -10%
        ELSE IF la luz es fría/fluorescente
            THEN calentar balance de blancos + subir shadows
        ELSE IF la luz es mixta (ventana + artificial)
            THEN shot-by-shot: unificar temperatura
        END
ELSE IF tipo de video = contenido premium (ad, comercial, documental)
    THEN
        aplicar LUT de referencia + ajustar por shot
        priorizar coherencia entre todas las tomas
ELSE IF tipo de video = B-roll para texto en pantalla
    THEN
        desaturar a blanco y negro o 80% desaturado
        esto hace que el texto de color (cyan, amarillo) resalte
END
```

### 3.1.3 Sonidista (diseñador de sonido)

**Responsabilidades:**
- Asignar SFX a cada función narrativa del guion
- Elegir y colocar música de fondo
- Mezclar niveles (voz vs. música vs. SFX)
- Implementar SFX tonales cuando hay música

**Referencia completa:** skills/sound-design-short-video/SKILL.md + references/

**Niveles de mezcla estándar:**

| Pista | Nivel relativo | Notas |
|---|---|---|
| Voz (A-roll) | 0 dB (referencia) | La voz siempre es la prioridad |
| Música de fondo | -18 a -12 dB bajo la voz | Baja durante voz, puede subir en momentos sin voz |
| SFX principales (impacts, risers) | -6 a -3 dB bajo la voz | Se sienten presentes pero no tapan la voz |
| SFX de ambiente/foley | -12 a -8 dB bajo la voz | Subliminal, no consciente |
| Silencio intencional | -inf (mute) | Usarlo como efecto dramático antes de un dato clave |

### 3.1.4 Tipógrafo

**Responsabilidades:**
- Elegir las fuentes para subtítulos, títulos, overlays
- Definir los estilos de animación de texto
- Mantener la coherencia tipográfica con la marca

**Fuentes disponibles del sistema All Import:**

| Uso | Fuente | Ubicación |
|---|---|---|
| Subtítulos / captions (cuerpo) | Montserrat Bold | allimport/historias/fonts/ |
| Títulos / headers | Montserrat Alternates Bold | allimport/historias/fonts/ |
| Palabra clave resaltada | Montserrat Bold, color CYAN #00d4d4 o AMARILLO #f7c204 | - |
| Logo / wordmark | Montserrat Alternates Bold | allimport/historias/fonts/ |

**Árbol de decisión: ¿Qué tipografía uso?**

```
IF elemento = subtítulo palabra por palabra
    THEN Montserrat Bold (o sans bold equivalente)
    color_base = WHITE #f8fafa con contorno negro
    color_keyword = CYAN #00d4d4 o AMARILLO #f7c204
ELSE IF elemento = título de portada/hook
    THEN
        IF tono = premium/serio
            THEN serif editorial (Playfair Display, o banco del usuario: Bezoria, Elegant)
        ELSE IF tono = divertido/nostálgico
            THEN groovy/burbuja (Bubbles Groove, Groovy Gum)
        ELSE IF tono = marca All Import
            THEN Montserrat Alternates Bold
        END
ELSE IF elemento = logo
    THEN Montserrat Alternates Bold (consistencia de marca)
ELSE IF elemento = nota "escrita a mano"
    THEN handwritten font + SFX de lápiz/pluma (Shender Pen)
ELSE IF elemento = quote/cita
    THEN ligature/script (Baginda, Hanley Pro, The Silver Editorial)
END

Regla: NUNCA mezclar más de 2 categorías de tipografía en el mismo video
```

### 3.1.5 Motion designer

**Responsabilidades:**
- Animar textos (kinetic captions)
- Crear transiciones personalizadas
- Animar overlays (contadores, notificaciones, logos)
- Zoom punches y micro-shifts

**Tipos de animación según contexto:**

| Contexto | Animación | Timing |
|---|---|---|
| Subtítulo que aparece | Fade in rápido (0.1s) o pop (escala 0→100% en 0.08s) | Sincronizado frame-accurate con la sílaba pronunciada |
| Palabra clave resaltada | Scale up 110% + color change | 0.1s de duración |
| Logo de marca/herramienta | Slide in desde la derecha + pop | 0.15s entrada, 1-2s en pantalla, 0.1s salida |
| Contador ascendente (dinero/vistas) | Incremento rápido de cifra | Sincronizado con la mención verbal |
| Notificación falsa | Slide in desde arriba (simulando iOS/Android) | 0.2s entrada, 2-3s visible, 0.15s salida |
| Zoom punch (énfasis) | Scale 100%→110%→100% | 0.15s total, sincronizado con impact SFX |
| Transición whoosh entre planos | Blur lateral 0→15px→0 + slide | 0.2-0.3s |

### 3.1.6 Quality Assurance (QA)

**Responsabilidades:**
- Verificar sync audio/video
- Detectar glitches visuales (frames negros, artefactos de codec)
- Revisar ortografía de subtítulos
- Confirmar que la resolución/framerate es correcta para la plataforma
- Verificar safe zones (que nada importante quede tapado por la UI de la plataforma)

**Checklist de QA completo:** [→ PARTE_05 §Capítulo QA]

### 3.1.7 Publicador / exportador

**Responsabilidades:**
- Exportar en la resolución y codec correcto para cada plataforma
- Agregar metadatos (título, descripción, hashtags)
- Programar publicación en horario óptimo
- Verificar que el archivo subido se ve igual que la preview

**Especificaciones de exportación por plataforma:**

| Plataforma | Resolución | Codec | Bitrate mínimo | FPS | Formato |
|---|---|---|---|---|---|
| TikTok | 1080×1920 (9:16) | H.264 | 6 Mbps | 30 | .mp4 |
| Instagram Reels | 1080×1920 (9:16) | H.264 | 6 Mbps | 30 | .mp4 |
| Instagram Stories | 1080×1920 (9:16) | H.264 | 5 Mbps | 30 | .mp4 |
| YouTube Shorts | 1080×1920 (9:16) | H.264 | 8 Mbps | 30/60 | .mp4 |
| YouTube largo | 1920×1080 (16:9) | H.264/H.265 | 12-20 Mbps | 30/60 | .mp4 |
| Feed cuadrado | 1080×1080 (1:1) | H.264 | 5 Mbps | 30 | .mp4 |

---

# Capítulo 4: Mentalidad del editor de alto rendimiento

## 4.1 Los 10 principios de mentalidad

### Principio 1: "Done is better than perfect, pero chapucero es peor que no publicar"

```
IF el video cumple con:
    - hook funcional (primer segundo atractivo)
    - audio limpio (sin ruido excesivo, voz audible)
    - al menos 1 pattern interrupt cada 5 segundos
    - subtítulos legibles
    - mensaje claro y coherente
    THEN publicar — la iteración mejora más que la perfección previa
ELSE IF falta alguno de los 5 puntos anteriores
    THEN NO publicar — un video malo es peor que ninguno
    → Arreglar lo que falta antes de subir
END
```

### Principio 2: "El feedback es el algoritmo"

No se edita "para el gusto propio". Se edita para la retención medible. El algoritmo es el juez final:

```
IF retención promedio > 80%
    THEN el estilo de edición está funcionando → documentar qué hiciste bien
ELSE IF retención promedio entre 50-80%
    THEN el contenido es bueno pero la edición necesita más interrupciones/SFX
    → Aumentar densidad de pattern interrupts
    → Revisar si el hook es suficientemente agresivo
ELSE IF retención promedio < 50%
    THEN hay un problema fundamental
    IF la caída es en los primeros 3 segundos
        THEN el hook es débil → rehacer hook
    ELSE IF la caída es gradual y constante
        THEN el pacing es demasiado lento o el contenido no engancha
        → Reducir duración del video
        → Aumentar densidad de cambios
    ELSE IF la caída es abrupta en un punto específico
        THEN hay un "momento aburrido" → cortar esa sección o insertar interrupt
    END
END
```

### Principio 3: "Un video no es un video — es una iteración"

Cada video publicado es un experimento. El editor no "hace un video", sino que **itera** sobre lo que funcionó:

```
IF el video anterior tuvo retención > 70%
    THEN replicar:
        - mismo estilo de hook
        - misma densidad de SFX
        - mismo pacing
        - contenido/tema nuevo pero formato similar
ELSE IF el video anterior tuvo retención < 50%
    THEN cambiar UNA variable:
        IF sospecho que fue el hook → cambiar solo el hook, mantener todo lo demás
        ELSE IF sospecho que fue el pacing → cambiar solo la velocidad/densidad
        ELSE IF sospecho que fue el tema → cambiar solo el tema, mantener el estilo
        END
    → NUNCA cambiar todo a la vez — no sabrás qué funcionó
END
```

### Principio 4: "El espectador no te debe nada"

El espectador puede irse en cualquier momento sin costo ni culpa. No existe "pero si sigue viendo, llegará a la parte buena". La parte buena tiene que estar en cada segundo.

### Principio 5: "La consistencia le gana al hit"

Un video viral aislado no construye negocio. 50 videos buenos publicados consistentemente sí. El editor debe optimizar para producción sostenible, no para el home run perfecto.

```
IF puedo publicar 5 videos buenos esta semana
    THEN es mejor que 1 video "perfecto" en 2 semanas
IF puedo mantener una calidad mínima consistente cada día
    THEN es mejor que alternar entre obras maestras y basura
```

### Principio 6: "Robar como artista"

Ver qué hacen los creadores que funcionan en el nicho. Analizar segundo a segundo. Replicar la estructura, no el contenido. Las técnicas de edición no tienen copyright — los guiones sí.

### Principio 7: "El silencio es un efecto"

No todo debe tener SFX. Un silencio de 0.3-0.5 segundos justo antes de un dato clave (cortando la música de fondo abruptamente) puede ser más impactante que cualquier riser. Pero debe ser intencional, no accidental.

```
IF quiero crear máxima anticipación antes de un dato clave
    THEN considerar: silencio total de 0.3-0.5s + corte abrupto de música
    → Luego: impact fuerte al revelar el dato
    → El contraste silencio→impacto es más potente que riser→impacto
```

### Principio 8: "La música no es decoración"

La música de fondo no es "algo que suena de fondo". Influye en:
- El ritmo al que el espectador procesa la información
- El estado emocional
- La percepción de calidad del video
- Si los SFX se integran o "sobresalen"

```
IF el video tiene música con tonalidad definida
    THEN los SFX deben ser tonales (misma escala)
    → SFX genéricos de stock se sienten "pegados" encima de la música
ELSE IF el video no tiene música (solo voz)
    THEN los SFX genéricos funcionan bien
    → La ausencia de música hace que cada SFX tenga más peso
END
```

### Principio 9: "Cada frame tiene un dueño"

Nunca debe haber un frame en pantalla donde no esté claro qué debe estar mirando el espectador. Si hay 5 elementos compitiendo por atención, el espectador no mira ninguno.

```
IF en este frame hay más de 2 elementos compitiendo por atención
    (ejemplo: texto + overlay + B-roll + subtítulo)
    THEN reducir a máximo 2:
        - el elemento narrativo principal (B-roll O A-roll)
        - UN texto (subtítulo O overlay, no ambos simultáneamente)
    → Secuenciar en vez de apilar: primero el visual, luego el texto
END
```

### Principio 10: "El export no es el final"

Exportar el video es el 90% del trabajo. El 10% restante es:
- Ver el video completo como si fuera la primera vez (en el celular, no en la computadora)
- Verificar que se ve bien en la plataforma destino (safe zones, calidad de compresión)
- Publicar con el copy/caption correcto
- Monitorear las primeras 2 horas de rendimiento

---

# Capítulo 5: Principios fundamentales

## 5.1 Los 20 principios de edición

### 5.1.1 Principios de corte

| # | Principio | Regla práctica | Checklist |
|---|---|---|---|
| 1 | Cortar en el movimiento | Cortar durante un gesto, no después | [ ] Cada corte coincide con un movimiento o cambio de energía |
| 2 | Cortar antes del "um" | Eliminar titubeos, no después | [ ] No hay "ehhh", "emm", "bueno..." en el video final |
| 3 | La J-cut anticipa | El audio del clip siguiente empieza 0.5s antes del visual | [ ] Las transiciones de tema usan J-cut |
| 4 | La L-cut cierra | El audio del clip anterior continúa 0.5s después del visual | [ ] Los finales de sección usan L-cut |
| 5 | Jump cut = energía | Saltar dentro de la misma toma genera urgencia | [ ] Los jump cuts son intencionales, no accidentales |

### 5.1.2 Principios de ritmo

| # | Principio | Regla práctica | Checklist |
|---|---|---|---|
| 6 | Velocidad variable | No todo el video va a la misma velocidad | [ ] Hay al menos 2 velocidades distintas en el video |
| 7 | Respirar antes del golpe | 0.3-0.5s de calma antes de un dato clave | [ ] Los datos más importantes tienen una micro-pausa previa |
| 8 | Escalar la energía | Empezar alto, bajar levemente, subir al cierre | [ ] La energía del CTA final ≥ la energía del hook |
| 9 | La duración es una opinión | El video dura lo que necesita, ni más ni menos | [ ] No hay tramos que "sobran" por llenar duración |
| 10 | El final es un hook | El último segundo debe motivar la acción | [ ] El video no "se acaba" — cierra con CTA o loop |

### 5.1.3 Principios de sonido

| # | Principio | Regla práctica | Checklist |
|---|---|---|---|
| 11 | Un SFX por función | No reusar el mismo SFX para dos funciones narrativas | [ ] Cada categoría de SFX tiene su propio sonido asignado |
| 12 | Frame-accurate | Los SFX se sincronizan al frame con el visual | [ ] No hay desajuste perceptible entre SFX y visual |
| 13 | El riser va ANTES | El riser/anticipación va antes del dato, no después | [ ] Todos los risers preceden al reveal |
| 14 | Foley > genérico | Sonidos específicos (lápiz, teclado) > whoosh genérico | [ ] Se usan foleys hiper-específicos donde es posible |
| 15 | Tonal cuando hay música | SFX afinados en la misma escala que la música | [ ] Si hay música, los SFX son tonales |

### 5.1.4 Principios visuales

| # | Principio | Regla práctica | Checklist |
|---|---|---|---|
| 16 | B-roll en B&N para texto | Desaturar B-roll cuando hay texto encima | [ ] El texto siempre se lee claramente sobre B-roll |
| 17 | Safe zones respetadas | Nada importante en las zonas tapadas por UI | [ ] Texto y elementos clave están en zona segura |
| 18 | Máximo 2 tipografías | Una para subtítulos, una para títulos | [ ] No hay más de 2 familias tipográficas |
| 19 | El overlay tiene función | Si no aporta info nueva, se saca | [ ] Ningún overlay está "flotando" sin función |
| 20 | El movimiento es constante | Siempre hay algo animándose suavemente | [ ] No hay frames completamente estáticos por >2s |

## 5.2 Principios de pacing por tipo de contenido

### 5.2.1 Tabla de densidad de estímulos

| Tipo de contenido | Cortes/min | SFX/min | Textos nuevos/min | Overlays/min | Zoom punches/min |
|---|---|---|---|---|---|
| Reel agresivo (TikTok) | 20-30 | 15-20 | 10-15 | 3-5 | 5-10 |
| Reel medio (IG) | 12-20 | 8-14 | 8-12 | 2-4 | 3-6 |
| Tutorial corto | 10-15 | 6-10 | 8-12 | 2-3 | 2-4 |
| Vlog | 6-10 | 3-6 | 2-5 | 1-2 | 1-3 |
| YouTube largo | 4-8 | 2-5 | 2-4 | 1-2 | 1-2 |
| Podcast video | 2-4 | 1-2 | 1-2 | 0-1 | 0-1 |
| Comercial/ad | 15-25 | 10-15 | 5-10 | 3-5 | 3-6 |

## 5.3 El sistema de diseño sonoro (resumen operativo)

Referencia completa: `skills/sound-design-short-video/SKILL.md`

### 5.3.1 Tabla de categoría → efecto → momento (expandida)

| # | Categoría | Efecto primario | Efecto alternativo | Cuándo colocarlo | Ejemplo concreto |
|---|---|---|---|---|---|
| 1 | Gancho / ruptura de patrón | Vine Boom | Metallic Riser, bass drop | Primer segundo del video | Al aparecer el rostro + texto gancho |
| 2 | Anticipación | Riser (sonido ascendente) | Reversed cymbal, build-up | Justo antes de revelar el dato clave | 0.5-1s antes del número, la cifra, el resultado |
| 3 | Corte de cámara / énfasis | Impact (golpe grave) | Trailer Impact, cinematic hit | En cada corte, o solo en el momento más polémico | Al cambiar de argumento fuerte |
| 4 | Transición entre planos | Whoosh seco/rápido | Camera Shutter texturizado (Kash) | Cambios de escena o de toma | Al pasar de A-roll a B-roll |
| 5 | Interfaz / tecnología | Mouse click, Toggle | Digital Loading, UI notification | Acciones en pantalla | Al mostrar una app, un sitio web, un botón |
| 6 | Enumeración / listas | Enter/Select, campana sutil (Glocken) | Tick, soft chime | Al contar pasos o conceptos | "Primero...", "Segundo...", "Tercero..." |
| 7 | Anclaje visual | Pop (burbuja/clic rápido) | Soft click, snap | Al aparecer palabras clave, emojis o imágenes | Cuando un emoji aparece sobre el video |
| 8 | Foley de acción | Sonidos hiperrealistas | Variante tonal del foley | Movimientos físicos del creador | Lápiz escribiendo, producto sacándose de la caja |
| 9 | Cartoon / quitar seriedad | Running, Slide Whistle | Boing, rubber duck | Movimientos torpes, quitar peso a un tema | Cuando algo sale mal o se hace una broma |
| 10 | Gamificación | Level up, Coin collect | Achievement unlock, XP sound | Al premiar un aprendizaje del espectador | "¡Ahora ya sabés cómo..." |
| 11 | Dinero | Amount display (digital) | Cash register moderno, coin rain | Menciones de dinero o cifras | "Gané $X" o "Ahorré $X" |
| 12 | Sorpresa / censura | Alerta tipo Metal Gear | Record scratch, needle drop | Dato chocante, corte abrupto de música | "Pero lo que no te dicen es..." |
| 13 | Disonancia / error | Sonido de error | Prohibition terms, buzzer | Algo que "no tiene sentido" | "Eso es un error", "No hagas esto" |
| 14 | Ironía | Ruido creepy (de terror) | Suspense strings, eerie tone | Dudas irónicas o sarcasmo | "¿Seguro que eso funciona?" (tono irónico) |
| 15 | Revelación sarcástica | Glitter | Sparkle, magic wand | "Descubrimientos" presentados con ironía | "Y así descubrí el secreto..." (sarcástico) |

### 5.3.2 Reglas críticas de sonido (checklist)

- [ ] Nunca el mismo SFX genérico para dos funciones narrativas distintas
- [ ] Priorizar foleys hiper-específicos sobre efectos genéricos "quemados"
- [ ] El riser/impact va SIEMPRE antes del dato más importante, nunca después
- [ ] Los pops/clics se sincronizan frame-accurate con la aparición del elemento
- [ ] Si hay música de fondo, preferir SFX tonales
- [ ] En el hook (primeros 3-5s): bass hit en frame 1 + whoosh en cada corte + riser antes del remate
- [ ] Cada overlay gráfico entra/sale con su propio SFX (nunca aparece en silencio)

---

# Capítulo 6: Workflow maestro (de guion a publicación)

## 6.1 Las 12 fases del workflow completo

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW MAESTRO                          │
│                                                             │
│  FASE 1: Briefing / Descubrimiento del proyecto            │
│      ↓                                                      │
│  FASE 2: Análisis del material crudo                        │
│      ↓                                                      │
│  FASE 3: Selección y organización de clips                  │
│      ↓                                                      │
│  FASE 4: Corte de silencios (pipeline automático)           │
│      ↓                                                      │
│  FASE 5: Assembly cut (primera versión, solo cortes)        │
│      ↓                                                      │
│  FASE 6: Rough cut (agregar B-roll, reordenar)              │
│      ↓                                                      │
│  FASE 7: Diseño sonoro (SFX, música, mezcla)                │
│      ↓                                                      │
│  FASE 8: Tipografía y subtítulos                            │
│      ↓                                                      │
│  FASE 9: Overlays y motion graphics                         │
│      ↓                                                      │
│  FASE 10: Color grading                                     │
│      ↓                                                      │
│  FASE 11: QA y revisión final                               │
│      ↓                                                      │
│  FASE 12: Export y publicación                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 6.2 Detalle de cada fase

### FASE 1: Briefing / Descubrimiento del proyecto

**Input:** idea, guion, o material crudo sin procesar
**Output:** brief completo con las 8 preguntas de §2.4 respondidas

```
IF recibo un guion escrito
    THEN
        1. Leer el guion completo
        2. Identificar la función narrativa de cada línea
        3. Responder las 8 preguntas del checklist de objetivos
        4. Estimar duración del video final
        5. Listar los assets necesarios (B-roll, overlays, música, SFX)
ELSE IF recibo material crudo sin guion
    THEN
        1. Ver/escuchar TODO el material
        2. Identificar los "momentos usables" (energía, claridad, contenido)
        3. Construir una narrativa a partir de los momentos
        4. Responder las 8 preguntas del checklist
        5. Escribir un "guion inverso" (el guion que describe lo que ya se grabó)
ELSE IF recibo solo una idea/concepto
    THEN
        1. Definir el objetivo y la plataforma
        2. Elegir el tipo de video (taxonomía §2.1)
        3. Escribir el guion siguiendo la estructura adecuada
        4. Definir los assets necesarios
        5. Proceder a grabación o generación de material
END
```

### FASE 2: Análisis del material crudo

**Input:** archivos de video/audio crudos
**Output:** inventario de clips con timestamps de momentos usables

```
Para cada archivo de material crudo:
    1. Obtener metadatos técnicos:
        ffprobe -v error -show_entries format=duration,bit_rate \
            -show_entries stream=codec_name,width,height,r_frame_rate \
            -of json archivo.mp4

    2. Anotar:
        - Duración total
        - Resolución y FPS
        - Codec de audio y video
        - Nivel de ruido de fondo (subjetivo: bajo/medio/alto)
        - Calidad de iluminación (subjetivo: buena/aceptable/mala)
        - Momentos clave con timestamps (inicio-fin de cada segmento usable)

    3. Clasificar cada momento usable:
        IF es el creador hablando a cámara → A-roll
        ELSE IF es un plano de producto/entorno/detalle → B-roll
        ELSE IF es una grabación de pantalla → screen recording
        ELSE IF es una reacción o expresión sin hablar → reaction shot
        END
```

### FASE 3: Selección y organización de clips

**Input:** inventario de momentos usables
**Output:** timeline ordenada con clips seleccionados

```
1. Separar clips por categoría (A-roll, B-roll, screen rec, reactions)
2. Ordenar A-roll según el flujo narrativo del guion
3. Marcar puntos de inserción para B-roll y pattern interrupts
4. Identificar clips redundantes (varias tomas del mismo segmento)
    IF hay múltiples tomas de la misma escena
        THEN elegir la toma con:
            1. Mejor energía/dicción
            2. Mejor iluminación/foco
            3. Mejor encuadre
        → Descartar el resto (guardar como backup)
    END
```

### FASE 4: Corte de silencios (pipeline automático)

**Input:** clips de A-roll crudos
**Output:** clips de A-roll sin pausas muertas

**Herramienta:** `allimport/video/scripts/cut-silence.mjs`

```bash
cd allimport/video
npm run cut-silence -- --input /ruta/al/clip.mp4 \
    --threshold -30 \
    --min-silence 0.5 \
    --padding 0.15
```

**Árbol de decisión: ajustar parámetros**

```
IF el hablante tiene un estilo pausado/reflexivo
    THEN
        threshold = -35 (más sensible al silencio)
        min-silence = 0.8 (conservar pausas cortas que son intencionales)
        padding = 0.20 (más margen para no cortar palabras)
ELSE IF el hablante es rápido/enérgico
    THEN
        threshold = -28 (menos sensible, solo cortar silencios claros)
        min-silence = 0.4 (cortar pausas más cortas)
        padding = 0.12 (menos margen necesario)
ELSE IF el ambiente tiene mucho ruido de fondo
    THEN
        threshold = -40 (mucho más sensible, para que el ruido no cuente como "voz")
        min-silence = 0.6
        padding = 0.15
ELSE (default)
    threshold = -30, min-silence = 0.5, padding = 0.15
END
```

**Verificación post-corte:**
- [ ] El clip resultante no tiene cortes que se coman el inicio/final de palabras
- [ ] La duración del clip se redujo (si no, no había silencios → está bien)
- [ ] El video y el audio siguen sincronizados
- [ ] No hay "saltos" visuales bruscos donde se cortó un silencio largo (si los hay, agregar un whoosh/transición suave en ese punto)

### FASE 5: Assembly cut

**Input:** clips sin silencios + B-roll + orden narrativo
**Output:** primera versión del video, solo con cortes, sin efectos

El assembly cut es la versión más cruda posible que ya tiene forma de video. Solo contiene:
- Los clips en el orden correcto
- Los cortes entre clips (corte directo, sin transiciones)
- El audio original

**Checklist del assembly cut:**
- [ ] ¿El video cuenta la historia de principio a fin?
- [ ] ¿La duración está dentro del rango objetivo? (±20%)
- [ ] ¿El hook de apertura es identificable?
- [ ] ¿El cierre/CTA está presente?
- [ ] ¿Hay momentos "muertos" que se sienten lentos?

```
IF la duración del assembly > 150% del objetivo
    THEN hay que cortar más material
    → Empezar por los segmentos menos esenciales para la narrativa
    → Luego acortar los segmentos que quedan (quitar repeticiones internas)
ELSE IF la duración del assembly < 70% del objetivo
    THEN falta material
    → Agregar más B-roll
    → Agregar screen recordings o cutaways de IA si es pertinente
    → O aceptar que el video es más corto de lo planeado (si funciona, no forzar)
END
```

### FASE 6: Rough cut

**Input:** assembly cut
**Output:** versión con B-roll insertado, transiciones de corte directo, orden refinado

En el rough cut se inserta el B-roll en los puntos marcados y se ajusta el orden si algo no fluye:

```
Para cada punto de inserción de B-roll:
    IF el B-roll ilustra lo que se dice en el A-roll
        THEN cortar al B-roll cuando el hablante dice la palabra clave
        → Mantener el audio del A-roll debajo del B-roll (L-cut)
    ELSE IF el B-roll es un pattern interrupt puro (no ilustra, solo cambia)
        THEN insertar entre frases, no en medio de una frase
        → Duración: 1-3 segundos
    ELSE IF el B-roll reemplaza una sección de A-roll débil
        THEN reemplazar completamente (incluyendo audio si hay voz en off)
    END
```

### FASE 7: Diseño sonoro

**Input:** rough cut
**Output:** versión con SFX, música y mezcla de niveles

Proceso detallado:

```
1. Elegir música de fondo (si aplica):
    IF plataforma = TikTok Y hay un trending audio relevante
        THEN usar el trending audio
    ELSE IF la marca tiene una identidad sonora definida
        THEN usar música de marca/library
    ELSE
        buscar beat que coincida con el pacing del video
        BPM del beat ≈ cantidad de cortes por minuto × 2-4
    END

2. Asignar SFX línea por línea del guion:
    Para cada línea/momento del guion:
        a. Identificar la función narrativa (gancho, anticipación, corte, etc.)
        b. Buscar en la tabla de categorías (§5.3.1) el efecto correspondiente
        c. Colocar el SFX en el frame exacto del evento visual
        d. Verificar que no se repite el mismo SFX para otra función

3. Mezclar niveles:
    voz = 0 dB (referencia)
    música = -18 a -12 dB (baja durante voz, puede subir en momentos sin voz)
    SFX principales = -6 a -3 dB
    SFX de ambiente = -12 a -8 dB

4. Normalizar el audio final:
    ffmpeg ... -af loudnorm=I=-14:TP=-1.5:LRA=11 ...
    (estándar para redes sociales)
```

### FASE 8: Tipografía y subtítulos

**Input:** versión con diseño sonoro
**Output:** versión con subtítulos kinetic y textos

```
1. Generar la transcripción:
    IF tengo acceso a herramienta de transcripción automática
        THEN usar faster-whisper, Whisper, o CapCut auto-captions
    ELSE
        transcribir manualmente (cronómetro + texto)
    END

2. Sincronizar palabra por palabra:
    Para cada palabra de la transcripción:
        - Timestamp de inicio (frame exacto donde se pronuncia)
        - Timestamp de fin
        - Marcar palabras clave que se resaltan en color

3. Aplicar estilo de subtítulo:
    fuente = Montserrat Bold
    color_base = #f8fafa (blanco) con contorno negro de 2px
    color_keyword = #00d4d4 (cyan All Import) o #f7c204 (amarillo estándar)
    posición = centro inferior, respetando safe zone
    animación = pop (scale 0→100% en 0.08s) o fade in (0.1s)

4. Agregar textos de overlay:
    IF hay un título de portada/hook
        THEN posicionarlo en la zona superior del frame
        fuente = Montserrat Alternates Bold o según tono (§3.1.4)
    END
```

### FASE 9: Overlays y motion graphics

**Input:** versión con subtítulos
**Output:** versión con contadores, notificaciones, logos, animaciones

```
Para cada momento del guion que requiere un overlay:
    1. Identificar el tipo de overlay (tabla §5.3.1 de SKILL.md)
    2. Crear o conseguir el asset (PNG con transparencia / animación)
    3. Posicionar en el frame respetando:
        - Safe zones de la plataforma
        - No cubrir el rostro del hablante
        - No competir con el subtítulo activo
    4. Animar entrada/salida (tabla de timing §3.1.5)
    5. Agregar SFX de anclaje correspondiente
    6. Verificar que no superpone con otro overlay

Regla: NUNCA más de 2 overlays simultáneos en pantalla
```

### FASE 10: Color grading

**Input:** versión con overlays
**Output:** versión con color final

```
IF ya se definió un look en la fase de briefing
    THEN aplicar el LUT/preset definido
ELSE
    IF contenido orgánico (reel, BTS)
        THEN ajuste sutil: contraste +5-10%, saturación -5%
    ELSE IF contenido premium (ad, marca)
        THEN LUT cinematográfico + ajuste por shot
    END
END

Para B-roll con texto encima:
    desaturar a B&N o 80% desaturación

Verificar coherencia entre todos los shots:
    [ ] La temperatura de color es consistente
    [ ] El contraste es consistente
    [ ] Los skin tones son naturales (no naranja, no gris)
```

### FASE 11: QA y revisión final

**Input:** versión "final" pre-export
**Output:** versión aprobada para export

Checklist completo de QA: [→ PARTE_05 §Capítulo QA]

Versión resumida:
- [ ] Ver el video completo SIN pausas, como lo haría un espectador
- [ ] Verificar sync audio/video (especialmente después de cortes)
- [ ] Verificar que todos los subtítulos son legibles y sin errores ortográficos
- [ ] Verificar safe zones (nada tapado por UI de plataforma)
- [ ] Verificar que no hay frames negros no intencionales
- [ ] Verificar que la duración está en el rango objetivo
- [ ] Verificar que el hook del primer segundo es fuerte
- [ ] Verificar que el CTA de cierre está presente y claro
- [ ] Verificar niveles de audio (no clipea, voz audible sobre música)

### FASE 12: Export y publicación

**Input:** versión aprobada
**Output:** archivo exportado + publicación en plataforma

```
1. Exportar según la plataforma (tabla de specs §3.1.7):
    ffmpeg -i input.mp4 \
        -c:v libx264 -preset slow -crf 18 \
        -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:-1:-1" \
        -c:a aac -b:a 192k \
        -movflags +faststart \
        output_final.mp4

2. Verificar el export:
    - [ ] Reproducir completo y verificar calidad visual
    - [ ] Verificar que el tamaño de archivo es razonable (<100MB para reel)
    - [ ] Verificar que la duración coincide con la versión pre-export

3. Publicar:
    IF plataforma = TikTok y Higgsfield está disponible
        THEN usar herramientas de TikTok de Higgsfield MCP
    ELSE
        subir manualmente desde el celular
    END

4. Post-publicación:
    - Agregar caption/copy con hashtags relevantes
    - Monitorear las primeras 2 horas de rendimiento
    - Responder los primeros comentarios (activa el engagement)
```

---

# Capítulo 7: Pipeline técnico completo

## 7.1 Herramientas disponibles (inventario del entorno)

### 7.1.1 ffmpeg (motor principal de procesamiento de video)

**Versión:** 6.1.1
**Ubicación:** preinstalado en el sistema

**Capacidades verificadas disponibles:**

| Capacidad | Módulo ffmpeg | Estado | Uso |
|---|---|---|---|
| Corte de silencios | silencedetect + trim/atrim + concat | Funcional | Pipeline cut-silence.mjs |
| Estabilización | vidstab | Disponible | Estabilizar tomas movidas |
| Subtítulos con ASS | libass | Disponible | Subtítulos estilizados complejos |
| Subtítulos con drawtext | drawtext (freetype) | Disponible | Subtítulos simples o word-by-word |
| Zoom y pan | zoompan | Disponible | Ken Burns, zoom punch |
| Transiciones | xfade | Disponible | Cross-dissolve, wipe, fade |
| Normalización de audio | loudnorm | Disponible | Nivelar audio a -14 LUFS |
| Detección de silencio | silencedetect | Disponible | Análisis de pausas |
| Remoción de silencio | silenceremove | Disponible | Alternativa al pipeline manual |
| Mezclado de audio | amix, amerge | Disponible | Mezclar voz + música + SFX |
| Trim preciso | trim, atrim, setpts, asetpts | Disponible | Cortes frame-accurate |
| Escalado y padding | scale, pad | Disponible | Adaptar resolución/aspecto |
| Filtros de color | eq, colorbalance, lut3d | Disponible | Color grading básico |
| Overlay de imágenes | overlay | Disponible | Logos, watermarks, gráficos |
| Concatenación | concat (filter + demuxer) | Disponible | Unir clips |
| GIF generation | palette + paletteuse | Disponible | Previews y thumbnails animados |

### 7.1.2 Pipeline de corte de silencios

**Ubicación:** `allimport/video/scripts/cut-silence.mjs`
**Dependencias:** solo Node.js core + ffmpeg/ffprobe en PATH
**Cómo funciona:** silencedetect → computeKeepSegments → buildFilterComplex (trim/atrim + concat en un solo filter_complex) → ffmpeg render

### 7.1.3 Remotion (video programático con React)

**Ubicación:** `allimport/video/` (package.json con scripts de Remotion)
**Estado:** dependencias no instaladas en este entorno, pero el framework está configurado
**Uso:** generar clips programáticos (intros, outros, animaciones de texto, countdowns)

### 7.1.4 Higgsfield MCP

**Estado:** conectado y funcional
**Capacidades relevantes para video:**

| Herramienta | Función |
|---|---|
| generate_video | Generar video por prompt |
| generate_image | Generar imágenes (B-roll, cutaways, thumbnails) |
| generate_audio | Generar audio/música |
| reframe | Cambiar aspect ratio (16:9 ↔ 9:16) |
| remove_background | Recortar fondo de video/imagen |
| upscale_video | Mejorar resolución |
| upscale_image | Mejorar resolución de imagen |
| dubbing | Doblaje de audio |
| voice_change | Cambiar voz |
| tiktok_publish | Publicar directamente en TikTok |
| virality_predictor | Predecir viralidad antes de publicar |
| shorts_studio_create | Crear shorts desde video largo |
| video_analysis_create | Analizar métricas de un video |

### 7.1.5 Fuentes disponibles

**Ubicación:** `allimport/historias/fonts/`

| Archivo | Uso |
|---|---|
| MontserratAlternates-Bold.ttf | Títulos, logo, headers |
| MontserratAlternates-SemiBold.ttf | Subtítulos énfasis |
| MontserratAlternates-Medium.ttf | Cuerpo de texto |
| MontserratAlternates-Regular.ttf | Texto secundario |

### 7.1.6 Node.js y Python

| Herramienta | Versión | Uso |
|---|---|---|
| Node.js | 22 | Pipeline cut-silence, scripts custom, Remotion |
| Python | 3.11 | Pillow (edición de historias), scripts de análisis |
| Bun | Instalado | Runtime alternativo rápido para scripts |

## 7.2 Comandos ffmpeg de referencia

### 7.2.1 Operaciones básicas

**Obtener información del archivo:**
```bash
ffprobe -v error -show_entries format=duration,bit_rate,size \
    -show_entries stream=codec_name,width,height,r_frame_rate,channels,sample_rate \
    -of json input.mp4
```

**Cortar un segmento (sin recodificar):**
```bash
ffmpeg -ss 00:00:05 -to 00:00:15 -i input.mp4 -c copy output.mp4
```

**Cortar un segmento (con recodificación, más preciso):**
```bash
ffmpeg -i input.mp4 -ss 5.0 -to 15.0 \
    -c:v libx264 -preset veryfast -crf 18 \
    -c:a aac -b:a 192k output.mp4
```

**Concatenar clips (con re-encode):**
```bash
# Crear concat list
echo "file 'clip1.mp4'" > concat.txt
echo "file 'clip2.mp4'" >> concat.txt
echo "file 'clip3.mp4'" >> concat.txt

ffmpeg -f concat -safe 0 -i concat.txt \
    -c:v libx264 -preset veryfast -crf 18 \
    -c:a aac -b:a 192k output.mp4
```

### 7.2.2 Operaciones de audio

**Normalizar audio (estándar redes sociales, -14 LUFS):**
```bash
ffmpeg -i input.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 \
    -c:v copy -c:a aac -b:a 192k output.mp4
```

**Mezclar voz + música de fondo:**
```bash
ffmpeg -i voz.mp4 -i musica.mp3 \
    -filter_complex "[1:a]volume=0.15[bg];[0:a][bg]amix=inputs=2:duration=first[aout]" \
    -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k output.mp4
```

**Agregar SFX en un timestamp específico:**
```bash
ffmpeg -i video.mp4 -i sfx.wav \
    -filter_complex "[1:a]adelay=3500|3500,volume=0.8[sfx];[0:a][sfx]amix=inputs=2:duration=first[aout]" \
    -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k output.mp4
```

### 7.2.3 Operaciones de video

**Escalar a 1080×1920 (vertical) con padding:**
```bash
ffmpeg -i input.mp4 \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:-1:-1:color=black" \
    -c:v libx264 -preset slow -crf 18 -c:a copy output.mp4
```

**Zoom punch (zoom in sutil de 100% a 110% y back):**
```bash
ffmpeg -i input.mp4 \
    -vf "zoompan=z='if(between(in_time,5.0,5.3),min(zoom+0.005,1.1),max(zoom-0.005,1.0))':d=1:s=1080x1920:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'" \
    -c:v libx264 -preset veryfast -crf 18 -c:a copy output.mp4
```

**Estabilizar toma movida (vidstab, 2 pasos):**
```bash
# Paso 1: analizar
ffmpeg -i shaky.mp4 -vf vidstabdetect=shakiness=5:accuracy=15 -f null -

# Paso 2: aplicar
ffmpeg -i shaky.mp4 -vf vidstabtransform=smoothing=10:input=transforms.trf \
    -c:v libx264 -preset veryfast -crf 18 -c:a copy stabilized.mp4
```

**Convertir a blanco y negro (B-roll para texto):**
```bash
ffmpeg -i input.mp4 -vf "hue=s=0" \
    -c:v libx264 -preset veryfast -crf 18 -c:a copy bw_output.mp4
```

**Agregar texto con drawtext:**
```bash
ffmpeg -i input.mp4 \
    -vf "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf':\
text='ALL IMPORT':fontcolor=white:fontsize=72:\
x=(w-text_w)/2:y=h*0.1:\
enable='between(t,0,3)'" \
    -c:v libx264 -preset veryfast -crf 18 -c:a copy output.mp4
```

**Overlay de imagen PNG (logo):**
```bash
ffmpeg -i video.mp4 -i logo.png \
    -filter_complex "[1:v]scale=200:-1[logo];[0:v][logo]overlay=W-w-50:50:enable='between(t,2,5)'" \
    -c:v libx264 -preset veryfast -crf 18 -c:a copy output.mp4
```

**Transición xfade entre dos clips:**
```bash
ffmpeg -i clip1.mp4 -i clip2.mp4 \
    -filter_complex "xfade=transition=fade:duration=0.5:offset=4.5" \
    -c:v libx264 -preset veryfast -crf 18 output.mp4
```

### 7.2.4 Flujo completo: de crudo a publicable (ejemplo)

```bash
# 1. Cortar silencios
cd allimport/video
npm run cut-silence -- --input /ruta/crudo.mp4

# 2. Estabilizar si es necesario
ffmpeg -i out/crudo-cut.mp4 -vf vidstabdetect -f null -
ffmpeg -i out/crudo-cut.mp4 -vf vidstabtransform=smoothing=10 \
    -c:v libx264 -crf 18 -c:a copy out/stabilized.mp4

# 3. Escalar a 1080x1920 vertical
ffmpeg -i out/stabilized.mp4 \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:-1:-1" \
    -c:v libx264 -crf 18 -c:a copy out/scaled.mp4

# 4. Agregar subtítulos (requiere archivo .ass previamente generado)
ffmpeg -i out/scaled.mp4 -vf "ass=subtitles.ass" \
    -c:v libx264 -crf 18 -c:a copy out/subtitled.mp4

# 5. Normalizar audio
ffmpeg -i out/subtitled.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 \
    -c:v copy -c:a aac -b:a 192k out/final.mp4

# 6. Verificar
ffprobe -v error -show_entries format=duration,size out/final.mp4
```

---

# Capítulo 8: Descubrimiento del proyecto

## 8.1 Qué se necesita saber antes de editar

Antes de tocar un solo frame, el editor necesita la respuesta a estas preguntas. Este capítulo define cómo obtener cada respuesta.

### 8.1.1 Checklist de descubrimiento (33 preguntas)

**Sobre el contenido:**
- [ ] ¿Hay guion escrito? ¿Dónde está?
- [ ] ¿Hay material crudo grabado? ¿Cuántos archivos? ¿Qué formato?
- [ ] ¿Hay B-roll grabado o necesito generarlo/buscarlo?
- [ ] ¿Hay música de fondo definida?
- [ ] ¿Hay una voz en off o es la voz del creador en A-roll?
- [ ] ¿Hay assets visuales (logos, fotos, screenshots) disponibles?
- [ ] ¿El material crudo necesita transcripción?

**Sobre el objetivo:**
- [ ] ¿Cuál es el objetivo del video? (alcance / venta / autoridad / engagement)
- [ ] ¿Cuál es la acción deseada del espectador?
- [ ] ¿Qué debe sentir el espectador al final?
- [ ] ¿Cuál es la métrica clave de éxito?
- [ ] ¿Hay un deadline de publicación?

**Sobre la plataforma:**
- [ ] ¿Plataforma principal de destino?
- [ ] ¿Se adapta a alguna plataforma secundaria?
- [ ] ¿Formato vertical (9:16) u horizontal (16:9)?
- [ ] ¿Duración objetivo?

**Sobre la marca:**
- [ ] ¿Cuenta de publicación? (@allimport.cba o @_agus_moreno_)
- [ ] ¿Se usa logo? (sí para @allimport.cba, no para @_agus_moreno_)
- [ ] ¿Colores de marca? (NAVY #0a0f1a, CYAN #00d4d4, WHITE #f8fafa)
- [ ] ¿Tipografía de marca? (Montserrat Alternates)
- [ ] ¿Tono de voz? (argentino, directo, honesto, informal)
- [ ] ¿Hay frases prohibidas? (ver DESIGN.md "Frases que NO")

**Sobre el tipo de video:**
- [ ] ¿Qué tipo de video es? (según taxonomía §2.1)
- [ ] ¿Talking head / producto en mano / tutorial / BTS / otro?
- [ ] ¿Es parte de una serie o es independiente?
- [ ] ¿Hay un template/formato previo que seguir?

**Sobre restricciones técnicas:**
- [ ] ¿Resolución y FPS del material crudo?
- [ ] ¿Calidad del audio crudo? (necesita limpieza?)
- [ ] ¿Calidad de la iluminación? (necesita corrección?)
- [ ] ¿El material crudo está estabilizado o necesita vidstab?
- [ ] ¿Hay grabaciones de pantalla que incluir?
- [ ] ¿Se necesitan imágenes/videos generados por IA?
- [ ] ¿Hay restricciones de tamaño de archivo?

## 8.2 Árbol de decisión: rutas de descubrimiento

```
IF recibo solo un archivo de video + "editá esto"
    THEN
        1. Obtener metadatos técnicos (ffprobe)
        2. Ver el video completo, anotar momentos clave
        3. Identificar:
            - ¿Hay voz? → probablemente talking head o tutorial
            - ¿Hay producto en pantalla? → probablemente showcase
            - ¿Es BTS/casual? → contenido orgánico
        4. Inferir el tipo de video y la plataforma probable
        5. Aplicar los defaults:
            plataforma = Instagram Reels (el más común para All Import)
            cuenta = @allimport.cba (si hay producto) o @_agus_moreno_ (si es personal)
            duración_objetivo = duración del video post-corte-silencios
            tono = directo, cordobés
        6. Proceder con pipeline completo (§6.1)

ELSE IF recibo un guion + "hacé un video con esto"
    THEN
        1. Leer el guion completo
        2. Identificar tipo de video y plataforma objetivo
        3. Evaluar qué material falta (B-roll, SFX, música)
        4. Anotar cada línea del guion con [efecto/gráfico — momento]
            usando el proceso de sound-design-short-video
        5. Si falta material visual → generar con Higgsfield o pedir al usuario
        6. Proceder con pipeline completo

ELSE IF recibo un brief detallado (objetivo, plataforma, tipo, etc.)
    THEN
        verificar que las 33 preguntas estén respondidas
        IF faltan respuestas críticas
            THEN preguntar al usuario las faltantes
        END
        proceder directo a la fase que corresponda
END
```

## 8.3 Perfiles de proyecto por tipo (presets)

### 8.3.1 Preset: Reel de producto (All Import)

```
Cuenta: @allimport.cba
Plataforma: Instagram Reels + TikTok
Formato: 9:16 vertical (1080×1920)
Duración: 15-30 segundos
Tipo: Producto en mano o Comparación
Objetivo: Venta directa / DMs de WhatsApp
Logo: SÍ (marco cyan, header ALL IMPORT)
Colores: NAVY #0a0f1a fondo, CYAN #00d4d4 acento
Tipografía: Montserrat Alternates Bold
SFX: Densidad media-alta (tabla completa, ajustada para IG)
Pattern interrupts: cada 4-5 segundos
Subtítulos: kinetic, palabra por palabra, CYAN para keywords
CTA: "Escribinos por WhatsApp" + link en bio
Tono: directo, honesto ("Lo ves en mano antes de pagar")
Prohibido: nombres de marca ajena, falsa escasez, métricas inventadas
```

### 8.3.2 Preset: Reel personal (emprendimiento)

```
Cuenta: @_agus_moreno_
Plataforma: Instagram Reels + TikTok
Formato: 9:16 vertical (1080×1920)
Duración: 30-60 segundos
Tipo: Talking Head o Storytime
Objetivo: Alcance / Autoridad / Comunidad
Logo: NO (sin logo ni marco — se ve como contenido personal)
Texto: alineado a la izquierda (no centrado)
Tipografía: Sans bold limpia (Montserrat Bold)
SFX: Densidad alta (tabla completa)
Pattern interrupts: cada 3-5 segundos
Subtítulos: kinetic, palabra por palabra
CTA: seguir / guardar / comentar
Tono: personal, cordobés, auténtico
```

### 8.3.3 Preset: Historia de restock

```
Cuenta: @allimport.cba
Plataforma: Instagram Stories
Formato: 9:16 vertical (1080×1920)
Duración: 15 segundos por historia, secuencia de 3-7
Tipo: Historia de restock
Objetivo: Venta directa
Logo: SÍ (marco cyan, header ALL IMPORT)
Colores: NAVY fondo, CYAN acento, RED solo si urgencia real
Tipografía: Montserrat Alternates Bold
Fondo: degradado (oscuro arriba/abajo para texto, más claro al medio)
Estilo de texto: máximo 2 estilos ("Strong" pill + "Classic" plano)
Acento: UN solo color por pieza (cyan #00d4d4)
Si fondo es cyan sólido: texto oscuro encima (no blanco)
Pipeline: allimport/historias/editar_historia_pro.py
```

### 8.3.4 Preset: Carrusel educativo

```
Cuenta: @allimport.cba o @_agus_moreno_
Plataforma: Instagram (feed)
Formato: 1080×1080 (cuadrado) o 1080×1350 (4:5)
Duración: N/A (estático, 5-10 slides)
Tipo: Carrusel educativo
Objetivo: Saves / Alcance / Autoridad
Tipografía: Montserrat Alternates Bold + una complementaria
Colores: consistentes con la cuenta que publica
Primera slide: hook visual fuerte (título grande, imagen de enganche)
Última slide: CTA ("Guardá esto", "Seguime para más")
Texto: máximo 50-60 palabras por slide
```

### 8.3.5 Preset: Ad / Comercial

```
Cuenta: @allimport.cba
Plataforma: Instagram Reels (in-feed ad) + Stories
Formato: 9:16 vertical
Duración: 15-30 segundos
Tipo: Ad in-feed o UGC ad
Objetivo: Conversión (clic → WhatsApp)
Look: si es UGC, aspecto orgánico (no parecer publicidad)
SFX: Densidad alta
CTA: claro y directo ("Escribime ahora")
Restricciones de plataforma: texto < 20% del frame (política de Meta)
Música: trending si es posible (mejor reach orgánico incluso en ads)
```

## 8.4 Checklist final de descubrimiento

Después de responder las 33 preguntas y seleccionar el preset:

- [ ] Las 33 preguntas están respondidas (o tienen defaults aplicados)
- [ ] El preset correcto está seleccionado
- [ ] El material crudo está accesible
- [ ] Los assets necesarios están identificados y disponibles (o se sabe cómo generarlos)
- [ ] La duración objetivo está definida
- [ ] Las restricciones de marca están claras
- [ ] El pipeline técnico adecuado está identificado
- [ ] Se puede proceder a la Fase 2 del workflow (análisis del material crudo)

---

> **Fin de PARTE 01** — Continúa en [MASTER_VIDEO_EDITOR_PARTE_02.md](MASTER_VIDEO_EDITOR_PARTE_02.md): Capítulos 9-16 (Descubrimiento del Video, Análisis Profundo, Guion, Hook, Estructura, Pacing, Cortes, Transiciones).
