import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";

/* Per-post Open Graph cards, rendered at build time.
 *
 * Every page used to share one og-image.png, so thirteen posts produced
 * thirteen identical cards in a timeline. The card is the entire preview on
 * X, Slack, LinkedIn and iMessage, and a shared post that looks exactly like
 * every other shared post is a link nobody clicks — which matters here,
 * because social shares are where this site's first backlinks have to come
 * from.
 *
 * Pipeline: satori lays the card out with flexbox and returns SVG, then sharp
 * rasterises it. Two things make that cheap:
 *
 *   - satori embeds the font as <path> glyphs, so the SVG carries no text and
 *     sharp needs no font configuration. Without that, rasterising text in SVG
 *     depends on fontconfig finding a face by name, which is exactly the thing
 *     that works locally and renders Times New Roman in CI.
 *   - sharp is already in the tree as an Astro dependency. It is declared in
 *     package.json anyway, because relying on someone else's transitive dep is
 *     how a build breaks on an unrelated upgrade.
 *
 * satori only implements flexbox: `display: flex` is required on anything with
 * children, there is no grid, and `position: absolute` needs an explicitly
 * positioned ancestor.
 */

const WIDTH = 1200;
const HEIGHT = 630;

// Values mirror :root in global.css. The dark card is the site's --band, not a
// neutral black — the whole palette is warm and a grey card looks borrowed.
const INK = "#2e1b12";
const CREAM = "#fffcf7";
const PEACH = "#f7b23f";
const CORAL = "#e05c18";
const DIM = "#c9b3a4";

/* Paths resolve from the project root, NOT from `import.meta.url`.
 *
 * This module is bundled into dist/.prerender/chunks/ before the static routes
 * run, so at read time `import.meta.url` points at the chunk and every relative
 * path below it is wrong. `process.cwd()` is the project root for both
 * `astro dev` and `astro build`, which is the only time this code runs. */
const fromRoot = (...parts: string[]) => join(process.cwd(), ...parts);

const font = (file: string) => readFileSync(fromRoot("src", "assets", "fonts", file));

const fonts = [
  { name: "Bricolage", data: font("BricolageGrotesque-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Bricolage", data: font("BricolageGrotesque-ExtraBold.ttf"), weight: 800 as const, style: "normal" as const },
];

// The app icon, inlined. satori cannot fetch during a static build, and the
// site's animation frames are .webp, which it does not decode — so this is the
// PNG the favicons already use.
const mark = `data:image/png;base64,${readFileSync(fromRoot("public", "icon-512x512.png")).toString("base64")}`;

/* Minnie herself, on the right of every card.
 *
 * Her poses ship as .webp, which satori does not decode — so sharp converts one
 * to PNG first. That is the same sharp already doing the rasterising, and the
 * result is memoised because thirteen cards would otherwise decode the same
 * 480px frame thirteen times.
 *
 * `float` is the pose used: she is mid-air and facing the viewer, which reads
 * at thumbnail size. The sitting poses lose their silhouette once a timeline
 * scales the card down to a few hundred pixels. */
let petPromise: Promise<string> | undefined;
const pet = () =>
  (petPromise ??= sharp(fromRoot("public", "minnie", "float.webp"))
    .png()
    .toBuffer()
    .then((b) => `data:image/png;base64,${b.toString("base64")}`));

/** Headline size, stepped down as the title grows.
 *
 *  Titles on this site run 40–58 characters. A fixed size either wastes the
 *  card on the short ones or wraps the long ones to five cramped lines, and
 *  satori gives us no way to measure and re-fit, so the steps are picked
 *  against the real set rather than computed. */
const titleSize = (t: string, dense: boolean) => {
  const base = t.length <= 42 ? 66 : t.length <= 54 ? 58 : 52;
  // A card carrying a subtitle and chips has roughly a third less vertical
  // room, so the headline steps down rather than pushing the rest off.
  return dense ? Math.round(base * 0.82) : base;
};

const el = (type: string, props: Record<string, unknown>) => ({ type, props });

export interface OgCard {
  title: string;
  /** Small line above the headline — a tag, or a section name. */
  eyebrow?: string;
  /** Optional date line next to the domain. */
  footnote?: string;
  /** A sentence under the headline. Used by the pages that are selling
   *  something (home, download) rather than the posts, where the headline is
   *  the whole message and a second paragraph just shrinks it. */
  subtitle?: string;
  /** Short claims as pills. Three is the limit the width allows. */
  chips?: string[];
}

export async function renderOgCard({ title, eyebrow, footnote, subtitle, chips = [] }: OgCard): Promise<Buffer> {
  const petImage = await pet();

  const svg = await satori(
    el("div", {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        fontFamily: "Bricolage",
        padding: "0 0 56px",
      },
      children: [
        // The flame gradient, as a bar. Same gradient as every CTA on the site,
        // and the one element that makes the card recognisable at thumbnail size.
        el("div", {
          style: {
            display: "flex",
            height: 14,
            width: "100%",
            background: `linear-gradient(90deg, ${CORAL}, ${PEACH})`,
          },
        }),

        el("div", {
          style: { display: "flex", alignItems: "center", padding: "0 72px", flexGrow: 1 },
          children: [
        el("div", {
          style: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" },
          children: [
            ...(eyebrow
              ? [
                  el("div", {
                    style: {
                      display: "flex",
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: PEACH,
                      marginBottom: 22,
                    },
                    children: eyebrow,
                  }),
                ]
              : []),
            el("div", {
              style: {
                display: "flex",
                fontSize: titleSize(title, Boolean(subtitle)),
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: -1.5,
                color: CREAM,
                // Leaves the right-hand column to Minnie. Without a cap the
                // longest headline runs under her.
                maxWidth: 740,
              },
              children: title,
            }),
            ...(subtitle
              ? [
                  el("div", {
                    style: {
                      display: "flex",
                      fontSize: 27,
                      fontWeight: 400,
                      lineHeight: 1.4,
                      color: DIM,
                      marginTop: 20,
                      maxWidth: 680,
                    },
                    children: subtitle,
                  }),
                ]
              : []),
            ...(chips.length
              ? [
                  el("div", {
                    style: { display: "flex", gap: 12, marginTop: 30 },
                    children: chips.map((c) =>
                      el("div", {
                        style: {
                          display: "flex",
                          fontSize: 20,
                          fontWeight: 400,
                          color: CREAM,
                          // No background-image support for borders in satori,
                          // so the pill is a flat border in the accent, not the
                          // gradient the site uses on its own chips.
                          border: `2px solid ${CORAL}`,
                          borderRadius: 999,
                          padding: "7px 18px",
                        },
                        children: c,
                      })
                    ),
                  }),
                ]
              : []),
          ],
        }),
            el("img", { src: petImage, width: 300, height: 300 }),
          ],
        }),

        el("div", {
          style: { display: "flex", alignItems: "center", padding: "0 72px", gap: 18 },
          children: [
            el("img", { src: mark, width: 64, height: 64, style: { borderRadius: 16 } }),
            el("div", {
              style: { display: "flex", flexDirection: "column" },
              children: [
                el("div", {
                  style: { display: "flex", fontSize: 30, fontWeight: 800, color: CREAM, letterSpacing: -0.5 },
                  children: "heyminnie.com",
                }),
                ...(footnote
                  ? [
                      el("div", {
                        style: { display: "flex", fontSize: 21, fontWeight: 400, color: DIM, marginTop: 2 },
                        children: footnote,
                      }),
                    ]
                  : []),
              ],
            }),
          ],
        }),
      ],
    }) as never,
    { width: WIDTH, height: HEIGHT, fonts }
  );

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
