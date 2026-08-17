import React, { useEffect, useState } from "react";


const links = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "projects", href: "#projects" },
  { label: "play", href: "#play" },
];

const NavBar = () => (
   <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
    <div className="flex w-full max-w-[1240px] items-center justify-between rounded-full border border-border bg-background/75 px-5 py-2.5 backdrop-blur-md">
      
      <a
        href="#top"
        className="font-mono text-sm text-foreground translate-y-[3px]"
      >
        ash<span className="text-primary">.</span>apsangi
      </a>

      <nav className="translate-y-[10px]">
        <ul className="flex items-center gap-4 sm:gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="link-underline font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#contact"
              className="btn-outline !py-1.5 !text-[11px]"
            >
              say hi
            </a>
          </li>
        </ul>
      </nav>

    </div>
  </header>
);

export default NavBar;

