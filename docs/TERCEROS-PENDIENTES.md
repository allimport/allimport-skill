# Terceros — estado de instalación

**Actualización:** por pedido del dueño, se instalaron (vendorizando su conocimiento al
repo) los tres. Se revisó cada install script antes de tocar nada. Lo que quedó afuera a
propósito son los **motores pesados y las keys de pago** (no van en el repo de la marca).

| Repo | Elegido | Qué se instaló en el repo | Qué falta (dueño) |
|---|---|---|---|
| claude-seo | `AgriciDaniel/claude-seo` (v2.2.4) | 25 skills → `skills/`, 18 agents → `.claude/agents/` | Nada para lo básico. Solo si querés APIs: keys de DataForSEO/Firecrawl/etc (🤝, de pago, opcional) |
| Graphify | `safishamsi/graphify` | `skills/graphify/SKILL.md` + **motor instalado y skill registrado** (2026-07-29) | Nada — completo |
| OpenMontage | `calesthio/OpenMontage` | skills (156 md) → `skills/openmontage/` | Motor 161 MB revisado (seguro) pero a propósito NO instalado acá — ver sección 3, es para tu compu (💻) |
| agent-browser / UI UX Pro Max / Playwright / skillui | ver sección 4 | Los 5 instalados y funcionando (4 en la nube + agent-browser también verificado en tu PC) | Nada |
| Impeccable | `pbakaus/impeccable` | ver sección 4 | ✅ instalado y verificado en tu PC (2026-07-29) — nada pendiente |

**Ya no queda nada pendiente por decisión mía, falta de revisión, ni bloqueo técnico.**
Lo único que sigue sin hacer son las **cuentas/keys de pago**, que solo vos podés crear:
claude-seo completo (DataForSEO/Firecrawl/Google) y OpenMontage con IA en la nube
(Kling/Runway/Veo/ElevenLabs/Suno) — ambas opcionales, no bloquean nada del plan actual.

Se revisaron los instaladores: `claude-seo/install.sh` (limpio, solo copia md/scripts a
`~/.claude`), `graphify/install.py` (paquete Python, sin keys), `OpenMontage` (instalador +
`make setup`, motor pesado → NO se metió al repo). No se corrió ningún script que pida
credenciales ni que baje binarios al repo.

---

## Detalle original (por qué había que elegir)

Los tres comparten un problema: **no existe una URL canónica única** — hay varios
repos/forks con el mismo nombre y autores distintos. Se eligió el más representativo de
cada uno (tabla de arriba). Si preferís otro fork, avisá y lo cambio.

---

## 1. claude-seo (SEO para Claude Code)
- **Estado:** ✅ instalado (25 skills + 18 agents vendorizados al repo). Keys de APIs = opcionales/de pago.
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
- **Estado:** ✅ instalado del todo (2026-07-29): skill vendorizado a `skills/graphify/` +
  **motor Python instalado y probado** (`uv tool install graphifyy`, sin keys) + skill
  **registrado formalmente** con `graphify install --project` (agrega hooks + sección en
  `CLAUDE.md`). El grafo (`graphify-out/`, gitignorado) ya existe y está poblado.
- **Corrección de portabilidad:** el registro automático dejó los hooks de
  `.claude/settings.json` con la ruta absoluta de Linux `/root/.local/bin/graphify` —
  se hubiera roto en tu PC Windows. Se cambió a `graphify` a secas (usa el PATH), así
  funciona en cualquier máquina donde el motor esté instalado.
- **Qué hacen los hooks:** antes de cada `Bash`/`Grep`/`Read`/`Glob`, Claude Code corre
  `graphify hook-guard` y te sugiere `graphify query "..."` en vez de grep crudo cuando
  hay grafo disponible — más preciso y gasta menos contexto.
- **Qué necesita del dueño:** nada para lo básico. Ya está andando en este entorno; en tu
  PC solo hace falta tener `graphify` instalado (ya lo tenés, de la sesión de Obsidian).

## 3. OpenMontage (sistema de producción de video)
- **Estado:** ✅ skills instaladas (`skills/openmontage/`, 156 md). Motor 161 MB = revisado
  pero **no instalado acá a propósito** (no es un bloqueo, es la decisión correcta).
- **Qué encontré:** `Open-Montage/OpenMontage` y `calesthio/OpenMontage` (mismo proyecto,
  dos orígenes). Se instala con `git clone` + `make setup`.
- **Revisión del Makefile (2026-07-29):** lo leí entero. El target `setup` corre
  `pip install -r requirements.txt`, `npm install` (Remotion), `pip install piper-tts`,
  cachea `hyperframes` por npx, y copia `.env.example` → `.env`. **Sin sudo, sin
  credenciales obligatorias, no escribe fuera de su propia carpeta.** Es seguro.
- **Por qué NO lo instalé igual acá:** aunque es seguro, esta sesión en la nube es
  **efímera** (se borra sola) y el motor **nunca se iba a commitear al repo** (161 MB de
  GPU/ffmpeg/node, decisión de arquitectura, no de seguridad). Instalarlo acá sería
  trabajo perdido apenas se cierre la sesión — cero beneficio para vos.
- **Alternativa que YA tenés:** para clips de producto ya está **Remotion** en [`video/`](../video/)
  (más simple y bajo tu control). Higgsfield está disponible por MCP para video IA puntual.
- **Qué necesita del dueño (💻):** si en algún momento querés el motor completo, se instala
  en tu compu real (con Remote Control) donde persiste: `git clone https://github.com/calesthio/OpenMontage && cd OpenMontage && make setup`.

---

## 4. Herramientas de diseño/UI (pedido 2026-07-29, video sobre navegación web + UI para Claude Code)
| Herramienta | Estado | Detalle |
|---|---|---|
| **agent-browser** (Vercel Labs) | ✅ instalado y verificado en la PC real (2026-07-29) | En la nube solo se pudo instalar el binario (el `agent-browser install` que baja su propio Chrome falló por el firewall de esa sesión). Se reinstaló desde la PC real: `npm install -g agent-browser && agent-browser install` — ahí sí bajó su Chrome propio sin problema. Verificado con `agent-browser open https://google.com` (abrió la página real) y `agent-browser screenshot` (capturó y guardó la imagen en `C:\Users\Bangho\.agent-browser\...`). Nota: tuvo un timeout intermitente (error 10060) en el primer intento de `open` — funcionó al reintentar, parece un hipo puntual de wifi, no un problema de la herramienta. |
| **UI UX Pro Max** | ✅ ya estaba instalada | `skills/ui-ux-pro-max/SKILL.md` v2.6.2 — sistema de diseño (84 estilos, 161 paletas, 73 combos de tipografía) según el tipo de producto. |
| **Playwright** | ✅ instalado | Ya estaba disponible global en el entorno (browsers cacheados). Se agregó `@playwright/test` como devDependency de `web/` (`npm install -D @playwright/test`) para poder correr QA visual local/CI de la landing. `npm run build` sigue verde. Ya había 3 skills que lo cubren: `playwright-automation`, `browser-automation`, `webapp-testing`.
| **skillui** (`amaancoderx/skillui`) | ✅ instalado y corrido | Extrae el sistema de diseño (colores, tipografía, animaciones) de cualquier sitio/proyecto a `DESIGN.md` + `.skill`. 100% análisis estático + Playwright, **sin IA, sin API keys**. Lo corrí sobre `web/` (la propia landing, no un sitio externo — copiar el look de otra marca es decisión tuya, así que no elegí ninguna). Resultado vendorizado en `skills/allimport-web-design/` (skill + `references/DESIGN.md`: 7 colores, tipografía Montserrat Alternates, grid de 4px, 15 patrones de componente — todo extraído del código real). Si más adelante querés clonar el estilo de OTRO sitio, decime cuál y corro `npx skillui --url <sitio> --mode ultra`. |
| **Impeccable** (`pbakaus/impeccable`, 44k+ estrellas) | ✅ instalado y verificado en la PC real (2026-07-29) | Bloqueado en la sesión de la nube (dominio `impeccable.style` fuera de la lista de permitidos, error 403 — política de red, no de la herramienta). Se instaló desde la PC real con Remote Control: `npx impeccable install --providers=claude --scope=project`. Dejó archivos en `.github/hooks` y `.github/skills` (agregados al `.gitignore`, son generados). Verificado con `npx impeccable --help` — anda perfecto. |

## Cómo retomar cualquiera de estos
1. Elegís el repo oficial (me pasás la URL exacta).
2. Reviso el install script / README.
3. Si es seguro y no pide credenciales que no tengas → lo instalo en su rama.
4. Si pide cuentas/keys → las creás vos y las cargamos como variables de entorno
   (nunca hardcodeadas, nunca en `.mcp.json`).
