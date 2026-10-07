---
title: "Desktop pets for Mac: Shimeji, Bongo Cat and co"
description: "A guide to desktop pets on macOS — the classics, the modern open-source ones, and the new kind that are wired to something real on your machine."
pubDate: 2026-10-07
tags: ["desktop pet", "macos", "comparison"]
draft: false
---

A desktop pet is a small character that lives on top of your screen instead of
inside a window. It wanders, it reacts, it sits on your menu bar. The genre is
roughly thirty years old and has never quite died, which tells you something: a
lot of people like having something alive on their desktop, and nobody has ever
needed a business case for it.

On a Mac in 2026 there are three groups worth knowing about.

## The classics

**Shimeji** is the one most people mean. It began as a Japanese Windows toy in
2009 — a character that climbs your window edges, drags them around, and
multiplies if you let it — and it spawned thousands of fan-made skins. The
original is Java-based, which on a modern Mac is a nuisance.

**Shijima** is the fix. It is a Shimeji simulator with no Java dependency, and it
runs on macOS, Windows, Linux, iOS and Android. If you want the Shimeji
experience on an Apple Silicon Mac, this is the sane way to get it.

**Bongo Cat** is the other classic: the cat that slaps the desk in time with your
keystrokes. The widely used cross-platform build is open source, works offline,
and collects nothing. It is a metronome for your typing and it is very good at
being exactly that.

## The modern ones

**Paw-Paw** is macOS-native and reactive: your pet responds to keystrokes and
clicks in real time, types when you type, and dozes off when you stop. It is the
most "Mac-feeling" of the lot.

**DPET** is an engine rather than a single pet — summon several, let them roam,
run and climb, with the animations and assets included.

The common thread: these all react to *you*. Your keyboard, your cursor, your
idle time. That is the whole genre, and the reason desktop pets have always been
filed under "decoration".

## The new group: pets that react to your machine

Something changed in the last year, and it is a consequence of AI coding agents.

If you run Claude Code, Gemini CLI or Codex, you have a long-running process
doing real work in a terminal you are not looking at. That process has states —
reading, writing, running a command, waiting for your approval, finished — and
you have no ambient way to know which one it is in. You alt-tab to check. You
check again. You miss the moment it finished, or worse, the moment it asked you
something.

That is a status-display problem, and a desktop pet is a surprisingly good
status display. You do not read body language, you just notice it. A character
that sits still when the agent is thinking and gets up when it needs you carries
more information, faster, than a terminal you are not looking at.

**OpenPets** and **Claudlet** both work this way: a companion on your desktop
wired to a coding agent, usually over MCP or hooks, showing live agent state.
They are small, free, and worth ten minutes of your time if you are curious about
the idea.

## Minnie

Minnie is in this third group, and she is the one that talks.

The states are the same idea — sitting idle, listening, thinking while the agent
reasons, asleep while you focus — but the part we care most about is *asking*.
When Claude Code wants to edit a file, run a command or push a branch, it stops
and asks. That prompt is the best safety feature these tools have, and it is
useless sitting in a window behind your browser. So Minnie comes over and asks
out loud, and you answer by saying yes or no.

It works the other way too: say her name and tell her what you want, and she
hands the request to the agent CLI you already have. Speech is transcribed on
your Mac, not in a cloud, so nothing leaves the machine before you have agreed to
it. The longer version is in
[What a local-first AI coding assistant keeps on your Mac](/blog/local-ai-coding-assistant-privacy/).

The thing she does not do is resell AI. She drives the agent that is already
installed and already logged in on your Mac, and that agent does all the
reasoning — so there is no second bill. The app is free for life.

## Which should you install?

- **You want a cute thing on your desktop and nothing more** → Shijima for the
  Shimeji classic, Bongo Cat for the typing metronome, Paw-Paw for something that
  feels Mac-native.
- **You want several pets roaming at once** → DPET.
- **You run a coding agent and keep losing track of it** → OpenPets or Claudlet
  for state at a glance, or [Minnie](/download/) if you also want to talk to it
  and be asked out loud before it acts.

If you want the longer argument for why an agent should have a body at all, it is
here: [A desktop pet for your Mac that actually does
work](/blog/desktop-pet-for-mac-that-does-work/).

## A practical note on Mac installs

Most things in this genre are made by small teams or individuals, and an Apple
Developer ID costs money every year. That means a lot of them are unsigned, and
macOS will warn you on first open. The warning is about the absence of a
signature, not the presence of malware — but the distinction matters, and so does
knowing who you are trusting. We wrote up what the warning actually means in
["Apple could not verify" this app: what it means on a
Mac](/blog/open-unsigned-mac-app-apple-could-not-verify/).
