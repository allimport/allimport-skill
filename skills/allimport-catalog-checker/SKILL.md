---
name: allimport-catalog-checker
description: Valida el catálogo de la web de All Import antes de shippear. Use when the user asks to check/verify the catalog, edits web/src/components/site/data.ts, or before a PR that touches products/prices. Chequea naming trademark-safe, precios en ARS, estados válidos, links de WhatsApp al número oficial, y corre el typecheck.
---

# All Import — Catalog Checker

Valida `web/src/components/site/data.ts` (la fuente única del catálogo) y confirma que no rompa el tipado.

## Cuándo usar
- Antes de un PR que toca productos o precios.
- Después de editar `data.ts`.
- Cuando el usuario pide "revisá el catálogo" / "está bien el catálogo".

## Contexto del proyecto (constantes reales)
- Número oficial de WhatsApp: `5493517383945` (constante `WHATSAPP` en `data.ts`; formato humano +54 9 351 738 3945).
- Estados válidos (`ProductState`): `'disponible'`, `'ingresando'`, `'proximo'`.
- Precios: enteros en ARS, formateados con `formatPrice` (locale `es-AR`).
- Naming **trademark-safe**: descripciones genéricas, sin marcas registradas (ej. "Camiseta Argentina", "Auriculares TWS Pro" — NO "AirPods", "JBL", nombres de clubes/marcas deportivas).

## Proceso (ejecutar en orden)

### 1. Inspeccionar el archivo
Leer `web/src/components/site/data.ts` completo. Ubicar el array `PRODUCTS` y las constantes `WHATSAPP`, `waLink`, `STATE_LABEL`.

### 2. Naming trademark-safe
Por cada producto, revisar `name` y `blurb`. **Marcar** cualquier marca registrada o nombre protegido (marcas de audio/tecnología, marcas deportivas, nombres de clubes/ligas). El naming debe ser descriptivo y genérico. Reportar producto + campo + término problemático.

### 3. Precios y estados
- `price`: número entero, positivo, plausible en ARS (no un valor en USD ni con decimales raros). Marcar precios sospechosos.
- `state`: debe ser exactamente uno de `'disponible' | 'ingresando' | 'proximo'`. Marcar cualquier otro valor.

### 4. Links de WhatsApp
Verificar que todo link de WhatsApp se construya con `waLink(...)` sobre la constante `WHATSAPP = "5493517383945"` (no números hardcodeados distintos) y que el texto del mensaje pase por `encodeURIComponent` (lo hace `waLink`). Marcar cualquier link a otro número o mensaje sin codificar.

### 5. Typecheck
Correr:
```bash
cd web && npx tsc --noEmit
```
Debe terminar sin errores. Si falla, reportar el error exacto (archivo:línea) — el cambio de catálogo rompió el tipado.

## Salida esperada (reporte)
Un resumen claro:
- ✅ / ❌ por cada uno de los 5 chequeos.
- Lista de hallazgos con producto, campo y qué corregir.
- Resultado del typecheck (verde o el error).
Si todo pasa: "Catálogo OK, listo para PR." Si algo falla: no dar por bueno el catálogo.

## Reglas
- No modificar `data.ts` automáticamente: primero reportar. Corregir solo si el usuario lo pide.
- No inventar problemas: si un naming es genérico, está bien.
- No tocar `web/out/`.
