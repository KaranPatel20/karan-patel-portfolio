"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { FaBars, FaXmark } from "react-icons/fa6";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 sm:px-12 lg:px-16 py-4">
        <a href="#top" className="font-mono text-[22px] text-foreground">
          kp.
        </a>
        <nav className="hidden gap-[26px] text-[15px] font-semibold text-foreground sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="/Karan_Patel_Resume.pdf"
          download
          onClick={() => track("resume_download", { location: "header" })}
          className="hidden rounded-full border border-border px-4 py-1.5 font-mono text-sm text-foreground transition-colors hover:bg-foreground/5 sm:block"
        >
          Resume
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="text-foreground sm:hidden"
        >
          {open ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/80 bg-background px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-4 text-sm text-muted">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
