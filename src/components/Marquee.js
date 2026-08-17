import React from "react";

const items = [
  "TypeScript",
  "Python",
  "React",
  "Go",
  "Postgres",
  "Kubernetes",
  "WebGL",
  "Rust",
  "Canvas",
  "gRPC",
];

const Marquee = () => (
  <div className="overflow-hidden border-y border-border py-5">
    <div className="marquee-track">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center">
          {items.map((item) => (
            <span key={`${dup}-${item}`} className="flex items-center">
              <span className="px-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {item}
              </span>

              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: "#64ffda" }}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;