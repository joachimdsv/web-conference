#!/usr/bin/env bash
# Importe une nouvelle version du PowerPoint (exportée en PDF) puis reconstruit la présentation.
# Les pages deviennent slides-src/originales/page-NN.jpg ; l'ordre final est dans slides-src/ordre.txt.
# Usage : tools/pdf-vers-diapos.sh ma-presentation.pdf
# Nécessite poppler (pdftoppm) : apt install poppler-utils / brew install poppler
set -euo pipefail
PDF="${1:?Usage : $0 presentation.pdf}"
cd "$(dirname "$0")/.."
rm -f slides-src/originales/page-*.jpg
mkdir -p slides-src/originales
pdftoppm -jpeg -jpegopt quality=88 -scale-to-x 1920 -scale-to-y 1080 "$PDF" slides-src/originales/page
# pdftoppm nomme page-1.jpg ou page-01.jpg selon le nombre de pages : on normalise sur 2 chiffres
for f in slides-src/originales/page-*.jpg; do
  n=$(basename "$f" .jpg); n=${n#page-}; n=$((10#$n))
  t=$(printf 'slides-src/originales/page-%02d.jpg' "$n")
  [ "$f" = "$t" ] || mv "$f" "$t"
done
echo "$(ls slides-src/originales/page-*.jpg | wc -l | tr -d ' ') pages importées. Vérifiez slides-src/ordre.txt."
python3 tools/assembler-diapos.py
