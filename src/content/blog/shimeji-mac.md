---
title: "Shimeji on Mac in 2026: what still works"
description: "The Mac app most people used for Shimeji was discontinued this year. The options that still run on Apple Silicon, how to import a shimeji, and what to skip."
pubDate: 2026-10-13
tags: ["desktop pet", "macos", "install"]
draft: false
---

Shimeji are the little characters that climb your window edges, sit on top of
your browser, fall off the screen, and, if you let them, multiply until your
desktop is a crowd. Thousands have been made by fans, most of them of anime
characters, and nearly all of them are made for *Shimeji-ee*, a Windows Java
app.

On a Mac, Shimeji has always needed a workaround. In 2026 the most popular one
stopped being maintained. Here's what still works and how to set it up.

## The short answer

- **Apple Silicon Mac:** Shijima-Qt v0.1.0. It was discontinued in 2026, but the last build still downloads and is still the simplest way to run
  shimeji on a Mac.
- **Intel Mac, or you want something closer to the original:** the
  ShimejiEE cross-platform fork. It runs on Java, is rougher around the edges,
  and was last released in 2022.
- **You just want to check whether a shimeji works:** Shijima-Web, in a
  browser tab.

None of these is actively developed today. That's the honest state of Shimeji
on the Mac.

## Why it's awkward on a Mac

Shimeji-ee is written in Java, which runs anywhere. The parts that make
Shimeji fun don't: finding where your windows are, walking along their top
edges, and grabbing a window and throwing it. Those use Windows-specific APIs.

A Mac port has to find windows through macOS's Accessibility system instead,
which is why every option below asks for Accessibility permission. Some
behaviour, window-throwing especially, is often missing or limited on the Mac.
Expect shimeji that walk, climb, sit and fall well, and throw things less.

## Option 1: Shijima-Qt (Apple Silicon)

Shijima is a shimeji runner by pixelomer that aims to be compatible with
Shimeji-ee. Shijima-Qt is the desktop version, for macOS, Windows and Linux.
It's free and open source (GPLv3).

**About the discontinuation:** earlier in 2026 its developer archived the
project. They wrote that v0.1.0 had been the recommended stable build for over
a year, that it was missing fixes made since, and that Qt had turned out to be
the wrong framework. They said they might write a new desktop version later.
For now there's no newer desktop build coming, and a future macOS could break
this one. Today it runs.

Setting it up:

1. **Download** `release-macos-arm64.zip` from the v0.1.0 release on the
   project's GitHub, or from getshijima.app. There's an arm64 build only, so
   no Intel Macs. A v0.2.0 alpha exists too, but it's a pre-release from July
   2025. Stick with 0.1.0 unless you have a reason not to.
2. **Unzip it and move the app to Applications.**
3. **Open it, and get past Gatekeeper.** It isn't notarised, so macOS will
   block the first open. Go to System Settings → Privacy & Security and click
   **Open Anyway**. If macOS instead says the app is "damaged", that's the
   quarantine flag on a download. For an app you trust, you can clear it in
   Terminal with `xattr -dr com.apple.quarantine` followed by the path to the
   app. [What "Apple could not verify" means](/blog/open-unsigned-mac-app-apple-could-not-verify/)
   explains when that's reasonable and when it isn't.
4. **Grant Accessibility.** Shijima-Qt needs it to see the frontmost window,
   which is what lets shimeji walk on it. Turn it on in System Settings →
   Privacy & Security → Accessibility.
5. **Import a shimeji.** Shijima ships with no characters. Choose a `.zip`,
   `.rar` or `.7z` archive and it finds the image set inside, with no need to
   extract it first or restart the app.

If an import fails with "Could not import any shimejis from this archive",
two things usually fix it. If the shimeji came as a folder, compress it into a
zip first. Otherwise, try the archive in Shijima-Web (below). If it fails
there too, the archive itself is the problem, not the Mac.

## Option 2: ShimejiEE cross-platform (Java)

This is LavenderSnek's fork of Kilkakon's Shimeji-ee, merged with an older Mac
port called shimeji4mac. It's the closest you'll get to the original
Shimeji-ee on a Mac.

The latest release is v2.1.0, from October 2022. It comes in two downloads:

- **`ShimejiEE-mac-jre.zip`** bundles its own Java runtime, so you don't need
  Java installed. Start this one.
- **`ShimejiEE-no-jre.zip`** expects Java 17 on your machine.

Unzip, open `ShimejiEE-launcher`, get past Gatekeeper as above, and grant
Accessibility if it asks. To add characters, the Shimeji-ee convention
applies: each shimeji is a folder of images (`shime1.png`, `shime2.png` and so
on), placed inside the `img` folder.

**On Apple Silicon,** check what you're running. Select the launcher in
Finder, press ⌘I, and look at **Kind**. If it says "Application (Intel)", it's
running through Rosetta, Apple's Intel translator. That works today, but macOS
27 is the last release with general Rosetta support. If you have a native
Apple Silicon build of Java 17 installed, the `no-jre` download may run
without Rosetta. If it won't start, go back to the bundled one.

## Option 3: Shijima-Web (for testing)

Shijima-Web runs shimeji in a browser tab, so they stay inside the page and
don't touch your real windows. As a desktop pet, it's a curiosity. Its real
use is a quick check that an archive works before you blame your Mac. The
Shijima developer points people there when imports fail.

## Getting shimeji safely

Shimeji are fan art. Most are shared by their artists on DeviantArt and
itch.io, and it's worth getting them from the artist rather than a re-upload.
You'll get the current version, and they get the credit.

One safety rule: **a shimeji is only images and a couple of config files.**
Many archives were packaged for Windows and include a full copy of Shimeji-ee
with an `.exe`. On a Mac you never need to run anything from a shimeji
download, only import it. An archive that insists you run an installer isn't a
shimeji.

## Keeping them under control

Shimeji are designed to multiply. That's charming for about ten minutes, and
then it's your fan noise. A few habits help:

- Turn off multiplying or breeding if your build has the option, or use
  "reduce to one" when it gets out of hand.
- Run one or two characters, not a whole cast. Each one is a separate animated
  window.
- If you present or screen-share often, quit before the call. Shimeji don't
  know you're presenting.

## If you want a Mac pet that's maintained

Shimeji on the Mac now depends on hobby projects that have stopped. If you
want something that will keep working through the next few macOS releases,
look for apps with native Apple Silicon builds and recent releases:

- **Bongo Cat**, the cat that slaps the desk as you type: the open-source app
  has a native Apple Silicon download and was updated as recently as October
  2026.
- If you code with an AI agent, there's a whole new group of desktop pets
  that react to it. [Claude Code /buddy is gone. These pets replaced
  it](/blog/claude-code-buddy-pets/) covers them, including
  [Minnie](/download/), our own: a Mac desktop pet that runs your coding agent
  and asks out loud before it does anything risky.

For the wider tour, including Desktop Goose and its Rosetta problem, see
[Desktop pets for Mac: Shimeji, Bongo Cat and co](/blog/desktop-pets-for-mac/)
and [Desktop Goose on Mac: does it still work in
2026?](/blog/desktop-goose-mac/)
