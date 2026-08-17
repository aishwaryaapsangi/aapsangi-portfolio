import { ArrowDownRight } from "lucide-react";
import PixelField from "./PixelField";
import ParticlePortrait from "./ParticlePortrait";
import React from "react";

const stats = [
  { k: "years", v: "7" },
  { k: "installs shipped", v: "100M+" },
  { k: "p99 latency", v: "40ms" },
];

const Intro = () => (
  <section id="top" className="veil relative overflow-hidden">
    <PixelField />

    <div className="relative mx-auto max-w-[1240px] px-6 pb-20 pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

  {/* PORTRAIT — LEFT */}
  <div>
    <div className="relative rounded-xl bg-background/60 p-5 backdrop-blur-sm">
      
      <div className="mb-4 flex items-center justify-between">
        <span className="eyebrow">
          render / live
        </span>

        <span className="font-mono text-[10px] text-muted-foreground">
          move your cursor
        </span>
      </div>

      <div className="relative flex justify-center">
        <div className="drift relative">
          <ParticlePortrait />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full ash-bg" />
        6k particles · 60fps
      </div>

    </div>
  </div>


  {/* TEXT — RIGHT */}
  <div>

    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full ash-bg opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full ash-bg" />
      </span>

      <span className="font-mono text-[11px] text-muted-foreground">
        open to freelance
      </span>
    </div>

    <p className="font-mono text-sm ash-primary">
      hi, ash here<span className="caret-blink">_</span>
    </p>

      {/* <h1 className="mt-4 font-pixel text-1xl leading-[1.5] tracking-tight text-foreground sm:text-1xl lg:text-3xl">
              hi :)ash here
              <span className="caret-blink ash-primary">|</span>
    </h1> */}

    {/* <h1 className="mt-4 font-mono text-4xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
      I build systems
      <br />
      that hold up
      <br />
      <span className="ash-primary text-glow">
        and pixels
      </span>{" "}
      <span className="text-muted-foreground">
        that don&apos;t
      </span>
    </h1> */}

    <p className="mt-8 max-w-lg font-mono text-sm leading-7 text-muted-foreground">
      Software engineer in New York working on ranking models and real-time
      services. Off the clock I make small interactive things &mdash; like the
      portrait beside this and the game further down.
    </p>

    <div className="mt-9 flex flex-wrap items-center gap-4">
      <a href="#work" className="btn-mint">
        see the work
        <ArrowDownRight className="h-4 w-4" />
      </a>

      <a href="#play" className="btn-outline">
        play something
      </a>
    </div>

    <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.k} className="border-t border-border pt-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {s.k}
          </dt>

          <dd className="mt-1.5 font-mono text-lg ash-primary">
            {s.v}
          </dd>
        </div>
      ))}
    </dl>

  </div>

</div>
    </div>
  </section>
);

export default Intro;
