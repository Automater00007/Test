#!/usr/bin/env bash
# Rebuilds the optimised WebP set from the source photos in `public/Jade /`.
# Run from the repo root:  bash scripts/build-jade-images.sh
set -euo pipefail

SRC="public/Jade /"
OUT="public/images/jade"
mkdir -p "$OUT"

# $1 source, $2 output name, $3 max edge (px)
convert_one() {
  local src="$1" name="$2" edge="${3:-1800}"
  convert "$src" -auto-orient -resize "${edge}x${edge}>" -strip \
    -quality 82 -define webp:method=6 "$OUT/$name.webp"
}

G="$SRC/Gallery"
E="$SRC/Expereinces"

# --- Gallery (12 curated frames) -------------------------------------------
convert_one "$G/1E10DAD5-922A-436F-9344-25917017FA88.jpg" "gallery-01"
convert_one "$G/2213DFB8-6D01-4424-9E1E-112FD716A70E.jpg" "gallery-02"
convert_one "$G/62B74F81-351E-4938-9982-5765358B0D34.jpg" "gallery-03"
convert_one "$G/ABAAB533-118B-4F44-8A63-24C2F57006E6.jpg" "gallery-04"
convert_one "$G/B1639D7B-CC34-4D7B-A151-A47EA726B6B3.jpg" "gallery-05"
convert_one "$G/C9BB2AA4-4622-4B96-B4F8-4A0A358A5376.jpg" "gallery-06"
convert_one "$G/Jade River River by Defoy 1.jpg" "gallery-07" 2200
convert_one "$G/Jade River River by Defoy - Best Riverside Resort in Pahalgam 10.jpg" "gallery-08"
convert_one "$G/Jade River River by Defoy - Best Riverside Resort in Pahalgam 15.jpg" "gallery-09" 2200
convert_one "$G/Jade River River by Defoy - Best Riverside Resort in Pahalgam 20.jpg" "gallery-10" 2200
convert_one "$G/Jade River River by Defoy - Best Riverside Resort in Pahalgam 6.jpg" "gallery-11"
convert_one "$G/Refined resort lounge with Persian rug (1).jpg" "gallery-12"

# --- Rooms -----------------------------------------------------------------
# Convert every photo sorted into the Rooms folders. Names are sequential so
# the rest can be picked up by content.ts when needed; unused ones stay stored.
i=1
while IFS= read -r -d '' f; do
  case "$f" in *.webp) continue ;; esac
  convert_one "$f" "room-premium-$i"
  i=$((i+1))
done < <(find "$SRC/Rooms/Premium Room" -maxdepth 1 -type f -print0 | sort -z)

i=1
while IFS= read -r -d '' f; do
  case "$f" in *.webp) continue ;; esac
  convert_one "$f" "room-suite-$i"
  i=$((i+1))
done < <(find "$SRC/Rooms/Executive Suite" -maxdepth 1 -type f -print0 | sort -z)

i=1
while IFS= read -r -d '' f; do
  case "$f" in *.webp) continue ;; esac
  convert_one "$f" "room-duplex-$i"
  i=$((i+1))
done < <(find "$SRC/Rooms/Executive Duplex Family Room" -maxdepth 1 -type f -print0 | sort -z)

# --- Experiences -----------------------------------------------------------
convert_one "$E/Bonfire/Jade River River by Defoy Riverside Pahalgam 1322.webp" "exp-bonfire"
convert_one "$E/Photography/4184C26A-0A15-4472-B6EF-E5BCD370EC4E.jpg" "exp-photography"
convert_one "$E/Family Moments/IMG_0857.jpg" "exp-family"
convert_one "$E/Pure Luxury/EA1C5ADD-44D4-4532-82CE-81782EC5B9FC.jpg" "exp-luxury"
convert_one "$E/Pahalgham Sightseeing/Jade River River by Defoy - Best Riverside Resort in Pahalgam 19.jpg" "mountain-sunset"

echo "Wrote $(find "$OUT" -type f | wc -l) images to $OUT"
du -sh "$OUT"
