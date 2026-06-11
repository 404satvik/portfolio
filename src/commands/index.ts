import type { Command } from "../lib/types";
import { help } from "./help";
import { whoami } from "./whoami";
import { projects } from "./projects";
import { learning } from "./learning";
import { skills } from "./skills";
import { connect } from "./connect";
import { neofetch } from "./neofetch";
import { clear } from "./clear";

export const commands: Command[] = [
  help,
  whoami,
  projects,
  learning,
  skills,
  connect,
  neofetch,
  clear,
];

export function findCommand(name: string): Command | undefined {
  return commands.find((command) => command.name === name);
}
