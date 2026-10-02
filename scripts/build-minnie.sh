#!/bin/sh
# Turn Minnie's exported clips into web assets in public/minnie/.
#
#   sh scripts/build-minnie.sh <sit-stacked.mp4> <sit.mov> <float-stacked.mp4> <float.mov>
#
# The .mp4 inputs are "stacked alpha": colour in the top half, the alpha mask in
# the bottom half. They become VP9 WebM with real transparency (Chrome, Firefox,
# Edge). The .mov inputs are HEVC with alpha, which only Safari plays; they are
# copied as-is with the audio track dropped.
#
# Pass clips by what they SHOW, not their file names — the first export had the
# two .mp4 names swapped.
set -e
if [ "$1" = "segment" ]; then
  # sh scripts/build-minnie.sh segment <name> <stacked.mp4> <first_frame> <end_frame>
  # Cuts one pose out of a stacked-alpha clip and ping-pongs it (forward, then
  # back) so it loops with no jump. Writes WebM, Safari HEVC-alpha .mov and a
  # poster. Used for `stand` (frames 0-29) and `rest` (44-97) of the sitting clip.
  OUT="$(dirname "$0")/../public/minnie"
  f="[0:v]trim=start_frame=${4}:end_frame=${5},setpts=PTS-STARTPTS,split[s1][s2];[s2]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[s1][r]concat=n=2:v=1[p];[p]split[q1][q2];[q1]crop=iw:ih/2:0:0[c];[q2]crop=iw:ih/2:0:ih/2,format=gray[a];[c][a]alphamerge,scale=480:480"
  ffmpeg -v error -y -i "$3" -filter_complex "${f},format=yuva420p" -an -c:v libvpx-vp9 -pix_fmt yuva420p \
    -crf 34 -b:v 0 -row-mt 1 -auto-alt-ref 0 "$OUT/$2.webm"
  ffmpeg -v error -y -i "$3" -filter_complex "${f},format=bgra" -an -c:v hevc_videotoolbox -alpha_quality 0.9 \
    -b:v 1500k -tag:v hvc1 -movflags +faststart "$OUT/$2.mov"
  ffmpeg -v error -y -i "$3" -filter_complex "${f},format=yuva420p" -frames:v 1 -c:v libwebp -quality 80 "$OUT/$2.webp"
  exit 0
fi
if [ "$1" = "opaque" ]; then
  OUT="$(dirname "$0")/../public/minnie"
  # Lift #F9F9F9 (and the slightly darker vignette) to pure white, so
  # multiply leaves no box behind. Stay in standard (limited) range: a
  # full-range file rendered blank on some GPU video paths.
  lv="scale=480:480,colorlevels=rimax=0.935:gimax=0.935:bimax=0.935"
  ffmpeg -v error -y -i "$3" -an -vf "$lv" -c:v libx264 -preset slow -crf 26 \
    -pix_fmt yuv420p -movflags +faststart "$OUT/$2.mp4"
  ffmpeg -v error -y -i "$3" -vf "$lv" -frames:v 1 -c:v libwebp -quality 80 "$OUT/$2.webp"
  exit 0
fi
OUT="$(dirname "$0")/../public/minnie"
mkdir -p "$OUT"

merge='[0:v]crop=iw:ih/2:0:0[c];[0:v]crop=iw:ih/2:0:ih/2,format=gray[a];[c][a]alphamerge'

clip() { # name stacked.mp4 hevc.mov
  ffmpeg -v error -y -i "$2" -filter_complex "$merge,scale=480:480,format=yuva420p" \
    -an -c:v libvpx-vp9 -pix_fmt yuva420p -crf 34 -b:v 0 -row-mt 1 -auto-alt-ref 0 "$OUT/$1.webm"
  ffmpeg -v error -y -i "$3" -an -c:v copy -tag:v hvc1 -movflags +faststart "$OUT/$1.mov"
  # Poster: first frame, transparent. Shown before the video loads and for
  # reduced motion.
  ffmpeg -v error -y -i "$2" -filter_complex "$merge,scale=480:480,format=yuva420p" -frames:v 1 \
    -c:v libwebp -quality 80 "$OUT/$1.webp"
}

still() { # stacked.mp4 seconds label
  ffmpeg -v error -y -ss "$2" -i "$1" -filter_complex "$merge,scale=240:240" -frames:v 1 \
    -c:v libwebp -quality 85 "$OUT/still-$3.webp"
}

clip sit "$1" "$2"
clip float "$3" "$4"
still "$1" 0 curious
still "$1" 2.2 content
still "$1" 4.4 cheeky
still "$3" 2.5 float

# ── Opaque clips ──────────────────────────────────────────────────────────
# Happy, thinking and sleeping arrived as plain square clips on a near-white
# (#F9F9F9) background, with no alpha. They are shown with
# `mix-blend-mode: multiply`, which makes that background vanish on a white
# page — so they must only be used on WHITE sections, never on the ink panels.
# If stacked-alpha versions arrive, run them through `clip` above instead.
#
#   sh scripts/build-minnie.sh opaque <name> <clip.mp4>
