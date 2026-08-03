# video/ — Producción (Remotion) + post-procesamiento (ffmpeg)

Dos herramientas conviven en esta carpeta, con propósitos distintos y complementarios:

1. **Producción de clips de producto** — proyecto [Remotion](https://www.remotion.dev/)
   (video con React) para generar clips verticales 1080×1920 de producto: ken-burns
   lento sobre tu foto real + marca, badge, precio animado y CTA. Sirven para
   historias/reels de producto (no para los reels de autoridad, que van a cámara).
2. **Corte de silencios** — pipeline liviano (`scripts/cut-silence.mjs`, ffmpeg + Node,
   sin dependencias) para detectar y eliminar pausas muertas de un video/audio crudo
   (ej. un reel a cámara) antes de montar, manteniendo audio y video sincronizados. Ver
   `../docs/VIDEO-PIPELINE.md` para el detalle completo y `npm run cut-silence -- --input
   archivo.mp4` / `npm run make-test-fixture` para usarlo.

## Estructura
| Ruta | Qué es |
|---|---|
| `src/Reel.tsx` | La composición: animaciones, marca, precio, badge. |
| `src/Root.tsx` | Registra la composición `Reel` (1080×1920, 150 frames, 30fps) y sus props por defecto. |
| `src/index.ts` | Entry point de Remotion. |
| `public/producto.jpg` | Foto de ejemplo (reemplazala por la tuya). |
| `package.json` / `tsconfig.json` / `remotion.config.ts` | Config del proyecto. |

> `node_modules/` y `out/` no se versionan (se generan). Ver `.gitignore`.

## Cómo correrlo (💻 compu, Node 18+)
```bash
cd video
npm install            # instala Remotion (1ª vez)
npx remotion studio    # editor visual en el navegador
```

Renderizar a MP4:
```bash
npx remotion render Reel out/reel.mp4 \
  --props='{"foto":"producto.jpg","titulo":"Auriculares TWS","precio":"$32.000","sub":"Cancelación de ruido","badge":"DISPONIBLE"}'
```

### Nota del entorno (headless)
En un entorno sin pantalla, si el render falla por Chromium, pasá el ejecutable:
```bash
npx remotion render Reel out/reel.mp4 --browser-executable=<ruta a headless_shell/chrome>
```
El host `remotion.media` puede estar bloqueado por proxy; usar Chromium local.

## Branding
Colores y tono en [`../contenido/DESIGN.md`](../contenido/DESIGN.md).
