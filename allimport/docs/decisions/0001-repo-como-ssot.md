# ADR 0001 — El repo git es la única fuente de verdad

**Fecha:** 2026-07-20 · **Estado:** aceptado

## Contexto
Se evaluó (informe de Gemini) usar Obsidian como fuente única de verdad (SSOT),
con sync bidireccional ChatGPT/Obsidian/código.

## Decisión
El **SSOT es el repo git** (`CLAUDE.md` + `allimport/docs/` + `.claude/`). Obsidian, si se
usa, **apunta su bóveda a `allimport/docs/`** — misma carpeta, sin sync. ChatGPT/Gemini son
sparring desechable; lo que sirve se baja al repo a mano.

## Por qué
- El SSOT de código tiene que ser versionado, revisado en PR y diffeable.
- Un segundo almacén (Obsidian con REST API) deriva y agrega fricción = lo contrario a lo buscado.
- Claude Code lee el repo nativo; no necesita puentes.

## Descartado
- Obsidian como SSOT separado. Sync bidireccional automático de docs (sobreingeniería).
- ChatGPT en el ecosistema (se usa Gemini + Claude).
