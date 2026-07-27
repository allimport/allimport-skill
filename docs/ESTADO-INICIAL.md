# ESTADO-INICIAL — Reporte de la pasada autónoma `init-todo`

Fecha: 2026-07-27 · Rama: `claude/skills-workflow-audit-22vj5r`

Pasada autónoma: consolidar todo el conocimiento que Claude puede generar solo e
instalar las herramientas de terceros que no piden cuentas ni tokens. Nada de
métricas inventadas. Build verde. Abajo, qué se hizo y qué sigue necesitando al dueño.

---

## ✅ Lo que se ejecutó en esta pasada

### Estructura nueva
- Carpetas creadas con su `README.md`: `contenido/` · `video/` · `historias/` · `proveedores/`.

### Conocimiento generado (Claude, sin inventar datos)
- `contenido/CALENDARIO-SEMANAL.md` — grilla fija: 3 reels/semana (lun/mié/vie) + historias diarias (4-10) + bloque fijo diario.
- `contenido/GANCHOS-Y-GUIONES.md` — 10 ganchos con estructura hook→problema→solución→prueba social→CTA, tono argentino, cliente 18-28 que quiere emprender.
- `contenido/DESIGN.md` — branding: colores (`#0a0f1a`/`#00d4d4` + paleta), tipografía, tono de voz, frases que SÍ / que NO.
- `proveedores/base-datos-clientes-template.csv` — plantilla (nombre, fecha, producto, monto, pago, envío/retiro, teléfono, etiqueta compró/potencial/curioso).
- `docs/README.md` — actualizado: enlaza plan definitivo, análisis de videos/fotos, pack del Gem y las carpetas nuevas.
- `CLAUDE.md` — registra las carpetas nuevas, el foco en redes y los agentes instalados.
- `docs/TERCEROS-PENDIENTES.md` — terceros que quedaron sin instalar y por qué.

### Herramientas ya hechas, movidas al repo
- `historias/editar_fotos.py` + `CORRER_EDITAR.bat` — editor de fotos → historias.
- `proveedores/analizar_completo.py` + `CORRER_COMPLETO.bat` + `LEEME.txt` — analizador de chats.
- `video/` — proyecto **Remotion** completo (`src/`, `public/producto.jpg`, config). Sin `node_modules`/`out` (se regeneran; agregados a `.gitignore`).

### Terceros instalados SIN cuentas
- **`contains-studio/agents`** → copiados **37 agentes** (solo `.md`) a `.claude/agents/`.
  **Sin pisar** `reviewer.md` ni `web-qa.md`. (Total ahora: 39 agentes.)
- **`find-skills`** (skill) y **`register-skills.sh`** (el "skills.sh") ya existían en el repo → documentado su uso (abajo).

### Verificación
- `cd web && npx tsc --noEmit` → **OK** (sin errores de tipos).
- `npm run build` → **OK** (compila y exporta estático, 9/9 páginas).
- No se tocó `web/src/` (ni `data.ts`). No se commiteó `web/out/` ni secretos.

### Terceros NO instalados (a propósito)
`claude-seo`, `Graphify`, `OpenMontage` → ver [`TERCEROS-PENDIENTES.md`](TERCEROS-PENDIENTES.md).
Motivo corto: cada nombre tiene varios repos/forks (provenance ambigua) y las versiones
completas piden credenciales o usan instaladores binarios no revisables. No corresponde
correrlos solo.

---

## 🗺️ Hoja de ruta — lo que sigue necesitando AL DUEÑO

Orden por el foco en redes. Símbolos: 📱 teléfono · 💻 compu · 🤝 cuenta/token.

### Ahora (FASE 0-1, arrancar el motor de contenido)
1. 📱 **Perfil `@_agus_moreno_`**: bio, foto, sacar el link de WhatsApp del perfil, dejar `@allimport.cba` de vidriera.
2. 📱 **Definir tu bloque fijo diario** (horario no negociable para subir + responder).
3. 📱💻 **Grabar el primer reel** con un guion de `contenido/GANCHOS-Y-GUIONES.md` y editarlo en CapCut. (Los subtítulos/contadores te los genero yo.)
4. 📱 **Historias diarias** siguiendo `contenido/CALENDARIO-SEMANAL.md`.
5. 💻 **Correr el editor de fotos** (`historias/`) con tus fotos reales → subís las historias 📱.

### Ventas y datos (FASE 2)
6. 📱 **Etiquetar WhatsApp** (compró/potencial/curioso) y cargar `proveedores/base-datos-clientes-template.csv`.
7. 💻 **Correr el analizador de proveedores** (`proveedores/`) cuando quieras la lista de precios del mes.
8. 🤝 **Agente de WhatsApp**: cuando quieras avanzar, hace falta cuenta/token de la API.

### Herramientas de terceros (cuando quieras, no urgente)
9. 🤝💻 **Graphify / OpenMontage / claude-seo**: elegí el repo oficial de cada uno (te dejé el análisis en `TERCEROS-PENDIENTES.md`) y lo instalo revisado.

### Más adelante (FASE 5-6)
10. 🤝 **Seguridad** (recién cuando exista backend): RLS, CORS, env vars, rate-limit, sanitizar.
11. 🤝 **Deploy web en Vercel** (cuenta) y **SEO** (fase final).

---

## Cómo usar find-skills / register-skills.sh
- **Buscar/entender skills disponibles:** invocá la skill `find-skills` (`/find-skills`) — te ayuda a ubicar qué skill usar para cada tarea.
- **Registrar las skills del repo** (`skills/`) como invocables en Claude Code:
  ```bash
  bash register-skills.sh   # crea symlinks en .claude/skills/, luego reiniciá Claude Code
  ```
  (`register-skills.sh` es el "skills.sh": Claude Code solo escanea `.claude/skills/`, no `skills/`.)
- **Skills externas:** `install.sh` (usa `npx skills add ...`) — corré en tu máquina.

## Nota sobre `.claude/`
`.claude/*` está en `.gitignore` salvo `.claude/agents/` (que sí se versiona). Por eso los
37 agentes nuevos quedan en el repo, pero los symlinks de skills que crea `register-skills.sh`
son locales/efímeros (hay que correrlo una vez por máquina).
