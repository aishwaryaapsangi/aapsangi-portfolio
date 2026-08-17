import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    Icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: FaLinkedin,
  },
];

const StatusBar = () => (
  <footer className="border-t border-border bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">

      {/* Location */}
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full ash-bg" />
        boston · utc-4
      </span>

      {/* Status */}
      <span className="hidden sm:inline">
        status: building
      </span>

      {/* Socials */}
      <span className="flex items-center gap-4">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="status-social transition-colors"
          >
            <Icon
              className="h-3.5 w-3.5"
              strokeWidth={1.75}
            />
          </a>
        ))}
      </span>

    </div>
  </footer>
);

export default StatusBar;