import React from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "particle.canvas",
    blurb:
      "Turns any image into interactive scanline particles. The hero above runs on it.",
    tags: ["Canvas", "TypeScript"],
    accent: "ash-primary",
  },
  {
    name: "queuelite",
    blurb:
      "Durable job queue on Postgres with exactly-once semantics and a three-line API.",
    tags: ["Go", "Postgres"],
    accent: "text-magenta",
  },
  {
    name: "crt-ui",
    blurb:
      "A component kit for interfaces that look like they boot up instead of loading.",
    tags: ["React", "CSS"],
    accent: "text-amber",
  },
  {
    name: "spritepack",
    blurb:
      "CLI that packs, dedupes and diff-tests sprite atlases inside CI.",
    tags: ["Rust", "CLI"],
    accent: "ash-primary",
  },
];

const Projects = () => (
  <section
    id="projects"
    className="mx-auto max-w-[1240px] px-6 py-24"
  >
    <div className="flex flex-wrap items-end justify-between gap-4">
      <p className="eyebrow">projects</p>

      <p className="max-w-sm font-mono text-xs leading-6 text-muted-foreground">
        Things I build for myself, usually to answer a question faster than
        reading about it.
      </p>
    </div>

    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {projects.map((project) => (
        <a
          key={project.name}
          href="#projects"
          className="soft-card group flex flex-col p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-mono text-lg ${project.accent}`}>
              {project.name}
            </h3>

            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
          </div>

          <p className="mt-5 flex-1 font-mono text-xs leading-6 text-muted-foreground">
            {project.blurb}
          </p>

          <ul className="mt-7 ml-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </a>
      ))}
    </div>
  </section>
);

export default Projects;