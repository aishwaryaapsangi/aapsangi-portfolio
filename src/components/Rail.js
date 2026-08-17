import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";


const socials = [
  { label: "Email", href: "mailto:hello@example.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com", Icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedin },
];

const Rail = () => (
<aside className="pointer-events-none fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center justify-between py-8">    <a
      href="#top"
      className="pointer-events-auto font-pixel text-[0.6rem] text-primary text-glow"
      aria-label="Home"
    >
      A
    </a>

    <span
      className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
      style={{ writingMode: "vertical-rl" }}
    >
      AISHWARYA APSANGI
    </span>

    <div className="pointer-events-auto flex flex-col items-center gap-5">
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </a>
      ))}
      <span className="h-16 w-px bg-border" />
    </div>
  </aside>
);

export default Rail;
