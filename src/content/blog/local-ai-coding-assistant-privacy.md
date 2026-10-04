---
title: "What a local-first AI coding assistant keeps on your Mac"
description: "\"Private\" means different things for different AI tools. Exactly what Minnie keeps on your Mac, and what your agent's model provider sees."
pubDate: 2026-10-02
updatedDate: 2026-10-03
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
which you can switch off, and an account only if you choose to make one.

## What stays on your Mac

**Your voice.** Speech recognition runs on device by default, using Apple's local
speech. Your microphone audio is transcribed on your Mac. You can bring your own key
for a cloud voice if you prefer, and that is your choice to make.

**Your screen.** Minnie never captures or records your screen. She sees only what
you hand her and what your agent reports back.

**Your secrets.** API keys and connector tokens live in the macOS Keychain,
encrypted by the operating system, never in plain text.

**Your memory.** You can wipe what she remembers about you whenever you like.

## What still leaves, and why

Being honest about this matters more than sounding perfectly private:

- **Your agent talks to its provider.** When Claude Code, Gemini CLI or Codex
  reasons about your code, it sends context to Anthropic, Google or OpenAI under
  your existing account and their terms. Minnie doesn't change that and doesn't add
  a copy.
- **Tools you approve send what they need.** If you connect GitHub and approve a
  pull request lookup, that request goes to GitHub. Nothing goes out through a tool
  unless you said yes.
- **Anonymous usage analytics.** Minnie records which parts of the app get used,
  such as the app launching, an onboarding step finishing or a task completing, so we
  can see where people get stuck. The events are tied to a random id made on
  install, not to your Mac's hardware id. They **never** include message text,
  replies, tool arguments, file paths or keys. When a setting changes we record
  which one, never its value. Turn it off in **Settings ▸ Privacy & Safety** and
  Minnie works exactly the same.
- **An account, only if you make one.** It's optional. It saves your setup so a new
  Mac can pick up where you left off, and holds your email and licence details.

So the question to ask about any AI coding tool is not "is it private?" but "how
many new places does my code go?" With Minnie, the answer is none beyond the agent
and tools you already chose. Your code and your conversations stay out of
everything Minnie collects.

## Why local-first suits a desktop companion

Something that sits on your desktop all day is close to everything you do. That is
exactly why it shouldn't be watching. Keeping the voice on device, the secrets in
the Keychain and the screen out of reach means having her around costs you nothing
in privacy.

## The checklist

- On-device voice by default
- Your local agent CLI does the thinking
- No screen capture
- Usage analytics never include your code, messages or keys, and switch off in one click
- Secrets in the macOS Keychain
- Nothing sent through a tool without your yes

The full details are in the [privacy policy](/privacy/).

[Download the free beta →](/download/)
