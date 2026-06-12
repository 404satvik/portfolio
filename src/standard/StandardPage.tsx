import type { ReactNode } from "react";
import { BrandIcon } from "./BrandIcon";
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
    <section className="border-t border-white/5 py-12">
      <h2 className="mb-6 text-xs uppercase tracking-[0.25em] text-dim">{title}</h2>
      {children}
    </section>
  );
}

export function StandardPage({ onEnterTerminal }: StandardPageProps) {
  return (
    <div className="h-full overflow-y-auto text-base">
      <div className="sticky top-0 z-10 border-b border-white/5 bg-bg/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 sm:px-8">
          <span className="text-[13px] text-dim">satvik.os</span>
          <button
            type="button"
            onClick={onEnterTerminal}
            className="rounded-md border border-white/10 px-3 py-1 text-[13px] text-muted transition-colors hover:border-amber/50 hover:bg-amber/[0.06] hover:text-amber"
          >
            terminal mode ↗
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <header className="py-16">
          <h1 className="text-5xl text-fg">{profile.name}</h1>
          <p className="mt-5 text-muted">
            {profile.age} · {profile.role}
          </p>
          <p className="mt-1 text-lg text-amber">{profile.tagline}</p>
        </header>

        <Section title="projects">
          <div className="grid gap-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-amber/40"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-fg">{project.name}</span>
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
                <p className="mt-2 text-muted">{project.blurb}</p>
                <p className="mt-3 text-sm text-dim">{project.tech.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="currently learning">
          <ul className="grid gap-2">
            {learning.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="text-amber">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="skills">
          <div className="grid gap-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-32 shrink-0 text-dim">{group.label}</span>
                <span className="text-muted">{group.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="connect">
          <div className="flex flex-wrap gap-3">
            {connectLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg border border-white/10 px-4 py-2 text-muted transition-colors hover:border-amber/50 hover:bg-amber/[0.06] hover:text-amber"
              >
                <BrandIcon label={link.label} className="h-4 w-4" />
                {link.label} ↗
              </a>
            ))}
          </div>
        </Section>

        <footer className="border-t border-white/5 py-10 text-sm text-dim">
          built with react · typescript · tailwind — satvik.os
        </footer>
      </div>
    </div>
  );
}
