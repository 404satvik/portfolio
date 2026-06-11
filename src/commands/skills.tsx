import type { Command } from "../lib/types";
import { skillGroups } from "../content/skills";

export const skills: Command = {
  name: "skills",
  description: "my stack",
  run: () => (
    <div className="grid gap-2">
      {skillGroups.map((group) => (
        <div key={group.label} className="flex flex-wrap gap-x-2">
          <span className="w-28 shrink-0 text-dim">{group.label}</span>
          <span className="text-muted">{group.items.join(" · ")}</span>
        </div>
      ))}
    </div>
  ),
};
