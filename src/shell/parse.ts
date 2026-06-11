export interface ParsedCommand {
  name: string;
  args: string[];
}

export function parse(input: string): ParsedCommand {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  const [name = "", ...args] = tokens;
  return { name: name.toLowerCase(), args };
}
