---
title: "Talk to Claude Code with your voice on a Mac"
description: "Claude Code is a terminal tool, so it has no voice and no window. Here is how Minnie adds both — and why the permission prompt was the hard part."
pubDate: 2026-09-10
tags: ["claude code", "voice", "macos"]
draft: false
---

Claude Code lives in a terminal. That is the right call for a coding agent — it
sits where your project already is — but it means two things are missing: it
cannot hear you, and there is nothing on screen telling you what it is doing
while you are looking at something else.

Minnie adds both. She is a small character who floats above your desktop, listens
when you talk to her, and drives the Claude Code CLI you already have installed.

## What you need first

Minnie does not ship an AI model and does not resell one. She drives the agent
CLI on your machine, and that CLI carries its own authentication — so whatever
you already pay Anthropic is the whole bill. Nothing extra.

That means one prerequisite:

- Install Claude Code and log in once, so `claude` works in your terminal.
- Run Minnie. Her onboarding walks through the rest.

If you already use Claude Code daily, you are done in about a minute.

## Saying something

Talk to her the way you would type into the terminal — "check why the tests are
failing", "commit this". The speech goes to Claude Code as a prompt, and the
agent does the work in your project the same way it always has.

Voice recognition runs **on device** by default. Your microphone audio does not
leave your Mac.

## The part that took the longest: permission

An agent that can run `bash` on your machine cannot be a black box. Claude Code
already asks before it runs a tool — but that prompt appears in a terminal you
may not be looking at, and if you have walked away it just sits there.

So Minnie says it out loud. When the agent wants to run something, she surfaces
it in a speech-cloud above her head and asks — *"I want to run pytest. Ok?"* —
and waits for you.

Two decisions there that we would defend:

**Denying is not a failure.** Saying no is a normal answer, not an error state.
She takes it as a course correction and moves on, because a tool you feel bad
about refusing is a tool you stop refusing.

**Nothing is pre-approved by default.** It would be easy to ship a "trust
everything" mode as the default and look faster in a demo. An agent with shell
access on your primary machine is not the place for that.

Voice consent is a Claude Code feature specifically. Gemini CLI, Codex and custom
command-line agents work with Minnie too, but they run more autonomously — their
permission models are not wired into the speech-cloud yet.

## Connecting your own tools

Coding is not the only thing you can ask for. Minnie ships a one-click MCP
catalog — GitHub, Notion, Slack, Postgres, Figma — plus custom servers, so the
same voice request can reach the tools your work actually lives in.

## Trying it

Minnie is in open beta right now: free, Apple Silicon, a direct download rather
than the App Store.

[Download the beta →](/download/)
