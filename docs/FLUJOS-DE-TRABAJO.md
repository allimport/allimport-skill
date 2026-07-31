---
tags: [infra, flujos, sesiones, claude-code]
aliases: [Flujos de trabajo, Separar chats]
---

# FLUJOS DE TRABAJO — cómo separar las sesiones de Claude

Regla del proyecto (`CLAUDE.md`): **una tarea = una sesión**. `/clear` entre tareas
distintas, `/compact` dentro de una tarea larga. Este doc define los **4 chats** en los
que se separa el trabajo de All Import, para que cada sesión arranque enfocada, con
contexto limpio, y no se vuelva gigante (como pasó el 2026-07-30, un solo chat mezclando
instalación de skills, soporte de PC y diseño de historias — terminó gastando uso de más).

Los 4 son independientes, pero **todos comparten el mismo repo** — nada se duplica, todo
queda en `git`, cualquier chat puede leer lo que dejó otro (con `git pull` si corresponde).

Por qué 4 y no 3: el diseño visual con Claude Design es justo el tipo de tarea que
disparó el gasto de hoy — muchas capturas, muchas idas y vueltas, iteración larga. Si
va en el mismo chat que escribir guiones (que es rápido y liviano), termina inflando un
chat que debería ser simple. Por eso van separados.

## Chat 1 — General
**Para qué:** coordinación, dudas rápidas, decisiones puntuales, soporte de PC/Remote
Control, temas sueltos que no encajan en los otros tres, o cuando no estás seguro de en
cuál va algo — empezá acá y si se vuelve una tarea grande, migrás al chat que corresponda.
**No dejar crecer demasiado:** si una conversación puntual en este chat se extiende mucho
(como pasó hoy), `/compact` o migrá a un chat nuevo.

## Chat 2 — Guiones y contenido (planificación, liviano)
**Para qué:** escribir guiones de reels/historias, armar el calendario, buscar ganchos —
todo lo que es texto/planificación, sin generar la pieza final todavía. Rápido, pocas
idas y vueltas.
**Carpetas/archivos propios:**
- `contenido/CALENDARIO-SEMANAL.md`, `contenido/GANCHOS-Y-GUIONES.md`,
  `contenido/GUIONES-STORIES.md`, `contenido/HALLAZGOS-VIRALES.md`,
  `contenido/SISTEMA-VENTAS-MARCA-PERSONAL.md`
**Skills típicas:** `/allimport-viral-research` `/viral-hook-generator` `/growth-loops` `/humanizer`
**Entrega a:** cuando el guión está listo, pasa al Chat 3 para convertirse en pieza.
**No toca:** generación de imágenes, Claude Design, Pillow.

## Chat 3 — Producción visual (Claude Design + Pillow, pesado)
**Para qué:** convertir un guión ya escrito en la pieza final — historias, secuencias,
fotos editadas. Acá es donde pasan las rondas largas de feedback visual (colores, tamaños,
contraste, etc.), por eso va solo.
**Carpetas/archivos propios:**
- `historias/` — editor de fotos (`editar_fotos.py`, `editar_historia_pro.py`),
  `stock-fotos/`, `generadas/`
- `contenido/PROMPT-MAESTRO-STORIES.md`
- `docs/DISEÑO.md` — sistema de diseño y reglas visuales validadas
- `video/` — proyecto Remotion
**Herramientas:** Claude Design (`claude.ai/design`) para las secuencias de stories,
Pillow directo para piezas sueltas.
**Nota:** conviene correrlo en **Remote Control** (compu real) cuando se trabaja con fotos
que solo existen ahí — ver `docs/REMOTE-CONTROL.md`.
**No toca:** escribir guiones desde cero (eso ya viene resuelto del Chat 2), agente de
WhatsApp, CRM.

## Chat 4 — Bot de WhatsApp + cosas grandes
**Para qué:** builds grandes y con más riesgo — el agente de WhatsApp, el CRM, infra
pesada (n8n, WAHA), y más adelante la web cuando llegue su fase.
**Carpetas/archivos propios:**
- `contenido/AGENTE-WHATSAPP.md`, `contenido/VOZ-AGUS.md`, `contenido/EJEMPLOS-RESPUESTAS.md`
- `proveedores/base-datos-clientes-template.csv`, skill `allimport-crm`
- `_research/n8n-whatsapp.md` (stack técnico)
- `web/` (cuando llegue la fase, hoy en pausa)
**Skills típicas:** `/allimport-crm`, edición directa de los `.md` de spec.
**Reglas de negocio sensibles** (el agente nunca cobra) — cualquier cambio se revisa con
más cuidado que en los otros chats.
**No toca:** contenido de redes, edición visual.

## Infra / soporte (vive en Chat 1, no es un chat propio)
Graphify, Obsidian, Remote Control, seguridad — se tocan desde el Chat General cuando
hace falta, no ameritan un chat propio salvo que la tarea sea grande.

## Si en el futuro hace falta un 5to chat
Señal de alerta: si un chat empieza a mezclar dos tipos de tarea distintos otra vez (por
ejemplo, CRM se vuelve tan grande como el bot de WhatsApp), separarlo ahí, no antes. No
crear chats "por las dudas" — cada chat de más es una sesión más para arrancar y acordarse
en cuál va cada cosa.

## Cómo arrancar cada chat
1. `/clear` (o sesión nueva) antes de cambiar de chat.
2. Decirle a Claude cuál de los 4 es ("estamos en el chat de producción visual").
3. Claude lee solo lo de ESE chat — no repasa todo el repo de punta a punta.
4. Al cerrar, todo lo durable queda commiteado — el próximo chat (sea cual sea) lo
   encuentra ahí, no hay que repetir contexto.
5. Si un chat se pone largo (muchas capturas, muchas idas y vueltas), `/compact` antes de
   que el gasto se dispare — no esperar a que ya sea tarde.

## Relación con Gemini
El Gem sigue siendo uno solo (no se separa por chat) — genera el "PROMPT PARA CLAUDE" para
el paso que corresponda, y ese prompt ya indica implícitamente a cuál de los 4 chats va
por las carpetas que toca (`CONTEXTO:` del prompt).
