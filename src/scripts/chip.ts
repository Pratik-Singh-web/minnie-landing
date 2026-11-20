// A rough guess at the visitor's Mac chip (Minnie repo, ACTIVATION_PLAN W4-2).
//
// The DMG is Apple Silicon only, and an Intel Mac owner had no warning: they
// downloaded, the app would not open, and they were simply gone. Browsers do not
// say which chip a Mac has, so this guesses:
//   1. Chromium's userAgentData `architecture` ("arm" / "x86"), when it exists;
//   2. else the WebGL renderer string — "Apple M1…" is arm, Intel/AMD/Radeon is intel.
// Safari reports "Apple GPU" on every Mac, so Safari is usually "unknown". Only a
// confident "intel" ever changes the page, and "Download anyway" is always there
// in case the guess is wrong. Nothing here is stored beyond the one word.

export type Arch = "arm" | "intel" | "unknown";

function isMac(): boolean {
  return /Macintosh|Mac OS X/.test(navigator.userAgent) && !("ontouchend" in document);
}

function fromWebGL(): Arch {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return "unknown";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(
      (ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || "",
    );
    if (/Apple M\d/i.test(renderer)) return "arm";
    if (/Intel|AMD|Radeon|NVIDIA|GeForce/i.test(renderer)) return "intel";
  } catch {}
  return "unknown";
}

export async function guessArch(): Promise<Arch> {
  if (!isMac()) return "unknown";
  try {
    const uad = (navigator as any).userAgentData;
    if (uad?.getHighEntropyValues) {
      const { architecture } = await uad.getHighEntropyValues(["architecture"]);
      if (architecture === "arm") return "arm";
      if (architecture === "x86") return "intel";
    }
  } catch {}
  return fromWebGL();
}

/** The guess, but never slower than `ms` — the /get page must not hang on it. */
export function guessArchWithin(ms: number): Promise<Arch> {
  return Promise.race([
    guessArch(),
    new Promise<Arch>((resolve) => setTimeout(() => resolve("unknown"), ms)),
  ]);
}
