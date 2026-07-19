#!/usr/bin/env bash
# Registra las skills del repo (skills/) como skills invocables de Claude Code.
# Claude Code solo escanea .claude/skills/ y ~/.claude/skills/, no skills/.
# Este script crea symlinks en .claude/skills/ (nivel proyecto, local/efímero por
# diseno: .claude/ esta en .gitignore). Corrélo una vez por sesion/maquina nueva.
#
# Uso:  bash register-skills.sh
# Luego REINICIA la sesion de Claude Code para que los /comandos aparezcan.
set -euo pipefail
cd "$(dirname "$0")"

mkdir -p .claude/skills
registered="$(ls ~/.claude/skills/ 2>/dev/null || true)"
created=0; skipped=0

for d in skills/*/; do
  name="$(basename "$d")"
  [ -f "skills/$name/SKILL.md" ] || continue          # solo carpetas con SKILL.md
  if grep -qx "$name" <<<"$registered"; then           # ya provista por el harness
    skipped=$((skipped+1)); continue
  fi
  ln -sfn "../../skills/$name" ".claude/skills/$name"
  created=$((created+1))
done

echo "Registradas (symlink en .claude/skills/): $created"
echo "Saltadas (ya en ~/.claude/skills/):        $skipped"
echo "REINICIA Claude Code para cargar los nuevos /comandos."
