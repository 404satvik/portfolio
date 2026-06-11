import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { commands, findCommand } from "./index";
import { whoami } from "./whoami";
import { help } from "./help";
import { clear } from "./clear";
import type { CommandContext } from "../lib/types";

function makeContext(overrides: Partial<CommandContext> = {}): CommandContext {
  return { run: vi.fn(), clear: vi.fn(), commands, ...overrides };
}

describe("findCommand", () => {
  it("finds a registered command by name", () => {
    expect(findCommand("whoami")).toBe(whoami);
  });

  it("returns undefined for an unknown command", () => {
    expect(findCommand("nope")).toBeUndefined();
  });
});

describe("whoami", () => {
  it("shows the name, age, and tagline", () => {
    const { container } = render(<>{whoami.run([], makeContext())}</>);
    expect(container).toHaveTextContent("satvik");
    expect(container).toHaveTextContent("19");
    expect(container).toHaveTextContent(/machine learning/i);
  });
});

describe("help", () => {
  it("lists every registered command name", () => {
    const { container } = render(<>{help.run([], makeContext())}</>);
    for (const command of commands.filter((command) => !command.hidden)) {
      expect(container).toHaveTextContent(command.name);
    }
  });
});

describe("clear", () => {
  it("asks the shell to clear the transcript", () => {
    const clearSpy = vi.fn();
    clear.run([], makeContext({ clear: clearSpy }));
    expect(clearSpy).toHaveBeenCalledOnce();
  });
});
