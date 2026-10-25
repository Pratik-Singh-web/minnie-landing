---
title: "Claude Code /buddy is gone. These pets replaced it"
description: "Anthropic's /buddy terminal pet lasted a week in April 2026. What happened, whether you can get it back, and the desktop pets that react to Claude Code."
pubDate: 2026-10-13
tags: ["claude code", "desktop pet", "comparison"]
draft: false
hero:
  motif: "desktop"
  lines: ["Claude Code"]
  bubble: "Still working…"
  pose: "sit"
---

For about a week in April 2026, Claude Code had a pet. You typed `/buddy`, an
egg hatched next to your prompt, and a small ASCII creature moved in. It had a
name, a species, a stat card, and opinions, which it gave in speech bubbles
while you worked.

Then it disappeared. If you're here because `/buddy` now answers with "Unknown
skill", this is what happened, why patching it back in is a bad idea, and what
people use instead.

## What /buddy was

Buddy was Anthropic's April Fools feature for 2026. It arrived with Claude
Code v2.1.89 at the start of April. It was a creature about five lines tall
that sat beside your input and reacted to your conversation with Claude.

Write-ups at the time, many of them based on Claude Code's source code, which
had leaked shortly before launch, described how it worked:

- Your buddy was generated from your account ID, so the same account always got
  the same creature. You couldn't pick it or trade it.
- There were 18 species, rarity tiers, shiny variants, hats, and a stat card
  with attributes like CHAOS and SNARK.
- `/buddy pet` made hearts float up. `/buddy off` hid it.

People got attached quickly. Users named theirs, and within days at least one
was asking Anthropic for programmatic access to what their companion said.

## What happened to it

It was removed around 9 April, in the release after the joke had run its
course. Change trackers put the removal at v2.1.97. When a GitHub issue asked
for more access to the companion, the reply that closed it read: "It was a
small April Fools feature and has been removed in the latest release."

By v2.1.105, typing `/buddy` returned `Unknown skill: buddy`. A later issue
titled "/buddy command removed — was told pet would persist" was closed too.
Anthropic hasn't announced plans to bring it back, so for practical purposes
it's gone.

## Can you get it back?

There are community projects that try. Some re-implement buddy as a plugin or
an MCP server. Others patch the Claude Code binary to turn the old code back
on or change the seed that picks your creature.

We'd skip the patching ones. Claude Code is the program you've given access to
your repositories, your shell and often your credentials. Running a modified
copy of it to get a pet back is a poor trade. The patch also breaks with every
update, so you either stop updating your coding agent or keep re-patching it.

A re-implementation that runs *alongside* an unmodified Claude Code, through
hooks or MCP, is a different matter. That's how every pet below works.

## What buddy got right, and what it couldn't do

Buddy was a joke, but it showed something real: people like having a presence
in the tool they spend all day in. A creature that reacts makes a long agent
run feel less like waiting on a progress bar.

Its limit was where it lived. Buddy sat inside the terminal, the one window you
stop looking at as soon as you hand Claude a long task. It reacted to the
conversation, but it couldn't reach you when Claude needed you, which is when a
companion would be most useful.

The pets below all live on your desktop instead, above your other windows, and
take their cues from Claude Code's hooks.

## The pets that react to Claude Code now

| Pet | Runs on | How you install it | What it does |
| :- | :- | :- | :- |
| **Tamamon** | macOS 15+ (Apple Silicon), Windows | App download | Hatches and evolves as you use Claude; waves when a session waits for you |
| **Claudlet** | Best on KDE Plasma; also macOS, Windows | `pipx install claudlet` | Pixel creature that acts out what the agent is doing |
| **OpenPets** | macOS, Windows, Linux | App download + one CLI command | Tray app; pets react to agent events and speak short lines |
| **Clawd on Desk** | Windows installer; others from source | WinGet, or `npm start` | Pixel pet for many agents; shows approval requests as a bubble |
| **tokiepet** | macOS 11+ | `pip install tokiepet` | Walks on your windows and grows as it eats your tokens |
| **Minnie** | macOS 14+ (Apple Silicon) | App download | Talks: runs Claude Code by voice and asks out loud before it acts |

### Tamamon: the closest to buddy

If what you miss is the creature (hatching, growing, collecting), Tamamon is
the nearest thing. It's free, and it starts as an egg that grows through baby,
adult and evolved forms as you use Claude. There are about fifty species to
discover. It reads only your Claude usage totals through your existing login,
not your code or conversations, and it has no account and no server of its
own. When a session is waiting on you, it waves.

It needs macOS 15 or later on Apple Silicon.

### Claudlet: the most expressive

Claudlet is a small pixel creature that reacts to Claude Code and Codex in real
time. It types when the agent edits, reads when it reads, shows MCP calls,
thinks, waits visibly on permission prompts, and shows when a task finishes
or fails. In auto or bypass mode it wears a visor, which is a
nice touch. Up to three subagents get their own companions.

It's open source (MIT), installed with `pipx install claudlet` followed by
`claudlet-install`, which registers its hooks. Be aware that it's built
KDE-first. On a Mac, messaging is notes-only, and the maintainer says they
don't have a Mac to test on. To remove it, run `claudlet-uninstall` *before*
`pipx uninstall`, so its hook entries come out of your settings file first.

### OpenPets: the widest integration

OpenPets is an open-source tray app with a large cast of pets. It connects to
agents in two ways: an MCP server that lets the agent check the pet's status,
make it react or have it say something, and a separate package that manages Claude Code hooks.
Setup is a one-liner from the app's Integrations screen or the CLI. If you set
it up per project, check `.claude/settings.local.json` before committing.
Builds may be unsigned, so expect a security warning on first open.

### Clawd on Desk: for people who switch agents a lot

Clawd on Desk is an Electron pixel pet that works with a long list of agents:
Claude Code, Codex CLI, Cursor Agent, Copilot CLI, Gemini CLI and more. It
picks up activity from hooks or by watching logs. With some agents it shows a
permission request as an approval bubble on your desktop. With others it shows
state only and leaves approval to the terminal. Windows gets an installer.
Elsewhere, the README's route is to run it from source.

### tokiepet: the smallest

tokiepet is a Python pixel pet that walks along the tops of your windows, falls
when you move one out from under it, and gets fatter as it eats your Claude
Code tokens. It reads those from the session logs Claude Code keeps in
`~/.claude/projects/`. It's a hobby project, MIT-licensed, and still at its
first release.

### Minnie: the one that talks

Minnie is ours, so take this section with that in mind.

The pets above *show* you what Claude Code is doing. Minnie runs it. You say
her name and tell her what you want, she hands the request to the Claude Code
you already have installed and logged in, and you can tell from her pose
whether it's listening, thinking or working.

The part buddy could never do is permission. When Claude Code wants to edit a
file, run a command or push a branch, Minnie walks over and asks out loud, and
you answer yes or no. The prompt reaches you wherever you're looking instead of
waiting in a terminal tab. Speech is recognised on your Mac, she doesn't resell
AI (Claude Code does the thinking on your own plan), and the app is free. She
also drives Gemini CLI, Codex and other agents, though the out-loud consent
flow is Claude Code only for now.

## Which one?

- **You miss buddy itself: the creature, the collecting** → Tamamon.
- **You want to see exactly what the agent is doing, and you're on Linux** →
  Claudlet.
- **You use several agents and want one pet across all of them** → OpenPets or
  Clawd on Desk.
- **You want something tiny and hackable** → tokiepet.
- **You want to talk to Claude Code and be asked before it acts** →
  [Minnie](/download/).

There's nothing stopping you running two. A pet that shows state and one that
handles prompts don't step on each other.

## Before you install any of them

Every pet here works by adding hooks to `~/.claude/settings.json` or by reading
files in `~/.claude/`. That's the right design, because it leaves Claude Code
itself untouched, but it means the installer edits your agent's config. Open
that file before and after so you know what was added.

Most of these are made by one or two people, and several aren't signed with an
Apple Developer ID, so macOS will warn you on first open. [What "Apple could
not verify" means](/blog/open-unsigned-mac-app-apple-could-not-verify/) explains
what that warning does and doesn't tell you.

If you want the wider tour of desktop pets, including the ones that don't
touch your agent at all, see [Desktop pets for Mac: Shimeji, Bongo Cat and
co](/blog/desktop-pets-for-mac/). The classics each have their own guide:
[Shimeji on Mac in 2026](/blog/shimeji-mac/), [Bongo Cat on
Mac](/blog/bongo-cat-mac/) and [Desktop Goose on Mac](/blog/desktop-goose-mac/).
