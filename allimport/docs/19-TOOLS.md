# 19 — Tools (herramientas del ecosistema)

## Propósito
Inventario de herramientas: rol, ventajas, cuándo usar, cuándo evitar.

## Tabla
| Herramienta | Rol | Cuándo usar | Cuándo evitar |
|---|---|---|---|
| **Claude Code** | Ingeniero (ejecuta código) | construir, testear, commitear | pensar estrategia de negocio |
| **Gemini** | Director técnico / estratega | decidir, investigar, generar prompts | escribir/editar código |
| **GitHub** | Verdad del código + CI | siempre (repo, PRs, Actions) | — |
| **Playwright** | Ojos en el navegador | QA, visual regression de la landing | tests unitarios puros |
| **context7** | Docs de librerías al día | dudas de Next/React/Tailwind | conceptos generales |
| **Supabase** | Backend (DB/Auth/Storage) | cuando exista el producto (Ola 4) | antes del producto |
| **Figma / Google Stitch** | Diseño → código | handoff visual, generar UI | tareas sin diseño |
| **Obsidian** | Vista personal de `allimport/docs/` | notas propias | como fuente de verdad del agente |
| **Graphite** | Stacked PRs | alto volumen de PRs (Ola 5) | dev solo / poco volumen |
| **Higgsfield** | Media (imágenes/video) | contenido de marketing | desarrollo |
| **Cursor** | IDE con IA (alternativa) | edición local si se prefiere | (opcional; Claude Code cubre) |
| **Vercel** | Deploy con previews | si la web se muda de Pages | mientras Pages alcance |
| **Sentry** | Monitoreo de errores | con producto en prod (Ola 5) | sin producto |

## Herramientas pagas (hoy)
Claude + Gemini (+ Higgsfield si hace falta). ~USD 60/mes. Todo lo demás (GitHub, Playwright, context7, Obsidian, Stitch) es gratis.

## Qué NO hacer
- Sumar una herramienta sin justificar el valor (regla anti-bloat).
- No-code (Zapier/Make) para mover código/docs.

## Errores comunes
- Duplicar capacidades (ya pasó con MCP filesystem/git).
- Pagar herramientas que no se usan.

## Checklist para sumar una herramienta
- [ ] ¿Resuelve algo que las actuales no? · [ ] ¿El costo se justifica? · [ ] ¿No duplica?

## Mejoras futuras
Revisar el stack cada trimestre; sumar Supabase/Vercel/Sentry cuando llegue el producto.
