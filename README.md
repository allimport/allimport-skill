# allimport-skills

Stack curado de skills para Claude Code / agentes autónomos + dev SaaS. 87 skills, cada una en `skills/<nombre>/SKILL.md`.

## Instalación
- Skills de Drive: copiá cada carpeta listada en `MANIFEST.md` dentro de `~/.claude/skills/`.
- Skills `npx`: corré `bash install.sh`.
- MCP servers usados por varias skills: ver `_MCP-SETUP.md`.

## Índice de skills (por categoría)

### Meta / agentes
- **find-skills** — descubre qué skill usar por tarea
- **skill-router** — rutea la tarea a la skill correcta
- **skill-creator** — crea skills nuevas
- **task-decomposition** — parte tareas en subtareas
- **multi-agent-patterns** — patrones de orquestación multi-agente
- **tool-design** — diseño de herramientas para agentes
- **harness-engineering** — diseño de harnesses/loops de agentes
- **hosted-agents** — despliegue de agentes hospedados
- **advanced-evaluation / evaluation** — evaluación de outputs de agentes/modelos
- **latent-briefing** — briefs implícitos para agentes
- **bdi-mental-states** — modelado de creencia/deseo/intención en agentes
- **workflow-planner** — convierte un objetivo en plan de pasos verificables
- **workflow-executor** — ejecuta planes multi-paso con checkpoints y reintentos
- **skill-chaining** — encadena skills pasando salida→entrada
- **self-healing-code** — detecta fallos y aplica fixes verificados
- **error-recovery** — clasifica errores y aplica la estrategia correcta
- **continuous-improvement** — aprende de cada run y mejora el proceso

### Contexto / tokens
- **context-fundamentals** — principios base de gestión de contexto
- **context-optimization** — optimización del uso de contexto
- **context-compression** — comprime contexto largo
- **context-degradation** — detecta degradación de contexto
- **prompt-compression** — acorta prompts sin perder requisitos
- **token-optimizer** — presupuesto y reducción de tokens
- **memory-systems** — memoria persistente entre sesiones
- **composition-patterns** — patrones de composición de prompts/contexto
- **filesystem-context** — archivos como contexto
- **context7** — docs actualizadas de librerías vía Context7 MCP
- **napkin** — diagramas/wireframes rápidos desde texto
- **repo-indexer** — indexa símbolos y dependencias del repo
- **smart-file-selector** — set mínimo de archivos relevantes para una tarea
- **semantic-diff** — resume diffs por intención e impacto

### Frontend / diseño
- **frontend-design / frontend-design-direction** — dirección y ejecución de diseño frontend
- **ui-ux-pro-max** — generador de design systems (estilos, paletas, fuentes, charts)
- **web-design-guidelines** — buenas prácticas de diseño web
- **figma-generate-design / figma-implement-design** — generar e implementar diseños desde/hacia Figma
- **shadcn-ui** — componentes shadcn/ui
- **taste-skill** — colección de criterio estético (brutalist, minimalist, image-to-code, etc.)
- **composition-patterns** — composición de componentes UI

### Performance
- **lighthouse-optimizer** — audita y sube el score de Lighthouse
- **core-web-vitals** — arregla LCP, INP y CLS
- **bundle-analyzer** — reduce peso del bundle JS
- **image-optimization** — formato/tamaño/responsive/lazy de imágenes
- **caching-strategy** — caché HTTP, CDN y datos
- **lazy-loading** — carga diferida de imágenes, componentes y rutas

### Testing
- **playwright-automation** — automatización de browser con Playwright
- **webapp-testing** — testing end-to-end de apps web
- **visual-regression-testing** — detección de regresiones visuales
- **unit-test-generator** — genera tests unitarios
- **agent-browser / browser-automation** — control de navegador por agentes

### Seguridad
- **api-security-design** — diseño seguro de APIs
- **owasp-security-audit** — auditoría OWASP Top 10
- **auth-system-designer** — diseño de auth (sesiones, roles, OAuth, MFA)
- **secrets-detection** — detecta secretos/API keys hardcodeadas
- **dependency-scanner** — escanea vulnerabilidades en dependencias
- **security-headers-configuration** — configuración de headers de seguridad
- **rate-limiting-implementation** — implementación de rate limiting

### Growth / SEO / copy
- **programmatic-seo** — SEO programático a escala
- **serp-analysis** — análisis de resultados de búsqueda (SERP)
- **internal-linking-optimizer** — optimización de enlazado interno
- **landing-page-generator / landing-page-copy / landing-page-optimizer** — generar, escribir y optimizar landing pages
- **conversion-rate-optimization** — optimización de conversión
- **growth-loops** — diseño de loops de crecimiento
- **funnel-builder** — funnel de adquisición a retención
- **pricing-psychology** — psicología de precios y empaquetado
- **viral-hook-generator** — hooks que paran el scroll
- **ad-copy-generator** — copy de ads orientado a conversión
- **ad-creative-generation** — generación de creativos publicitarios
- **marketing-skills** — colección de decenas de skills de marketing (ab-testing, cold-email, etc.)
- **humanizer** — elimina patrones de escritura IA del texto

### Backend / infra
- **nextjs-best-practices** — buenas prácticas Next.js
- **react-best-practices** — buenas prácticas React
- **nextjs-supabase-auth** — auth con Supabase en Next.js
- **supabase-automation** — automatización con Supabase
- **database-schema-design** — esquemas, índices y migraciones
- **background-jobs-queues** — jobs async y colas
- **observability-logging** — logs, métricas y traces
- **ci-cd-pipeline** — pipeline de CI/CD con tests y deploy seguro
- **error-monitoring** — captura, agrupa y alerta errores en producción
- **project-development** — flujo general de desarrollo de proyectos

### Visual / video
- **thumbnail-gen** — genera thumbnails
- **remotion-video-creation** — creación de videos con Remotion

### Extra / colecciones
- **caveman** — colección vendoreada (commit, compress, review, stats, etc.)

## MCP
Ver `_MCP-SETUP.md` para el `.mcp.json` de ejemplo (playwright, supabase, figma, filesystem, git, context7) que usan varias de estas skills.
