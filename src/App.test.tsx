import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { getMode, setMode, markBooted, hasBooted } from "./lib/storage";

beforeEach(() => localStorage.clear());

describe("default landing", () => {
  it("lands on the standard portfolio for a new visitor", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("returns a saved terminal user straight to the terminal", () => {
    markBooted();
    setMode("terminal");
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
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
    expect(getMode()).toBe("terminal");
    expect(hasBooted()).toBe(true);
  });

  it("skips the boot once it has booted before", async () => {
    markBooted();
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /terminal mode/i }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(getMode()).toBe("terminal");
  });
});

describe("switching back to standard", () => {
  beforeEach(() => {
    markBooted();
    setMode("terminal");
  });

  it("returns to standard and remembers it", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /standard mode/i }));
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
    expect(getMode()).toBe("standard");
  });
});
