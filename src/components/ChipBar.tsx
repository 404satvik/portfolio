import type { Command } from "../lib/types";

interface ChipBarProps {
  commands: Command[];
  onRun: (name: string) => void;
}

export function ChipBar({ commands, onRun }: ChipBarProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {commands
        .filter((command) => !command.hidden)
        .map((command) => (
        <button
          key={command.name}
          type="button"
          onClick={() => onRun(command.name)}
          className="rounded border border-white/10 px-2 py-0.5 text-xs text-dim transition-colors hover:border-amber/50 hover:text-amber"
        >
          {command.name}
        </button>
      ))}
    </div>
  );
}
