import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionSelect } from "./SessionSelect";

describe("SessionSelect", () => {
  it("selects terminal when its option is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SessionSelect onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /terminal/i }));
    expect(onSelect).toHaveBeenCalledWith("terminal");
  });

  it("selects standard when its option is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SessionSelect onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /standard/i }));
    expect(onSelect).toHaveBeenCalledWith("standard");
  });

  it("launches the default (terminal) on Enter", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SessionSelect onSelect={onSelect} />);
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("terminal");
  });

  it("moves the highlight with the arrow keys", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SessionSelect onSelect={onSelect} />);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith("standard");
  });

  it("supports number keys", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SessionSelect onSelect={onSelect} />);
    await user.keyboard("2");
    expect(onSelect).toHaveBeenCalledWith("standard");
  });
});
