---
title: "Claude Code, Gemini CLI or Codex: one desktop pet for all"
description: "Minnie doesn't care which coding agent you use. Here's how she works with Claude Code, Gemini CLI, Codex, Antigravity and custom CLIs, and where they differ."
pubDate: 2026-10-02
tags: ["claude code", "gemini cli", "codex"]
draft: false
---

Most developers who use a coding agent have a favourite, and a lot of them switch
between two or three depending on the task. A desktop companion that only works
with one of them would be a strange thing to build.

So Minnie is agent-agnostic. She adds a face, a voice and a consent layer, and the
agent underneath does the reasoning. This post covers which agents work today and
what changes between them.

## How it works, whichever agent you pick

Minnie doesn't contain an AI model. She drives the agent CLI that is already
installed on your Mac:

1. You install the agent and log in once, so it works in your terminal.
2. Minnie runs it on your behalf when you talk to her.
3. The agent keeps its own login and its own billing.

Because of step 3, there is no second AI bill. Whatever you already pay your agent's
provider is the whole cost.

## Claude Code: the full experience

Claude Code is where everything works today:

- Voice requests and the wake word
- Her live states: listening, working, asking
- **Out-loud consent**: when Claude Code wants to edit a file or run a command,
  Minnie asks in a speech cloud and waits for your answer

That last one is the reason Claude Code is the recommended starting point. The
consent flow is wired into Claude Code's permission system specifically. More on
that in [Claude Code permission prompts, without the babysitting](/blog/claude-code-permission-prompts/).

## Gemini CLI and Codex: real tasks, more autonomy

Gemini CLI and Codex both work with Minnie. You can talk to her, and the agent does
real work in your project.

The difference is consent. Their permission models aren't connected to Minnie's
speech cloud yet, so they run more autonomously and she won't stop to ask before
each action the way she does with Claude Code. If you use them, set them up with
the approval behaviour you're comfortable with in the agent's own settings.

## Antigravity and custom CLIs

Antigravity is supported too, and so is any custom command-line agent: your own
wrapper script, an internal tool or something you're experimenting with. If it runs
as a command and takes a prompt, Minnie can drive it. Custom agents run in the same
autonomous mode as Gemini CLI and Codex.

## Your tools come with you

Tools you connect in Minnie over MCP, such as GitHub, Notion, Slack or a database,
aren't tied to one agent. Switch agents and your connections stay where they are.
See [MCP servers, explained](/blog/mcp-servers-for-coding-agents/) for how that
works.

## Which one should you start with?

- **Want her to ask before every action?** Claude Code.
- **Already living in Gemini CLI or Codex?** Use that. You get the voice and the
  pet, with more autonomy.
- **Building your own agent?** Point Minnie at its command.

You can change your mind later. Nothing about your setup is locked to one agent.

[Download Minnie, free →](/download/)
