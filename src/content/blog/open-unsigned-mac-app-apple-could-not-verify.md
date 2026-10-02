---
title: "\"Apple could not verify\" this app: what it means on a Mac"
description: "Why macOS warns about apps that aren't signed with an Apple Developer ID, what the warning does and doesn't tell you, and how to open an app you trust."
pubDate: 2026-10-02
tags: ["macos", "gatekeeper", "install"]
draft: false
---

If you've downloaded an app from outside the Mac App Store, you've probably seen
this: macOS refuses to open it and says Apple could not verify that it is free of
malware. It sounds alarming. Usually it means something much narrower than it
sounds.

Minnie triggers this warning during the beta, so here is a plain explanation of
what is going on, and how to decide whether to open an app anyway.

## What the warning actually means

macOS has a feature called Gatekeeper. When you open a downloaded app, Gatekeeper
checks two things:

- **Is it signed** with a Developer ID, a certificate from Apple that ties the app
  to a known developer?
- **Is it notarized**, meaning the developer sent it to Apple for an automated
  malware scan?

If either is missing, you get the warning. It doesn't mean the app was scanned and
found to be dangerous. It means Apple has no record of it either way.

Every unsigned app gets the same message, whether it's malware or a hobby project.

## Why some apps aren't signed

A Developer ID costs $99 a year. Plenty of small, open-source and early-stage apps
don't have one yet. Minnie is one of them: she isn't signed during the beta, and
signing comes with version 1.

## How to decide whether to open it

The warning moves the decision to you, so make it deliberately:

- **Do you know where it came from?** Download only from the developer's own site
  or their official release page, never a mirror.
- **Is the developer reachable?** A real site, a support address, a public changelog.
- **Does the app explain what it does?** Especially if, like Minnie, it can run
  commands on your machine.

If any of those make you hesitate, don't open it. That's the warning doing its job.

## Opening an app you trust

There are two common ways.

**Through System Settings.** Try to open the app once so macOS blocks it. Then open
**System Settings → Privacy & Security**, scroll to the bottom and click **Open
Anyway** next to the app. You only need to do this once per app.

**By removing the quarantine flag.** Files you download are marked as quarantined,
and Finder copies that mark onto anything you drag out of a downloaded disk image.
Developers sometimes give a Terminal command that copies the app and removes the
mark, so the warning doesn't keep coming back. Only run commands like that for an
app you have already decided to trust, and only when they come from the
developer's own instructions.

Minnie's [download page](/download/) has the exact three-line command for her, plus
the System Settings route if macOS still blocks it.

## Then look in your menu bar

One more thing that confuses people after installing Minnie: she has no Dock icon,
on purpose. Look for the paw in your menu bar at the top of the screen and click it
to wake her.

## Will this go away?

Yes. Once Minnie is signed and notarized, macOS will open her like any other app.
Until then, the warning is a one-time step, not a sign that something is wrong.

[Download the beta →](/download/)
