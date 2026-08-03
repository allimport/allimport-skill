# allimport-skills

Stack curado de skills para Claude Code / agentes autónomos + dev SaaS. 110 skills, cada una en `skills/<nombre>/SKILL.md`.

Todo lo específico del negocio **All Import** (guiones, historias, video, sistema de diseño, investigación, proveedores) vive centralizado en [`allimport/`](allimport/) — ver `allimport/docs/FLUJOS-DE-TRABAJO.md` para cómo se separa el trabajo en 4 chats. `web/` (la landing) y `skills/` (librería general) quedan en la raíz.

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
- **advanced-evaluation / evaluation** — evaluación de outputs de agentes/modelos
- **workflow-planner** — convierte un objetivo en plan de pasos verificables
- **workflow-executor** — ejecuta planes multi-paso con checkpoints y reintentos
- **skill-chaining** — encadena skills pasando salida→entrada
- **self-healing-code** — detecta fallos y aplica fixes verificados
- **error-recovery** — clasifica errores y aplica la estrategia correcta
- **continuous-improvement** — aprende de cada run y mejora el proceso

### Contexto / tokens
- **context-optimization** — optimización del uso de contexto
- **context-compression** — comprime contexto largo
- **prompt-compression** — acorta prompts sin perder requisitos
- **token-optimizer** — presupuesto y reducción de tokens
- **composition-patterns** — patrones de composición de prompts/contexto
- **filesystem-context** — archivos como contexto
- **context7** — docs actualizadas de librerías vía Context7 MCP
- **napkin** — diagramas/wireframes rápidos desde texto
- **repo-indexer** — indexa símbolos y dependencias del repo
- **graphify** — convierte código/docs/papers/video en un grafo de conocimiento persistente y consultable
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
- **seo** — auditoría SEO completa (técnico, schema, E-E-A-T, Core Web Vitals, GEO para AI Overviews)
- **seo-audit / seo-technical / seo-schema / seo-sitemap / seo-hreflang** — auditorías técnicas específicas
- **seo-content / seo-content-brief / seo-images / seo-image-gen** — contenido y assets on-page
- **seo-cluster / seo-flow / seo-plan / seo-programmatic** — arquitectura y planificación de contenido a escala
- **seo-backlinks / seo-competitor-pages / seo-drift / seo-ecommerce / seo-geo / seo-google / seo-local / seo-maps / seo-page / seo-sxo** — nichos y plataformas específicas de SEO

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

### Visual / video
- **thumbnail-gen** — genera thumbnails
- **remotion-video-creation** — creación de videos con Remotion
- **sound-design-short-video** — asigna SFX/transiciones a cada beat de un guion de video corto (TikTok/Reels) según su función narrativa
- **silence-removal-pipeline** — corta silencios de un video/audio crudo (ffmpeg + Node, ver `allimport/video/` y `allimport/docs/VIDEO-PIPELINE.md`) manteniendo sync audio/video
- **openmontage** — colección vendorizada de skills de producción de video end-to-end (guion→assets→edición→publish); el motor de render va aparte, no está en el repo

### All Import (negocio)
- **allimport-web-design** — design system de `web/` (colores, tipografía, spacing, patrones de componente)
- **allimport-catalog-checker** — valida el catálogo de `web/` antes de shippear (naming trademark-safe, precios, WhatsApp)
- **allimport-crm** — gestiona la base de clientes (`allimport/proveedores/`)
- **allimport-viral-research** — investiga qué es viral en el nicho antes de escribir guiones

### Extra / colecciones
- **caveman** — colección vendoreada (commit, compress, review, stats, etc.)

## MCP
Ver `_MCP-SETUP.md` para el `.mcp.json` de ejemplo (playwright, supabase, figma, filesystem, git, context7) que usan varias de estas skills.
