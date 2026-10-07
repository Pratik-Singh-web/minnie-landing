---
title: "Talk to Claude Code with your voice on a Mac"
description: "Claude Code is a terminal tool: no voice, no window. The three ways people add one, what each is good at, and why the permission prompt was the hard part."
pubDate: 2026-09-10
updatedDate: 2026-10-07
tags: ["claude code", "voice", "macos"]
draft: false
---

Claude Code lives in a terminal. That is the right call for a coding agent — it
sits where your project already is — but it means two things are missing: it
cannot hear you, and there is nothing on screen telling you what it is doing
while you are looking at something else.

Minnie adds both. She is a small character who floats above your desktop, listens
when you talk to her, and drives the Claude Code CLI you already have installed.

Before the how, it is worth being clear about what the options are, because Minnie
is not the only way to do this and is not the right answer for everyone.

## The three ways to put voice on a coding agent

**Dictation into the terminal.** The simplest thing that works. A system-wide
dictation tool — macOS's own, or an app like Spokenly — types transcribed speech
wherever your cursor is. Claude Code also ships a `/voice` command that takes
microphone input directly.

This is excellent and you should try it first. It costs nothing, it works with
every agent, and for the "I'd rather talk than type" use case it is basically
complete. Its limit is that it is one-directional and it requires the terminal to
be focused: you are still looking at the window, you just aren't typing into it.

**Voice over MCP or hooks.** Projects like mcp-voice-hooks wire two-way speech into
the agent, so it can speak back and you can interrupt mid-run. More ambitious, and
genuinely good if you want a conversation rather than dictation. Setup is more
involved, and the experience lives wherever the project decided to put it — often a
browser tab.

**A companion app.** Something that runs alongside the agent, owns the microphone,
and has a presence on screen independent of the terminal. That is what Minnie is.
The reason to want one is specific, and it is the next section.

## The problem a companion solves that dictation doesn't

Dictation fixes input. It does not fix the thing that actually breaks your day,
which is that **the agent needs you and you don't know it.**

Claude Code stops and asks before it edits a file or runs a command. That prompt is
the best safety property the tool has. It is also, the moment you switch to your
browser, a question sitting in a window you cannot see — and the agent is idle,
waiting for an answer that is not coming. You come back eleven minutes later to find
it got three seconds into the task.

Fixing that needs something that is not the terminal: something that is visible when
the terminal is not, and that can get your attention without you going looking.

## What you need first

Minnie does not ship an AI model and does not resell one. She drives the agent
CLI on your machine, and that CLI carries its own authentication — so whatever
you already pay Anthropic is the whole bill. Nothing extra.

That means one prerequisite:

- Install Claude Code and log in once, so `claude` works in your terminal. If you
  haven't yet, [Install Claude Code on a Mac, start to
  finish](/blog/install-claude-code-on-mac/) takes about ten minutes.
- Run Minnie. Her onboarding walks through the rest, including the one macOS
  permission prompt she needs — microphone access, granted in **System Settings →
  Privacy & Security → Microphone**, the same as any other app.

If you already use Claude Code daily, you are done in about a minute.

## Saying something

Talk to her the way you would type into the terminal — "check why the tests are
failing", "commit this". The speech goes to Claude Code as a prompt, and the
agent does the work in your project the same way it always has.

You start with her name, which acts as the wake word, and then speak the request.
The alternative design — always listening, no wake word — is better for latency and
much worse for everything else: an app that streams your microphone continuously is
a thing you have to think about every time a colleague walks past. A wake word is
one syllable of friction in exchange for a clear answer to "is it listening right
now?" and it was the right trade.

Typing works too, and is better for some requests. More on which is which in
[Voice coding: how to speak prompts your agent
understands](/blog/voice-coding-prompts-that-work/).

## On-device, and what that costs

Voice recognition runs **on device** by default, using Apple's local speech. Your
microphone audio does not leave your Mac.

It is worth being honest about the trade. Cloud speech models — Whisper-class and
newer — are more accurate, particularly on technical vocabulary and accented
English. On-device recognition on Apple Silicon is good, and it is noticeably less
good at `kubectl`, `pnpm`, and the name of your internal service.

We picked on-device as the default anyway, because the alternative default is
streaming a developer's microphone to a third party all day, and that is not a
default anyone should ship quietly. If you want a cloud model you can bring your own
key, and that is your decision to make, taken deliberately.

The practical workaround for the accuracy gap is smaller than you'd think: speak the
intent, not the identifier. "The test file for checkout" survives transcription;
`checkout_test.py` often does not. The agent is extremely good at resolving the
first into the second.

## The part that took the longest: permission

An agent that can run `bash` on your machine cannot be a black box. Claude Code
already asks before it runs a tool — but that prompt appears in a terminal you
may not be looking at, and if you have walked away it just sits there.

So Minnie says it out loud. When the agent wants to run something, she surfaces
it in a speech-cloud above her head and asks — *"I want to run pytest. Ok?"* —
and waits for you.

Three decisions there that we would defend:

**Denying is not a failure.** Saying no is a normal answer, not an error state.
She takes it as a course correction and moves on, because a tool you feel bad
about refusing is a tool you stop refusing.

**Nothing is pre-approved by default.** It would be easy to ship a "trust
everything" mode as the default and look faster in a demo. An agent with shell
access on your primary machine is not the place for that. What you *should* do is
configure a real allowlist so the prompts you get are the ones that matter — that
is covered in [Claude Code permission prompts, without the
babysitting](/blog/claude-code-permission-prompts/).

**The question is spoken, not just shown.** A badge you have to notice is a badge
you miss. Audio reaches you when you are looking at a different window, a different
monitor, or nothing at all.

Voice consent is a Claude Code feature specifically, because it is built on Claude
Code's permission protocol. Gemini CLI, Codex and custom command-line agents work
with Minnie too, but they run more autonomously — their permission models are not
wired into the speech-cloud yet. The differences between the three agents are laid
out in [Claude Code vs Gemini CLI vs
Codex](/blog/claude-code-vs-gemini-cli-vs-codex/).

## Reading state without reading logs

The other half of this is passive. Her posture carries the agent's state, so you can
tell from across the room whether it is thinking, working, waiting on you, or done
— without a notification, a badge count, or a window switch.

That turns out to be the thing people keep after the novelty wears off. You do not
read body language; you just notice it. The argument in full is in
[A desktop pet for your Mac that actually does
work](/blog/desktop-pet-for-mac-that-does-work/).

## Who this is really for

Two groups find it more than a convenience.

People who **context-switch constantly** — meetings, reviews, three repos — and lose
the most to the "waiting on an approval nobody saw" failure.

And people for whom typing is the expensive part: **RSI, a wrist injury, or any
reason the keyboard is rationed.** Voice input for prose has been solved for years;
voice input for *directing an agent that writes the code* is a meaningfully
different proposition, because the words you have to say are short and the output is
long.

## Connecting your own tools

Coding is not the only thing you can ask for. Minnie ships a one-click MCP
catalog — GitHub, Notion, Slack, Postgres, Figma — plus custom servers, so the
same voice request can reach the tools your work actually lives in. "Any PRs waiting
on me?" is a better question asked out loud than typed.

The details, including the security parts worth knowing, are in [MCP servers,
explained](/blog/mcp-servers-for-coding-agents/).

## Trying it

Minnie is in open beta right now: free, Apple Silicon, a direct download rather
than the App Store. macOS will warn you on first open because she isn't signed yet —
[here is what that warning
means](/blog/open-unsigned-mac-app-apple-could-not-verify/).

[Download the beta →](/download/)
