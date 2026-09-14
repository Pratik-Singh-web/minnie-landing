#!/usr/bin/env bash
# Render scripts/og-image.html -> public/og-image.png at exactly 1200x630.
#
# The OG card used to be a hand-made PNG with no source, so it drifted out of
# sync with the brand (it still carried a cat mark the site had retired). This
# regenerates it from HTML using the same tokens as src/styles/global.css.
# Needs network once, for the Google Fonts the card is set in.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$ROOT/public/og-image.png"

[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --allow-file-access-from-files \
  --virtual-time-budget=10000 \
  --window-size=1200,630 \
  --screenshot="$TMP/og.png" \
  "file://$ROOT/scripts/og-image.html" >/dev/null 2>&1

[ -s "$TMP/og.png" ] || { echo "Chrome produced no screenshot" >&2; exit 1; }
cp "$TMP/og.png" "$OUT"
echo "wrote $OUT ($(sips -g pixelWidth -g pixelHeight "$OUT" | tail -2 | tr -d ' \n'))"
