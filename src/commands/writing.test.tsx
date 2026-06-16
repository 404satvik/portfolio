import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { commands, findCommand } from "./index";
import { writing } from "./writing";
import { read } from "./read";
import { posts } from "../content/posts";
import type { CommandContext } from "../lib/types";

function makeContext(overrides: Partial<CommandContext> = {}): CommandContext {
  return { run: vi.fn(), clear: vi.fn(), commands, ...overrides };
}

describe("writing command", () => {
  it("is registered", () => {
    expect(findCommand("writing")).toBe(writing);
  });

  it("lists every post title", () => {
    const { container } = render(<>{writing.run([], makeContext())}</>);
    for (const post of posts) {
      expect(container).toHaveTextContent(post.title);
    }
  });

  it("opens a post via read when its title is clicked", async () => {
    const run = vi.fn();
    const user = userEvent.setup();
    render(<>{writing.run([], makeContext({ run }))}</>);
    await user.click(screen.getByRole("button", { name: new RegExp(posts[0].title, "i") }));
    expect(run).toHaveBeenCalledWith(`read ${posts[0].slug}`);
  });
});

describe("read command", () => {
  it("is registered", () => {
    expect(findCommand("read")).toBe(read);
  });

  it("renders the post for a valid slug", () => {
    const post = posts[0];
    const { container } = render(<>{read.run([post.slug], makeContext())}</>);
    expect(container).toHaveTextContent(post.title);
  });

  it("reports an unknown slug", () => {
    const { container } = render(<>{read.run(["nope"], makeContext())}</>);
    expect(container).toHaveTextContent(/no post named/i);
  });
});
