import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Boot } from "./Boot";

describe("Boot", () => {
  it("reveals the boot lines then finishes", async () => {
    const onDone = vi.fn();
    render(<Boot onDone={onDone} lineDelay={1} />);
    await waitFor(() => expect(screen.getByText(/ready/i)).toBeInTheDocument());
    await waitFor(() => expect(onDone).toHaveBeenCalled());
  });

  it("can be skipped", async () => {
    const onDone = vi.fn();
    const user = userEvent.setup();
    render(<Boot onDone={onDone} lineDelay={100000} />);
    await user.click(screen.getByRole("button", { name: /skip/i }));
    expect(onDone).toHaveBeenCalled();
  });
});
