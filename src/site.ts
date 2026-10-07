// Facts used in more than one place. The visible FAQ and the FAQPage structured
// data must say the same thing — Google treats a mismatch between markup and
// page as a quality problem — so both read from here.

/** Current beta release. The download page and the app's structured data use it.
 *  Keep in step with version.json in the repo root, which the in-app update
 *  check reads. */
export const version = "0.9.11";
export const dmgURL = `https://github.com/Pratik-Singh-web/minnie-landing/releases/download/v${version}-beta/Minnie-${version}-beta.dmg`;

export const faqs = [
  {
    q: "Is Minnie really free?",
    a: "Yes, for life. The app and everything she does — voice, the wake word, real tasks on your Mac, MCP tools — is free, with no trial, no subscription and no card. Later, extra characters may be sold as optional one-time purchases; nothing that is free today will start costing money.",
  },
  {
    q: "Does Minnie cost extra to run the AI?",
    a: "No. She drives the agent CLI you already use; it holds its own auth and does the reasoning. Zero extra AI cost.",
  },
  {
    q: "Which agents work?",
    a: "Claude Code today, with the full experience. Gemini CLI, Codex, Antigravity and custom command-line agents work too — they run more autonomously, since the voice-consent flow is Claude Code only for now.",
  },
  {
    q: "Is my code private?",
    a: "Yes. On-device voice by default, your local agent CLI does the thinking, and there is no screen capture. Secrets live in your macOS Keychain. Minnie sends anonymous usage analytics (which features get used, never your messages, code, file paths or keys), and you can switch them off in Settings.",
  },
  {
    q: "Do I need to set anything up?",
    a: "Two things, both one-off. Sign in to Minnie with Google — that is free and it is the only thing she asks for — and install the agent CLI you want her to drive (Claude Code, say) and log into that. Her onboarding walks you through both.",
  },
  {
    q: "Can I connect my own tools?",
    a: "Yes — a one-click MCP catalog (GitHub, Notion, Slack, Postgres, Figma…), custom servers, and native Sign in with Google for Gmail, Calendar and Chat.",
  },
  {
    q: "Does it work on Windows?",
    a: "macOS first (macOS 14 or later, Apple Silicon). Windows is on the roadmap.",
  },
];

/** Structured data for a page that is NOT the app's home page.
 *
 *  Every page used to inherit the home page's SoftwareApplication + FAQPage,
 *  so the same seven FAQ answers claimed to live at six URLs — the exact
 *  duplication that gets an FAQ rich result dropped. Pages now pass their own
 *  node: a WebPage (or a narrower subtype) tied back to the one Organization.
 */
export function pageLd(opts: {
  /** Absolute URL of the page. */
  url: string;
  name: string;
  description: string;
  /** Site root, used to point at the shared Organization @id. */
  site: string;
  /** A narrower schema.org type where one fits, e.g. ContactPage. */
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Minnie", url: opts.site },
    publisher: { "@id": `${opts.site}#org` },
  };
}

/** Tag → URL segment. Tags are written as prose in the frontmatter ("claude
 *  code"), and a URL cannot carry a space, so every place that builds or reads
 *  a tag URL has to agree on one transform. This is it. */
export const tagSlug = (tag: string) =>
  tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** One line per tag, used as the hub page's intro and meta description.
 *
 *  A hub with nothing but a list of links is a doorway page in Google's eyes;
 *  a sentence that says what the topic is and why these posts belong together
 *  is the difference between a page that ranks and one that gets ignored. Tags
 *  without an entry fall back to a generic line, so adding a tag never breaks
 *  the build — but a tag worth ranking for deserves its own sentence. */
export const tagIntros: Record<string, string> = {
  "claude code": "Guides for running Claude Code on a Mac: voice input, permission prompts, MCP servers, and giving the agent a window of its own.",
  "desktop pet": "Desktop pets that do more than wander across your wallpaper — what they are, how they behave, and what happens when one is wired to a coding agent.",
  macos: "Mac-specific notes: Gatekeeper warnings, unsigned apps, on-device speech, the Keychain, and the bits of macOS that an AI agent has to live inside.",
  voice: "Talking to a coding agent instead of typing at it — how dictation differs from prompting, and what makes a spoken request land.",
  mcp: "Model Context Protocol: what it is, which servers are worth connecting, and how an agent reaches GitHub, Notion, Slack or your database.",
  privacy: "What stays on your Mac and what leaves it when you run an AI coding agent — told in specifics, not reassurance.",
  permissions: "Approving what an agent does: why the prompts exist, what they actually protect, and how to keep them without babysitting a terminal.",
  security: "The sharp edges of letting an AI agent run commands on a machine you care about.",
  "gemini cli": "Running Google's Gemini CLI on a Mac, and how it differs from Claude Code in practice.",
  codex: "Running OpenAI's Codex CLI on a Mac, and where it fits next to Claude Code and Gemini CLI.",
  "ai agent": "Coding agents as programs that live on your machine: what they can reach, what they cost, and how to keep them legible.",
  pricing: "What AI coding tools actually cost once you count the model bill underneath the app.",
  install: "Getting things onto a Mac and running: disk images, quarantine flags, CLIs and first launches.",
  gatekeeper: "macOS code signing and notarization, and what the warnings do and don't tell you about an app.",
  prompting: "Writing requests a coding agent understands the first time.",
  productivity: "Working faster with an agent without losing track of what it did.",
  integrations: "Wiring a coding agent into the tools you already use.",
  comparison: "Honest side-by-side looks at the tools in this space, including the ones we don't make.",
};
