# Terceros pendientes — herramientas que NO se instalaron (y por qué)

Durante la pasada autónoma `init-todo` NO se corrió ningún instalador de estos
terceros. Regla del proyecto: **nunca correr un install script de terceros sin
revisarlo, y si es dudoso o pide credenciales, no correrlo y documentarlo acá.**

Los tres casos comparten el mismo problema: **no existe una URL canónica única** —
hay varios repos/forks con el mismo nombre y autores distintos, así que "cuál es el
oficial" es una decisión tuya, no algo que Claude deba asumir solo.

---

## 1. claude-seo (SEO para Claude Code)
- **Estado:** ❌ no instalado (dudoso + pide credenciales para lo bueno).
- **Qué encontré:** varios repos distintos con nombre parecido:
  - `AgriciDaniel/claude-seo` — el más completo (25 sub-skills, 18 sub-agents), pero
    las features fuertes usan **DataForSEO, Firecrawl y Google APIs** → requieren cuentas/keys.
  - `aevans-eng/seo-skill` — liviano, **sin agentes ni API calls** (audita meta tags,
    Open Graph, JSON-LD, sitemap, robots.txt de sitios estáticos). Candidato más seguro.
  - Otros: `Hainrixz/claude-seo-ai`, `ivankuznetsov/claude-seo`, `zubair-trabzada/geo-seo-claude`.
- **Por qué se difirió:** provenance ambigua + el completo pide credenciales. Además SEO
  es **FASE 6** del plan (última prioridad).
- **Qué necesita del dueño (🤝):** elegir UN repo. Recomendación: empezar por el liviano
  sin APIs (`aevans-eng/seo-skill`) cuando lleguemos a la fase web. Si querés el completo,
  hay que crear cuentas de DataForSEO/Firecrawl/Google (de pago).

## 2. Graphify (grafo de conocimiento del repo)
- **Estado:** ❌ no instalado (provenance ambigua; sin credenciales, pero muchos forks).
- **Qué encontré:** varios forks con el mismo nombre: `safishamsi/graphify`,
  `Graphify-Labs/graphify`, `rhanka/graphify`, `sharkkyyy10/graphify-`, `collabsoft/ai_graphify`.
  Se instala como skill (`/graphify`) vía `npx skills add <repo>` o clon a `~/.claude/skills`.
  No pide keys de pago; parsea el repo local a un grafo consultable.
- **Por qué se difirió:** demasiados forks equivalentes → hay que elegir cuál confiar antes
  de correr su instalador. Es **FASE 4** (soporte), no bloquea el foco de redes.
  Nota: el repo ya reserva `graphify-out/` en `.gitignore` para su salida.
- **Qué necesita del dueño (🤝/💻):** decidir el fork oficial. Cuando lo elijas, reviso su
  install script y, si es seguro, lo instalo.

## 3. OpenMontage (sistema de producción de video)
- **Estado:** ❌ no instalado (instalador binario no revisable + muy invasivo).
- **Qué encontré:** `Open-Montage/OpenMontage` y `calesthio/OpenMontage` (mismo proyecto,
  dos orígenes). Se instala con un **instalador binario** (`.exe` / `.run` / `.dmg`) + `make setup`.
  Funciona sin keys de pago (Piper TTS, FFmpeg, Remotion, Archive.org…), y tiene integraciones
  **opcionales** de pago (Kling, Runway, Veo, ElevenLabs, Suno…).
- **Por qué se difirió:** el método de install es un **binario descargado** que no se puede
  revisar como un script, y agrega 500+ archivos de skills (muy invasivo). Corre contra la
  regla de "revisar antes de correr". Es **FASE 4/marketing**.
- **Alternativa que YA tenés:** para clips de producto ya está **Remotion** en [`video/`](../video/)
  (más simple y bajo tu control). Higgsfield está disponible por MCP para video IA puntual.
- **Qué necesita del dueño (🤝/💻):** decidir si querés algo tan grande. Si sí, se instala en
  una máquina tuya (no en este entorno) revisando el instalador oficial.

---

## Cómo retomar cualquiera de estos
1. Elegís el repo oficial (me pasás la URL exacta).
2. Reviso el install script / README.
3. Si es seguro y no pide credenciales que no tengas → lo instalo en su rama.
4. Si pide cuentas/keys → las creás vos y las cargamos como variables de entorno
   (nunca hardcodeadas, nunca en `.mcp.json`).
