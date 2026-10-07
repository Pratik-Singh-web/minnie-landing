---
title: "Claude Code vs Gemini CLI vs Codex on a Mac"
description: "Three terminal coding agents, three different temperaments. What each is good at, how they differ day to day, and why you do not have to pick just one."
pubDate: 2026-10-07
tags: ["claude code", "gemini cli", "codex", "comparison"]
draft: false
---

Claude Code, OpenAI's Codex CLI and Google's Gemini CLI are the three terminal
coding agents most people are actually choosing between. They look nearly
identical from the outside — you type a request, they read your repo and do work
— and they feel quite different after a week.

This is a comparison of temperament rather than benchmarks. Benchmarks for these
tools go stale in about six weeks, and so does any pricing table, so there isn't
one here: check the vendor's current page before you commit money.

## Claude Code

**The implementer.** Give it a goal that spans several files and it will plan,
read what it needs, and land the change with the least hand-holding of the three.
It is the one that most often does the thing you meant rather than the thing you
said.

Its other distinguishing property is the one people complain about first and miss
most when it is gone: **it asks before it acts.** Before an edit, a command, a
push, it stops and waits for a yes. You can allow once, allow for the session, or
refuse. That makes it the most comfortable of the three to point at a repository
you care about.

It needs a paid Claude plan. There is no meaningful free tier.

## Codex CLI

**The reviewer.** Codex is strongest reading code and reasoning about whether a
change is right, and it is the most at home in a pipeline — GitHub flow, pull
requests, CI. If your use case is "look at this diff and tell me what is wrong
with it" rather than "write this feature", it is a genuinely different experience
from Claude Code and often a better one.

Access typically comes with a ChatGPT plan, with a per-token API option for
automation. If you already pay OpenAI for something else, trying it costs nothing
extra.

## Gemini CLI

**The one with the enormous context window.** The headline property is that it
can hold far more of a repository in mind at once, which matters for a specific
job: understanding an unfamiliar, sprawling codebase. "Explain how this 400-file
service fits together" is a question it answers better than the others.

Its access story has moved around. Gemini CLI remains Apache-2.0 and still works,
but Google shifted consumer and free access toward a separate tool,
**Antigravity**, during 2026 — so the free allowance that made Gemini CLI famous
may not be where you remember it. Check before you plan around it.

## In practice: use more than one

The sensible answer, if you can, is not to pick.

- **Gemini CLI** to understand a codebase you did not write.
- **Claude Code** to make the change.
- **Codex** to review the diff before it goes anywhere.

That sounds like overhead and mostly is not: they all operate on the same working
directory, and switching is a matter of running a different command in the same
terminal.

What it does create is a practical problem. Three long-running agents, three
terminal windows, and no ambient sense of which one is working, which one
finished, and which one has been waiting eleven minutes for you to approve
something.

## Which does Minnie work with?

All of them, and that was the point.

[Minnie](/download/) is a free macOS desktop pet that drives the agent CLI you
already have. She does not ship a model and does not resell one — the agent keeps
its own login and does all the reasoning, so there is no second AI bill
regardless of which you use. The reasoning behind that is in
[Why Minnie is free: bring your own AI agent](/blog/free-ai-coding-companion-bring-your-own-agent/).

Where the agents differ is the consent flow. Minnie's out-loud "can I do this?"
is built on Claude Code's permission protocol, so today that experience is Claude
Code only. Gemini CLI, Codex, Antigravity and custom command-line agents run
under Minnie too — you still get the voice input, the visible state and the face
— they just run more autonomously, because there is no equivalent prompt for her
to speak.

There is a longer version of that, including what "custom CLI" means in practice,
in [Claude Code, Gemini CLI or Codex: one desktop pet for
all](/blog/claude-code-gemini-cli-codex-on-your-desktop/).

## If you can only pick one

- You mostly **write** code and want the agent to do the work: **Claude Code.**
- You mostly **review** code, or you live in CI: **Codex.**
- You are **reading your way into something huge**: **Gemini CLI.**
- You already pay for one of the three parent subscriptions: start with that one.
  The gap between these tools is smaller than the gap between using one and not.

New to all of this? [Install Claude Code on a Mac, start to
finish](/blog/install-claude-code-on-mac/) is the ten-minute version.
