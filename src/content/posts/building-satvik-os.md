---
title: building satvik.os
date: 2026-06-14
---

i didn't want a portfolio that looked like everyone else's, so i built this one
as a tiny fake operating system. there are two ways in: a standard page for
people who just want to read, and a terminal you can actually type commands into.

both views read from the same content files, so i only write things once. it's
built with react, typescript and tailwind, and the command logic is covered by
tests.

the fun part was the small stuff — a boot sequence, tab-completion, a
`did you mean` for typos, and a hidden `neofetch` command if you go looking.
