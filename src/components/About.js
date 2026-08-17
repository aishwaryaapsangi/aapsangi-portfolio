import { useState } from "react";
import React from "react";


const files = {
  "ash.js": [
    [
      { t: "export const ", c: "kw" },
      { t: "ash" },
      { t: " = {" },
    ],
    [
      { t: "  name", c: "key" },
      { t: ": " },
      { t: '"Ash Apsangi"', c: "str" },
      { t: "," },
    ],
    [
      { t: "  role", c: "key" },
      { t: ": " },
      { t: '"software engineer"', c: "str" },
      { t: "," },
    ],
    [
      { t: "  city", c: "key" },
      { t: ": " },
      { t: '"Boston"', c: "str" },
      { t: "," },
    ],
    [
      { t: "  years", c: "key" },
      { t: ": " },
      { t: "7", c: "num" },
      { t: "," },
    ],
    [
      { t: "  stack", c: "key" },
      { t: ": [" },
      { t: '"go"', c: "str" },
      { t: ", " },
      { t: '"js"', c: "str" },
      { t: ", " },
      { t: '"postgres"', c: "str" },
      { t: "]," },
    ],
    [
      { t: "  offHours", c: "key" },
      { t: ": [" },
      { t: '"pixel art"', c: "str" },
      { t: ", " },
      { t: '"canvas toys"', c: "str" },
      { t: "]," },
    ],
    [{ t: "}" }],
    [],
    [
      {
        t: "// currently: building systems + digital art",
        c: "com",
      },
    ],
  ],

  "ash.json": [
    [{ t: "{" }],
    [
      { t: '  "available"', c: "key" },
      { t: ": " },
      { t: "true", c: "kw" },
      { t: "," },
    ],
    [
      { t: '  "focus"', c: "key" },
      { t: ": " },
      { t: '"large-scale systems + interfaces"', c: "str" },
      { t: "," },
    ],
    [
      { t: '  "shipped_to"', c: "key" },
      { t: ": " },
      { t: "100000000", c: "num" },
      { t: "," },
    ],
    [
      { t: '  "p99_ms"', c: "key" },
      { t: ": " },
      { t: "40", c: "num" },
      { t: "," },
    ],
    [
      { t: '  "coffee_per_deploy"', c: "key" },
      { t: ": " },
      { t: "2", c: "num" },
    ],
    [{ t: "}" }],
  ],

  "hire.sh": [
    [{ t: "# the short version", c: "com" }],
    [
      { t: "$ ", c: "kw" },
      { t: "ash --hire " },
      { t: "--email", c: "fn" },
      { t: " hello@example.com" },
    ],
    [],
    [{ t: "  > reply time: ~12h" }],
    [{ t: "  > open to: freelance, contract, weird prototypes" }],
    [{ t: "  > not open to: 4-round take-homes" }],
  ],
};

const colorFor = (c) => {
  switch (c) {
    case "key":
      return { color: "#64ffda" };

    case "str":
      return { color: "#f9c74f" };

    case "num":
      return { color: "#d88cff" };

    case "kw":
      return { color: "#64ffda" };

    case "com":
      return { color: "#77718c" };

    case "fn":
      return { color: "#d88cff" };

    default:
      return { color: "#e6f1ff" };
  }
};

const About = () => {
  const names = Object.keys(files);
  const [active, setActive] = useState(names[0]);
  const lines = files[active] || [];

  return (
    <section id="about" className="mx-auto max-w-[1240px] px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">

        {/* About text */}
        <div>
          <p className="eyebrow">about</p>

          <h2 className="mt-5 max-w-sm font-mono text-2xl leading-snug text-foreground">
            Easier to read as a source file than a paragraph.
          </h2>

          <p className="mt-6 max-w-sm font-mono text-sm leading-7 text-muted-foreground">
            Days go into serving paths and modeling code &mdash; latency
            budgets measured in milliseconds. Nights go into{" "}
            <span className="ash-primary">
              drawing with code
            </span>
            : canvas experiments, CRT shaders, particle portraits.
          </p>
        </div>

        {/* Code window */}
       <div className="code-window overflow-hidden rounded-lg border border-border">

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border bg-[#1b1622] px-3 py-2">

            <span className="mr-3 flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "#c084fc" }}
                />
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "#f5c451" }}
                />
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "#72d6b2" }}
                />
              </span>
            {names.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setActive(name)}
                className={`rounded-sm px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  active === name
                    ? "bg-elevated ash-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Code */}
          <pre className="overflow-x-auto px-5 py-6 font-mono text-xs leading-7">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex gap-5">

                  <span className="w-4 shrink-0 select-none text-right text-muted-foreground">
                    {i + 1}
                  </span>

                  <span className="whitespace-pre">
                    {line.map((token, j) => (
                      <span
                        key={j}
                        style={colorFor(token.c)}
                      >
                        {token.t}
                      </span>
                    ))}
                  </span>

                </div>
              ))}
            </code>
          </pre>

        </div>
      </div>
    </section>
  );
};

export default About;