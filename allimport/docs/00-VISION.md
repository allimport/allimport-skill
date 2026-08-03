# 00 — Visión

## Propósito
Definir la filosofía, los objetivos y las reglas que gobiernan TODO el ecosistema de All Import. Es el documento que cualquier IA (Gemini o Claude Code) lee primero para entender "por qué" existe este proyecto y cómo se toman decisiones.

## Alcance
- Filosofía, principios y reglas de oro del ecosistema.
- Qué queremos construir y cómo decidimos.
- NO define detalles técnicos (eso está en `02-ARCHITECTURE.md` y los archivos por área).

## Qué queremos construir
Un ecosistema de desarrollo donde una sola persona (el dueño) produzca como un equipo:
- **All Import** (negocio): importa y vende producto físico (camisetas de fútbol réplica, auriculares TWS, parlante, power bank, cables, vaper) por WhatsApp + Instagram. Quiere sumar MercadoLibre + e-commerce y **vender webs y agentes de WhatsApp a terceros**.
- **El ecosistema** (herramienta): Gemini piensa y decide, Claude Code ejecuta, GitHub guarda la verdad, el repo es la única fuente de verdad.

## Filosofía
1. **El repo es la única fuente de verdad (SSOT).** Nada crítico vive fuera de git.
2. **Pequeño pero poderoso.** Menos herramientas, menos skills, menos procesos — pero afilados. Se prefiere borrar antes que acumular.
3. **Honestidad brutal sobre humo.** Nada de métricas inventadas ("40% menos errores"). Se valida con criterios binarios (¿compila? ¿pasa el test?).
4. **Contexto = plata.** Cada token cuenta. CLAUDE.md + docs evitan re-explicar.
5. **Un paso a la vez.** Un cambio = una rama = un PR = validación verde = merge.
6. **Verificar, no suponer.** Se prueba (build/lint/screenshot), no se asume.

## Principios de decisión
- ¿Un agente lo necesita para trabajar? → va al repo (`allimport/docs/` o `CLAUDE.md`).
- ¿Es estrategia/negocio efímero? → Gemini/Claude Projects, no el repo.
- ¿Suma complejidad sin beneficio claro? → no se hace.
- ¿Es reversible y de bajo riesgo? → se hace y se muestra. ¿Irreversible o delicado? → plan primero.

## Reglas de oro (no negociables)
1. Nunca dejes de compilar. 2. Nunca commitees secretos. 3. Nunca `git push --force` ni `git add -A` a ciegas. 4. No tocar `web/out/` ni `graphify-out/`. 5. Migraciones aditivas/idempotentes. 6. Plan antes de tareas grandes.

## Qué NO hace este documento
No es un roadmap (ver `01-ROADMAP.md`) ni una guía técnica. Es el "norte".

## Errores comunes
- Sobre-documentar en vez de avanzar.
- Meter decisiones de negocio acá (van a Gemini).
- Cambiar la visión por moda de la semana.

## Checklist
- [ ] ¿La decisión respeta el SSOT?
- [ ] ¿Suma o sólo acumula?
- [ ] ¿Es honesta y verificable?

## Mejoras futuras
Revisar esta visión 1 vez por trimestre; ajustarla solo si el negocio cambia de dirección real.
