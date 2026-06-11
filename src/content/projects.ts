export interface Project {
  name: string;
  blurb: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: "satvik.os",
    blurb: "this site — a terminal you can actually talk to",
    tech: ["react", "typescript", "tailwind"],
    link: "https://github.com/404satvik/portfolio",
  },
];
