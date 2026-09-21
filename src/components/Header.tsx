"use client";

import { useState } from "react";
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-foreground">
          Karan Patel
        </a>
        <nav className="hidden gap-6 text-sm text-muted sm:flex">
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
          className="hidden rounded-md border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent-soft sm:block"
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
