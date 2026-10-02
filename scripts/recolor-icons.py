#!/usr/bin/env python3
"""Recolour the paw favicons into the Ember palette.

Mirrors `scripts/build-appicon.py` in the Minnie app repo — same artwork, same
segmentation, same ramps — so the site's favicon and the macOS app icon cannot
drift apart. The palette is docs/THEME.md in that repo.

The artwork itself is untouched: same paw, same sparkle, same claymorphic
shading. Only the colours move, because the app's palette moved off the
pink-and-lilac candy theme the original was drawn for.

**Not a hue rotation.** A global shift would drag the dark outlines and the
specular highlights along with it and flatten the modelling. The artwork is
segmented into its four roles by hue/saturation/value — outline, pads, sparkle,
background — and each is mapped onto its own ramp driven by that pixel's
luminance *within its region*, so a highlight stays a highlight.

`public/icon-512x512.png` is recoloured first and every smaller size is derived
from it, rather than recolouring each file: the small sources are heavily
anti-aliased, and segmenting those directly gives noisy edges.

Note that `scripts/og-image.html` uses `icon-512x512.png` as a background image,
so after running this, regenerate the share card too:

    python3 scripts/recolor-icons.py && ./scripts/build-og-image.sh

Usage:  python3 scripts/recolor-icons.py
"""

import os
import numpy as np
from PIL import Image

ROOT   = os.path.join(os.path.dirname(__file__), "..")
PUBLIC = os.path.join(ROOT, "public")
MASTER = os.path.join(PUBLIC, "icon-512x512.png")

# docs/THEME.md (Minnie app repo)
FIRE    = (0xF0, 0x78, 0x18)   # tile top
EMBER   = (0xB8, 0x39, 0x0F)   # tile bottom
CREAM   = (0xFF, 0xEA, 0xCD)   # pad highlight
GOLD    = (0xF7, 0xB2, 0x3F)   # pad shadow
OUTLINE = (0x4A, 0x2A, 0x1A)

# Derived from the master, at the sizes the site already references.
DERIVED = [("favicon-192x192.png", 192),
           ("apple-touch-icon.png", 180),
           ("favicon-96x96.png",     96)]
ICO_SIZES = [16, 32, 48]


def recolour(im: Image.Image) -> Image.Image:
    a = np.asarray(im.convert("RGBA")).astype(np.float32) / 255
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    mx, mn = a[..., :3].max(-1), a[..., :3].min(-1)
    v = mx
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    d = mx - mn + 1e-6
    h = np.where(mx == r, ((g - b) / d) % 6,
                 np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60

    opaque  = al > 0.5
    outline = opaque & (v < 0.45)
    sparkle = opaque & (s > 0.35) & (h > 35) & (h < 70) & (v > 0.6)
    pads    = opaque & (s > 0.35) & ((h > 300) | (h < 25)) & (v > 0.5) & ~outline
    bg      = opaque & ~outline & ~sparkle & ~pads

    H, W = v.shape
    yy = np.linspace(0, 1, H)[:, None] * np.ones((1, W))
    ones = np.ones(v.shape + (1,))

    def ramp(c0, c1, t):
        t = np.clip(t, 0, 1)[..., None]
        return (np.array(c0) / 255) * (1 - t) + (np.array(c1) / 255) * t

    def shaded(mask):
        lo, hi = np.percentile(v[mask], 3), np.percentile(v[mask], 97)
        return np.clip((v - lo) / max(hi - lo, 1e-6), 0, 1)

    out = a.copy()
    out[bg]      = np.concatenate([ramp(FIRE, EMBER, yy), ones], -1)[bg]
    out[pads]    = np.concatenate([ramp(GOLD, CREAM, shaded(pads)), ones], -1)[pads]
    out[sparkle] = np.concatenate([ramp(CREAM, (255, 255, 255), shaded(sparkle)), ones], -1)[sparkle]
    out[outline] = np.concatenate([ramp(OUTLINE, OUTLINE, yy), ones], -1)[outline]
    out[..., 3]  = a[..., 3]        # keep the artwork's own alpha / anti-aliasing
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8), "RGBA")


if __name__ == "__main__":
    master = recolour(Image.open(MASTER))
    master.save(MASTER, optimize=True)
    print(f"wrote {os.path.basename(MASTER)}")

    for name, size in DERIVED:
        master.resize((size, size), Image.LANCZOS).save(
            os.path.join(PUBLIC, name), optimize=True)
        print(f"wrote {name}")

    master.save(os.path.join(PUBLIC, "favicon.ico"),
                sizes=[(s, s) for s in ICO_SIZES])
    print("wrote favicon.ico")
    print("\nnow regenerate the share card:  ./scripts/build-og-image.sh")
