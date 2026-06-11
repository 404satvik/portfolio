import type { Command } from "../lib/types";
import { projects as projectList } from "../content/projects";

export const projects: Command = {
  name: "projects",
  description: "things i've built",
  run: () => (
    <div className="grid gap-3">
      {projectList.map((project, index) => (
        <div key={project.name} className="flex gap-3">
          <span className="text-amber">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <div>
              <span className="text-fg">{project.name}</span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 text-dim underline-offset-2 hover:text-amber hover:underline"
                >
                  ↗
                </a>
              )}
            </div>
            <div className="text-muted">{project.blurb}</div>
            <div className="text-dim">{project.tech.join(" · ")}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};
