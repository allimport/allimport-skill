# 06 — MCP (Model Context Protocol)

## Propósito
Documentar los servidores MCP (los "brazos" de Claude Code) actuales y los que conviene sumar.

## Alcance
Config en `.mcp.json` (local, ignorado por git) con plantilla en `.mcp.json.example`.

## MCP actuales (plantilla lean)
| MCP | Para qué | Estado |
|---|---|---|
| playwright | browser, QA, visual regression | activo |
| supabase | DB del producto (futuro) | token pendiente |
| figma | diseño → código | token pendiente |
| context7 | docs actualizadas de librerías | activo |
| ~~filesystem~~ | **sacado** — Claude ya lee archivos nativo | eliminado |
| ~~git~~ | **sacado** — Claude ya usa git por Bash | eliminado |

## MCP recomendados para este proyecto (investigación)
| MCP | Para qué | Cuándo | Prioridad |
|---|---|---|---|
| GitHub | issues, PRs, CI desde el agente | ya | alta |
| Playwright | ojos en el navegador (landing 3D) | ya | alta |
| context7 | Next 15 / R3F / Tailwind al día | ya | alta |
| Supabase | esquema + branching del producto | Ola 4 | alta (con producto) |
| Figma / Stitch | handoff de diseño | al diseñar | media |
| Vercel | deploy con preview por PR | si migra de Pages | media |

## Cuándo NO sumar un MCP
- Si duplica algo nativo (filesystem/git).
- Si trae un token que se puede filtrar y no aporta valor claro.
- MCP de terceros que ejecutan código local sin auditar (riesgo).

## Buenas prácticas
- Tokens SIEMPRE en env / `.mcp.json` local ignorado. Nunca en git.
- MCP fino: pocos y con propósito.

## Errores comunes
- API key inline en `args` (queda en logs de proceso).
- Commitear `.mcp.json` con tokens (por eso está en `.gitignore`).

## Checklist para un MCP nuevo
- [ ] ¿Resuelve algo que lo nativo no? · [ ] ¿token por env? · [ ] ¿prioridad real?

## Mejoras futuras
Activar Supabase MCP en Ola 4; evaluar Vercel MCP si la web se muda.
