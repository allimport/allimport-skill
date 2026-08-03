# 20 — Context Rules (reglas para TODA IA)

## Propósito
Las reglas que Gemini, Claude Code y cualquier IA futura DEBEN respetar. Es el contrato del ecosistema.

## Reglas duras (no negociables)
1. **Repo = única fuente de verdad (SSOT).** Nada crítico vive fuera de git.
2. **Nunca romper el build.** Verificar (`npm run build`) antes de dar algo por hecho.
3. **Nunca commitear secretos.** Tokens/API keys van a env vars. `.mcp.json` está ignorado.
4. **Nunca `git push --force` ni `git add -A` a ciegas.**
5. **Un cambio = una rama = un PR = validación verde = merge.**
6. **No tocar `web/out/` ni `graphify-out/`** (generados).
7. **No cambiar el Hero / la intro 3D sin aprobación** del dueño (es el corazón de la marca).
8. **No romper el branding** (colores `#0a0f1a`/`#00d4d4`, voz de la marca).
9. **Migraciones aditivas e idempotentes** (`IF NOT EXISTS`), nunca destructivas.

## Reglas de criterio
10. **No sobreingeniería.** Menos herramientas/skills/procesos, más afilados. Borrar > acumular.
11. **No métricas inventadas.** Validar con criterios binarios (¿compila? ¿pasa?). Nada de "40% mejor".
12. **No agregar herramientas/MCP/skills sin justificar** el valor.
13. **Honestidad brutal.** Si algo es mala idea o es humo, decirlo.
14. **Plan antes de tareas grandes.** Mostrar el plan, esperar OK.
15. **Verificar, no suponer.**

## Reglas por rol
- **Gemini:** decide y propone; NO ejecuta código; NO asume el estado del código (lo verifica Claude).
- **Claude Code:** ejecuta y verifica; NO decide estrategia de negocio.

## Restricciones de negocio (marketing)
- No anunciar réplicas ni vapers en Meta (ban). No spam masivo por DM (ban).

## Qué NO hacer
- Violar cualquiera de las reglas duras "porque es más rápido".
- Documentar de más en vez de avanzar.

## Checklist antes de cualquier acción
- [ ] ¿Respeta las 9 reglas duras? · [ ] ¿Suma o acumula? · [ ] ¿Es honesta y verificable?

## Mejoras futuras
Convertir las reglas más violadas en checks automáticos (hooks/CI).
