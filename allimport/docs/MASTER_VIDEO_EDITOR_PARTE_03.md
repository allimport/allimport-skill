# MASTER VIDEO EDITOR — PARTE 03
## Manual profesional de edición de video para Claude Code
### Capítulos 17–24: Diseño Sonoro Avanzado, Música, Subtítulos, Overlays, Color Grading, B-Roll, Imágenes IA, Pattern Interrupts

---

# TABLA DE CONTENIDO — PARTE 03

17. [Capítulo 17: Diseño sonoro avanzado](#capítulo-17-diseño-sonoro-avanzado)
18. [Capítulo 18: Música — selección, mezcla y uso estratégico](#capítulo-18-música--selección-mezcla-y-uso-estratégico)
19. [Capítulo 19: Subtítulos y kinetic captions](#capítulo-19-subtítulos-y-kinetic-captions)
20. [Capítulo 20: Overlays gráficos](#capítulo-20-overlays-gráficos)
21. [Capítulo 21: Color grading y tratamiento visual](#capítulo-21-color-grading-y-tratamiento-visual)
22. [Capítulo 22: B-Roll — captura, selección y uso](#capítulo-22-b-roll--captura-selección-y-uso)
23. [Capítulo 23: Imágenes y video generados por IA](#capítulo-23-imágenes-y-video-generados-por-ia)
24. [Capítulo 24: Pattern interrupts — el sistema de retención](#capítulo-24-pattern-interrupts--el-sistema-de-retención)

---

# Capítulo 17: Diseño sonoro avanzado

## 17.1 Más allá de la tabla básica de SFX

La tabla de categoría → efecto del Capítulo 5 / SKILL.md cubre el 80% de los casos. Este capítulo cubre el 20% restante: técnicas avanzadas, layering, SFX tonales, y diseño sonoro para tipos de video específicos.

### 17.1.1 Layering de SFX (apilar efectos)

Un solo SFX rara vez es suficiente para un momento de máximo impacto. El layering consiste en apilar 2-3 efectos en el mismo momento para crear un sonido más rico.

```
LAYER 1 (fundamental):
    El SFX principal de la categoría (impact, riser, whoosh)
    Volumen: -3 dB bajo la voz

LAYER 2 (textura):
    Un foley o efecto secundario que añade "cuerpo"
    Ejemplo: al impact, sumar un rumble grave de 0.3s
    Volumen: -8 dB bajo la voz

LAYER 3 (brillo, solo en momentos pico):
    Un efecto agudo corto que da "presencia"
    Ejemplo: al impact + rumble, sumar un click metálico
    Volumen: -10 dB bajo la voz
```

**Cuándo usar layering:**

```
IF es el hook (primer segundo del video)
    THEN layer obligatorio:
        Layer 1: bass hit / boom
        Layer 2: riser corto (0.3s reverse)
        Layer 3: click/snap metálico
        
ELSE IF es el reveal del dato más importante
    THEN layer:
        Layer 1: trailer impact
        Layer 2: reverse cymbal (pre-impacto)
        Layer 3: ring out metálico (post-impacto, 0.5s decay)
        
ELSE IF es un moment cómico
    THEN NO layering — un solo SFX cómico es más efectivo
    → El humor funciona con simpleza
    
ELSE (momento normal de edición)
    → Un solo SFX basta
END
```

### 17.1.2 SFX tonales vs genéricos

**El concepto:** un SFX "tonal" está afinado en una nota musical específica. Cuando el video tiene música de fondo, los SFX tonales afinados en la misma escala musical se integran como parte de la banda sonora en vez de sonar "pegados".

```
IF el video tiene música de fondo con tonalidad definida
    THEN
        1. Identificar la tonalidad de la música (Cm, G major, etc.)
        2. Buscar packs de SFX tonales (risers, impacts, whooshes)
           afinados en la misma escala o la escala relativa
        3. Usar SFX tonales para risers e impacts
        4. Los foley y clicks (no tienen nota definida) no necesitan ser tonales
        
        IF no tengo SFX tonales disponibles
            THEN opciones:
            a. Pitchear el SFX genérico para acercarlo a la escala
               ffmpeg: -af "asetrate=48000*0.95" (baja medio tono)
            b. Usar SFX sin nota definida (clicks, snaps, swooshes cortos)
               que no chocan con ninguna tonalidad
            c. Reducir el volumen del SFX genérico a -12 dB
               para que no compita con la música
               
ELSE IF el video no tiene música
    THEN los SFX genéricos funcionan perfectamente
    → Cada SFX tiene más protagonismo sin música que compita
END
```

### 17.1.3 Diseño sonoro por tipo de video

**Talking head / monólogo a cámara:**
```
SFX OBLIGATORIOS:
- Impact en el hook (frame 1)
- Riser antes del dato clave
- Pop/click en cada aparición de texto
- Whoosh en cada corte a B-roll
- Impact de cierre en el CTA

SFX OPCIONALES:
- Foley de acción (si el hablante hace algo con las manos)
- SFX de gamificación (si hay aprendizajes/pasos)
- SFX de ironía (si hay humor/sarcasmo)

MÚSICA:
- Beat suave de fondo a -15 dB, sube en momentos sin voz
- O sin música si el estilo es raw/auténtico
```

**Producto en mano / showcase:**
```
SFX OBLIGATORIOS:
- Foley SIEMPRE: sonido de la caja abriéndose, producto saliendo,
  cable conectando, botón presionando, auricular entrando en oreja
- Pop al aparecer precio / feature
- Impact en el momento de reveal de precio
- Whoosh en transiciones A-roll → close-up

SFX CLAVE: los foley son los protagonistas en este tipo de video
    → Grabar o buscar sonidos hiperrealistas de cada acción
    → NUNCA un unboxing en silencio
    
MÚSICA:
- Beat con energía que acompañe el dinamismo del showcase
- Baja durante las partes habladas, sube en B-roll
```

**Tutorial / paso a paso:**
```
SFX OBLIGATORIOS:
- Enter/Select o campana en cada paso numerado
- Toggle/click en acciones de interfaz (si es screen recording)
- Pop al aparecer cada instrucción en texto
- Foley de escritura si hay notas/diagramas en pantalla

MÚSICA:
- Beat ligero de fondo, constante, no distrae
- Más baja que en un reel (-18 dB) para no competir con instrucciones
```

**BTS / contenido casual:**
```
SFX:
- Mínimos — el encanto del BTS es la naturalidad
- Solo foley ambiental (sonido real del espacio)
- Quizás un whoosh suave en cortes principales

MÚSICA:
- Trending audio si es TikTok
- O música chill/lo-fi para ambientación
- Sin SFX cinematográficos (rompe la naturalidad)
```

## 17.2 Mezcla de audio avanzada

### 17.2.1 Diagrama de niveles por capa

```
                            VOLUMEN RELATIVO A LA VOZ
                            
VOZ (A-roll):        ████████████████████████████ 0 dB (referencia)
                            
SFX PRINCIPAL:       ███████████████████████  -3 a -6 dB
(impact, riser)           
                            
MÚSICA (sin voz):    ██████████████████████████ -6 a -8 dB
                            
MÚSICA (con voz):    ██████████████      -12 a -18 dB
                            
SFX SECUNDARIO:      ███████████████   -8 a -12 dB
(foley, ambiente)         
                            
SILENCIO INTENCIONAL:                    -∞ (mute total)
```

### 17.2.2 Ducking automático (la música baja cuando hay voz)

```
IF hay música de fondo Y voz simultáneamente
    THEN implementar ducking:
    
    La música baja automáticamente cuando la voz está presente
    y sube cuando no hay voz.
    
    En ffmpeg (usando sidechaincompress):
    
    ffmpeg -i voz.mp4 -i musica.mp3 \
        -filter_complex \
        "[1:a]volume=0.5[bgraw]; \
         [bgraw][0:a]sidechaincompress=threshold=0.02:ratio=6:attack=50:release=500[bg]; \
         [0:a][bg]amix=inputs=2:duration=first[aout]" \
        -map 0:v -map "[aout]" output.mp4
    
    Parámetros:
    - threshold=0.02: la música empieza a bajar cuando la voz supera este nivel
    - ratio=6: cuánto baja (6:1 = baja bastante)
    - attack=50ms: qué tan rápido baja cuando empieza la voz
    - release=500ms: qué tan lento vuelve cuando termina la voz
END
```

### 17.2.3 Normalización final

```
SIEMPRE como último paso de audio:

ffmpeg -i video_final.mp4 \
    -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
    -c:v copy -c:a aac -b:a 192k \
    output_normalizado.mp4

Parámetros:
- I=-14: loudness integrado a -14 LUFS (estándar para redes sociales)
- TP=-1.5: true peak máximo -1.5 dBFS (evita clipping en compresión de plataforma)
- LRA=11: rango de loudness de 11 LU (variación dinámica aceptable)

IF la normalización aplasta la dinámica (suena "plano")
    THEN reducir el LRA a 7-9
ELSE IF la normalización deja partes muy bajas
    THEN verificar que no haya silencios largos que distorsionen el análisis
END
```

---

# Capítulo 18: Música — selección, mezcla y uso estratégico

## 18.1 Selección de música

### 18.1.1 Árbol de decisión: ¿Qué música uso?

```
IF plataforma = TikTok
    THEN
        IF hay un trending audio relevante al contenido
            THEN usarlo (el algoritmo favorece audios trending)
            PERO verificar que el audio no contradiga el mensaje del video
        ELSE IF el video necesita un beat propio
            THEN generar con Higgsfield generate_audio
            O usar library de música libre (Epidemic Sound, YouTube Audio Library)
        ELSE
            sin música (solo SFX + voz) — también funciona en TikTok
        END

ELSE IF plataforma = Instagram Reels
    THEN
        IF hay un trending audio EN INSTAGRAM (diferente a TikTok)
            THEN usarlo
        ELSE
            usar música propia o de library
            → Instagram valora más la calidad visual que el audio trending
        END

ELSE IF plataforma = YouTube
    THEN
        NUNCA usar música con copyright sin licencia
        → Usar YouTube Audio Library (gratis, sin claims)
        → O Epidemic Sound / Artlist (con licencia)
        → O generar con IA

ELSE IF el video no necesita música (BTS casual, screen recording, tutorial)
    THEN no forzar música — el silencio relativo con SFX funciona
END
```

### 18.1.2 BPM de la música vs pacing del video

```
La música establece un "reloj" subliminal. Si los cortes van al ritmo de la música,
el video se siente orgánico. Si van contra el ritmo, se siente disonante.

TABLA DE BPM RECOMENDADOS:

| Tipo de video | BPM ideal de la música | Sensación |
|---|---|---|
| Reel agresivo | 120-140 BPM | Energético, urgente |
| Reel estándar | 90-120 BPM | Dinámico |
| Tutorial | 80-100 BPM | Activo pero no frenético |
| BTS / casual | 70-90 BPM | Relajado |
| Producto premium | 80-110 BPM | Aspiracional |
| Storytime emotivo | 60-80 BPM | Reflexivo |

IF no sé el BPM de la música:
    → Contar beats en 15 segundos × 4 = BPM aproximado
    → O usar una herramienta: ffmpeg no detecta BPM nativamente,
      pero Python con librosa sí:
      
    python3 -c "import librosa; y,sr=librosa.load('musica.mp3'); \
    print(librosa.beat.beat_track(y=y,sr=sr)[0])"
END
```

### 18.1.3 Cuándo subir y bajar la música

```
MÚSICA BAJA (-15 a -18 dB): cuando la voz está hablando
    → El espectador necesita entender las palabras
    → La música es textura, no protagonista

MÚSICA SUBE (-6 a -8 dB): en estos momentos:
    1. Los primeros 0.5s del hook (antes de que hable)
    2. Durante B-roll sin voz
    3. En el beat drop que coincide con el reveal/dato clave
    4. En los últimos 2-3 segundos (cierre/CTA)
    5. En cualquier momento sin voz donde quiera sentirse "épico"

MÚSICA CORTA ABRUPTAMENTE (mute): 
    → Efecto dramático antes de un dato chocante
    → Silencio de 0.3-0.5s + luego impact
    → Es más poderoso que un riser en muchos casos

MÚSICA FADE OUT:
    → NUNCA al final del video (se siente amateur)
    → El video debe terminar con un corte definido, no con un fade
    EXCEPCIÓN: podcast/entrevista donde el fade es el estándar
```

## 18.2 Generación de música con IA

### 18.2.1 Usando Higgsfield

```
Para generar música de fondo personalizada:

Prompt efectivo para generate_audio:
    "Upbeat electronic beat, 110 BPM, energetic but not overwhelming,
     suitable for background music in a product showcase video,
     30 seconds, clean mix with room for voice over"

Prompt para música emotiva:
    "Gentle piano and strings, 70 BPM, reflective mood,
     cinematic feel, 60 seconds, minimal arrangement"

Prompt para beat de TikTok:
    "Trending TikTok style beat, 128 BPM, catchy melody,
     lo-fi hip hop influence, 15 seconds loop"

DESPUÉS de generar:
    1. Verificar que no suena "too AI" (repetitivo, sin variación)
    2. Verificar el BPM (puede no coincidir con el prompt)
    3. Recortar al tamaño del video
    4. Normalizar y mezclar a -15/-18 dB bajo la voz
```

---

# Capítulo 19: Subtítulos y kinetic captions

## 19.1 Por qué los subtítulos son obligatorios

```
DATOS:
- 85% de los videos en redes se ven SIN SONIDO (al menos inicialmente)
- Los subtítulos suben el watch time 12-25% en promedio
- Los subtítulos kinetic (animados) suben la retención 15-20% vs subtítulos estáticos

REGLA: TODO video de formato corto sale con subtítulos kinetic.
No hay excepción. Ni siquiera si "la voz se entiende bien".
Los subtítulos no son solo para entender — son un estímulo visual que retiene.
```

## 19.2 Estilos de subtítulo

### 19.2.1 Tabla de estilos

| Estilo | Descripción | Cuándo usarlo | Cómo implementarlo |
|---|---|---|---|
| **Word-by-word** | Cada palabra aparece y desaparece individualmente | Default para TODO | Transcripción con timestamps por palabra |
| **Highlight** | La palabra clave cambia de color al pronunciarse | Sobre word-by-word | Marcar keywords, cambiar color |
| **Karaoke fill** | El texto se "rellena" de color sincronizado | Contenido musical, energético | ASS con {\kf} tags |
| **Tracking text** | El texto sigue al sujeto en pantalla | Contenido dinámico, físico | Tracking de movimiento + overlay |
| **Playful bounce** | El texto rebota o rota levemente | Tono cómico, ligero | Keyframes de posición/rotación |
| **Block static** | Bloque de texto estático | Citas, datos largos | EVITAR para subtítulos de voz |

### 19.2.2 Árbol de decisión: ¿Qué estilo de subtítulo?

```
IF el video es talking head o cualquier formato con voz
    THEN estilo base = Word-by-word con highlight de keyword
    
    IF el tono es serio/educativo
        THEN animación = fade in suave (0.1s)
        color_keyword = CYAN #00d4d4 (marca All Import)
        
    ELSE IF el tono es divertido/energético
        THEN animación = pop (scale 0→100% en 0.08s) + leve bounce
        color_keyword = AMARILLO #f7c204
        
    ELSE IF el tono es premium/aspiracional
        THEN animación = fade in elegante (0.15s)
        color_keyword = BLANCO brillante con glow sutil
    END

ELSE IF el video es un screen recording
    THEN subtítulos posicionados FUERA del área de la pantalla grabada
    (arriba o abajo, no encima del contenido de la pantalla)
    
ELSE IF el video es B-roll puro (sin voz, con música)
    THEN no hay subtítulos de voz
    → Usar textos de overlay en su lugar (títulos, datos)
END
```

## 19.3 Implementación técnica de subtítulos

### 19.3.1 Formato ASS para subtítulos kinetic

El formato ASS (Advanced SubStation Alpha) es el más potente para subtítulos estilizados en ffmpeg.

**Estructura de un archivo .ass para word-by-word:**

```ass
[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Montserrat,72,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,4,0,2,40,40,200,1
Style: Keyword,Montserrat,76,&H00D4D400,&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,4,0,2,40,40,200,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.50,0:00:01.00,Default,,0,0,0,,¿Sabías
Dialogue: 0,0:00:01.00,0:00:01.30,Default,,0,0,0,,que
Dialogue: 0,0:00:01.30,0:00:01.80,Default,,0,0,0,,podés
Dialogue: 0,0:00:01.80,0:00:02.30,Default,,0,0,0,,tener
Dialogue: 0,0:00:02.30,0:00:03.00,Keyword,,0,0,0,,auriculares
Dialogue: 0,0:00:03.00,0:00:03.50,Default,,0,0,0,,que
Dialogue: 0,0:00:03.50,0:00:04.00,Keyword,,0,0,0,,suenan igual?
```

**Notas sobre colores en ASS:**
- El formato de color es `&HAABBGGRR` (ABGR, no ARGB/RGBA)
- CYAN #00d4d4 → `&H00D4D400` (AA=00 opaco, BB=D4, GG=D4, RR=00)
- BLANCO #f8fafa → `&H00FAFAF8`
- AMARILLO #f7c204 → `&H0004C2F7`

### 19.3.2 Aplicar subtítulos ASS con ffmpeg

```bash
# Subtítulos desde archivo .ass (libass)
ffmpeg -i video.mp4 -vf "ass=subtitulos.ass" \
    -c:v libx264 -crf 18 -c:a copy output.mp4

# Si no se tiene .ass, subtítulos simples con drawtext
ffmpeg -i video.mp4 \
    -vf "drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf': \
    text='¿Sabías que...?':fontcolor=white:fontsize=72: \
    borderw=4:bordercolor=black: \
    x=(w-text_w)/2:y=h*0.75: \
    enable='between(t,0.5,2.5)'" \
    -c:v libx264 -crf 18 -c:a copy output.mp4
```

### 19.3.3 Generación automática de subtítulos

```
PROBLEMA: faster-whisper (transcripción automática) está bloqueado
en este entorno (huggingface.co devuelve 403 desde el proxy).

ALTERNATIVAS:
1. Transcripción manual (el usuario escribe lo que dice el video)
2. Usar CapCut en el celular para auto-subtítulos (luego exportar)
3. Pedir al usuario que proporcione el texto con timestamps
4. Usar la transcripción del guion original (si existe)

IF tengo el texto pero no los timestamps exactos
    THEN estimar timestamps basándose en:
    → Velocidad de habla promedio: 2.5-3 palabras por segundo
    → Duración total del video ÷ cantidad de palabras = duración promedio por palabra
    → Ajustar manualmente los puntos de inicio/fin de cada frase
END
```

## 19.4 Posicionamiento de subtítulos

### 19.4.1 Safe zones por plataforma

```
INSTAGRAM REELS:
┌──────────────────────┐
│  ┌────────────────┐  │ ← 150px margen superior (UI de IG)
│  │                │  │
│  │   ZONA SEGURA  │  │
│  │   para texto   │  │
│  │                │  │
│  │   ████████████ │  │ ← Subtítulos: y = 75% de la altura
│  │                │  │
│  └────────────────┘  │
│  ████████████████████│ ← 250px margen inferior (botones IG)
└──────────────────────┘

TIKTOK:
┌──────────────────────┐
│  ┌────────────────┐  │ ← 100px margen superior
│  │                │  │
│  │   ZONA SEGURA  │  │
│  │                │  │
│  │   ████████████ │  │ ← Subtítulos: y = 70-75%
│  │                │  │
│  └────────────────┘  │
│  ████████████████████│ ← 300px margen inferior (botones + descripción TikTok)
└──────────────────────┘

YOUTUBE SHORTS:
┌──────────────────────┐
│  ┌────────────────┐  │ ← 120px margen superior
│  │                │  │
│  │   ZONA SEGURA  │  │
│  │                │  │
│  │   ████████████ │  │ ← Subtítulos: y = 70-75%
│  │                │  │
│  └────────────────┘  │
│  ████████████████████│ ← 200px margen inferior
└──────────────────────┘
```

### 19.4.2 Reglas de posicionamiento

```
IF subtítulos de voz (word-by-word)
    THEN posición = centro horizontal, 70-80% de altura vertical
    → Nunca en la zona inferior donde están los botones de la plataforma
    → Nunca cubriendo el rostro del hablante

ELSE IF texto de hook/título
    THEN posición = centro horizontal, 15-25% de altura vertical (zona superior)
    → O centrado totalmente si no hay rostro en el frame

ELSE IF overlay (contador, notificación, logo)
    THEN posición = según el tipo:
    - Contador de dinero: esquina superior derecha o centro
    - Notificación: parte superior (como una notificación real)
    - Logo: esquina inferior izquierda o derecha, pequeño
END
```

## 19.5 Checklist de subtítulos

- [ ] ¿Todos los subtítulos son word-by-word (no bloques estáticos)?
- [ ] ¿Las keywords están resaltadas en color de marca (CYAN #00d4d4)?
- [ ] ¿La fuente es Montserrat Bold (o equivalente bold sans)?
- [ ] ¿El tamaño es legible en pantalla de celular (mínimo 48px en 1080p)?
- [ ] ¿Hay contorno negro (mínimo 3px) para legibilidad sobre cualquier fondo?
- [ ] ¿Los subtítulos están dentro de la safe zone?
- [ ] ¿No cubren el rostro del hablante?
- [ ] ¿La sincronización es frame-accurate con la pronunciación?
- [ ] ¿No hay errores ortográficos?
- [ ] ¿Se usa máximo 2 tipografías en todo el video?

---

# Capítulo 20: Overlays gráficos

## 20.1 Catálogo completo de overlays

### 20.1.1 Tabla expandida de overlays

| # | Overlay | Qué transmite | Cuándo usarlo | SFX asociado | Duración en pantalla | Animación |
|---|---|---|---|---|---|---|
| 1 | Contador de dinero | Resultado tangible | Al mencionar una cifra de dinero | Amount display (digital) | 2-4s (sync con voz) | Incremento rápido |
| 2 | Contador de vistas/likes | Prueba social | Al mostrar éxito de un video/cuenta | Pop + digital SFX | 2-3s | Conteo ascendente |
| 3 | Notificación falsa | Curiosidad, FOMO | Giro inesperado, dato nuevo | Sonido de notificación iOS/Android | 2-3s | Slide in desde arriba |
| 4 | Logo / marca | Autoridad, contexto | Al nombrar una empresa/herramienta | Pop + whoosh | 1-2s | Slide in + pop |
| 5 | Número grande animado | Impacto de cifra | Estadísticas, resultados | Impact al llegar al número | 2-3s | Conteo ascendente |
| 6 | Barra de carga | Urgencia | Hook de apertura, "loading" | Digital loading SFX | 3-5s (hasta "100%") | Progreso lineal |
| 7 | Check / tick animado | Confirmación | Al validar un paso o feature | Click/pop | 0.5-1s | Scale 0→100% + bounce |
| 8 | Cruz / X roja | Negación | Al descartar una opción | Error buzz | 0.5-1s | Scale + shake |
| 9 | Flecha / pointer | Dirección de atención | Señalar un elemento en pantalla | Pop | 1-3s | Slide in + bounce |
| 10 | Emoji animado | Emoción / tono | Reforzar el sentimiento del momento | Pop | 0.5-1.5s | Scale + bounce |
| 11 | Pill / badge de precio | Precio del producto | Al mencionar precio | Impact | 2-4s | Slide in desde lateral |
| 12 | VS divider | Comparación | Comparar dos opciones | Whoosh | Duración del segmento | Slide in vertical |
| 13 | Progress bar | Avance en tutorial | Durante pasos de un proceso | Soft chime | Duración del paso | Incremento progresivo |
| 14 | Quote box | Cita textual | Al citar a alguien o a uno mismo | Ninguno o suave | 3-5s | Fade in + scale leve |
| 15 | Sticker de "NEW" / "HOT" | Novedad, urgencia | Producto recién llegado | Pop | 2-3s | Bounce + rotation leve |

### 20.1.2 Árbol de decisión: ¿Qué overlay necesito?

```
IF se menciona dinero / precio / cifra monetaria
    THEN → Contador de dinero (#1) + SFX digital
    
ELSE IF se menciona un número/estadística no monetaria
    THEN → Número grande animado (#5) + impact
    
ELSE IF se quiere introducir un giro narrativo
    THEN → Notificación falsa (#3) + SFX de notificación
    
ELSE IF se menciona una marca/herramienta/app
    THEN → Logo (#4) + pop
    PERO solo si se tiene el logo sin infringir marca
    
ELSE IF se valida/confirma algo (feature, paso completado)
    THEN → Check tick (#7) + click
    
ELSE IF se niega/descarta algo
    THEN → Cruz X (#8) + error buzz
    
ELSE IF hay un precio de producto
    THEN → Pill de precio (#11) en CYAN con texto oscuro
    
ELSE IF se comparan dos opciones
    THEN → VS divider (#12) + whoosh
    
ELSE IF el hook necesita un "loading" effect
    THEN → Barra de carga (#6) + digital SFX
    
ELSE IF se quiere señalar algo específico en el frame
    THEN → Flecha (#9) + pop
    
ELSE
    → Probablemente no se necesita overlay en este momento
    → Recuerda: un overlay sin función es ruido
END
```

## 20.2 Reglas de overlays

### 20.2.1 Reglas de composición

```
REGLA 1: NUNCA más de 2 overlays simultáneos en pantalla
    SI hay subtítulo + overlay + logo al mismo tiempo → quitar uno
    
REGLA 2: Cada overlay entra Y sale con animación + SFX
    NUNCA aparece/desaparece en estático
    NUNCA aparece sin su SFX de anclaje
    
REGLA 3: El overlay no se queda más tiempo del necesario
    IF el espectador ya leyó/procesó el overlay
        THEN sacarlo (animación de salida)
    → Regla general: duración = tiempo de lectura + 0.5s de procesamiento
    
REGLA 4: El overlay no cubre información más importante
    NUNCA cubrir el rostro del hablante
    NUNCA cubrir otro overlay activo
    NUNCA cubrir la acción principal del video
    
REGLA 5: El estilo visual del overlay es coherente con la marca
    Colores: NAVY, CYAN, WHITE (paleta All Import)
    Tipografía: Montserrat Alternates
    Bordes redondeados en pills
    Sin sombras duras (sombra suave 2-4px si es necesaria)
```

### 20.2.2 Implementación de pill de precio en ffmpeg

```bash
# Pill de precio: fondo CYAN (#00d4d4), texto NAVY oscuro (#0a0f1a)
# Posicionado en el centro, aparece en t=5 y desaparece en t=8

ffmpeg -i video.mp4 \
    -vf "drawbox=x=(w-300)/2:y=h*0.5-30:w=300:h=60:color=0x00d4d4@0.9:t=fill: \
         enable='between(t,5,8)', \
         drawtext=fontfile='allimport/historias/fonts/MontserratAlternates-Bold.ttf': \
         text='\$10.000':fontcolor=0x0a0f1a:fontsize=48: \
         x=(w-text_w)/2:y=h*0.5-15: \
         enable='between(t,5,8)'" \
    -c:v libx264 -crf 18 -c:a copy output.mp4
```

---

# Capítulo 21: Color grading y tratamiento visual

## 21.1 Fundamentos de color para video

### 21.1.1 Los 4 controles básicos

| Control | Qué hace | Rango recomendado para contenido orgánico |
|---|---|---|
| **Contraste** | Diferencia entre claros y oscuros | +5 a +15% |
| **Saturación** | Intensidad de los colores | -10% a +5% (desaturar leve = look moderno) |
| **Temperatura** | Frío (azul) vs cálido (naranja) | Ajustar al entorno (6500K = neutral) |
| **Sombras/Highlights** | Controlar las zonas oscuras y claras | Sombras +5-10%, Highlights -5-10% |

### 21.1.2 Árbol de decisión: tratamiento de color

```
IF el material crudo tiene buena luz natural
    THEN ajuste mínimo:
        contraste +5-10%
        saturación -5% (look moderno desaturado)
        highlights -10% (recuperar blancos quemados)
        → Resultado: natural pero "elevado"

ELSE IF la luz es cálida/amarilla (incandescente, atardecer)
    THEN
        IF quiero mantener la calidez (BTS, lifestyle)
            THEN temperatura → no tocar, solo contraste +10%
        ELSE IF necesito tono neutral
            THEN temperatura → enfriar (bajar a 5000-5500K)
            → Ajustar tint (verde/magenta) si la piel queda verde
        END

ELSE IF la luz es fría/azul (fluorescente, sombra)
    THEN calentar la temperatura (subir a 6500-7000K)
    → Shadows → subir leve para que las zonas oscuras no sean azules
    
ELSE IF la luz es mixta (ventana + fluorescente, etc.)
    THEN shot-by-shot, no hay una corrección global
    → Priorizar que los skin tones sean coherentes entre shots
    → Si no es posible unificar: cortar a B-roll entre shots discordantes

ELSE IF es B-roll que irá debajo de texto
    THEN desaturar significativamente:
        saturación = -80% a -100% (casi B&N o B&N total)
        contraste +10-15% (para que haya textura visual)
        → Esto hace que el texto de color (CYAN, AMARILLO) resalte
END
```

### 21.1.3 Comandos ffmpeg para color grading

```bash
# Ajuste básico: contraste +10%, saturación -5%, brillo +3%
ffmpeg -i input.mp4 \
    -vf "eq=contrast=1.1:saturation=0.95:brightness=0.03" \
    -c:v libx264 -crf 18 -c:a copy output.mp4

# Desaturar a blanco y negro para B-roll con texto
ffmpeg -i input.mp4 \
    -vf "hue=s=0" \
    -c:v libx264 -crf 18 -c:a copy output_bw.mp4

# Ajustar temperatura (calentar: shift hacia rojo/amarillo)
ffmpeg -i input.mp4 \
    -vf "colorbalance=rs=0.05:gs=-0.02:bs=-0.08" \
    -c:v libx264 -crf 18 -c:a copy output_warm.mp4

# Ajustar temperatura (enfriar: shift hacia azul)
ffmpeg -i input.mp4 \
    -vf "colorbalance=rs=-0.05:gs=0.02:bs=0.08" \
    -c:v libx264 -crf 18 -c:a copy output_cool.mp4

# LUT 3D (si se tiene un archivo .cube)
ffmpeg -i input.mp4 \
    -vf "lut3d=file=mi_look.cube" \
    -c:v libx264 -crf 18 -c:a copy output_lut.mp4
```

## 21.2 Coherencia visual entre tomas

### 21.2.1 Proceso de unificación

```
1. Elegir un shot de referencia (el que mejor se ve)
2. Anotar sus valores: temperatura, contraste, saturación, exposición
3. Para cada shot restante:
    a. Comparar con el de referencia
    b. Ajustar para que los skin tones coincidan
    c. Ajustar para que los blancos sean del mismo tono
    d. Verificar que el fondo no cambie drásticamente de color

PRIORIDAD de coherencia:
1. Skin tones (lo primero que el ojo detecta como "incorrecto")
2. Blancos (segundo más notorio)
3. Fondos (menos notorio pero contribuye a la coherencia)
4. Saturación general (afecta la "vibra" del video)
```

### 21.2.2 Checklist de color grading

- [ ] ¿Los skin tones son naturales? (no naranja, no gris, no verde)
- [ ] ¿La temperatura es consistente entre todas las tomas?
- [ ] ¿El contraste es suficiente para que se vea bien en pantallas de celular?
- [ ] ¿Los highlights no están quemados (completamente blancos sin detalle)?
- [ ] ¿Las sombras no son bloques negros sin detalle?
- [ ] ¿El B-roll con texto está desaturado?
- [ ] ¿El look general es coherente con la marca? (tono dark/premium para All Import)

---

# Capítulo 22: B-Roll — captura, selección y uso

## 22.1 Qué es B-Roll y por qué es crítico

B-Roll es todo lo que NO es el hablante directo a cámara. Incluye: planos de producto, planos de entorno, close-ups de detalles, screen recordings, grabaciones de acciones, paisajes, textos en pantalla.

```
SIN B-ROLL:
    El video es un talking head continuo
    → El espectador se aburre después de 5-8 segundos
    → No hay pattern interrupts visuales
    → La retención cae linealmente

CON B-ROLL:
    El video alterna entre A-roll y B-roll
    → Cada corte a B-roll es un mini pattern interrupt
    → El espectador tiene estímulos visuales variados
    → La retención se mantiene en ondas, no cae en línea recta
```

## 22.2 Tipos de B-Roll

### 22.2.1 Tabla de tipos con uso

| Tipo de B-Roll | Descripción | Cuándo usarlo | Duración por clip |
|---|---|---|---|
| **Close-up de producto** | Extreme close-up del producto | Al mencionar features, calidad | 1-3s |
| **Producto en uso** | El producto siendo usado | Demo, showcase | 2-4s |
| **Manos + producto** | Manos manipulando el producto | Unboxing, detalle táctil | 1-3s |
| **Entorno / contexto** | Plano del espacio, la ciudad, el escritorio | Contextualizar, establecer | 2-3s |
| **Screen recording** | Pantalla del celular/computadora | Tutorial digital, prueba | 3-8s |
| **Texto en pantalla** | Texto grande sobre fondo oscuro o B-roll desaturado | Datos, estadísticas, pasos | 2-4s |
| **Expresión facial** | Reacción del creador sin hablar | Humor, énfasis emocional | 0.5-2s |
| **IA generada** | Imagen o video generado por IA | Concepto abstracto, fantasía | 1-3s |
| **Stock footage** | Video de stock (pagado o libre) | Conceptos genéricos | 1-3s |

### 22.2.2 Árbol de decisión: ¿Qué B-Roll necesito?

```
IF el A-roll menciona un producto físico
    THEN
        B-roll prioritario: close-up del producto + producto en uso
        B-roll secundario: unboxing (manos + producto)
        
ELSE IF el A-roll explica un concepto abstracto
    THEN
        OPCIÓN A: Texto grande en pantalla sobre fondo oscuro
        OPCIÓN B: Imagen de IA que ilustre el concepto
        OPCIÓN C: Screen recording de una búsqueda/ejemplo
        
ELSE IF el A-roll cuenta una historia personal
    THEN
        B-roll: footage del lugar donde pasó la historia
        O: expresiones faciales de reacción
        O: fotos/capturas de pantalla del momento
        
ELSE IF el A-roll es un tutorial paso a paso
    THEN
        B-roll: screen recording de cada paso
        + close-up de manos si es físico
        + texto con instrucciones en pantalla
        
ELSE IF no hay B-roll disponible y no se puede generar
    THEN
        compensar con:
        → Zoom punches (variar el encuadre del A-roll)
        → Textos y overlays en pantalla
        → Cambios de color/filtro en el A-roll
        → Más SFX para que el audio compense la monotonía visual
END
```

## 22.3 Reglas de uso de B-Roll

### 22.3.1 Cuándo cortar a B-Roll

```
CORTAR A B-ROLL CUANDO:
✓ El hablante menciona algo que se puede MOSTRAR
✓ Han pasado 4-5 segundos sin cambio visual (pattern interrupt)
✓ El hablante hace una pausa natural entre ideas
✓ Se necesita cubrir un jump cut feo

NO CORTAR A B-ROLL CUANDO:
✗ El hablante está en medio de una expresión emocional clave
    (la expresión facial es el contenido)
✗ El B-roll no tiene relación con lo que se dice
✗ Ya hay un overlay activo (demasiados estímulos simultáneos)
✗ El B-roll es genérico y no aporta contexto nuevo
```

### 22.3.2 Audio durante B-Roll

```
REGLA: El audio del A-roll (voz del hablante) SIEMPRE continúa
durante el B-roll. Esto es un L-cut implícito.

NUNCA mutear la voz durante el B-roll (excepto si el B-roll es
un screen recording con su propia narración).

Agregar foley específico al B-roll SI la acción en el B-roll
tiene un sonido reconocible:
    - Producto sacándose de la caja → foley de unboxing
    - Manos tocando el producto → foley de materiales
    - Screen recording → SFX de click/toggle
```

### 22.3.3 B-Roll en blanco y negro

```
IF hay texto en pantalla ENCIMA del B-roll
    THEN desaturar el B-roll a B&N o 80% desaturado
    → El texto de color (CYAN, AMARILLO, BLANCO) resalta sobre B&N
    → Sin desaturar, el texto compite con los colores del B-roll
    
    ffmpeg: -vf "hue=s=0" (B&N total)
    o: -vf "hue=s=0.2" (80% desaturado, conserva algo de color)
    
ELSE IF no hay texto encima del B-roll
    THEN mantener el color original del B-roll
    → El B-roll a color aporta variedad visual
END
```

---

# Capítulo 23: Imágenes y video generados por IA

## 23.1 Cuándo usar IA para generar assets visuales

### 23.1.1 Árbol de decisión

```
IF necesito mostrar algo que NO PUEDO GRABAR
    (concepto abstracto, escena ficticia, visualización de datos)
    THEN generar con IA → es la opción más eficiente
    
ELSE IF necesito B-roll genérico (paisaje, oficina, producto genérico)
    THEN
        IF tengo B-roll grabado propio
            THEN usar el propio (más auténtico)
        ELSE IF tengo stock footage disponible
            THEN usar stock (más controlado que IA)
        ELSE
            generar con IA como último recurso
        END
        
ELSE IF necesito un thumbnail o imagen de portada
    THEN generar con IA → es ideal para esto
    
ELSE IF el estilo del video es "toyification" o fantasía
    THEN generar con IA → es lo que el formato pide
    
ELSE IF el video es contenido orgánico/auténtico
    THEN
        CUIDADO: demasiada IA rompe la autenticidad
        → Usar IA solo para 1-2 cutaways puntuales, no como B-roll principal
END
```

## 23.2 Generación con Higgsfield

### 23.2.1 Imágenes para cutaways

```
Para generar una imagen de cutaway a pantalla completa:

Herramienta: Higgsfield generate_image

Prompt efectivo:
    "Cinematic vertical shot (9:16 aspect ratio), [descripción de la escena],
     dramatic lighting, photorealistic style, high detail, 
     suitable as a full-screen cutaway in a short-form video"

Prompt para toyification:
    "Action figure toy version of [descripción], displayed in a toy box,
     miniature scale, plastic texture, collectible figure photography,
     vertical 9:16, studio lighting"

Prompt para lifestyle:
    "Young Argentine entrepreneur, casual style, working on laptop,
     natural light, modern minimal space, candid moment,
     vertical 9:16, cinematic film look"

DESPUÉS de generar:
    1. Verificar que la imagen no se ve "demasiado IA"
       → Si es perfecta/pulida: agregar grain con ffmpeg
    2. Verificar el aspecto (debe ser 9:16 para vertical)
    3. Preparar para inserción: la imagen estática dura 1-3s
       → Agregar Ken Burns (zoom lento) para que no sea frame fijo
```

### 23.2.2 Video IA para B-roll

```
Herramienta: Higgsfield generate_video

Prompt efectivo:
    "Close-up shot of [acción/escena], smooth camera movement,
     cinematic look, 3-5 seconds, suitable for vertical short-form video"

DESPUÉS de generar:
    1. Verificar calidad (artefactos, dedos extra, distorsiones)
    2. Reframe a 9:16 si es necesario (Higgsfield reframe tool)
    3. Insertar con corte abrupto + glitch/whoosh SFX
       NUNCA con dissolve suave
```

### 23.2.3 Ken Burns sobre imagen estática

```bash
# Zoom in lento (Ken Burns) sobre una imagen estática de 2s
ffmpeg -loop 1 -i imagen_ia.png -t 2 \
    -vf "scale=1200:2134,zoompan=z='zoom+0.002':d=60:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920" \
    -c:v libx264 -crf 18 -pix_fmt yuv420p output.mp4

# Zoom out lento
ffmpeg -loop 1 -i imagen_ia.png -t 2 \
    -vf "scale=1200:2134,zoompan=z='1.1-in*0.002':d=60:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920" \
    -c:v libx264 -crf 18 -pix_fmt yuv420p output.mp4
```

## 23.3 Reglas de uso de IA en video

### 23.3.1 Do's and Don'ts

```
DO:
✓ Usar IA para conceptos imposibles de grabar
✓ Usar IA para thumbnails y portadas
✓ Aplicar grain/imperfección para que no se vea "demasiado IA"
✓ Mantener consistencia de personaje si se usa en múltiples escenas
✓ Cortar a IA con transición abrupta (glitch/whoosh), no suave

DON'T:
✗ Usar IA como reemplazo total del B-roll real (pierde autenticidad)
✗ Generar personas reconocibles sin permiso
✗ Generar productos de marca ajena (logos de Nike, Apple, etc.)
✗ Usar IA tan pulida que se ve "artificial" — la tendencia 2026 es imperfección
✗ Usar fade/dissolve para entrar en un cutaway de IA (rompe la inmersión)
```

---

# Capítulo 24: Pattern interrupts — el sistema de retención

## 24.1 La ciencia del pattern interrupt

Un pattern interrupt es cualquier cambio súbito de visual, audio o ritmo que reengancha a un espectador cuya atención empieza a decaer. Funciona porque el cerebro tiene un sistema de detección de novedad: cuando algo cambia, el cerebro dice "esto es nuevo, podría ser importante" y vuelve a prestar atención.

**Impacto medido:**
- Los pattern interrupts bien aplicados suben el watch time promedio 20-35%
- Un video con 80% de retención promedio se distribuye ~10x más que uno con 40%
- La retención es la señal #1 que usan los algoritmos de TikTok e Instagram para decidir el alcance

## 24.2 Catálogo completo de pattern interrupts

### 24.2.1 Los 15 tipos de pattern interrupt

| # | Tipo | Descripción | Intensidad | Mejor para | SFX asociado |
|---|---|---|---|---|---|
| 1 | Cambio de tamaño de plano | Wide → close-up o viceversa | Media | Todo tipo de video | Ninguno o whoosh suave |
| 2 | Corte a B-roll | Pasar a video de apoyo | Media | Talking head, tutorial | Whoosh |
| 3 | Corte a screen recording | Mostrar pantalla | Media | Tutorial, demo, prueba | Toggle/click |
| 4 | Corte a IA fullscreen | Imagen/video IA a pantalla completa | Alta | Concepto abstracto, fantasía | Glitch + whoosh |
| 5 | Resultado primero | Mostrar el resultado antes del proceso | Alta | Tutorial, antes/después | Impact |
| 6 | Subtítulo que reformula | Texto que resume lo que se dijo | Baja | Datos complejos, educación | Pop |
| 7 | Zoom punch | Zoom in rápido al sujeto | Media | Énfasis, dato clave | Bass hit suave |
| 8 | Cambio de filtro/color | Aplicar un filtro distinto momentáneamente | Media | Flashback, ironía | Ninguno |
| 9 | Flash blanco | Frame blanco de 2-4 frames | Alta | Cambio de tema, reveal | Flash SFX |
| 10 | Glitch | Distorsión digital momentánea | Alta | Dato chocante, corte a IA | Glitch SFX |
| 11 | Speed ramp | Acelerar o ralentizar | Media-Alta | Acción, demo, comedia | Whoosh continuo |
| 12 | Split screen | Dividir pantalla en 2+ | Media | Comparación, antes/después | Whoosh |
| 13 | Sticker/emoji animado | Emoji o sticker que aparece con bounce | Baja | Humor, reacción, tono ligero | Pop |
| 14 | Corte a foto/captura | Mostrar una foto o screenshot | Media | Prueba, evidencia | Camera shutter |
| 15 | Silencio abrupto | Cortar música/audio de golpe | Alta | Pre-reveal, dato chocante | Silencio |

### 24.2.2 Frecuencia y distribución

```
VIDEO DE 30 SEGUNDOS (formato corto):
    
    Interrupts mínimos: 6 (1 cada 5 segundos)
    Interrupts óptimos: 8-10 (1 cada 3-4 segundos)
    Interrupts máximos: 15 (1 cada 2 segundos) ← solo para TikTok agresivo
    
    Distribución recomendada:
    0:00-0:03  →  2-3 interrupts (hook denso)
    0:03-0:10  →  2-3 interrupts
    0:10-0:20  →  2-3 interrupts
    0:20-0:30  →  2-3 interrupts (cierre denso)

VIDEO DE 60 SEGUNDOS:
    Interrupts mínimos: 10
    Interrupts óptimos: 15-20
    
VIDEO DE 3+ MINUTOS:
    1-2 interrupts por cada 15 segundos (4-8 por minuto)
```

### 24.2.3 Árbol de decisión: ¿Qué pattern interrupt uso ahora?

```
IF es el primer segundo del video (hook)
    THEN interrupt de ALTA intensidad:
        → Snap zoom (#7) + impact SFX
        → O flash blanco (#9) + bass hit
        → O hard cut abrupto con movimiento

ELSE IF hace más de 5 segundos que no hay cambio visual
    THEN insertar un interrupt de MEDIA intensidad:
        IF hay B-roll disponible
            THEN → Corte a B-roll (#2) + whoosh
        ELSE IF el hablante dijo algo que se puede amplificar con texto
            THEN → Subtítulo reformulado (#6) + pop
        ELSE
            → Zoom punch (#7) en el frame actual + bass hit suave
        END

ELSE IF el hablante va a decir el dato más importante del video
    THEN interrupt ANTES del dato (anticipación):
        → Silencio abrupto (#15) 0.3-0.5s
        → O riser + zoom in lento
        → LUEGO el dato con impact + zoom punch + overlay

ELSE IF el tono cambia (de serio a cómico, o viceversa)
    THEN interrupt de contraste:
        → Flash blanco (#9) o glitch (#10) como separador
        → Cambio de filtro (#8) si es flashback o ironía

ELSE IF estoy en el cierre / pre-CTA
    THEN interrupt de ALTA intensidad (igual al hook):
        → Riser + impact + overlay de CTA
        → La energía del cierre = la energía del hook
END
```

## 24.3 Mapa de interrupts para un video ejemplo

### 24.3.1 Talking Head de 30s — mapa completo

```
TIEMPO   INTERRUPT                    TIPO      INTENSIDAD   SFX
──────   ─────────────────────────    ────      ──────────   ───────────
0:00     Snap zoom al rostro          #7        ALTA         Bass hit
0:00.5   Texto hook aparece           #6        MEDIA        Pop
0:02     B-roll de producto           #2        MEDIA        Whoosh
0:05     Zoom punch al dato           #7        MEDIA        Impact suave
0:08     Screen recording             #3        MEDIA        Toggle
0:11     Vuelta a A-roll              #1        MEDIA        Whoosh
0:13     Número grande animado        overlay   MEDIA        Impact
0:16     Corte a close-up             #1        BAJA         Ninguno
0:19     Silencio abrupto             #15       ALTA         Silencio
0:19.5   Reveal del dato clave        #7+#5     ALTA         Impact fuerte
0:22     B-roll de resultado          #2        MEDIA        Whoosh
0:25     Zoom punch al CTA            #7        MEDIA        Riser
0:27     Overlay WhatsApp             overlay   MEDIA        Pop
0:29     Impact de cierre             —         ALTA         Impact final

TOTAL: 14 interrupts en 30 segundos = ~28 BPM de edición
Esto es adecuado para Instagram Reels (20-40 BPM)
```

## 24.4 Diagnóstico de retención

### 24.4.1 Interpretar la curva de retención

```
IF la retención cae FUERTE en los primeros 3 segundos
    THEN problema = hook débil
    SOLUCIÓN:
        → Agregar SFX más agresivo en el frame 1
        → Agregar texto gancho más provocador
        → Agregar movimiento visual inmediato (snap zoom, whip-pan)
        → Considerar cambiar el hook completamente

ELSE IF la retención cae GRADUALMENTE durante todo el video
    THEN problema = pacing demasiado lento o contenido genérico
    SOLUCIÓN:
        → Aumentar la frecuencia de pattern interrupts (de cada 5s a cada 3s)
        → Agregar más B-roll y variación visual
        → Considerar acortar el video (eliminar las partes más débiles)
        → Agregar más SFX y zoom punches

ELSE IF la retención cae ABRUPTAMENTE en un punto específico
    THEN problema = hay un "momento muerto" o aburrido en ese punto
    SOLUCIÓN:
        → Identificar qué hay en ese timestamp
        → Cortar esa sección O insertar un interrupt fuerte ahí
        → Si no se puede cortar (es información necesaria), 
          agregar B-roll + overlay para hacerlo más visual

ELSE IF la retención SUBE en algún momento del video
    THEN eso es un punto de reenganche → estudiar qué hay ahí
    → Probablemente un dato sorprendente + buena edición
    → Replicar ese patrón en otros videos

ELSE IF la retención es ALTA (>80%) todo el video
    THEN la edición está funcionando → documentar qué hiciste
    → Replicar el estilo en los próximos videos
    → Considerar hacer el video más largo (hay margen de retención)
END
```

## 24.5 Checklist de pattern interrupts

- [ ] ¿Hay al menos 1 pattern interrupt cada 5 segundos?
- [ ] ¿El hook (0-3s) tiene al menos 2 interrupts?
- [ ] ¿El cierre tiene tanta energía como el hook?
- [ ] ¿Los interrupts son VARIADOS? (no solo zoom punches, no solo B-roll)
- [ ] ¿Cada interrupt tiene SFX asociado? (excepto cambios de plano sutiles)
- [ ] ¿Los interrupts no interrumpen un momento emocional clave del hablante?
- [ ] ¿El B-roll usado como interrupt ilustra lo que se dice? (no es aleatorio)
- [ ] ¿Los interrupts de alta intensidad están reservados para momentos clave?
- [ ] ¿No hay más de 2 interrupts del mismo tipo consecutivos?
- [ ] ¿La frecuencia de interrupts se ajustó a la plataforma? (más en TikTok, menos en IG)

---

> **Fin de PARTE 03** — Continúa en [MASTER_VIDEO_EDITOR_PARTE_04.md](MASTER_VIDEO_EDITOR_PARTE_04.md): Capítulos 25-32 (Safe Zones, Formatos y Aspect Ratio, Exportación, Audio Avanzado, Motion Graphics, Thumbnails, Historias de Instagram, Carruseles).
