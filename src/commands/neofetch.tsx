import type { Command } from "../lib/types";
import { profile } from "../content/profile";

const logo = ["┌──────────┐", "│ ▲ satvik │", "│   .os    │", "└──────────┘"];

const rows: [string, string][] = [
  ["user", profile.name],
  ["age", String(profile.age)],
  ["role", profile.role],
  ["focus", profile.tagline],
  ["shell", "satvik.os — bash"],
];

export const neofetch: Command = {
  name: "neofetch",
  description: "system info",
  hidden: true,
  run: () => (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <pre className="leading-tight text-amber">{logo.join("\n")}</pre>
      <div className="grid content-start gap-0.5">
        {rows.map(([key, value]) => (
          <div key={key}>
            <span className="text-amber">{key}</span>
            <span className="text-dim"> · </span>
            <span className="text-muted">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
