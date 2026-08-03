# 10 — Frontend

## Propósito
Documentar el frontend real de All Import (la landing).

## Alcance
`web/` — Next.js 15 (App Router) + React 19 + three.js/react-three-fiber + Tailwind 4 + TypeScript. Export estático a GitHub Pages.

## Estructura
```
web/src/app/        page.tsx, layout.tsx, globals.css, error.tsx, loading.tsx,
                    not-found.tsx, robots.ts, sitemap.ts, manifest.ts
web/src/components/
  intro/            experiencia 3D (Scene, Fluid, Particles, CameraRig, ...)
  site/             Hero, Catalog, Reveal, data.ts (catálogo = SSOT)
  sections/         Trust, Historia, Comparación, Cómo funciona, Testimonios, CTA
web/src/lib/        site.ts (URLs absolutas, basePath)
web/docs/           docs de marca/diseño (01_BRAND … 16_IMPLEMENTATION_RULES)
```

## Catálogo (fuente única)
`web/src/components/site/data.ts` — productos, precios (ARS), estados, WhatsApp, Instagram. Cambios de catálogo se hacen SOLO acá.

## Marca / estilo
- Colores: `--bg #0a0f1a`, `--cyan #00d4d4`, `--white`.
- Fuente: Montserrat Alternates.
- Filosofía visual completa en `13-DESIGN-SYSTEM.md` y `web/docs/`.

## Estados (resiliencia — doc #13)
`error.tsx` (boundary con reintento + WhatsApp), `loading.tsx` (spinner de marca), `not-found.tsx` (404 con CTA a inicio/WhatsApp).

## Comandos
`cd web && npm run dev` (local) · `npm run build` (export) · `npx tsc --noEmit`.

## Buenas prácticas
- Server Components por defecto; `"use client"` solo donde hace falta (ej. Hero, error).
- Rutear assets por `assetPath()` (basePath de Pages).
- Respetar `prefers-reduced-motion` en la intro 3D.

## Qué NO hacer
- Tocar `web/out/` (generado).
- Romper el catálogo `data.ts` sin verificar el build.

## Errores comunes
- Rutas de imágenes sin `basePath` → rotas en Pages.
- `next lint` standalone (deprecado/interactivo) → usar `npm run build`.

## Checklist de cambio en la web
- [ ] `npm run build` verde · [ ] intro 3D + Hero + catálogo intactos · [ ] estados error/loading/404 ok.

## Mejoras futuras
Visual regression (Playwright) · optimización de bundle 3D · dominio propio (`NEXT_PUBLIC_SITE_URL`).
