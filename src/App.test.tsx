import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { getMode, setMode, markBooted } from "./lib/storage";

beforeEach(() => {
  localStorage.clear();
  markBooted();
  setMode("terminal");
});

describe("App mode switching", () => {
  it("starts in the terminal for a returning terminal user", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("switches to standard mode and remembers the choice", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /standard mode/i }));
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
    expect(getMode()).toBe("standard");
  });

  it("switches back to the terminal", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /standard mode/i }));
    await user.click(screen.getByRole("button", { name: /terminal mode/i }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(getMode()).toBe("terminal");
  });
});
