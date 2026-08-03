# 07 — Graphite

## Propósito
Definir si/ cuándo usar Graphite (stacked PRs) en el proyecto.

## Alcance
Gestión del flujo de PRs. **Hoy: NO se usa (diferido a Ola 5).**

## Qué es
Herramienta para **stacked PRs**: dividir un feature grande en PRs chicos, encadenados y dependientes, que se mergean rápido en cadena.

## Cuándo usarlo
- Equipo con alto volumen de PRs.
- Features grandes que se parten en 4-5 PRs dependientes.
- CI rápido (<10 min).

## Cuándo NO usarlo (situación actual)
- Dev solo / equipo chico.
- Landing + skills, sin volumen de PRs.
→ Stacked PRs agregan carga mental sin retorno. **Con `git` + `gh` y PRs chicos sobre trunk alcanza.**

## Veredicto honesto
La promesa de "velocidad x3" es marketing. Graphite es bueno **cuando duele el volumen de PRs**, y hoy no duele. **Diferido.**

## Workflow (cuando se adopte)
`gt create` por unidad lógica · `gt submit --stack` · `gt sync` para rebasar el stack · auto-merge de GitHub en verde.

## Herramientas involucradas
Graphite CLI, GitHub, CI.

## Errores comunes
- Adoptarlo por moda sin volumen → complejidad inútil.
- CI lento + stacks → cuello de botella peor.

## Checklist para adoptarlo
- [ ] ¿Hay volumen real de PRs? · [ ] ¿CI <10 min? · [ ] ¿features que necesitan encadenarse?

## Mejoras futuras
Reevaluar en Ola 5 o si se suma equipo.
