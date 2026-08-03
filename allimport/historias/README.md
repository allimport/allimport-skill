# historias/ — Editor de fotos para historias de Instagram

Herramienta que toma tus **fotos reales** de producto y las convierte en historias
1080×1920 con la marca All Import (marco cyan, precio, texto, CTA). **No usa IA para
inventar la foto** — edita la que vos sacás.

## Archivos
| Archivo | Qué es |
|---|---|
| `editar_fotos.py` | El editor (Python + Pillow). |
| `CORRER_EDITAR.bat` | Doble clic en Windows: instala Pillow la 1ª vez y corre el editor. |

## Cómo usar (💻 compu)
1. Copiá tus fotos a esta carpeta.
2. Nombrá cada foto por producto: `tws.jpg`, `parlante.jpg`, `powerbank.jpg`,
   `kit.jpg`, `lightning.jpg`, `usbc.jpg`, `vaper.jpg`, `figuritas.jpg`
   (podés tener varias: `tws-1.jpg`, `tws-2.jpg`, …).
3. Doble clic en `CORRER_EDITAR.bat`.
4. Las historias listas salen en la subcarpeta `allimport/historias/` que crea el script.
5. Las subís vos por el teléfono 📱.

## Editar productos, precios o textos
Abrí `editar_fotos.py` con el Bloc de notas y editá la lista `PRODUCTOS`
(cada línea: palabras del nombre del archivo, título, precio, subtexto, badge, color).

## Branding
Respeta [`../contenido/DESIGN.md`](../contenido/DESIGN.md): NAVY `#0a0f1a`, CYAN `#00d4d4`.
