import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { markBooted, hasBooted } from "./lib/storage";

beforeEach(() => localStorage.clear());

describe("landing", () => {
  it("always lands on the standard portfolio", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("lands on standard even if a terminal preference was saved", () => {
    localStorage.setItem("satvik.os:mode", "terminal");
    render(<App />);
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});

describe("entering the terminal", () => {
  it("plays the boot the first time, then shows the terminal", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /terminal mode/i }));
    await waitFor(() => expect(screen.getByRole("textbox")).toBeInTheDocument(), {
      timeout: 3000,
    });
    expect(hasBooted()).toBe(true);
  });

  it("skips the boot once it has booted before", async () => {
    markBooted();
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /terminal mode/i }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("can return to standard from the terminal", async () => {
    markBooted();
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /terminal mode/i }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /standard mode/i }));
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
  });
});
