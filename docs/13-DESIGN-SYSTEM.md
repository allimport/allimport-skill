# 13 — Design System

## Propósito
Capturar la filosofía visual y el sistema de diseño de All Import.

## Alcance
La identidad de la landing y de cualquier UI futura (web, panel, materiales de marca).

## Referencia detallada
La documentación de marca/diseño ya existe y es extensa en `web/docs/`:
`01_BRAND.md`, `02_DESIGN_SYSTEM.md`, `03_INTRO_EXPERIENCE.md` … `16_IMPLEMENTATION_RULES.md`. **Ese es el detalle canónico.** Este archivo es el resumen/índice.

## Tokens base
- **Colores:** `--bg #0a0f1a` (navy oscuro), `--cyan #00d4d4` (acento), `--white #ffffff`.
- **Tipografía:** Montserrat Alternates (700/800, italic/normal).
- **Superficie:** fondo oscuro, contenido que sube sobre un canvas 3D fijo.

## Filosofía visual
- **Vitrina nocturna:** producto premium sobre negro, con una intro 3D de "energía/fluido" que entrega al contenido.
- **Honestidad primero:** sin escasez falsa, sin contadores de stock inventados (ver `data.ts`). Estados honestos: disponible/ingresando/próximo.
- **Conversión:** el catálogo vende; el CTA lleva a productos; WhatsApp siempre a un toque.
- **Confianza:** "ves el producto antes de pagar", entrega en mano, trato personal.

## Voz / copy
Argentino, cercano, directo, sin humo. Cliente joven. (Detalle en `web/docs/05_LANDING_NARRATIVE.md`.)

## Qué NO hacer
- Romper la coherencia de color (todo respeta bg/cyan).
- Escasez o urgencia falsa.
- Nombrar marcas registradas en los productos (naming trademark-safe en `data.ts`).

## Herramientas
Figma / Google Stitch (diseño → código), skills `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `taste-skill`.

## Errores comunes
- Páginas nuevas que ignoran los tokens de marca.
- Copy genérico "de IA" (usar humanizer / anti-ai-style).

## Checklist para una pantalla nueva
- [ ] ¿Usa bg/cyan? · [ ] ¿Copy en la voz de la marca? · [ ] ¿Respeta `prefers-reduced-motion`? · [ ] ¿CTA a WhatsApp presente?

## Mejoras futuras
Extraer tokens a variables reutilizables; sistema de componentes si crece la UI.
