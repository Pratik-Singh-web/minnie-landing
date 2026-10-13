---
title: "Bongo Cat on Mac: Steam vs the free open-source app"
description: "There are two Bongo Cats, and both now run on a Mac. Which one to install, the permission macOS asks for, and why you should care what reads your keystrokes."
pubDate: 2026-10-14
tags: ["desktop pet", "macos", "install"]
draft: false
---

Bongo Cat is the cat that slaps the desk every time you press a key. It
started as a 2018 meme, and the meme became an app, and then it became two
apps. Search "Bongo Cat Mac" and you'll find both of them mixed together, with
a lot of advice that was written before either one ran properly on macOS.

Both of them run on a Mac now. They're very different things, though, and
which one you want depends on whether you want a game or a metronome.

## The short answer

- **You want the cat and nothing else:** the open-source **BongoCat** app. It's
  free, it's native on Apple Silicon and on Intel, it works offline, and it
  collects nothing. It's also very actively maintained. Version 2.3.1 came
  out on 13 October 2026.
- **You want hats, drops and a cat your friends can see:** **Bongo Cat on
  Steam**. It's free to play and it's a game, with points, item drops and a
  shop. Mac support arrived in March 2026.

If you aren't sure, start with the open-source one. It's a smaller download,
it has no account and no store, and you can always add the Steam one later.

## Option 1: BongoCat, the open-source app

This is ayangweb's BongoCat on GitHub. It's Apache-2.0 licensed and has
around 24,000 stars, which makes it the most popular open-source desktop pet
by a distance. It runs on macOS and Windows.

What it does:

- The cat reacts to **keys, mouse buttons and gamepad buttons**, with a
  matching motion for each one, not a generic slap.
- You can **swap in your own Live2D models**. The project keeps a companion
  list, Awesome-BongoCat, where people share them.
- It **works offline and collects no data.** For an app whose whole job is to
  watch your keyboard, that matters more than it sounds. More on that below.

Setting it up:

1. **Download the right DMG** from the project's GitHub Releases page. There
   are two macOS builds. `aarch64` is for Apple Silicon (any M-series Mac) and
   `x64` is for Intel. Not sure which you have? Apple menu → About This Mac. If
   it says "Chip: Apple M…", take `aarch64`.
2. **Drag it to Applications** and open it.
3. **If macOS refuses to open it,** go to System Settings → Privacy &
   Security and click **Open Anyway**. [What "Apple could not
   verify" means](/blog/open-unsigned-mac-app-apple-could-not-verify/) explains
   what that warning is actually telling you.
4. **Grant Input Monitoring.** This is the step most people miss. Without it,
   the cat appears and then just sits there. See the next section.

Because it ships native builds for both chips, there's no Rosetta involved.
That's worth checking for any desktop pet, because macOS 27 is the last
release with general Rosetta support, and several older pets depend on it.

## The permission that makes the cat move

An app can only react to keys you type in *other* apps if macOS lets it watch
the keyboard globally. On a Mac, that's the **Input Monitoring** permission:
System Settings → Privacy & Security → Input Monitoring. Turn it on for the
app, then quit and reopen the app. The change usually doesn't take effect
until a restart.

If the cat moves when you click but not when you type, Input Monitoring is
almost always the reason.

Don't grant this one casually. Input Monitoring is the same permission a
keylogger would need. That's why it's worth knowing what the app does with
what it sees, and it's the main argument for the open-source build. Its code
is public, it says it collects nothing, and it never needs a network
connection to work.

## Option 2: Bongo Cat on Steam

The Steam version is made by Irox Games and came out on 5 March 2025. It went
viral almost straight away. It's free to play, and it's built as a
**game**. Typing, clicking and playing earn you points, points earn item drops,
and the drops are hats for your cat. The rarity tiers run from Common to
Legendary, and the store page puts a Legendary at 1 in 500,000.

**On the Mac:** a March 2026 update added Mac support, labelled experimental at
the time. Co-op worked, and the developers asked Mac players to report bugs on
the Steam forums. The Steam store page now lists macOS 11 or later as the
minimum, on Intel or Apple Silicon, with about 700 MB of disk space. It
also lists a broadband connection, which is a real difference from the
open-source app.

Setting it up is the usual Steam route. Install Steam for Mac, add Bongo Cat
from the store, and install it. Then grant Input Monitoring the same way as
above, or the cat won't see your typing.

The Steam version also has paid supporter DLC packs. Nothing you need is
behind them, but it's a store, and the game is designed to bring you back to
it.

## Which one should you pick?

| | Open-source BongoCat | Bongo Cat on Steam |
|---|---|---|
| Price | Free | Free, with optional paid DLC |
| Apple Silicon | Native build | Supported |
| Intel Mac | Native build | Supported |
| Works offline | Yes | Lists a broadband connection |
| Account needed | No | Steam account |
| Collectibles | No | Hats, drops, rarity tiers |
| Custom characters | Live2D models | Unlockable cosmetics |
| Source code | Public | Closed |

The short version: **the open-source app is a desktop pet, and the Steam
one is a game that looks like one.** Both are good at what they are.

## Keeping it out of the way

A cat that slaps along with every key is great until you're sharing your
screen. A few habits help:

- **Quit before a call or a demo.** Neither app knows when you're presenting.
- **Put it on one side of the screen.** In the bottom corner it sits next to
  the Dock, out of the way of your windows.
- **Check the Kind field after updates.** Select the app in Finder, press ⌘I,
  and make sure it doesn't say "Application (Intel)" on an Apple Silicon Mac.
  If it does, you downloaded the wrong build.

## If you want a desktop pet that does something

Bongo Cat is a perfect metronome for your typing, and that's all it sets out
to be. If you spend your day typing *to* an AI coding agent, there's a newer
kind of desktop pet that reacts to what the agent is doing, not to your
keystrokes.

[Minnie](/download/) is ours. She sits on your Mac like any desktop pet, runs
Claude Code, Gemini CLI or Codex underneath, and lets you talk to the agent out
loud. She also asks before it does anything risky, so you can tell at a glance
whether it's working, finished or waiting on you. [A desktop pet for your
Mac that actually does work](/blog/desktop-pet-for-mac-that-does-work/)
explains the idea.

For the rest of the genre, see [Desktop pets for Mac: Shimeji, Bongo Cat and
co](/blog/desktop-pets-for-mac/), [Shimeji on Mac in 2026](/blog/shimeji-mac/)
and [Desktop Goose on Mac](/blog/desktop-goose-mac/).
