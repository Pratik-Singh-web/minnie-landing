// Facts used in more than one place. The visible FAQ and the FAQPage structured
// data must say the same thing — Google treats a mismatch between markup and
// page as a quality problem — so both read from here.

/** Current beta release. The download page and the app's structured data use it.
 *  Keep in step with version.json in the repo root, which the in-app update
 *  check reads. */
export const version = "0.9.8";
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
    a: "Install the agent CLI once (Claude Code, say) and log in. Minnie's onboarding walks you through the rest.",
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
