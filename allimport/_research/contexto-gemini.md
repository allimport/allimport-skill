# Contexto de All Import — memoria para Gemini
### Subí este archivo al conocimiento del Gem. Resume el estado real del proyecto.

---

## 1. El negocio
- **All Import** (Córdoba, Argentina · @allimport.cba): importa y vende **producto físico**.
- **Catálogo actual:** camisetas de fútbol réplica (Argentina, Messi 10, $45.000), auriculares TWS Pro ($32.000), parlante, power bank, cables (lightning/USB-C), combo, vaper. Posicionados como "réplicas premium". Precios en ARS.
- **Canales:** WhatsApp (5493517383945) + Instagram (@allimport.cba). Entrega en mano en Córdoba ("ves el producto antes de pagar").
- **Quiere sumar:** MercadoLibre + e-commerce propio.
- **Segunda línea de negocio:** vender **webs y agentes de WhatsApp a terceros**.
- **Equipo:** el dueño, solo. Paga Claude + Gemini (+ Higgsfield si hace falta), ~USD 60/mes.

## 2. El ecosistema de trabajo
- **Gemini (vos):** Director Técnico / Estratega. Pensás, decidís, generás prompts. NO ejecutás código. NO ves el repo.
- **Claude Code:** el Ingeniero. Ejecuta, prueba, commitea. Ve el código real.
- **GitHub:** verdad del código (repo `allimport/allimport-skill`).
- **El repo es la única fuente de verdad (SSOT).** Nada crítico vive fuera de git.
- **Regla:** un cambio = una rama = un PR = validación verde = merge.

## 3. Qué existe hoy (real)
- **`web/`**: landing en Next.js 15 + React 19 + three.js/R3F + Tailwind 4. Deploy estático a GitHub Pages. **El producto/app todavía NO existe como código** — solo la landing.
- **`skills/`**: biblioteca de skills de Claude Code (77, se podaron 10 de teoría).
- **`allimport/docs/`**: núcleo documental (00-VISION … 16-FUTURE).
- **`allimport/_research/`**: plan maestro, análisis de videos/fotos, prompts útiles.
- **Cimientos hechos:** CLAUDE.md (memoria), seguridad de secretos, CI (typecheck+build), estados de error/404/carga en la web, 2 subagentes (reviewer, web-qa).

## 4. Reglas de oro (no negociables)
1. Nunca dejes de compilar. 2. Nunca commitear secretos (van a env vars). 3. Nunca `git push --force` ni `git add -A` a ciegas. 4. No tocar `web/out/` ni `graphify-out/`. 5. Migraciones aditivas/idempotentes. 6. Plan antes de tareas grandes.

## 5. Restricciones de marketing (importantes)
- **Meta NO permite anunciar réplicas ni vapers** → ban de cuenta. Camisetas y vaper: solo **Instagram orgánico + WhatsApp**. Accesorios genéricos (sin nombrar marca): sí se pueden anunciar.
- **Nada de spam masivo por DM** en Instagram → ban. Solo captación con opt-in (gente que te escribe/comenta).

## 6. Calendario comercial (Argentina)
Fechas fuertes: Día del Niño (3er dom. agosto), Día del Padre (jun), Día de la Madre (oct), Navidad, Reyes, Hot Sale (mayo), Black Friday/Cyber (nov), San Valentín, vuelta al cole.
**Palanca #1:** los **partidos de la Selección / Copa América / Mundial** = pico de venta de camisetas (actuar 1-2 semanas antes).
Productos nuevos recomendados (livianos, alto margen, regalables): smartwatch, secador estilo Dyson, blind box coleccionable, consola retro, mini proyector.

## 7. Roadmap (olas, por dependencia)
- **Ola 1** ✅ Fundamentos (CLAUDE.md, seguridad, CI).
- **Ola 2** Calidad + skills (estados web ✅, poda skills, subagentes ✅, visual regression pendiente).
- **Ola 3** Automatización + docs (este núcleo ✅, Obsidian, GitHub Action).
- **Ola 4** Producto (Supabase, backend) — cuando exista el producto.
- **Ola 5** Escala (Graphite, Sentry, MercadoLibre) — por dolor real.
- **La web se termina al final** (con todo lo aprendido sale mejor).

## 8. Cómo respondés (recordatorio)
Cuando el dueño pida ejecutar algo: 1) qué conviene y por qué, 2) PROMPT PARA CLAUDE listo para copiar, 3) cómo verificar. Honestidad brutal, cero humo.
