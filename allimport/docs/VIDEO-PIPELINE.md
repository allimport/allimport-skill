# Pipeline de video: corte de silencios

Script liviano (Node.js + ffmpeg, sin dependencias externas) para detectar y
eliminar tramos de silencio de un archivo de video o audio crudo, antes de
pasarlo a montaje o subtitulado. Vive en `allimport/video/`, separado de `web/`.

## Requisitos
- `ffmpeg` y `ffprobe` en el PATH (ej. `apt-get install ffmpeg` / `brew install ffmpeg`).
- Node.js 18+ (usa solo módulos core: `child_process`, `fs`, `path`).

## Uso

```bash
cd video
npm run cut-silence -- --input /ruta/a/mi-video.mp4
```

El resultado se guarda por defecto en `allimport/video/out/<nombre>-cut.<ext>`. Para especificar
la salida:

```bash
npm run cut-silence -- --input mi-video.mp4 --output video/out/final.mp4
```

### Parámetros configurables

| Flag | Default | Qué controla |
|---|---|---|
| `--input`, `-i` | (requerido) | Archivo de entrada (video o solo audio) |
| `--output`, `-o` | `out/<nombre>-cut.<ext>` | Archivo de salida |
| `--threshold` | `-30` (dB) | Volumen por debajo del cual se considera silencio |
| `--min-silence` | `0.5` (segundos) | Duración mínima de un tramo para contarlo como silencio |
| `--padding` | `0.15` (segundos) | Margen que se conserva a cada lado del corte, para no comerse el arranque/final de una palabra |

## Cómo funciona (mantiene sync audio/video)

1. `ffprobe` obtiene la duración total y detecta si el archivo tiene pista de video.
2. `ffmpeg -af silencedetect` corre en modo análisis (`-f null -`) y devuelve los
   tramos de silencio (`silence_start` / `silence_end`) en su log.
3. Cada tramo de silencio se encoge por `--padding` en ambos extremos (para no
   cortar pegado a la voz) y se calcula el complemento: los tramos "a conservar".
4. Se arma un único `filter_complex` que aplica `trim`/`atrim` + `concat` sobre
   **el mismo archivo de origen**, procesando video y audio en el mismo grafo de
   filtros. Como los puntos de corte son los mismos para ambas pistas y se
   concatenan en el mismo paso, no hay desincronización — no es un pipeline de
   audio separado del de video.
5. Si no se detectó silencio, se copia el archivo tal cual (`-c copy`, sin recodificar).

## Generar un archivo de prueba

No hace falta material real para probar el pipeline:

```bash
cd video
npm run make-test-fixture
npm run cut-silence -- --input samples/test-fixture.mp4
```

`make-test-fixture` genera un clip sintético de 7.5s (tono 2s / silencio 1.2s /
tono 2s / silencio 0.3s / tono 2s) con un patrón de video (`testsrc`) para poder
verificar visualmente que no hay saltos. El silencio de 0.3s es intencionalmente
más corto que el `--min-silence` por defecto (0.5s), así que el corte esperado
es de un solo tramo (~0.9s removidos: 1.2s de silencio menos 0.15s de padding a
cada lado).

## Estructura

```
video/
  package.json          # scripts npm (cut-silence, make-test-fixture)
  .gitignore            # ignora out/ y samples/ (binarios, no se versionan)
  scripts/
    cut-silence.mjs      # pipeline principal
    make-test-fixture.mjs # generador de clip de prueba
  out/                   # salida procesada (gitignored)
  samples/               # archivos de entrada de prueba (gitignored)
```

## Restricciones respetadas
- No modifica nada dentro de `web/` (app Next.js, deploy a GitHub Pages).
- No usa ni crea `web/out/` ni `graphify-out/`.
- Sin dependencias npm nuevas — solo Node core + binarios de sistema (ffmpeg/ffprobe).

Para la guía de referencia y buenas prácticas de edición (dónde este corte de
silencios encaja en el flujo completo de un Reel/TikTok), ver la skill
`skills/sound-design-short-video/`.
