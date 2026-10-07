---
title: "Why Minnie is free: bring your own AI agent"
description: "Most AI tools charge for the model on top of the app. Minnie drives the coding agent you already pay for, so the app is free and there's no second AI bill."
pubDate: 2026-10-02
updatedDate: 2026-10-07
tags: ["pricing", "ai agent", "macos"]
draft: false
---

A lot of AI apps have the same pricing shape: a subscription for the app, with the
model usage built in, often on top of the AI subscription you already have. If you
use three of them, you're paying for AI three times.

Minnie is built the other way round. She's free, and she has no AI bill of her own.

## The three pricing shapes in AI tooling

It is worth naming them, because once you can see the shape you can predict how a
tool will behave.

**Resold tokens.** The app has its own model access and bills you for usage, with a
margin. Convenient — one signup, nothing to install — and it means your code passes
through the vendor's backend as well as the model provider's. Also: the vendor's
revenue goes up when you use more tokens.

**Bundled subscription.** A flat monthly fee with usage "included", up to limits
that are rarely stated plainly. The margin is in the gap between what the average
user consumes and what the heavy user does, which is why the limits get vaguer as
the model gets more expensive.

**Bring your own agent (or key).** The app has no model. It drives the one you
already have, and that one keeps its own login and its own billing. The app has to
justify its price on what it actually adds, because it cannot hide a margin in your
usage.

Minnie is the third, and it is free on top of that.

## Bring your own agent

Minnie doesn't ship a language model and doesn't resell one. She drives the coding
agent already on your Mac, such as Claude Code, Gemini CLI, Codex or a custom
command-line agent.

That agent keeps:

- **Its own login.** You sign in to it once, the way you already do.
- **Its own billing.** Whatever plan you have with its provider covers the work.
- **Its own reasoning.** Minnie passes your request along; the agent does the thinking.

So the cost of using Minnie is the cost of the agent you were already using. Nothing
on top.

## The arithmetic

Say you pay for Claude Pro because you use Claude Code. Reasonable.

Now add a desktop tool that resells tokens. You are paying Anthropic for the agent
you use in the terminal, and paying someone else for the model *they* call on your
behalf when you use their app. Same work, two bills, and the second one scales with
how much you use the thing.

Add a second such tool and it is three. This is not hypothetical — it is the normal
state of a developer's toolchain in 2026, and it is why "how much are you spending on
AI?" has become a question people cannot answer.

The BYO model collapses that back to one bill: the agent's. Whether that bill is
Anthropic's, Google's or OpenAI's is your decision, and you can change it without
changing anything else — see [Claude Code vs Gemini CLI vs
Codex](/blog/claude-code-vs-gemini-cli-vs-codex/).

## What's free

Everything she does today, permanently:

- The pet, her states and her reactions
- Voice, including the wake word, running on device by default
- Real tasks on your Mac through your agent
- Out-loud consent before actions (with Claude Code)
- Your tools connected over MCP
- No trial, no subscription, no card

Minnie asks you to sign in with Google. That is the only thing she asks for — it is
free, nothing is charged now or later, and it is what lets your setup follow you to a
new Mac or a reinstall.

## "Free" is a claim, so here is the business model

A free tool with no stated way of making money is a tool that is going to surprise
you later. So, plainly:

**Characters.** Extra characters — each with their own look, moves and voice — will
be optional one-time purchases. Not a subscription. Everything listed above stays
free.

That is the whole plan. It is deliberately a model that scales with how many people
like the thing, not with how much they use it, because those two create very
different incentives for whoever is building it.

We're not putting a price on characters until one exists. A price for something that
hasn't shipped is just a guess.

**What we are committing to:** nothing that is free today starts costing money. Not
the voice, not the consent flow, not the MCP connections, not the pet herself. If
that commitment is ever broken, it will have been broken — there is no reading of it
where a "Minnie Pro" tier for existing features is consistent with this paragraph.

## Why build it this way?

Three reasons.

**You already chose your agent.** If you've settled on Claude Code or Gemini CLI,
you've also settled your skills, your config and your workflow. A companion that
replaced the agent would throw that away.

**No incentive to burn tokens.** An app that bills for AI usage does better when you
use more of it. That shapes the product in small ways that are hard to see from
outside: padded context, chattier defaults, a nudge toward the more expensive model,
a reluctance to add the feature that would reduce how often you need to ask. Minnie
doesn't make anything from your usage, so none of those pressures exist.

**Privacy is simpler.** With no model and no cloud of her own, there's no new place
for your code to go. Your agent talks to its provider, the same as it does in a
terminal. More on that in [What a local-first AI coding assistant keeps on your Mac](/blog/local-ai-coding-assistant-privacy/).

## The honest downsides of BYO

It would be a strange post that listed only the advantages.

**Setup is on you.** You have to install an agent CLI and log in before anything
works. A tool that resells tokens hands you a working product in one click. Ours
asks you to do a ten-minute thing first — [Install Claude Code on a Mac, start to
finish](/blog/install-claude-code-on-mac/).

**We don't control the thing underneath.** When an agent changes its permission
protocol or its output format, we follow. A vendor that owns the whole stack does not
have that problem.

**Not everything works everywhere.** The out-loud consent flow is built on Claude
Code's permission protocol, so it is Claude Code only today. Other agents run, with
more autonomy.

We think the trade is clearly right, and it is a trade.

## What you need

- An Apple Silicon Mac (M1 or later) on macOS 14 Sonoma or newer
- An agent CLI installed and logged in. Not sure which? See
  [Claude Code, Gemini CLI or Codex](/blog/claude-code-gemini-cli-codex-on-your-desktop/).

[Download Minnie, free →](/download/)
