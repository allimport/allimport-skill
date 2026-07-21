# 14 — Cómo documentar

## Propósito
Definir cómo se escribe y mantiene la documentación del proyecto.

## Alcance
Todo `docs/` + `CLAUDE.md` + `_research/`.

## Dónde va cada cosa
| Tipo | Lugar |
|---|---|
| Reglas que el agente lee siempre | `CLAUDE.md` (corto, <200 líneas) |
| Arquitectura, áreas, decisiones | `docs/00..16` |
| Decisiones puntuales (ADR) | `docs/decisions/NNNN-*.md` |
| Conocimiento/investigación/prompts | `_research/` |
| Detalle de marca/diseño | `web/docs/` |
| Negocio/estrategia efímera | Gemini / Claude Projects (NO el repo) |

## Reglas de escritura
- **Markdown**, claro y directo. Español.
- Cada doc de área: propósito, alcance, responsabilidades, qué hace / qué NO, herramientas, flujo, buenas prácticas, errores comunes, checklist, mejoras futuras.
- **No documentos vacíos.** Si algo no existe aún (backend), decir "FUTURO" y fijar principios, sin inventar detalle.
- Diagramas en **Mermaid** (se renderizan en GitHub).
- **Sin humo:** nada de métricas inventadas.

## Mantenimiento
- Al cambiar el código, actualizar el doc del área en el mismo PR.
- CLAUDE.md apunta a `docs/`; `docs/README.md` es el índice.

## Qué NO hacer
- Sobre-documentar (pasar semanas escribiendo en vez de avanzar).
- Duplicar: si ya está en otro doc, enlazar, no copiar.

## Herramientas
Markdown, Mermaid, Claude Code (mantiene los docs), Obsidian (los lee).

## Errores comunes
- Docs que quedan viejos porque no se actualizan con el código.
- Copiar la misma info en 3 archivos.

## Checklist para un doc
- [ ] ¿Tiene las secciones estándar? · [ ] ¿No duplica? · [ ] ¿Es honesto sobre lo que existe vs futuro?

## Mejoras futuras
Auto-chequeo de links rotos; recordatorio de actualizar docs en PRs que tocan su área.
