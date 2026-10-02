---
title: "MCP servers, explained for people who just want it to work"
description: "What Model Context Protocol is, why it lets your coding agent reach GitHub, Notion, Slack and your database, and how to connect tools without the config files."
pubDate: 2026-10-02
tags: ["mcp", "claude code", "integrations"]
draft: false
---

A coding agent that can only see your repository is useful. One that can also check
your open pull requests, read the spec in Notion and look at the actual rows in your
database is a lot more useful. Model Context Protocol, usually shortened to MCP, is
the standard that makes that possible.

## What MCP is, in one paragraph

MCP is an open protocol for connecting AI agents to outside tools and data. A
*server* wraps a service, such as GitHub, Slack or Postgres, and describes what it
can do: "list pull requests", "search messages", "run a read-only query". An agent
that speaks MCP can discover those abilities and call them when a task needs them.
You connect a tool once, and every MCP-aware agent can use it.

## Why it matters for everyday work

Without MCP, every integration is a one-off: a plugin for this editor, an extension
for that assistant. With it, the same GitHub server works whichever agent you use
this month.

In practice that means you can ask for things that cross tools:

- "Any pull requests waiting on my review?"
- "Pull the acceptance criteria from the Notion spec and check the tests cover them."
- "Post the green build in the deploy channel."
- "How many users signed up yesterday? Read-only, please."

## The catch: setup

The usual way to add an MCP server is to edit a JSON config file, find the right
command or package, set environment variables and paste in a token. It's not hard,
but it's fiddly, and a token pasted into a plain-text file is not ideal.

## Connecting tools in Minnie

Minnie ships a one-click MCP catalog so you can skip most of that:

- **GitHub, Notion, Slack, Postgres, Figma** and more from the catalog
- **Sign in with Google** for Gmail, Calendar and Chat, with no keys to copy
- **Custom MCP servers** for your own scripts or private tools

Tokens and API keys are stored in your **macOS Keychain**, encrypted by the
operating system, not in a plain-text config file.

## Connecting a tool is not the same as trusting it

An agent that can post to Slack or write to a database can do real damage if it
misunderstands you. So connecting a tool doesn't pre-approve it. When the agent
wants to use one, Minnie still asks first, out loud, and you decide.

That out-loud consent flow currently works with Claude Code. Other agents can use
Minnie's connections too, but they run more autonomously.

## Good first connections

If you're new to MCP, start with tools where most actions are reads:

1. **GitHub**: pull requests, issues and code search
2. **Notion**: specs and docs the agent can quote back to you
3. **A database in read-only mode**: answers instead of guesses

Add tools that write things (posting messages, sending email, migrations) once
you're comfortable with how the agent asks.

[Download Minnie, free →](/download/)
