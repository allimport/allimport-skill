# proveedores/ — Analizador de chats + base de clientes

Dos cosas: leer los chats de WhatsApp con proveedores para armar una lista de
productos/precios, y una plantilla para cargar tus clientes.

## Archivos
| Archivo | Qué es |
|---|---|
| `analizar_completo.py` | Lee TODOS los ZIP de chats de WhatsApp de la carpeta → `Informe_COMPLETO.html` + `Productos_COMPLETO.csv`. Cada foto = un producto. Sin combos. |
| `CORRER_COMPLETO.bat` | Doble clic en Windows: corre el analizador (no instala nada). |
| `LEEME.txt` | Instrucciones detalladas del analizador. |
| `base-datos-clientes-template.csv` | Plantilla para cargar clientes (nombre, fecha, producto, monto, pago, envío/retiro, teléfono, etiqueta). |

## Analizador — cómo usar (💻 compu)
1. Exportá cada chat de WhatsApp **sin medios o con medios** (el script lee ambos) → ZIP.
2. Poné los ZIP en esta carpeta, junto a `analizar_completo.py` y `CORRER_COMPLETO.bat`.
3. Doble clic en `CORRER_COMPLETO.bat`.
4. Abrí `Informe_COMPLETO.html` (doble clic → navegador, con las fotos).
   El `.csv` se abre con LibreOffice / Excel.

### Cambiar el período
En `analizar_completo.py`, arriba: `DIAS_ATRAS = 9999` (todo). Cambialo a `20`
para los últimos 20 días. Guardá y volvé a correr.

### Qué esperar (honesto)
- Precios reales solamente ($ / "X mil" / miles con punto). Descarta watts, mAh,
  códigos de modelo, años (Mundial 2026), cantidades, teléfonos y links.
- Si el precio está solo dentro de la foto, el producto aparece igual y avisa
  "precio EN LA FOTO".

## Base de clientes
Abrí `base-datos-clientes-template.csv` con LibreOffice/Excel y cargá una fila por
venta o contacto. La columna **etiqueta** sigue el sistema del plan:
`compró` · `potencial` · `curioso` (para el seguimiento por WhatsApp).
