#!/usr/bin/env bash
# Régénère les variantes LQIP + medium du carousel (fichiers dans public/).
# Prérequis : ImageMagick (`magick`).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p public/carousel/lqip public/carousel/md

count=0
for f in public/carousel/*.avif; do
  name="$(basename "$f" .avif)"
  magick "$f" -resize 24x -quality 40 "public/carousel/lqip/${name}.webp"
  magick "$f" -resize 960x\> -quality 72 "public/carousel/md/${name}.webp"
  count=$((count + 1))
done

echo "Generated LQIP + medium variants for ${count} images."
