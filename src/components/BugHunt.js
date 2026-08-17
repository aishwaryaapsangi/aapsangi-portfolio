import React, { useCallback, useEffect, useRef, useState } from "react";

const DURATION = 20;

const BugHunt = () => {
  const [state, setState] = useState("idle");
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [best, setBest] = useState(0);
  const [bugs, setBugs] = useState([]);
  const idRef = useRef(0);

  const spawn = useCallback(() => {
    idRef.current += 1;

    return {
      id: idRef.current,
      x: 6 + Math.random() * 86,
      y: 10 + Math.random() * 76,
    };
  }, []);

  useEffect(() => {
    if (state !== "playing") return;

    const tick = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setState("over");
          return 0;
        }

        return t - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [state]);

  useEffect(() => {
    if (state !== "playing") return;

    const mover = setInterval(() => {
      setBugs((prev) => prev.map(() => spawn()));
    }, 900);

    return () => clearInterval(mover);
  }, [state, spawn]);

  useEffect(() => {
    if (state === "over") {
      setBest((b) => Math.max(b, score));
    }
  }, [state, score]);

  const start = () => {
    setScore(0);
    setMisses(0);
    setTime(DURATION);
    setBugs([spawn(), spawn(), spawn()]);
    setState("playing");
  };

  const hit = (id) => {
    setScore((s) => s + 1);

    setBugs((prev) =>
      prev.map((b) => (b.id === id ? spawn() : b))
    );
  };

  return (
    <section
      id="play"
      className="border-y border-border bg-surface/40"
    >
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-24 lg:grid-cols-[0.4fr_0.6fr]">

        {/* LEFT SIDE */}
        <div>
          <p className="eyebrow">side quest</p>

          <h2 className="mt-5 font-mono text-2xl leading-snug text-foreground">
            Debug sprint.
          </h2>

          <p className="mt-4 max-w-sm font-mono text-xs leading-6 text-muted-foreground">
            Twenty seconds, an unbounded number of bugs. Squash as many as
            you can &mdash; they relocate every 900ms, like real ones.
          </p>

          <dl className="mt-8 flex gap-8 font-mono text-xs">

            <div>
              <dt className="text-muted-foreground">score</dt>
              <dd className="mt-1 text-2xl ash-primary">
                {score}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">time</dt>
              <dd className="mt-1 text-2xl text-foreground">
                {time}s
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">misses</dt>
              <dd className="mt-1 text-2xl text-magenta">
                {misses}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">best</dt>
              <dd className="mt-1 text-2xl text-amber">
                {best}
              </dd>
            </div>

          </dl>

          <button
            onClick={start}
            className="btn-mint mt-8"
            type="button"
          >
            {state === "idle" ? "run test suite" : "retry"}
          </button>
        </div>

        {/* GAME AREA */}
        <div
          onClick={() =>
            state === "playing" &&
            setMisses((m) => m + 1)
          }
          className="relative h-[320px] overflow-hidden rounded-lg border border-border bg-background/70"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >

          {/* START / GAME OVER OVERLAY */}
          {state !== "playing" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/70 text-center">

              <p className="eyebrow">
                {state === "idle" ? "ready" : "time up"}
              </p>

              <p className="font-mono text-xs text-muted-foreground">
                {state === "idle"
                  ? "press run test suite to begin"
                  : `${score} bugs squashed, ${misses} misses`}
              </p>

            </div>
          )}

          {/* BUGS */}
          {bugs.map((bug) => (
            <button
              key={bug.id}
              type="button"
              aria-label="squash bug"
              onClick={(e) => {
                e.stopPropagation();
                hit(bug.id);
              }}
              className="bug-target absolute h-7 w-7 rounded-sm"
              style={{
                left: `${bug.x}%`,
                top: `${bug.y}%`,
                background:
                  "color-mix(in oklab, var(--magenta) 85%, transparent)",
                boxShadow:
                  "0 0 18px color-mix(in oklab, var(--magenta) 45%, transparent)",
                clipPath:
                  "polygon(25% 0,75% 0,100% 25%,100% 75%,75% 100%,25% 100%,0 75%,0 25%)",
              }}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default BugHunt;