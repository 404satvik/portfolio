# satvik.os

My personal portfolio, built as a tiny fake operating system. It has two ways in:

- **standard** — a clean, scrollable page for anyone who just wants to read.
- **terminal** — an interactive shell you can type commands into (or click).

Both views render from the same content files, so everything is written once.

## Features

- Interactive terminal: command history, tab-completion, "did you mean?" for
  typos, and a hidden `neofetch`.
- Standard page: projects, current learning, skills, a writing/dev-log, and
  contact links.
- A markdown-powered dev-log — new posts are just `.md` files.
- Amber-on-dark theme, fully responsive, respects reduced-motion.

## Tech

React · TypeScript · Vite · Tailwind CSS · Vitest

## Run locally

```bash
npm install
npm run dev      # start the dev server
npm test         # run the test suite
npm run build    # type-check and build for production
```

## Editing content

All content lives in `src/content/`:

- `profile.ts` — name, bio, resume link
- `projects.ts`, `learning.ts`, `skills.ts`, `connect.ts`
- `posts/*.md` — dev-log entries (frontmatter `title` + `date`, then markdown)

To add a post, drop a new file in `src/content/posts/`:

```markdown
---
title: my new post
date: 2026-07-01
---

your markdown here.
```

It shows up automatically, newest first.
