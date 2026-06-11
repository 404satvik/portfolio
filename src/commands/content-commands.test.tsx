import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { commands, findCommand } from "./index";
import { projects } from "./projects";
import { learning } from "./learning";
import { skills } from "./skills";
import { connect } from "./connect";
import { projects as projectData } from "../content/projects";
import { learning as learningData } from "../content/learning";
import { skillGroups } from "../content/skills";
import { connectLinks } from "../content/connect";
import type { CommandContext } from "../lib/types";

function makeContext(overrides: Partial<CommandContext> = {}): CommandContext {
  return { run: vi.fn(), clear: vi.fn(), commands, ...overrides };
}

describe("content commands registered", () => {
  it.each(["projects", "learning", "skills", "connect"])("registers %s", (name) => {
    expect(findCommand(name)).toBeDefined();
  });
});

describe("projects", () => {
  it("lists every project", () => {
    const { container } = render(<>{projects.run([], makeContext())}</>);
    for (const project of projectData) {
      expect(container).toHaveTextContent(project.name);
    }
  });
});

describe("learning", () => {
  it("shows every learning item", () => {
    const { container } = render(<>{learning.run([], makeContext())}</>);
    for (const item of learningData) {
      expect(container).toHaveTextContent(item);
    }
  });
});

describe("skills", () => {
  it("shows every group and its items", () => {
    const { container } = render(<>{skills.run([], makeContext())}</>);
    for (const group of skillGroups) {
      expect(container).toHaveTextContent(group.label);
      for (const item of group.items) {
        expect(container).toHaveTextContent(item);
      }
    }
  });
});

describe("connect", () => {
  it("renders a working link for each destination", () => {
    render(<>{connect.run([], makeContext())}</>);
    for (const link of connectLinks) {
      const anchor = screen.getByRole("link", { name: new RegExp(link.label, "i") });
      expect(anchor).toHaveAttribute("href", link.url);
    }
  });
});
