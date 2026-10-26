#!/usr/bin/env bash
# Convertit un PDF exporté depuis PowerPoint en images pour le site.
# Usage : tools/pdf-vers-diapos.sh ma-presentation.pdf
# Nécessite poppler (pdftoppm) : apt install poppler-utils / brew install poppler
set -euo pipefail
PDF="${1:?Usage : $0 presentation.pdf}"
cd "$(dirname "$0")/.."
rm -f slides/slide-*.jpg slides/thumbs/slide-*.jpg
mkdir -p slides/thumbs
pdftoppm -jpeg -jpegopt quality=88 -scale-to-x 1920 -scale-to-y 1080 "$PDF" slides/slide
pdftoppm -jpeg -jpegopt quality=75 -scale-to-x 400 -scale-to-y 225 "$PDF" slides/thumbs/slide
COUNT=$(ls slides/slide-*.jpg | wc -l | tr -d ' ')
echo "$COUNT diapos générées. Pensez à mettre slideCount: $COUNT dans js/deck.js"
