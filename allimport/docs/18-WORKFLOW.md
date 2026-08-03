# 18 — Workflow (de la idea a producción)

## Propósito
El flujo oficial: cómo una idea se convierte en algo funcionando, paso a paso, con checkpoints.

## Alcance
Aplica a cualquier cambio (web, config, docs). El producto (futuro) usará el mismo esqueleto.

## Flujo oficial
```
IDEA
 │  (dueño la plantea)
 ▼
GEMINI  ── piensa, decide, genera PROMPT PARA CLAUDE  ── checkpoint: ¿prompt concreto?
 │
 ▼
CLAUDE CODE  ── verifica en el repo → plan (si es grande) → ejecuta en rama claude/*
 │                                                         checkpoint: ¿plan aprobado?
 ▼
VALIDACIÓN  ── npm run build + tsc + subagente web-qa/reviewer
 │              checkpoint: ¿verde? si no → volver a Claude Code
 ▼
PR + CI  ── GitHub corre typecheck + build   ── checkpoint: ¿CI verde?
 │
 ▼
MERGE  ── a main
 │
 ▼
DEPLOY  ── pages.yml → export estático → GitHub Pages
 │
 ▼
PRODUCCIÓN
```

## Checkpoints (no saltárselos)
1. **Prompt concreto** (no vago) antes de ejecutar.
2. **Plan aprobado** para tareas grandes/delicadas (`/plan`).
3. **Build verde** antes del PR.
4. **CI verde** antes del merge.
5. **Revisión del diff** por el humano.

## Reglas
- Un cambio = una rama = un PR = validación verde = merge.
- Una tarea por sesión; `/clear` entre tareas.

## Qué NO hacer
- Ejecutar sin verificar. Mergear con CI en rojo. Meter 5 cambios en un PR.

## Roles en el flujo
Gemini decide · Claude Code ejecuta y verifica · GitHub valida y deploya · el dueño aprueba.

## Errores comunes
- Saltar el plan en tareas grandes → se va de tema.
- No verificar → bugs silenciosos.

## Checklist de una tarea
- [ ] Prompt concreto · [ ] rama `claude/*` · [ ] build verde · [ ] diff revisado · [ ] CI verde · [ ] merge.

## Mejoras futuras
Automatizar la validación con `@claude` en el PR (Ola 3).
