import type { ReactNode } from "react";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { learning } from "../content/learning";
import { skillGroups } from "../content/skills";
import { connectLinks } from "../content/connect";

interface StandardPageProps {
  onEnterTerminal: () => void;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/5 py-8">
      <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-dim">{title}</h2>
      {children}
    </section>
  );
}

export function StandardPage({ onEnterTerminal }: StandardPageProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onEnterTerminal}
            className="rounded border border-white/10 px-3 py-1 text-xs text-dim transition-colors hover:border-amber/50 hover:text-amber"
          >
            terminal mode ↗
          </button>
        </div>

        <header className="py-10">
          <h1 className="text-4xl text-fg">{profile.name}</h1>
          <p className="mt-3 text-muted">
            {profile.age} · {profile.role}
          </p>
          <p className="mt-1 text-amber">{profile.tagline}</p>
        </header>

        <Section title="projects">
          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="flex items-baseline gap-2">
                  <span className="text-fg">{project.name}</span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-dim transition-colors hover:text-amber"
                    >
                      ↗
                    </a>
                  )}
                </div>
                <p className="mt-1 text-muted">{project.blurb}</p>
                <p className="mt-1 text-sm text-dim">{project.tech.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="currently learning">
          <ul className="grid gap-1">
            {learning.map((item) => (
              <li key={item} className="text-muted">
                <span className="text-amber">▸ </span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="skills">
          <div className="grid gap-3">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-wrap gap-x-3">
                <span className="w-28 shrink-0 text-dim">{group.label}</span>
                <span className="text-muted">{group.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="connect">
          <div className="grid gap-1">
            {connectLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="text-muted transition-colors hover:text-amber"
              >
                <span className="text-amber">{link.label}</span> →{" "}
                {link.url.replace(/^mailto:/, "")}
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
