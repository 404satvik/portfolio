import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StandardPage } from "./StandardPage";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { learning } from "../content/learning";
import { skillGroups } from "../content/skills";
import { connectLinks } from "../content/connect";

describe("StandardPage", () => {
  it("shows the profile identity", () => {
    render(<StandardPage onEnterTerminal={vi.fn()} />);
    expect(
      screen.getByRole("heading", { name: new RegExp(profile.name, "i") }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(profile.tagline, "i"))).toBeInTheDocument();
  });

  it("lists every project, learning item, and skill", () => {
    const { container } = render(<StandardPage onEnterTerminal={vi.fn()} />);
    for (const project of projects) expect(container).toHaveTextContent(project.name);
    for (const item of learning) expect(container).toHaveTextContent(item);
    for (const group of skillGroups) {
      expect(container).toHaveTextContent(group.label);
      for (const item of group.items) expect(container).toHaveTextContent(item);
    }
  });

  it("renders every connect link with its href", () => {
    render(<StandardPage onEnterTerminal={vi.fn()} />);
    for (const link of connectLinks) {
      const anchor = screen.getByRole("link", { name: new RegExp(link.label, "i") });
      expect(anchor).toHaveAttribute("href", link.url);
    }
  });

  it("can switch to the terminal", async () => {
    const onEnterTerminal = vi.fn();
    const user = userEvent.setup();
    render(<StandardPage onEnterTerminal={onEnterTerminal} />);
    await user.click(screen.getByRole("button", { name: /terminal/i }));
    expect(onEnterTerminal).toHaveBeenCalledOnce();
  });
});
