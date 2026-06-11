import type { Command } from "../lib/types";

export const help: Command = {
  name: "help",
  description: "list everything you can do",
  run: (_args, ctx) => (
    <div>
      <div className="text-muted">available commands — type or click:</div>
      <div className="mt-1 grid gap-0.5">
        {ctx.commands.map((command) => (
          <div key={command.name}>
            <span className="text-amber">{command.name}</span>
            <span className="text-dim"> — {command.description}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
