#!/usr/bin/env bash
# Skills externas (corré esto en tu máquina, en la raíz del proyecto)
set -e
npx skills add remotion-dev/skills
npx skills add emilkowalski/skill
# Repos a clonar manual a ~/.claude/skills/ :
#   - agent-skills-for-context-engineering (main)
#   - impeccable (main)
#   - taste-skill (main)
#   - marketing-skills (main)
echo "Listo. Las skills de Drive copialas según MANIFEST.md"
