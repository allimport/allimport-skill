# MASTER VIDEO EDITOR — PARTE 05
## Manual profesional de edición de video para Claude Code
### Capítulos 33–40: YouTube, Podcast Video, Ads/Comerciales, QA Completo, Iteración y Analytics, Optimización por Plataforma, Consistencia de Marca, Colaboración

---

> **Contexto de esta parte:** los capítulos 1–32 (Partes 01–04) establecieron filosofía, pipeline técnico, diseño sonoro, subtítulos, color grading, corte por formato y producción short-form. Esta Parte 05 expande hacia formatos largos (YouTube, podcast), publicidad paga, control de calidad integral, métricas y analytics, optimización cross-platform, identidad de marca en video y flujos de colaboración/handoff. Todo calibrado para All Import (@allimport.cba / @_agus_moreno_) y ejecutable por Claude Code con ffmpeg, Remotion y las herramientas del repo.

> **Paleta de marca obligatoria:**
> - NAVY `#0a0f1a` — fondo principal
> - CYAN `#00d4d4` — acentos, CTAs, highlights
> - WHITE `#f8fafa` — texto principal
> - RED `#e22a2a` — alertas, precios, urgencia
> - CELESTE `#78b4eb` — subtítulos secundarios, info
> - GOLD `#c9a227` — premium, ofertas exclusivas
>
> **Tipografía:** Montserrat Alternates (disponible en `allimport/historias/fonts/`)
> **Resolución base:** 1080×1920 (vertical, stories/reels); 1920×1080 (horizontal, YouTube); 1080×1080 (cuadrado, feed).

---

# TABLA DE CONTENIDO — PARTE 05

33. [Capítulo 33: YouTube — edición para formato largo](#capítulo-33-youtube--edición-para-formato-largo)
34. [Capítulo 34: Podcast video — edición de conversación](#capítulo-34-podcast-video--edición-de-conversación)
35. [Capítulo 35: Ads y comerciales — edición para conversión](#capítulo-35-ads-y-comerciales--edición-para-conversión)
36. [Capítulo 36: QA completo — checklist maestro de calidad](#capítulo-36-qa-completo--checklist-maestro-de-calidad)
37. [Capítulo 37: Iteración y analytics — mejorar con datos](#capítulo-37-iteración-y-analytics--mejorar-con-datos)
38. [Capítulo 38: Optimización por plataforma — diferencias que importan](#capítulo-38-optimización-por-plataforma--diferencias-que-importan)
39. [Capítulo 39: Consistencia de marca en video](#capítulo-39-consistencia-de-marca-en-video)
40. [Capítulo 40: Colaboración y handoff](#capítulo-40-colaboración-y-handoff)

---

# Capítulo 33: YouTube — edición para formato largo

## 33.1 El algoritmo de YouTube y sus implicancias para la edición

YouTube no funciona como Instagram ni TikTok. El algoritmo de YouTube prioriza **tres métricas por encima de todas**:

| Métrica | Qué mide | Impacto en distribución | Cómo la edición la afecta |
|---------|----------|------------------------|--------------------------|
| **Watch Time** (tiempo de visualización total) | Minutos totales que un video acumula | Es la métrica #1 — un video con más watch time total se distribuye más | Retención alta = más watch time. La edición retiene o pierde al espectador |
| **CTR** (Click-Through Rate) | % de impresiones que generan clic | Determina si la miniatura+título funcionan | La edición de los primeros 30s debe cumplir la promesa del thumbnail |
| **Audience Retention** (retención de audiencia) | % del video que cada espectador ve en promedio | YouTube compara tu retención contra videos similares de tu misma duración | La edición segundo a segundo define esta curva |

### 33.1.1 Cómo YouTube evalúa tu video — árbol temporal

```
SUBIDA DEL VIDEO
    │
    ├── Primeras 2 horas → YouTube lo muestra a suscriptores
    │   │
    │   ├── IF CTR > 5% AND retención promedio > 50%
    │   │       THEN → YouTube expande distribución a "Browse Features"
    │   │
    │   ├── ELSE IF CTR > 3% AND retención > 40%
    │   │       THEN → expansión moderada, testeo en recomendados
    │   │
    │   └── ELSE → distribución limitada a suscriptores
    │
    ├── Horas 2-48 → fase de testeo en audiencia más amplia
    │   │
    │   ├── IF watch time crece + retención se mantiene
    │   │       THEN → YouTube lo empuja a "Suggested Videos"
    │   │
    │   └── ELSE → el video se estanca
    │
    └── Día 3 en adelante → evergreen o muerte
        │
        ├── IF el video captura tráfico de búsqueda (SEO)
        │       THEN → puede crecer meses/años después
        │
        └── ELSE → la distribución se apaga gradualmente
```

### 33.1.2 La curva de retención — anatomía completa

```
100% ┤■■■■■■■■■■
     │          ■■
     │            ■■■■
     │                ■■■
 70% ┤                   ■■■■■■■
     │                         ■■
     │                           ■■■■
     │                               ■■■
 40% ┤                                  ■■■■■■■
     │                                        ■■■■■■
     │                                              ■■■■
 20% ┤                                                  ■■■
     │
  0% ┼─────────────────────────────────────────────────────
     0s    30s    1min   3min    5min   8min   10min  FIN

     ZONA 1     ZONA 2         ZONA 3         ZONA 4
     Hook       Desarrollo     Contenido      Cierre
     (0-30s)    (30s-3min)     (3min-80%)     (80%-fin)
```

**Zona 1 — Hook (0-30s):** la caída más pronunciada ocurre acá. Si perdés más del 30% en los primeros 30 segundos, la edición del hook falló.

**Zona 2 — Desarrollo (30s-3min):** si la retención cae debajo del 60% en esta zona, hay un problema de pacing o de promesa incumplida.

**Zona 3 — Contenido principal (3min-80% del video):** la curva debería ser lo más plana posible acá. Cada caída corresponde a un momento aburrido que la edición debería haber cortado o editado con un pattern interrupt.

**Zona 4 — Cierre (último 20%):** una caída pronunciada acá es normal, pero si es más pronunciada que el promedio del nicho, el cierre es demasiado largo o la llamada a la acción llega muy tarde.

## 33.2 Edición para retención en formato largo

### 33.2.1 Hooks para YouTube — diferencia con short-form

En short-form el hook es de 1-3 segundos. En YouTube largo el hook es de **15-30 segundos** y tiene una estructura interna:

```
HOOK DE YOUTUBE (15-30 segundos)
    │
    ├── Segundo 0-3: TEASER VISUAL
    │   Mostrá el momento más impactante del video (resultado final,
    │   la revelación, el error catastrófico). Sin explicación.
    │
    ├── Segundo 3-8: FRASE DE CONTEXTO
    │   "Hoy voy a mostrarte [X] que [beneficio/consecuencia]"
    │   Establece de qué va el video y por qué importa.
    │
    ├── Segundo 8-15: LOOP ABIERTO
    │   "Pero antes de eso, hay algo que no sabías de [Y]..."
    │   "Y al final te voy a mostrar [Z], que es aún más loco"
    │   Crea la necesidad de quedarse para cerrar el loop.
    │
    └── Segundo 15-30: ROAD MAP (opcional, para videos >10min)
        "Primero vamos a ver [A], después [B], y al final [C]"
        Le da al espectador una estructura clara.
```

### 33.2.2 Chapters (capítulos de YouTube) — sistema de edición

Los capítulos de YouTube aparecen en la barra de progreso y en la descripción. Son obligatorios para videos de más de 8 minutos.

**Reglas para definir capítulos:**

| Regla | Detalle |
|-------|---------|
| Mínimo de capítulos | 3 para videos 8-15min, 5 para 15-30min, 8+ para >30min |
| Primer capítulo | SIEMPRE empieza en `0:00` — YouTube lo exige |
| Duración mínima por capítulo | 10 segundos (requisito de YouTube) |
| Nomenclatura | Descriptiva y con curiosidad. NO "Parte 1" — SÍ "El error que todos cometen" |
| Último capítulo | Nunca "Conclusión" o "Cierre" — usar algo que retenga: "Lo que nadie te dice" |

**Formato en la descripción del video:**
```
0:00 El hallazgo que cambió todo
1:23 Por qué los auriculares baratos no sirven
3:45 Test de sonido: TWS vs cable
6:10 Lo que descubrí al abrir el auricular
8:30 Comparación con marcas "premium"
10:15 Veredicto final (y algo que no esperaba)
```

### 33.2.3 Pacing de YouTube vs short-form

| Aspecto | Short-form (Reels/TikTok) | YouTube largo |
|---------|--------------------------|---------------|
| Cortes por minuto | 15-30 | 5-12 |
| Duración media de un plano | 1-3 segundos | 3-8 segundos |
| B-roll density | Muy alta (60-80% del video) | Moderada (30-50%) |
| SFX density | Un efecto cada 2-4 segundos | Un efecto cada 5-15 segundos |
| Subtítulos | Siempre, kinetic, grandes | Opcionales, más chicos, estáticos o leves |
| Música | Protagonista, marca el ritmo | Background, no compite con la voz |
| Pattern interrupts | Cada 3-5 segundos | Cada 30-90 segundos |
| Nivel de zoom | Agresivo (120-160% face zoom) | Sutil (105-120%) |

### 33.2.4 Árbol de decisión: frecuencia de pattern interrupts en YouTube

```
TIPO DE VIDEO YOUTUBE
    │
    ├── IF es tutorial/how-to
    │       THEN → pattern interrupt cada 45-90 segundos
    │       Tipos recomendados: zoom suave, cambio de ángulo, B-roll demostrativo
    │
    ├── ELSE IF es review de producto
    │       THEN → pattern interrupt cada 30-60 segundos
    │       Tipos: close-up del producto, comparación split-screen, dato en pantalla
    │
    ├── ELSE IF es vlog/behind the scenes
    │       THEN → pattern interrupt cada 20-40 segundos
    │       Tipos: jump cuts, B-roll lifestyle, zooms energéticos, SFX
    │
    ├── ELSE IF es documental/storytelling
    │       THEN → pattern interrupt cada 60-120 segundos
    │       Tipos: cambio de escena, imágenes de archivo, gráficos, voz en off
    │
    └── ELSE (contenido de entretenimiento general)
            THEN → pattern interrupt cada 20-45 segundos
            Tipos: memes, reacciones, zoom, SFX, cortes rápidos
```

## 33.3 End screens y cards

### 33.3.1 End screen — diseño para All Import

La end screen ocupa los últimos 20 segundos del video. YouTube permite colocar elementos interactivos (video sugerido, suscripción, playlist, link).

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   FONDO: NAVY #0a0f1a con gradiente sutil                  │
│                                                             │
│   ┌──────────────────┐     ┌──────────────────┐            │
│   │                  │     │                  │            │
│   │  VIDEO SUGERIDO  │     │  SUSCRIBIRSE     │            │
│   │  (elemento YT)   │     │  (elemento YT)   │            │
│   │                  │     │                  │            │
│   └──────────────────┘     └──────────────────┘            │
│                                                             │
│   "SEGUÍ VIENDO"           Logo All Import                 │
│   Montserrat Alternates    esquina inferior derecha        │
│   CYAN #00d4d4             solo para @allimport.cba        │
│                                                             │
│   @allimport.cba · WhatsApp en la bio                      │
│   WHITE #f8fafa · tamaño menor                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Regla para @_agus_moreno_:** no poner logo de All Import en la end screen. Usar texto personal y sin branding corporativo.

### 33.3.2 Cards (tarjetas informativas)

Las cards aparecen como un ícono "i" en la esquina superior derecha. Se usan para enlazar a otros videos, playlists o links aprobados.

**Cuándo colocar una card:**

```
DURANTE LA EDICIÓN
    │
    ├── IF mencionás un producto que tiene su propio video
    │       THEN → card al video de ese producto
    │       TIMING: ponerla en el exacto segundo de la mención
    │
    ├── ELSE IF hacés referencia a un video anterior
    │       THEN → card al video referenciado
    │
    ├── ELSE IF hay un momento de baja retención previsible
    │       THEN → card a un video más atractivo (rescue card)
    │       Esto redirige al espectador a otro video tuyo en vez de perderlo
    │
    └── ELSE → máximo 3-5 cards por video. No saturar.
```

## 33.4 YouTube Shorts vs formato largo — edición completamente distinta

| Dimensión | YouTube Shorts | YouTube largo |
|-----------|---------------|---------------|
| Resolución | 1080×1920 (vertical) | 1920×1080 (horizontal) |
| Duración | ≤60 segundos | Sin límite (ideal: 8-20 min) |
| Algoritmo | Feed vertical, descubrimiento | Búsqueda + recomendados |
| Subtítulos | Obligatorios, grandes, centrados | Opcionales |
| Música | Puede ser de la biblioteca de YT | Cualquiera (cuidado copyright) |
| Monetización | RPM muy bajo ($0.03-0.07) | RPM alto ($2-12 según nicho) |
| Edición | Idéntica a Reels/TikTok (ver Parte 04) | Específica de YouTube largo |
| End screens | NO disponibles | Sí, últimos 20 segundos |
| Cards | NO disponibles | Sí |
| Chapters | NO | Sí |

**Regla operativa:** NUNCA reutilizar un video de YouTube largo como Short cortándolo sin re-editar. Un Short es un contenido nativo vertical que requiere su propia edición desde cero o una re-edición completa del clip extraído.

## 33.5 Audio para YouTube — estándar profesional

### 33.5.1 Niveles de audio objetivo

| Elemento | Nivel objetivo | Rango aceptable | Medición |
|----------|---------------|-----------------|----------|
| Loudness integrado | -14 LUFS | -15 a -13 LUFS | Loudness total del video |
| Loudness range (LRA) | 7-12 LU | 5-15 LU | Diferencia entre partes fuertes y suaves |
| True Peak | -1.0 dBTP | -2.0 a -0.5 dBTP | Pico máximo real (inter-sample) |
| Voz principal | -12 a -10 LUFS | Sobre la música | Medido en segmentos de voz |
| Música de fondo | -22 a -18 LUFS | Debajo de la voz siempre | Balance voz/música |
| SFX | -18 a -14 LUFS | Según momento | No más fuerte que la voz |

### 33.5.2 Comando ffmpeg — normalización para YouTube

```bash
# Paso 1: Medir loudness actual
ffmpeg -i input.mp4 -af loudnorm=I=-14:TP=-1.0:LRA=11:print_format=json \
  -f null - 2>&1 | grep -A20 "Parsed_loudnorm"

# Paso 2: Aplicar normalización con los valores medidos
ffmpeg -i input.mp4 \
  -af "loudnorm=I=-14:TP=-1.0:LRA=11:measured_I=-18.2:measured_TP=-3.1:measured_LRA=14.5:measured_thresh=-28.3:offset=-0.5:linear=true" \
  -c:v copy \
  -c:a aac -b:a 256k -ar 48000 \
  output_normalized.mp4

# Audio estéreo (YouTube prefiere estéreo sobre mono)
ffmpeg -i input_mono.mp4 \
  -af "pan=stereo|FL=FC|FR=FC,loudnorm=I=-14:TP=-1.0:LRA=11" \
  -c:v copy \
  -c:a aac -b:a 256k -ar 48000 \
  output_stereo.mp4
```

## 33.6 Relación thumbnail–primeros 30 segundos

La miniatura es una **promesa visual**. Los primeros 30 segundos del video son la **entrega de esa promesa**. Si hay desconexión, el espectador se va.

### 33.6.1 Árbol de decisión: coherencia thumbnail-contenido

```
REVISIÓN PRE-UPLOAD
    │
    ├── IF la miniatura muestra un producto
    │   │
    │   ├── IF ese producto aparece en los primeros 15 segundos
    │   │       THEN → OK ✓
    │   │
    │   └── ELSE → PROBLEMA
    │           THEN → re-editar para mostrar el producto antes del segundo 15
    │           O → cambiar la miniatura a algo que sí aparezca temprano
    │
    ├── ELSE IF la miniatura muestra una reacción/emoción
    │   │
    │   ├── IF los primeros 30s tienen un momento emocional equivalente
    │   │       THEN → OK ✓
    │   │
    │   └── ELSE → re-editar hook para incluir el momento de reacción
    │
    └── ELSE IF la miniatura tiene texto (ej: "NO COMPRES ESTO")
        │
        ├── IF los primeros 10 segundos abordan directamente esa frase
        │       THEN → OK ✓
        │
        └── ELSE → re-editar hook para que la frase se diga/muestre en pantalla
```

## 33.7 Árbol de decisión: estilo de edición por tipo de contenido YouTube

```
¿QUÉ TIPO DE CONTENIDO ES?
    │
    ├── REVIEW DE PRODUCTO (All Import core)
    │   Pacing: 8-12 cortes/min
    │   B-roll: 40-60% (close-ups del producto)
    │   Música: lo-fi chill o electrónica suave
    │   Subtítulos: opcionales, solo datos clave en pantalla
    │   SFX: en transiciones + al mostrar features
    │   Duración ideal: 8-15 minutos
    │   Estructura: hook → unboxing → test → comparación → veredicto
    │
    ├── TUTORIAL / HOW-TO
    │   Pacing: 6-10 cortes/min
    │   B-roll: 30-40% (screencasts, demos)
    │   Música: mínima, casi ambiental
    │   Subtítulos: recomendados, estilo informativo
    │   SFX: sutiles, solo en transiciones de paso
    │   Duración ideal: 10-20 minutos
    │   Estructura: hook → problema → solución paso a paso → resumen
    │
    ├── COMPARATIVA (X vs Y)
    │   Pacing: 10-15 cortes/min
    │   B-roll: 50-70% (split screen, close-ups)
    │   Música: con energía moderada
    │   Subtítulos: tablas comparativas en pantalla
    │   SFX: whoosh en transiciones, impact en ganador
    │   Duración ideal: 10-18 minutos
    │   Estructura: hook → producto A → producto B → comparación directa → ganador
    │
    ├── VLOG / BEHIND THE SCENES
    │   Pacing: 12-20 cortes/min
    │   B-roll: 40-60% (lifestyle, B-roll estético)
    │   Música: con energía, marca el mood
    │   Subtítulos: conversacionales, con emojis permitidos
    │   SFX: energéticos, jump cuts frecuentes
    │   Duración ideal: 8-15 minutos
    │   Estructura: hook → narrativa cronológica → reflexión
    │
    └── COMPILACIÓN / TOP 10
        Pacing: 10-15 cortes/min
        B-roll: 60-80% (cada item tiene su propio B-roll)
        Música: con energía constante
        Subtítulos: número de cada item en pantalla
        SFX: transición con whoosh entre items, impact en #1
        Duración ideal: 12-25 minutos
        Estructura: hook → countdown → #1 extendido → cierre
```

## 33.8 Configuración de export para YouTube

### 33.8.1 Export ffmpeg por resolución

```bash
# ═══════════════════════════════════════════════
# EXPORT 1080p (Full HD) — mínimo aceptable
# ═══════════════════════════════════════════════
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 18 \
  -profile:v high -level 4.2 \
  -pix_fmt yuv420p \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:a aac -b:a 256k -ar 48000 -ac 2 \
  -movflags +faststart \
  -metadata title="All Import - Título del Video" \
  output_1080p.mp4

# ═══════════════════════════════════════════════
# EXPORT 1440p (2K) — recomendado (YouTube lo prioriza con VP9)
# ═══════════════════════════════════════════════
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 16 \
  -profile:v high -level 5.1 \
  -pix_fmt yuv420p \
  -vf "scale=2560:1440:flags=lanczos" \
  -c:a aac -b:a 320k -ar 48000 -ac 2 \
  -movflags +faststart \
  output_1440p.mp4

# ═══════════════════════════════════════════════
# EXPORT 4K (2160p) — máxima calidad
# ═══════════════════════════════════════════════
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 15 \
  -profile:v high -level 5.2 \
  -pix_fmt yuv420p \
  -vf "scale=3840:2160:flags=lanczos" \
  -c:a aac -b:a 320k -ar 48000 -ac 2 \
  -movflags +faststart \
  output_4k.mp4

# ═══════════════════════════════════════════════
# YouTube Shorts (vertical)
# ═══════════════════════════════════════════════
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 18 \
  -profile:v high -level 4.2 \
  -pix_fmt yuv420p \
  -vf "scale=1080:1920:flags=lanczos" \
  -c:a aac -b:a 256k -ar 48000 -ac 2 \
  -t 60 \
  -movflags +faststart \
  output_short.mp4
```

### 33.8.2 Árbol de decisión: resolución de export

```
¿A QUÉ RESOLUCIÓN EXPORTAR?
    │
    ├── IF el material fuente es 4K
    │   │
    │   ├── IF el contenido tiene detalle visual importante (producto close-up)
    │   │       THEN → exportar en 4K (2160p)
    │   │
    │   └── ELSE → exportar en 1440p (YouTube recodifica con VP9, mejor calidad)
    │
    ├── ELSE IF el material fuente es 1080p
    │       THEN → exportar en 1080p (no upscalear)
    │
    └── ELSE IF el material fuente es menor a 1080p
            THEN → upscalear a 1080p con lanczos + aplicar sharpening suave
            ffmpeg -vf "scale=1920:1080:flags=lanczos,unsharp=3:3:0.5"
```

## 33.9 Checklist: preparación de upload a YouTube

- [ ] Video exportado en resolución correcta (mínimo 1080p, ideal 1440p)
- [ ] Audio normalizado a -14 LUFS integrado
- [ ] True Peak no excede -1.0 dBTP
- [ ] Audio en estéreo (no mono)
- [ ] Primeros 30 segundos coinciden con la promesa del thumbnail
- [ ] Hook completo (teaser + contexto + loop abierto) en primeros 30s
- [ ] Capítulos definidos con timestamps (primer capítulo en 0:00)
- [ ] Mínimo 3 capítulos para video corto, 5+ para video largo
- [ ] End screen diseñada en los últimos 20 segundos
- [ ] Elementos de end screen no tapan contenido importante
- [ ] Cards colocadas en momentos estratégicos (máximo 5)
- [ ] B-roll suficiente (sin planos fijos de más de 8 segundos)
- [ ] Pattern interrupts cada 30-90 segundos según tipo de contenido
- [ ] Todos los textos en pantalla son legibles a resolución de celular
- [ ] No hay fotogramas negros accidentales
- [ ] No hay picos de audio que causen distorsión
- [ ] Transiciones coherentes (no mezclar estilos sin razón)
- [ ] Logo All Import presente solo si es canal @allimport.cba
- [ ] Descripción preparada con timestamps, links y hashtags
- [ ] Tags definidos (10-15 tags relevantes)
- [ ] Miniatura preparada (1280×720, tamaño máximo 2MB)
- [ ] Categoría seleccionada
- [ ] Video marcado como "no es para niños" si corresponde
- [ ] Idioma del video configurado (Español)
- [ ] Subtítulos automáticos revisados o SRT subido

---

# Capítulo 34: Podcast video — edición de conversación

## 34.1 Multi-cámara — workflow de edición para podcast

### 34.1.1 Setup típico de grabación y sus implicancias

```
SETUP DE PODCAST VIDEO
    │
    ├── MÍNIMO (1 persona sola / "solo podcast")
    │   Cámara 1: plano medio frontal (busto completo)
    │   Micrófono: 1 fuente de audio
    │   Edición: zoom dinámico para simular 2 ángulos
    │
    ├── ESTÁNDAR (2 personas, entrevista)
    │   Cámara 1: plano general (ambos speakers)
    │   Cámara 2: plano medio speaker A
    │   Cámara 3: plano medio speaker B
    │   Micrófonos: 2 fuentes (1 por speaker)
    │   Edición: multicam con switching
    │
    └── PREMIUM (2+ personas, producción alta)
        Cámaras 1-2: planos medios individuales
        Cámara 3: plano general
        Cámara 4 (opcional): ángulo lateral / detalle
        Micrófonos: 1 por speaker + ambiente
        Edición: multicam completo + B-roll + gráficos
```

### 34.1.2 Sincronización de audio multi-fuente

Cuando hay múltiples micrófonos (uno por speaker), se necesita sincronizar antes de editar.

```bash
# ═══════════════════════════════════════════════
# Extraer audio de cada cámara para sincronización
# ═══════════════════════════════════════════════
ffmpeg -i cam1_general.mp4 -vn -acodec pcm_s16le -ar 48000 cam1_audio.wav
ffmpeg -i cam2_speakerA.mp4 -vn -acodec pcm_s16le -ar 48000 cam2_audio.wav
ffmpeg -i cam3_speakerB.mp4 -vn -acodec pcm_s16le -ar 48000 cam3_audio.wav

# ═══════════════════════════════════════════════
# Sincronizar por clap (pico de audio visible)
# Identificar el offset del pico en cada archivo
# ═══════════════════════════════════════════════
ffmpeg -i cam1_audio.wav -af "astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.Peak_level" \
  -f null - 2>&1 | grep "Peak_level" | head -5

# ═══════════════════════════════════════════════
# Aplicar offset de sincronización
# Si cam2 empieza 0.35s después que cam1:
# ═══════════════════════════════════════════════
ffmpeg -i cam2_speakerA.mp4 -itsoffset -0.35 -i cam2_speakerA.mp4 \
  -map 0:v -map 1:a -c copy cam2_synced.mp4
```

### 34.1.3 Mezcla de audio para podcast

```bash
# ═══════════════════════════════════════════════
# Mezcla final: 2 micrófonos + reducción de ruido
# ═══════════════════════════════════════════════
ffmpeg -i mic_speakerA.wav -i mic_speakerB.wav \
  -filter_complex "\
    [0:a]highpass=f=80,lowpass=f=14000,acompressor=threshold=-20dB:ratio=3:attack=5:release=50,volume=1.0[a]; \
    [1:a]highpass=f=80,lowpass=f=14000,acompressor=threshold=-20dB:ratio=3:attack=5:release=50,volume=1.0[b]; \
    [a][b]amix=inputs=2:duration=longest:dropout_transition=2,loudnorm=I=-16:TP=-1.5:LRA=11[out]" \
  -map "[out]" -c:a aac -b:a 256k podcast_mixed.aac
```

## 34.2 Speaker switching — cuándo y cómo cortar entre hablantes

### 34.2.1 Regla fundamental del corte en conversación

El corte entre speakers debe sentirse **invisible**. El espectador no debería notar que cambió la cámara; debería sentir que la conversación fluye.

**Momento correcto para cortar:**

| Momento | Cortar a... | Razón |
|---------|-------------|-------|
| Speaker A termina una idea | Speaker B (reaction shot, luego respuesta) | Natural: se pasa la palabra |
| Speaker B reacciona (risa, sorpresa) | Speaker B (close-up de la reacción) | Capturar la emoción |
| Speaker A dice algo controversial | Speaker B (reaction shot de 1-2s) | Crear tensión con la reacción |
| Momento de énfasis (dato, revelación) | Plano general (ambos) | Mostrar el impacto en la sala |
| Pausa incómoda o silencio | Plano general o B-roll | Disimular la pausa |
| Speaker A refiere un producto/objeto | Close-up del objeto (B-roll) | Mostrar de qué habla |

### 34.2.2 Árbol de decisión: cuándo cambiar de cámara

```
¿CUÁNDO CORTAR A OTRA CÁMARA?
    │
    ├── IF el speaker actual está hablando y la idea no terminó
    │   │
    │   ├── IF pasaron más de 15 segundos en el mismo plano
    │   │       THEN → cortar al plano general por 3-5 segundos,
    │   │              luego volver al speaker
    │   │
    │   ├── ELSE IF el otro speaker reacciona visiblemente
    │   │       THEN → cortar al reactor por 1-3 segundos (reaction shot)
    │   │              luego volver al que habla
    │   │
    │   └── ELSE → mantener el plano actual
    │
    ├── ELSE IF el speaker terminó de hablar
    │   │
    │   ├── IF el otro va a responder inmediatamente
    │   │       THEN → cortar al otro speaker 0.5s ANTES de que empiece
    │   │              (anticipar el corte, no reaccionar tarde)
    │   │
    │   └── ELSE IF hay una pausa natural
    │           THEN → cortar a plano general durante la pausa
    │
    └── ELSE IF nadie habla (momento de reflexión/pausa)
            THEN → plano general por 2-3 segundos
            O → B-roll si la pausa es más larga
```

### 34.2.3 Errores comunes en speaker switching

| Error | Problema | Solución |
|-------|----------|----------|
| Cortar DESPUÉS de que el otro empieza a hablar | Se pierde el inicio de la respuesta | Anticipar 0.3-0.5s antes |
| Quedarse 30+ segundos en un plano | Monotonía visual | Máximo 15-20s en un plano fijo |
| Cortar al general y volver al mismo speaker | Corte innecesario, distrae | Solo cortar al general si aporta info |
| Reaction shots de más de 3 segundos | El reactor no está hablando, pierde interés | Reaction shot = 1-2 segundos máximo |
| Cortar en medio de una palabra | Jump cut brutal | Cortar en pausas naturales de respiración |

## 34.3 Split screen vs full-frame

### 34.3.1 Cuándo usar cada formato

```
¿SPLIT SCREEN O FULL-FRAME?
    │
    ├── IF es un debate o desacuerdo
    │       THEN → SPLIT SCREEN
    │       Razón: ver las reacciones simultáneas crea tensión
    │       Duración: mantener split 10-30 segundos durante el debate
    │
    ├── ELSE IF es una entrevista convencional
    │       THEN → FULL-FRAME con switching
    │       Razón: más íntimo, más natural
    │
    ├── ELSE IF es una presentación remota (Zoom/Riverside)
    │   │
    │   ├── IF ambos speakers tienen buena calidad de cámara
    │   │       THEN → FULL-FRAME con switching
    │   │
    │   └── ELSE (uno tiene mala cámara)
    │           THEN → SPLIT SCREEN (disimula la diferencia de calidad)
    │
    └── ELSE IF es un momento de reacción importante
            THEN → SPLIT SCREEN momentáneo (5-10 segundos)
            luego volver a full-frame
```

### 34.3.2 Comando ffmpeg para split screen horizontal

```bash
# ═══════════════════════════════════════════════
# Split screen: 2 speakers lado a lado (horizontal, YouTube)
# ═══════════════════════════════════════════════
ffmpeg -i speakerA.mp4 -i speakerB.mp4 \
  -filter_complex "\
    [0:v]crop=iw/2:ih:iw/4:0,scale=960:1080[left]; \
    [1:v]crop=iw/2:ih:iw/4:0,scale=960:1080[right]; \
    [left][right]hstack=inputs=2[v]; \
    color=c=#0a0f1a:s=1920x1080:d=1[bg]; \
    [bg][v]overlay=0:0[out]" \
  -map "[out]" -map 0:a \
  -c:v libx264 -preset slow -crf 18 \
  -c:a aac -b:a 256k \
  split_screen.mp4

# ═══════════════════════════════════════════════
# Split screen con línea divisora CYAN
# ═══════════════════════════════════════════════
ffmpeg -i speakerA.mp4 -i speakerB.mp4 \
  -filter_complex "\
    [0:v]crop=iw/2:ih:iw/4:0,scale=958:1080[left]; \
    [1:v]crop=iw/2:ih:iw/4:0,scale=958:1080[right]; \
    color=c=#00d4d4:s=4x1080:d=1[line]; \
    [left][line]hstack=inputs=2[leftline]; \
    [leftline][right]hstack=inputs=2[out]" \
  -map "[out]" -map 0:a \
  -c:v libx264 -crf 18 split_cyan_line.mp4
```

## 34.4 Lower thirds para identificación de speakers

### 34.4.1 Diseño de lower third para All Import

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                         VIDEO                               │
│                                                             │
│                                                             │
│   ┌─────────────────────────────────────┐                   │
│   │ █ NOMBRE DEL SPEAKER               │ ← CYAN #00d4d4   │
│   │   Rol / Descripción                │ ← WHITE #f8fafa   │
│   └─────────────────────────────────────┘                   │
│     ▲ barra lateral izquierda CYAN                          │
│     ▲ fondo: NAVY #0a0f1a con 80% opacidad                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Tipografía:
  Nombre: Montserrat Alternates Bold · 32px
  Rol:    Montserrat Alternates Regular · 22px
  
Animación:
  Entrada: slide desde la izquierda (0.4s ease-out)
  Permanencia: 4-5 segundos
  Salida: fade out (0.3s)
  
Momento de aparición:
  Primera vez que habla cada speaker en el video.
  NO repetir en cada aparición (solo la primera vez).
```

## 34.5 Eliminación de "ums", aire muerto y tangentes

### 34.5.1 Árbol de decisión: qué cortar y qué dejar

```
REVISANDO EL AUDIO DEL PODCAST
    │
    ├── "Um", "eh", "este", "o sea" (muletillas)
    │   │
    │   ├── IF es un "um" corto (<0.5s) en medio de una idea fluida
    │   │       THEN → DEJAR (cortar lo haría sonar robótico)
    │   │
    │   ├── ELSE IF es un "ummm" largo (>1s) o una cadena de muletillas
    │   │       THEN → CORTAR
    │   │       Técnica: cortar el audio + hacer J-cut o L-cut visual
    │   │
    │   └── ELSE IF la muletilla es parte del estilo/personalidad del speaker
    │           THEN → DEJAR (autenticidad > perfección)
    │
    ├── AIRE MUERTO (silencio entre ideas)
    │   │
    │   ├── IF el silencio es <1 segundo
    │   │       THEN → DEJAR (pausa natural)
    │   │
    │   ├── ELSE IF el silencio es 1-3 segundos
    │   │   │
    │   │   ├── IF es una pausa dramática intencional
    │   │   │       THEN → DEJAR (la pausa tiene propósito)
    │   │   │
    │   │   └── ELSE → RECORTAR a 0.5-0.8 segundos
    │   │
    │   └── ELSE IF el silencio es >3 segundos
    │           THEN → CORTAR completamente
    │           Visual: cubrir con B-roll o plano general
    │
    └── TANGENTES (el speaker se va de tema)
        │
        ├── IF la tangente es <15 segundos y es entretenida
        │       THEN → DEJAR (agrega personalidad)
        │
        ├── ELSE IF la tangente es 15-60 segundos
        │   │
        │   ├── IF tiene valor informativo o humorístico
        │   │       THEN → DEJAR pero agregar un texto en pantalla
        │   │              "dato random:" o "dato que nadie pidió"
        │   │
        │   └── ELSE → CORTAR con un jump cut + SFX de transición
        │
        └── ELSE IF la tangente es >60 segundos
                THEN → CORTAR siempre
                Cubrir el corte con un J-cut al siguiente tema
```

### 34.5.2 Comando ffmpeg para cortar silencios en podcast

```bash
# ═══════════════════════════════════════════════
# Detectar silencios de más de 1 segundo
# ═══════════════════════════════════════════════
ffmpeg -i podcast_raw.mp4 \
  -af "silencedetect=noise=-35dB:d=1.0" \
  -f null - 2>&1 | grep "silence_"

# Output ejemplo:
# [silencedetect @ 0x...] silence_start: 142.35
# [silencedetect @ 0x...] silence_end: 145.12 | silence_duration: 2.77
# [silencedetect @ 0x...] silence_start: 289.60
# [silencedetect @ 0x...] silence_end: 291.30 | silence_duration: 1.70

# ═══════════════════════════════════════════════
# Script para generar cortes automáticos (mantener 0.3s de silencio)
# ═══════════════════════════════════════════════
# Usar los timestamps de silencedetect para crear un filtro de select/concat
# que preserve 0.3s de cada silencio detectado.

# Ejemplo para cortar un segmento de silencio:
ffmpeg -i podcast_raw.mp4 \
  -vf "select='not(between(t,142.65,144.82))',setpts=N/FRAME_RATE/TB" \
  -af "aselect='not(between(t,142.65,144.82))',asetpts=N/SR/TB" \
  -c:v libx264 -crf 18 -c:a aac -b:a 256k \
  podcast_trimmed.mp4
```

## 34.6 Extracción de clips cortos desde podcast

### 34.6.1 Criterios para seleccionar clips

| Criterio | Peso | Qué buscar |
|----------|------|------------|
| Frase memorable / quotable | ALTO | Una frase que funciona sola sin contexto |
| Momento emocional fuerte | ALTO | Risa, sorpresa, desacuerdo, revelación |
| Dato o insight valioso | MEDIO | Algo que el espectador quiera compartir |
| Controversia / opinión fuerte | ALTO | Genera comentarios y debate |
| Historia personal | MEDIO | Anécdotas que generen identificación |
| Duración aislable | FILTRO | Debe funcionar en 30-90 segundos |

### 34.6.2 Re-edición del clip para short-form

```
CLIP EXTRAÍDO DEL PODCAST
    │
    ├── Paso 1: Cortar el segmento (30-90s)
    │   ffmpeg -i podcast.mp4 -ss 00:14:32 -to 00:15:45 -c copy clip_raw.mp4
    │
    ├── Paso 2: Reformatear a vertical (1080×1920)
    │   │
    │   ├── IF el speaker está centrado en frame
    │   │       THEN → crop + scale centrado
    │   │
    │   └── ELSE → crop con tracking de cara (face detection)
    │
    ├── Paso 3: Agregar subtítulos kinetic (estilo short-form)
    │   (ver → PARTE 03 §Capítulo 19)
    │
    ├── Paso 4: Agregar hook de texto en los primeros 2 segundos
    │   "Esto no lo sabía nadie" / "La verdad sobre [X]"
    │
    └── Paso 5: Exportar para cada plataforma
        (ver → PARTE 05 §Capítulo 38 para specs por plataforma)
```

```bash
# ═══════════════════════════════════════════════
# Extraer + reformatear clip horizontal a vertical
# ═══════════════════════════════════════════════
ffmpeg -i podcast.mp4 \
  -ss 00:14:32 -to 00:15:45 \
  -vf "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920:flags=lanczos" \
  -c:v libx264 -crf 18 -preset slow \
  -c:a aac -b:a 256k \
  clip_vertical.mp4
```

## 34.7 Zoom dinámico basado en energía del speaker

### 34.7.1 Reglas de zoom para podcast

```
NIVEL DE ENERGÍA DEL SPEAKER
    │
    ├── BAJA (hablando tranquilo, explicando)
    │       Zoom: 100% (plano original, sin zoom)
    │       Transición de zoom: N/A
    │
    ├── MEDIA (haciendo un punto, cierta emphasis)
    │       Zoom: 110-115% (acercamiento sutil)
    │       Transición: 0.5-0.8 segundos (ease-in-out)
    │
    ├── ALTA (emocionado, haciendo una revelación)
    │       Zoom: 120-130% (acercamiento notable)
    │       Transición: 0.3-0.5 segundos (más rápida)
    │
    └── PICO (gritando, risa explosiva, momento cumbre)
            Zoom: 135-150% (close-up dramático)
            Transición: instantánea o 0.2 segundos
            Mantener máximo 3-5 segundos, luego volver a 100-110%
```

## 34.8 Edición de podcast remoto (Zoom/Riverside)

### 34.8.1 Desafíos y soluciones

| Desafío | Causa | Solución en edición |
|---------|-------|-------------------|
| Calidad de video inconsistente | Cámaras distintas, conexiones distintas | Normalizar color/brillo entre speakers |
| Audio con eco o reverb | Habitaciones sin tratamiento | De-reverb + EQ + compresión |
| Delay entre speakers | Latencia de internet | Cortar micro-silencios de delay |
| Hablan al mismo tiempo (overlap) | Delay causa overlap | Elegir un speaker y silenciar al otro momentáneamente |
| Fondos feos o distintos | Cada uno graba donde puede | Blur de fondo + equalización de look |
| Desincronización | Audio y video de Zoom a veces se desfasan | Usar tracks separados de Riverside, no la grabación de Zoom |

```bash
# ═══════════════════════════════════════════════
# Normalizar brillo/contraste entre dos speakers remotos
# ═══════════════════════════════════════════════
# Speaker A: oscuro
ffmpeg -i speakerA.mp4 -vf "eq=brightness=0.06:contrast=1.1:saturation=1.05" \
  -c:v libx264 -crf 18 -c:a copy speakerA_corrected.mp4

# Speaker B: sobreexpuesto
ffmpeg -i speakerB.mp4 -vf "eq=brightness=-0.04:contrast=0.95:saturation=0.95" \
  -c:v libx264 -crf 18 -c:a copy speakerB_corrected.mp4
```

## 34.9 Checklist: QA de podcast video

- [ ] Audio de todos los speakers al mismo nivel percibido (±2 dB)
- [ ] Sin eco ni reverb excesivo en ningún speaker
- [ ] Muletillas largas (>1s) eliminadas
- [ ] Silencios >3s eliminados; silencios 1-3s recortados a 0.5-0.8s
- [ ] Tangentes >60s eliminadas
- [ ] Speaker switching sigue las reglas (anticipar 0.3-0.5s)
- [ ] No hay plano fijo de más de 20 segundos sin corte
- [ ] Lower thirds aparecen la primera vez que habla cada speaker
- [ ] Reaction shots usados cuando corresponde (1-2s máx)
- [ ] Split screen usado solo en momentos de debate/confrontación
- [ ] B-roll insertado en momentos que lo requieren
- [ ] Zoom dinámico aplicado según energía del speaker
- [ ] Clips cortos identificados y extraídos para short-form
- [ ] Audio normalizado a -16 LUFS (estándar podcast, más suave que YouTube)
- [ ] Música de intro/outro a nivel correcto (no compite con voces)
- [ ] Video sin artefactos de compresión visibles
- [ ] Sincronización audio/video correcta en todos los speakers

---

# Capítulo 35: Ads y comerciales — edición para conversión

## 35.1 Formatos de ads — clasificación completa

### 35.1.1 Tabla de formatos publicitarios

| Formato | Plataforma principal | Duración | Aspecto | ¿Skippeable? | Objetivo principal |
|---------|---------------------|----------|---------|---------------|-------------------|
| Pre-roll | YouTube | 6s (bumper), 15s, 30s | 16:9 | 6s no, resto sí después de 5s | Awareness |
| Mid-roll | YouTube | 15s, 30s, 60s | 16:9 | Sí después de 5s | Awareness/Tráfico |
| In-Feed (standalone) | IG, TikTok, FB | 5-60s | 9:16, 4:5, 1:1 | N/A (scroll) | Conversión |
| Stories Ad | IG, FB | 5-15s | 9:16 | Swipe | Tráfico/Conversión |
| Reels Ad | IG, TikTok | 5-90s | 9:16 | Scroll | Awareness/Conversión |
| UGC-style | Todas | 15-60s | 9:16 | Scroll | Conversión |
| Carousel Video | IG, FB | 5-15s/slide | 1:1, 4:5 | N/A | Producto showcase |

### 35.1.2 Specs técnicos por plataforma (ads)

| Plataforma | Resolución | Aspect Ratio | Max File Size | Max Duración | Codec | Audio |
|------------|-----------|--------------|---------------|-------------|-------|-------|
| Instagram Feed | 1080×1350 | 4:5 | 250 MB | 60s (feed) / 90s (reels) | H.264 | AAC, 128kbps+ |
| Instagram Stories | 1080×1920 | 9:16 | 250 MB | 15s por slide | H.264 | AAC |
| TikTok | 1080×1920 | 9:16 | 500 MB | 60s recomendado | H.264/H.265 | AAC |
| YouTube | 1920×1080 | 16:9 | 256 GB | 6s/15s/30s/60s | H.264 | AAC, 256kbps |
| Facebook Feed | 1080×1080 | 1:1 o 4:5 | 4 GB | 240 min (pero ideal <30s) | H.264 | AAC |
| Facebook Stories | 1080×1920 | 9:16 | 4 GB | 15s | H.264 | AAC |

## 35.2 Hook para ads — los primeros 3 segundos

### 35.2.1 Anatomía del hook publicitario

En un ad, el hook no tiene 15-30 segundos como en YouTube. Tiene **3 segundos o menos** para evitar el scroll/skip.

```
SEGUNDO 0-1: DISRUPCIÓN VISUAL
    │
    ├── Opción A: Movimiento rápido (producto volando, mano agarrando)
    ├── Opción B: Color vibrante que rompa el feed (CYAN o RED sobre fondo)
    ├── Opción C: Texto grande con pregunta directa "¿Todavía usás [X]?"
    └── Opción D: Cara con emoción fuerte (sorpresa, decepción, risa)

SEGUNDO 1-2: PROPOSICIÓN DE VALOR
    │
    ├── "Encontré [solución] por [precio bajo]"
    ├── "Esto reemplaza [cosa cara] por $[precio]"
    ├── "Lo que nadie te cuenta de [producto/categoría]"
    └── "[Número] personas ya tienen esto"

SEGUNDO 2-3: TRANSICIÓN AL CONTENIDO
    │
    ├── Corte rápido al producto en uso
    ├── "Mirá esto..." + demo inmediata
    └── "Te lo muestro en 15 segundos" (open loop + expectativa)
```

### 35.2.2 Árbol de decisión: tipo de hook por objetivo del ad

```
¿CUÁL ES EL OBJETIVO DEL AD?
    │
    ├── IF objetivo = AWARENESS (que te conozcan)
    │       Hook tipo: PROBLEMA → "¿Te pasa que [situación cotidiana]?"
    │       Visual: situación relatable + texto grande
    │       Tono: empático, cercano
    │
    ├── ELSE IF objetivo = CONSIDERACIÓN (que te evalúen)
    │       Hook tipo: COMPARACIÓN → "Esto vs [marca cara]: ¿cuál gana?"
    │       Visual: split screen o producto en mano
    │       Tono: informativo, directo
    │
    ├── ELSE IF objetivo = CONVERSIÓN (que compren)
    │       Hook tipo: OFERTA → "Solo hoy: [producto] a $[precio]"
    │       Visual: producto + precio grande + animación de urgencia
    │       Tono: urgente, RED para precio, GOLD para "premium"
    │
    └── ELSE IF objetivo = RETARGETING (ya te vieron antes)
            Hook tipo: SOCIAL PROOF → "[Número] ya lo compraron"
            Visual: testimonios, capturas de WhatsApp, fotos de clientes
            Tono: validación social, confianza
```

## 35.3 CTA — ubicación y animación

### 35.3.1 Cuándo colocar el CTA

| Duración del ad | CTA principal | CTA secundario (opcional) |
|----------------|---------------|--------------------------|
| 6s (bumper) | Segundo 4-6 (al final) | No hay espacio |
| 15s | Segundo 12-15 | No recomendado |
| 30s | Segundo 25-30 | Segundo 12-15 (soft CTA) |
| 60s | Segundo 50-60 | Segundo 25-30 |

### 35.3.2 Diseño visual del CTA para All Import

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      VIDEO / PRODUCTO                       │
│                                                             │
│                                                             │
│   ┌─────────────────────────────────────────────┐           │
│   │          PEDILO POR WHATSAPP                │           │
│   │          @allimport.cba                     │           │
│   └─────────────────────────────────────────────┘           │
│     ▲ Fondo: CYAN #00d4d4                                   │
│     ▲ Texto: NAVY #0a0f1a (Montserrat Alternates Bold)     │
│     ▲ Animación: bounce in desde abajo (0.4s)              │
│     ▲ Posición: tercio inferior, centrado                   │
│                                                             │
│   PRECIO: $XX.XXX  ← RED #e22a2a si hay oferta             │
│                     ← GOLD #c9a227 si es "precio premium"   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 35.3.3 Para @_agus_moreno_ (cuenta personal)

```
CTA personal (sin branding corporativo):
  Texto: "Link en bio" o "Escribime al DM"
  Posición: parte inferior, alineado a la izquierda
  Sin logo de All Import
  Fondo: semi-transparente o sin fondo
  Tipografía: puede ser más casual
```

## 35.4 Social proof — integración en ads

### 35.4.1 Tipos de social proof y cómo editarlos

| Tipo | Fuente | Edición |
|------|--------|---------|
| Testimonios de WhatsApp | Screenshots de chats reales | Blur del número, crop limpio, escalar a 1080px ancho, agregar borde CYAN de 2px |
| Número de ventas | Dato interno | Animación de counter (0 → número) sobre fondo NAVY |
| Fotos de clientes con producto | Fotos reales enviadas por clientes | Grid de 4-9 fotos con transición slide, duración 2-3s |
| Reviews/comentarios de IG | Screenshots de comentarios | Crop, escalar, animar entrada con slide |
| Antes/después | Comparación visual | Split screen o swipe reveal |

### 35.4.2 Comando ffmpeg para grid de testimonios

```bash
# ═══════════════════════════════════════════════
# Grid 2×2 de fotos de clientes sobre fondo NAVY
# ═══════════════════════════════════════════════
ffmpeg \
  -i cliente1.jpg -i cliente2.jpg -i cliente3.jpg -i cliente4.jpg \
  -filter_complex "\
    color=c=#0a0f1a:s=1080x1920:d=3[bg]; \
    [0:v]scale=500:500:force_original_aspect_ratio=decrease,pad=500:500:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a[a]; \
    [1:v]scale=500:500:force_original_aspect_ratio=decrease,pad=500:500:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a[b]; \
    [2:v]scale=500:500:force_original_aspect_ratio=decrease,pad=500:500:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a[c]; \
    [3:v]scale=500:500:force_original_aspect_ratio=decrease,pad=500:500:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a[d]; \
    [bg][a]overlay=30:400[t1]; \
    [t1][b]overlay=550:400[t2]; \
    [t2][c]overlay=30:920[t3]; \
    [t3][d]overlay=550:920[out]" \
  -map "[out]" -frames:v 1 grid_clientes.png
```

## 35.5 Edición UGC-style — hacer que el ad parezca orgánico

### 35.5.1 Características de un ad UGC-style

| Característica | Ad corporativo tradicional | Ad UGC-style |
|---------------|---------------------------|---------------|
| Cámara | Tripod, iluminación profesional | Celular en mano, luz natural |
| Encuadre | Perfecto, compuesto | Ligeramente off-center, casual |
| Audio | Voiceover profesional | Voz directa del "usuario" |
| Texto | Tipografía corporativa | Tipografía nativa de la plataforma |
| Color grading | Pulido, corrección precisa | Mínimo, natural o con filtro de IG |
| Movimiento | Smooth, motorizado | Shaky deliberado (pero controlado) |
| CTA | Botón animado profesional | "Link en bio" casual |

### 35.5.2 Árbol de decisión: ad corporativo vs UGC-style

```
¿QUÉ ESTILO DE AD EDITAR?
    │
    ├── IF el producto es de gama alta (premium)
    │   │
    │   ├── IF la audiencia es joven (18-25)
    │   │       THEN → UGC-style (autenticidad > producción)
    │   │
    │   └── ELSE → Corporativo con producción alta
    │
    ├── ELSE IF el producto es de gama media-baja (importado accesible)
    │       THEN → UGC-style (All Import = accesible, cercano)
    │
    ├── ELSE IF el objetivo es retargeting
    │       THEN → UGC-style (testimonios reales, conversación)
    │
    └── ELSE IF el objetivo es awareness masivo
        │
        ├── IF presupuesto de ad alto
        │       THEN → Corporativo
        │
        └── ELSE → UGC-style (mejor performance orgánica con menos presupuesto)
```

## 35.6 A/B testing de ads — cómo editar variantes

### 35.6.1 Qué variar en cada test

| Variable a testear | Variante A | Variante B | Qué mide |
|-------------------|------------|------------|-----------|
| Hook (primeros 3s) | Pregunta "¿Te pasa que...?" | Demo directa del producto | CTR, hook rate |
| CTA | "Pedilo por WhatsApp" | "Link en bio" | Click-through, conversión |
| Duración | 15 segundos | 30 segundos | Watch time, conversión |
| Formato visual | Full vertical con subtítulos | Split screen con producto | Engagement, saves |
| Música | Trending audio | Sin música, solo SFX | Reach, shares |
| Estilo | Corporativo (@allimport.cba) | UGC personal (@_agus_moreno_) | Engagement, conversión |

### 35.6.2 Workflow de edición para A/B

```
EDICIÓN A/B
    │
    ├── Paso 1: Editar la versión COMPLETA del ad (versión A)
    │
    ├── Paso 2: Duplicar el proyecto
    │
    ├── Paso 3: Cambiar SOLO la variable que se está testeando
    │   (no cambiar 2 cosas a la vez — invalida el test)
    │
    ├── Paso 4: Exportar ambas versiones con nomenclatura clara
    │   Ejemplo: ad_tws_hookA_v1.mp4 / ad_tws_hookB_v1.mp4
    │
    └── Paso 5: Publicar ambas con el mismo presupuesto y audiencia
        Medir durante 48-72 horas antes de sacar conclusiones
```

## 35.7 Templates de ads para productos All Import

### 35.7.1 Template: Review rápida de producto (15-30s)

```
TIMELINE:
0:00-0:03  Hook: "¿Buscás [categoría] que no te salgan un ojo?"
0:03-0:05  Producto en mano, giro 360° (close-up)
0:05-0:10  Feature #1 con texto en pantalla + SFX
0:10-0:15  Feature #2 con texto en pantalla + SFX
0:15-0:20  Producto en uso (audio demo para TWS, encendido para parlante)
0:20-0:25  Precio en pantalla (RED #e22a2a) + "envío a toda Córdoba"
0:25-0:30  CTA: "Pedilo por WhatsApp" (CYAN #00d4d4) + @allimport.cba
```

### 35.7.2 Template: Comparación precio (15s)

```
TIMELINE:
0:00-0:02  "Mismo [producto], diferente precio"
0:02-0:07  Split screen: marca cara (izquierda) vs All Import (derecha)
           Precios grandes: $XX.XXX vs $X.XXX
0:07-0:12  Close-up del producto All Import, mostrando calidad
0:12-0:15  CTA: "¿Por qué pagar más?" + @allimport.cba
```

## 35.8 Checklist: QA de ad video

- [ ] Hook captura atención en los primeros 3 segundos
- [ ] Hook no es engañoso (la promesa coincide con el contenido)
- [ ] Producto visible en los primeros 5 segundos
- [ ] Precio visible y correcto si se muestra
- [ ] CTA claro y visible (no tapado por elementos de UI de la plataforma)
- [ ] CTA en la zona segura (no tapado por barra de IG/TikTok)
- [ ] Social proof incluido si es relevante
- [ ] Sin información falsa o engañosa
- [ ] Disclaimers legales si corresponde (precio final, condiciones)
- [ ] Formato correcto para la plataforma destino (aspect ratio, resolución)
- [ ] Duración dentro del límite de la plataforma
- [ ] Audio normalizado (-14 LUFS para YouTube, -16 LUFS para redes)
- [ ] Subtítulos para viewing sin audio (la mayoría ve ads sin sonido)
- [ ] Logo presente si es @allimport.cba, ausente si es @_agus_moreno_
- [ ] Branding coherente (colores, fuentes según la cuenta)
- [ ] Sin fotogramas negros ni artefactos visuales
- [ ] Versiones A/B exportadas con nomenclatura correcta
- [ ] Testeado en celular real (no solo en pantalla de computadora)
- [ ] Safe zone verificada: elementos clave no tapados por UI de la plataforma
- [ ] Peso del archivo dentro del límite de la plataforma

---

# Capítulo 36: QA completo — checklist maestro de calidad

## 36.1 El checklist maestro — 60 puntos organizados por categoría

Este es el checklist definitivo que se aplica a CUALQUIER video antes de publicar. No todos los items aplican a todos los videos — usá el árbol de decisión de la sección 36.6 para filtrar.

### 36.1.1 Categoría: TÉCNICO (15 items)

- [ ] Resolución correcta para la plataforma destino
- [ ] Aspect ratio correcto (9:16, 16:9, 1:1, 4:5)
- [ ] Frame rate consistente (30fps o 60fps, no mezclados)
- [ ] Sin fotogramas negros accidentales (ni al inicio ni al final)
- [ ] Sin fotogramas congelados (freeze frames no intencionales)
- [ ] Codec correcto (H.264 para compatibilidad universal)
- [ ] Pixel format yuv420p (compatibilidad con todos los reproductores)
- [ ] Bitrate adecuado (no sobre-comprimido, no excesivamente grande)
- [ ] Movflags +faststart aplicado (streaming rápido)
- [ ] Peso del archivo dentro del límite de la plataforma
- [ ] Sin artefactos de compresión visibles (blocking, banding)
- [ ] Sin tearing ni glitches de render
- [ ] Duración exacta (no sobra ni falta, sin cola negra al final)
- [ ] Metadata limpia (no incluir paths locales ni datos privados)
- [ ] Exportación sin errores de ffmpeg (verificar log)

### 36.1.2 Categoría: AUDIO (10 items)

- [ ] Loudness integrado dentro del rango objetivo (-14 a -16 LUFS según plataforma)
- [ ] True Peak no excede -1.0 dBTP
- [ ] Sin clipping ni distorsión audible
- [ ] Voz inteligible sobre música/SFX en todo momento
- [ ] Balance voz/música correcto (voz al menos 6 dB sobre música)
- [ ] Sin ruido de fondo excesivo (aire acondicionado, tráfico, ventilador)
- [ ] Sin pops ni clicks en las ediciones de audio
- [ ] SFX a nivel adecuado (no más fuerte que la voz)
- [ ] Sincronización audio/video perfecta (no hay delay)
- [ ] Audio en formato correcto (estéreo para YouTube, mono aceptable para stories)

### 36.1.3 Categoría: VISUAL (10 items)

- [ ] Exposición correcta (no oscuro ni sobreexpuesto)
- [ ] Balance de blancos coherente entre clips
- [ ] Color grading aplicado y coherente con la marca
- [ ] Sin jump cuts no intencionales
- [ ] Transiciones limpias (sin glitches en los cortes)
- [ ] B-roll relevante y de calidad suficiente
- [ ] Zoom/pan suaves (no bruscos salvo que sea intencional)
- [ ] Encuadre correcto (regla de tercios, headroom adecuado)
- [ ] Sin elementos no deseados en frame (basura, cables, personas ajenas)
- [ ] Velocidad de reproducción correcta (slow-mo/time-lapse donde corresponde)

### 36.1.4 Categoría: TEXTO Y SUBTÍTULOS (8 items)

- [ ] Sin errores de ortografía ni gramática
- [ ] Subtítulos sincronizados correctamente con el audio
- [ ] Texto legible en pantalla de celular (tamaño mínimo viable)
- [ ] Contraste suficiente texto/fondo (texto legible sobre cualquier clip)
- [ ] Tipografía correcta (Montserrat Alternates para All Import)
- [ ] Duración de cada placa de texto suficiente para leerla (mínimo 1.5s)
- [ ] Texto dentro de la safe zone (no cortado por bordes ni tapado por UI)
- [ ] Kinetic captions con animación limpia (sin saltos ni overlaps)

### 36.1.5 Categoría: MARCA (7 items)

- [ ] Logo presente/ausente según la cuenta (@allimport.cba: sí / @_agus_moreno_: no)
- [ ] Colores de marca usados correctamente (NAVY, CYAN, WHITE, RED, CELESTE, GOLD)
- [ ] Tipografía de marca correcta (Montserrat Alternates)
- [ ] Tono del contenido coherente con la cuenta
- [ ] Watermark colocado en posición correcta y no intrusivo
- [ ] Intro/outro de marca si corresponde
- [ ] CTA coherente con la estrategia de la cuenta

### 36.1.6 Categoría: PLATAFORMA (6 items)

- [ ] Safe zones respetadas (top 250px y bottom 400px en vertical)
- [ ] Elementos clave no tapados por UI de la plataforma (nombre de usuario, barra de interacción, barra de progreso)
- [ ] Duración dentro del rango óptimo de la plataforma
- [ ] Formato de subtítulos compatible con la plataforma
- [ ] Hashtags y caption preparados (separados del video)
- [ ] Audio compatible (copyright-free o con licencia para la plataforma)

### 36.1.7 Categoría: LEGAL (4 items)

- [ ] No hay música con copyright sin licencia
- [ ] No hay material de terceros sin permiso (fotos, videos de otros)
- [ ] Precios mostrados son correctos y actuales
- [ ] Disclaimers incluidos si hay claims de rendimiento/resultado

## 36.2 QA automatizado con ffmpeg

### 36.2.1 Detección de fotogramas negros

```bash
# ═══════════════════════════════════════════════
# Detectar fotogramas negros (posibles errores de render)
# ═══════════════════════════════════════════════
ffmpeg -i video.mp4 \
  -vf "blackdetect=d=0.05:pix_th=0.10" \
  -an -f null - 2>&1 | grep "black_"

# Output ejemplo:
# [blackdetect] black_start:0 black_end:0.0333 black_duration:0.0333
# [blackdetect] black_start:45.2 black_end:45.4 black_duration:0.2

# INTERPRETACIÓN:
# IF black_start = 0 AND black_duration < 0.1
#     THEN → normal, primer frame, aceptable
# ELSE IF black_duration > 0.1 en cualquier otro punto
#     THEN → DEFECTO. Fotograma negro accidental. CORREGIR.
```

### 36.2.2 Detección de picos de audio

```bash
# ═══════════════════════════════════════════════
# Medir picos de audio (clipping)
# ═══════════════════════════════════════════════
ffmpeg -i video.mp4 \
  -af "astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.Peak_level:file=peaks.txt" \
  -f null - 2>&1

# Buscar picos sobre 0 dB (clipping)
# IF algún peak_level >= 0.0 dB → DEFECTO BLOCKER. Audio clippeando.

# ═══════════════════════════════════════════════
# Verificar loudness integrado
# ═══════════════════════════════════════════════
ffmpeg -i video.mp4 \
  -af "loudnorm=I=-14:TP=-1.0:LRA=11:print_format=json" \
  -f null - 2>&1 | grep -A5 "input_i"

# IF input_i está entre -15 y -13 → OK para YouTube
# IF input_i está entre -17 y -15 → OK para redes sociales
# ELSE → necesita normalización
```

### 36.2.3 Verificación de aspect ratio y resolución

```bash
# ═══════════════════════════════════════════════
# Verificar resolución, aspect ratio y duración
# ═══════════════════════════════════════════════
ffprobe -v error \
  -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,duration,codec_name,pix_fmt \
  -show_entries format=duration,size,bit_rate \
  -of json video.mp4

# Verificaciones automáticas:
# IF width=1080 AND height=1920 → vertical 9:16 ✓ (stories/reels)
# IF width=1920 AND height=1080 → horizontal 16:9 ✓ (YouTube)
# IF width=1080 AND height=1080 → cuadrado 1:1 ✓ (feed)
# IF width=1080 AND height=1350 → 4:5 ✓ (feed IG)
# IF pix_fmt != "yuv420p" → ADVERTENCIA: puede no reproducirse en todos los devices
# IF codec_name != "h264" → ADVERTENCIA: compatibilidad reducida
```

### 36.2.4 Detección de audio en silencio total

```bash
# ═══════════════════════════════════════════════
# Detectar tramos sin audio (posible error de edición)
# ═══════════════════════════════════════════════
ffmpeg -i video.mp4 \
  -af "silencedetect=noise=-50dB:d=2.0" \
  -f null - 2>&1 | grep "silence_"

# IF silence_duration > 3.0 en un video que debería tener audio continuo
#     THEN → DEFECTO. Audio faltante. Revisar edición.
# IF silence_start = 0 AND silence_duration < 0.5
#     THEN → Normal (breve silencio al inicio)
```

## 36.3 QA manual — proceso de 3 pasadas

### 36.3.1 Las tres pasadas obligatorias

```
PASADA 1: CON SONIDO, EN COMPUTADORA
    │
    ├── Objetivo: verificar contenido, narrativa, audio
    ├── Buscar: errores de corte, audio desincronizado, pops, clipping
    ├── Pantalla: monitor de computadora (tamaño completo)
    └── Anotar: timestamps de cada problema encontrado
        
PASADA 2: SIN SONIDO, EN CELULAR
    │
    ├── Objetivo: verificar legibilidad visual y subtítulos
    ├── Buscar: textos ilegibles, subtítulos fuera de safe zone, elementos tapados
    ├── Pantalla: celular real (no emulador)
    └── Anotar: problemas de legibilidad y safe zone

PASADA 3: CON SONIDO, EN CELULAR (VELOCIDAD 1.5x)
    │
    ├── Objetivo: verificar ritmo y pacing general
    ├── Buscar: momentos que se sienten lentos incluso a 1.5x
    ├── Si algo se siente lento a 1.5x → probablemente necesite más cortes
    └── Verificar: que la experiencia completa se sienta correcta
```

## 36.4 Defectos comunes y cómo corregir cada uno

| # | Defecto | Severidad | Causa típica | Corrección |
|---|---------|-----------|-------------|------------|
| 1 | Fotograma negro al final | Mayor | Export sin trim final | `ffmpeg -i video.mp4 -t [duración_correcta] -c copy output.mp4` |
| 2 | Audio clippeando | Blocker | Volumen excesivo en mezcla | Reducir volumen + re-normalizar con loudnorm |
| 3 | Subtítulo fuera de safe zone | Mayor | Posición Y incorrecta | Mover texto 100px arriba del borde inferior |
| 4 | Jump cut visible | Crítico | Falta B-roll para cubrir el corte | Insertar B-roll o zoom de transición |
| 5 | Desincronización audio/video | Blocker | Offset de audio | `ffmpeg -itsoffset [offset] -i audio ...` |
| 6 | Texto ilegible en celular | Mayor | Tamaño de fuente muy chico | Mínimo 40px para texto principal en 1080px ancho |
| 7 | Color grading inconsistente | Menor | Clips de distintas fuentes sin LUT | Aplicar mismo LUT/filtro a todos los clips |
| 8 | Logo borroso | Menor | Imagen de logo en baja resolución | Usar versión SVG o PNG de alta resolución |
| 9 | Música más fuerte que la voz | Crítico | Mezcla incorrecta | Bajar música a -22/-18 LUFS, voz a -12/-10 LUFS |
| 10 | Artefactos de compresión | Mayor | CRF muy alto o bitrate muy bajo | Reexportar con CRF más bajo (18 o menos) |

## 36.5 Niveles de severidad para defectos

| Nivel | Nombre | Definición | Acción |
|-------|--------|-----------|--------|
| **S1** | BLOCKER | Hace al video imposible de publicar. Daño de marca. | Re-editar ANTES de publicar. Sin excepciones. |
| **S2** | CRÍTICO | Afecta severamente la calidad percibida. El espectador lo nota inmediatamente. | Re-editar a menos que haya urgencia temporal justificada. |
| **S3** | MAYOR | Afecta la calidad pero no destruye la experiencia. Solo lo nota un ojo entrenado. | Corregir si el timeline lo permite. Documentar para la próxima vez. |
| **S4** | MENOR | Imperfección cosmética mínima. La mayoría de los espectadores no lo nota. | Corregir solo si no agrega tiempo significativo. |

### 36.5.1 Ejemplos por severidad

```
S1 — BLOCKER (publicar = daño):
    - Audio completamente desincronizado
    - Precio incorrecto visible en pantalla
    - Logo de otra marca visible
    - Audio clippeando fuertemente
    - Contenido de otro cliente/proyecto mezclado

S2 — CRÍTICO (publicar = mala impresión):
    - Jump cuts visibles no intencionales
    - Subtítulos con errores de ortografía
    - Música más fuerte que la voz
    - Fotograma negro de >0.5s en medio del video
    - Safe zone violada (UI tapa contenido clave)

S3 — MAYOR (publicar = OK pero mejorable):
    - Color grading inconsistente entre clips
    - B-roll ligeramente desenfocado
    - Transición que se siente abrupta
    - Logo ligeramente pixelado
    - Pacing irregular (una sección más lenta que el resto)

S4 — MENOR (publicar sin problema):
    - Alineación de texto 2px off-center
    - Ligera diferencia de brillo entre clips consecutivos
    - SFX 1 dB más fuerte de lo ideal
    - B-roll 0.3s más largo de lo necesario
    - Sombra de texto 1px off
```

## 36.6 Árbol de decisión: QA pass/fail

```
¿EL VIDEO PASA QA?
    │
    ├── IF tiene algún defecto S1 (BLOCKER)
    │       THEN → FAIL. No publicar. Re-editar obligatorio.
    │
    ├── ELSE IF tiene defectos S2 (CRÍTICO)
    │   │
    │   ├── IF hay tiempo para corregir (>30 min antes de deadline)
    │   │       THEN → FAIL. Corregir los S2.
    │   │
    │   └── ELSE IF la publicación es tiempo-sensitiva (trending, evento)
    │       │
    │       ├── IF hay más de 2 defectos S2
    │       │       THEN → FAIL. Ni la urgencia justifica publicar con múltiples S2.
    │       │
    │       └── ELSE (1-2 defectos S2 y urgencia alta)
    │               THEN → PASS CONDICIONAL
    │               Publicar + anotar para re-editar y resubir en 24h
    │
    ├── ELSE IF tiene solo defectos S3 y S4
    │       THEN → PASS
    │       Corregir S3 si el tiempo lo permite. S4 ignorar.
    │
    └── ELSE (sin defectos)
            THEN → PASS perfecto ✓
```

## 36.7 Templates de feedback de QA

### 36.7.1 Reporte de QA — formato estándar

```
═══════════════════════════════════════════════
QA REPORT — [nombre_del_video.mp4]
Fecha: [YYYY-MM-DD]
Revisor: [nombre/agente]
Plataforma destino: [IG Reels / YouTube / TikTok / Stories]
Cuenta: [@allimport.cba / @_agus_moreno_]
═══════════════════════════════════════════════

RESULTADO: [PASS / FAIL / PASS CONDICIONAL]

DEFECTOS ENCONTRADOS:
#1 [S-level] — [descripción] — timestamp [HH:MM:SS]
#2 [S-level] — [descripción] — timestamp [HH:MM:SS]
...

CHECKLIST RESUMIDO:
  Técnico:    [✓/✗] [detalle si ✗]
  Audio:      [✓/✗]
  Visual:     [✓/✗]
  Texto:      [✓/✗]
  Marca:      [✓/✗]
  Plataforma: [✓/✗]
  Legal:      [✓/✗]

ACCIONES REQUERIDAS:
  1. [acción correctiva para defecto #1]
  2. [acción correctiva para defecto #2]

NOTAS ADICIONALES:
  [observaciones, sugerencias de mejora]
═══════════════════════════════════════════════
```

## 36.8 Workflow de verificación final pre-publicación

```
VIDEO "TERMINADO"
    │
    ├── Paso 1: QA automatizado (ffmpeg checks)
    │   ├── Fotogramas negros
    │   ├── Picos de audio
    │   ├── Resolución y aspect ratio
    │   └── Loudness
    │
    ├── Paso 2: Pasada 1 — con sonido, computadora
    │
    ├── Paso 3: Pasada 2 — sin sonido, celular
    │
    ├── Paso 4: Pasada 3 — con sonido, celular, 1.5x
    │
    ├── Paso 5: Generar reporte de QA
    │   │
    │   ├── IF FAIL → volver a edición con el reporte
    │   │
    │   └── IF PASS → continuar
    │
    ├── Paso 6: Verificación final de metadata
    │   ├── Nombre de archivo correcto
    │   ├── Caption/descripción lista
    │   ├── Hashtags preparados
    │   └── Thumbnail lista (si aplica)
    │
    └── Paso 7: PUBLICAR
```

---

# Capítulo 37: Iteración y analytics — mejorar con datos

## 37.1 Métricas que importan (y las que no)

### 37.1.1 Tabla de métricas por importancia

| Métrica | Importancia | Qué indica | La edición puede mejorarla? |
|---------|------------|------------|---------------------------|
| **Watch time / retención** | ALTA | Cuánto tiempo ven el video | SÍ — es la métrica #1 que la edición controla |
| **Shares / compartidos** | ALTA | El contenido es tan bueno que lo comparten | SÍ — un buen hook + contenido valioso + CTA de compartir |
| **Saves / guardados** | ALTA | El contenido tiene valor de referencia | SÍ — contenido informativo bien presentado incentiva el save |
| **Comentarios** | MEDIA | Engagement activo, el contenido genera opinión | PARCIAL — un CTA en pantalla puede pedir comentarios |
| **Likes** | MEDIA-BAJA | Aprobación pasiva | POCO — los likes dependen más del contenido que de la edición |
| **Vistas totales** | BAJA (como métrica aislada) | Alcance | INDIRECTO — la retención causa más distribución → más vistas |
| **Seguidores ganados** | MEDIA | El video convierte viewers en seguidores | PARCIAL — CTA + valor del contenido |
| **Impresiones** | BAJA | Cuántas veces se mostró | NO — depende del algoritmo, no de la edición |
| **Alcance** | BAJA | Cuántas cuentas únicas vieron | NO — es consecuencia, no causa |

### 37.1.2 Regla de oro de métricas

**La edición controla directamente la retención. La retención controla el alcance. El alcance controla todo lo demás.**

```
EDICIÓN → RETENCIÓN → DISTRIBUCIÓN → ALCANCE → ENGAGEMENT → CONVERSIÓN
   ▲                                                              │
   └──────────────── DATOS DE ANALYTICS ──────────────────────────┘
```

## 37.2 Cómo leer Instagram Insights para video

### 37.2.1 Métricas de Instagram Reels — qué mirar

| Métrica IG | Dónde encontrarla | Qué hacer con ella |
|-----------|-------------------|-------------------|
| Reproducciones | Insights del reel | Si son bajas: problema de hook/thumbnail/hashtags |
| Cuentas alcanzadas | Insights > Alcance | Comparar con reproducciones: ratio alto = buena viralidad |
| Interacciones | Insights > Interacciones | Sumar likes+comentarios+shares+saves. Shares+saves > likes = contenido bueno |
| Tiempo medio de visualización | Insights > Retención | SI <50% de la duración: el video pierde gente a mitad. Edición demasiado lenta o hook fallido |
| Reproducción de audio | Insights | SI es bajo: la mayoría ve sin audio → los subtítulos son críticos |
| Follows ganados | Insights > Seguidores | SI son muchos: el video es de tipo "discovery". Replicar la fórmula |

### 37.2.2 Cómo leer la curva de retención de Instagram

Instagram muestra una curva simplificada. Interpretación:

```
CURVA DE RETENCIÓN DE IG REELS
    │
    ├── IF caída fuerte en los primeros 3 segundos (>40% de caída)
    │       DIAGNÓSTICO: hook débil
    │       ACCIÓN: re-editar hook (→ PARTE 04 §hooks)
    │
    ├── ELSE IF caída progresiva constante (sin meseta)
    │       DIAGNÓSTICO: el video no retiene, falta engagement visual
    │       ACCIÓN: agregar más pattern interrupts, subir la densidad de cortes
    │
    ├── ELSE IF hay una caída puntual en un segundo específico
    │       DIAGNÓSTICO: ese segundo tiene un momento aburrido o confuso
    │       ACCIÓN: identificar qué pasa en ese timestamp y re-editar
    │
    ├── ELSE IF la curva tiene picos (sube en ciertos momentos)
    │       DIAGNÓSTICO: la gente vuelve a ver esas partes (replay)
    │       ACCIÓN: estudiar esos momentos y replicar su fórmula
    │
    └── ELSE IF la curva es plana y alta (>60% hasta el final)
            DIAGNÓSTICO: video muy bien editado. No tocar.
            ACCIÓN: analizar qué lo hace funcionar y documentar el patrón
```

## 37.3 Cómo leer TikTok Analytics para video

### 37.3.1 Métricas de TikTok — tabla completa

| Métrica TikTok | Importancia para edición | Interpretación |
|---------------|------------------------|----------------|
| Tiempo total de visualización | ALTA | Cuántos minutos totales acumuló el video |
| Tiempo medio de reproducción | ALTA | Promedio de cuánto ve cada persona. Objetivo: >80% de la duración |
| Visualización completa (%) | ALTA | % que llega al final. >30% es muy bueno para TikTok |
| Tasa de reproducción (play rate) | MEDIA | % de personas que ven vs que scrollean. Afectada por thumbnail/primer frame |
| Fuentes de tráfico | MEDIA | "For You" = el algoritmo te distribuyó. "Following" = solo tus seguidores |
| Territorios principales | BAJA para edición | Útil para decidir idioma/horario, no para edición |

### 37.3.2 TikTok: la métrica secreta — Completion Rate × Replay

```
MÉTRICA CLAVE DE TIKTOK:
    │
    ├── IF completion rate > 100% (la gente lo ve más de 1 vez)
    │       THEN → el video es altamente viral
    │       ACCIÓN: NO re-editar. Estudiar qué lo hace repetible.
    │       Documentar: tipo de hook, estructura, duración, estilo de edición
    │
    ├── ELSE IF completion rate 70-100%
    │       THEN → muy buen video
    │       ACCIÓN: optimizar el hook para subir un 5-10% más
    │
    ├── ELSE IF completion rate 40-70%
    │       THEN → bueno pero mejorable
    │       ACCIÓN: analizar dónde cae la retención y agregar pattern interrupts
    │
    └── ELSE IF completion rate < 40%
            THEN → el video pierde gente rápido
            ACCIÓN: re-editar completamente hook + pacing
            O: video demasiado largo para TikTok → acortar
```

## 37.4 Análisis de curva de retención — detallado

### 37.4.1 Patrones de curva y su diagnóstico

```
PATRÓN 1: CAÍDA LIBRE
100%│■■
    │  ■■
    │    ■■
    │      ■■
    │        ■■
 20%│          ■■■■■
    └──────────────────
    Diagnóstico: Hook inexistente o engañoso
    Solución: Re-hacer hook completo

PATRÓN 2: CAÍDA INICIAL + MESETA
100%│■■■■
    │    ■■
 60%│      ■■■■■■■■■■■■■
    │                    ■■
    │                      ■
    └──────────────────────────
    Diagnóstico: Buen contenido después del hook,
                 pero el hook pierde a los curiosos casuales
    Solución: Mejorar hook sin tocar el resto

PATRÓN 3: MESETA CON CAÍDAS
100%│■■■■■
 80%│     ■■■■
    │         ■■■
 50%│            ■■■■■
    │                 ■■
    └────────────────────
    Diagnóstico: Momentos puntuales de aburrimiento
    Solución: Agregar pattern interrupts en los timestamps de caída

PATRÓN 4: DIENTES DE SIERRA
100%│■  ■  ■
    │ ■■ ■■ ■■
 60%│          ■  ■
    │           ■■ ■■
    │               ■
    └──────────────────
    Diagnóstico: Los picos son replays. La gente vuelve a ver partes.
    Solución: NO tocar los picos. Son lo mejor del video. Replicar.

PATRÓN 5: PLANO ALTO
100%│■■■■■■■■■■■■■■■■■■
 80%│
    │
    └──────────────────
    Diagnóstico: Video casi perfecto
    Solución: Documentar la fórmula completa. Este es el benchmark.
```

## 37.5 A/B testing para video — metodología

### 37.5.1 Protocolo de A/B testing

| Paso | Acción | Detalle |
|------|--------|---------|
| 1 | Definir hipótesis | "Un hook con pregunta retiene más que un hook con afirmación" |
| 2 | Definir la variable | SOLO UNA variable por test (hook, CTA, duración, música...) |
| 3 | Editar variante A | La versión "control" (actual) |
| 4 | Editar variante B | Idéntica a A excepto por la variable testeada |
| 5 | Publicar ambas | Mismo día, misma hora, misma cuenta (o audiencias separadas si es ad) |
| 6 | Esperar 48-72 horas | No tocar ni promover ninguna |
| 7 | Comparar métrica clave | Retención para edición, CTR para hooks, conversión para CTAs |
| 8 | Documentar resultado | Agregar al "estilo database" |
| 9 | Implementar ganador | Usar la fórmula ganadora en los próximos videos |

### 37.5.2 Variables testeables y métrica a medir

| Variable | Métrica clave | Ejemplo de test |
|----------|-------------|-----------------|
| Hook (primeros 3s) | Retención a los 3s | Pregunta vs afirmación vs teaser visual |
| Duración total | Completion rate | 15s vs 30s vs 60s para el mismo contenido |
| Estilo de subtítulos | Retención media | Kinetic grandes vs estáticos vs sin subtítulos |
| Música | Shares + saves | Trending audio vs sin música vs lo-fi |
| Densidad de cortes | Retención media | 10 cortes/min vs 20 cortes/min |
| CTA final | Follows, profile visits | "Seguime" vs "Link en bio" vs sin CTA |
| Cuenta de publicación | Engagement | @allimport.cba vs @_agus_moreno_ para el mismo contenido |

## 37.6 Workflow de iteración: editar → publicar → medir → aprender → re-editar

```
┌────────────────────────────────────────────────────────────────┐
│                   CICLO DE ITERACIÓN                           │
│                                                                │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐               │
│   │  EDITAR  │───→│ PUBLICAR │───→│  MEDIR   │               │
│   └──────────┘    └──────────┘    └──────────┘               │
│        ▲                               │                      │
│        │                               ▼                      │
│   ┌──────────┐                   ┌──────────┐                │
│   │RE-EDITAR │←──────────────────│ APRENDER │                │
│   └──────────┘                   └──────────┘                │
│                                                                │
│   Tiempos:                                                     │
│   EDITAR:    1-4 horas por video                              │
│   PUBLICAR:  inmediato post-QA                                │
│   MEDIR:     esperar 48-72 horas post-publicación             │
│   APRENDER:  15-30 minutos de análisis                        │
│   RE-EDITAR: solo si los datos lo justifican                  │
└────────────────────────────────────────────────────────────────┘
```

## 37.7 Árbol de decisión: qué cambiar según la métrica baja

```
¿QUÉ MÉTRICA ESTÁ BAJA?
    │
    ├── IF retención a los 3 segundos < 70%
    │       PROBLEMA: hook débil
    │       CAMBIAR: primeros 3 segundos (visual, texto, sonido)
    │       NO TOCAR: el resto del video
    │
    ├── ELSE IF retención media < 50% (en reels de <30s)
    │       PROBLEMA: pacing lento o contenido poco atractivo
    │       CAMBIAR: densidad de cortes, agregar pattern interrupts, acortar duración
    │
    ├── ELSE IF completion rate < 30%
    │       PROBLEMA: el video es demasiado largo O pierde interés a mitad
    │       CAMBIAR: acortar duración, eliminar la parte más débil, agregar cliffhanger
    │
    ├── ELSE IF shares bajos (vs benchmark)
    │       PROBLEMA: el contenido no genera "tengo que compartir esto"
    │       CAMBIAR: agregar un dato sorprendente, una reacción fuerte, un momento quotable
    │       NOTA: esto es más contenido que edición, pero la edición puede amplificar
    │
    ├── ELSE IF saves bajos
    │       PROBLEMA: el contenido no tiene valor de referencia
    │       CAMBIAR: agregar información útil visible en pantalla (listas, datos, tips)
    │
    ├── ELSE IF CTR bajo (YouTube)
    │       PROBLEMA: miniatura o título no atractivos
    │       CAMBIAR: miniatura + asegurar que los primeros 30s coincidan con la nueva miniatura
    │
    └── ELSE IF follows por video bajos
            PROBLEMA: el video no comunica "hay más contenido así en este perfil"
            CAMBIAR: agregar CTA de follow + mostrar coherencia de marca
```

## 37.8 Checklist: review de analytics post-publicación

- [ ] Esperar 48-72 horas antes de analizar (datos incompletos antes)
- [ ] Anotar retención a los 3 segundos
- [ ] Anotar retención media (% del video visto en promedio)
- [ ] Anotar completion rate
- [ ] Comparar shares + saves con el promedio de los últimos 10 videos
- [ ] Comparar con el benchmark del nicho (→ sección 37.9)
- [ ] Identificar el timestamp exacto de cada caída de retención
- [ ] Documentar la fórmula si el video performó bien
- [ ] Comparar performance @allimport.cba vs @_agus_moreno_ (si aplica)
- [ ] Decidir si re-editar, mantener, o extraer clips
- [ ] Actualizar la base de datos de estilos exitosos

## 37.9 Benchmarks de performance para el nicho de All Import

| Métrica | Malo | Promedio | Bueno | Excelente |
|---------|------|---------|-------|-----------|
| Retención 3s (Reels) | <60% | 60-70% | 70-80% | >80% |
| Retención media (Reels 15-30s) | <30% | 30-50% | 50-70% | >70% |
| Completion rate (TikTok) | <20% | 20-40% | 40-70% | >70% |
| Shares por 1000 views | <5 | 5-15 | 15-30 | >30 |
| Saves por 1000 views | <10 | 10-25 | 25-50 | >50 |
| Follows por video (Reels) | 0-2 | 3-10 | 10-30 | >30 |
| Watch time promedio (YouTube 10min) | <2min | 2-4min | 4-6min | >6min |
| CTR (YouTube) | <2% | 2-5% | 5-8% | >8% |

---

# Capítulo 38: Optimización por plataforma — diferencias que importan

## 38.1 Comparación profunda: Instagram Reels vs TikTok vs YouTube Shorts

### 38.1.1 Tabla comparativa exhaustiva

| Dimensión | Instagram Reels | TikTok | YouTube Shorts |
|-----------|----------------|--------|---------------|
| **Duración máx.** | 90 segundos | 10 minutos (ideal <60s) | 60 segundos |
| **Duración óptima** | 15-30 segundos | 15-30 segundos | 15-45 segundos |
| **Resolución** | 1080×1920 | 1080×1920 | 1080×1920 |
| **FPS** | 30 | 30 | 30 o 60 |
| **Algoritmo base** | Engagement + relación | Contenido puro (no importa quién eres) | Watch time + CTR |
| **Distribución** | Sigue + Explore + Reels tab | For You Page (FYP) | Shorts shelf + suscriptores |
| **Audio** | Biblioteca IG + propio | Biblioteca TikTok + propio + trending | Biblioteca YT + propio |
| **Trending audio** | Importante (boost de distribución) | MUY importante (boost significativo) | Menos relevante |
| **Subtítulos** | Muy recomendados | Opcionales (TikTok tiene herramienta nativa) | Recomendados |
| **Hashtags** | 5-10 relevantes | 3-5 clave + 1-2 trending | Pocos, en descripción |
| **Safe zone superior** | ~250px (nombre de usuario, ícono) | ~150px | ~200px |
| **Safe zone inferior** | ~400px (caption, botones) | ~350px (caption, botones, música) | ~300px (botones, título) |
| **Engagement esperado** | 3-8% (likes+comments/reach) | 5-15% (más generoso) | Variable |
| **Monetización directa** | Bonus programs (limitado) | Creator Fund + gifts | RPM (muy bajo) |
| **Link en bio** | Sí (1 link o linktree) | Sí (requiere 1000 seguidores) | Sí (link en canal) |
| **Republish de long-form** | No recomendado sin re-editar | No recomendado | Puede hacer con clip de long-form |
| **Cross-posting desde otra plataforma** | NO llevar watermark de TikTok | NO llevar watermark de IG | NO llevar watermark de ninguna |

### 38.1.2 Diferencias algorítmicas y su impacto en edición

```
INSTAGRAM REELS — ALGORITMO
    │
    ├── Prioriza: engagement de tus seguidores primero
    │   Implicancia: el hook debe funcionar para tu audiencia existente
    │
    ├── Penaliza: watermarks de TikTok, baja resolución, contenido reciclado
    │   Implicancia: NUNCA resubir un video con logo de TikTok
    │
    └── Favorece: audio trending de IG, contenido original, interacción en comentarios
        Implicancia: usar audios de la biblioteca de IG cuando sea posible

TIKTOK — ALGORITMO
    │
    ├── Prioriza: contenido sobre creador (le puede ir bien a CUALQUIERA)
    │   Implicancia: la calidad de la edición importa más que la cuenta
    │
    ├── El FYP testea tu video con pequeños grupos
    │   Implicancia: los primeros 200-500 viewers son críticos
    │               Si la retención es alta → distribución masiva
    │
    └── Favorece: trending sounds, duets, stitches, completion rate alto
        Implicancia: usar trending sounds cuando encajen con el contenido

YOUTUBE SHORTS — ALGORITMO
    │
    ├── Prioriza: watch time y CTR (igual que YouTube largo)
    │   Implicancia: los primeros 3 segundos y el primer frame importan mucho
    │
    ├── Conecta con tu canal largo (si tenés)
    │   Implicancia: un Short puede traer suscriptores a tu contenido largo
    │
    └── Favorece: contenido que funcione en loop (replay)
        Implicancia: el final debe conectar suavemente con el inicio
```

## 38.2 Duración óptima por plataforma — análisis detallado

| Plataforma | Tipo de contenido | Duración mínima | Duración ideal | Duración máxima recomendada |
|------------|------------------|-----------------|----------------|---------------------------|
| IG Reels | Product showcase | 7s | 15-20s | 30s |
| IG Reels | Tutorial rápido | 15s | 20-30s | 45s |
| IG Reels | Entretenimiento | 7s | 10-20s | 30s |
| IG Reels | Storytelling | 15s | 30-60s | 90s |
| TikTok | Product showcase | 7s | 15-25s | 30s |
| TikTok | Tutorial | 15s | 30-60s | 120s |
| TikTok | Entretenimiento | 5s | 10-20s | 30s |
| TikTok | Storytelling | 15s | 30-60s | 180s |
| YT Shorts | Cualquier contenido | 10s | 20-45s | 58s (dejar margen) |
| IG Stories | Producto + CTA | 5s | 10-15s | 15s por slide |
| IG Feed video | Producto showcase | 15s | 30-60s | 90s |

## 38.3 Subtítulos por plataforma

### 38.3.1 Diferencias en estilo de subtítulos

| Aspecto | Instagram Reels | TikTok | YouTube Shorts |
|---------|----------------|--------|---------------|
| ¿Obligatorios? | MUY recomendados | Recomendados | Recomendados |
| Estilo preferido | Kinetic, animados, con color | TikTok auto-captions o kinetic | Estáticos o levemente animados |
| Tamaño de fuente | Grande (40-50px equiv.) | Medio-grande | Medio |
| Posición Y | Centro-inferior (safe zone) | Centro o centro-inferior | Centro |
| Color primario | WHITE #f8fafa o CYAN #00d4d4 | Blanco con sombra | Blanco con borde |
| Highlight de keyword | SÍ (CYAN para positivo, RED para negativo) | SÍ (color del trending style) | Opcional |
| Outline/sombra | Sombra oscura obligatoria | Outline negro | Outline negro |
| Máximo de palabras por placa | 3-5 | 3-5 | 4-6 |

## 38.4 Audio y música por plataforma

### 38.4.1 Diferencias en uso de audio

```
DECISIÓN DE AUDIO POR PLATAFORMA
    │
    ├── INSTAGRAM REELS
    │   │
    │   ├── IF hay un audio trending que encaja con el contenido
    │   │       THEN → USAR trending audio (boost de distribución significativo)
    │   │       Volume: -12 a -8 dB bajo la voz, o como soundtrack principal
    │   │
    │   ├── ELSE IF es contenido de producto/informativo
    │   │       THEN → música de fondo suave, copyright-free
    │   │
    │   └── ELSE → audio original está bien
    │
    ├── TIKTOK
    │   │
    │   ├── IF hay un trending sound que encaja
    │   │       THEN → USAR obligatoriamente (TikTok rewards trending sounds)
    │   │       Puede ser el audio principal o de fondo
    │   │
    │   └── ELSE → audio original con voiceover directo
    │
    └── YOUTUBE SHORTS
        │
        ├── Trending sounds son MENOS importantes que en TikTok/IG
        ├── Priorizar audio original de calidad
        └── Cuidado con copyright: YouTube tiene Content ID más agresivo
```

## 38.5 Cross-posting — cómo adaptar un video para múltiples plataformas

### 38.5.1 Workflow de cross-posting

```
VIDEO ORIGINAL (editado para la plataforma principal)
    │
    ├── Paso 1: Identificar plataforma principal
    │   (la que tiene mayor audiencia o es el objetivo principal)
    │
    ├── Paso 2: Exportar versión principal
    │
    ├── Paso 3: Adaptar para plataformas secundarias
    │   │
    │   ├── AJUSTES OBLIGATORIOS:
    │   │   ├── Remover watermarks de la plataforma original
    │   │   ├── Ajustar safe zones (cada plataforma tiene distintas)
    │   │   ├── Ajustar duración si excede el límite
    │   │   └── Remover menciones a otra plataforma ("link en bio" no aplica en TikTok si no tenés link)
    │   │
    │   ├── AJUSTES RECOMENDADOS:
    │   │   ├── Cambiar audio trending (cada plataforma tiene sus propios trends)
    │   │   ├── Ajustar estilo de subtítulos al nativo de la plataforma
    │   │   └── Ajustar CTA a la plataforma
    │   │
    │   └── AJUSTES OPCIONALES:
    │       ├── Re-exportar a la resolución/bitrate óptima de la plataforma
    │       └── Agregar/remover branding según cuenta
    │
    └── Paso 4: Exportar versiones adaptadas con nomenclatura clara
        video_auriculares_reels.mp4
        video_auriculares_tiktok.mp4
        video_auriculares_shorts.mp4
```

### 38.5.2 Comando ffmpeg para remover watermark de TikTok

```bash
# ═══════════════════════════════════════════════
# Recortar para eliminar watermark de TikTok (esquina superior derecha)
# NOTA: Esto puede perder calidad. Siempre preferir tener el archivo original
# ═══════════════════════════════════════════════
ffmpeg -i video_tiktok.mp4 \
  -vf "delogo=x=880:y=20:w=180:h=80:show=0" \
  -c:v libx264 -crf 18 \
  -c:a copy \
  video_sin_watermark.mp4

# MEJOR ALTERNATIVA: guardar siempre el video original sin watermark
# y exportar por separado para cada plataforma.
```

## 38.6 Árbol de decisión: ajustes de edición por plataforma

```
¿PARA QUÉ PLATAFORMA ESTOY EDITANDO?
    │
    ├── IF INSTAGRAM REELS
    │   ├── Densidad de cortes: ALTA (15-25/min)
    │   ├── Subtítulos: kinetic, grandes, centrados
    │   ├── Música: trending audio si hay uno que encaje
    │   ├── CTA: "Link en bio" o "Escribinos por WhatsApp"
    │   ├── Branding: logo centrado si @allimport.cba
    │   ├── Safe zone: top 250px + bottom 400px libres de contenido clave
    │   └── Duración ideal: 15-30 segundos
    │
    ├── ELSE IF TIKTOK
    │   ├── Densidad de cortes: MUY ALTA (20-30/min)
    │   ├── Subtítulos: estilo TikTok nativo o kinetic
    │   ├── Música: trending sound obligatorio si existe uno relevante
    │   ├── CTA: "Link en bio" (si tenés 1000+) o "Buscanos como @allimport.cba"
    │   ├── Branding: mínimo, estilo orgánico/UGC
    │   ├── Safe zone: top 150px + bottom 350px
    │   └── Duración ideal: 15-30 segundos
    │
    ├── ELSE IF YOUTUBE SHORTS
    │   ├── Densidad de cortes: ALTA (15-20/min)
    │   ├── Subtítulos: estáticos o levemente animados
    │   ├── Música: original o copyright-free
    │   ├── CTA: "Suscribite" + enlace al video largo si existe
    │   ├── Branding: puede ser más prominente
    │   ├── Safe zone: top 200px + bottom 300px
    │   └── Duración ideal: 20-45 segundos
    │
    ├── ELSE IF INSTAGRAM STORIES
    │   ├── Densidad de cortes: MEDIA (10-15/min)
    │   ├── Subtítulos: grandes, legibles, centrados
    │   ├── Música: opcional, sticker de música nativo
    │   ├── CTA: sticker de "Link" o "Escribinos"
    │   ├── Branding: según cuenta
    │   ├── Safe zone: top 200px (nombre de cuenta) + bottom 250px (responder)
    │   └── Duración: máximo 15 segundos por slide
    │
    └── ELSE IF YOUTUBE LARGO
        ├── Densidad de cortes: MODERADA (5-12/min)
        ├── Subtítulos: opcionales, más chicos
        ├── Música: background, no compite con voz
        ├── CTA: end screen + cards
        ├── Branding: intro + outro + watermark
        ├── Safe zone: flexible (no hay UI overlay constante)
        └── Duración: 8-20 minutos (depende del contenido)
```

## 38.7 Tabla resumen: features por plataforma

| Feature | IG Reels | TikTok | YT Shorts | IG Stories | YT Largo |
|---------|---------|--------|-----------|------------|----------|
| Subtítulos automáticos | No | Sí | Sí | No | Sí |
| Trending audio | Sí | Sí | Parcial | Sí (sticker) | No aplica |
| Duets/stitches | No nativo | Sí | No | No | No |
| Chapters | No | No | No | No | Sí |
| End screens | No | No | No | No | Sí |
| Cards | No | No | No | No | Sí |
| Link directo | Link en bio | Link en bio (1000+) | Link en canal | Link sticker | Descripción |
| Monetización | Bonus | Creator Fund | RPM bajo | No | AdSense |
| Analytics detallados | Sí | Sí | Sí | Limitados | Muy detallados |
| Scheduling nativo | Sí | Sí | Sí | No | Sí |
| Safe zone top | 250px | 150px | 200px | 200px | Flexible |
| Safe zone bottom | 400px | 350px | 300px | 250px | Flexible |

## 38.8 Checklist: adaptación por plataforma

- [ ] Resolución y aspect ratio correctos para la plataforma destino
- [ ] Duración dentro del rango óptimo de la plataforma
- [ ] Safe zones verificadas (contenido clave no tapado)
- [ ] Watermarks de otras plataformas removidos
- [ ] Audio trending de la plataforma correcta (no mezclar)
- [ ] Estilo de subtítulos adaptado al nativo de la plataforma
- [ ] CTA adaptado a las opciones de la plataforma
- [ ] Branding ajustado a la cuenta (@allimport.cba vs @_agus_moreno_)
- [ ] Hashtags y caption adaptados a la plataforma
- [ ] Nomenclatura de archivo incluye la plataforma destino
- [ ] Verificado en celular real para la plataforma destino

---

# Capítulo 39: Consistencia de marca en video

## 39.1 Identidad de marca en video — los 7 pilares

La consistencia de marca no es solo "usar los mismos colores". Es un sistema completo que hace que cualquier video de All Import sea reconocible en los primeros 2 segundos, incluso sin ver el nombre de la cuenta.

| Pilar | Qué define | Elemento en video |
|-------|-----------|------------------|
| 1. Color | Paleta visual de la marca | Fondo, textos, overlays, color grading |
| 2. Tipografía | Voz visual escrita | Subtítulos, títulos, datos en pantalla |
| 3. Tono | Personalidad de la comunicación | Estilo de narración, voz, vocabulario |
| 4. Pacing | Ritmo de la marca | Velocidad de cortes, energía |
| 5. Sonido | Identidad sonora | SFX signature, estilo de música |
| 6. Composición | Cómo se organizan los elementos visuales | Layout, posición de logo, encuadre |
| 7. Motifs | Elementos recurrentes reconocibles | Transiciones signature, intro/outro |

## 39.2 Guidelines de marca All Import aplicadas a video

### 39.2.1 Colores en video — uso correcto

| Color | Código | Uso en video | Ejemplo |
|-------|--------|-------------|---------|
| NAVY | `#0a0f1a` | Fondos, overlays, barras inferiores | Fondo de lower third, fondo de end screen |
| CYAN | `#00d4d4` | CTAs, highlights, elementos interactivos | Botón "Pedilo por WhatsApp", keyword highlight |
| WHITE | `#f8fafa` | Texto principal, subtítulos | Subtítulos kinetic, texto informativo |
| RED | `#e22a2a` | Precios, ofertas, urgencia, alertas | "$12.999", "ÚLTIMO DÍA", "OFERTA" |
| CELESTE | `#78b4eb` | Info secundaria, subtítulos alternativos | Datos técnicos, specs, info contextual |
| GOLD | `#c9a227` | Premium, exclusividad, ofertas especiales | "EDICIÓN LIMITADA", "VIP", "PREMIUM" |

### 39.2.2 Combinaciones de color prohibidas

| Combinación | Razón | Alternativa correcta |
|-------------|-------|---------------------|
| RED sobre CYAN | Ilegible, vibra | WHITE sobre CYAN o RED sobre NAVY |
| WHITE sobre WHITE | Invisible | WHITE con outline NAVY |
| CELESTE sobre CYAN | Muy similar, pierde contraste | WHITE sobre CYAN |
| GOLD sobre WHITE | Bajo contraste | GOLD sobre NAVY |
| NAVY sobre NAVY | Invisible | WHITE sobre NAVY |

### 39.2.3 Color grading para marca

```
COLOR GRADING DE ALL IMPORT
    │
    ├── Sombras: ligero tinte NAVY/azul oscuro
    │   Parámetro: shadows → blue +5, cyan +3
    │
    ├── Medios: neutros, con leve calidez
    │   Parámetro: midtones → temperatura +2
    │
    ├── Highlights: limpios, con leve tinte cyan
    │   Parámetro: highlights → cyan +3, brightness +5
    │
    ├── Saturación: ligeramente elevada (+5-10%)
    │   Para que los productos se vean vibrantes
    │
    └── Contraste: moderado-alto (+10-15%)
        Para separar producto del fondo
```

```bash
# ═══════════════════════════════════════════════
# Color grading de marca All Import con ffmpeg
# ═══════════════════════════════════════════════
ffmpeg -i input.mp4 \
  -vf "eq=contrast=1.12:brightness=0.03:saturation=1.08, \
       colorbalance=rs=0.0:gs=0.0:bs=0.05:rm=0.02:gm=0.0:bm=0.0:rh=0.0:gh=0.03:bh=0.03" \
  -c:v libx264 -crf 18 \
  -c:a copy \
  output_branded.mp4
```

## 39.3 Sistema de templates para videos recurrentes

### 39.3.1 Catálogo de templates

| Template | Uso | Duración | Plataforma | Estructura fija |
|----------|-----|----------|-----------|----------------|
| Product Showcase | Mostrar un producto nuevo | 15-30s | Reels, TikTok | Hook → close-up → features → precio → CTA |
| Comparación | X vs Y | 20-30s | Reels, TikTok | Hook → A → B → comparación → ganador |
| Unboxing | Abrir paquete | 30-60s | Reels, YouTube | Hook → apertura → revelación → reacción → CTA |
| Tutorial | Cómo usar un producto | 30-60s | Reels, YouTube | Hook → problema → demo → resultado |
| Oferta/Promo | Descuento temporal | 10-15s | Stories, Reels | Producto → precio tachado → nuevo precio → CTA urgente |
| Testimonio | Cliente satisfecho | 15-30s | Reels, Stories | Quote del cliente → producto → social proof → CTA |
| Behind Scenes | Proceso de importación | 30-60s | Reels, TikTok | Hook → montaje de proceso → resultado |

### 39.3.2 Elementos fijos por template (no varían)

```
ELEMENTOS QUE NO CAMBIAN EN NINGÚN TEMPLATE:
    │
    ├── Tipografía: Montserrat Alternates siempre
    ├── Color de fondo de overlays: NAVY #0a0f1a (80-90% opacidad)
    ├── Color de CTA: CYAN #00d4d4
    ├── Color de precios: RED #e22a2a
    ├── Color de texto principal: WHITE #f8fafa
    ├── Posición del logo (@allimport.cba): centrado, parte superior
    ├── SFX de transición: whoosh consistente (mismo archivo)
    ├── SFX de aparición de precio: cash register o impact
    └── Estilo de animación de texto: fade + leve scale (100% → 103%)
```

## 39.4 Watermark — reglas de colocación

### 39.4.1 Para @allimport.cba

```
┌─────────────────────────────────────────┐
│  [LOGO ALL IMPORT]                      │
│  centrado horizontal                    │
│  a 80px del borde superior              │
│  tamaño: 120px de ancho                 │
│  opacidad: 70-80%                       │
│  con sombra drop para legibilidad       │
│                                         │
│              VIDEO                      │
│                                         │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### 39.4.2 Para @_agus_moreno_

```
SIN WATERMARK DE MARCA.
    │
    ├── NO poner logo de All Import
    ├── NO poner ningún logo
    ├── Si se necesita identificación: texto simple del handle
    │   "@_agus_moreno_" en WHITE, tamaño chico, alineado izquierda
    └── Solo si es estrictamente necesario (la mayoría de los videos no lo necesitan)
```

## 39.5 Intro y outro de marca

### 39.5.1 Intro para @allimport.cba

```
INTRO (2-3 segundos máximo):
    │
    ├── Para Reels/TikTok: NO usar intro animada (mata la retención)
    │   En su lugar: logo watermark desde el segundo 0
    │
    └── Para YouTube largo: intro breve permitida
        Duración: 2-3 segundos máximo
        Contenido: logo animado (fade in + scale) sobre fondo NAVY
        Audio: un SFX signature corto (whoosh + impact suave)
        NUNCA más de 3 segundos (pierde retención)
```

### 39.5.2 Outro para @allimport.cba

```
OUTRO (5-10 segundos, solo YouTube largo):
    │
    ├── Fondo: NAVY #0a0f1a con gradiente sutil
    ├── Logo: centrado, animación de fade in
    ├── Texto: "Seguí viendo" en CYAN #00d4d4 (Montserrat Alternates)
    ├── Elementos YT: video sugerido + botón suscribirse
    ├── Info de contacto: @allimport.cba · WhatsApp en bio
    └── Audio: música de fondo fade out durante los últimos 5 segundos
```

## 39.6 Música que encaja con la marca

### 39.6.1 Perfil musical de All Import

| Dimensión | Descripción | Ejemplos de género |
|-----------|------------|-------------------|
| Energía | Media-alta. Dinámica, no relajada ni agresiva | Electrónica suave, lo-fi uptempo |
| Mood | Urbano, moderno, juvenil, accesible | Trap instrumental suave, afrobeat |
| Ritmo | Marcado pero no dominante. Debe permitir voiceover | 90-120 BPM |
| NO usar | Música triste, clásica, country, heavy metal | - |
| Trending | Si es trending en IG/TikTok y encaja con el mood → usar | Según el momento |

### 39.6.2 Árbol de decisión: selección de música

```
¿QUÉ MÚSICA USAR?
    │
    ├── IF hay un trending audio que encaja con el contenido
    │       THEN → usar trending audio (prioridad para distribución)
    │
    ├── ELSE IF es un video de producto serio (review, specs)
    │       THEN → lo-fi chill o electrónica suave (90-100 BPM)
    │
    ├── ELSE IF es contenido energético (unboxing, oferta, comparación)
    │       THEN → electrónica uptempo o trap instrumental (100-120 BPM)
    │
    ├── ELSE IF es behind the scenes / personal
    │       THEN → lo-fi chill o indie acústico (80-100 BPM)
    │
    └── ELSE IF es un ad / promo
        │
        ├── IF objetivo = urgencia (oferta limitada)
        │       THEN → electrónica con riser + BPM alto (110-130)
        │
        └── ELSE → música brand-consistent, energía media
```

## 39.7 Consistencia entre @allimport.cba y @_agus_moreno_

### 39.7.1 Tabla de diferencias entre cuentas

| Aspecto | @allimport.cba | @_agus_moreno_ |
|---------|---------------|----------------|
| Logo | Sí, centrado | No |
| Paleta de color | Estricta (NAVY, CYAN, WHITE, RED, CELESTE, GOLD) | Flexible, colores naturales |
| Tipografía | Montserrat Alternates siempre | Montserrat Alternates preferida, pero flexible |
| Tono | Profesional, informativo, de marca | Personal, cercano, casual |
| CTA | "Pedilo por WhatsApp" + @allimport.cba | "Link en bio" o "Escribime" |
| Watermark | Logo All Import, centrado superior | Ninguno o handle en texto chico |
| Alineación de texto | Centrado | Izquierda preferida |
| Color grading | Brand LUT (tint cyan/navy) | Natural o con filtro de IG |
| SFX | Brand SFX consistentes | SFX más variados, trending |
| Intro/outro | Sí (YouTube largo) | No |
| Templates | Uso estricto | Más flexible, menos templated |

### 39.7.2 Qué SÍ comparten ambas cuentas

```
ELEMENTOS COMPARTIDOS (AMBAS CUENTAS):
    │
    ├── Calidad de audio: -14 a -16 LUFS, sin clipping
    ├── Calidad de video: mínimo 1080p, H.264, yuv420p
    ├── Tipografía preferida: Montserrat Alternates
    ├── Formato vertical: 1080×1920 para short-form
    ├── Subtítulos: siempre cuando hay voiceover
    ├── QA: mismo checklist maestro (→ Cap. 36)
    └── Pacing: adaptado a la plataforma, no a la cuenta
```

## 39.8 Árbol de decisión: selección de elementos de marca por tipo de contenido

```
¿QUÉ ELEMENTOS DE MARCA INCLUIR?
    │
    ├── IF la cuenta es @allimport.cba
    │   │
    │   ├── IF es Reel/TikTok/Short
    │   │       Logo: watermark superior, 70% opacidad
    │   │       Colores: paleta completa de marca
    │   │       CTA: CYAN con Montserrat Alternates
    │   │       Intro: NO (mata retención)
    │   │       Outro: NO (excepto YouTube Shorts)
    │   │
    │   ├── ELSE IF es YouTube largo
    │   │       Logo: watermark + intro + outro
    │   │       Colores: paleta completa
    │   │       Lower thirds: diseño de marca
    │   │       End screen: con template de marca
    │   │
    │   └── ELSE IF es Story
    │           Logo: watermark superior chico
    │           Colores: paleta de marca
    │           CTA: sticker nativo de IG + texto CYAN
    │
    └── ELSE IF la cuenta es @_agus_moreno_
        │
        ├── IF el contenido menciona All Import o un producto
        │       Logo: NO, pero puede mencionar @allimport.cba en texto
        │       Colores: naturales, sin forzar la paleta corporativa
        │       CTA: personal, informal
        │
        └── ELSE (contenido personal, no relacionado con AI)
                Logo: NO
                Colores: libres
                CTA: personal
                Sin ningún elemento de marca All Import
```

## 39.9 Brand audit checklist para video

- [ ] Tipografía correcta (Montserrat Alternates en todos los textos)
- [ ] Colores de marca usados correctamente (ver tabla 39.2.1)
- [ ] No hay combinaciones de color prohibidas (ver tabla 39.2.2)
- [ ] Logo presente y bien colocado (solo @allimport.cba)
- [ ] Watermark en la posición correcta con la opacidad correcta
- [ ] CTA con el color y texto correctos para la cuenta
- [ ] Tono coherente con la cuenta (@allimport.cba: profesional / @_agus_moreno_: personal)
- [ ] Color grading coherente con la marca (tint cyan/navy para @allimport.cba)
- [ ] Música coherente con la personalidad de la marca
- [ ] SFX consistentes con videos anteriores de la misma cuenta
- [ ] Template correcto para el tipo de video (si aplica)
- [ ] Intro/outro presente solo donde corresponde (YouTube largo de @allimport.cba)
- [ ] Elementos de texto alineados según cuenta (centro vs izquierda)
- [ ] No hay elementos de marca de @allimport.cba en videos de @_agus_moreno_
- [ ] Estilo visual coherente con los últimos 10 videos de la misma cuenta

---

# Capítulo 40: Colaboración y handoff

## 40.1 Brief de edición — templates

### 40.1.1 Template de brief completo

```
═══════════════════════════════════════════════
BRIEF DE EDICIÓN DE VIDEO
═══════════════════════════════════════════════

INFORMACIÓN GENERAL:
  Proyecto: [nombre o código del video]
  Cuenta destino: [@allimport.cba / @_agus_moreno_]
  Plataforma(s): [IG Reels / TikTok / YouTube / Stories]
  Fecha límite: [YYYY-MM-DD HH:MM]
  Prioridad: [ALTA / MEDIA / BAJA]

CONTENIDO:
  Tipo de video: [showcase / review / tutorial / oferta / comparación / vlog]
  Producto(s): [nombre del producto]
  Mensaje principal: [qué debe entender el espectador]
  CTA deseado: [qué queremos que haga el espectador]
  Duración objetivo: [X-Y segundos]

MATERIAL DISPONIBLE:
  Clips de video: [cantidad, ubicación en carpeta]
  Audio/voiceover: [sí/no, ubicación]
  Fotos de producto: [cantidad, ubicación]
  Texto/guion: [adjunto / link / abajo]
  Música sugerida: [nombre / link / "a criterio del editor"]

REFERENCIAS:
  Video de referencia 1: [URL] — "me gusta el pacing"
  Video de referencia 2: [URL] — "me gusta el estilo de subtítulos"

NOTAS ESPECIALES:
  [Cualquier instrucción específica]
═══════════════════════════════════════════════
```

### 40.1.2 Template de brief rápido (para iteraciones)

```
═══════════════════════════════════════════════
BRIEF RÁPIDO
═══════════════════════════════════════════════
Qué: [descripción en 1 línea]
Para: [@cuenta] en [plataforma]
Material: [carpeta/path]
Referencia: [URL o "como el video X"]
Deadline: [fecha/hora]
Notas: [lo que sea necesario]
═══════════════════════════════════════════════
```

## 40.2 Comunicación de decisiones de edición

### 40.2.1 Formato de nota de decisión

Cuando el editor toma una decisión que podría ser cuestionada, debe documentarla:

```
═══════════════════════════════════════════════
NOTA DE DECISIÓN DE EDICIÓN
═══════════════════════════════════════════════
Video: [nombre]
Timestamp: [HH:MM:SS]
Decisión: [qué se hizo]
Razón: [por qué]
Alternativa descartada: [qué se podría haber hecho y por qué no]
═══════════════════════════════════════════════

Ejemplo:
Video: review_tws_v2.mp4
Timestamp: 00:00:12
Decisión: corté 8 segundos de explicación técnica de los drivers
Razón: la retención del v1 caía fuerte en esa sección; el dato técnico
       no es relevante para la audiencia de All Import (compran por
       relación calidad/precio, no por specs técnicas)
Alternativa descartada: dejar la explicación con B-roll encima — probé
       y seguía siendo lento. Mejor cortarlo y mencionar specs en la
       descripción del post.
═══════════════════════════════════════════════
```

## 40.3 Control de versiones para proyectos de video

### 40.3.1 Nomenclatura de versiones

```
SISTEMA DE VERSIONADO
    │
    ├── Draft (borrador): video_nombre_d1.mp4, video_nombre_d2.mp4
    │   Drafts son versiones de trabajo, no publicables
    │
    ├── Version (listo para review): video_nombre_v1.mp4, video_nombre_v2.mp4
    │   Versions son candidatas a publicación, pasan por QA
    │
    ├── Final: video_nombre_FINAL.mp4
    │   SOLO UNA versión final. Si hay cambios post-final:
    │   video_nombre_FINAL_fix1.mp4
    │
    └── Publicado: video_nombre_PUB_[plataforma].mp4
        El archivo exacto que se subió a la plataforma
```

### 40.3.2 Tabla de estados de un video

| Estado | Código | Significado | Quién lo mueve al siguiente |
|--------|--------|------------|---------------------------|
| Briefed | `BRIEF` | Brief recibido, material disponible | Creador/Director |
| In Progress | `WIP` | El editor está trabajando | Editor |
| Draft | `DRAFT` | Borrador listo para feedback | Editor → Revisor |
| Feedback | `FB` | Feedback dado, esperando revisión | Revisor → Editor |
| Review | `REVIEW` | Re-editado, listo para segunda revisión | Editor → Revisor |
| QA | `QA` | Pasando por checklist de calidad | QA (o editor) |
| Approved | `APPROVED` | QA pasado, listo para publicar | QA → Publisher |
| Published | `PUB` | Publicado en la plataforma | Publisher |
| Archived | `ARCH` | Publicado + analytics revisados + archivado | Publisher |

## 40.4 Convención de nombres de archivo

### 40.4.1 Formato estándar

```
[FECHA]_[CUENTA]_[PLATAFORMA]_[TIPO]_[PRODUCTO]_[VERSION].[EXT]

Ejemplos:
20260803_allimport_reels_showcase_tws_v1.mp4
20260803_agusmoreno_tiktok_review_camiseta_d2.mp4
20260803_allimport_youtube_comparacion_parlantes_FINAL.mp4
20260803_allimport_stories_oferta_powerbank_PUB.mp4
```

### 40.4.2 Reglas de nomenclatura

| Regla | Detalle |
|-------|---------|
| Sin espacios | Usar guion bajo `_` |
| Sin caracteres especiales | No usar ñ, á, é, í, ó, ú en nombres de archivo |
| Todo en minúscula | Excepto FINAL y PUB |
| Fecha primero | YYYYMMDD para ordenar cronológicamente |
| Cuenta abreviada | `allimport` o `agusmoreno` |
| Plataforma | `reels`, `tiktok`, `shorts`, `youtube`, `stories` |
| Tipo | `showcase`, `review`, `tutorial`, `oferta`, `comparacion`, `unboxing`, `vlog` |
| Producto | nombre corto del producto |

## 40.5 Estructura de carpetas de proyecto

```
allimport-video/
├── 2026-08/
│   ├── 2026-08-03_tws-review/
│   │   ├── raw/                    ← material bruto (no editar)
│   │   │   ├── clip_001.mp4
│   │   │   ├── clip_002.mp4
│   │   │   └── audio_voiceover.wav
│   │   ├── assets/                 ← logos, SFX, música, fonts
│   │   │   ├── logo_allimport.png
│   │   │   ├── sfx_whoosh.wav
│   │   │   └── music_lofi.mp3
│   │   ├── exports/                ← versiones exportadas
│   │   │   ├── 20260803_allimport_reels_review_tws_d1.mp4
│   │   │   ├── 20260803_allimport_reels_review_tws_v1.mp4
│   │   │   └── 20260803_allimport_reels_review_tws_FINAL.mp4
│   │   ├── subtitles/             ← archivos .srt si aplica
│   │   │   └── review_tws.srt
│   │   ├── thumbnails/            ← miniaturas (YouTube)
│   │   │   └── thumb_tws_v1.png
│   │   ├── brief.md               ← brief de edición
│   │   └── notes.md               ← notas de decisiones de edición
│   │
│   └── 2026-08-05_oferta-parlante/
│       ├── raw/
│       ├── assets/
│       ├── exports/
│       └── brief.md
│
├── templates/                      ← templates reutilizables
│   ├── overlay_cta_cyan.png
│   ├── overlay_precio_red.png
│   ├── intro_allimport_3s.mp4
│   ├── outro_allimport_10s.mp4
│   └── sfx_library/
│       ├── whoosh_01.wav
│       ├── impact_01.wav
│       ├── riser_01.wav
│       └── cash_register.wav
│
└── brand/                          ← elementos de marca
    ├── logo_allimport_full.png
    ├── logo_allimport_icon.png
    ├── fonts/
    │   └── MontserratAlternates-*.ttf
    └── color_palette.json
```

## 40.6 Handoff checklist: editor → publisher

### 40.6.1 Antes de entregar el video para publicación

- [ ] Video exportado con nomenclatura correcta
- [ ] Video pasó QA completo (→ Cap. 36)
- [ ] Versión FINAL marcada claramente en el nombre del archivo
- [ ] Caption/descripción escrita y entregada
- [ ] Hashtags definidos (listos para copiar/pegar)
- [ ] Thumbnail preparada si es YouTube (1280×720, <2MB)
- [ ] Brief de publicación completado (horario sugerido, cuenta, plataforma)
- [ ] Notas de decisiones de edición documentadas (si hay decisiones polémicas)
- [ ] Versiones adaptadas para cada plataforma entregadas
- [ ] Subtítulos .srt entregados si la plataforma lo requiere
- [ ] Material crudo archivado (por si se necesita re-editar)
- [ ] Verificado: el video se reproduce correctamente desde el archivo entregado
- [ ] Verificado: sin watermarks de otras plataformas
- [ ] Verificado: metadata limpia (sin paths locales)
- [ ] Comunicado al publisher: hora y fecha sugerida de publicación

## 40.7 Feedback y revisiones — workflow

### 40.7.1 Cómo dar feedback de edición (para el revisor)

```
FORMATO DE FEEDBACK
    │
    ├── Feedback específico con timestamp:
    │   "En 00:12 — el corte se siente abrupto. ¿Podemos agregar
    │    un B-roll de 0.5s para suavizar la transición?"
    │
    ├── NO hacer:
    │   "No me gusta el video" (sin detallar qué)
    │   "Hacelo más dinámico" (sin decir dónde ni cómo)
    │   "Cambiá todo" (sin especificar qué)
    │
    ├── SÍ hacer:
    │   Timestamp + problema + sugerencia (o dejar la solución al editor)
    │   "00:05-00:08 se siente lento. Sugiero más cortes o un zoom."
    │   "00:22 el subtítulo tiene un error: dice 'bluethoot', es 'bluetooth'"
    │
    └── Clasificar feedback por prioridad:
        DEBE cambiar: errores, defectos, incoherencias de marca
        DEBERÍA cambiar: mejoras de pacing, estéticas
        PODRÍA cambiar: gustos personales, nice-to-have
```

### 40.7.2 Límite de revisiones

```
POLÍTICA DE REVISIONES
    │
    ├── Round 1: feedback completo del revisor → editor corrige
    │
    ├── Round 2: segundo feedback (solo sobre los cambios) → editor corrige
    │
    ├── Round 3: IF hay cambios pendientes aún
    │   │
    │   ├── IF son defectos S1 o S2 → una ronda más
    │   │
    │   └── ELSE → publicar con los S3/S4 restantes.
    │           Documentar para mejorar en el próximo video.
    │
    └── MÁXIMO 3 rondas de revisión. Después de 3, publicar o escalar.
```

## 40.8 Asset management — gestión de recursos

### 40.8.1 Inventario de assets de marca

| Asset | Ubicación | Formato | Uso |
|-------|-----------|---------|-----|
| Logo All Import (completo) | `brand/logo_allimport_full.png` | PNG, fondo transparente, 2000×2000 | YouTube, overlays grandes |
| Logo All Import (ícono) | `brand/logo_allimport_icon.png` | PNG, fondo transparente, 512×512 | Watermarks, small spaces |
| Montserrat Alternates | `allimport/historias/fonts/` | TTF/OTF | Todos los textos |
| SFX Whoosh | `templates/sfx_library/whoosh_01.wav` | WAV, 48kHz | Transiciones |
| SFX Impact | `templates/sfx_library/impact_01.wav` | WAV, 48kHz | Revelaciones, precios |
| SFX Riser | `templates/sfx_library/riser_01.wav` | WAV, 48kHz | Build-ups |
| SFX Cash Register | `templates/sfx_library/cash_register.wav` | WAV, 48kHz | Precios, ventas |
| Overlay CTA | `templates/overlay_cta_cyan.png` | PNG, fondo transparente | CTAs |
| Intro 3s | `templates/intro_allimport_3s.mp4` | MP4, 1920×1080 | YouTube largo |
| Outro 10s | `templates/outro_allimport_10s.mp4` | MP4, 1920×1080 | YouTube largo |

### 40.8.2 Reglas de asset management

| Regla | Detalle |
|-------|---------|
| Nunca modificar el original | Copiar el asset al proyecto, modificar la copia |
| Formatos de imagen | PNG para transparencias, JPG para fotos sin transparencia |
| Formatos de audio | WAV para edición, AAC para export final |
| Resolución de logos | Mínimo 512×512 para watermarks, 2000×2000 para uso grande |
| Nombres descriptivos | `sfx_whoosh_01.wav`, no `sound1.wav` |
| Sin duplicados | Un solo lugar para cada asset. Si se usa en múltiples proyectos, referir al original |

## 40.9 Backup y archivado

### 40.9.1 Política de backup

```
BACKUP DE PROYECTOS DE VIDEO
    │
    ├── DURANTE la edición:
    │   ├── Guardar versiones incrementales (d1, d2, d3...)
    │   ├── Nunca sobreescribir una versión anterior
    │   └── Material crudo NUNCA se borra ni se modifica
    │
    ├── POST-PUBLICACIÓN (dentro de las 48hs):
    │   ├── Archivar: versión FINAL + material crudo + brief
    │   ├── Eliminar: drafts intermedios (d1, d2... ya no se necesitan)
    │   └── Mantener: v1, v2 (versiones candidatas) por 30 días
    │
    └── ARCHIVADO LARGO PLAZO (después de 30 días):
        ├── Mantener: FINAL + raw + brief + analytics
        ├── Eliminar: drafts, versiones intermedias
        └── Storage: carpeta de archivo mensual
```

### 40.9.2 Estructura de archivo

```
archivo/
├── 2026-08/
│   ├── 20260803_tws_review/
│   │   ├── FINAL/
│   │   │   ├── 20260803_allimport_reels_review_tws_FINAL.mp4
│   │   │   └── 20260803_allimport_tiktok_review_tws_FINAL.mp4
│   │   ├── raw/
│   │   │   └── [material bruto]
│   │   ├── brief.md
│   │   └── analytics.md   ← métricas post-publicación
│   └── ...
```

## 40.10 Árbol de decisión: re-editar vs publicar como está

```
EL VIDEO TIENE FEEDBACK PENDIENTE O RESULTADOS MIXTOS EN QA
    │
    ├── IF tiene defectos S1 (BLOCKER)
    │       THEN → RE-EDITAR obligatoriamente. No publicar.
    │
    ├── ELSE IF tiene defectos S2 (CRÍTICO)
    │   │
    │   ├── IF hay tiempo antes del deadline
    │   │       THEN → RE-EDITAR
    │   │
    │   └── ELSE IF no hay tiempo Y es contenido time-sensitive
    │       │
    │       ├── IF son ≤2 defectos S2
    │       │       THEN → PUBLICAR + planificar fix para resubir en 24h
    │       │
    │       └── ELSE → RE-EDITAR incluso si se pierde el timing.
    │               Publicar con múltiples S2 = daño de marca mayor que perder el timing.
    │
    ├── ELSE IF tiene solo S3 y S4
    │       THEN → PUBLICAR. No vale la pena demorar por defectos menores.
    │
    ├── ELSE IF el feedback es de gusto personal (no defecto)
    │   │
    │   ├── IF es la primera ronda de feedback
    │   │       THEN → RE-EDITAR con los cambios pedidos
    │   │
    │   ├── ELSE IF es ronda 2+
    │   │       THEN → PUBLICAR. Perfecto es enemigo de bueno.
    │   │
    │   └── ELSE IF los cambios pedidos contradicen las reglas de marca
    │           THEN → NO re-editar. Explicar por qué las reglas mandan.
    │
    └── ELSE (sin feedback, sin defectos)
            THEN → PUBLICAR ✓
```

## 40.11 Checklist: handoff de proyecto completo

- [ ] Todos los archivos en la estructura de carpetas correcta
- [ ] Nomenclatura de archivos siguiendo la convención
- [ ] Material crudo archivado e intacto
- [ ] Versión FINAL claramente identificada
- [ ] Versiones por plataforma exportadas y nombradas
- [ ] Brief original archivado en el proyecto
- [ ] Notas de decisiones de edición documentadas
- [ ] Feedback y revisiones documentados
- [ ] QA report archivado
- [ ] Caption y hashtags listos para publicar
- [ ] Thumbnail lista (si aplica)
- [ ] Subtítulos .srt listos (si aplica)
- [ ] Assets de marca verificados (logo, colores, fonts correctos)
- [ ] Sin archivos temporales ni basura en la carpeta del proyecto
- [ ] Tamaño total del proyecto documentado (para planificar almacenamiento)

---

> **Fin de PARTE 05** — Continúa en [MASTER_VIDEO_EDITOR_PARTE_06.md](MASTER_VIDEO_EDITOR_PARTE_06.md): Capítulos 41-48 (ffmpeg Avanzado, Remotion, Higgsfield, Calendario de Contenido, Troubleshooting, Automatización, Glosario, Índice General).
