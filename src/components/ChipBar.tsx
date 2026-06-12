import type { Command } from "../lib/types";

interface ChipBarProps {
  commands: Command[];
  onRun: (name: string) => void;
}

export function ChipBar({ commands, onRun }: ChipBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {commands
        .filter((command) => !command.hidden)
        .map((command) => (
          <button
            key={command.name}
            type="button"
            onClick={() => onRun(command.name)}
            className="rounded-md border border-white/10 px-3 py-1 text-[13px] text-muted transition-colors hover:border-amber/50 hover:bg-amber/[0.06] hover:text-amber"
          >
            {command.name}
          </button>
        ))}
    </div>
  );
}
