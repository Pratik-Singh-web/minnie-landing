import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts are Markdown files in src/content/blog/. The FILE NAME becomes the
// URL slug (voice-control-claude-code.md -> /blog/voice-control-claude-code/),
// so renaming a published file breaks every link to it and drops it out of
// Google's index. Treat a file name as permanent once the post is live.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    // Keep under ~60 characters — Google truncates past that in results.
    title: z.string(),
    // This becomes <meta name="description">. Write it for a human scanning
    // search results, not as a summary of the post.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Drafts render on `astro dev` but are dropped from the production build,
    // so they never reach the sitemap and Google never sees a half-written post.
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // The scene drawn in the post's hero image (src/hero.ts). Optional: any
    // field left out falls back to a scene picked from the tags. Lines are what
    // the scene shows: commands for a terminal (prefix "$ "), [heading, command]
    // for a permission dialog, the spoken line for voice, the window title for
    // a desktop.
    hero: z
      .object({
        motif: z.enum(["terminal", "dialog", "desktop", "voice"]).optional(),
        lines: z.array(z.string()).optional(),
        bubble: z.string().optional(),
        pose: z.enum(["float", "sit", "stand", "rest"]).optional(),
      })
      .optional(),
  }),
});

export const collections = { blog };
