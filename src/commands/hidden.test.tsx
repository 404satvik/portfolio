import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { commands, findCommand } from "./index";
import { neofetch } from "./neofetch";
import { help } from "./help";
import { ChipBar } from "../components/ChipBar";
import type { CommandContext } from "../lib/types";

function makeContext(overrides: Partial<CommandContext> = {}): CommandContext {
  return { run: vi.fn(), clear: vi.fn(), commands, ...overrides };
}

describe("hidden commands", () => {
  it("registers neofetch so it can still be run", () => {
    expect(findCommand("neofetch")).toBe(neofetch);
  });

  it("keeps hidden commands out of help", () => {
    const { container } = render(<>{help.run([], makeContext())}</>);
    expect(container).not.toHaveTextContent("neofetch");
  });

  it("keeps hidden commands out of the chip bar", () => {
    render(<ChipBar commands={commands} onRun={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "neofetch" })).toBeNull();
  });

  it("renders neofetch with the profile identity", () => {
    const { container } = render(<>{neofetch.run([], makeContext())}</>);
    expect(container).toHaveTextContent("satvik");
  });
});
