export interface Project {
  name: string;
  blurb: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: "satvik.os",
    blurb: "my personal portfolio — designed and built from scratch",
    tech: ["react", "typescript", "tailwind"],
    link: "https://github.com/404satvik/portfolio",
  },
];
