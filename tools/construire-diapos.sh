#!/usr/bin/env bash
# Régénère les diapos de démo (slides-src/demos.html) puis assemble la présentation.
set -euo pipefail
cd "$(dirname "$0")/.."
node tools/rendre-demos.js
python3 tools/assembler-diapos.py
