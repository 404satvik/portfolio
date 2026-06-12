import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { getMode, setMode, markBooted, hasBooted } from "./lib/storage";

beforeEach(() => localStorage.clear());

describe("returning visitor", () => {
  beforeEach(() => {
    markBooted();
    setMode("terminal");
  });

  it("goes straight to the saved terminal, no boot", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.queryByText(/select session/i)).not.toBeInTheDocument();
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

describe("first visit", () => {
  it("boots, then shows the session chooser", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/select session/i)).toBeInTheDocument(), {
      timeout: 3000,
    });
  });

  it("launches the chosen session and remembers it", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(screen.getByText(/select session/i)).toBeInTheDocument(), {
      timeout: 3000,
    });
    await user.click(screen.getByRole("button", { name: /standard/i }));
    expect(screen.getByRole("heading", { name: /satvik/i })).toBeInTheDocument();
    expect(getMode()).toBe("standard");
    expect(hasBooted()).toBe(true);
  });
});
