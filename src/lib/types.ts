import type { ReactNode } from "react";

export interface CommandContext {
  run: (input: string) => void;
  clear: () => void;
  commands: Command[];
}

export interface Command {
  name: string;
  description: string;
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => ReactNode;
}
