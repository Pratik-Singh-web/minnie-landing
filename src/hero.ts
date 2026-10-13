import { readFileSync } from "node:fs";
import satori from "satori";
import sharp from "sharp";
import { CORAL, CREAM, DIM, INK, PEACH, fonts, fromRoot } from "./og";

/* Hero images for blog posts, rendered at build time beside the OG cards.
 *
 * The OG card is the wrong thing to reuse here: it carries the post title, and
 * on the page the title is already the H1 directly under it, so the reader
 * would see the headline twice. A hero instead SHOWS the post: a terminal with
 * the command it is about, the permission dialog it explains, a desktop with a
 * pet on it. Minnie sits beside every scene, so a row of them reads as one site.
 *
 * 1600x900 is deliberate. Google Discover only shows the large image card for
 * images at least 1200px wide (with max-image-preview:large, set in
 * Layout.astro), and 16:9 is the crop it and most feeds use.
 *
 * Output is WebP: this is an above-the-fold image on every post, so it is the
 * LCP element, and WebP is a fraction of the PNG's weight. The OG cards stay
 * PNG because some unfurlers still refuse WebP; a page <img> has no such
 * problem.
 */

const WIDTH = 1600;
const HEIGHT = 900;

const INK_2 = "#3d2619"; // one step up from INK, for window bodies on the ink ground
const LINE = "#5a3d2c";

export type HeroMotif = "terminal" | "dialog" | "desktop" | "voice";

export interface Hero {
  motif: HeroMotif;
  /** terminal: lines, `$ ` prefix marks a command. dialog: [heading, command].
   *  voice: what was said. desktop: window title. */
  lines: string[];
  /** Optional line of Minnie's, drawn as a speech bubble above her. */
  bubble?: string;
  /** Which of her poses. Only the ones that ship with transparency: happy,
   *  think and sleep are opaque frames and would draw a white box. */
  pose?: "float" | "sit" | "stand" | "rest";
}

const mono = (file: string) =>
  readFileSync(fromRoot("node_modules", "@fontsource", "jetbrains-mono", "files", file));

const heroFonts = [
  ...fonts,
  { name: "Mono", data: mono("jetbrains-mono-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
  { name: "Mono", data: mono("jetbrains-mono-latin-700-normal.woff"), weight: 700 as const, style: "normal" as const },
];

// Poses ship as .webp, which satori cannot decode; sharp converts once per pose.
const poseCache = new Map<string, Promise<string>>();
const poseImage = (pose: string) => {
  if (!poseCache.has(pose))
    poseCache.set(
      pose,
      sharp(fromRoot("public", "minnie", `${pose}.webp`))
        .png()
        .toBuffer()
        .then((b) => `data:image/png;base64,${b.toString("base64")}`)
    );
  return poseCache.get(pose)!;
};

const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style: { display: "flex", ...style }, ...(children !== undefined ? { children } : {}) },
});

/** The three window dots, in the site's palette rather than Apple's. */
const dots = () =>
  el(
    "div",
    { gap: 12 },
    [CORAL, PEACH, DIM].map((c) => el("div", { width: 18, height: 18, borderRadius: 9, background: c }))
  );

const titleBar = (label: string, dark: boolean) =>
  el(
    "div",
    {
      alignItems: "center",
      gap: 24,
      padding: "18px 24px",
      background: dark ? INK : "#f3e6d8",
      borderBottom: `2px solid ${dark ? LINE : "#e6d3c0"}`,
    },
    [
      dots(),
      el(
        "div",
        { fontFamily: "Mono", fontSize: 20, color: dark ? DIM : "#8a6a55" },
        label
      ),
    ]
  );

const windowFrame = (children: unknown[], width: number) =>
  el(
    "div",
    {
      flexDirection: "column",
      width,
      borderRadius: 22,
      overflow: "hidden",
      background: INK_2,
      border: `2px solid ${LINE}`,
      boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
    },
    children
  );

function terminal(lines: string[]) {
  return windowFrame(
    [
      titleBar("zsh — 80×24", true),
      el(
        "div",
        { flexDirection: "column", gap: 18, padding: "36px 40px 44px" },
        lines.map((line) => {
          const cmd = line.startsWith("$ ");
          return el("div", { fontFamily: "Mono", fontSize: 34, lineHeight: 1.3 }, [
            ...(cmd ? [el("div", { color: CORAL, fontWeight: 700, marginRight: 18 }, "$")] : []),
            // pre, not the default collapsing: indented output (JSON, say) keeps its shape.
            el("div", { color: cmd ? CREAM : DIM, fontWeight: cmd ? 700 : 400, whiteSpace: "pre" }, cmd ? line.slice(2) : line),
          ]);
        })
      ),
    ],
    880
  );
}

function dialog([heading = "Claude wants to run a command", command = "rm -rf build/"]: string[]) {
  return el(
    "div",
    {
      flexDirection: "column",
      width: 820,
      padding: "44px 48px",
      borderRadius: 26,
      background: CREAM,
      boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
    },
    [
      el("div", { fontFamily: "Bricolage", fontWeight: 800, fontSize: 40, color: INK, marginBottom: 26 }, heading),
      el(
        "div",
        {
          fontFamily: "Mono",
          fontSize: 32,
          color: CREAM,
          background: INK,
          borderRadius: 14,
          padding: "22px 28px",
          marginBottom: 34,
        },
        command
      ),
      el("div", { gap: 18, justifyContent: "flex-end" }, [
        el(
          "div",
          {
            fontFamily: "Bricolage",
            fontWeight: 800,
            fontSize: 30,
            color: INK,
            border: `3px solid ${INK}`,
            borderRadius: 999,
            padding: "12px 40px",
          },
          "No"
        ),
        el(
          "div",
          {
            fontFamily: "Bricolage",
            fontWeight: 800,
            fontSize: 30,
            color: INK,
            background: `linear-gradient(90deg, ${CORAL}, ${PEACH})`,
            borderRadius: 999,
            padding: "15px 44px",
          },
          "Yes, allow"
        ),
      ]),
    ]
  );
}

/** A tiny desktop: menu bar, two windows, and the pet is Minnie herself on the right. */
function desktop([title = "Desktop"]: string[]) {
  const win = (w: number, h: number, label: string, style: Record<string, unknown>) =>
    el(
      "div",
      {
        position: "absolute",
        flexDirection: "column",
        width: w,
        height: h,
        borderRadius: 18,
        overflow: "hidden",
        background: CREAM,
        boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
        ...style,
      },
      [
        titleBar(label, false),
        el("div", { flexDirection: "column", gap: 16, padding: "30px 32px" }, [
          el("div", { width: "70%", height: 16, borderRadius: 8, background: "#ead9c8" }),
          el("div", { width: "90%", height: 16, borderRadius: 8, background: "#ead9c8" }),
          el("div", { width: "55%", height: 16, borderRadius: 8, background: "#ead9c8" }),
        ]),
      ]
    );

  return el(
    "div",
    {
      position: "relative",
      flexDirection: "column",
      width: 900,
      height: 600,
      borderRadius: 26,
      overflow: "hidden",
      background: `linear-gradient(135deg, ${CORAL}, ${PEACH})`,
      boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
    },
    [
      el(
        "div",
        {
          alignItems: "center",
          justifyContent: "space-between",
          height: 44,
          padding: "0 24px",
          background: "rgba(46,27,18,0.55)",
          fontFamily: "Bricolage",
          fontWeight: 800,
          fontSize: 20,
          color: CREAM,
        },
        [el("div", {}, "Finder   File   Edit   View"), el("div", {}, "10:00")]
      ),
      win(560, 330, title, { left: 60, top: 120 }),
      win(420, 260, "Notes", { left: 410, top: 290 }),
    ]
  );
}

function voice([said = "Hey Minnie, run the tests"]: string[]) {
  const bars = [30, 62, 44, 90, 70, 110, 58, 84, 40, 96, 66, 36, 74, 50, 28];
  return el("div", { flexDirection: "column", alignItems: "flex-start", gap: 40, width: 880 }, [
    el(
      "div",
      { alignItems: "center", gap: 10, height: 120 },
      bars.map((h) =>
        el("div", {
          width: 18,
          height: h,
          borderRadius: 9,
          background: `linear-gradient(180deg, ${PEACH}, ${CORAL})`,
        })
      )
    ),
    el(
      "div",
      {
        fontFamily: "Bricolage",
        fontWeight: 800,
        fontSize: 58,
        lineHeight: 1.15,
        letterSpacing: -1,
        color: CREAM,
        maxWidth: 860,
      },
      `“${said}”`
    ),
  ]);
}

const scene = (h: Hero) =>
  h.motif === "dialog" ? dialog(h.lines) : h.motif === "desktop" ? desktop(h.lines) : h.motif === "voice" ? voice(h.lines) : terminal(h.lines);

export async function renderHero(h: Hero): Promise<Buffer> {
  const pet = await poseImage(h.pose ?? "float");

  const svg = await satori(
    el(
      "div",
      {
        width: WIDTH,
        height: HEIGHT,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 100px",
        // A soft warm glow behind the scene so the ink ground isn't flat.
        background: `radial-gradient(circle at 30% 45%, #4a2c1c 0%, ${INK} 62%)`,
      },
      [
        scene(h),
        el("div", { flexDirection: "column", alignItems: "center", width: 400 }, [
          ...(h.bubble
            ? [
                el(
                  "div",
                  {
                    maxWidth: 380,
                    background: CREAM,
                    color: INK,
                    fontFamily: "Bricolage",
                    fontSize: 30,
                    fontWeight: 800,
                    lineHeight: 1.3,
                    borderRadius: 26,
                    padding: "20px 28px",
                    marginBottom: 18,
                  },
                  h.bubble
                ),
              ]
            : []),
          { type: "img", props: { src: pet, width: h.bubble ? 300 : 360, height: h.bubble ? 300 : 360 } },
        ]),
      ]
    ) as never,
    { width: WIDTH, height: HEIGHT, fonts: heroFonts }
  );

  // Flattened for the same reason as the OG cards: the image is opaque, and an
  // alpha channel only costs bytes.
  return sharp(Buffer.from(svg)).flatten({ background: INK }).webp({ quality: 82 }).toBuffer();
}

/** Fallback when a post sets no `hero` in its frontmatter: pick a scene from its tags. */
export function defaultHero(tags: string[]): Hero {
  if (tags.includes("voice")) return { motif: "voice", lines: ["Hey Minnie, run the tests"], pose: "float" };
  if (tags.some((t) => ["permissions", "security", "privacy"].includes(t)))
    return { motif: "dialog", lines: ["Claude wants to run a command", "git push --force"], pose: "stand" };
  if (tags.includes("desktop pet")) return { motif: "desktop", lines: ["Desktop"], pose: "sit" };
  return { motif: "terminal", lines: ["$ claude", "Welcome to Claude Code"], pose: "float" };
}
