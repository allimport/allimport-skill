# 15 — Decisiones (ADR)

## Propósito
Registrar las decisiones de arquitectura importantes y su porqué, para no re-discutirlas.

## Alcance
Índice de ADRs. Cada decisión concreta vive en `docs/decisions/NNNN-titulo.md`.

## Plantilla de ADR
```md
# ADR NNNN — <título>
**Fecha:** AAAA-MM-DD · **Estado:** propuesto | aceptado | reemplazado

## Contexto
Qué problema/decisión se enfrenta.

## Decisión
Qué se decidió, en una frase clara.

## Por qué
Las razones. Alternativas consideradas.

## Descartado
Qué NO se eligió y por qué.

## Consecuencias
Qué implica a futuro.
```

## Decisiones ya tomadas
| # | Decisión | Estado |
|---|---|---|
| 0001 | El repo git es la única fuente de verdad (Obsidian apunta a `docs/`, sin sync) | aceptado |
| — | ChatGPT fuera del ecosistema; cerebro = Gemini | aceptado |
| — | Trunk-based + PRs chicos; Graphite diferido a Ola 5 | aceptado |
| — | MCP fino: se sacaron filesystem y git (redundantes) | aceptado |
| — | Poda de skills 87→77 (teoría pura eliminada); objetivo ~20 | en curso |
| — | `#10` (captación) se reescribe legal: opt-in, no spam masivo | aceptado |
| — | No anunciar réplicas/vapers en Meta (orgánico + WhatsApp) | aceptado |

*(Las que tienen `#` propio están en `docs/decisions/`; el resto se pueden formalizar ahí cuando convenga.)*

## Qué NO hacer
- Tomar una decisión grande sin registrarla → se re-discute y se pierde el porqué.

## Buenas prácticas
- Una ADR por decisión relevante, numerada e inmutable (si cambia, se crea una nueva que reemplaza).

## Errores comunes
- ADRs que describen el "cómo" en vez del "por qué".

## Checklist
- [ ] ¿La decisión es relevante y durable? · [ ] ¿Registró contexto + por qué + descartado?

## Mejoras futuras
Formalizar como ADR numeradas las decisiones sueltas de la tabla.
