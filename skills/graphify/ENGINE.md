# graphify — motor (aparte del skill)

El `SKILL.md` de graphify ya está en el repo. El **motor Python** va aparte. **No pide
cuentas ni keys de pago.** Verificado contra el README oficial (`safishamsi/graphify`).

## Instalar (💻 en tu máquina, una vez)

**No hace falta clonar el repo.** Se instala el paquete de PyPI:
el paquete es **`graphifyy`** (doble y), pero el comando se llama **`graphify`**.

```bash
# Recomendado (entorno aislado):
uv tool install graphifyy
# o:
pipx install graphifyy
```

⚠️ **Evitar `pip install` en Windows/Mac.** El skill resuelve Python desde
`graphify-out/.graphify_python`; si `pip` lo instaló en otro entorno da
`ModuleNotFoundError: No module named 'graphify'`. `uv tool` y `pipx` lo aíslan.

Si después no encuentra el comando (`graphify: command not found`):
`uv tool update-shell` (o `pipx ensurepath`) y abrí una terminal nueva.

## Registrar el skill con el asistente
```bash
graphify install              # Claude Code (Windows se autodetecta)
graphify install --project    # instala en el repo actual en vez del perfil global
```

## Usar
```bash
graphify .                    # indexa el directorio actual
graphify . --update           # re-extrae solo lo que cambió
graphify extract . --code-only  # solo código (AST local, sin API key)
graphify query "..."          # consultar el grafo
```

> **PowerShell:** usar `graphify .` — **no** `/graphify .` (la barra es separador de rutas).

Genera `graphify-out/` (ya en `.gitignore`, queda local).

## Obsidian
Ver [`docs/OBSIDIAN-GRAPHIFY.md`](../../docs/OBSIDIAN-GRAPHIFY.md) — flag `--obsidian`.

Fuente: https://github.com/safishamsi/graphify
