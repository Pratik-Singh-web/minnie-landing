---
title: "What a local-first AI coding assistant keeps on your Mac"
description: "\"Private\" means different things for different AI tools. What Minnie keeps on your Mac, what your agent's provider sees, and what to ask any tool."
pubDate: 2026-10-02
updatedDate: 2026-10-07
tags: ["privacy", "macos", "ai agent"]
draft: false
---

Almost every AI tool says it is private. That word covers very different things,
so this post spells out exactly what stays on your Mac when you use Minnie, and is
just as clear about what doesn't.

## The short version

Minnie is local-first. She doesn't watch your screen and doesn't run your AI.
**She is not an AI model.** She drives the coding agent you already use, and that
agent sends your prompts to its own model provider, the same as when you use it in a
terminal. Minnie adds no new place for your code or your messages to go.

What Minnie itself collects is small and listed below: anonymous usage analytics,
which you can switch off, and the Google sign-in she asks for on setup.

## The question that actually matters

"Is it private?" is not a useful question, because every vendor answers yes. A
better one:

> **How many new places does my code go because I installed this?**

Count them. For a tool that bundles its own model, the answer is at least one — the
tool's own backend — and often more, because the tool's backend then talks to a
model provider on your behalf, and now two companies have your code instead of one.
For a tool that drives the agent you already use, the answer can be zero.

That is a structural property, not a policy promise. Policies change at the next
funding round. Architecture is harder to quietly reverse.

## Where your data actually goes

Worth mapping out, because the parts are easy to conflate:

| What | Where it goes |
|---|---|
| Your voice | Transcribed on your Mac. Does not leave it. |
| Your screen | Nowhere. Never captured. |
| Your prompt, after transcription | To your agent CLI, locally |
| Your code and context | From your agent to **its** provider, under your existing account — exactly as in a terminal |
| Tokens and API keys | macOS Keychain, encrypted by the OS |
| Tool calls you approve | To that tool. GitHub gets the GitHub request, and nothing else does. |
| Anonymous usage events | To us. Never content. Switchable off. |
| Your sign-in | Google, then us: your email and licence details. Not your code. |

The row that does the heavy lifting is the fourth. Your code goes to Anthropic,
Google or OpenAI because you chose Claude Code, Gemini CLI or Codex — and it would
go there whether or not Minnie existed.

## What stays on your Mac

**Your voice.** Speech recognition runs on device by default, using Apple's local
speech. Your microphone audio is transcribed on your Mac. You can bring your own key
for a cloud voice if you prefer, and that is your choice to make — made deliberately,
rather than being the default nobody mentioned.

**Your screen.** Minnie never captures or records your screen. She sees only what
you hand her and what your agent reports back. This is worth stating plainly because
a growing number of AI desktop tools do take screenshots, continuously, as their core
mechanism. That is a legitimate design — it is also an entirely different privacy
proposition, and it should be an informed choice rather than a surprise.

**Your secrets.** API keys and connector tokens live in the macOS Keychain,
encrypted by the operating system, never in plain text.

That last one is a bigger deal than it sounds. The normal way to configure an MCP
server is a JSON file with the token pasted into it, sitting unencrypted in your home
directory — which means it is in your backups, it is readable by anything running as
you, and it is one careless `git add .` from being public. The Keychain is not
magic, and anything running as you can still ask for access, but it removes the
plaintext-on-disk problem entirely.

**Your memory.** You can wipe what she remembers about you whenever you like.

## What still leaves, and why

Being honest about this matters more than sounding perfectly private:

- **Your agent talks to its provider.** When Claude Code, Gemini CLI or Codex
  reasons about your code, it sends context to Anthropic, Google or OpenAI under
  your existing account and their terms. Minnie doesn't change that and doesn't add
  a copy. If retention matters to you — and for work code it may — that is a
  question for your agent's provider and your plan with them, where the answer
  differs considerably between consumer and enterprise tiers.
- **Tools you approve send what they need.** If you connect GitHub and approve a
  pull request lookup, that request goes to GitHub. Nothing goes out through a tool
  unless you said yes. Scoping those tokens properly is covered in [MCP servers,
  explained](/blog/mcp-servers-for-coding-agents/).
- **Anonymous usage analytics.** Minnie records which parts of the app get used,
  such as the app launching, an onboarding step finishing or a task completing, so we
  can see where people get stuck. The events are tied to a random id made on
  install, not to your Mac's hardware id. They **never** include message text,
  replies, tool arguments, file paths or keys. When a setting changes we record
  which one, never its value. Turn it off in **Settings ▸ Privacy & Safety** and
  Minnie works exactly the same.
- **A Google sign-in.** Minnie asks you to sign in on setup. It holds your email
  and licence details and saves your setup, so a new Mac picks up where you left
  off. It is the only thing she asks you for — she asks for it instead of money —
  and it is worth saying plainly that this is a cost, not a feature: see the
  question about accounts below, which Minnie does not pass cleanly.

So the answer to the question above, for Minnie, is none beyond the agent and tools
you already chose. Your code and your conversations stay out of everything Minnie
collects.

## Questions to ask any AI coding tool

Useful well beyond this one. If a vendor cannot answer these in a sentence each,
that is itself the answer:

1. **Does it have its own model, or does it drive mine?** If its own: your code now
   goes somewhere new, and that somewhere has its own retention policy.
2. **Does it capture the screen?** Continuously, or on demand, or never?
3. **Where does speech get transcribed?** On device, or streamed somewhere?
4. **Where do my tokens live?** Keychain, or a plaintext config file?
5. **What is in the telemetry?** "Anonymous" is not an answer. *Content or not
   content* is the answer.
6. **Can I turn the telemetry off and keep using the product?** If not, it is not
   optional.
7. **Does it work without an account?** A local tool that requires one should be
   able to say what it is for. **Minnie does not pass this one cleanly**: she asks
   you to sign in with Google before she runs. The trade she is offering is an
   account instead of a payment, and you are entitled to decide that is a bad
   trade — but you should be told it is the trade, which is why it is written here
   rather than left out of the list.

## If your code belongs to an employer

Worth a separate thought, because the calculus is different.

The relevant question is usually not about the desktop app at all — it is about which
model provider your agent talks to, on what plan, and whether your organisation has
an agreement with them. A companion app that adds no new destination does not change
your compliance position; one that proxies your code through its own backend very
much does.

If you are on a managed Mac, note too that Claude Code's permission rules can be set
centrally and cannot be loosened locally. That is a feature, and it interacts with
everything here.

## Why local-first suits a desktop companion

Something that sits on your desktop all day is close to everything you do. That is
exactly why it shouldn't be watching. Keeping the voice on device, the secrets in
the Keychain and the screen out of reach means having her around costs you nothing
in privacy.

There is also a commercial version of this argument, which is in [Why Minnie is
free](/blog/free-ai-coding-companion-bring-your-own-agent/): a tool that makes no
money from your usage has no reason to be interested in it.

## The checklist

- On-device voice by default
- Your local agent CLI does the thinking
- No screen capture
- Usage analytics never include your code, messages or keys, and switch off in one click
- Secrets in the macOS Keychain
- Nothing sent through a tool without your yes
- One Google sign-in, and no card

The full details are in the [privacy policy](/privacy/).

[Download the free beta →](/download/)
