---
tags: [infra, flujos, sesiones, claude-code]
aliases: [Flujos de trabajo, Separar chats]
---

# FLUJOS DE TRABAJO — cómo separar las sesiones de Claude

Regla del proyecto (`CLAUDE.md`): **una tarea = una sesión**. `/clear` entre tareas
distintas, `/compact` dentro de una tarea larga. Este doc define los 3 módulos en los que
se separa el trabajo de All Import, para que cada sesión de Claude arranque enfocada, con
contexto limpio, y no mezcle carpetas ni objetivos.

Los 3 módulos son independientes entre sí, pero **todos comparten el mismo repo** — nada
se duplica, todo queda en `git`, cualquier sesión puede leer lo que dejó otra (con `git
pull` si corresponde).

## Módulo 1 — Contenido / Redes (O1)
**Para qué:** investigar viralidad, escribir ganchos y guiones, planear el calendario.
**Carpetas/archivos propios:**
- `contenido/` — `CALENDARIO-SEMANAL.md`, `GANCHOS-Y-GUIONES.md`, `HALLAZGOS-VIRALES.md`, `DESIGN.md`
- `_research/OBJETIVOS.md`, `_research/PROXIMOS-PASOS.md` (para ubicar el paso A#)
**Skills típicas:** `/allimport-viral-research` `/viral-hook-generator` `/growth-loops` `/humanizer`
**No toca:** `contenido/VOZ-AGUS.md` como fuente (solo lectura), `historias/`, `video/`,
nada del agente de WhatsApp ni del CRM.

## Módulo 2 — Producción visual (edición de fotos/video)
**Para qué:** editar fotos reales a historias, generar clips con Remotion, carruseles.
**Carpetas/archivos propios:**
- `historias/` — editor de fotos (`editar_fotos.py`)
- `video/` — proyecto Remotion
- Lee `contenido/DESIGN.md` (branding) y `contenido/GANCHOS-Y-GUIONES.md` (qué pieza corresponde a qué guion)
**Nota:** esta es la sesión que más conviene correr en **Remote Control** (compu real),
porque procesa fotos/archivos que solo existen ahí — ver `docs/REMOTE-CONTROL.md`.
**No toca:** guiones (los consume, no los escribe), agente, CRM.

## Módulo 3 — Agente de WhatsApp + CRM (O2 + O3)
**Para qué:** todo lo que define cómo responde el agente y cómo se guarda cada cliente.
**Carpetas/archivos propios:**
- `contenido/AGENTE-WHATSAPP.md`, `contenido/VOZ-AGUS.md`, `contenido/EJEMPLOS-RESPUESTAS.md`
- `proveedores/base-datos-clientes-template.csv`, skill `allimport-crm`
- `_research/n8n-whatsapp.md` (stack técnico)
**Skills típicas:** `/allimport-crm`, edición directa de los `.md` de spec (no hay skill
dedicada al agente en sí — es documento de spec, ver `03-HERRAMIENTAS-Y-MODELOS.md`).
**No toca:** contenido de redes, edición visual. Este módulo tiene reglas de negocio
sensibles (el agente nunca cobra) — cualquier cambio ahí se revisa con más cuidado.

## Infra / soporte (transversal, no es "módulo 4")
Cosas que no pertenecen a ningún módulo de negocio: Graphify, Obsidian, Remote Control,
seguridad, la web. Viven en `docs/` y `_research/gem/`, se tocan en sesiones aparte cuando
hace falta (no se mezclan con los 3 módulos de arriba).

## Cómo arrancar cada sesión
1. `/clear` (o sesión nueva) antes de cambiar de módulo.
2. Decirle a Claude qué módulo es ("estamos en el módulo de contenido / de edición / del agente").
3. Claude lee solo las carpetas de ESE módulo — no repasa todo el repo de punta a punta.
4. Al cerrar, todo lo durable queda commiteado — la próxima sesión (sea cual sea) lo
   encuentra ahí, no hay que repetir contexto en el chat.

## Relación con Gemini
El Gem sigue siendo uno solo (no se separa por módulo) — genera el "PROMPT PARA CLAUDE"
para el paso que corresponda, y ese prompt ya indica implícitamente el módulo por las
carpetas que toca (`CONTEXTO:` del prompt).
