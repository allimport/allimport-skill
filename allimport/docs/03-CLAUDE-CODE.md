# 03 — Claude Code (el Ingeniero)

## Propósito
Definir cómo trabaja Claude Code dentro del ecosistema: responsabilidades, límites, flujo y reglas para tocar el repo.

## Alcance
El motor de ejecución. Lee el repo nativo, escribe código, prueba, commitea.

## Responsabilidades
- Implementar cambios concretos en `web/` y en la config del repo.
- Verificar todo lo que hace (`npm run build`, `tsc`, tests) antes de darlo por hecho.
- Mantener `CLAUDE.md` y `allimport/docs/` al día.
- Trabajar en ramas `claude/<descripcion>`, un PR por cambio lógico.

## Qué hace
Ejecuta prompts concretos (idealmente generados por Gemini), edita archivos, corre comandos, commitea y pushea, deja el diff como evidencia.

## Qué NO hace
- No inventa métricas ni da por hecho lo que no verificó.
- No commitea secretos ni hace `push --force`/`add -A` a ciegas.
- No toca `web/out/` ni `graphify-out/`.
- No decide estrategia de negocio (eso es Gemini).

## Flujo de trabajo
1. Recibe un objetivo concreto. 2. Para algo grande → plan primero (`/plan`). 3. Ejecuta en una rama. 4. Verifica (build/lint/tests o subagente `web-qa`). 5. Commit + push. 6. Muestra el resultado.

## Comandos frecuentes (los 5 nativos + su uso para ahorrar tokens)
| Comando | Qué hace | Cuándo usarlo (optimización) |
|---|---|---|
| `/init` | Genera/actualiza `CLAUDE.md` | Al abrir una carpeta nueva; evita re-explicar el proyecto en cada sesión (ahorro grande de tokens). |
| `/context` | Muestra el % de ventana usado | Chequear antes de una tarea larga; si está alto, cortar o comprimir. |
| `/compact` | Comprime el chat guardando lo importante | Cuando una MISMA tarea larga llena la ventana y no querés perder el hilo. |
| `/clear` | Limpia el contexto y arranca de cero | **Entre tareas distintas.** Es lo que más ahorra: no arrastrás contexto podrido. |
| `/plan` | Modo plan: propone antes de ejecutar | Cambios grandes/delicados; evita que ejecute de más. *(En el entorno web se activa por otro mecanismo.)* |
| `/agents` | Crea/edita subagentes con tarea fija | Para roles repetidos (reviewer, web-qa); acotan contexto por tarea. |

- Repo: `cd web && npm run dev/build`, `npx tsc --noEmit`.
- Regla de tokens: **una tarea = una sesión**; `/clear` entre tareas; `/compact` dentro de una tarea larga.

## Buenas prácticas
- Una tarea = una sesión. `/clear` entre tareas distintas.
- Ser específico en el pedido (mala: "mejorá la web"; buena: "en el Hero, agrandá el botón de WhatsApp").
- Usar subagentes `reviewer` y `web-qa` antes de un PR.

## Reglas para editar el repositorio
Ver reglas de oro en `00-VISION.md`. Nunca romper el build; secretos en env; ramas `claude/*`.

## Errores comunes
- Sesiones eternas sin `/clear` → contexto podrido.
- Pedir 5 cosas juntas → hace 3 bien y 2 mal.
- Aceptar sin revisar el diff.

## Checklist antes de un PR
- [ ] `npm run build` verde · [ ] typecheck OK · [ ] diff revisado · [ ] sin secretos · [ ] rama `claude/*`.

## Mejoras futuras
GitHub Action `@claude` para review/fix en PRs (Ola 3).
