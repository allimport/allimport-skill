---
name: silence-removal-pipeline
description: Use when raw video/audio footage needs dead air and silent pauses stripped out before editing or subtitling — e.g. "quita los silencios de este video", "corta las pausas muertas", prepping raw takes for a fast-turnaround short-form edit. Runs the repo's ffmpeg-based cut-silence pipeline in video/ and keeps audio/video frame-accurately in sync.
---

# Silence Removal Pipeline

Corta tramos de silencio de un video/audio crudo con un solo `filter_complex`
de ffmpeg (trim+concat sobre el mismo grafo para video y audio), evitando el
desincro que aparece cuando se procesan las dos pistas por separado.

## Cuándo usar
- Antes de montar o subtitular una toma cruda que tiene pausas/silencios largos
- El usuario pide "sacar los silencios", "cortar las pausas muertas", "acelerar el editing quitando aire muerto"

## Requisitos
- `ffmpeg` + `ffprobe` en el PATH.
- El script vive en `video/scripts/cut-silence.mjs` (Node core, sin dependencias).

## Uso
```bash
cd video
npm run cut-silence -- --input /ruta/al/archivo.mp4
```
Salida por defecto: `video/out/<nombre>-cut.<ext>`.

Parámetros: `--threshold` (dB, default -30), `--min-silence` (segundos, default 0.5),
`--padding` (segundos de margen a cada lado del corte, default 0.15), `--output`.

Para generar un archivo de prueba sin material real: `npm run make-test-fixture`
(clip sintético con un silencio largo y uno corto por debajo del umbral, para
verificar que el corte detecta bien uno y respeta el otro).

## Cómo mantiene el sync
Un único `filter_complex` aplica `trim`/`atrim` sobre el mismo archivo de origen
y concatena video+audio en el mismo paso — los puntos de corte son idénticos
para ambas pistas, así que no hay pipeline de audio separado del de video que
pueda derivar.

## Reglas críticas
- No tocar `web/` (app Next.js con su propio build/deploy) — este pipeline vive
  aislado en `video/`.
- No commitear los binarios de `video/out/` ni `video/samples/` (están gitignored).
- Si el archivo no tiene silencios por encima del umbral, el script copia el
  archivo sin recodificar (`-c copy`) — no asumir que siempre hay que recodificar.
- Ajustar `--padding` en vez de bajar demasiado `--min-silence` cuando se corta
  una palabra: el padding es lo que evita comerse el arranque/final de la voz.

Documentación completa (arquitectura, parámetros, verificación) en `docs/VIDEO-PIPELINE.md`.
Para el resto del flujo de edición de video corto (SFX, subtítulos, overlays), ver `skills/sound-design-short-video/`.
