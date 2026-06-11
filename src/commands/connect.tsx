import type { Command } from "../lib/types";
import { connectLinks } from "../content/connect";

export const connect: Command = {
  name: "connect",
  description: "where to find me",
  run: () => (
    <div className="grid gap-1">
      {connectLinks.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target={link.url.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className="text-muted underline-offset-2 hover:text-amber hover:underline"
        >
          <span className="text-amber">{link.label}</span> →{" "}
          {link.url.replace(/^mailto:/, "")}
        </a>
      ))}
    </div>
  ),
};
