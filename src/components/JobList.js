import React from "react";

const jobs = [
  {
    company: "Google",
    role: "Software Engineer, Ads",
    period: "2023 — now",
    note: "Autobidder modeling for Search monetization. 40ms p99 across millions of QPS.",
  },
  {
    company: "Amazon",
    role: "SDE II",
    period: "2021 — 2023",
    note: "Rebuilt a fulfillment service and cut tail latency by 62%.",
  },
  {
    company: "Pinterest",
    role: "Software Engineer",
    period: "2019 — 2021",
    note: "Consumer surfaces and experiment tooling for an app with 100M+ installs.",
  },
];

const JobList = () => (
  <section id="work" className="mx-auto max-w-[1240px] px-6 py-24">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <p className="eyebrow">work</p>

      <span className="font-mono text-[11px] text-muted-foreground">
        2019 → now
      </span>
    </div>

    <ol className="mt-12 space-y-4">
      {jobs.map((job) => (
        <li
          key={job.company}
          className="soft-card group relative p-7 pl-10"
        >
          <span className="absolute left-0 top-7 h-[calc(100%-3.5rem)] w-px bg-border transition-colors group-hover:bg-primary" />

          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-baseline">
            <h3 className="font-mono text-xl text-foreground transition-colors group-hover:text-primary">
              {job.company}

              <span className="ml-3 text-sm text-muted-foreground">
                {job.role}
              </span>
            </h3>

            <span className="font-mono text-xs text-muted-foreground">
              {job.period}
            </span>
          </div>

          <p className="mt-3 max-w-xl font-mono text-xs leading-6 text-muted-foreground">
            {job.note}
          </p>
        </li>
      ))}
    </ol>
  </section>
);

export default JobList;