import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { isVisible } from "../../published";
import { defaultHero, renderHero, type Hero } from "../../hero";

/* One hero per post, at /hero/<slug>.webp. A separate tree from /blog/ for the
 * same reason the OG cards live under /og/: the blog route is a rest route and
 * would match `<slug>/hero.webp` too.
 *
 * A post's `hero` frontmatter overrides any part of the scene; anything it
 * leaves out comes from the tag-based default in src/hero.ts. */
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => isVisible(data));
  return posts.map((post) => {
    const fallback = defaultHero(post.data.tags);
    const own = post.data.hero ?? {};
    const hero: Hero = {
      motif: own.motif ?? fallback.motif,
      // A motif override without its own lines would inherit the fallback
      // motif's lines, which belong to a different scene.
      lines: own.lines ?? (own.motif && own.motif !== fallback.motif ? [] : fallback.lines),
      bubble: own.bubble ?? fallback.bubble,
      pose: own.pose ?? fallback.pose,
    };
    return { params: { slug: post.id }, props: { hero } };
  });
}

export const GET: APIRoute = async ({ props }) => {
  const webp = await renderHero(props.hero as Hero);
  return new Response(new Uint8Array(webp), {
    headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};
