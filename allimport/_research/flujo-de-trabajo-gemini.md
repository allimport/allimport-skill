# Flujo de trabajo — división de tareas (para Gemini)

Gemini: usá este archivo para saber, en cada paso, qué te toca a vos y qué al dueño.
- 🤖 = generá vos el "PROMPT PARA CLAUDE" (el dueño lo pega en Claude Code; Claude ejecuta).
- 🙋 = es tarea del dueño (crear cuenta, subir archivo, practicar). Explicale cómo, NO generes prompt de código.
- 🤝 = el dueño primero consigue algo (token/cuenta), y DESPUÉS vos generás el prompt para Claude.

Estado honesto: ✅ HECHO = funciona de verdad. ⬜ FALTA = todavía no se hizo (aunque haya info guardada).

## Ya HECHO (no hace falta tocar)
- ✅ Cimientos: CLAUDE.md, secretos, CI, settings, web (404/error/carga), 2 subagentes, skills podadas.
- ✅ Context Pack `allimport/docs/` (24 documentos).
- ✅ #21 Gemini (este asistente).
- ✅ #13 estados que se rompen en la web.

## Lo que FALTA — en orden

| # | Paso | Símbolo | Qué implica |
|---|---|---|---|
| 03 | Sumar agentes útiles del repo | 🤖 | Gemini genera el prompt; Claude clona/copia los subagentes de `contains-studio/agents`. Dueño no consigue nada. |
| 11 | Google Stitch (diseño→código) | 🤝 | Dueño saca su **API key de Google**; después Gemini genera el prompt y Claude conecta el MCP. |
| 02 | Agente de WhatsApp | 🤝 | Dueño decide **Meta o Twilio** y consigue la cuenta/credenciales; después Claude lo arma. |
| 05 | Claude + Meta (campañas) | 🤝 | Dueño necesita **cuenta Meta Business**; después se estructuran las campañas. (Ojo: no anunciar réplicas/vapers.) |
| 10 | IA capta clientes (legal) | 🤝 | Requiere el agente de WhatsApp (#02) + Instagram del dueño. Solo opt-in, nada de spam. |
| 17 | Editor de videos | 🤖 | Gemini/Claude evalúan el repo de video; Claude prepara lo que se pueda. |
| 07 | Obsidian (segundo cerebro) | 🙋 | Tarea del dueño en su compu: instalar Obsidian y apuntar la bóveda a `allimport/docs/`. (opcional) |
| 15 | Conectores | 🤝 | Dueño pasa tokens (GitHub/Supabase/Figma); Claude los activa. (opcional) |
| 22 | Proyectos en Claude (varios) | 🙋 | Tarea del dueño en el navegador: crear los proyectos y pegar instrucciones. (cerca del final) |
| 01 | Terminar la web | 🤝 | Dueño da feedback de qué cambiar; Claude lo ejecuta y verifica. (ÚLTIMO) |

## Cómo pedir un paso (frase del dueño)
"Gemini, quiero hacer [PASO]. Según el plan y el contexto, decime cómo lo hacemos, qué necesito conseguir yo, y si corresponde generame el PROMPT PARA CLAUDE."

## Recordatorio para Gemini
- Vos NO ves el código real; tus prompts son propuestas. Claude los verifica en el repo antes de ejecutar.
- Nada de métricas inventadas. Honestidad directa.
- Si un paso es 🙋 (tarea del dueño), NO generes prompt de código: explicá los pasos que tiene que hacer él.
