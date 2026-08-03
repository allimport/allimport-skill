# 12 — Testing

## Propósito
Definir la estrategia de pruebas del proyecto.

## Alcance
Hoy: la landing (`web/`). Futuro: el producto (Ola 4).

## Estado actual (honesto)
- ✅ Gate de CI: `tsc --noEmit` + `npm run build` en cada PR (el build valida tipos y lint).
- ⬜ Visual regression de la landing 3D: **pendiente** (Ola 2).
- ⬜ Tests unitarios / E2E del producto: **cuando exista** (Ola 4).

## Niveles previstos
| Nivel | Herramienta | Cuándo |
|---|---|---|
| Typecheck + build | tsc + next build (CI) | ✅ ya |
| Visual regression | Playwright `toHaveScreenshot()` | Ola 2 |
| E2E | Playwright | con flujos reales |
| Unit | (según stack del producto) | Ola 4 |

## Visual regression (landing 3D) — plan
El 3D es no determinista. Mitigar: fijar seed/tiempo, `prefers-reduced-motion`, esperar frame estable, umbral de diff tolerante. Snapshot de hero/intro/catálogo. Correr en CI headless con imagen fija.

## Qué NO hacer
- Tests frágiles que fallan por ruido (baseline mal fijado).
- Testear la intro 3D sin tolerancia → flaky.

## Herramientas
Playwright (MCP + `@playwright/test`), CI de GitHub. Skills: `playwright-automation`, `visual-regression-testing`, `webapp-testing`, `unit-test-generator`.

## Errores comunes
- Añadir un gate que cuelga (ej. `next lint` interactivo — ya resuelto).
- No fijar baseline → visual regression inútil.

## Checklist
- [ ] ¿El cambio pasa el build? · [ ] ¿Hay baseline visual si toca la intro? · [ ] ¿Los tests son estables?

## Mejoras futuras
Sumar visual regression (Ola 2); E2E de checkout cuando exista producto.
