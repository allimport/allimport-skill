# MASTER VIDEO EDITOR — PARTE 02
## Manual profesional de edición de video para Claude Code
### Capítulos 9–16: Descubrimiento del Video, Análisis Profundo, Guion, Hook, Estructura Narrativa, Pacing, Cortes y Transiciones

---

# TABLA DE CONTENIDO — PARTE 02

9. [Capítulo 9: Descubrimiento del video (material crudo)](#capítulo-9-descubrimiento-del-video-material-crudo)
10. [Capítulo 10: Análisis profundo del material](#capítulo-10-análisis-profundo-del-material)
11. [Capítulo 11: El guion como blueprint de edición](#capítulo-11-el-guion-como-blueprint-de-edición)
12. [Capítulo 12: El hook — los primeros 3 segundos](#capítulo-12-el-hook--los-primeros-3-segundos)
13. [Capítulo 13: Estructura narrativa por tipo de video](#capítulo-13-estructura-narrativa-por-tipo-de-video)
14. [Capítulo 14: Pacing — el ritmo del video](#capítulo-14-pacing--el-ritmo-del-video)
15. [Capítulo 15: Cortes — el lenguaje invisible](#capítulo-15-cortes--el-lenguaje-invisible)
16. [Capítulo 16: Transiciones — cuándo y cuáles](#capítulo-16-transiciones--cuándo-y-cuáles)

---

# Capítulo 9: Descubrimiento del video (material crudo)

## 9.1 Protocolo de ingesta

Cuando llega material crudo, este es el proceso completo de ingesta antes de cualquier decisión creativa.

### 9.1.1 Paso 1: Inventario técnico

Para cada archivo recibido, ejecutar:

```bash
ffprobe -v error \
    -show_entries format=filename,duration,size,bit_rate \
    -show_entries stream=index,codec_type,codec_name,width,height,r_frame_rate,channels,sample_rate,bit_rate \
    -of json archivo.mp4
```

**Registrar en una tabla:**

| Campo | Qué anotar | Por qué importa |
|---|---|---|
| Duración | Segundos totales | Para estimar duración final post-corte |
| Resolución | WxH (ej. 1920x1080) | Determina si hay que reescalar |
| FPS | 24/25/30/60 | Debe coincidir con el export final |
| Codec video | H.264/H.265/ProRes | Compatibilidad con pipeline |
| Codec audio | AAC/PCM/Opus | Calidad de partida del audio |
| Sample rate | 44100/48000 Hz | Coherencia con otros clips |
| Channels | 1 (mono) / 2 (stereo) | Si es mono, considerar centrar en la mezcla |
| Bitrate | Mbps | Calidad de partida |
| Tamaño | MB | Para planificar almacenamiento |

### 9.1.2 Paso 2: Visualización completa

```
REGLA: Ver TODO el material crudo sin saltar.
No se puede editar bien lo que no se conoce completamente.
```

Durante la visualización, tomar notas con timestamps:

```
[00:00-00:05] Intro, saludo a cámara. Energía MEDIA. Iluminación BUENA.
[00:05-00:12] Explica el tema. Energía ALTA. Gesto con la mano en 00:08.
[00:12-00:14] Pausa para pensar (CORTAR).
[00:14-00:25] Dato clave sobre el producto. Energía ALTA. USAR COMO HOOK.
[00:25-00:30] Se distrae, mira al costado (CORTAR o usar como BTS).
...
```

### 9.1.3 Paso 3: Clasificación de segmentos

Cada segmento anotado se clasifica:

```
IF el segmento tiene al creador hablando a cámara con contenido útil
    THEN clasificar como A-ROLL
    prioridad = ALTA
ELSE IF el segmento tiene al creador hablando pero repitiendo algo ya dicho
    THEN clasificar como A-ROLL REDUNDANTE
    prioridad = BAJA (backup si la primera toma tiene problemas)
ELSE IF el segmento muestra producto/entorno/detalle sin voz
    THEN clasificar como B-ROLL
    prioridad = MEDIA-ALTA (necesario para pattern interrupts)
ELSE IF el segmento es una reacción facial sin hablar
    THEN clasificar como REACTION SHOT
    prioridad = MEDIA (útil como cutaway o meme)
ELSE IF el segmento es una pausa, silencio o error
    THEN clasificar como DESCARTE
    prioridad = NULA (excepto si el "error" es auténtico/gracioso)
ELSE IF el segmento es una grabación de pantalla
    THEN clasificar como SCREEN RECORDING
    prioridad = MEDIA-ALTA
END
```

### 9.1.4 Paso 4: Evaluación de calidad técnica

Para cada segmento clasificado como A-ROLL o B-ROLL:

| Aspecto | Evaluar | Acción si es deficiente |
|---|---|---|
| **Foco** | ¿El sujeto está nítido? | Si es leve → sharpening sutil. Si es grave → descartar o usar como B-roll |
| **Exposición** | ¿Ni quemada ni oscura? | Corregir con eq/curves en ffmpeg. Si es irrecuperable → descartar |
| **Estabilidad** | ¿La toma tiembla? | Si es leve-medio → vidstab. Si es grave → descartar o cortar a plano fijo |
| **Audio** | ¿La voz se entiende? | Si hay ruido → noise reduction. Si es inaudible → descartar A-roll, conservar como B-roll mudo |
| **Encuadre** | ¿El sujeto está centrado/compuesto? | Si es 16:9 y necesito 9:16 → crop/reframe. Si el sujeto está cortado → ajustar con scale+pad |
| **Iluminación** | ¿La luz es consistente? | Unificar temperatura de color entre tomas |

### 9.1.5 Paso 5: Mapa del material

Al final de la ingesta, tener un documento con:

```
INVENTARIO DE MATERIAL
======================
Total archivos: X
Duración total cruda: X:XX
Duración estimada post-corte-silencios: X:XX (generalmente 60-70% del original)

SEGMENTOS USABLES:
- A-ROLL: XX segmentos, XX:XX total
- B-ROLL: XX segmentos, XX:XX total
- SCREEN RECORDING: XX segmentos, XX:XX total
- REACTION SHOTS: XX segmentos, XX:XX total
- DESCARTE: XX segmentos, XX:XX total

PROBLEMAS DETECTADOS:
- [lista de problemas técnicos que necesitan corrección]

ASSETS FALTANTES:
- [lista de B-roll, música, SFX, overlays que no están en el material crudo]

NEXT: [proceder a Fase 3 (selección) o Fase 4 (corte de silencios)]
```

---

# Capítulo 10: Análisis profundo del material

## 10.1 Más allá del inventario: lectura creativa del material

El inventario técnico dice QUÉ hay. El análisis profundo dice QUÉ SE PUEDE HACER con lo que hay.

### 10.1.1 Análisis de energía del hablante

```
Para cada segmento de A-ROLL:
    Evaluar la energía del hablante en una escala de 1-5:

    1 = BAJA: monotono, cansado, sin expresión
        → Solo usable si el contenido es irremplazable
        → Intentar compensar con más SFX y cortes rápidos

    2 = MEDIA-BAJA: conversacional tranquilo
        → Funciona para tutoriales, explicaciones calmadas
        → NO funciona como hook

    3 = MEDIA: conversacional con variación
        → Funciona para el cuerpo del video
        → Necesita SFX y pattern interrupts para sostener retención

    4 = MEDIA-ALTA: entusiasta, variación de tono
        → Funciona para casi todo
        → Ideal para datos clave y reveals

    5 = ALTA: mucha energía, gestos, variación
        → Ideal para hooks y momentos de cierre
        → Cuidado con mantener este nivel todo el video (fatiga)

IF ningún segmento tiene energía >= 4
    THEN el hook será el eslabón débil del video
    → Compensar con:
        - Más SFX y zoom punches en los primeros 3 segundos
        - Texto gancho fuerte que compense la voz plana
        - Un visual impactante que supla la falta de energía vocal
ELSE IF hay segmentos con energía 5 mezclados con segmentos de energía 2
    THEN hay un problema de coherencia
    → Usar los de energía 5 para hooks y cierres
    → Usar los de energía 2-3 para el cuerpo
    → La transición de energía 5→2 necesita un pattern interrupt fuerte
END
```

### 10.1.2 Análisis de contenido (qué dice, no cómo lo dice)

```
Para cada segmento de A-ROLL, clasificar el contenido:

IF contiene una afirmación provocadora o contraintuitiva
    THEN marcar como POTENCIAL HOOK
    → "Nadie te dice que...", "El error que todos cometen...", "Esto cambia todo..."

ELSE IF contiene un dato específico con número
    THEN marcar como DATO CLAVE
    → Requiere riser previo + impact al revelar el número
    → Overlay con número animado (contador ascendente)

ELSE IF contiene una explicación paso a paso
    THEN marcar como CUERPO / DESARROLLO
    → SFX de enumeración (Enter/Select, Glocken)
    → Subtítulos con cada paso numerado

ELSE IF contiene una conclusión o resumen
    THEN marcar como CIERRE
    → Escalar la energía de la edición al nivel del hook
    → Agregar CTA después

ELSE IF contiene una pregunta retórica
    THEN marcar como TRANSICIÓN
    → Pausa breve antes de la respuesta
    → B-roll o cambio de plano durante la pregunta

ELSE IF contiene humor o sarcasmo
    THEN marcar como MOMENT CÓMICO
    → SFX de ironía (creepy, glitter) o cartoon (slide whistle)
    → Posible zoom punch o cambio de expresión
END
```

### 10.1.3 Análisis de timing natural

El material crudo tiene un ritmo natural — el ritmo con el que el hablante entrega la información. El editor debe decidir si respetar, acelerar o romper ese ritmo.

```
IF el hablante habla a un ritmo de 2-3 palabras por segundo (ritmo natural)
    THEN
        IF el video es para TikTok
            THEN probablemente demasiado lento → acortar silencios, cortar muletillas
        ELSE IF el video es para YouTube largo
            THEN el ritmo es adecuado → conservar
        END

ELSE IF el hablante habla a un ritmo de 4-5 palabras por segundo (rápido)
    THEN
        IF el video es para TikTok
            THEN ritmo ideal → mantener
        ELSE IF el video es para YouTube largo o podcast
            THEN puede ser demasiado rápido → dejar micro-pausas para que el espectador procese
        END

ELSE IF el hablante habla con muchas pausas y "ehhh"
    THEN cortar TODAS las pausas no intencionales con cut-silence.mjs
    considerar speed ramp sutil (1.05x-1.1x) para tightening general
END
```

## 10.2 Mapeo de emociones del material

### 10.2.1 Curva emocional

Dibujar una curva emocional del material crudo (antes de editar):

```
ENERGÍA
5 │    ╱╲        ╱╲
4 │   ╱  ╲  ╱╲  ╱  ╲   ╱╲
3 │  ╱    ╲╱  ╲╱    ╲ ╱  ╲
2 │ ╱                ╲╱    ╲
1 │╱                         ╲
  └──────────────────────────────
  0s    10s    20s    30s    40s
       HOOK   CUERPO       CTA
```

La curva ideal para formato corto:
```
ENERGÍA
5 │╱╲         ╱╲         ╱╲
4 ││  ╲   ╱╲ ╱  ╲   ╱╲ ╱  │
3 ││   ╲ ╱  ╲    ╲ ╱  ╲    │
2 ││    ╲╱    ╲    ╲╱       │
1 ││                        │
  └──────────────────────────
  0s   HOOK  CUERPO     CTA
  
  PATRÓN: ALTO → baja → sube → baja → ALTO (cierre)
  - Empieza alto (hook agresivo)
  - Baja un poco (para crear contraste)
  - Sube en cada dato clave
  - Baja brevemente entre datos
  - Cierra alto (CTA con la energía del hook o mayor)
```

```
IF la curva del material crudo no coincide con la curva ideal
    THEN la edición debe compensar:
    
    IF el material empieza bajo y sube al final
        THEN reorganizar: poner el final como hook ("result first")
        
    ELSE IF el material es plano todo el video (energía 3 constante)
        THEN crear variación artificial:
            → SFX más agresivos en puntos clave
            → Zoom punches en momentos de énfasis
            → Cortes a B-roll para "reiniciar" la atención
            → Música que suba y baje en sync con el contenido
            
    ELSE IF el material tiene un pico en el medio y luego baja
        THEN considerar terminar el video antes de la caída
        o usar el pico como hook y reestructurar
    END
END
```

## 10.3 Decisiones de restructuración

### 10.3.1 ¿Mantengo el orden original o reestructuro?

```
IF el material crudo sigue un orden lógico claro (paso 1, 2, 3...)
    THEN mantener el orden
    → Solo cortar los muertos y agregar pattern interrupts
    
ELSE IF el momento más impactante NO está al principio
    THEN reestructurar:
    OPCIÓN A: "Result first" — mostrar el resultado final en el hook,
        luego explicar cómo se llegó ahí
    OPCIÓN B: "Teaser" — mostrar 2 segundos del momento más impactante
        como hook, luego ir al principio y llegar orgánicamente
    OPCIÓN C: "Jump" — empezar por el medio (donde arranca la energía),
        luego flashback al principio

ELSE IF el material tiene segmentos independientes (no hay un hilo único)
    THEN organizar por impacto decreciente:
    → Lo más fuerte primero (hook)
    → Lo segundo más fuerte después
    → Lo más débil al medio (donde hay más tolerancia)
    → El cierre tiene que ser tan fuerte como el hook
END
```

### 10.3.2 ¿Uso todo el material o recorto?

```
IF duración_cruda_post_silencios > duración_objetivo × 1.5
    THEN hay que recortar significativamente
    → Priorizar:
        1. Cortar redundancias (misma idea dicha dos veces → la mejor toma)
        2. Cortar tangentes (temas que no aportan al objetivo)
        3. Cortar muletillas y arranques falsos
        4. Acortar explicaciones largas (B-roll + voice over comprimida)
    → NO cortar datos clave ni el cierre/CTA

ELSE IF duración_cruda_post_silencios < duración_objetivo × 0.7
    THEN falta material
    → Opciones:
        1. Agregar más B-roll (filmado o generado por IA)
        2. Agregar screen recordings o demos
        3. Agregar texto en pantalla que amplifique (no que repita)
        4. Reducir la duración objetivo (un video corto que funciona > uno largo forzado)

ELSE (el material está en rango ±30% del objetivo)
    → Proceder normalmente
END
```

---

# Capítulo 11: El guion como blueprint de edición

## 11.1 Formatos de guion

### 11.1.1 Guion completo (pre-grabación)

El guion ideal para edición incluye no solo qué se dice, sino indicaciones de edición:

```
GUION — [Título del video]
Plataforma: Instagram Reels + TikTok
Duración objetivo: 30 segundos
Tipo: Talking Head con B-roll
Cuenta: @allimport.cba

---

[HOOK — 0:00-0:03]
(A-roll, close-up, energía 5/5)
"¿Sabías que el 90% de la gente paga el doble de lo que debería por esto?"
[Vine Boom en "90%" — zoom punch en "el doble" — texto: "90% paga de más"]

[DESARROLLO 1 — 0:03-0:10]
(A-roll → B-roll del producto en mano)
"Mirá, estos auriculares TWS suenan igual que los de 40 lucas"
[Whoosh al cortar a B-roll — riser antes de "40 lucas" — 
 contador de dinero: $40.000 subiendo — foley: sonido de 
 abrir la caja]

[DESARROLLO 2 — 0:10-0:20]
(A-roll, plano medio)
"La diferencia es que estos cuestan un cuarto de eso"
[Impact en "un cuarto" — corte a B-roll de precio con pill cyan 
 "$10.000" — SFX de coin/dinero — texto: "¿$10.000?"]
"Y la calidad del sonido es la misma, escuchá..."
[Corte a screen recording de ecualización del audio — foley de 
 auricular entrando en la oreja]

[CTA — 0:20-0:30]
(A-roll, close-up, energía 5/5)
"Si querés probarlos, escribime — te los llevo a donde estés en Córdoba"
[Riser antes del CTA — overlay: ícono de WhatsApp animado — 
 texto: "Link en bio" — música sube al final — impact de cierre]
```

### 11.1.2 Guion inverso (post-grabación)

Cuando el material crudo ya existe y no hay guion previo:

```
1. Ver todo el material
2. Anotar cada segmento usable con timestamp y contenido
3. Ordenar los segmentos en un flujo narrativo lógico
4. Marcar las marcas de edición [efecto — momento] según 
   sound-design-short-video
5. Identificar qué falta (B-roll, overlay, SFX)
```

**Árbol de decisión: ¿Necesito un guion inverso?**

```
IF el material crudo fue grabado con guion previo
    THEN el guion ya existe → verificar que se siguió y ajustar
ELSE IF el material crudo es una toma continua de 30+ segundos
    THEN SÍ, necesito un guion inverso para saber dónde cortar
ELSE IF el material crudo son múltiples clips cortos sin orden claro
    THEN SÍ, necesito un guion inverso para establecer el orden
ELSE IF el material crudo es un screen recording o tutorial
    THEN guion inverso simplificado: solo timestamps de pasos
END
```

## 11.2 Anotación del guion con marcas de edición

### 11.2.1 Proceso de anotación (sound-design-short-video)

Para cada línea del guion:

```
1. Identificar la FUNCIÓN NARRATIVA de esta línea:
    □ Gancho (primera línea, debe romper el patrón)
    □ Anticipación (prepara un reveal)
    □ Dato/Remate (el reveal mismo)
    □ Corte de cámara (cambio de tema/ángulo)
    □ Enumeración (lista de pasos/conceptos)
    □ Ironía/Sarcasmo (tono humorístico)
    □ Acción física (mover objeto, escribir, señalar)
    □ CTA (llamada a la acción final)

2. Asignar EFECTOS según la función (tabla §5.3.1):
    Gancho → Vine Boom / Metallic Riser
    Anticipación → Riser
    Dato/Remate → Impact
    Corte → Whoosh
    Enumeración → Enter/Select / Glocken
    Ironía → Creepy / Glitter
    Acción → Foley específico
    CTA → Riser + Impact de cierre

3. Agregar OVERLAYS según el contenido:
    IF se menciona dinero → contador de dinero
    IF se menciona un número → número animado
    IF se menciona una app/sitio → logo
    IF se quiere crear FOMO → notificación falsa

4. Marcar PATTERN INTERRUPTS:
    Verificar que hay al menos 1 cada 5 segundos
    Tipos: B-roll, zoom punch, cambio de plano, screen recording

5. Escribir la marca entre corchetes después de la línea:
    "[efecto/gráfico — momento exacto]"
```

### 11.2.2 Ejemplo completo de anotación

**Guion sin anotar:**
```
¿Sabías que podés tener auriculares que suenan igual que los de marca?
Estos cuestan la cuarta parte y mirá la calidad de sonido que tienen.
Cancelación de ruido activa, batería para todo el día.
Escribime y te los muestro en persona.
```

**Guion anotado:**
```
"¿Sabías que podés tener auriculares que suenan igual que los de marca?"
[HOOK — Vine Boom en "¿Sabías" — zoom punch en "suenan igual" — 
 texto: "¿SUENAN IGUAL?" en Montserrat Bold, CYAN — primer frame: 
 close-up rostro + producto en mano — duración: 3s]

"Estos cuestan la cuarta parte"
[Impact grave en "cuarta parte" — riser de 1s antes — 
 B-roll: close-up producto — overlay: contador $10.000 vs $40.000 — 
 whoosh al cortar de A-roll a B-roll — duración: 3s]

"y mirá la calidad de sonido que tienen"
[Foley: auricular entrando en oreja — corte a screen recording 
 de app de audio/ecualización — SFX de toggle/interfaz — 
 pop al aparecer la onda de sonido — duración: 4s]

"Cancelación de ruido activa, batería para todo el día."
[Enumeración: Enter/Select en "Cancelación" — Enter/Select en 
 "batería" — texto: "✓ ANC" aparece con pop, luego "✓ 24hs" 
 aparece con pop — B-roll del producto cerrado — duración: 4s]

"Escribime y te los muestro en persona."
[CTA — riser antes de "Escribime" — impact al cerrar — 
 overlay: ícono WhatsApp animado (slide in desde derecha) — 
 texto: "Link en bio" — música sube — duración: 3s]
```

## 11.3 Estructura de guion por tipo de video

### 11.3.1 Talking Head (fórmula AIDA adaptada)

```
ESTRUCTURA:
├── ATENCIÓN (0-3s): Hook provocador — LA promesa del video
├── INTERÉS (3-10s): ¿Por qué debería importarme? — el problema/oportunidad
├── DESEO (10-20s): La solución/producto/idea — con prueba visual
└── ACCIÓN (20-30s): CTA claro — qué hacer ahora
```

### 11.3.2 Producto en mano (fórmula PAS)

```
ESTRUCTURA:
├── PROBLEMA (0-5s): "¿Te pasa que..." o "El problema de..." + hook visual
├── AGITACIÓN (5-15s): Amplificar el dolor — mostrar lo que NO funciona
├── SOLUCIÓN (15-25s): El producto como respuesta — demo visual
└── CTA (25-30s): Cómo conseguirlo
```

### 11.3.3 Tutorial (fórmula RESULTADO PRIMERO)

```
ESTRUCTURA:
├── RESULTADO (0-3s): Mostrar el resultado final ANTES de explicar
├── CONTEXTO (3-8s): "Para llegar a esto, hacé esto:"
├── PASOS (8-25s): Paso 1, Paso 2, Paso 3 (con SFX de enumeración)
└── RECAPITULACIÓN + CTA (25-30s): "Así de fácil" + seguime/guardá
```

### 11.3.4 Storytime (fórmula TENSIÓN-RESOLUCIÓN)

```
ESTRUCTURA:
├── GANCHO (0-3s): "Me pasó algo increíble" / "No vas a creer esto"
├── CONTEXTO (3-10s): Situar la historia (dónde, cuándo, con quién)
├── CONFLICTO (10-30s): El problema/desafío/cosa que pasó
├── TENSIÓN MÁXIMA (30-45s): El momento más intenso
├── RESOLUCIÓN (45-55s): Cómo se resolvió
└── APRENDIZAJE + CTA (55-60s): Qué aprendí + seguime para más
```

### 11.3.5 Comparación (fórmula A vs B)

```
ESTRUCTURA:
├── HOOK (0-3s): "¿Cuál es mejor?" + los dos productos en pantalla
├── CRITERIO 1 (3-10s): Aspecto 1 comparado — ganador parcial
├── CRITERIO 2 (10-17s): Aspecto 2 comparado — ganador parcial
├── CRITERIO 3 (17-22s): Aspecto 3 comparado — ganador parcial
├── VEREDICTO (22-27s): ¿Cuál gana y por qué?
└── CTA (27-30s): Cómo conseguir el ganador
```

---

# Capítulo 12: El hook — los primeros 3 segundos

## 12.1 Anatomía del hook perfecto

El hook tiene 4 componentes que deben operar simultáneamente en los primeros 1-3 segundos:

```
┌──────────────────────────────────────────────┐
│            HOOK (0:00 - 0:03)                │
│                                              │
│  ┌─────────┐  ┌─────────┐                   │
│  │VISUAL   │  │SONORO   │                    │
│  │Movimiento│  │Impact   │                    │
│  │inmediato │  │bass hit │                    │
│  └────┬────┘  └────┬────┘                    │
│       │            │                         │
│  ┌────┴────┐  ┌────┴────┐                    │
│  │TEXTUAL  │  │VOCAL    │                    │
│  │2-5 words│  │Energía  │                    │
│  │promesa  │  │máxima   │                    │
│  └─────────┘  └─────────┘                    │
│                                              │
│  Los 4 operan JUNTOS, no secuencialmente     │
└──────────────────────────────────────────────┘
```

### 12.1.1 Componente visual del hook

```
IF tengo un resultado impactante para mostrar
    THEN abrir con el resultado visual:
        → Zoom rápido al resultado
        → El resultado ocupa todo el frame
        → Movimiento inmediato (no frame estático)

ELSE IF el contenido es talking head
    THEN
        close-up del rostro con expresión de energía
        + snap-zoom o whip-pan como primer movimiento
        + texto gancho apareciendo con pop animation
        
ELSE IF el contenido es producto
    THEN
        producto en mano entrando al frame
        o plano del producto con movimiento de cámara
        + texto de precio o comparación

ELSE IF el contenido es screen recording
    THEN
        resultado final del screen recording (no el proceso)
        + zoom al dato más impactante de la pantalla
```

### 12.1.2 Componente sonoro del hook

**Primer frame (frame 1, segundo 0.00):**
- Bass hit / Vine Boom / impact cinematográfico
- NUNCA empezar en silencio
- NUNCA empezar solo con música (sin SFX de impacto)

**Frame 1-30 (segundo 0.00-1.00):**
- Si hay corte de cámara: whoosh
- Si hay texto que aparece: pop
- Si hay zoom: riser corto

**Frame 30-90 (segundo 1.00-3.00):**
- Riser ascendente si se está construyendo hacia un reveal
- O mantener la densidad de SFX (1 SFX cada 0.5-0.8 segundos)

### 12.1.3 Componente textual del hook

El texto del hook debe ser:
- **Máximo 5 palabras** (se lee en <1 segundo)
- **Una promesa o una provocación**, no un saludo
- **Fuente bold grande**, mínimo 72px en 1080×1920

**Fórmulas de texto que funcionan:**

| Fórmula | Ejemplo | Cuándo usarla |
|---|---|---|
| "Nadie te dice que..." | "Nadie te dice que pagás el doble" | Revelar algo oculto |
| "Error #X" | "Error #1 al comprar auriculares" | Contenido educativo |
| "Probé por vos" | "Probé 5 auriculares por vos" | Review/comparación |
| "Esto cambia todo" | "Esto cambia todo si emprendés" | Dato transformador |
| "¿Sabías que...?" | "¿Sabías que hay una alternativa?" | Conocimiento nuevo |
| "No hagas esto" | "No hagas esto al comprar online" | Advertencia |
| "X vs Y" | "Original vs importación directa" | Comparación |
| "La verdad sobre..." | "La verdad sobre los TWS baratos" | Desmitificar |
| Número grande | "90% de las personas..." | Estadística impactante |
| Pregunta directa | "¿Pagás de más?" | Interpelar al espectador |

### 12.1.4 Componente vocal del hook

```
IF el hablante tiene buena energía natural
    THEN usar su voz directa, máxima intensidad
    → Las primeras palabras deben sonar como si fueran urgentes
    → NO empezar con "Hola" o "Bueno" o "Así que"

ELSE IF el hablante empieza bajo y sube
    THEN
        OPCIÓN A: Cortar los primeros segundos y empezar donde la energía sube
        OPCIÓN B: Usar voice-over con texto en pantalla para el hook,
            y entrar con la voz real después

ELSE IF el hablante tiene voz monótona
    THEN compensar con:
        → Más SFX y zooms
        → Texto gancho más grande y agresivo
        → Música de fondo con beat fuerte que aporte la energía que falta
END
```

## 12.2 Los 12 tipos de hook

### 12.2.1 Tabla de tipos con árbol de selección

| # | Tipo de hook | Descripción | Mejor para | Ejemplo |
|---|---|---|---|---|
| 1 | Provocación | Afirmación contraintuitiva o polémica | Alcance/viralidad | "El 90% de ustedes está pagando de más" |
| 2 | Resultado primero | Mostrar el resultado antes del proceso | Tutoriales, antes/después | "Mirá cómo quedó" (con visual del resultado) |
| 3 | Pregunta directa | Interpelar al espectador | Engagement, identificación | "¿Alguna vez compraste algo y te arrepentiste?" |
| 4 | Número/dato | Estadística impactante | Autoridad, educación | "Solo 3 de cada 100 emprendedores saben esto" |
| 5 | Curiosidad | Crear un vacío de información | Retención, storytelling | "Lo que pasó después no me lo esperaba" |
| 6 | Negación | "No hagas X" / "X no funciona" | Educación, advertencia | "No compres auriculares sin ver esto primero" |
| 7 | Social proof | Evidencia de que otros lo hicieron | Venta, confianza | "Más de 200 personas ya los probaron" (si es verdad) |
| 8 | Comparación | A vs B desde el primer frame | Reviews, decisión de compra | "40 lucas vs 10 lucas — ¿cuál suena mejor?" |
| 9 | Confesión | Admitir un error o aprendizaje | Autenticidad, storytelling | "Perdí plata haciendo esto y no quiero que te pase" |
| 10 | Urgencia honesta | Escasez real o timing | Venta directa | "Llegaron 20 unidades y van quedando 6" |
| 11 | Visual shock | Algo inesperado en el primer frame | Viralidad, producto | Romper un objeto, resultado antes/después extremo |
| 12 | Loop | El final del video conecta con el inicio | Rewatches, retención | Terminar con la misma frase que empieza |

### 12.2.2 Árbol de selección de hook

```
IF objetivo del video = alcance / viralidad
    THEN
        IF tengo un dato/afirmación contraintuitiva
            THEN → Hook tipo 1 (Provocación) o tipo 4 (Número)
        ELSE IF tengo un visual impactante
            THEN → Hook tipo 11 (Visual shock) o tipo 2 (Resultado primero)
        ELSE
            → Hook tipo 3 (Pregunta directa) o tipo 5 (Curiosidad)
        END

ELSE IF objetivo del video = venta directa
    THEN
        IF tengo stock limitado real
            THEN → Hook tipo 10 (Urgencia honesta)
        ELSE IF tengo una comparación de precio favorable
            THEN → Hook tipo 8 (Comparación) o tipo 4 (Número con precio)
        ELSE
            → Hook tipo 2 (Resultado primero — el producto en acción)
        END

ELSE IF objetivo del video = autoridad / educación
    THEN
        IF tengo un dato sorprendente
            THEN → Hook tipo 4 (Número/dato) o tipo 1 (Provocación)
        ELSE IF es un tutorial
            THEN → Hook tipo 2 (Resultado primero) o tipo 6 (Negación)
        ELSE
            → Hook tipo 5 (Curiosidad) o tipo 9 (Confesión)
        END

ELSE IF objetivo del video = engagement / comunidad
    THEN
        → Hook tipo 3 (Pregunta directa) o tipo 9 (Confesión)
END
```

## 12.3 Checklist del hook

Antes de aprobar el hook del video:

- [ ] ¿Hay movimiento visual en el primer frame? (no frame estático)
- [ ] ¿Hay un SFX de impacto en el frame 1?
- [ ] ¿El texto del hook tiene máximo 5 palabras?
- [ ] ¿El texto es una promesa o provocación, no un saludo?
- [ ] ¿La energía vocal es la máxima del video?
- [ ] ¿Responde a la pregunta "¿por qué debería quedarme?"
- [ ] ¿Hay al menos 2 SFX distintos en los primeros 3 segundos?
- [ ] ¿Si lo pusiera en mute, el visual + texto solos harían que me quede?
- [ ] ¿Si cerrara los ojos, el audio solo haría que me quede?
- [ ] ¿Podría este hook funcionar como el thumbnail/cover frame del video?

---

# Capítulo 13: Estructura narrativa por tipo de video

## 13.1 Frameworks narrativos

### 13.1.1 Framework AIDA (Atención-Interés-Deseo-Acción)

```
DURACIÓN RECOMENDADA POR SECCIÓN (para un reel de 30s):
├── A (Atención): 0-3s (10% del video)
├── I (Interés): 3-10s (23% del video)
├── D (Deseo): 10-22s (40% del video)
└── A (Acción): 22-30s (27% del video)

SECCIÓN A — ATENCIÓN (hook):
    - Detener el scroll
    - Promesa del video
    - SFX máxima densidad
    
SECCIÓN I — INTERÉS:
    - ¿Por qué debería importarme?
    - Problema, dolor, oportunidad
    - Primer pattern interrupt después del hook
    
SECCIÓN D — DESEO:
    - La solución, el producto, la idea
    - Prueba visual (demo, resultado, testimonio)
    - Overlays de refuerzo (números, comparación)
    - Múltiples pattern interrupts
    
SECCIÓN A — ACCIÓN (CTA):
    - Qué hacer ahora
    - Energía = hook o mayor
    - Overlay de WhatsApp / link
    - SFX de cierre (impact + música sube)
```

### 13.1.2 Framework PAS (Problema-Agitación-Solución)

```
DURACIÓN RECOMENDADA (reel de 30s):
├── P (Problema): 0-5s (17%)
├── A (Agitación): 5-15s (33%)
└── S (Solución + CTA): 15-30s (50%)

P — PROBLEMA:
    - Nombrar el dolor específico del avatar
    - "¿Te pasa que...?" / "El problema con X es..."
    - Hook visual: la frustración, el problema visible
    
A — AGITACIÓN:
    - Amplificar: qué pasa si no lo resolvés
    - "Y encima...", "Lo peor es que..."
    - SFX de tensión: risers, suspense
    - B-roll del problema en acción
    
S — SOLUCIÓN:
    - El producto/servicio como respuesta
    - Demo visual, producto en mano
    - Overlays de prueba (números, resultados)
    - CTA directo
```

### 13.1.3 Framework BAB (Before-After-Bridge)

```
DURACIÓN RECOMENDADA (reel de 30s):
├── B (Before): 0-8s (27%)
├── A (After): 8-18s (33%)
└── B (Bridge + CTA): 18-30s (40%)

BEFORE:
    - La situación actual del espectador (el antes)
    - Visual: lo que tiene ahora / lo que hace ahora
    
AFTER:
    - Cómo sería si resolviera el problema (el después)
    - Visual: el resultado, el producto en uso, la transformación
    - SFX de revelación: riser → impact → overlay de resultado
    
BRIDGE:
    - Cómo llegar del antes al después (el producto/servicio)
    - Demo o explicación breve
    - CTA: primer paso para conseguirlo
```

## 13.2 Estructura por tipo de video (detallada)

### 13.2.1 Talking Head Reel — estructura beat por beat

```
BEAT 1 (0:00-0:01) — PRIMER IMPACTO
    Visual: Close-up, snap-zoom o whip-pan
    Audio: Bass hit / Vine Boom
    Texto: Palabra clave del hook (2-3 palabras, grande)
    Energía: 5/5

BEAT 2 (0:01-0:03) — COMPLETAR EL HOOK
    Visual: Mantener close-up o zoom out leve
    Audio: Riser si hay reveal, pop si hay texto nuevo
    Texto: Completar la frase del hook
    Energía: 5/5

BEAT 3 (0:03-0:05) — PRIMER PATTERN INTERRUPT
    Visual: Corte a B-roll o cambio de plano
    Audio: Whoosh en el corte
    Texto: Subtítulo word-by-word
    Energía: 4/5 (baja un poco para crear contraste)

BEAT 4 (0:05-0:10) — DESARROLLO 1
    Visual: Alternar A-roll y B-roll cada 3-4s
    Audio: SFX según función narrativa
    Texto: Subtítulos + 1 overlay si hay dato numérico
    Energía: 3-4/5

BEAT 5 (0:10-0:15) — DATO CLAVE / REVEAL
    Visual: Zoom punch en el dato clave
    Audio: Riser 0.5-1s ANTES del dato + impact AL dato
    Texto: Número grande animado / overlay de refuerzo
    Energía: 5/5 (pico)

BEAT 6 (0:15-0:22) — DESARROLLO 2 / PRUEBA
    Visual: Demo visual, screen recording, B-roll
    Audio: SFX funcionales, foley si hay acción
    Texto: Subtítulos + enumeración si hay pasos
    Energía: 3-4/5

BEAT 7 (0:22-0:27) — PRE-CTA / CIERRE
    Visual: Volver a A-roll close-up
    Audio: Riser ascendente (building)
    Texto: Resumen o frase de cierre
    Energía: 4/5 (subiendo)

BEAT 8 (0:27-0:30) — CTA
    Visual: Close-up, mirada directa a cámara
    Audio: Impact + música sube
    Texto: "Escribime" / "Link en bio"
    Overlay: Ícono WhatsApp / flecha al link
    Energía: 5/5 (igual o mayor al hook)
```

### 13.2.2 Producto en mano — estructura beat por beat

```
BEAT 1 (0:00-0:02) — HOOK VISUAL
    Visual: Producto entrando al frame (mano + producto)
    Audio: Whoosh del movimiento + bass hit
    Texto: Nombre descriptivo del producto (NO marca ajena)
    Energía: 5/5

BEAT 2 (0:02-0:05) — PRECIO / COMPARACIÓN
    Visual: Close-up del producto
    Audio: Riser → impact al precio
    Texto: Precio en pill cyan ($X.XXX) + "vs $XX.XXX" si aplica
    Overlay: Contador de dinero animado
    Energía: 5/5

BEAT 3 (0:05-0:12) — DEMO VISUAL
    Visual: Producto en uso (puestos, conectados, encendidos)
    Audio: Foley hiperrealista (abrir caja, poner en oreja, cable conectando)
    Texto: Features clave apareciendo con pop
    Energía: 4/5

BEAT 4 (0:12-0:18) — CLOSE-UP DE CALIDAD
    Visual: Extreme close-up de detalles (acabado, materiales, pantalla)
    Audio: SFX suave, música sube leve
    Texto: "Calidad real" o equivalente
    Energía: 3/5

BEAT 5 (0:18-0:25) — PRUEBA SOCIAL / RESULTADO
    Visual: Screen recording de prueba de sonido, o reacción de cliente (si existe)
    Audio: SFX de interfaz si es screen rec
    Texto: Resultado concreto ("24hs de batería", "ANC activa")
    Energía: 4/5

BEAT 6 (0:25-0:30) — CTA
    Visual: Producto en mano + rostro del creador
    Audio: Impact de cierre
    Texto: "Escribime" / "WhatsApp en bio"
    Overlay: Ícono WhatsApp + flecha
    Energía: 5/5
```

## 13.3 Arcos de tensión

### 13.3.1 Visualización de arcos

**Arco clásico (storytelling):**
```
TENSIÓN
  │          ╱╲
  │         ╱  ╲
  │    ╱╲  ╱    ╲
  │   ╱  ╲╱      ╲   ╱╲
  │  ╱              ╲╱  │
  │ ╱                    │
  └──────────────────────
  HOOK  NUDO  CLÍMAX  FIN
```

**Arco de formato corto (picos constantes):**
```
TENSIÓN
  │╱╲     ╱╲     ╱╲
  ││ ╲   ╱  ╲   ╱  │
  ││  ╲ ╱    ╲ ╱   │
  ││   ╲╱     ╲╱   │
  └──────────────────
  HOOK  CUERPO   CTA
  
  No hay UN clímax — hay múltiples picos
  cada pico es un pattern interrupt o dato clave
```

**Arco de tutorial:**
```
TENSIÓN
  │╱╲           ╱╲
  ││ ╲         ╱  │
  ││  ╲───────╱   │
  ││   MESETA      │
  └──────────────────
  HOOK  PASOS   CIERRE
  
  Empieza alto (resultado primero)
  Se estabiliza durante los pasos
  Cierra alto (recapitulación + CTA)
```

---

# Capítulo 14: Pacing — el ritmo del video

## 14.1 Definición operativa de pacing

El pacing es la velocidad a la que se entregan estímulos al espectador. Se mide en **beats por minuto (BPM de edición)**, donde un "beat" es cualquier cambio perceptible: corte, SFX, texto nuevo, zoom, overlay.

### 14.1.1 Tabla de BPM por tipo de video

| Tipo de video | BPM de edición | Equivalencia | Sensación |
|---|---|---|---|
| TikTok agresivo | 40-60 BPM | 1 beat cada 1-1.5s | Frenético, alta energía |
| Reel estándar | 20-40 BPM | 1 beat cada 1.5-3s | Dinámico |
| Tutorial corto | 15-25 BPM | 1 beat cada 2.4-4s | Rápido pero procesable |
| Vlog | 8-15 BPM | 1 beat cada 4-7.5s | Conversacional |
| YouTube largo | 5-12 BPM | 1 beat cada 5-12s | Respirado |
| Podcast video | 2-5 BPM | 1 beat cada 12-30s | Calmo |

### 14.1.2 Cómo contar BPM de edición

```
Para un video de 30 segundos:

    Contar todos los beats:
    + cada corte de cámara/plano
    + cada SFX audible
    + cada texto/overlay que aparece
    + cada zoom punch / shift
    + cada cambio de B-roll
    = TOTAL de beats

    BPM = (TOTAL de beats / duración_en_segundos) × 60

    EJEMPLO:
    Un reel de 30s con 15 cortes + 12 SFX + 8 textos + 5 zooms = 40 beats
    BPM = (40 / 30) × 60 = 80 BPM ← esto es TikTok agresivo
    
    Un reel de 30s con 8 cortes + 6 SFX + 5 textos + 3 zooms = 22 beats
    BPM = (22 / 30) × 60 = 44 BPM ← esto es reel estándar
```

## 14.2 Variación de pacing dentro del video

### 14.2.1 El error de pacing constante

```
MALO: pacing constante de principio a fin
    ┌────────────────────────────────────┐
    │ ████████████████████████████████   │ ← aburre por predecible
    └────────────────────────────────────┘

BUENO: pacing variable con picos y valles
    ┌────────────────────────────────────┐
    │ ██████  ████  ██████ ████ ██████  │ ← mantiene la atención
    └────────────────────────────────────┘
```

### 14.2.2 Patrón de pacing recomendado

```
IF video de formato corto (< 60s)
    THEN usar patrón "dientes de sierra":
    
    PACING
    ALTO │█████        █████        █████
         │     █      █     █      █
    BAJO │      ████ █       ████ █
         └─────────────────────────────
         HOOK  CUERPO1  DATO  CUERPO2  CTA
         
    - Hook: pacing ALTO (densidad máxima de SFX, cortes, textos)
    - Cuerpo: pacing baja un nivel (dar espacio para procesar)
    - Dato clave: pacing sube (riser → impact → overlay)
    - Cuerpo: pacing baja de nuevo
    - CTA: pacing ALTO (energía del hook o mayor)

ELSE IF video largo (> 3min)
    THEN usar patrón "capítulos":
    
    PACING
    ALTO │██   ██   ██   ██   ██  ██
         │  █ █  █ █  █ █  █ █  ██
    BAJO │   █    █    █    █    █
         └──────────────────────────
         INTRO CAP1 CAP2 CAP3 CIERRE
         
    - Cada "capítulo" tiene su propio mini-arco de pacing
    - Las transiciones entre capítulos son valles de pacing
    - El cierre tiene pacing alto
END
```

## 14.3 Speed ramping

### 14.3.1 Qué es y cuándo usarlo

Speed ramping = cambiar la velocidad del video en tramos específicos.

```
IF quiero crear un efecto de impacto
    THEN speed ramp: 100% → slow motion (50%) → 100%
    → Ralentizar el momento de impacto (golpe, reveal, reacción)
    → Usar SOLO en momentos clave (máximo 1-2 por video corto)

ELSE IF quiero comprimir una acción larga (unboxing, setup)
    THEN speed ramp: 100% → fast (200-400%) → 100%
    → Acelerar la parte mecánica/repetitiva
    → Agregar SFX de "fast forward" (whoosh continuo)

ELSE IF quiero tightening general (el hablante es lento)
    THEN speed ramp uniforme: 105-110%
    → Lo suficiente para apretar el ritmo
    → Indetectable para el espectador
    → NO superar 115% — se nota la voz acelerada

ELSE IF quiero un efecto dramático de cámara lenta
    THEN
        IF el material fue grabado a 60fps o más
            THEN slow motion real a 50% (30fps output)
            → Se ve fluido
        ELSE IF el material fue grabado a 30fps
            THEN slow motion a 50% resultará en 15fps visible
            → Solo usable en momentos muy cortos (< 1 segundo)
            → O usar interpolación de frames (ffmpeg minterpolate)
        END
END
```

### 14.3.2 Comandos ffmpeg para speed ramp

```bash
# Acelerar 2x (con audio)
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" \
    -map "[v]" -map "[a]" output.mp4

# Ralentizar 0.5x (sin audio — audio slow motion suena mal)
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=2.0*PTS[v]" \
    -map "[v]" -an output.mp4

# Tightening general (1.08x — imperceptible pero efectivo)
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=(1/1.08)*PTS[v];[0:a]atempo=1.08[a]" \
    -map "[v]" -map "[a]" output.mp4
```

---

# Capítulo 15: Cortes — el lenguaje invisible

## 15.1 Tipos de corte

### 15.1.1 Tabla completa de tipos de corte

| Tipo de corte | Descripción técnica | Sensación que produce | Cuándo usarlo |
|---|---|---|---|
| **Hard cut** | Corte directo sin transición | Energía, urgencia, impacto | Cambio de tema, énfasis, hook |
| **Jump cut** | Corte dentro de la misma toma | Urgencia, autenticidad | Formato corto, quitar pausas |
| **J-cut** | Audio del clip B empieza antes que su video | Anticipación, fluidez | Transición de tema suave |
| **L-cut** | Audio del clip A continúa sobre el video de B | Continuidad, reflexión | Cierre de sección |
| **Match cut** | Corte donde un elemento visual coincide entre clips | Creatividad, narrativa visual | Transiciones temáticas |
| **Cutaway** | Corte a un plano de detalle/contexto | Contexto, ilustración | B-roll que ilustra lo dicho |
| **Cross cut** | Alternar entre dos escenas | Paralelismo, tensión | Comparación, dos hilos |
| **Smash cut** | Corte abrupto de un tono a otro opuesto | Comedia, shock | Ironía, contraste extremo |

### 15.1.2 Árbol de decisión: ¿Qué tipo de corte uso?

```
IF estoy cambiando de tema o argumento
    THEN
        IF quiero que el cambio sea agresivo/energético
            THEN → Hard cut + impact SFX
        ELSE IF quiero que el cambio sea suave/fluido
            THEN → J-cut (audio del tema nuevo empieza antes)
        END

ELSE IF estoy cortando una pausa/muletilla dentro de la misma toma
    THEN → Jump cut (el más natural en formato corto)
    → Si el jump es muy notorio, agregar un micro-zoom (scale 100→102%)
        para disimularlo

ELSE IF estoy insertando B-roll para ilustrar algo
    THEN → Cutaway + whoosh SFX
    → Audio del A-roll continúa debajo del B-roll (L-cut implícito)

ELSE IF estoy comparando dos cosas
    THEN → Cross cut (alternar)
    → O split screen si las dos cosas son simultáneas

ELSE IF quiero crear un efecto cómico/irónico
    THEN → Smash cut (de serio a absurdo, o viceversa)
    → SFX de record scratch o silencio abrupto

ELSE IF quiero cerrar una sección y pasar a otra
    THEN → L-cut (la voz de cierre continúa sobre el visual de apertura de la nueva sección)
END
```

## 15.2 Timing del corte

### 15.2.1 Dónde cortar (reglas de oro)

```
CORTAR EN:
✓ El movimiento — durante un gesto, no después
✓ El cambio de dirección de la mirada
✓ El final de una frase (no en el medio de una palabra)
✓ Un cambio de energía (de serio a gracioso, de lento a rápido)
✓ Un beat de la música (si hay música con ritmo definido)

NO CORTAR EN:
✗ Medio de una palabra (excepto si es un jump cut intencional)
✗ Un momento de quietud total (se nota demasiado)
✗ Cuando el espectador está procesando un dato (darle 0.5-1s)
✗ Justo después de un SFX de impacto (el impacto necesita 0.3s para "aterrizar")
```

### 15.2.2 Duración mínima de un clip

```
IF plataforma = TikTok (edición agresiva)
    THEN duración mínima por clip = 0.5s
    (clips más cortos se perciben como glitch, no como corte)
    
ELSE IF plataforma = Instagram Reels
    THEN duración mínima por clip = 0.7s
    
ELSE IF plataforma = YouTube
    THEN duración mínima por clip = 1.0-1.5s
    (edición más respirada, clips cortos se sienten amateurs)
    
EXCEPCIÓN: un flash/glitch intencional puede ser de 2-4 frames (< 0.15s)
    → Esto es un efecto, no un clip
```

### 15.2.3 Jump cuts: cuándo funcionan y cuándo no

```
IF el video es formato corto (reel/TikTok)
    THEN jump cuts funcionan bien → son parte del lenguaje del formato
    → Incluso son esperados por la audiencia
    
    PERO si el jump cut causa un salto visual incómodo:
        IF el salto es solo un cambio de posición del hablante
            THEN agregar micro-zoom (scale 100→103%) para enmascarar
        ELSE IF el salto incluye cambio de iluminación
            THEN insertar un frame de transición (flash blanco de 2 frames)
        ELSE IF el salto es entre dos frases muy distintas
            THEN insertar B-roll de 1-2s entre medio
        END

ELSE IF el video es formato largo (YouTube, documental)
    THEN los jump cuts se ven amateurs EXCEPTO si:
        - Es el estilo declarado del canal (Casey Neistat, etc.)
        - Se usa con intención cómica
        - Se enmascara con B-roll encima (cutaway)
END
```

## 15.3 Cortes sincronizados con el ritmo

### 15.3.1 Cortar al beat de la música

```
IF el video tiene música con beat definido
    THEN los cortes principales deben caer EN el beat
    
    Cómo encontrar los beats:
    1. Identificar el BPM de la música
    2. Calcular el intervalo entre beats: 60 / BPM = segundos por beat
        Ejemplo: 120 BPM → 0.5 segundos por beat
    3. Alinear los cortes a los beats más fuertes (downbeats, cada 2-4 beats)
    
    NO cortar en CADA beat → se siente mecánico
    Cortar en los beats fuertes (1 de cada 2-4) → se siente orgánico
    
ELSE IF no hay música
    THEN los cortes se sincronizan con la voz:
    → Cortar al final de frases
    → Cortar en cambios de tono/energía
    → Cortar en los respiros naturales del hablante
END
```

---

# Capítulo 16: Transiciones — cuándo y cuáles

## 16.1 Catálogo de transiciones

### 16.1.1 Tabla de transiciones con uso recomendado

| Transición | Descripción | Duración | SFX asociado | Cuándo usarla | Cuándo NO usarla |
|---|---|---|---|---|---|
| **Corte directo** | Sin transición | 0ms | Impact o nada | Default. Siempre funciona | Nunca — siempre es válido |
| **Whoosh/swipe** | Barrido lateral/vertical | 0.2-0.3s | Whoosh seco | Cambio de escena, A→B-roll | En medio de una frase |
| **Flash blanco** | Frame blanco de 2-4 frames | 0.07-0.13s | Flash SFX | Simular flash de foto, cambio brusco | Si ya se usó 3+ veces en el video |
| **Zoom cut** | Zoom in rápido entre clips | 0.15-0.25s | Whoosh + impact | Énfasis, hook, reveal | En momentos tranquilos |
| **Dissolve/cross-fade** | Fundido entre clips | 0.3-1.0s | Ninguno o suave | Cambio de tiempo, reflexión | En formato corto agresivo (se siente lento) |
| **Film burn** | Efecto de quemado de película | 0.3-0.5s | Ninguno | Estética retro, BTS cálido | En contenido premium/limpio |
| **Glitch** | Distorsión digital | 0.1-0.2s | Glitch SFX | Corte a IA, dato chocante | Si el video no tiene tono tech/moderno |
| **Morph cut** | IA fusiona dos frames | 0.3-0.5s | Ninguno | Disimular jump cut | Si es detectable (falla con mucho movimiento) |
| **Wipe** | Barrido geométrico | 0.2-0.4s | Whoosh | Estilo retro, comparación | En contenido que busca naturalidad |
| **Snap zoom** | Zoom in abrupto al sujeto | 0.1-0.15s | Bass hit | Hook, reveal, dato impactante | Más de 2 veces en el mismo video |

### 16.1.2 Frecuencia de transiciones

```
REGLA: El corte directo es el default. Las transiciones con efecto son la excepción.

IF video de 30 segundos
    THEN máximo 3-4 transiciones con efecto (el resto cortes directos)
    
IF video de 60 segundos
    THEN máximo 5-7 transiciones con efecto
    
IF video de 3+ minutos
    THEN máximo 1-2 por minuto

RAZÓN: las transiciones con efecto pierden impacto si se sobreusan.
Un flash blanco cada 5 segundos deja de ser un efecto y se convierte en molestia.
```

### 16.1.3 Árbol de decisión: ¿Qué transición uso?

```
IF estoy pasando de A-roll a B-roll
    THEN
        IF el B-roll ilustra lo que se acaba de decir
            THEN → Corte directo + whoosh SFX (sin transición visual)
        ELSE IF el B-roll es un cambio de escena/ubicación
            THEN → Whoosh/swipe visual + whoosh SFX
        END

ELSE IF estoy pasando de un tema a otro
    THEN
        IF el cambio de tema es abrupto (sin conexión)
            THEN → Flash blanco o glitch + impact SFX
        ELSE IF el cambio de tema es fluido (conectado)
            THEN → Corte directo + J-cut (audio del tema nuevo empieza antes)
        END

ELSE IF estoy revelando un dato impactante
    THEN → Zoom cut o snap zoom + bass hit

ELSE IF estoy pasando de "problema" a "solución"
    THEN → Flash blanco o corte directo abrupto + impact
    (el contraste brusco = "antes era malo, ahora es bueno")

ELSE IF estoy en un BTS o contenido cálido/personal
    THEN → Film burn suave o dissolve corto

ELSE IF estoy cortando a contenido generado por IA
    THEN → Glitch + glitch SFX (refuerza la naturaleza "digital")
    NUNCA dissolve suave (rompe la inmersión del contraste)

ELSE
    → Corte directo (siempre funciona)
END
```

## 16.2 Implementación en ffmpeg

### 16.2.1 Transición xfade (cross-dissolve)

```bash
# Dissolve de 0.5s entre clip1 (4s) y clip2
ffmpeg -i clip1.mp4 -i clip2.mp4 \
    -filter_complex "xfade=transition=fade:duration=0.5:offset=3.5" \
    -c:v libx264 -crf 18 output.mp4
```

### 16.2.2 Transiciones disponibles en xfade

```
Transiciones de xfade en ffmpeg:
- fade (dissolve clásico)
- wipeleft, wiperight, wipeup, wipedown
- slideleft, slideright, slideup, slidedown
- circlecrop, rectcrop
- distance, fadeblack, fadewhite
- pixelize, diagtl, diagtr, diagbl, diagbr
- hlslice, hrslice, vuslice, vdslice
- dissolve, horzclose, horzopen, vertclose, vertopen
- radial, smoothleft, smoothright, smoothup, smoothdown
- zoomin

Más usadas para formato corto:
- fadewhite (flash blanco)
- slideleft/slideright (swipe)
- zoomin (zoom cut simulado)
- pixelize (glitch/digital)
```

### 16.2.3 Flash blanco manual (2-4 frames)

```bash
# Insertar 3 frames blancos (0.1s a 30fps) entre dos clips
ffmpeg -i clip1.mp4 -i clip2.mp4 \
    -filter_complex \
    "[0:v]trim=0:4,setpts=PTS-STARTPTS[v1]; \
     color=white:s=1080x1920:d=0.1,setpts=PTS-STARTPTS[flash]; \
     [1:v]trim=0:5,setpts=PTS-STARTPTS[v2]; \
     [v1][flash][v2]concat=n=3:v=1:a=0[vout]; \
     [0:a]atrim=0:4,asetpts=PTS-STARTPTS[a1]; \
     [1:a]atrim=0:5,asetpts=PTS-STARTPTS[a2]; \
     [a1][a2]concat=n=2:v=0:a=1[aout]" \
    -map "[vout]" -map "[aout]" -c:v libx264 -crf 18 output.mp4
```

## 16.3 Checklist de transiciones

- [ ] ¿Cada transición tiene una razón narrativa? (no "porque queda bonito")
- [ ] ¿Las transiciones con efecto son minoría? (máximo 30% de los cortes)
- [ ] ¿Cada transición con efecto tiene su SFX asociado?
- [ ] ¿No hay dos transiciones iguales seguidas? (variedad)
- [ ] ¿La duración de cada transición es correcta? (tabla §16.1.1)
- [ ] ¿Las transiciones no interrumpen frases del hablante?
- [ ] ¿Los dissolves se reservan para cambios de tiempo o reflexión, no para acción?
- [ ] ¿Los glitches solo se usan en contenido con tono tech/moderno?
- [ ] ¿Los flash blancos no se repiten más de 3 veces en el video?

---

> **Fin de PARTE 02** — Continúa en [MASTER_VIDEO_EDITOR_PARTE_03.md](MASTER_VIDEO_EDITOR_PARTE_03.md): Capítulos 17-24 (Diseño Sonoro Avanzado, Música, Subtítulos, Overlays Gráficos, Color Grading, B-Roll, Imágenes IA, Pattern Interrupts).
