export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "languages", items: ["python", "typescript"] },
  { label: "ml / data", items: ["numpy", "pandas", "pytorch"] },
  { label: "math", items: ["linear algebra", "statistics", "probability"] },
  { label: "tools", items: ["git", "vscode", "vite"] },
];
