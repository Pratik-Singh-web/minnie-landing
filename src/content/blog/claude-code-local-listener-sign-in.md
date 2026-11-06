---
title: "Claude Code \"Couldn't start the local listener\" sign-in error, fixed"
description: "Claude Code login fails with Couldn't start the local listener that receives the browser sign-in, or Is port 0 in use? The fixes, including the Mac ones."
pubDate: 2026-11-12
tags: ["claude code", "macos", "errors"]
hero:
  motif: terminal
  lines: ["$ claude auth login", "Couldn't start the local listener", "that receives the browser sign-in"]
  pose: stand
---

You run `/login` or `claude auth login`, and before a browser even opens:

```text
Couldn't start the local listener that receives the browser sign-in. Try again.
```

On versions before 2.1.305 the same problem reads:

```text
Failed to start OAuth callback server: Failed to start server. Is port 0 in use?
```

**Quick fix:** run the command again, in a normal terminal window. If it
still fails, sign in with a token instead (fix 3 below).

Here's what the error means and every fix, checked against [Anthropic's
errors page](https://code.claude.com/docs/en/errors.md) and the GitHub
issues where Mac users solved it, in November 2026.

## What the listener is

When you sign in, Claude Code opens your browser and, at the same time,
starts a tiny server on your own Mac at `127.0.0.1`. After you approve in
the browser, the browser hands the result back to that server. That's how
the terminal knows you've signed in.

The error means Claude Code **couldn't open that port on 127.0.0.1**.
Despite the old wording, "port 0" doesn't mean a specific port is busy. It
means "any free port", and it failed to get one at all.

## A softer version of the same problem

Recent versions often get around it on their own and show this instead:

```text
The browser can't return the sign-in to Claude Code automatically. After
you sign in, paste the code shown.
```

That's not an error. Open the link it gives you, sign in, and the page
shows a code. Paste it at the `Paste code here >` prompt and you're done.
Press `c` to copy the link if it didn't open by itself.

## Fixes, in order

### 1. Run it again, in a real terminal

The docs' first fix is simply to retry. One cause they name: piping input
into `claude auth login`, for example from a script. Then it can't show you
the paste prompt either, so run it by hand in Terminal.

### 2. Update Claude Code

The paste-a-code fallback arrived in 2.1.305. Before that, a failed
listener was a dead end. If you still see "Is port 0 in use?", you're on
an older version:

```bash
claude update
```

If `claude update` itself fails, [zsh: command not found: claude on
Mac](/blog/claude-command-not-found-mac/) covers untangling installs.

### 3. Skip the browser: use a token

Anthropic documents two ways to sign in without the listener:

- On a machine where login works, run `claude setup-token`. It prints a
  long-lived token. On this Mac, set it before starting Claude Code:

  ```bash
  export CLAUDE_CODE_OAUTH_TOKEN="paste-the-token-here"
  ```

- Or, if you pay through the Anthropic Console, set `ANTHROPIC_API_KEY` to
  a key from there. That bills the API rather than your Claude plan, so
  only do this if that's what you want.

Treat either one like a password: don't paste it into a file you share.

### 4. Running inside a sandbox? Allow local ports

If Claude Code runs inside a sandbox, a container or a locked-down
company setup, the docs say to check that the sandbox's policy allows
listening on local ports. Without it, the listener can never start.

## Mac fixes from GitHub

These come from user reports on GitHub, not Anthropic's docs, but they
fixed the error for the people who had it.

### Your /etc/hosts file is broken

In [issue #11469](https://github.com/anthropics/claude-code/issues/11469)
on macOS, the cause was a missing `localhost` line in `/etc/hosts`. Check
it:

```bash
grep localhost /etc/hosts
```

You should see `127.0.0.1	localhost` among the results. If it's missing,
add it back:

```bash
echo "127.0.0.1	localhost" | sudo tee -a /etc/hosts
```

Two other reports had the same file damaged in different ways: one with
Windows-style line endings in it, and in [issue
#27408](https://github.com/anthropics/claude-code/issues/27408), the wrong
permissions. It should be readable by everyone:

```bash
ls -l /etc/hosts
sudo chmod 644 /etc/hosts
```

The `ls` should show `-rw-r--r--`. Editing `/etc/hosts` is often done by
VPNs, ad blockers and development tools, which is how it gets broken.

### Your loopback address is missing

In [issue #67715](https://github.com/anthropics/claude-code/issues/67715),
one commenter found the Mac's loopback interface didn't have 127.0.0.1 at
all. Check with:

```bash
ifconfig lo0 | grep "inet 127.0.0.1"
```

If that prints nothing, something (often VPN or network software) has
changed your network setup. Restarting the Mac usually restores it. If it
doesn't, remove or update the network tool you installed most recently.

## Still stuck?

Run `/feedback` inside Claude Code, which is what Anthropic's docs suggest
once the steps above fail. Meanwhile, the token route in fix 3 gets you
working today.

If signing in works but Claude Code keeps asking for your Mac password,
that's a different problem: see [Claude Code and the Mac
keychain](/blog/claude-code-keychain-mac/).

[Minnie](/download/), our desktop pet, runs Claude Code for you once
you're signed in, and lets you talk to it out loud instead of typing.
