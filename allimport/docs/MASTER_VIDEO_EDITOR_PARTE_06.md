# MASTER VIDEO EDITOR — PARTE 06 (FINAL)
## Manual profesional de edición de video para Claude Code
### Capítulos 41–48: ffmpeg Avanzado, Remotion, Higgsfield, Calendario de Contenido, Troubleshooting, Automatización, Glosario, Índice General

---

# TABLA DE CONTENIDO — PARTE 06

41. [Capítulo 41: ffmpeg avanzado — técnicas de nivel experto](#capítulo-41-ffmpeg-avanzado--técnicas-de-nivel-experto)
42. [Capítulo 42: Remotion — video programático con React](#capítulo-42-remotion--video-programático-con-react)
43. [Capítulo 43: Higgsfield — workflow completo de IA para video](#capítulo-43-higgsfield--workflow-completo-de-ia-para-video)
44. [Capítulo 44: Calendario de contenido y planificación de edición](#capítulo-44-calendario-de-contenido-y-planificación-de-edición)
45. [Capítulo 45: Troubleshooting — solución de problemas comunes](#capítulo-45-troubleshooting--solución-de-problemas-comunes)
46. [Capítulo 46: Automatización del flujo de edición](#capítulo-46-automatización-del-flujo-de-edición)
47. [Capítulo 47: Glosario técnico completo](#capítulo-47-glosario-técnico-completo)
48. [Capítulo 48: Índice general y cross-references](#capítulo-48-índice-general-y-cross-references)

---

# Capítulo 41: ffmpeg avanzado — técnicas de nivel experto

## 41.1 Grafos complejos de filter_complex con múltiples entradas/salidas

### 41.1.1 Anatomía de un grafo multi-entrada

Un `filter_complex` puede recibir N entradas (cada `-i` genera `[0:v]`, `[0:a]`, `[1:v]`, `[1:a]`, etc.) y producir M salidas que luego se mapean con `-map`.

```
ESTRUCTURA GENERAL:

  -i entrada1.mp4   → [0:v] [0:a]
  -i entrada2.mp4   → [1:v] [1:a]
  -i overlay.png    → [2:v]
  -i musica.mp3     → [3:a]

  -filter_complex "
    [0:v]trim=0:5,setpts=PTS-STARTPTS[clip1];
    [1:v]trim=2:8,setpts=PTS-STARTPTS[clip2];
    [clip1][clip2]concat=n=2:v=1:a=0[outv];
    [0:a]atrim=0:5,asetpts=PTS-STARTPTS[a1];
    [1:a]atrim=2:8,asetpts=PTS-STARTPTS[a2];
    [a1][a2]concat=n=2:v=0:a=1[outa]
  "
  -map "[outv]" -map "[outa]" salida.mp4
```

**Reglas del grafo:**
1. Cada pad de salida `[nombre]` solo puede consumirse UNA vez (si necesitás usarlo dos veces, usá `split`).
2. Los filtros se separan con `;` (punto y coma).
3. Los nombres de pad son case-sensitive y no pueden tener espacios.
4. Si un pad se genera pero nunca se consume, ffmpeg da warning pero no error.
5. Si un pad se consume pero nunca se generó, ffmpeg da error fatal.

### 41.1.2 El filtro `split` para reutilizar un stream

```bash
ffmpeg -i input.mp4 -filter_complex "
  [0:v]split=2[v1][v2];
  [v1]crop=540:1920:0:0[izquierda];
  [v2]crop=540:1920:540:0[derecha];
  [izquierda][derecha]hstack[outv]
" -map "[outv]" -map "0:a" -c:a copy output.mp4
```

### 41.1.3 Ejemplo real: 3 clips + overlay + música

```bash
ffmpeg \
  -i clip1.mp4 \
  -i clip2.mp4 \
  -i clip3.mp4 \
  -i logo.png \
  -i musica.mp3 \
  -filter_complex "
    [0:v]trim=0:3,setpts=PTS-STARTPTS,scale=1080:1920[c1];
    [1:v]trim=0:4,setpts=PTS-STARTPTS,scale=1080:1920[c2];
    [2:v]trim=0:3,setpts=PTS-STARTPTS,scale=1080:1920[c3];
    [c1][c2][c3]concat=n=3:v=1:a=0[base];
    [3:v]scale=120:-1[logo_s];
    [base][logo_s]overlay=W-w-40:40[outv];
    [0:a]atrim=0:3,asetpts=PTS-STARTPTS[a1];
    [1:a]atrim=0:4,asetpts=PTS-STARTPTS[a2];
    [2:a]atrim=0:3,asetpts=PTS-STARTPTS[a3];
    [a1][a2][a3]concat=n=3:v=0:a=1[voz];
    [4:a]volume=0.15[bg];
    [voz][bg]amix=inputs=2:duration=first:dropout_transition=2[outa]
  " \
  -map "[outv]" -map "[outa]" \
  -c:v libx264 -preset fast -crf 18 \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  resultado.mp4
```

### 41.1.4 Árbol de decisión: cuándo usar filter_complex vs filtros simples

```
IF necesitás más de una entrada (varios archivos)
    THEN → filter_complex obligatorio
ELSE IF necesitás dividir un stream (split) y procesarlo de dos formas
    THEN → filter_complex obligatorio
ELSE IF solo aplicás filtros a un stream de entrada
    THEN → -vf / -af alcanza
    PERO: si la cadena de filtros se vuelve muy larga (>5 filtros encadenados)
        THEN → filter_complex es más legible con pads nombrados
ELSE IF necesitás concat de segmentos de un mismo archivo
    THEN → filter_complex con trim + concat
END
```

## 41.2 Trim/atrim avanzado con concat para edición multi-segmento

### 41.2.1 Cortar y concatenar segmentos de un mismo video

Este es el patrón que usa `cut-silence.mjs` (en `allimport/video/scripts/`):

```bash
# Extraer segmentos 00:05-00:12 y 00:20-00:35 de un video
ffmpeg -i input.mp4 -filter_complex "
  [0:v]trim=start=5:end=12,setpts=PTS-STARTPTS[v0];
  [0:a]atrim=start=5:end=12,asetpts=PTS-STARTPTS[a0];
  [0:v]trim=start=20:end=35,setpts=PTS-STARTPTS[v1];
  [0:a]atrim=start=20:end=35,asetpts=PTS-STARTPTS[a1];
  [v0][a0][v1][a1]concat=n=2:v=1:a=1[outv][outa]
" -map "[outv]" -map "[outa]" \
  -c:v libx264 -preset veryfast -crf 18 \
  -c:a aac -b:a 192k output.mp4
```

**Nota crítica:** `setpts=PTS-STARTPTS` y `asetpts=PTS-STARTPTS` son **obligatorios** después de `trim`/`atrim`. Sin ellos, el primer frame del segmento conserva su PTS original y el reproductor muestra frames negros hasta llegar a ese timestamp.

### 41.2.2 Checklist de trim+concat

- [ ] Cada `trim` tiene su correspondiente `atrim` con los mismos tiempos
- [ ] Cada segmento tiene `setpts=PTS-STARTPTS` (video) y `asetpts=PTS-STARTPTS` (audio)
- [ ] El `n=` en `concat` coincide con la cantidad real de segmentos
- [ ] `v=1:a=1` si tenés video y audio; `v=0:a=1` si es solo audio
- [ ] Los pads de salida se mapean con `-map`
- [ ] El orden de los streams en concat alterna [vi][ai] si hay audio y video

### 41.2.3 Tabla de parámetros de trim/atrim

| Parámetro | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `start` | float/timestamp | Punto de inicio en segundos o HH:MM:SS | `start=5.3` o `start=00\:00\:05.3` |
| `end` | float/timestamp | Punto de fin (exclusivo) | `end=12` |
| `start_pts` | int | PTS de inicio (en time_base del stream) | `start_pts=150000` |
| `end_pts` | int | PTS de fin | `end_pts=360000` |
| `duration` | float | Duración a mantener desde start | `duration=7` |
| `start_frame` | int | Frame de inicio (solo `trim`, no `atrim`) | `start_frame=150` |
| `end_frame` | int | Frame de fin | `end_frame=360` |

## 41.3 Estabilización de video con vidstab (workflow de dos pases)

### 41.3.1 Concepto

vidstab analiza la vibración del video en un primer pase y la corrige en un segundo. Ideal para footage grabado con celular sin trípode.

### 41.3.2 Pase 1: Análisis

```bash
ffmpeg -i shaky_input.mp4 \
  -vf "vidstabdetect=stepsize=6:shakiness=8:accuracy=9:result=transforms.trf" \
  -f null -
```

| Parámetro | Rango | Default | Descripción |
|---|---|---|---|
| `stepsize` | 1-32 | 6 | Tamaño del paso de búsqueda. Menor = más preciso, más lento |
| `shakiness` | 1-10 | 5 | Cuánta vibración esperamos. 8-10 para celular a mano |
| `accuracy` | 1-15 | 9 | Precisión del análisis. 9+ para resultados profesionales |
| `result` | path | transforms.trf | Archivo de salida con los datos de transformación |

### 41.3.3 Pase 2: Corrección

```bash
ffmpeg -i shaky_input.mp4 \
  -vf "vidstabtransform=input=transforms.trf:zoom=1:smoothing=10:interpol=bicubic,unsharp=5:5:0.8:3:3:0.4" \
  -c:v libx264 -preset slow -crf 18 \
  -c:a copy \
  estabilizado.mp4
```

| Parámetro | Rango | Default | Descripción |
|---|---|---|---|
| `smoothing` | 0-100 | 10 | Frames de ventana para suavizar. 10=suave, 30=muy estable |
| `zoom` | float | 0 | Zoom para ocultar bordes negros. 1-5% recomendado |
| `interpol` | string | bilinear | Interpolación: `bilinear`, `bicubic`, `no` |
| `optzoom` | 0-2 | 1 | 0=no zoom, 1=zoom óptimo, 2=zoom adaptativo |

**Nota:** Se agrega `unsharp` porque la estabilización e interpolación suavizan la imagen. El sharpening compensa.

### 41.3.4 Árbol de decisión: estabilización

```
IF el video se grabó con trípode/gimbal
    THEN no estabilizar — va a degradar la calidad sin beneficio
ELSE IF el video es shaky pero corto (<10s)
    THEN
        shakiness=6, smoothing=10, zoom=2
        → resultado sutil, natural
ELSE IF el video es muy shaky y largo (>30s, caminando)
    THEN
        shakiness=9, smoothing=30, zoom=5
        → resultado agresivo, puede perder bordes
        → considerar cropear después para eliminar bordes negros
ELSE IF el video tiene movimiento intencional (paneo, tracking)
    THEN
        shakiness=4, smoothing=5
        → solo suaviza la vibración, conserva el movimiento intencional
END
```

## 41.4 Manipulación avanzada de color

### 41.4.1 Aplicación de LUTs (Look-Up Tables)

```bash
# Aplicar un LUT .cube al video
ffmpeg -i input.mp4 \
  -vf "lut3d=allimport_brand.cube" \
  -c:v libx264 -crf 18 output.mp4
```

Para crear un LUT de marca All Import que empuje hacia tonos oscuros con acento cyan:

```bash
# Simulación: bajar brillo, empujar sombras a navy, highlights a cyan
ffmpeg -i input.mp4 \
  -vf "curves=preset=increase_contrast,
       eq=brightness=-0.05:saturation=1.2:contrast=1.1,
       colorbalance=rs=-0.1:gs=-0.05:bs=0.15:rh=-0.05:gh=0.1:bh=0.15" \
  -c:v libx264 -crf 18 output_brand.mp4
```

### 41.4.2 Curvas de color (curves)

```bash
# Curva S clásica para más contraste
ffmpeg -i input.mp4 \
  -vf "curves=m='0/0 0.25/0.15 0.5/0.5 0.75/0.85 1/1'" \
  output.mp4

# Levantar solo las sombras (dar aire a zonas oscuras)
ffmpeg -i input.mp4 \
  -vf "curves=m='0/0.05 0.15/0.2 0.5/0.5 1/1'" \
  output.mp4

# Empujar azules en sombras (look cinematográfico)
ffmpeg -i input.mp4 \
  -vf "curves=b='0/0.1 0.5/0.5 1/0.9'" \
  output.mp4
```

### 41.4.3 Color selectivo con colorkey + overlay

```bash
# Aislar solo objetos rojos (como remeras de fútbol)
ffmpeg -i input.mp4 -filter_complex "
  [0:v]split=2[original][para_mask];
  [para_mask]hue=s=0[gris];
  [0:v]colorkey=0x00FF00:0.3:0.2[mask];
  [gris][original]overlay=shortest=1[outv]
" -map "[outv]" -map "0:a" -c:a copy output.mp4
```

### 41.4.4 Tabla de filtros de color más usados

| Filtro | Función | Parámetros clave | Ejemplo |
|---|---|---|---|
| `eq` | Brillo, contraste, saturación, gamma | `brightness`, `contrast`, `saturation`, `gamma` | `eq=brightness=0.06:saturation=1.3` |
| `curves` | Curvas tonales por canal | `master`, `red`, `green`, `blue`, presets | `curves=preset=lighter` |
| `colorbalance` | Balance de color por rango tonal | `rs/gs/bs` (sombras), `rm/gm/bm` (medios), `rh/gh/bh` (altos) | `colorbalance=bs=0.1:rh=-0.05` |
| `hue` | Rotación de matiz y saturación | `h` (grados), `s` (saturación 0-2) | `hue=h=10:s=1.2` |
| `lut3d` | Aplicar LUT externo | `file` (ruta al .cube/.3dl) | `lut3d=brand.cube` |
| `colorchannelmixer` | Mezcla entre canales | 12 coeficientes (rr,rg,rb,ra,gr,gg,...) | ver abajo |
| `chromakey` | Eliminar color (chroma key) | `color`, `similarity`, `blend` | `chromakey=0x00FF00:0.15:0.1` |
| `colortemperature` | Temperatura de color | `temperature` (1000-40000 K) | `colortemperature=temperature=5500` |

## 41.5 Mezcla de audio multi-pista en filter_complex

### 41.5.1 Patrón básico: voz + música + SFX

```bash
ffmpeg \
  -i video_con_voz.mp4 \
  -i musica_fondo.mp3 \
  -i sfx_whoosh.wav \
  -filter_complex "
    [0:a]volume=1.0[voz];
    [1:a]volume=0.12[musica];
    [2:a]adelay=3200|3200,volume=0.6[sfx];
    [voz][musica][sfx]amix=inputs=3:duration=first:dropout_transition=3[outa]
  " \
  -map "0:v" -map "[outa]" \
  -c:v copy -c:a aac -b:a 192k \
  output.mp4
```

### 41.5.2 Tabla de filtros de audio esenciales

| Filtro | Función | Parámetros | Ejemplo |
|---|---|---|---|
| `volume` | Ajustar volumen | factor (0.0-N) o dB | `volume=0.5` o `volume=-6dB` |
| `adelay` | Retrasar audio | ms por canal (`L\|R`) | `adelay=2000\|2000` |
| `afade` | Fade in/out | `t=in/out`, `st`, `d` | `afade=t=in:d=1` |
| `amix` | Mezclar N entradas | `inputs`, `duration`, `dropout_transition` | `amix=inputs=3:duration=first` |
| `loudnorm` | Normalización EBU R128 | `I`, `TP`, `LRA` | `loudnorm=I=-16:TP=-1.5:LRA=11` |
| `highpass` | Filtro pasa-altos | `f` (frecuencia Hz) | `highpass=f=80` |
| `lowpass` | Filtro pasa-bajos | `f` (frecuencia Hz) | `lowpass=f=12000` |
| `compand` | Compresor/expansor | puntos de transferencia | (ver manual ffmpeg) |
| `dynaudnorm` | Normalización dinámica | `f`, `g`, `s` | `dynaudnorm=f=150:g=15` |
| `aecho` | Eco/reverb | `in_gain:out_gain:delays:decays` | `aecho=0.8:0.88:60:0.4` |
| `silenceremove` | Eliminar silencio | `start_periods`, `start_threshold` | `silenceremove=1:0:-30dB` |

### 41.5.3 Ducking automático (bajar música cuando hay voz)

```bash
ffmpeg \
  -i voz.wav \
  -i musica.mp3 \
  -filter_complex "
    [0:a]asplit=2[voz][sc];
    [sc]silencedetect=n=-25dB:d=0.3,
        volume=0:enable='between(t,0,0)'[trigger];
    [1:a][voz]sidechaincompress=threshold=0.02:ratio=6:attack=50:release=300[ducked];
    [0:a][ducked]amix=inputs=2:duration=first[outa]
  " \
  -map "[outa]" output_ducked.wav
```

**Enfoque más simple con `sidechaincompress`:**

```bash
ffmpeg \
  -i voz.wav \
  -i musica.mp3 \
  -filter_complex "
    [1:a][0:a]sidechaincompress=threshold=0.015:ratio=8:attack=20:release=400:level_sc=1[ducked_music];
    [0:a][ducked_music]amix=inputs=2:duration=first[outa]
  " \
  -map "[outa]" output.wav
```

## 41.6 Procesamiento en lote con loops de shell

### 41.6.1 Convertir todos los .mov a .mp4

```bash
for f in *.mov; do
  ffmpeg -i "$f" \
    -c:v libx264 -preset fast -crf 18 \
    -c:a aac -b:a 192k \
    -movflags +faststart \
    "${f%.mov}.mp4"
done
```

### 41.6.2 Generar thumbnails de todos los videos de una carpeta

```bash
for f in *.mp4; do
  ffmpeg -i "$f" \
    -vf "select=eq(n\,0),scale=1080:-1" \
    -vframes 1 \
    "thumbs/${f%.mp4}_thumb.jpg"
done
```

### 41.6.3 Normalizar audio de todos los videos (EBU R128)

```bash
for f in *.mp4; do
  ffmpeg -i "$f" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=summary" \
    -c:v copy \
    "normalized/${f}"
done
```

### 41.6.4 Escalar todos los videos a 1080x1920 (9:16) con padding

```bash
for f in raw/*.mp4; do
  base=$(basename "$f")
  ffmpeg -i "$f" \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a" \
    -c:v libx264 -preset fast -crf 18 \
    -c:a copy \
    "vertical/${base}"
done
```

## 41.7 Optimización de rendimiento

### 41.7.1 Aceleración por hardware

```bash
# NVIDIA NVENC (si hay GPU NVIDIA)
ffmpeg -hwaccel cuda -i input.mp4 \
  -c:v h264_nvenc -preset p4 -cq 20 \
  -c:a copy output.mp4

# VAAPI (Intel/AMD en Linux)
ffmpeg -vaapi_device /dev/dri/renderD128 \
  -i input.mp4 \
  -vf "format=nv12,hwupload" \
  -c:v h264_vaapi -qp 20 \
  -c:a copy output.mp4

# VideoToolbox (macOS)
ffmpeg -i input.mp4 \
  -c:v h264_videotoolbox -q:v 60 \
  -c:a copy output.mp4
```

### 41.7.2 Threading

```bash
# Usar múltiples threads
ffmpeg -threads 0 -i input.mp4 ...  # 0 = auto-detectar CPUs

# Threads por filtro
ffmpeg -filter_threads 4 -filter_complex_threads 4 -i input.mp4 ...
```

### 41.7.3 Tabla de presets de velocidad vs calidad

| Preset (`-preset`) | Velocidad | Calidad a igual CRF | Uso recomendado |
|---|---|---|---|
| `ultrafast` | Muy rápida | Baja | Previews rápidos, debugging |
| `superfast` | Rápida | Baja-media | Drafts |
| `veryfast` | Rápida | Media | Cut-silence (en `cut-silence.mjs`) |
| `fast` | Media-rápida | Media-alta | Batch processing diario |
| `medium` | Media | Alta | Default de ffmpeg |
| `slow` | Lenta | Muy alta | Export final para publicar |
| `slower` | Muy lenta | Excelente | Archivos finales, portafolio |
| `veryslow` | Extrema | Máxima | Cuando el tiempo no importa |

### 41.7.4 Árbol de decisión: preset por situación

```
IF estoy haciendo pruebas / debugging de filter_complex
    THEN preset=ultrafast
    → Velocidad importa, calidad no
ELSE IF estoy procesando batch de 20+ videos
    THEN preset=veryfast o fast
    → Balance velocidad/calidad
ELSE IF es el export final para Instagram/TikTok
    THEN preset=slow
    → Máxima calidad visual, el tiempo extra vale
ELSE IF es material de archivo / portafolio
    THEN preset=slower
    → Preservar cada detalle
END
```

## 41.8 Renderizado avanzado de subtítulos con libass

### 41.8.1 Renderizar subtítulos SRT sobre video

```bash
ffmpeg -i input.mp4 \
  -vf "subtitles=subs.srt:force_style='FontName=Montserrat Alternates,FontSize=22,PrimaryColour=&H00fafaf8,OutlineColour=&H001a0f0a,BorderStyle=3,Outline=2,Shadow=1,BackColour=&H80000000,Alignment=2,MarginV=60'" \
  -c:v libx264 -preset slow -crf 18 \
  -c:a copy output.mp4
```

**Explicación de colores en formato ASS (&HAABBGGRR):**
- `&H00fafaf8` = WHITE (#f8fafa) con alpha 0 (opaco)
- `&H001a0f0a` = NAVY (#0a0f1a) con alpha 0 (opaco)
- `&H80000000` = Negro semitransparente para sombra

### 41.8.2 Renderizar subtítulos ASS con estilos de marca

```
[Script Info]
Title: All Import Subs
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: AllImport,Montserrat Alternates,48,&H00fafaf8,&H000000FF,&H001a0f0a,&H80000000,1,0,0,0,100,100,0,0,1,3,1,2,40,40,80,1
Style: Highlight,Montserrat Alternates,52,&H00d4d400,&H000000FF,&H001a0f0a,&H80000000,1,0,0,0,100,100,0,0,1,4,1,2,40,40,80,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:02.50,AllImport,,0,0,0,,Estos auriculares cuestan
Dialogue: 0,0:00:02.50,0:00:04.00,Highlight,,0,0,0,,{\an8}TRES MIL PESOS
```

```bash
ffmpeg -i input.mp4 \
  -vf "ass=subs.ass:fontsdir=allimport/historias/fonts/" \
  -c:v libx264 -preset slow -crf 18 \
  -c:a copy output.mp4
```

### 41.8.3 Checklist de subtítulos con libass

- [ ] La fuente Montserrat Alternates está accesible (ruta en `fontsdir` o instalada en el sistema)
- [ ] Los colores están en formato ASS (&HAABBGGRR), no en formato CSS (#RRGGBB)
- [ ] El `PlayResX`/`PlayResY` coincide con la resolución del video
- [ ] `ScaledBorderAndShadow: yes` para que el borde escale con la resolución
- [ ] MarginV suficiente para no caer en la zona de recorte de Instagram (ver Cap. 25)
- [ ] Probado con 2-3 líneas largas para verificar que no se corta

## 41.9 Picture-in-Picture (PIP)

### 41.9.1 PIP básico

```bash
ffmpeg -i fondo.mp4 -i pip_cam.mp4 -filter_complex "
  [1:v]scale=320:-1[pip];
  [0:v][pip]overlay=W-w-30:H-h-30[outv]
" -map "[outv]" -map "0:a" -c:v libx264 -crf 18 -c:a copy output.mp4
```

### 41.9.2 PIP con borde de marca y esquinas redondeadas

```bash
ffmpeg -i fondo.mp4 -i cam.mp4 -filter_complex "
  [1:v]scale=300:-1,
       format=yuva420p,
       geq='lum=lum(X,Y):a=if(gt(abs(X-W/2),W/2-15)*gt(abs(Y-H/2),H/2-15),0,255)'[pip_round];
  [0:v]drawbox=x=iw-340:y=ih-h-30+0:w=320:h=320:color=#00d4d4:t=3[bg_border];
  [bg_border][pip_round]overlay=W-w-40:H-h-40[outv]
" -map "[outv]" -map "0:a" -c:a copy output.mp4
```

### 41.9.3 Posiciones de PIP

| Posición | Expresión overlay | Caso de uso |
|---|---|---|
| Esquina sup-izq | `overlay=20:20` | Cámara sobre tutorial |
| Esquina sup-der | `overlay=W-w-20:20` | Logo sobre contenido |
| Esquina inf-izq | `overlay=20:H-h-20` | Marca de agua |
| Esquina inf-der | `overlay=W-w-20:H-h-20` | Cámara en gameplay |
| Centro | `overlay=(W-w)/2:(H-h)/2` | Overlay centrado |

## 41.10 Chromakey / green screen con ffmpeg

### 41.10.1 Comando básico de chroma key

```bash
ffmpeg -i fondo_nuevo.mp4 -i grabacion_green.mp4 -filter_complex "
  [1:v]chromakey=0x00FF00:0.15:0.1[fg];
  [0:v][fg]overlay=shortest=1[outv]
" -map "[outv]" -map "1:a" -c:v libx264 -crf 18 -c:a copy output.mp4
```

| Parámetro | Descripción | Rango | Recomendado |
|---|---|---|---|
| `color` | Color a eliminar (hex) | - | `0x00FF00` (verde estándar) |
| `similarity` | Tolerancia de color | 0.0-1.0 | 0.10-0.20 |
| `blend` | Suavizado de bordes | 0.0-1.0 | 0.05-0.15 |

### 41.10.2 Árbol de decisión: ajuste de chroma key

```
IF quedan restos de verde en los bordes del sujeto
    THEN aumentar similarity (0.15 → 0.25)
    PERO: verificar que no se coma partes del sujeto
ELSE IF se comen partes del sujeto (transparenta ropa/piel)
    THEN reducir similarity (0.15 → 0.08)
ELSE IF los bordes tienen halo verde visible
    THEN aumentar blend (0.1 → 0.2)
    Y/O agregar despill: colorbalance=gs=-0.1
ELSE IF el fondo verde no es uniforme (sombras, arrugas)
    THEN
        1. Pre-procesar: eq=brightness=0.05:contrast=1.1
        2. Luego chromakey con similarity más alta (0.25-0.35)
        3. Agregar despill
END
```

## 41.11 Reducción de ruido temporal

```bash
# Reducción de ruido con hqdn3d (rápido, buena calidad)
ffmpeg -i input.mp4 \
  -vf "hqdn3d=4:3:6:4" \
  -c:v libx264 -crf 18 output.mp4

# Reducción de ruido con nlmeans (lento, mejor calidad)
ffmpeg -i input.mp4 \
  -vf "nlmeans=s=3:p=7:r=15" \
  -c:v libx264 -crf 18 output.mp4
```

| Filtro | Velocidad | Calidad | Parámetros clave |
|---|---|---|---|
| `hqdn3d` | Rápido | Buena | `luma_spatial:chroma_spatial:luma_tmp:chroma_tmp` (0-20) |
| `nlmeans` | Lento | Excelente | `s` (fuerza 1-10), `p` (patch 3-7), `r` (radio búsqueda 9-15) |

## 41.12 Interpolación de frames para cámara lenta

```bash
# Slow motion 2x con interpolación de frames (minterpolate)
ffmpeg -i input.mp4 \
  -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
  -r 30 \
  -c:v libx264 -preset slow -crf 18 \
  output_slowmo.mp4
```

**Cuidado:** `minterpolate` es **extremadamente lento** y puede crear artefactos visuales (ghosting) en escenas con mucho movimiento. Para resultados profesionales, preferí Higgsfield `upscale_video` o apps especializadas.

## 41.13 Referencia completa de filtros ffmpeg más usados

| Filtro | Categoría | Función | Ejemplo de uso |
|---|---|---|---|
| `scale` | Video | Escalar resolución | `scale=1080:1920` |
| `crop` | Video | Recortar | `crop=1080:1920:0:0` |
| `pad` | Video | Agregar padding | `pad=1080:1920:(ow-iw)/2:(oh-ih)/2:#0a0f1a` |
| `overlay` | Video | Superponer imagen/video | `overlay=W-w-20:20` |
| `drawtext` | Video | Texto sobre video | `drawtext=text='ALL IMPORT':fontcolor=#00d4d4:fontsize=48` |
| `drawbox` | Video | Rectángulo sobre video | `drawbox=x=0:y=0:w=100:h=100:color=#e22a2a:t=fill` |
| `trim` | Video | Cortar segmento | `trim=start=5:end=12` |
| `setpts` | Video | Ajustar timestamps | `setpts=PTS-STARTPTS` o `setpts=0.5*PTS` (2x speed) |
| `concat` | AV | Concatenar streams | `concat=n=3:v=1:a=1` |
| `split` | Video | Duplicar stream | `split=2[a][b]` |
| `fps` | Video | Cambiar framerate | `fps=30` |
| `transpose` | Video | Rotar 90 grados | `transpose=1` (90 CW) |
| `hflip` | Video | Espejo horizontal | `hflip` |
| `vflip` | Video | Espejo vertical | `vflip` |
| `fade` | Video | Fade in/out | `fade=t=in:d=1` |
| `format` | Video | Cambiar pixel format | `format=yuv420p` |
| `subtitles` | Video | Quemar subtítulos SRT | `subtitles=subs.srt` |
| `ass` | Video | Quemar subtítulos ASS | `ass=subs.ass` |
| `chromakey` | Video | Chroma key | `chromakey=0x00FF00:0.15:0.1` |
| `colorkey` | Video | Color key (con alpha) | `colorkey=0x00FF00:0.3:0.2` |
| `hqdn3d` | Video | Reducción de ruido | `hqdn3d=4:3:6:4` |
| `unsharp` | Video | Sharpening | `unsharp=5:5:1.0:5:5:0.5` |
| `eq` | Video | Brillo/contraste/sat | `eq=brightness=0.06:saturation=1.3` |
| `curves` | Video | Curvas tonales | `curves=preset=lighter` |
| `lut3d` | Video | Aplicar LUT | `lut3d=brand.cube` |
| `vidstabdetect` | Video | Análisis estabilización | `vidstabdetect=shakiness=8` |
| `vidstabtransform` | Video | Aplicar estabilización | `vidstabtransform=smoothing=10` |
| `volume` | Audio | Ajustar volumen | `volume=0.5` |
| `adelay` | Audio | Retrasar audio | `adelay=2000\|2000` |
| `afade` | Audio | Fade in/out | `afade=t=in:d=0.5` |
| `atrim` | Audio | Cortar segmento | `atrim=start=5:end=12` |
| `asetpts` | Audio | Ajustar timestamps | `asetpts=PTS-STARTPTS` |
| `amix` | Audio | Mezclar pistas | `amix=inputs=2:duration=first` |
| `loudnorm` | Audio | Normalización R128 | `loudnorm=I=-16:TP=-1.5:LRA=11` |
| `highpass` | Audio | Filtro pasa-altos | `highpass=f=80` |
| `lowpass` | Audio | Filtro pasa-bajos | `lowpass=f=12000` |
| `silencedetect` | Audio | Detectar silencios | `silencedetect=noise=-30dB:d=0.5` |
| `aresample` | Audio | Resamplear | `aresample=44100` |

## 41.14 Troubleshooting de errores ffmpeg (20+ errores)

| # | Error / Síntoma | Causa | Solución |
|---|---|---|---|
| 1 | `Output pad "X" not connected` | Pad generado pero no consumido ni mapeado | Agregar `-map "[X]"` o conectarlo a otro filtro |
| 2 | `Input pad "X" not connected` | Se referencia un pad que no existe | Verificar nombre del pad, case-sensitive |
| 3 | `Too many packets buffered` | Desfase temporal entre streams | Agregar `setpts=PTS-STARTPTS` después de trim |
| 4 | `Buffer queue overflow` | filter_complex genera datos más rápido de lo que se consumen | Agregar `-max_muxing_queue_size 1024` (o más) |
| 5 | `Invalid number of channels` | Mezcla de audio mono y estéreo | Agregar `aformat=channel_layouts=stereo` antes de amix |
| 6 | `Discarding subtitle` | Codec de subtítulos no soportado | Usar `-c:s mov_text` para MP4 o quemar con `-vf subtitles=` |
| 7 | `Invalid data found when processing input` | Archivo corrupto o formato no soportado | Probar `-err_detect ignore_err` o re-encodear el source |
| 8 | `height/width not divisible by 2` | Resolución impar con codec H.264 | Agregar `pad=ceil(iw/2)*2:ceil(ih/2)*2` |
| 9 | `encoder not found` | Codec no compilado en tu ffmpeg | Instalar ffmpeg con soporte del codec (`--enable-libx264`) |
| 10 | `Avi duration discrepancy` | AVI con duración incorrecta en header | Agregar `-fflags +genpts` |
| 11 | `Discarding frame` con overlay | PIP más grande que el fondo | Escalar el PIP: `scale=min(iw\,W):min(ih\,H)` |
| 12 | Audio fuera de sync después de concat | Falta `asetpts` | Agregar `asetpts=PTS-STARTPTS` después de cada `atrim` |
| 13 | `No such filter: 'vidstabdetect'` | ffmpeg compilado sin libvidstab | Instalar libvidstab y recompilar o usar paquete con soporte |
| 14 | `Permission denied` al escribir | Sin permisos en directorio de salida | Verificar permisos, crear directorio con `mkdir -p` |
| 15 | Green frames al inicio | PTS no reseteados | `setpts=PTS-STARTPTS` obligatorio después de `trim` |
| 16 | `Sample format not supported` | Incompatibilidad de formato de sample | Agregar `aformat=sample_fmts=fltp` |
| 17 | Archivo de salida 0 bytes | Error silencioso en filter_complex | Correr sin `-v quiet` para ver errores, verificar todos los pads |
| 18 | `moov atom not found` | MP4 truncado (grabación cortada) | Intentar `ffmpeg -i broken.mp4 -c copy fixed.mp4` |
| 19 | `Protocol not found` | URL sin protocolo habilitado | Verificar que ffmpeg tenga `--enable-protocol=https` |
| 20 | `Could not find font` en subtitles | Fuente no encontrada | Usar `fontsdir=ruta/` o instalar la fuente en el sistema |
| 21 | Video se ve negro con audio OK | Color space incompatible | Agregar `format=yuv420p` antes de la salida |
| 22 | `Discarding X frames` | Input con framerate variable | Forzar CFR: `-vsync cfr` o `fps=30` |
| 23 | Flicker en concat | Diferentes framerate/resolución entre clips | Normalizar: mismo fps, scale, format antes de concat |

---

# Capítulo 42: Remotion — video programático con React

## 42.1 Arquitectura de Remotion

### 42.1.1 Conceptos fundamentales

```
ARQUITECTURA REMOTION:

  ┌─────────────────────────────────────────────────┐
  │                  Root.tsx                        │
  │  ┌───────────────────────────────────────────┐  │
  │  │  <Composition id="Reel" ...>              │  │
  │  │    component={Reel}                       │  │
  │  │    durationInFrames={150}                 │  │
  │  │    fps={30}                               │  │
  │  │    width={1080}  height={1920}            │  │
  │  │    defaultProps={{...}}                    │  │
  │  └───────────────────────────────────────────┘  │
  │  ┌───────────────────────────────────────────┐  │
  │  │  <Composition id="Story" ...>             │  │
  │  └───────────────────────────────────────────┘  │
  │  ┌───────────────────────────────────────────┐  │
  │  │  <Composition id="Ad" ...>                │  │
  │  └───────────────────────────────────────────┘  │
  └─────────────────────────────────────────────────┘

  Cada Composition es un "video" renderizable independiente.
  El componente React se renderiza N veces (una por frame).
  useCurrentFrame() → número de frame actual (0-based).
  useVideoConfig() → {fps, width, height, durationInFrames}.
```

### 42.1.2 Ciclo de vida de un frame

```
Frame 0 → React renderiza componente con frame=0
         → Puppeteer/Headless Chrome toma screenshot
         → Se guarda como frame PNG

Frame 1 → React renderiza componente con frame=1
         → Screenshot → PNG

...repite hasta durationInFrames...

Luego: ffmpeg concatena todos los PNGs → video final MP4/WebM
```

### 42.1.3 Composiciones vs Secuencias

| Concepto | Qué es | Analogía |
|---|---|---|
| `Composition` | Video completo renderizable | Un "proyecto" de video |
| `Sequence` | Segmento temporal dentro de una composición | Un "clip" dentro del proyecto |
| `Series` | Secuencia de componentes uno tras otro | "Clips en la timeline" |
| `AbsoluteFill` | Div que ocupa todo el frame | "Capa" en editor |
| `Img` / `Video` / `Audio` | Medios estáticos | Assets importados |
| `staticFile()` | Referencia a archivo en `public/` | Asset del proyecto |

## 42.2 Configuración de un proyecto Remotion para All Import

### 42.2.1 Estructura del proyecto existente

```
allimport/video/
├── remotion.config.ts     ← Configuración de Remotion
├── src/
│   ├── Root.tsx            ← Registro de compositions
│   ├── Reel.tsx            ← Componente del reel de producto
│   └── index.ts            ← Entry point
├── public/
│   └── producto.jpg        ← Assets estáticos
├── package.json
└── tsconfig.json
```

### 42.2.2 Archivo Root.tsx existente (referencia)

El proyecto ya tiene un `Root.tsx` que registra la composición `Reel`:

```tsx
// allimport/video/src/Root.tsx
import {Composition} from 'remotion';
import {Reel} from './Reel';
export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel}
    durationInFrames={150}   // 5 segundos a 30fps
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      foto: 'producto.jpg',
      titulo: 'Figus del Mundial 2026',
      precio: '$3.000 c/u',
      sub: 'Desde 10u → $2.500 c/u',
      badge: 'ÚLTIMAS · NO TRAEMOS MÁS',
    }}
  />
);
```

### 42.2.3 Checklist: setup de nuevo proyecto Remotion

- [ ] Node.js 18+ instalado
- [ ] `npm install remotion @remotion/cli @remotion/bundler` en `allimport/video/`
- [ ] Estructura de carpetas: `src/`, `public/`
- [ ] `remotion.config.ts` con settings básicos
- [ ] `Root.tsx` con al menos una `<Composition>`
- [ ] Fuente Montserrat Alternates copiada a `public/fonts/` o referenciada desde `allimport/historias/fonts/`
- [ ] `package.json` con scripts: `dev`, `build`, `render`
- [ ] Probar con `npx remotion preview src/index.ts`

### 42.2.4 Scripts recomendados para package.json

```json
{
  "scripts": {
    "dev": "remotion preview src/index.ts",
    "render": "remotion render src/index.ts Reel out/reel.mp4",
    "render:all": "remotion render src/index.ts --all",
    "upgrade": "remotion upgrade"
  }
}
```

## 42.3 Animaciones de texto con componentes React

### 42.3.1 Interpolación básica

```tsx
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

// Fade in lineal
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: 'clamp',
});

// Slide desde abajo con spring
const translateY = spring({
  frame: frame - 15,  // delay de 15 frames (0.5s a 30fps)
  fps,
  config: {damping: 12, stiffness: 100},
});
// translateY va de 0 a 1, multiplicar por distancia:
// style={{ transform: `translateY(${(1 - translateY) * 100}px)` }}
```

### 42.3.2 Kinetic captions (palabra por palabra)

```tsx
const words = texto.split(' ');
const framesPerWord = Math.floor(durationInFrames / words.length);

return (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
    {words.map((word, i) => {
      const startFrame = i * framesPerWord;
      const wordSpring = spring({
        frame: frame - startFrame,
        fps,
        config: {damping: 10},
      });
      const isActive = frame >= startFrame && frame < startFrame + framesPerWord;
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            margin: '0 8px',
            transform: `scale(${isActive ? 1.3 : 1})`,
            color: isActive ? '#00d4d4' : '#f8fafa',
            fontFamily: 'Montserrat Alternates',
            fontWeight: 800,
            fontSize: 56,
            opacity: frame >= startFrame ? 1 : 0.3,
            transition: 'none', // Remotion no usa CSS transitions
          }}
        >
          {word}
        </span>
      );
    })}
  </AbsoluteFill>
);
```

### 42.3.3 Tabla de funciones de animación en Remotion

| Función | Tipo | Uso | Parámetros clave |
|---|---|---|---|
| `interpolate` | Lineal/clamped | Mapear rango de frames a rango de valores | `input`, `inputRange[]`, `outputRange[]`, options |
| `spring` | Física | Animaciones con rebote/elasticidad | `frame`, `fps`, `config: {damping, stiffness, mass}` |
| `Easing.bezier` | Curva Bezier | Easing personalizado | `(x1, y1, x2, y2)` |
| `Easing.inOut` | Easing built-in | Ease in-out simétrico | `(Easing.ease)` |
| `interpolateColors` | Color | Transición entre colores | Misma sintaxis que interpolate pero con colores |

## 42.4 Templates de producto para All Import

### 42.4.1 Template: Reel de producto (existente en Reel.tsx)

El componente `Reel.tsx` ya implementa:
- Ken Burns lento (zoom 1.0 → 1.12 en 5 segundos)
- Badge de urgencia con spring (aparece con rebote)
- Precio en pill CYAN sobre fondo
- Marco CYAN de 14px (identidad de marca)
- Header "ALL IMPORT" + "Córdoba · Entrega en mano"
- CTA "Escribinos por WhatsApp" en CELESTE
- Gradient scrims para legibilidad del texto

**Colores de marca en Remotion:**
```tsx
const NAVY    = '#0a0f1a';
const CYAN    = '#00d4d4';
const WHITE   = '#f8fafa';
const RED     = '#e22a2a';
const CELESTE = '#78b4eb';
const GOLD    = '#c9a227';
```

### 42.4.2 Template: Comparación de precios

```
ESTRUCTURA DEL FRAME (1080x1920):

┌──────────────────────────────────────────┐
│          ALL IMPORT (CYAN)               │
│     Córdoba · Entrega en mano            │
├──────────────────────────────────────────┤
│                                          │
│   ┌──────────────┐  ┌──────────────┐    │
│   │  PRODUCTO A   │  │  PRODUCTO B   │    │
│   │  (foto)       │  │  (foto)       │    │
│   │              │  │              │    │
│   └──────────────┘  └──────────────┘    │
│                                          │
│   ┌──────────────┐  ┌──────────────┐    │
│   │  $5.000      │  │  $3.500      │    │
│   │  (RED, tach) │  │  (CYAN, pill)│    │
│   └──────────────┘  └──────────────┘    │
│                                          │
│   AHORRÁS $1.500 (GOLD, animado)        │
│                                          │
│   "Escribinos por WhatsApp" (CELESTE)   │
├──────────────────────────────────────────┤
│          Marco CYAN 14px                 │
└──────────────────────────────────────────┘
```

### 42.4.3 Template: Countdown / Oferta limitada

```tsx
// Concepto: contador regresivo con spring en cada dígito
const Countdown: React.FC<{days: number; message: string}> = ({days, message}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Cada dígito aparece con spring escalonado
  const digits = String(days).split('');
  
  return (
    <AbsoluteFill style={{backgroundColor: NAVY, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{color: RED, fontFamily: 'Montserrat Alternates', fontWeight: 800, fontSize: 32}}>
        QUEDAN
      </div>
      <div style={{display: 'flex', gap: 20}}>
        {digits.map((d, i) => {
          const s = spring({frame: frame - i * 8, fps, config: {damping: 8}});
          return (
            <span key={i} style={{
              fontFamily: 'Montserrat Alternates',
              fontWeight: 800,
              fontSize: 200,
              color: CYAN,
              transform: `scale(${s})`,
            }}>
              {d}
            </span>
          );
        })}
      </div>
      <div style={{color: WHITE, fontFamily: 'Montserrat Alternates', fontWeight: 700, fontSize: 48}}>
        DÍAS
      </div>
    </AbsoluteFill>
  );
};
```

## 42.5 Video data-driven (de JSON/API a video)

### 42.5.1 Patrón: leer datos y generar video

```tsx
// datos.json
// [
//   {"producto": "Auriculares TWS", "precio": "$4.500", "foto": "tws.jpg"},
//   {"producto": "Power Bank 20000mAh", "precio": "$8.000", "foto": "powerbank.jpg"}
// ]

// En Root.tsx: generar una Composition por cada producto
import datos from '../datos.json';

export const RemotionRoot: React.FC = () => (
  <>
    {datos.map((item, i) => (
      <Composition
        key={i}
        id={`Producto-${i}`}
        component={Reel}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          foto: item.foto,
          titulo: item.producto,
          precio: item.precio,
          sub: '',
          badge: 'NUEVO',
        }}
      />
    ))}
  </>
);
```

### 42.5.2 Renderizar todos los videos en batch

```bash
# Renderizar todas las composiciones
npx remotion render src/index.ts --all --output-location=out/

# Renderizar una específica
npx remotion render src/index.ts "Producto-0" out/producto-0.mp4

# Con calidad específica
npx remotion render src/index.ts Reel out/reel.mp4 \
  --codec h264 \
  --crf 18 \
  --pixel-format yuv420p
```

## 42.6 Audio en Remotion

### 42.6.1 Agregar audio

```tsx
import {Audio, staticFile, Sequence} from 'remotion';

// Audio de fondo completo
<Audio src={staticFile('musica.mp3')} volume={0.15} />

// Audio con fade in/out
<Audio
  src={staticFile('musica.mp3')}
  volume={(f) =>
    interpolate(f, [0, 30, 120, 150], [0, 0.15, 0.15, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  }
/>

// SFX en momento específico (frame 15)
<Sequence from={15} durationInFrames={30}>
  <Audio src={staticFile('whoosh.wav')} volume={0.6} />
</Sequence>
```

## 42.7 Fuentes personalizadas en Remotion

### 42.7.1 Cargar Montserrat Alternates

```tsx
// En un archivo fonts.ts
import {staticFile} from 'remotion';

const fontFamily = 'Montserrat Alternates';

export const loadFont = () => {
  const font = new FontFace(fontFamily, `url(${staticFile('fonts/MontserratAlternates-Bold.ttf')})`);
  font.load().then((loaded) => {
    document.fonts.add(loaded);
  });
};

// En el componente principal:
import {useEffect} from 'react';
import {loadFont} from './fonts';

export const Reel: React.FC<Props> = (props) => {
  useEffect(() => { loadFont(); }, []);
  // ... resto del componente
};
```

### 42.7.2 Alternativa: @font-face en CSS global

```css
/* En src/style.css, importado en index.ts */
@font-face {
  font-family: 'Montserrat Alternates';
  src: url('./fonts/MontserratAlternates-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Montserrat Alternates';
  src: url('./fonts/MontserratAlternates-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
}
```

## 42.8 Sistema de colores de marca como theme de Remotion

```tsx
// theme.ts — fuente única de verdad para colores en Remotion
export const brand = {
  navy:    '#0a0f1a',
  cyan:    '#00d4d4',
  white:   '#f8fafa',
  red:     '#e22a2a',
  celeste: '#78b4eb',
  gold:    '#c9a227',
} as const;

// Paleta semántica
export const semantic = {
  background:   brand.navy,
  accent:       brand.cyan,
  text:         brand.white,
  urgency:      brand.red,
  secondary:    brand.celeste,
  highlight:    brand.gold,
  pricePill:    { bg: brand.cyan, text: brand.navy },
  urgencyBadge: { bg: brand.red, text: brand.white },
  cta:          brand.celeste,
  border:       brand.cyan,
  borderWidth:  14,
} as const;
```

## 42.9 Pipeline de renderizado: local vs cloud

### 42.9.1 Renderizado local

```bash
# Render completo
npx remotion render src/index.ts Reel out/reel.mp4 \
  --codec h264 --crf 18

# Render de un rango de frames (para preview)
npx remotion render src/index.ts Reel out/preview.mp4 \
  --frames 0-30

# Still (un solo frame como imagen)
npx remotion still src/index.ts Reel out/thumb.png \
  --frame 75
```

### 42.9.2 Árbol de decisión: local vs cloud

```
IF renderizás menos de 5 videos por sesión
    THEN → local alcanza
    → Más simple, sin costo adicional, control total
ELSE IF renderizás 10+ videos en batch (data-driven)
    THEN → evaluar Remotion Lambda (AWS) o cloud
    → Paralelismo masivo, minutos vs horas
    PERO: requiere setup de AWS + costos de Lambda
ELSE IF necesitás renderizar en CI/CD (automático al pushear)
    THEN → GitHub Actions + render local en el runner
    → Sin costo cloud adicional si el runner tiene capacidad
END
```

## 42.10 Remotion vs ffmpeg: árbol de decisión

```
IF el video es solo cortes + concat + overlays estáticos
    THEN → ffmpeg
    → Más rápido, sin overhead de Chrome/Puppeteer
    
ELSE IF el video tiene animaciones de texto complejas (kinetic captions, tipografía animada)
    THEN → Remotion
    → React + CSS hacen las animaciones triviales
    
ELSE IF el video se genera desde datos (catálogo, precios, JSON)
    THEN → Remotion
    → Componentes React + props = video parametrizado
    
ELSE IF necesitás color grading, mezcla de audio compleja, estabilización
    THEN → ffmpeg
    → Filtros nativos de procesamiento de señal
    
ELSE IF el video combina ambos (animación + procesamiento)
    THEN → Remotion para generar el video base + ffmpeg para post-procesar
    Ejemplo: Remotion genera el reel animado → ffmpeg normaliza audio y agrega música
    
ELSE IF es un template que vas a reutilizar 50+ veces con distintos datos
    THEN → Remotion
    → Cambiás los props y renderizás, no re-editás
END
```

## 42.11 Biblioteca de templates para tipos de video recurrentes

| Template | Composition ID | Props | Duración | Uso |
|---|---|---|---|---|
| Reel de producto | `Reel` | foto, titulo, precio, sub, badge | 5s (150f) | Showcase de producto individual |
| Comparación | `Compare` | foto1, foto2, precio1, precio2, ahorro | 7s | Comparar precios / productos |
| Countdown | `Countdown` | days, message | 5s | Oferta limitada, evento |
| Dato del día | `DatoDelDia` | dato, fuente | 5s | Contenido de valor, educativo |
| Antes/Después | `BeforeAfter` | fotoBefore, fotoAfter, label | 5s | Transformaciones, unboxing |
| Catálogo scroll | `Catalog` | items[] | 10s | Múltiples productos en scroll vertical |
| CTA final | `CTAFinal` | mensaje, whatsapp | 3s | Clip de cierre para cualquier reel |
| Testimonial | `Testimonial` | texto, nombre, foto | 5s | Reseña de cliente (con permiso) |

---

# Capítulo 43: Higgsfield — workflow completo de IA para video

## 43.1 Inventario completo de herramientas MCP de Higgsfield

### 43.1.1 Tabla de herramientas disponibles

| Herramienta | Categoría | Función | Cuándo usarla |
|---|---|---|---|
| `generate_image` | Generación | Crear imagen desde prompt | Backgrounds, assets, producto sin foto |
| `generate_video` | Generación | Crear video desde prompt o imagen | Animación de producto, clips abstractos |
| `generate_audio` | Generación | Crear audio/música desde prompt | Música de fondo, efectos |
| `generate_3d` | Generación | Convertir imagen a mesh 3D (GLB) | Producto 3D para web/presentación |
| `reframe` | Edición | Cambiar aspect ratio de video | 16:9 → 9:16, 1:1 → 9:16 |
| `upscale_image` | Mejora | Aumentar resolución de imagen | Fotos de baja calidad, zoom de detalle |
| `upscale_video` | Mejora | Aumentar resolución de video | Video de celular → calidad alta |
| `remove_background` | Edición | Eliminar fondo (cutout) | Producto para overlay, catálogo |
| `outpaint_image` | Edición | Expandir/extender imagen | Encuadre que necesita más espacio |
| `voice_change` | Audio | Modificar voz | Contenido con voz alterada |
| `motion_control` | Video | Controlar movimiento en generación | Puppeteer, motion transfer |
| `virality_predictor` | Análisis | Predecir viralidad de video | QA pre-publicación |
| `shorts_studio_create` | Workflow | Crear short completo | Videos automatizados de formato corto |
| `show_medias` | Gestión | Ver medios generados | Revisar historial de generaciones |
| `media_upload` | Gestión | Subir media desde local | Input para otras herramientas |
| `media_confirm` | Gestión | Confirmar media subida | Paso obligatorio post-upload |

### 43.1.2 Árbol de decisión: qué herramienta usar

```
IF necesitás una imagen nueva (no tenés foto)
    THEN → generate_image
    IF necesitás foto de producto realista
        THEN prompt con estilo "product photography"
    ELSE IF necesitás fondo abstracto de marca
        THEN prompt con colores de marca (#0a0f1a, #00d4d4)
    ELSE IF necesitás asset decorativo (icono, pattern)
        THEN prompt con "flat design, icon, minimal"

ELSE IF tenés una imagen y querés animarla
    THEN → generate_video (con imagen como input)
    IF querés movimiento sutil (ken burns, parallax)
        THEN motion_control con recast/puppeteer
    ELSE IF querés animación completa (producto girando, etc.)
        THEN generate_video con prompt descriptivo

ELSE IF tenés un video en formato equivocado
    THEN → reframe
    IF 16:9 horizontal → 9:16 vertical (para Reel/TikTok/Story)
    ELSE IF 9:16 → 1:1 (para post de feed)
    ELSE IF 9:16 → 16:9 (para YouTube)

ELSE IF la imagen/video es de baja resolución
    THEN → upscale_image / upscale_video
    → Ideal para fotos de WhatsApp comprimidas

ELSE IF necesitás producto sin fondo (para overlay en Remotion/ffmpeg)
    THEN → remove_background
    → Genera PNG con alpha

ELSE IF querés evaluar si un video va a funcionar antes de publicar
    THEN → virality_predictor
    → Score + análisis de retención + hook strength

ELSE IF querés crear un short completo desde cero
    THEN → shorts_studio_create
    → Workflow guiado de principio a fin
END
```

## 43.2 generate_image: prompts, estilos y parámetros

### 43.2.1 Estructura de prompt efectivo

```
ESTRUCTURA DE PROMPT PARA HIGGSFIELD:

[estilo] + [sujeto] + [acción/pose] + [entorno] + [iluminación] + [detalles técnicos]

Ejemplo para producto All Import:
"product photography, wireless TWS earbuds in charging case,
 floating above dark navy surface (#0a0f1a),
 cyan LED accent glow (#00d4d4),
 studio lighting, soft shadows,
 high detail, 8K quality"
```

### 43.2.2 Prompts por caso de uso para All Import

| Caso de uso | Prompt base | Estilo |
|---|---|---|
| Foto de producto (auriculares) | `"product photography, wireless earbuds in open charging case, dark background, studio lighting, floating, clean minimal composition"` | Fotografía de estudio |
| Fondo para historia | `"dark abstract gradient background, deep navy blue to teal, subtle geometric shapes, luxury feel, 9:16 vertical"` | Abstracto dark |
| Banner de oferta | `"dark banner background with glowing cyan neon accents, dramatic lighting, luxury tech aesthetic, wide format"` | Neon/tech |
| Lifestyle (emprendedor) | `"young entrepreneur working on laptop in minimalist workspace, warm lighting, candid feel, motivational"` | Lifestyle casual |
| Textura/Pattern | `"seamless dark navy geometric pattern, subtle cyan line accents, tech aesthetic, tileable"` | Pattern minimal |

### 43.2.3 Checklist de generación de imagen

- [ ] El prompt describe explícitamente el estilo visual deseado
- [ ] Incluye referencia a la paleta de colores de marca si aplica
- [ ] Especifica la orientación (vertical 9:16 para historias, horizontal para banners)
- [ ] No incluye texto en el prompt (Higgsfield no renderiza texto bien; agregar texto con ffmpeg/Remotion/Pillow)
- [ ] Revisada la imagen generada: sin artefactos, sin dedos extra, sin texto ilegible
- [ ] Si se va a usar como overlay: pedí fondo limpio para facilitar remove_background

## 43.3 generate_video: prompts, motion control, duración

### 43.3.1 Desde prompt (sin imagen base)

```
Prompt para video de producto:
"Smooth slow-motion rotation of wireless earbuds on dark surface,
 cyan light reflections, luxury product advertisement style,
 shallow depth of field, 4K quality"
```

### 43.3.2 Desde imagen (image-to-video)

El workflow es:
1. Subir la imagen con `media_upload`
2. Confirmar con `media_confirm`
3. Usar `generate_video` con la imagen como input
4. Describir en el prompt SOLO el movimiento deseado

### 43.3.3 Tabla de motion control

| Modo | Función | Ejemplo de uso |
|---|---|---|
| `recast` | Re-animar un sujeto con nuevo movimiento | Hacer que un producto "cobre vida" |
| `puppeteer` | Controlar movimiento con video de referencia | Copiar movimiento humano a avatar |
| `motion_transfer` | Transferir movimiento de un video a otro | Aplicar caminata a producto |

## 43.4 reframe: conversión de aspect ratio

### 43.4.1 Workflow de reframe

```
PASO 1: Identificar formato de origen y destino

IF video es 16:9 (horizontal, YouTube/PC)
    AND destino es 9:16 (vertical, Reel/TikTok/Story)
    THEN → reframe con focus en el centro o en el sujeto
    NOTA: Higgsfield usa IA para detectar el sujeto y seguirlo

ELSE IF video es 9:16 (vertical)
    AND destino es 1:1 (cuadrado, feed de IG)
    THEN → reframe con crop vertical
    
ELSE IF video es 4:3
    AND destino es 9:16
    THEN → reframe con pan automático

PASO 2: Revisar resultado
    - Verificar que el sujeto no quede cortado
    - Verificar que textos/gráficos no queden fuera de frame
    - Si hay problemas → regenerar con diferente focus point
```

### 43.4.2 Tabla de conversiones comunes

| Origen | Destino | Plataforma destino | Notas |
|---|---|---|---|
| 16:9 | 9:16 | Instagram Reels, TikTok, Stories | La más común. Higgsfield detecta sujeto |
| 16:9 | 1:1 | Feed de Instagram, Facebook | Crop centrado suele funcionar |
| 9:16 | 16:9 | YouTube | Se pierde mucho — considerar blur sides |
| 9:16 | 1:1 | Feed de Instagram | Crop del centro |
| 4:3 | 9:16 | Reels/TikTok | Necesita reframe + posible outpaint |
| 1:1 | 9:16 | Stories | Outpaint arriba/abajo o padding con brand |

## 43.5 upscale_image / upscale_video

### 43.5.1 Cuándo usar

```
IF la imagen viene de WhatsApp (compresión JPEG agresiva)
    THEN → upscale_image
    → Recupera detalle perdido por compresión
    
ELSE IF la foto es de un celular viejo / baja resolución
    THEN → upscale_image
    → Escalar a 2K/4K para uso en historias 1080x1920
    
ELSE IF el video se grabó en 720p o menos
    THEN → upscale_video
    → Mejorar para publicación en plataformas que penalizan baja res
    
ELSE IF la resolución ya es 1080p+
    THEN → NO upscalear
    → No vas a ganar calidad, solo tamaño de archivo
END
```

## 43.6 remove_background: workflow de cutout

### 43.6.1 Proceso completo

```
PASO 1: Preparar la imagen
    IF la foto tiene fondo desordenado
        THEN → remove_background directo
    ELSE IF la foto tiene fondo limpio (pared blanca, mesa)
        THEN → remove_background va a funcionar perfecto
    ELSE IF el producto tiene partes translúcidas (cables, etc.)
        THEN → remove_background + revisar bordes manualmente

PASO 2: Ejecutar remove_background
    → Input: imagen del producto
    → Output: PNG con canal alpha (fondo transparente)

PASO 3: Usar el cutout
    IF destino es historia de Instagram (Pillow)
        THEN → Usar como layer en allimport/historias/
    ELSE IF destino es video (Remotion)
        THEN → Importar como <Img> con fondo transparente
    ELSE IF destino es video (ffmpeg)
        THEN → Usar como overlay con alpha:
        ffmpeg -i fondo.mp4 -i producto.png -filter_complex "overlay=x:y" ...
    ELSE IF destino es web (landing)
        THEN → Copiar a web/public/ para usar en componentes React
```

## 43.7 TikTok publishing pipeline vía Higgsfield

### 43.7.1 Workflow completo

```
PASO 1: Conectar cuenta TikTok
    → tiktok_connect (una sola vez)
    → Verificar con tiktok_accounts

PASO 2: Preparar el video
    → Renderizar con Remotion o procesar con ffmpeg
    → Verificar: 9:16, <60s, formato MP4, audio incluido

PASO 3: Subir a Higgsfield
    → media_upload → media_confirm

PASO 4: Preparar publicación
    → tiktok_prepare_publish
    → Configurar: caption, hashtags, privacidad

PASO 5: Predecir viralidad (opcional pero recomendado)
    → virality_predictor
    → IF score < 50% → revisar hook, considerar re-editar
    → IF score >= 70% → publicar con confianza

PASO 6: Publicar
    → tiktok_publish
    → Verificar con tiktok_publish_status

PASO 7: Seguimiento
    → Verificar que se publicó correctamente
    → Anotar métricas a las 24h
```

### 43.7.2 Checklist de publicación TikTok

- [ ] Video en formato 9:16 (1080x1920)
- [ ] Duración menor a 60 segundos (ideal: 15-30s)
- [ ] Audio incluido en el archivo (no mudo)
- [ ] Caption escrito con hashtags relevantes
- [ ] Sin marcas de agua de otras plataformas
- [ ] Hook en el primer segundo verificado
- [ ] virality_predictor ejecutado (score anotado)
- [ ] Cuenta TikTok conectada y verificada

## 43.8 Virality predictor: uso e interpretación

### 43.8.1 Qué analiza

| Métrica | Qué mide | Peso en el score |
|---|---|---|
| Hook strength | Impacto del primer segundo | Alto |
| Retention risk | Probabilidad de que el viewer se vaya | Alto |
| Creative performance | Calidad visual/auditiva | Medio |
| Audience response | Predicción de engagement | Medio |
| Attention score | Capacidad de mantener la atención | Alto |

### 43.8.2 Árbol de decisión post-predicción

```
IF score total >= 80%
    THEN → Publicar inmediatamente
    → Este video tiene alto potencial viral
    
ELSE IF score total >= 60%
    THEN → Publicar, pero considerar mejoras menores
    IF hook_strength < 70%
        THEN → Re-editar los primeros 2 segundos
        → Agregar SFX más impactante, corte más rápido
    IF retention_risk > 50%
        THEN → Acortar el video, eliminar partes lentas
        → Agregar pattern interrupt en el punto de caída
    
ELSE IF score total >= 40%
    THEN → Re-editar antes de publicar
    → Revisar estructura completa
    → Cambiar hook, agregar más cortes, mejorar audio
    
ELSE IF score total < 40%
    THEN → Replantear el video desde cero
    → El concepto probablemente no funciona
    → Probar con otro ángulo/gancho/tema
END
```

## 43.9 Shorts Studio workflow

### 43.9.1 Proceso guiado

```
1. shorts_studio_create → Iniciar nuevo proyecto de short
2. Seguir el wizard interactivo:
   a. Elegir tema/guion
   b. Seleccionar estilo visual
   c. Agregar música/voz
   d. Configurar duración y formato
3. shorts_studio_status → Monitorear progreso
4. Descargar resultado
5. Post-procesar con ffmpeg si hace falta (normalización audio, subtítulos)
```

### 43.9.2 Presets disponibles

```bash
# Listar presets existentes
→ shorts_studio_list_presets

# Crear preset personalizado para All Import
→ shorts_studio_create_preset
   estilo: "dark luxury tech"
   colores: navy + cyan
   música: "upbeat electronic minimal"
```

## 43.10 Integración con ffmpeg post-procesamiento

### 43.10.1 Pipeline: Higgsfield → ffmpeg → Publicación

```
PASO 1: Generar con Higgsfield
    → generate_video / shorts_studio / reframe
    → Descargar el resultado

PASO 2: Post-procesar con ffmpeg
    → Normalizar audio: loudnorm=I=-16:TP=-1.5:LRA=11
    → Agregar subtítulos: -vf "subtitles=subs.srt:..."
    → Agregar música de fondo: amix con volumen bajo
    → Agregar logo/watermark: overlay
    → Verificar formato: 1080x1920, H.264, AAC

PASO 3: QA
    → Revisar los primeros 3 segundos (hook)
    → Verificar audio (no clipping, volumen uniforme)
    → Verificar subtítulos (timing, legibilidad)
    → virality_predictor (opcional)

PASO 4: Publicar
    → tiktok_publish vía Higgsfield
    → O subir manualmente a Instagram
```

### 43.10.2 Comando típico de post-procesamiento

```bash
# Pipeline completo post-Higgsfield
ffmpeg -i higgsfield_output.mp4 -i musica_fondo.mp3 -filter_complex "
  [0:v]scale=1080:1920:force_original_aspect_ratio=decrease,
       pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a[v_scaled];
  [v_scaled]subtitles=subs.srt:force_style='FontName=Montserrat Alternates,FontSize=22,PrimaryColour=&H00fafaf8,OutlineColour=&H001a0f0a,BorderStyle=3,Outline=2,MarginV=60'[v_sub];
  [0:a]loudnorm=I=-16:TP=-1.5:LRA=11[a_norm];
  [1:a]volume=0.12[a_bg];
  [a_norm][a_bg]amix=inputs=2:duration=first:dropout_transition=2[outa]
" -map "[v_sub]" -map "[outa]" \
  -c:v libx264 -preset slow -crf 18 \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  final_para_publicar.mp4
```

## 43.11 Prompt engineering para resultados consistentes

### 43.11.1 Reglas de prompt para Higgsfield

1. **Ser específico:** "dark navy blue background (#0a0f1a)" en vez de "dark background"
2. **Describir iluminación:** "studio lighting, soft shadows from upper left"
3. **Evitar texto en prompts de imagen:** Higgsfield no renderiza texto bien
4. **Estilo primero:** "product photography, luxury feel" al inicio del prompt
5. **Referencia de calidad:** "8K, high detail, professional" al final
6. **Negaciones explícitas:** agregar "no text, no watermark, no blur" si hace falta
7. **Consistencia:** mantener un prompt base y variar solo el sujeto

### 43.11.2 Template de prompt maestro para All Import

```
Base: "product photography, [PRODUCTO], on dark navy surface,
       cyan accent lighting, studio setup, soft shadows,
       luxury tech aesthetic, high detail, 8K quality,
       no text, no watermark"

Variables:
  [PRODUCTO] = "wireless TWS earbuds in white charging case"
             | "portable bluetooth speaker, cylindrical"
             | "20000mAh power bank, matte black"
             | "USB-C fast charging cable, braided"
             | "football jersey, folded neatly"
```

### 43.11.3 Checklist de QA para Higgsfield

- [ ] La imagen/video generada no tiene artefactos visibles
- [ ] Los colores son consistentes con la marca (navy, cyan)
- [ ] No hay texto generado por IA visible en la imagen
- [ ] La composición es limpia y centrada
- [ ] Si es video: el movimiento es fluido, sin saltos
- [ ] Si es para overlay: el fondo es limpio para remove_background
- [ ] El resultado se descargó en la mejor resolución disponible
- [ ] Se anotó el prompt usado para poder reproducir resultados similares

---

# Capítulo 44: Calendario de contenido y planificación de edición

## 44.1 Estructura del calendario de contenido para All Import

### 44.1.1 Dos cuentas, dos estrategias

| Aspecto | @allimport.cba | @_agus_moreno_ |
|---|---|---|
| **Función** | Vidriera / catálogo | Crecimiento / marca personal |
| **Logo** | Sí, centrado | No |
| **Alineación textos** | Centrada | Izquierda |
| **Tono** | Marca, profesional | Personal, cercano |
| **Frecuencia reels** | 1-2/semana (showcase producto) | 3/semana (autoridad + proceso + valor) |
| **Frecuencia historias** | 2-4/día (producto, stock) | 4-10/día (lifestyle + emprender + producto sutil) |
| **Venta directa** | Sí (catálogo, precios) | No (valor primero, CTA suave) |
| **Contenido tipo** | Fotos de producto, precios, stock | Reels a cámara, detrás de escena, mentalidad |

### 44.1.2 Diagrama de flujo semanal

```
SEMANA TIPO:

LUN ──── Reel autoridad (@_agus_moreno_) ──── Historias ambas cuentas
         │
MAR ──── Sin reel ──── Historias ambas cuentas
         │
MIE ──── Reel proceso (@_agus_moreno_) ──── Historias ambas cuentas
         │    Reel producto (@allimport.cba, si hay stock nuevo)
         │
JUE ──── Sin reel ──── Historias ambas cuentas
         │
VIE ──── Reel valor (@_agus_moreno_) ──── Historias ambas cuentas
         │    Reel producto (@allimport.cba, si hay promoción)
         │
SAB ──── Sin reel ──── Historias lifestyle (más relajadas)
         │
DOM ──── PLANIFICACIÓN ──── Guiones semana siguiente + banco historias
```

## 44.2 Workflow de edición en batch

### 44.2.1 Concepto: grabar una vez, editar muchas

```
SESIÓN DE GRABACIÓN (1-2 horas, 1 vez por semana):

1. Preparar guiones (3 reels + 5-7 historias a cámara)
2. Preparar setup:
   - Trípode/soporte para celular
   - Iluminación (natural o ring light)
   - Fondo limpio (pared, cortina, producto)
3. Grabar TODO seguido:
   - Los 3 reels (10 min cada uno de grabación bruta)
   - 5-7 clips a cámara para historias (30s-1min cada uno)
   - B-roll de producto (5-10 clips de 10-15s)
   - Unboxing si hay stock nuevo
4. Transferir archivos al repo / carpeta de trabajo

SESIÓN DE EDICIÓN (después de grabar):

1. Cortar silencios: node cut-silence.mjs --input raw/*.mp4
2. Editar reels (20-30 min cada uno):
   - Cortar tomas malas
   - Agregar subtítulos
   - Agregar música + SFX
   - Exportar 1080x1920
3. Procesar historias:
   - Batch scale a 1080x1920
   - Agregar overlays de marca
   - Batch export
4. QA: revisar cada pieza final
```

### 44.2.2 Árbol de decisión: batch vs individual

```
IF tenés 3+ reels para editar
    THEN → batch editing
    → Grabar todos → cortar silencios en batch → editar seguido
    → Ahorrás tiempo de setup (iluminación, equipo, mentalidad)
    
ELSE IF es un reel reactivo (trending audio, evento de última hora)
    THEN → edición individual
    → Grabar, editar y publicar en el momento
    
ELSE IF son historias
    THEN → siempre batch
    → Preparar 7 días de historias en 1 sesión de edición
    → Usar banco de historias pre-editadas (allimport/historias/)
END
```

## 44.3 Pilares de contenido y cómo el estilo de edición se mapea a cada uno

### 44.3.1 Pilares de @_agus_moreno_

| Pilar | Objetivo | Estilo de edición | Música | Cortes |
|---|---|---|---|---|
| **Autoridad / Mentalidad** | Posicionarse como referente | Jump cuts rápidos, a cámara, subtítulos destacados | Motivacional, sin letra o baja | Cada 3-5s |
| **Detrás de escena** | Humanizar, generar confianza | B-roll + voz en off, transiciones suaves | Lo-fi, chill | Cada 4-6s |
| **Valor práctico** | Dar tip aplicable | Screen recording + a cámara, text callouts | Minimal, tech | Cada 2-4s |
| **Producto (sutil)** | Mostrar sin vender directo | Close-ups, ken burns, transiciones cinematográficas | Elegante, beat marcado | Cada 3-5s |

### 44.3.2 Pilares de @allimport.cba

| Pilar | Objetivo | Estilo de edición | Música | Template |
|---|---|---|---|---|
| **Producto nuevo** | Mostrar stock | Remotion template `Reel` | Beat electrónico | Foto + precio + badge |
| **Comparación** | Destacar valor | Remotion template `Compare` | Sin música / SFX | Lado a lado |
| **Stock / Urgencia** | FOMO real (solo si es verdad) | Texto grande RED + countdown | Riser + impact | Countdown |
| **Catálogo** | Mostrar variedad | Scroll de productos | Lo-fi | `Catalog` template |

## 44.4 Template de agenda semanal de edición

| Día | Tareas de edición | Tiempo estimado | Output |
|---|---|---|---|
| **Domingo** | Planificar semana + escribir guiones | 1h | 3 guiones de reel + temas de historias |
| **Lunes AM** | Grabar 3 reels + historias (batch) | 1.5h | Archivos brutos |
| **Lunes PM** | Cortar silencios (batch) + editar Reel 1 | 1h | Reel 1 listo para publicar |
| **Martes** | Editar Reel 2 + procesar historias Mar-Jue | 1h | Reel 2 + historias batch |
| **Miércoles** | Editar Reel 3 + historias Vie-Dom | 1h | Reel 3 + historias batch |
| **Jueves** | Generar contenido @allimport.cba (Remotion) | 30min | 1-2 reels de producto |
| **Viernes** | QA de todo + programar publicaciones | 30min | Todo verificado |
| **Sábado** | Descanso de edición | 0 | — |

**Total semanal estimado: ~5.5 horas de edición.**

## 44.5 Workflow de repurposing (1 grabación → múltiples piezas)

### 44.5.1 Pipeline de repurposing

```
1 SESIÓN DE GRABACIÓN (reel de 60s a cámara)
        │
        ├─→ REEL completo (9:16, 30-60s)
        │     └─ Publicar en IG Reels + TikTok
        │
        ├─→ CLIP corto (9:16, 15s) — el mejor momento del reel
        │     └─ Publicar como Story + YouTube Short
        │
        ├─→ CARRUSEL (1:1, 3-5 slides) — puntos clave como texto
        │     └─ Publicar en feed de IG
        │
        ├─→ AUDIO extraído → transcripción → texto para caption
        │     └─ Usar como post de texto en otras plataformas
        │
        └─→ THUMBNAIL (1080x1080) — frame del reel + texto overlay
              └─ Cover del reel en el feed
```

### 44.5.2 Comandos de repurposing

```bash
# De reel a clip corto (15s del hook)
ffmpeg -i reel_completo.mp4 \
  -ss 0 -t 15 \
  -c:v libx264 -crf 18 -c:a aac \
  clip_story.mp4

# De reel vertical a cuadrado (para feed)
ffmpeg -i reel_completo.mp4 \
  -vf "crop=ih*(9/16):ih:(iw-ih*(9/16))/2:0,scale=1080:1080" \
  -c:v libx264 -crf 18 -c:a aac \
  cuadrado_feed.mp4

# Extraer audio para transcripción
ffmpeg -i reel_completo.mp4 \
  -vn -c:a pcm_s16le \
  audio_para_transcribir.wav

# Generar thumbnail del frame 45 (1.5s) con overlay de texto
ffmpeg -i reel_completo.mp4 \
  -vf "select=eq(n\,45),scale=1080:1080,
       drawtext=text='3 tips para emprender':fontfile=allimport/historias/fonts/MontserratAlternates-Bold.ttf:fontcolor=#00d4d4:fontsize=64:x=(w-text_w)/2:y=(h-text_h)/2:box=1:boxcolor=#0a0f1a@0.7:boxborderw=20" \
  -vframes 1 \
  thumbnail.jpg
```

## 44.6 Planificación estacional y ajustes de edición

### 44.6.1 Calendario estacional para All Import (Argentina)

| Período | Eventos | Contenido prioritario | Ajuste de edición |
|---|---|---|---|
| **Enero-Febrero** | Vuelta de vacaciones, calor | Auriculares, power bank para viajes | Estilo veraniego, colores vivos |
| **Marzo** | Vuelta a clases, otoño | Auriculares para estudio, cables | Tono productivo, tips de estudio |
| **Abril-Mayo** | Día de la madre (oct en Arg, pero prep), otoño | Gift guides | Templates de regalo |
| **Junio-Julio** | Mundial 2026, invierno | Camisetas de fútbol, MÁXIMA prioridad | Edición deportiva, energía alta |
| **Agosto** | Día del niño | Parlantes, auriculares como regalo | Templates de regalo |
| **Septiembre** | Primavera, día del estudiante | Auriculares, tech accesible | Estilo fresco, juvenil |
| **Octubre** | Día de la madre (Arg) | Gift guides, combos | Edición elegante, dorado |
| **Noviembre** | Black Friday, CyberMonday | Ofertas reales, comparaciones | Edición urgencia (RED), countdown |
| **Diciembre** | Navidad, fin de año | Gift guides, últimas unidades | Edición festiva, GOLD + RED |

### 44.6.2 Ajustes de edición por estación

```
IF estamos en temporada de Mundial (Jun-Jul 2026)
    THEN
        - Templates de camisetas con animación de bandera
        - Música: cantos de cancha, percusión
        - Colores: agregar colores del equipo al tema
        - Urgencia real: "Últimas camisetas de Argentina"
        - Frecuencia: subir a 5 reels/semana en @allimport.cba

ELSE IF estamos en Black Friday / CyberMonday
    THEN
        - Templates de comparación de precios (precio tachado vs actual)
        - Countdown template activo
        - Color RED prominente para urgencia
        - SOLO si la oferta es real — nunca falsa escasez

ELSE IF estamos en temporada de regalos (Día madre/niño/Navidad)
    THEN
        - Templates de "guía de regalos"
        - Tono más cálido, usar GOLD
        - Combos y bundles
        - CTA: "Regalale algo que va a usar todos los días"

ELSE (temporada normal)
    THEN
        - Templates estándar
        - Foco en valor y autoridad en @_agus_moreno_
        - Catálogo rotativo en @allimport.cba
END
```

## 44.7 Gestión de biblioteca de assets y footage

### 44.7.1 Estructura de carpetas recomendada

```
allimport/media/          (fuera del repo, .gitignore)
├── raw/                  ← Archivos brutos de cámara
│   ├── 2026-08-03/       ← Por fecha de grabación
│   │   ├── reel-autoridad-raw.mp4
│   │   ├── reel-proceso-raw.mp4
│   │   └── broll-producto-*.mp4
│   └── 2026-08-10/
├── edited/               ← Videos editados listos para publicar
│   ├── reels/
│   ├── stories/
│   └── tiktok/
├── assets/               ← Assets reutilizables
│   ├── logos/
│   ├── fondos/
│   ├── sfx/
│   ├── musica/
│   └── cutouts/          ← Productos sin fondo (remove_background)
├── templates/            ← Templates de ffmpeg / Remotion
└── archive/              ← Contenido publicado (por mes)
    ├── 2026-07/
    └── 2026-08/
```

### 44.7.2 Checklist: preparación semanal de contenido

- [ ] Guiones de los 3 reels escritos y revisados
- [ ] Temas de historias para cada día definidos
- [ ] Assets necesarios preparados (fotos de producto, fondos, música)
- [ ] Sesión de grabación agendada (día y hora)
- [ ] Equipo cargado (celular, ring light, trípode)
- [ ] Carpeta de la semana creada en `raw/YYYY-MM-DD/`
- [ ] Templates de Remotion actualizados si hay producto nuevo
- [ ] Calendario estacional revisado (hay evento próximo?)
- [ ] Banco de historias tiene al menos 3 días de buffer

## 44.8 Estimación de tiempos por tipo de video

| Tipo de video | Grabación | Edición | Post-producción | Total |
|---|---|---|---|---|
| Reel a cámara (30s) | 10-15 min | 20-30 min | 10 min (subs+audio) | ~50 min |
| Reel a cámara (60s) | 15-20 min | 30-45 min | 15 min | ~1h 15min |
| Story editada (foto+overlays) | 0 (foto existente) | 5-10 min | 5 min | ~15 min |
| Story a cámara (30s) | 5 min | 10 min | 5 min | ~20 min |
| Reel de producto (Remotion) | 0 (foto existente) | 10 min (props) | 5 min (render+QA) | ~15 min |
| Video Higgsfield (generado) | 0 | 5 min (prompt) | 15 min (post-ffmpeg) | ~20 min |
| Carrusel (5 slides) | 0 | 20-30 min | 10 min | ~40 min |
| YouTube Short (recut de reel) | 0 | 10 min | 5 min | ~15 min |

---

# Capítulo 45: Troubleshooting — solución de problemas comunes

## 45.1 Audio/video fuera de sync: diagnóstico y corrección

### 45.1.1 Diagnóstico

```
SÍNTOMA: El audio se escucha antes o después del video

PASO 1: Determinar si el desync es constante o progresivo
    → Mirar al inicio: ¿está en sync?
    → Mirar a la mitad: ¿está en sync?
    → Mirar al final: ¿está en sync?
    
    IF desync constante (mismo desfase todo el video)
        THEN → El offset se introdujo en la edición
        → Solución: adelay o -itsoffset
    ELSE IF desync progresivo (empeora con el tiempo)
        THEN → Diferencia de sample rate o framerate variable
        → Solución: re-encodear con formato fijo
```

### 45.1.2 Soluciones

```bash
# Desync constante: retrasar audio 200ms
ffmpeg -i desync.mp4 \
  -af "adelay=200|200" \
  -c:v copy \
  fixed.mp4

# Desync constante: adelantar audio 200ms (retrasar video)
ffmpeg -i desync.mp4 \
  -itsoffset 0.2 -i desync.mp4 \
  -map 0:v -map 1:a \
  -c:v copy -c:a copy \
  fixed.mp4

# Desync progresivo: forzar framerate constante + resamplear audio
ffmpeg -i desync.mp4 \
  -vf "fps=30" \
  -af "aresample=async=1:first_pts=0" \
  -c:v libx264 -crf 18 \
  -c:a aac -b:a 192k \
  fixed.mp4
```

## 45.2 Degradación de calidad en exportación

### 45.2.1 Causas y soluciones

| Causa | Síntoma | Solución |
|---|---|---|
| CRF muy alto | Video pixelado, bloques visibles | Bajar CRF: de 28 a 18-20 |
| Doble compresión | Calidad inferior al original | Usar `-c:v copy` cuando no hay filtros |
| Resolución incorrecta | Video borroso después de escalar | Escalar UP con filtros de calidad: `scale=flags=lanczos` |
| Bitrate de audio bajo | Audio metálico, artefactos | Subir bitrate: `-b:a 192k` mínimo, `320k` ideal |
| Pixel format incorrecto | Colores apagados o banding | Forzar `format=yuv420p` para compatibilidad |
| Profile H.264 incorrecto | No se reproduce en algunos dispositivos | `-profile:v high -level 4.0` |

### 45.2.2 Comando de export máxima calidad

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slower \
  -crf 16 \
  -profile:v high \
  -level 4.2 \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 256k \
  -ar 48000 \
  -movflags +faststart \
  output_hq.mp4
```

## 45.3 Banding de color en degradados

### 45.3.1 El problema

El banding aparece como "escalones" visibles en degradados suaves, especialmente en fondos oscuros (como el NAVY de All Import). Es causado por profundidad de color insuficiente (8 bits) y compresión agresiva.

### 45.3.2 Prevención y corrección

```bash
# Prevención: usar 10-bit si el codec lo soporta
ffmpeg -i input.mp4 \
  -c:v libx264 -crf 18 -pix_fmt yuv420p10le \
  output_10bit.mp4

# Corrección: agregar dithering sutil (ruido de grano)
ffmpeg -i banded.mp4 \
  -vf "noise=alls=3:allf=t+u" \
  -c:v libx264 -crf 18 \
  output_dithered.mp4

# Corrección alternativa: unsharp + noise combo
ffmpeg -i banded.mp4 \
  -vf "unsharp=3:3:0.5:3:3:0.5,noise=alls=2:allf=t" \
  -c:v libx264 -crf 17 \
  output_fixed.mp4
```

### 45.3.3 Árbol de decisión: banding

```
IF el banding aparece en fondos oscuros (navy, negro)
    THEN
        IF el source es 8-bit
            THEN → agregar grain/noise sutil: noise=alls=3:allf=t
        ELSE IF el CRF es muy alto (>23)
            THEN → bajar CRF a 18 o menos
        ELSE IF es un degradado generado (no footage real)
            THEN → generar en 10-bit desde el origen (Remotion/Pillow)
ELSE IF el banding aparece después de color grading
    THEN → aplicar el grading en profundidad de color alta, luego exportar
    → Workflow: input → 16bit processing → dither → 8bit output
END
```

## 45.4 Clipping y distorsión de audio

### 45.4.1 Detección

```bash
# Detectar picos de audio
ffmpeg -i input.mp4 \
  -af "volumedetect" \
  -f null - 2>&1 | grep -E "max_volume|mean_volume"

# Si max_volume > 0 dB → hay clipping
# Si max_volume > -1 dB → riesgo de clipping
```

### 45.4.2 Corrección

```bash
# Reducir volumen para eliminar clipping
ffmpeg -i clipped.mp4 \
  -af "volume=-3dB" \
  -c:v copy \
  fixed.mp4

# Normalización completa (EBU R128)
ffmpeg -i input.mp4 \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=summary" \
  -c:v copy \
  normalized.mp4

# Compresor para reducir rango dinámico (evitar picos)
ffmpeg -i input.mp4 \
  -af "acompressor=threshold=-20dB:ratio=4:attack=5:release=50" \
  -c:v copy \
  compressed.mp4
```

### 45.4.3 Tabla de niveles recomendados

| Elemento | Nivel objetivo | Techo (TP) | Notas |
|---|---|---|---|
| Voz principal | -16 LUFS | -1.5 dBTP | Estándar para redes sociales |
| Música de fondo | -28 a -24 LUFS | -3 dBTP | Debajo de la voz, no competir |
| SFX | -20 a -16 LUFS | -1.5 dBTP | Picos controlados para impacto |
| Mix final | -16 LUFS | -1.5 dBTP | Instagram/TikTok penalizan audio bajo |

## 45.5 Problemas de renderizado de subtítulos

| Problema | Causa | Solución |
|---|---|---|
| Subtítulos no aparecen | Ruta incorrecta al .srt/.ass | Verificar ruta absoluta o relativa al CWD de ffmpeg |
| Fuente incorrecta | Font no encontrada | Usar `fontsdir=ruta/` o instalar la fuente |
| Subtítulos cortados en bordes | MarginV/MarginL insuficiente | Aumentar márgenes en force_style o ASS |
| Timing incorrecto | SRT desfasado | Ajustar timestamps en el SRT |
| Caracteres especiales (ñ, á) | Encoding incorrecto | Guardar SRT en UTF-8 sin BOM |
| Subtítulos demasiado chicos | FontSize para resolución incorrecta | Escalar FontSize proporcionalmente a la resolución |
| Subtítulos con fondo negro | BackColour opaco | Cambiar alpha: `BackColour=&H80000000` (semi) |

## 45.6 Incompatibilidades de formato de archivo

### 45.6.1 Tabla de conversiones

| Origen | Problema | Conversión recomendada |
|---|---|---|
| `.mov` (iPhone) | No se reproduce en web/Android | `ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4` |
| `.mkv` | Instagram no acepta | `ffmpeg -i input.mkv -c:v copy -c:a copy output.mp4` (si codecs compatibles) |
| `.avi` | Antiguo, sin soporte moderno | `ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4` |
| `.webm` (VP9) | No todas las apps aceptan | `ffmpeg -i input.webm -c:v libx264 -c:a aac output.mp4` |
| `.ts` (transport stream) | Fragmentado | `ffmpeg -i input.ts -c:v copy -c:a copy output.mp4` |
| `.hevc`/`.h265` (Android) | Incompatible con algunos editores | Re-encodear a H.264 |
| `.gif` | Sin audio, baja calidad | Convertir a MP4 con paleta expandida |

## 45.7 Problemas de rendimiento

### 45.7.1 Árbol de decisión: video lento de procesar

```
IF el proceso es lento en general
    THEN
        IF estás usando preset=slow o slower
            THEN → cambiar a preset=fast para pruebas, slow solo para export final
        ELSE IF el video es 4K y no necesitás 4K
            THEN → escalar a 1080p antes de procesar: -vf "scale=1080:-1"
        ELSE IF usás filter_complex con muchos filtros
            THEN → verificar -filter_threads 4 -filter_complex_threads 4
        ELSE IF tenés GPU
            THEN → usar encoder de hardware (-c:v h264_nvenc, h264_vaapi, h264_videotoolbox)

ELSE IF se queda sin memoria (OOM)
    THEN
        IF procesás archivos >4GB
            THEN → procesar en segmentos con trim+concat
        ELSE IF usás minterpolate
            THEN → es extremadamente memory-intensive, reducir resolución primero
        ELSE IF tenés muchos inputs simultáneos
            THEN → reducir, procesar en etapas

ELSE IF el disco se llena
    THEN
        → Limpiar `out/` y archivos temporales
        → Verificar que no generés frames PNG intermedios sin necesidad
        → Usar pipe en vez de archivo intermedio: ffmpeg ... -f rawvideo pipe: | ffmpeg ...
END
```

## 45.8 Fallos de subida a plataformas

### 45.8.1 Requisitos por plataforma

| Plataforma | Formato | Resolución | Duración max | Tamaño max | Codec video | Codec audio |
|---|---|---|---|---|---|---|
| Instagram Reels | MP4 | 1080x1920 | 90s | 250 MB | H.264 | AAC |
| Instagram Stories | MP4 | 1080x1920 | 60s | 250 MB | H.264 | AAC |
| TikTok | MP4 | 1080x1920 | 10 min | 287.6 MB | H.264 | AAC |
| YouTube Shorts | MP4 | 1080x1920 | 60s | 256 MB | H.264/H.265 | AAC |
| YouTube (largo) | MP4 | hasta 4K | 12h | 256 GB | H.264/H.265/VP9 | AAC/Opus |
| WhatsApp Status | MP4 | 1080x1920 | 30s | 16 MB | H.264 | AAC |
| Facebook Reels | MP4 | 1080x1920 | 90s | 4 GB | H.264 | AAC |

### 45.8.2 Comando de export por plataforma

```bash
# Instagram Reels / Stories (seguro)
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -profile:v high -level 4.0 \
  -c:a aac -b:a 192k -ar 44100 \
  -movflags +faststart \
  -t 90 \
  output_ig.mp4

# WhatsApp Status (limitado a 16MB)
ffmpeg -i input.mp4 \
  -vf "scale=720:1280,format=yuv420p" \
  -c:v libx264 -preset medium -crf 28 \
  -c:a aac -b:a 96k -ar 44100 \
  -movflags +faststart \
  -t 30 \
  -fs 15M \
  output_wa.mp4
```

## 45.9 Fuentes faltantes / renderizado incorrecto

```
IF el texto se renderiza con una fuente genérica (sans-serif default)
    THEN
        PASO 1: Verificar que la fuente existe en la ruta indicada
            ls allimport/historias/fonts/MontserratAlternates-*.ttf
        PASO 2: En ffmpeg drawtext:
            fontfile=allimport/historias/fonts/MontserratAlternates-Bold.ttf
        PASO 3: En ffmpeg subtitles/ass:
            fontsdir=allimport/historias/fonts/
        PASO 4: En Remotion:
            Verificar que loadFont() se ejecuta antes del primer render
        PASO 5: En Python/Pillow (historias):
            Verificar ImageFont.truetype(ruta, tamaño)

IF la fuente se renderiza pero con caracteres rotos (ñ, á, é)
    THEN → Verificar encoding UTF-8 en el texto source
    → En SRT: guardar como UTF-8 sin BOM
    → En ffmpeg drawtext: text_shaping=1 (habilitar shaping)
```

## 45.10 Gestión de memoria y disco durante edición

### 45.10.1 Limpieza periódica

```bash
# Ver espacio en disco
df -h .

# Ver tamaño de carpetas de trabajo
du -sh allimport/video/out/ allimport/media/raw/ allimport/media/edited/

# Limpiar renders intermedios
rm -rf allimport/video/out/*.mp4
rm -rf allimport/media/raw/*/processed_*

# Limpiar archivos de estabilización
rm -f transforms.trf

# Mover contenido publicado a archive
mv allimport/media/edited/reels/publicado_* allimport/media/archive/2026-08/
```

## 45.11 Árbol de decisión general: troubleshooting por síntoma

```
SÍNTOMA: "El video se ve negro"
    → format=yuv420p faltante
    → O color space incompatible
    → O setpts no reseteado después de trim

SÍNTOMA: "El audio suena metálico / robótico"
    → Bitrate de audio muy bajo (subir a 192k+)
    → O sample rate incompatible (forzar -ar 44100 o 48000)

SÍNTOMA: "El video se congela pero el audio sigue"
    → Framerate variable (VFR) del celular
    → Forzar CFR: -vf "fps=30"

SÍNTOMA: "El archivo es enorme (GB para un video corto)"
    → CRF muy bajo (subir a 18-20)
    → O preset ultrafast (usa más espacio para misma calidad)
    → O codec sin comprimir (verificar -c:v libx264)

SÍNTOMA: "ffmpeg dice 'filter not found'"
    → Filtro no compilado en tu versión de ffmpeg
    → Verificar con: ffmpeg -filters | grep nombre_filtro
    → Instalar versión completa: apt install ffmpeg (o compilar con flags)

SÍNTOMA: "El video no se sube a Instagram"
    → Verificar: formato MP4, codec H.264, audio AAC
    → Verificar: resolución 1080x1920 exacta
    → Verificar: -movflags +faststart
    → Verificar: duración dentro del límite

SÍNTOMA: "Los subtítulos se ven en preview pero no en el export"
    → Los subtítulos están como stream separado (no quemados)
    → Usar -vf "subtitles=subs.srt" para quemar

SÍNTOMA: "Remotion render falla con error de Chrome"
    → Verificar Chrome/Chromium instalado
    → Verificar que la fuente se cargó (loadFont async completado)
    → Probar con --gl=angle o --gl=swiftshader

SÍNTOMA: "Higgsfield genera imagen con texto ilegible"
    → Nunca pedir texto en prompts de generación de imagen
    → Agregar texto con ffmpeg/Remotion/Pillow en post-producción
```

## 45.12 Referencia completa de mensajes de error (30+)

| # | Mensaje de error | Causa | Solución |
|---|---|---|---|
| 1 | `No such file or directory` | Ruta incorrecta | Verificar ruta, usar rutas absolutas |
| 2 | `Invalid data found when processing input` | Archivo corrupto | Re-descargar o re-grabar |
| 3 | `Discarding X subtitle packets` | Codec de subtítulos no compatible | Re-muxear: `-c:s mov_text` |
| 4 | `Output file is empty` | Todos los frames filtrados | Revisar condiciones de filtros (select, trim) |
| 5 | `Error initializing output stream` | Codec no soporta la resolución/formato | Verificar limitaciones del codec |
| 6 | `Discarding frame due to cropping` | Crop fuera de bounds | Verificar x+w<=W y y+h<=H |
| 7 | `av_interleaved_write_frame(): I/O error` | Disco lleno o permisos | `df -h` + verificar permisos |
| 8 | `Discarding X audio packets` | Stream de audio incompatible | Re-encodear audio: `-c:a aac` |
| 9 | `max_muxing_queue_size overflow` | Buffer lleno en muxer | Agregar `-max_muxing_queue_size 4096` |
| 10 | `Discarding frame (timestamp out of order)` | PTS desordenados | Agregar `-fflags +genpts` |
| 11 | `Error while filtering: Invalid argument` | Parámetros de filtro inválidos | Revisar sintaxis, comillas, escapes |
| 12 | `Discarding X video packets` | Decodificación fallida | Re-encodear el source |
| 13 | `Could not open input file` | Permisos o archivo bloqueado | `chmod +r file` o cerrar otro proceso |
| 14 | `Error while decoding stream` | Codec no soportado | Instalar codec: `apt install libavcodec-extra` |
| 15 | `swScaler: Warning: data is not aligned` | Resolución no múltiplo de 2 | Agregar `pad=ceil(iw/2)*2:ceil(ih/2)*2` |
| 16 | `DTS discontinuity` | Timestamps inconsistentes | `-fflags +genpts -avoid_negative_ts make_zero` |
| 17 | `File ended prematurely` | Descarga incompleta / grabación cortada | Intentar recuperar con `-err_detect ignore_err` |
| 18 | `Discarding frame (filter returning error)` | Filtro recibe datos inesperados | Verificar format de pixel antes del filtro |
| 19 | `Error opening filters!` | Sintaxis de filter_complex incorrecta | Revisar `;` entre filtros, `[pads]` nombrados |
| 20 | `Discarding subtitle packet` | SRT mal formateado | Verificar formato SRT (numeración, timestamps, encoding) |
| 21 | `Cannot create HTTP session` | Sin conexión o URL inválida | Verificar red, URL, protocolo habilitado |
| 22 | `Option X not found` | Versión de ffmpeg antigua | Actualizar ffmpeg a versión reciente |
| 23 | `Failed to configure output pad` | Filtro produce formato no compatible con el siguiente | Agregar `format=yuv420p` o `aformat=...` entre filtros |
| 24 | `Discarding X data packets` | Metadata/data streams no soportados | `-dn` para descartar data streams |
| 25 | `Discarding frame (discarded per target)` | `-target` incompatible | No usar `-target`, configurar manualmente |
| 26 | `frame rate differs from container` | FPS del stream vs container | `-r 30` para forzar framerate |
| 27 | `non monotonically increasing dts` | DTS desordenados | `-fflags +genpts` y re-encodear |
| 28 | `Discarding frame (discarded per -max_frames)` | Límite de frames alcanzado | Ajustar `-vframes` o `-t` |
| 29 | `Error initializing complex filters` | Error en grafo de filtros | Verificar que todos los pads se consuman |
| 30 | `Discarding X frames to seek` | Seek impreciso en codec intra-only | Usar `-accurate_seek` |
| 31 | `moov atom not found` | MP4 con moov al final + descarga parcial | `-movflags +faststart` en la fuente |
| 32 | `Auto-inserting h264_mp4toannexb` | Stream H.264 sin start codes | Normal en concat, no es error |

---

# Capítulo 46: Automatización del flujo de edición

## 46.1 Shell scripts para procesamiento en lote

### 46.1.1 Script maestro: procesar footage del día

```bash
#!/bin/bash
# procesar-dia.sh — Procesa todo el footage de una sesión de grabación
# Uso: ./procesar-dia.sh /ruta/a/raw/2026-08-03/

set -euo pipefail

RAW_DIR="${1:?Uso: ./procesar-dia.sh /ruta/a/raw/YYYY-MM-DD/}"
DATE=$(basename "$RAW_DIR")
OUT_DIR="allimport/media/edited/${DATE}"

# Colores de marca
NAVY="#0a0f1a"

mkdir -p "${OUT_DIR}/reels" "${OUT_DIR}/stories" "${OUT_DIR}/thumbs"

echo "=== Procesando footage de ${DATE} ==="

# PASO 1: Cortar silencios de todos los videos
echo "--- Paso 1: Cortando silencios ---"
for f in "${RAW_DIR}"/*.mp4; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .mp4)
  echo "  Procesando: ${base}"
  node allimport/video/scripts/cut-silence.mjs \
    --input "$f" \
    --output "${OUT_DIR}/reels/${base}-cut.mp4" \
    --threshold -30 \
    --min-silence 0.5 \
    --padding 0.15
done

# PASO 2: Normalizar audio de todos los cortes
echo "--- Paso 2: Normalizando audio ---"
for f in "${OUT_DIR}/reels"/*-cut.mp4; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .mp4)
  ffmpeg -y -i "$f" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" \
    -c:v copy \
    "${OUT_DIR}/reels/${base}-norm.mp4" 2>/dev/null
done

# PASO 3: Escalar todo a 1080x1920 con padding navy
echo "--- Paso 3: Escalando a 1080x1920 ---"
for f in "${OUT_DIR}/reels"/*-norm.mp4; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .mp4)
  ffmpeg -y -i "$f" \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=${NAVY},format=yuv420p" \
    -c:v libx264 -preset fast -crf 18 \
    -c:a aac -b:a 192k \
    -movflags +faststart \
    "${OUT_DIR}/reels/${base}-final.mp4" 2>/dev/null
done

# PASO 4: Generar thumbnails
echo "--- Paso 4: Generando thumbnails ---"
for f in "${OUT_DIR}/reels"/*-final.mp4; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .mp4)
  ffmpeg -y -i "$f" \
    -vf "select=eq(n\,45),scale=1080:-1" \
    -vframes 1 \
    "${OUT_DIR}/thumbs/${base}-thumb.jpg" 2>/dev/null
done

# Limpiar intermedios
echo "--- Limpiando archivos intermedios ---"
rm -f "${OUT_DIR}/reels"/*-cut.mp4
rm -f "${OUT_DIR}/reels"/*-norm.mp4

echo "=== Procesamiento completo ==="
echo "Archivos finales en: ${OUT_DIR}/reels/"
echo "Thumbnails en: ${OUT_DIR}/thumbs/"
ls -la "${OUT_DIR}/reels/"*-final.mp4 2>/dev/null || echo "(sin archivos finales)"
```

## 46.2 El pipeline de corte de silencios (cut-silence.mjs)

### 46.2.1 Ubicación y parámetros

El script vive en `allimport/video/scripts/cut-silence.mjs` y es la herramienta principal de automatización de edición.

```bash
node allimport/video/scripts/cut-silence.mjs \
  --input archivo.mp4 \
  [--output salida.mp4] \
  [--threshold -30] \
  [--min-silence 0.5] \
  [--padding 0.15]
```

| Parámetro | Default | Descripción |
|---|---|---|
| `--input` / `-i` | (obligatorio) | Archivo de entrada (video o audio) |
| `--output` / `-o` | `out/<nombre>-cut.<ext>` | Archivo de salida |
| `--threshold` | -30 | Umbral de silencio en dB. Más negativo = más estricto |
| `--min-silence` | 0.5 | Duración mínima de silencio para cortar (segundos) |
| `--padding` | 0.15 | Padding en cada borde del corte (para no comerse palabras) |

### 46.2.2 Cómo funciona internamente

```
1. detectSilence()
   → Usa ffmpeg silencedetect para encontrar tramos de silencio
   → Retorna array de {start, end}

2. computeKeepSegments()
   → Invierte: de "tramos de silencio" a "tramos que mantener"
   → Aplica padding para no cortar bordes de palabras
   → Filtra segmentos <0.01s

3. buildFilterComplex()
   → Genera filter_complex con trim+atrim+setpts+concat
   → Soporta video+audio o solo audio

4. ffmpeg
   → Ejecuta el filter_complex
   → Exporta con libx264 -preset veryfast -crf 18 + AAC 192k
```

### 46.2.3 Árbol de decisión: ajuste de parámetros

```
IF el resultado corta palabras (se come el inicio/final de frases)
    THEN → aumentar padding: --padding 0.25 o 0.30
    
ELSE IF el resultado deja silencios largos
    THEN → bajar min-silence: --min-silence 0.3
    
ELSE IF el resultado corta DEMASIADO (suena acelerado, sin pausas naturales)
    THEN → subir threshold: --threshold -35 o -40
    → O subir min-silence: --min-silence 0.8

ELSE IF el resultado no corta nada ("No se detectaron silencios")
    THEN → el threshold es muy estricto o hay ruido de fondo constante
    → Subir threshold: --threshold -25 o -20
    → Considerar limpiar ruido de fondo antes con highpass+lowpass

ELSE IF el video tiene música de fondo
    THEN → la música llena los "silencios" y silencedetect no los detecta
    → Opciones:
        a) Editar manualmente (no sirve cut-silence con música)
        b) Separar voz de música con AI (Demucs, etc.), cut-silence solo la voz, recombinar
END
```

## 46.3 Generación automatizada de subtítulos

### 46.3.1 Pipeline de subtítulos

```
PASO 1: Extraer audio
    ffmpeg -i video.mp4 -vn -c:a pcm_s16le -ar 16000 audio.wav

PASO 2: Transcribir (opciones)
    a) Whisper local: whisper audio.wav --language es --model medium --output_format srt
    b) API de transcripción (Gemini, etc.)
    c) Transcripción manual

PASO 3: Revisar y corregir
    - Abrir el .srt
    - Corregir errores de transcripción
    - Verificar timing contra el video
    - Marcar palabras clave para highlight (CYAN)

PASO 4: Quemar subtítulos
    ffmpeg -i video.mp4 \
      -vf "subtitles=subs.srt:force_style='...'" \
      -c:v libx264 -crf 18 -c:a copy output.mp4

PASO 5: QA
    - Reproducir el resultado completo
    - Verificar que ningún subtítulo cae en zona de recorte
    - Verificar legibilidad sobre fondos claros y oscuros
```

### 46.3.2 Script de generación de SRT con timestamps

```bash
#!/bin/bash
# generar-srt.sh — Extrae audio y genera SRT con Whisper
# Uso: ./generar-srt.sh video.mp4

INPUT="${1:?Uso: ./generar-srt.sh video.mp4}"
BASE=$(basename "$INPUT" .mp4)

echo "Extrayendo audio..."
ffmpeg -y -i "$INPUT" -vn -c:a pcm_s16le -ar 16000 "/tmp/${BASE}_audio.wav" 2>/dev/null

echo "Transcribiendo con Whisper..."
whisper "/tmp/${BASE}_audio.wav" \
  --language es \
  --model medium \
  --output_format srt \
  --output_dir .

echo "SRT generado: ${BASE}_audio.srt"
echo "Revisá el archivo y corregí errores antes de quemar."

# Limpiar
rm -f "/tmp/${BASE}_audio.wav"
```

## 46.4 Extracción automatizada de thumbnails

### 46.4.1 Script: thumbnail inteligente

```bash
#!/bin/bash
# generar-thumbnails.sh — Genera thumbnails de múltiples frames para elegir
# Uso: ./generar-thumbnails.sh video.mp4 [cantidad]

INPUT="${1:?Uso: ./generar-thumbnails.sh video.mp4 [cantidad]}"
COUNT="${2:-5}"
BASE=$(basename "$INPUT" .mp4)
OUTDIR="thumbs/${BASE}"

mkdir -p "$OUTDIR"

# Obtener duración
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$INPUT")
INTERVAL=$(echo "$DURATION / ($COUNT + 1)" | bc -l)

for i in $(seq 1 "$COUNT"); do
  TIMESTAMP=$(echo "$INTERVAL * $i" | bc -l)
  ffmpeg -y -ss "$TIMESTAMP" -i "$INPUT" \
    -vframes 1 \
    -vf "scale=1080:-1" \
    "${OUTDIR}/thumb_${i}.jpg" 2>/dev/null
  echo "  Thumbnail ${i}: ${TIMESTAMP}s → ${OUTDIR}/thumb_${i}.jpg"
done

echo "Thumbnails generados en ${OUTDIR}/"
```

## 46.5 File watcher para auto-procesamiento de footage nuevo

### 46.5.1 Script con inotifywait (Linux)

```bash
#!/bin/bash
# watch-footage.sh — Procesa automáticamente videos nuevos en una carpeta
# Requiere: inotify-tools (apt install inotify-tools)
# Uso: ./watch-footage.sh /ruta/a/carpeta/raw/

WATCH_DIR="${1:?Uso: ./watch-footage.sh /ruta/a/carpeta/}"
OUT_DIR="allimport/media/edited/auto"

mkdir -p "$OUT_DIR"

echo "Vigilando ${WATCH_DIR} para archivos nuevos..."

inotifywait -m -e close_write --format '%w%f' "$WATCH_DIR" | while read FILE; do
  # Solo procesar videos
  if [[ "$FILE" =~ \.(mp4|mov|mkv|avi)$ ]]; then
    BASE=$(basename "$FILE")
    BASE_NOEXT="${BASE%.*}"
    echo "[$(date '+%H:%M:%S')] Nuevo archivo detectado: ${BASE}"
    
    # Cortar silencios
    node allimport/video/scripts/cut-silence.mjs \
      --input "$FILE" \
      --output "${OUT_DIR}/${BASE_NOEXT}-cut.mp4"
    
    # Normalizar audio
    ffmpeg -y -i "${OUT_DIR}/${BASE_NOEXT}-cut.mp4" \
      -af "loudnorm=I=-16:TP=-1.5:LRA=11" \
      -c:v copy \
      "${OUT_DIR}/${BASE_NOEXT}-ready.mp4" 2>/dev/null
    
    rm -f "${OUT_DIR}/${BASE_NOEXT}-cut.mp4"
    echo "[$(date '+%H:%M:%S')] Procesado: ${OUT_DIR}/${BASE_NOEXT}-ready.mp4"
  fi
done
```

## 46.6 Generación de video basada en templates

### 46.6.1 Script: generar reel de producto desde JSON

```bash
#!/bin/bash
# generar-reel-producto.sh — Genera reel de producto con Remotion desde datos JSON
# Uso: ./generar-reel-producto.sh producto.json

JSON="${1:?Uso: ./generar-reel-producto.sh producto.json}"

cd allimport/video

# Leer datos del JSON
TITULO=$(jq -r '.titulo' "$JSON")
PRECIO=$(jq -r '.precio' "$JSON")
SUB=$(jq -r '.sub // ""' "$JSON")
BADGE=$(jq -r '.badge // "NUEVO"' "$JSON")
FOTO=$(jq -r '.foto' "$JSON")

echo "Generando reel para: ${TITULO} — ${PRECIO}"

npx remotion render src/index.ts Reel "out/${TITULO// /-}.mp4" \
  --props="{\"foto\":\"${FOTO}\",\"titulo\":\"${TITULO}\",\"precio\":\"${PRECIO}\",\"sub\":\"${SUB}\",\"badge\":\"${BADGE}\"}"

echo "Reel generado: out/${TITULO// /-}.mp4"
```

## 46.7 QA automatizada

### 46.7.1 Script de verificación de exportación

```bash
#!/bin/bash
# qa-video.sh — Verifica que un video cumple requisitos de publicación
# Uso: ./qa-video.sh video.mp4 [plataforma]

INPUT="${1:?Uso: ./qa-video.sh video.mp4 [instagram|tiktok|youtube|whatsapp]}"
PLATAFORMA="${2:-instagram}"

echo "=== QA de video: $(basename "$INPUT") ==="
echo "    Plataforma objetivo: ${PLATAFORMA}"
echo ""

# Obtener info del video
INFO=$(ffprobe -v error -show_entries stream=width,height,codec_name,r_frame_rate,bit_rate -show_entries format=duration,size -of json "$INPUT")

WIDTH=$(echo "$INFO" | jq -r '.streams[0].width // "N/A"')
HEIGHT=$(echo "$INFO" | jq -r '.streams[0].height // "N/A"')
VCODEC=$(echo "$INFO" | jq -r '.streams[0].codec_name // "N/A"')
FPS=$(echo "$INFO" | jq -r '.streams[0].r_frame_rate // "N/A"')
DURATION=$(echo "$INFO" | jq -r '.format.duration // "N/A"')
SIZE=$(echo "$INFO" | jq -r '.format.size // "N/A"')
SIZE_MB=$(echo "scale=2; ${SIZE} / 1048576" | bc 2>/dev/null || echo "N/A")

# Audio
ACODEC=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$INPUT" 2>/dev/null || echo "N/A")

echo "  Resolución:  ${WIDTH}x${HEIGHT}"
echo "  Codec video: ${VCODEC}"
echo "  Codec audio: ${ACODEC}"
echo "  FPS:         ${FPS}"
echo "  Duración:    ${DURATION}s"
echo "  Tamaño:      ${SIZE_MB} MB"
echo ""

ERRORES=0

# Verificaciones por plataforma
case "$PLATAFORMA" in
  instagram)
    [[ "$WIDTH" == "1080" && "$HEIGHT" == "1920" ]] || { echo "  [FAIL] Resolución no es 1080x1920"; ((ERRORES++)); }
    [[ "$VCODEC" == "h264" ]] || { echo "  [FAIL] Codec no es H.264"; ((ERRORES++)); }
    [[ "$ACODEC" == "aac" ]] || { echo "  [FAIL] Audio no es AAC"; ((ERRORES++)); }
    (( $(echo "$DURATION < 91" | bc -l) )) || { echo "  [FAIL] Duración >90s para Reels"; ((ERRORES++)); }
    (( $(echo "$SIZE_MB < 250" | bc -l) )) || { echo "  [FAIL] Tamaño >250MB"; ((ERRORES++)); }
    ;;
  tiktok)
    [[ "$VCODEC" == "h264" ]] || { echo "  [FAIL] Codec no es H.264"; ((ERRORES++)); }
    [[ "$ACODEC" == "aac" ]] || { echo "  [FAIL] Audio no es AAC"; ((ERRORES++)); }
    (( $(echo "$SIZE_MB < 287" | bc -l) )) || { echo "  [FAIL] Tamaño >287MB"; ((ERRORES++)); }
    ;;
  whatsapp)
    (( $(echo "$DURATION < 31" | bc -l) )) || { echo "  [FAIL] Duración >30s para WA Status"; ((ERRORES++)); }
    (( $(echo "$SIZE_MB < 16" | bc -l) )) || { echo "  [FAIL] Tamaño >16MB para WA"; ((ERRORES++)); }
    ;;
esac

# Verificaciones generales
ffmpeg -i "$INPUT" -af "volumedetect" -f null - 2>&1 | grep -q "max_volume: 0" && {
  echo "  [WARN] Audio en clipping (max_volume = 0 dB)"
}

echo ""
if [ "$ERRORES" -eq 0 ]; then
  echo "  [OK] Video aprobado para ${PLATAFORMA}"
else
  echo "  [FAIL] ${ERRORES} error(es) encontrado(s)"
fi
```

## 46.8 CI/CD para video

### 46.8.1 GitHub Actions para renderizado automático

```yaml
# .github/workflows/render-videos.yml
name: Render Remotion Videos

on:
  push:
    paths:
      - 'allimport/video/src/**'
      - 'allimport/video/public/**'
      - 'allimport/video/datos.json'

jobs:
  render:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: cd allimport/video && npm install
      - name: Install Chrome
        run: npx remotion browser ensure
      - name: Render all compositions
        run: cd allimport/video && npx remotion render src/index.ts --all --output-location=out/
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: rendered-videos
          path: allimport/video/out/
          retention-days: 7
```

## 46.9 Árbol de decisión: qué automatizar vs qué hacer manual

```
AUTOMATIZAR (siempre):
    ✓ Corte de silencios (cut-silence.mjs)
    ✓ Normalización de audio (loudnorm)
    ✓ Escalado a formato correcto (1080x1920)
    ✓ Generación de thumbnails
    ✓ Verificación QA de export (qa-video.sh)
    ✓ Conversión de formato (.mov → .mp4)
    ✓ Batch processing de footage nuevo

SEMI-AUTOMATIZAR (template + revisión humana):
    ~ Subtítulos (generar con Whisper → revisar manualmente)
    ~ Reels de producto (Remotion template → revisar resultado)
    ~ Historias de Instagram (Pillow template → verificar composición)

HACER MANUAL (requiere criterio creativo):
    ✗ Selección de tomas / qué cortar
    ✗ Timing de SFX y música
    ✗ Decisiones de color grading creativo
    ✗ Hook del reel (qué frase/imagen usar)
    ✗ Guiones y copy
    ✗ Selección de música por mood
```

## 46.10 Templates de scripts para tareas comunes

### 46.10.1 Tabla de scripts recomendados

| Script | Función | Input | Output |
|---|---|---|---|
| `procesar-dia.sh` | Pipeline completo de footage | Carpeta de brutos | Videos finales + thumbs |
| `cut-silence.mjs` | Cortar silencios | Video individual | Video sin silencios |
| `generar-srt.sh` | Transcripción → SRT | Video | Archivo .srt |
| `generar-thumbnails.sh` | Thumbnails de múltiples frames | Video + cantidad | JPGs para elegir |
| `watch-footage.sh` | Auto-procesar nuevos archivos | Carpeta a vigilar | Videos procesados |
| `qa-video.sh` | Verificar requisitos de plataforma | Video + plataforma | Reporte pass/fail |
| `batch-scale.sh` | Escalar batch a 1080x1920 | Carpeta de videos | Videos escalados |
| `batch-normalize.sh` | Normalizar audio en batch | Carpeta de videos | Videos normalizados |

## 46.11 Checklist: setup de automatización

- [ ] Node.js 18+ instalado
- [ ] ffmpeg y ffprobe instalados y en PATH
- [ ] `cut-silence.mjs` accesible en `allimport/video/scripts/`
- [ ] Carpeta de trabajo creada (`allimport/media/` o equivalente)
- [ ] Scripts de shell con permisos de ejecución (`chmod +x *.sh`)
- [ ] inotify-tools instalado (si usás file watcher en Linux)
- [ ] jq instalado (para scripts que leen JSON)
- [ ] bc instalado (para cálculos en shell)
- [ ] Whisper instalado (si usás generación automática de subtítulos)
- [ ] Fuente Montserrat Alternates en `allimport/historias/fonts/`
- [ ] Probado manualmente antes de automatizar cada paso
- [ ] Archivos intermedios se limpian automáticamente

---

# Capítulo 47: Glosario técnico completo

## Convención de formato

Cada término se presenta así:

> **Término** (categoría) — Definición. *Contexto de uso.* Relacionado: término1, término2.

---

### A

**AAC** (Audio) — Advanced Audio Coding. Codec de audio lossy estándar para archivos MP4. Es el codec de audio requerido por Instagram, TikTok y la mayoría de plataformas. *Usado en todos los exports de ffmpeg: `-c:a aac -b:a 192k`.* Relacionado: bitrate, codec, MP4.

**Aspect ratio** (Video) — Relación entre el ancho y alto de un video. Los formatos principales para redes son 9:16 (vertical/reels), 1:1 (cuadrado/feed), 16:9 (horizontal/YouTube). *Definido en el Capítulo 25 (safe zones) y Capítulo 26 (formatos).* Relacionado: resolución, reframe, crop.

**ASS** (Video) — Advanced SubStation Alpha. Formato de subtítulos con soporte de estilos avanzados (colores, fuentes, posición, animaciones). Más potente que SRT. *Usado para subtítulos de marca con colores All Import.* Relacionado: SRT, libass, subtítulos.

**Atrim** (ffmpeg) — Filtro de ffmpeg para recortar (trim) un segmento de audio. Equivalente de `trim` pero para streams de audio. *Siempre acompañado de `asetpts=PTS-STARTPTS`.* Relacionado: trim, setpts, concat.

**Audio ducking** (Audio) — Técnica de bajar automáticamente el volumen de la música cuando hay voz. *Implementado con `sidechaincompress` en ffmpeg.* Relacionado: sidechaincompress, amix, volumen.

### B

**B-roll** (Video) — Material visual complementario que se intercala con la toma principal. Close-ups de producto, manos, entorno, transiciones. *Capítulo 22 cubre captura y selección.* Relacionado: A-roll, cutaway, insert.

**Batch processing** (Automatización) — Procesar múltiples archivos de una vez con un script o loop. *Esencial para eficiencia: un loop de shell procesa 20 videos sin intervención.* Relacionado: shell script, loop, pipeline.

**Bitrate** (AV) — Cantidad de datos por segundo en un archivo de audio/video. Se mide en kbps (audio) o Mbps (video). Mayor bitrate = mayor calidad = mayor tamaño. *Audio: 192k mínimo. Video: controlado por CRF en vez de bitrate fijo.* Relacionado: CRF, calidad, compresión.

**Banding** (Color) — Artefacto visual donde un degradado suave se ve como "escalones" de color discretos. Común en fondos oscuros con compresión agresiva. *Solución: agregar grain sutil o exportar en 10-bit.* Relacionado: dithering, profundidad de color, degradado.

### C

**Chroma key** (Video) — Técnica de eliminar un color específico (generalmente verde) del fondo para reemplazarlo por otro contenido. *En ffmpeg: filtro `chromakey`.* Relacionado: green screen, colorkey, compositing.

**Clipping** (Audio) — Distorsión causada cuando la señal de audio excede 0 dBFS (el máximo digital). Se escucha como crujido o distorsión. *Detectar con `volumedetect`, corregir con `volume` o `loudnorm`.* Relacionado: loudnorm, headroom, dBFS.

**Codec** (AV) — Codificador/decodificador. Algoritmo que comprime y descomprime audio o video. H.264 (video) y AAC (audio) son los estándares para redes. *H.264 = `libx264` en ffmpeg.* Relacionado: H.264, H.265, VP9, AAC, Opus.

**Color grading** (Color) — Proceso de ajustar los colores de un video para lograr un look visual específico. *Capítulo 21: tratamiento visual. Filtros: `curves`, `eq`, `colorbalance`, `lut3d`.* Relacionado: LUT, curvas, colorbalance.

**Compositing** (Video) — Combinar múltiples capas visuales en un solo frame. Incluye overlay, chroma key, PIP. *En ffmpeg: `overlay`, `chromakey`. En Remotion: componentes React apilados.* Relacionado: overlay, PIP, chroma key.

**Composition** (Remotion) — Unidad fundamental en Remotion. Cada Composition define un video renderizable con resolución, fps, duración y componente React asociado. *Registrada en Root.tsx.* Relacionado: Sequence, AbsoluteFill, frame.

**Concat** (ffmpeg) — Filtro que concatena múltiples streams (video y/o audio) en secuencia. *`concat=n=3:v=1:a=1` para unir 3 clips con video y audio.* Relacionado: trim, segmento, join.

**CRF** (Video) — Constant Rate Factor. Método de control de calidad en codecs como H.264. Rango 0-51; 0 = sin pérdida, 51 = peor calidad. *18 = alta calidad para publicación. 28 = calidad aceptable para previews.* Relacionado: preset, bitrate, calidad.

**CTA** (Marketing) — Call To Action. Instrucción que le dice al espectador qué hacer después. *"Escribinos por WhatsApp" en CELESTE es el CTA estándar de All Import.* Relacionado: hook, engagement, conversión.

**Cut-silence** (Automatización) — Script que detecta y elimina tramos de silencio de un video/audio automáticamente. *Implementado en `allimport/video/scripts/cut-silence.mjs`.* Relacionado: silencedetect, trim, padding.

### D

**dBFS** (Audio) — Decibeles Full Scale. Escala de medición de audio digital donde 0 dBFS es el máximo posible. Todo valor positivo produce clipping. *Objetivo: max_volume entre -3 y -1.5 dBTP.* Relacionado: clipping, loudnorm, LUFS.

**Degradado** (Color) — Transición gradual entre dos o más colores. *En All Import: de NAVY a NAVY más claro, o de transparente a NAVY (scrim).* Relacionado: banding, scrim, gradient.

**Dithering** (Color) — Técnica de agregar ruido aleatorio para disimular banding en degradados. *En ffmpeg: `noise=alls=3:allf=t`.* Relacionado: banding, grain, ruido.

**Drawtext** (ffmpeg) — Filtro de ffmpeg para dibujar texto sobre el video. *Usado para títulos, precios, CTAs cuando no se usan subtítulos.* Relacionado: subtítulos, fontfile, overlay.

### E

**EBU R128** (Audio) — Estándar europeo de normalización de loudness. Define loudness integrado (LUFS), rango (LRA) y pico (TP). *Target para redes: -16 LUFS, -1.5 dBTP.* Relacionado: LUFS, loudnorm, normalización.

**Encoding** (AV) — Proceso de comprimir datos de audio/video según un codec. *En ffmpeg: `-c:v libx264` para video, `-c:a aac` para audio.* Relacionado: codec, decoding, transcoding.

**Export** (Video) — El archivo final renderizado listo para publicación. *Capítulo 27 detalla settings por plataforma.* Relacionado: render, publicación, formato.

### F

**Fade** (AV) — Transición gradual de/hacia negro (video) o silencio (audio). *Video: `fade=t=in:d=1`. Audio: `afade=t=in:d=0.5`.* Relacionado: transición, crossfade, dissolve.

**FFmpeg** (Herramienta) — Suite de herramientas de línea de comandos para procesamiento de audio/video. La herramienta principal de edición programática. *Capítulo 41 cubre técnicas avanzadas.* Relacionado: filter_complex, ffprobe, codec.

**FFprobe** (Herramienta) — Herramienta de análisis que muestra información técnica de archivos multimedia. *Parte de la suite ffmpeg. Usada para obtener duración, resolución, codecs.* Relacionado: ffmpeg, metadatos, análisis.

**Filter_complex** (ffmpeg) — Modo de filtrado avanzado de ffmpeg que permite múltiples inputs, outputs y grafos de filtros complejos. *Obligatorio cuando hay más de una entrada o se necesita split.* Relacionado: filtro, pad, grafo.

**FPS** (Video) — Frames Per Second. Cantidad de cuadros por segundo. 30 fps es el estándar para redes sociales. *En Remotion: `fps={30}`. En ffmpeg: `-r 30` o filtro `fps=30`.* Relacionado: frame, framerate, VFR, CFR.

**Frame** (Video) — Un cuadro individual de video. Un video de 5 segundos a 30 fps tiene 150 frames. *En Remotion: `useCurrentFrame()` retorna el frame actual (0-based).* Relacionado: FPS, keyframe, compositing.

### G

**Gain** (Audio) — Nivel de amplificación de una señal de audio. *En ffmpeg: `volume=1.5` (1.5x) o `volume=3dB` (+3dB).* Relacionado: volumen, amplificación, dB.

**Grain** (Video) — Ruido visual sutil que simula la textura del film o disimula artefactos de compresión. *Útil contra banding: `noise=alls=3:allf=t`.* Relacionado: noise, dithering, textura.

**Green screen** (Video) — Fondo verde uniforme usado para chroma key. Permite reemplazar el fondo en post-producción. *En ffmpeg: `chromakey=0x00FF00:0.15:0.1`.* Relacionado: chroma key, compositing, overlay.

### H

**H.264** (Codec) — Codec de video más usado del mundo. Compatible con todas las plataformas y dispositivos. *En ffmpeg: `libx264`. Profile: high. Level: 4.0-4.2.* Relacionado: codec, libx264, CRF.

**H.265 / HEVC** (Codec) — Sucesor de H.264. Mejor compresión a misma calidad, pero menor compatibilidad. *No recomendado para Instagram/TikTok por compatibilidad.* Relacionado: H.264, codec, compresión.

**Headroom** (Audio) — Espacio entre el pico máximo del audio y 0 dBFS. Previene clipping. *Mínimo recomendado: -1.5 dBTP (1.5 dB de headroom).* Relacionado: clipping, dBFS, loudnorm.

**Higgsfield** (Herramienta) — Plataforma de generación de contenido con IA. Integrada por MCP en Claude Code. *Capítulo 43 cubre el workflow completo.* Relacionado: generate_image, generate_video, MCP.

**Hook** (Contenido) — Los primeros 1-3 segundos de un video que capturan la atención del espectador. *Debe generar curiosidad o impacto inmediato. Capítulos 12-13.* Relacionado: retención, pattern interrupt, CTA.

**HLS** (Streaming) — HTTP Live Streaming. Protocolo de streaming adaptativo de Apple. Divide el video en segmentos .ts con un playlist .m3u8. *Usado para streaming en vivo o video adaptativo.* Relacionado: streaming, segmentos, DASH.

### I

**Interpolate** (Remotion) — Función que mapea un rango de frames a un rango de valores de salida. *`interpolate(frame, [0, 30], [0, 1])` → fade in de 30 frames.* Relacionado: spring, easing, animación.

**Interlacing** (Video) — Método antiguo de renderizar video alternando líneas pares e impares. Causa artefactos en movimiento. *Desentrelazar con: `-vf yadif`.* Relacionado: progressive, deinterlace, scan.

### J

**Jump cut** (Edición) — Corte directo entre dos tomas del mismo sujeto/ángulo, creando un "salto" visual. *Muy usado en reels a cámara para mantener ritmo. Capítulo 15.* Relacionado: corte, transición, pacing.

### K

**Ken Burns** (Video) — Efecto de paneo lento y/o zoom sobre una imagen estática. Da movimiento a fotos. *Implementado en Reel.tsx: `zoom = interpolate(frame, [0,150], [1.0, 1.12])`.* Relacionado: zoom, paneo, parallax.

**Keyframe** (Video) — Frame completo (no predictivo) en un video comprimido. Los keyframes son puntos de referencia para seek y cortes precisos. *Más keyframes = seek más preciso pero mayor tamaño de archivo.* Relacionado: GOP, I-frame, seek.

**Kinetic captions** (Contenido) — Subtítulos animados donde cada palabra aparece o se destaca sincronizada con la voz. *Implementable en Remotion (React) o con ASS avanzado.* Relacionado: subtítulos, ASS, animación.

### L

**Letterbox** (Video) — Barras negras (o de color) arriba y abajo cuando un video ancho se muestra en formato vertical. *En All Import: barras en NAVY (#0a0f1a).* Relacionado: pillarbox, padding, aspect ratio.

**Libass** (ffmpeg) — Biblioteca de renderizado de subtítulos ASS/SSA integrada en ffmpeg. *Usada con el filtro `ass=` y `subtitles=`.* Relacionado: ASS, subtítulos, fuentes.

**Libx264** (ffmpeg) — Implementación open-source del codec H.264. El encoder de video más usado en ffmpeg. *`-c:v libx264 -preset slow -crf 18`.* Relacionado: H.264, CRF, preset.

**Loudness** (Audio) — Percepción subjetiva del volumen. Medida en LUFS según EBU R128. *No confundir con volumen (dBFS). Un audio puede tener picos altos pero loudness bajo.* Relacionado: LUFS, EBU R128, normalización.

**Loudnorm** (ffmpeg) — Filtro de normalización de loudness según EBU R128. *`loudnorm=I=-16:TP=-1.5:LRA=11` — el estándar para redes sociales.* Relacionado: LUFS, normalización, EBU R128.

**LRA** (Audio) — Loudness Range. Rango dinámico del audio medido en LU. *11 LU es el target estándar. Menor = más comprimido.* Relacionado: LUFS, loudnorm, rango dinámico.

**LUFS** (Audio) — Loudness Units relative to Full Scale. Unidad de medida de loudness percibido. *-16 LUFS es el target para redes sociales (Instagram, TikTok, YouTube).* Relacionado: loudnorm, EBU R128, normalización.

**LUT** (Color) — Look-Up Table. Archivo que mapea colores de entrada a colores de salida. Usado para aplicar looks de color predefinidos. *En ffmpeg: `lut3d=brand.cube`.* Relacionado: color grading, curves, look.

### M

**Minterpolate** (ffmpeg) — Filtro de interpolación de frames para crear cámara lenta con frames generados. *Muy lento y puede generar artefactos. Alternativa: Higgsfield upscale.* Relacionado: slow motion, frame interpolation, temporal.

**Montserrat Alternates** (Tipografía) — Fuente principal de All Import. Sans-serif geométrica con alternativas de caracteres. *Ubicación: `allimport/historias/fonts/`.* Relacionado: fuente, tipografía, branding.

**Motion control** (Higgsfield) — Herramienta para controlar el movimiento en videos generados por IA. Incluye recast, puppeteer y motion transfer. *Capítulo 43.* Relacionado: Higgsfield, animación, IA.

**Movflags** (ffmpeg) — Flags de control del contenedor MP4. *`+faststart` mueve el moov atom al inicio del archivo para reproducción progresiva (streaming).* Relacionado: moov atom, streaming, MP4.

**MP4** (Formato) — Contenedor multimedia estándar. Soporta H.264/H.265 (video) + AAC (audio) + subtítulos + metadatos. *El formato obligatorio para todas las redes sociales.* Relacionado: contenedor, H.264, AAC.

**Muxing** (AV) — Proceso de combinar streams de audio y video en un contenedor. *Re-muxear sin re-encodear: `ffmpeg -i input.mkv -c copy output.mp4`.* Relacionado: demuxing, contenedor, stream.

### N

**Normalización** (Audio) — Proceso de ajustar el volumen de audio a un nivel estándar. *Peak normalization vs loudness normalization (EBU R128). Preferir loudness.* Relacionado: loudnorm, LUFS, EBU R128.

**Noise reduction** (Video) — Proceso de reducir ruido visual (grain no deseado). *Filtros: `hqdn3d` (rápido), `nlmeans` (mejor calidad).* Relacionado: grain, hqdn3d, nlmeans.

**NVENC** (Codec) — Encoder de video por hardware de NVIDIA. Mucho más rápido que libx264 pero ligeramente menor calidad. *`-c:v h264_nvenc -cq 20`.* Relacionado: hardware acceleration, GPU, libx264.

### O

**Overlay** (ffmpeg) — Filtro que superpone una imagen o video sobre otro. *`overlay=W-w-20:20` para esquina superior derecha.* Relacionado: PIP, compositing, drawtext.

**Outpaint** (Higgsfield) — Herramienta que expande una imagen más allá de sus bordes originales usando IA. *Útil para convertir fotos 1:1 a formato 9:16.* Relacionado: Higgsfield, IA, expand.

### P

**Padding** (Video) — Agregar bordes (de color) alrededor de un video para ajustar el aspect ratio sin cortar. *En ffmpeg: `pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a`.* Relacionado: letterbox, pillarbox, crop.

**Pattern interrupt** (Contenido) — Elemento inesperado que rompe la monotonía y recupera la atención del espectador. *Zoom repentino, SFX, cambio de ángulo, texto emergente. Capítulo 24.* Relacionado: retención, hook, pacing.

**Pillarbox** (Video) — Barras a los costados cuando un video vertical se muestra en formato horizontal. *En All Import: barras en NAVY.* Relacionado: letterbox, padding, aspect ratio.

**PIP** (Video) — Picture-in-Picture. Ventana pequeña de un video sobre otro video principal. *En ffmpeg: scale del PIP + overlay.* Relacionado: overlay, compositing, multi-cámara.

**Pixel format** (Video) — Formato de almacenamiento de los pixels. `yuv420p` es el estándar compatible con todos los reproductores. *Agregar `format=yuv420p` antes del export.* Relacionado: color space, 10-bit, HDR.

**Preset** (ffmpeg) — Configuración predefinida de velocidad/calidad para el encoder. De `ultrafast` a `veryslow`. *`slow` para export final, `veryfast` para procesamiento batch.* Relacionado: CRF, calidad, rendimiento.

**PTS** (Video) — Presentation Timestamp. Marca temporal que indica cuándo debe mostrarse cada frame. *`setpts=PTS-STARTPTS` resetea los timestamps después de trim.* Relacionado: DTS, setpts, timestamp.

### R

**Reframe** (Higgsfield) — Herramienta que cambia el aspect ratio de un video usando IA para seguir al sujeto. *16:9 → 9:16 con tracking inteligente.* Relacionado: aspect ratio, crop, Higgsfield.

**Remotion** (Herramienta) — Framework para crear videos programáticamente con React. Cada frame es un render de un componente React. *Capítulo 42. Proyecto en `allimport/video/`.* Relacionado: React, Composition, frame.

**Render** (AV) — Proceso de generar el archivo de video final a partir de un proyecto/timeline. *En Remotion: `npx remotion render`. En ffmpeg: el comando completo.* Relacionado: export, encoding, pipeline.

**Resolución** (Video) — Dimensiones del video en pixels (ancho x alto). *1080x1920 para reels/stories (vertical). 1920x1080 para YouTube.* Relacionado: aspect ratio, scale, HD, 4K.

**Retención** (Contenido) — Porcentaje del video que el espectador mira. La métrica más importante para el algoritmo. *Hook fuerte + pattern interrupts + pacing rápido = alta retención.* Relacionado: hook, pattern interrupt, engagement.

**Riser** (Audio/SFX) — Efecto de sonido que aumenta progresivamente en tono/volumen, creando tensión y anticipación. *Usado antes de reveals, datos impactantes, transiciones.* Relacionado: SFX, impact, transición.

### S

**Safe zone** (Video) — Área del frame que no se recorta por la UI de la plataforma. *Capítulo 25 define las zonas seguras para Instagram, TikTok, YouTube Shorts.* Relacionado: margen, crop, UI overlay.

**Sample rate** (Audio) — Cantidad de muestras de audio por segundo. 44100 Hz (CD) o 48000 Hz (video) son los estándares. *`-ar 44100` para compatibilidad máxima.* Relacionado: frecuencia, audio, calidad.

**Scale** (ffmpeg) — Filtro para cambiar la resolución de un video. *`scale=1080:1920` fuerza resolución. `scale=1080:-1` mantiene proporción.* Relacionado: resolución, aspect ratio, interpolación.

**Scrim** (Video) — Gradiente semitransparente oscuro superpuesto sobre una imagen para mejorar la legibilidad del texto. *En Remotion: `background: 'linear-gradient(to bottom, rgba(10,15,26,.55) ...)'.`* Relacionado: overlay, legibilidad, gradiente.

**Sequence** (Remotion) — Componente que posiciona un contenido en un rango temporal dentro de una Composition. *`<Sequence from={30} durationInFrames={60}>`.* Relacionado: Composition, frame, timeline.

**Setpts** (ffmpeg) — Filtro que modifica los timestamps de presentación de video. *`setpts=PTS-STARTPTS` después de trim es obligatorio. `setpts=0.5*PTS` para 2x speed.* Relacionado: PTS, trim, timestamp.

**SFX** (Audio) — Sound Effects. Efectos de sonido usados para dar impacto, transición o ambientación. *Categorías: impact, whoosh, riser, pop, swipe. Capítulo 17.* Relacionado: diseño sonoro, impact, whoosh.

**Sharpening** (Video) — Proceso de aumentar la nitidez de un video. *En ffmpeg: `unsharp=5:5:1.0:5:5:0.5`. Útil después de estabilización.* Relacionado: unsharp, nitidez, vidstab.

**Silencedetect** (ffmpeg) — Filtro de análisis que detecta tramos de silencio en audio. *Usado por `cut-silence.mjs`. `silencedetect=noise=-30dB:d=0.5`.* Relacionado: cut-silence, atrim, padding.

**Slow motion** (Video) — Video reproducido a velocidad menor que la real. Requiere más frames (grabados o interpolados). *En ffmpeg: `minterpolate` o `setpts=2*PTS`. En Higgsfield: `upscale_video`.* Relacionado: minterpolate, frame interpolation, velocidad.

**Spring** (Remotion) — Función de animación basada en física que simula un resorte. Produce movimientos naturales con rebote. *`spring({frame, fps, config: {damping: 12}})`.* Relacionado: interpolate, animación, easing.

**SRT** (Subtítulos) — SubRip Text. Formato de subtítulos más simple y universal. Contiene timestamps y texto plano. *Generado por Whisper, quemado con `-vf subtitles=`.* Relacionado: ASS, subtítulos, Whisper.

**Stabilización** (Video) — Proceso de corregir vibraciones/sacudidas en un video. *En ffmpeg: vidstab (dos pases). Capítulo 41.3.* Relacionado: vidstab, shake, gimbal.

### T

**Thumbnail** (Contenido) — Imagen de miniatura que representa un video en el feed/galería. *Generada con ffmpeg: `-vframes 1` en un frame específico. Capítulo 30.* Relacionado: cover, preview, feed.

**Timeline** (Edición) — Representación temporal del proyecto de video con todas sus capas y clips. *En Remotion: la Composition define el timeline. En ffmpeg: implícito en filter_complex.* Relacionado: Composition, Sequence, edición.

**Transcoding** (AV) — Proceso de convertir un archivo de un codec/formato a otro. *Re-encodear de H.265 a H.264 para compatibilidad.* Relacionado: encoding, codec, formato.

**Trim** (ffmpeg) — Filtro que extrae un segmento temporal de un video. *`trim=start=5:end=12`. Siempre seguido de `setpts=PTS-STARTPTS`.* Relacionado: atrim, segmento, corte.

### U

**Unsharp** (ffmpeg) — Filtro de sharpening/blurring por máscara de desenfoque. *`unsharp=5:5:0.8:3:3:0.4` para sharpening leve. Usado post-estabilización.* Relacionado: sharpening, nitidez, vidstab.

**Upscale** (Video/Imagen) — Aumentar la resolución de una imagen o video usando interpolación o IA. *Higgsfield: `upscale_image`, `upscale_video`. ffmpeg: `scale` con `flags=lanczos`.* Relacionado: resolución, IA, calidad.

### V

**VFR** (Video) — Variable Frame Rate. Framerate que cambia durante el video. Común en grabaciones de celular. Causa problemas de sync. *Convertir a CFR con `-vf fps=30`.* Relacionado: CFR, fps, sync.

**Vidstab** (ffmpeg) — Biblioteca de estabilización de video de dos pases. Pase 1: análisis. Pase 2: corrección. *Capítulo 41.3. Requiere `--enable-libvidstab` en la compilación de ffmpeg.* Relacionado: estabilización, shakiness, smoothing.

**Virality predictor** (Higgsfield) — Herramienta de IA que analiza un video y predice su potencial de viralidad. *Evalúa hook strength, retention risk, creative performance.* Relacionado: Higgsfield, retención, engagement.

**Volume** (ffmpeg) — Filtro de ajuste de volumen de audio. *`volume=0.5` (mitad) o `volume=-6dB` (bajar 6 dB).* Relacionado: gain, loudnorm, audio.

### W

**Watermark** (Video) — Marca visual superpuesta para identificar al creador o la marca. Logo, texto o pattern. *En All Import: marco CYAN + header "ALL IMPORT". Implementado con overlay.* Relacionado: overlay, branding, logo.

**Whisper** (IA) — Modelo de OpenAI para transcripción de audio a texto. Genera archivos SRT con timestamps. *`whisper audio.wav --language es --model medium --output_format srt`.* Relacionado: SRT, transcripción, subtítulos.

**Whoosh** (SFX) — Efecto de sonido de movimiento rápido. Usado en transiciones y cortes. *Uno de los SFX más usados en edición de reels.* Relacionado: SFX, transición, swipe.

### X

**x264** (Codec) — Implementación open-source del estándar H.264. El encoder más usado para video en internet. *En ffmpeg: `-c:v libx264`.* Relacionado: H.264, libx264, codec.

### Y

**YUV** (Color) — Espacio de color usado en video digital. Y = luminancia, U/V = crominancia. *`yuv420p` = formato estándar para compatibilidad máxima.* Relacionado: pixel format, color space, chroma subsampling.

### Z

**Zoom** (Video) — Acercamiento visual. Puede ser óptico (cámara), digital (crop + scale) o animado (Ken Burns). *En Remotion: `transform: scale(zoom)`. En ffmpeg: `crop` progresivo.* Relacionado: Ken Burns, crop, scale.

---

**Total de términos definidos: 107**

---

# Capítulo 48: Índice general y cross-references

## 48.1 Listado completo de capítulos (todas las partes)

### PARTE 01 — Capítulos 1-8: Fundamentos

| Cap. | Título | Tema central |
|---|---|---|
| 1 | Filosofía de edición | Por qué editamos, principios rectores |
| 2 | Objetivos del contenido | Métricas, KPIs, qué medir |
| 3 | Roles en el flujo | Editor, creador, publicador (todo = una persona) |
| 4 | Mentalidad del editor | Mindset, iteración, perfeccionismo vs publicar |
| 5 | Principios de edición | Reglas universales, ritmo, contraste, claridad |
| 6 | Workflow general | Pipeline de principio a fin |
| 7 | Pipeline técnico | Herramientas, formatos, carpetas |
| 8 | Descubrimiento de contenido | Ideas, tendencias, inspiración |

### PARTE 02 — Capítulos 9-16: Narrativa y Estructura

| Cap. | Título | Tema central |
|---|---|---|
| 9 | Video discovery | Encontrar y analizar videos de referencia |
| 10 | Análisis de video | Descomponer un video exitoso |
| 11 | Guion | Escribir guiones para reels y shorts |
| 12 | Hooks | Tipos de hooks, estructura, primeros segundos |
| 13 | Estructura narrativa | Arcos, tres actos, storytelling |
| 14 | Pacing y ritmo | Velocidad de cortes, densidad de información |
| 15 | Cortes y edición | Tipos de cortes, cuándo cortar |
| 16 | Transiciones | Tipos, cuándo usar cada una |

### PARTE 03 — Capítulos 17-24: Audio, Visual y IA

| Cap. | Título | Tema central |
|---|---|---|
| 17 | Diseño sonoro avanzado | SFX layering, SFX tonales, diseño por tipo |
| 18 | Música | Selección, mezcla, uso estratégico |
| 19 | Subtítulos y kinetic captions | SRT, ASS, captions animadas |
| 20 | Overlays gráficos | Texto, iconos, elementos visuales sobre video |
| 21 | Color grading | Tratamiento visual, LUTs, looks de marca |
| 22 | B-Roll | Captura, selección, integración |
| 23 | Imágenes y video IA | Generación con IA, integración |
| 24 | Pattern interrupts | Sistema de retención de atención |

### PARTE 04 — Capítulos 25-32: Formatos y Producción

| Cap. | Título | Tema central |
|---|---|---|
| 25 | Safe zones | Zonas seguras por plataforma |
| 26 | Formatos y resoluciones | 9:16, 1:1, 16:9 y cuándo usar cada uno |
| 27 | Exportación | Settings de export por plataforma |
| 28 | Audio avanzado | Mezcla multi-pista, ducking, masterización |
| 29 | Motion graphics | Animaciones, títulos animados, lower thirds |
| 30 | Thumbnails | Diseño, composición, texto |
| 31 | Historias de Instagram | Pipeline con Pillow, templates de marca |
| 32 | Carruseles | Diseño, estructura, exportación multi-slide |

### PARTE 05 — Capítulos 33-40: Plataformas y Marca

| Cap. | Título | Tema central |
|---|---|---|
| 33 | YouTube | Formato largo, SEO, retención |
| 34 | Podcast | Edición de audio largo, capítulos |
| 35 | Ads / Publicidad | Creativas para pauta, A/B testing |
| 36 | QA (Quality Assurance) | Checklist de verificación pre-publicación |
| 37 | Analytics | Métricas post-publicación, iteración |
| 38 | Plataformas | Diferencias técnicas y de contenido |
| 39 | Marca e identidad | Sistema visual, consistencia, evolución |
| 40 | Colaboración | Trabajo con otros creadores, feedback |

### PARTE 06 — Capítulos 41-48: Avanzado y Referencia

| Cap. | Título | Tema central |
|---|---|---|
| 41 | ffmpeg avanzado | filter_complex, estabilización, color, batch |
| 42 | Remotion | Video programático con React |
| 43 | Higgsfield | Workflow completo de IA para video |
| 44 | Calendario de contenido | Planificación y batch editing |
| 45 | Troubleshooting | Solución de problemas comunes |
| 46 | Automatización | Scripts, pipelines, CI/CD |
| 47 | Glosario | 107 términos técnicos definidos |
| 48 | Índice general | Cross-references, quick-reference cards |

## 48.2 Índice temático alfabético

| Tema | Capítulos relacionados |
|---|---|
| Aceleración por hardware | 41 |
| Ads / publicidad | 35 |
| Animaciones de texto | 19, 29, 42 |
| Analytics / métricas | 2, 37 |
| Aspect ratio | 25, 26, 43 (reframe) |
| Audio ducking | 28, 41 |
| Audio mixing | 18, 28, 41 |
| Automatización | 46 |
| B-Roll | 22 |
| Batch processing | 41, 44, 46 |
| Branding / marca | 39, contenido/DESIGN.md |
| Calendario | 44, contenido/CALENDARIO-SEMANAL.md |
| Carruseles | 32 |
| Chroma key | 41 |
| CI/CD para video | 46 |
| Clipping de audio | 28, 45 |
| Colaboración | 40 |
| Color banding | 21, 45 |
| Color grading | 21, 41 |
| Concat (ffmpeg) | 41 |
| Contenido estacional | 44 |
| Cortes / tipos de corte | 15 |
| CTA (Call To Action) | 12, 20, 44 |
| Cut-silence | 46 |
| Diseño sonoro | 5, 17, 18 |
| Drawtext | 20, 41 |
| EBU R128 | 28, 41, 45 |
| Errores comunes ffmpeg | 41, 45 |
| Estabilización | 41 |
| Export settings | 27, 45 |
| Fade in/out | 16, 41 |
| Filosofía | 1 |
| Filter_complex | 41 |
| FPS / framerate | 26, 41 |
| Fuentes / tipografía | 19, 39, 42 |
| Generación IA (imagen) | 23, 43 |
| Generación IA (video) | 23, 43 |
| Guiones | 11, contenido/GANCHOS-Y-GUIONES.md |
| Higgsfield | 43 |
| Historias de Instagram | 31, 44 |
| Hooks | 12, 24 |
| Kinetic captions | 19, 42 |
| LUT | 21, 41 |
| Mentalidad | 4 |
| Montserrat Alternates | 39, 42, 47 |
| Motion graphics | 29 |
| Normalización audio | 28, 41, 45, 46 |
| Overlays | 20, 41 |
| Pacing / ritmo | 14 |
| Padding | 26, 41, 45 |
| Pattern interrupts | 24 |
| Picture-in-Picture | 41 |
| Pipeline técnico | 7, 46 |
| Plataformas | 38, 45 |
| Podcast | 34 |
| QA / Quality Assurance | 36, 46 |
| Remotion | 42 |
| Repurposing | 44 |
| Resoluciones | 26, 45 |
| Retención | 2, 12, 14, 24, 37 |
| Safe zones | 25 |
| Scale (ffmpeg) | 26, 41 |
| SFX | 5, 17 |
| Slow motion | 41 |
| Storytelling | 13 |
| Subtítulos | 19, 41, 46 |
| Templates (Remotion) | 42 |
| Thumbnails | 30, 46 |
| TikTok | 38, 43, 45 |
| Transiciones | 16 |
| Trim/Atrim | 41 |
| Troubleshooting | 45 |
| Vidstab | 41 |
| Virality predictor | 43 |
| Workflow general | 6 |
| YouTube | 33, 38 |

## 48.3 Quick-reference card: comandos ffmpeg más usados

```
┌─────────────────────────────────────────────────────────────────────┐
│ QUICK REFERENCE: FFMPEG PARA ALL IMPORT                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ CONVERSIÓN BÁSICA:                                                  │
│   ffmpeg -i input.mov -c:v libx264 -crf 18 -c:a aac -b:a 192k    │
│     -movflags +faststart output.mp4                                 │
│                                                                     │
│ ESCALAR A 1080x1920 CON PADDING NAVY:                             │
│   -vf "scale=1080:1920:force_original_aspect_ratio=decrease,       │
│        pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0a0f1a"          │
│                                                                     │
│ NORMALIZAR AUDIO:                                                   │
│   -af "loudnorm=I=-16:TP=-1.5:LRA=11"                            │
│                                                                     │
│ QUEMAR SUBTÍTULOS CON MARCA:                                       │
│   -vf "subtitles=subs.srt:force_style='FontName=Montserrat        │
│        Alternates,FontSize=22,PrimaryColour=&H00fafaf8,            │
│        OutlineColour=&H001a0f0a,BorderStyle=3,Outline=2'"         │
│                                                                     │
│ CORTAR SEGMENTO:                                                    │
│   -ss 5 -t 10 -c copy output.mp4    (rápido, impreciso)           │
│   -vf "trim=5:15,setpts=PTS-STARTPTS"  (preciso, re-encode)       │
│                                                                     │
│ AGREGAR MÚSICA DE FONDO:                                            │
│   -i musica.mp3 -filter_complex                                    │
│     "[0:a]volume=1[v];[1:a]volume=0.12[m];                        │
│      [v][m]amix=inputs=2:duration=first[a]"                       │
│   -map 0:v -map "[a]"                                              │
│                                                                     │
│ THUMBNAIL (frame 45):                                               │
│   -vf "select=eq(n\,45)" -vframes 1 thumb.jpg                     │
│                                                                     │
│ CORTAR SILENCIOS:                                                   │
│   node allimport/video/scripts/cut-silence.mjs -i video.mp4       │
│                                                                     │
│ EXPORT FINAL (máxima calidad para IG):                             │
│   -c:v libx264 -preset slow -crf 18 -profile:v high -level 4.0    │
│   -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart       │
│                                                                     │
│ EXPORT WHATSAPP (max 16MB, 30s):                                   │
│   -vf "scale=720:1280" -c:v libx264 -crf 28 -t 30 -fs 15M       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 48.4 Quick-reference card: árboles de decisión principales

```
┌─────────────────────────────────────────────────────────────────────┐
│ ÁRBOLES DE DECISIÓN CLAVE                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ¿QUÉ HERRAMIENTA USAR?                                            │
│   Solo cortes/concat → ffmpeg (Cap 41)                             │
│   Animación de texto → Remotion (Cap 42)                           │
│   Generación con IA → Higgsfield (Cap 43)                          │
│   Video desde datos → Remotion (Cap 42)                            │
│   Post-procesamiento → ffmpeg (Cap 41)                             │
│   Historias estáticas → Pillow (Cap 31)                            │
│                                                                     │
│ ¿QUÉ FORMATO?                                                      │
│   Reel/TikTok/Story → 1080x1920 (9:16) (Cap 26)                  │
│   Feed IG → 1080x1080 (1:1) (Cap 26)                              │
│   YouTube → 1920x1080 (16:9) (Cap 26)                             │
│   WhatsApp → 720x1280 (9:16 comprimido) (Cap 45)                  │
│                                                                     │
│ ¿QUÉ CUENTA?                                                       │
│   Contenido de valor/autoridad → @_agus_moreno_ (Cap 44)          │
│   Catálogo/producto → @allimport.cba (Cap 44)                     │
│                                                                     │
│ ¿AUTOMATIZAR?                                                      │
│   Corte silencios, normalización, escala → SÍ (Cap 46)            │
│   Subtítulos, templates → SEMI (Cap 46)                            │
│   Selección creativa, guiones → NO (Cap 46)                        │
│                                                                     │
│ ¿PUBLICAR O RE-EDITAR? (post virality_predictor)                  │
│   Score ≥80% → Publicar (Cap 43)                                   │
│   Score 60-79% → Publicar con mejoras menores (Cap 43)             │
│   Score 40-59% → Re-editar (Cap 43)                                │
│   Score <40% → Replantear desde cero (Cap 43)                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 48.5 Quick-reference card: presets de marca All Import

```
┌─────────────────────────────────────────────────────────────────────┐
│ BRAND PRESETS — ALL IMPORT                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ COLORES:                                                            │
│   NAVY    #0a0f1a   Fondo / base                                   │
│   CYAN    #00d4d4   Acento / marca / precios / CTA                 │
│   WHITE   #f8fafa   Texto claro                                    │
│   RED     #e22a2a   Urgencia real (SOLO si es verdad)              │
│   CELESTE #78b4eb   Detalle secundario / CTA suave                 │
│   GOLD    #c9a227   Precio destacado / ocasiones especiales        │
│                                                                     │
│ TIPOGRAFÍA:                                                         │
│   Principal: Montserrat Alternates Bold/ExtraBold                  │
│   Ubicación: allimport/historias/fonts/                             │
│                                                                     │
│ RESOLUCIÓN ESTÁNDAR:                                                │
│   Reel/Story: 1080 x 1920 (9:16)                                  │
│   Feed: 1080 x 1080 (1:1)                                         │
│                                                                     │
│ MARCO: 14px CYAN alrededor del frame                               │
│                                                                     │
│ HEADER: "ALL IMPORT" (CYAN) + "Córdoba · Entrega en mano"         │
│ CTA: "Escribinos por WhatsApp" (CELESTE)                           │
│                                                                     │
│ CUENTAS:                                                            │
│   @allimport.cba → logo, centrado, marca                          │
│   @_agus_moreno_ → sin logo, izquierda, personal                  │
│                                                                     │
│ COLORES ASS (subtítulos):                                           │
│   WHITE:   &H00fafaf8                                              │
│   NAVY:    &H001a0f0a                                              │
│   CYAN:    &H00d4d400                                              │
│                                                                     │
│ FUENTE DE VERDAD:                                                   │
│   Branding: allimport/contenido/DESIGN.md                          │
│   Catálogo: web/src/components/site/data.ts                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 48.6 Quick-reference card: export settings por plataforma

```
┌─────────────────────────────────────────────────────────────────────┐
│ EXPORT SETTINGS POR PLATAFORMA                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ INSTAGRAM REELS:                                                    │
│   Res: 1080x1920 | Codec: H.264 | Audio: AAC 192k                 │
│   Max: 90s, 250MB | -profile:v high -level 4.0                     │
│   -movflags +faststart -pix_fmt yuv420p                            │
│                                                                     │
│ INSTAGRAM STORIES:                                                  │
│   Res: 1080x1920 | Codec: H.264 | Audio: AAC 192k                 │
│   Max: 60s, 250MB | Mismos settings que Reels                      │
│                                                                     │
│ TIKTOK:                                                             │
│   Res: 1080x1920 | Codec: H.264 | Audio: AAC 192k                 │
│   Max: 10min, 287MB | Sin watermarks de otras plataformas          │
│                                                                     │
│ YOUTUBE SHORTS:                                                     │
│   Res: 1080x1920 | Codec: H.264/H.265 | Audio: AAC 192k          │
│   Max: 60s, 256MB                                                   │
│                                                                     │
│ YOUTUBE (largo):                                                    │
│   Res: 1920x1080 (o 4K) | Codec: H.264/VP9 | Audio: AAC 256k     │
│   Max: 12h, 256GB                                                   │
│                                                                     │
│ WHATSAPP STATUS:                                                    │
│   Res: 720x1280 | Codec: H.264 | Audio: AAC 96k                   │
│   Max: 30s, 16MB | CRF 28+ para comprimir                         │
│                                                                     │
│ AUDIO NORMALIZACIÓN (todos):                                       │
│   loudnorm=I=-16:TP=-1.5:LRA=11                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 48.7 Mapa de cross-references: qué capítulos se relacionan

```
MAPA DE RELACIONES ENTRE CAPÍTULOS:

Fundamentos (1-8) ──────────────────── Base para todo
    │
    ├── Narrativa (9-16) ────────────── Guiones → Hooks → Pacing → Cortes
    │       │
    │       ├── Diseño sonoro (17-18) ── SFX sincronizados con cortes
    │       ├── Subtítulos (19) ──────── Timing alineado con guion
    │       └── Pattern interrupts (24) ─ Basados en pacing y retención
    │
    ├── Visual (20-24) ──────────────── Overlays + Color + B-Roll + IA
    │       │
    │       ├── Marca (39) ───────────── Colores y tipografía consistentes
    │       ├── ffmpeg color (41.4) ──── Implementación técnica de color
    │       └── Higgsfield (43) ──────── Generación IA de visual
    │
    ├── Formatos (25-32) ────────────── Safe zones → Resolución → Export
    │       │
    │       ├── Troubleshooting (45) ─── Problemas de formato y export
    │       └── QA (36) ─────────────── Verificación pre-publicación
    │
    ├── Plataformas (33-38) ─────────── Diferencias por destino
    │       │
    │       ├── Calendario (44) ──────── Cuándo publicar qué y dónde
    │       └── Analytics (37) ───────── Métricas post-publicación
    │
    └── Herramientas (41-43, 46) ────── Implementación técnica
            │
            ├── ffmpeg (41) ←→ Remotion (42) ←→ Higgsfield (43)
            │   (se complementan en pipelines)
            │
            ├── Automatización (46) ──── Conecta todas las herramientas
            │
            └── Glosario (47) ──────── Referencia transversal de términos
```

## 48.8 Tabla de búsqueda: "¿Dónde encuentro...?"

| Necesito... | Ir a... |
|---|---|
| Agregar subtítulos a un video | Cap 19 (teoría), Cap 41.8 (ffmpeg), Cap 42.3 (Remotion) |
| Ajustar colores de un video | Cap 21 (teoría), Cap 41.4 (ffmpeg técnico) |
| Automatizar el corte de silencios | Cap 46.2 (cut-silence.mjs) |
| Cambiar aspect ratio de un video | Cap 26 (formatos), Cap 43.4 (Higgsfield reframe), Cap 41 (ffmpeg crop/pad) |
| Crear un reel de producto con template | Cap 42.4 (Remotion templates), Cap 42.5 (data-driven) |
| Crear una historia de Instagram | Cap 31 (Pillow), Cap 44.1 (calendario) |
| Entender un error de ffmpeg | Cap 41.14 (tabla de 23 errores), Cap 45.12 (tabla de 32 errores) |
| Escribir un guion de reel | Cap 11 (guion), Cap 12 (hooks), contenido/GANCHOS-Y-GUIONES.md |
| Estabilizar un video shaky | Cap 41.3 (vidstab dos pases) |
| Evaluar si un video va a funcionar | Cap 43.8 (virality predictor), Cap 36 (QA), Cap 37 (analytics) |
| Exportar para Instagram | Cap 27 (export), Cap 45.8 (requisitos), Quick-ref 48.6 |
| Exportar para WhatsApp | Cap 45.8 (requisitos), Quick-ref 48.6 |
| Generar imágenes con IA | Cap 23 (teoría), Cap 43.2 (Higgsfield generate_image) |
| Generar video con IA | Cap 23 (teoría), Cap 43.3 (Higgsfield generate_video) |
| Hacer slow motion | Cap 41.12 (minterpolate), Cap 43.5 (Higgsfield upscale) |
| Los colores de marca de All Import | contenido/DESIGN.md, Quick-ref 48.5, Cap 39, Cap 42.8 |
| Mezclar audio (voz + música + SFX) | Cap 28 (teoría), Cap 41.5 (ffmpeg técnico) |
| Normalizar el audio | Cap 28 (teoría), Cap 41.5 (loudnorm), Cap 46 (automatización) |
| Organizar mi semana de contenido | Cap 44 (calendario), contenido/CALENDARIO-SEMANAL.md |
| Planificar contenido estacional | Cap 44.6 (tabla estacional) |
| Qué comando de ffmpeg usar | Quick-ref 48.3, Cap 41.13 (tabla de filtros) |
| Qué herramienta usar (ffmpeg vs Remotion vs Higgsfield) | Cap 42.10 (árbol de decisión), Quick-ref 48.4 |
| Qué significan estos términos técnicos | Cap 47 (glosario, 107 términos) |
| Quitar el fondo de una imagen | Cap 43.6 (Higgsfield remove_background) |
| Resolver audio fuera de sync | Cap 45.1 (diagnóstico y solución) |
| Resolver video que no sube a la plataforma | Cap 45.8 (requisitos por plataforma) |
| Script para procesar footage del día | Cap 46.1 (procesar-dia.sh) |
| Subtítulos con colores de marca | Cap 19 (kinetic), Cap 41.8 (ASS con colores All Import) |
| Un script de QA automatizado | Cap 46.7 (qa-video.sh) |
| Usar la fuente Montserrat Alternates | Cap 42.7 (Remotion), Cap 41.8 (ffmpeg/libass) |
| Verificar calidad antes de publicar | Cap 36 (QA checklist), Cap 46.7 (qa-video.sh) |

---

> **Fin de PARTE 06 — FIN DEL MANUAL**
> 
> Este manual de 48 capítulos cubre la totalidad del flujo de edición de video para All Import y cualquier proyecto de contenido de formato corto o largo. Desde la filosofía hasta la automatización, desde el primer frame hasta la analítica post-publicación.
>
> **Partes del manual:**
> - [PARTE 01](MASTER_VIDEO_EDITOR_PARTE_01.md): Capítulos 1-8 — Filosofía, Objetivos, Roles, Mentalidad, Principios, Workflow, Pipeline, Descubrimiento
> - [PARTE 02](MASTER_VIDEO_EDITOR_PARTE_02.md): Capítulos 9-16 — Video Discovery, Análisis, Guion, Hooks, Estructura Narrativa, Pacing, Cortes, Transiciones
> - [PARTE 03](MASTER_VIDEO_EDITOR_PARTE_03.md): Capítulos 17-24 — Sound Design, Música, Subtítulos, Overlays, Color, B-Roll, IA, Pattern Interrupts
> - [PARTE 04](MASTER_VIDEO_EDITOR_PARTE_04.md): Capítulos 25-32 — Safe Zones, Formatos, Exportación, Audio Avanzado, Motion Graphics, Thumbnails, Historias, Carruseles
> - [PARTE 05](MASTER_VIDEO_EDITOR_PARTE_05.md): Capítulos 33-40 — YouTube, Podcast, Ads, QA, Analytics, Plataformas, Marca, Colaboración
> - [PARTE 06](MASTER_VIDEO_EDITOR_PARTE_06.md): Capítulos 41-48 — ffmpeg Avanzado, Remotion, Higgsfield, Calendario, Troubleshooting, Automatización, Glosario, Índice
