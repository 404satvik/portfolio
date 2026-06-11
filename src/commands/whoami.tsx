import type { Command } from "../lib/types";
import { profile } from "../content/profile";

export const whoami: Command = {
  name: "whoami",
  description: "who i am",
  run: () => (
    <div>
      <div>
        <span className="text-fg">{profile.name}</span>
        <span className="text-muted">
          {" "}
          · {profile.age} · {profile.role}
        </span>
      </div>
      <div className="text-dim">{profile.tagline}</div>
    </div>
  ),
};
