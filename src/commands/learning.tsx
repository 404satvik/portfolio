import type { Command } from "../lib/types";
import { learning as learningItems } from "../content/learning";

export const learning: Command = {
  name: "learning",
  description: "what i'm learning right now",
  run: () => (
    <div className="grid gap-1">
      {learningItems.map((item) => (
        <div key={item}>
          <span className="text-amber">▸ </span>
          <span className="text-muted">{item}</span>
        </div>
      ))}
    </div>
  ),
};
