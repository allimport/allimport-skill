# graphify — motor (aparte del skill)

El `SKILL.md` de graphify ya está instalado en el repo (lo usa Claude Code).
Pero graphify **construye el grafo con un motor Python** que va aparte. **No pide
cuentas ni keys de pago.**

## Instalar el motor (💻 en tu máquina, una vez)
```bash
pip install graphifyy        # paquete oficial (ojo: doble "y")
# o desde el repo: git clone https://github.com/safishamsi/graphify && cd graphify && pip install .
```

Después, en Claude Code, `/graphify` sobre una carpeta arma el grafo en `graphify-out/`
(ya ignorado en `.gitignore`). Fuente: https://github.com/safishamsi/graphify
