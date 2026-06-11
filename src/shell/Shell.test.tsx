import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Shell } from "./Shell";

function input() {
  return screen.getByRole("textbox");
}

describe("Shell", () => {
  it("runs a typed command and shows its output", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.type(input(), "whoami{Enter}");
    expect(screen.getByText(/machine learning/i)).toBeInTheDocument();
  });

  it("reports an unknown command", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.type(input(), "banana{Enter}");
    expect(screen.getByText(/command not found/i)).toBeInTheDocument();
  });

  it("wipes the transcript when clear runs", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.type(input(), "whoami{Enter}");
    expect(screen.getByText(/machine learning/i)).toBeInTheDocument();
    await user.type(input(), "clear{Enter}");
    expect(screen.queryByText(/machine learning/i)).not.toBeInTheDocument();
  });

  it("recalls the previous command with arrow up", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.type(input(), "whoami{Enter}");
    await user.keyboard("{ArrowUp}");
    expect(input()).toHaveValue("whoami");
  });

  it("autocompletes a command name with tab", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.type(input(), "wh");
    await user.keyboard("{Tab}");
    expect(input()).toHaveValue("whoami");
  });

  it("runs a command when its chip is clicked", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.click(screen.getByRole("button", { name: "help" }));
    expect(screen.getByText(/available commands/i)).toBeInTheDocument();
  });
});
