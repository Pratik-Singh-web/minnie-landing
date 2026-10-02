---
title: "Claude Code permission prompts, without the babysitting"
description: "Claude Code asks before it runs tools, which is good, until the prompt sits unseen in a terminal. How to keep approvals safe without watching the window."
pubDate: 2026-10-02
tags: ["claude code", "permissions", "security"]
draft: false
---

Claude Code asks for permission before it does anything consequential: editing a
file, running a shell command, calling an external tool. That is the correct
default for an agent with shell access on your main machine.

The trouble is where the question appears. It shows up in the terminal, and the
terminal is the window you're least likely to be looking at while the agent works.
So one of two things happens:

1. The prompt sits there unanswered and the task stalls until you come back.
2. You get tired of that and start pre-approving everything.

The second one is the risky one. Below is how to avoid both.

## Why "just approve everything" is a bad trade

Pre-approving tools feels like a speed-up, and for read-only actions it often is.
But approving everything means that a misunderstood instruction, a confusing error
message or a bad assumption turns straight into an action on your machine, with
nobody checking.

Most of the time nothing goes wrong. The problem is that the time something does go
wrong, you weren't asked.

A better rule of thumb:

- **Reads** (looking at files, searching the repo): fine to allow for a session.
- **Edits**: worth a glance, and easy to review in your git diff afterwards.
- **Commands and anything external** (installing packages, pushing, deleting,
  calling APIs): ask every time.

## Use plan mode when you're not sure

If you're about to hand over a large or vague task, start in plan mode. The agent
researches and proposes what it would change, and changes nothing. You read the
plan, fix the misunderstanding before it costs you anything, then let it run.

That is often faster overall than approving a run and untangling the result.

## Make the prompt impossible to miss

The real fix for babysitting is not fewer prompts. It is prompts you can't miss
and can answer without switching windows.

This is the main thing Minnie does for Claude Code. When the agent wants to act,
she surfaces the request in a speech cloud on your desktop and says it out loud:
*"I want to edit `mock_users.py`. Ok?"* You can answer:

- **Allow once**, for just the next action
- **For this session**, to auto-approve safe reads for a while
- **Deny**, and she steps back, with no half-finished edits

Because the question follows you instead of waiting in the terminal, you stop
being tempted to approve everything up front. The safe default stays the easy
default.

## Saying no should feel normal

This one is about design, not settings. If refusing a tool feels like breaking
something, people stop refusing. So in Minnie a denial is an ordinary answer. She
takes it as a course correction and moves on.

The out-loud consent flow currently works with Claude Code. Gemini CLI, Codex and
custom agents also run with Minnie, but more autonomously, because their
permission models aren't wired into the speech cloud yet.

## A short checklist

- Keep the default: the agent asks before it acts.
- Allow reads for a session, ask for everything else.
- Use plan mode for big or fuzzy tasks.
- Put approvals somewhere you will actually see them.
- Review your git diff before you commit.

Minnie is free and in open beta for Apple Silicon Macs.

[Download the beta →](/download/)
