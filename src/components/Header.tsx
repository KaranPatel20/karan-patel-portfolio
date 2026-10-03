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
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 sm:px-12 lg:px-16">
        <a href="#top" className="text-[15px] font-medium text-foreground">
          karan-patel<span className="text-accent">.dev</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-foreground sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Karan_Patel_Resume.pdf"
            download
            onClick={() => track("resume_download", { location: "header" })}
            className="inline-flex items-center justify-center rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.07] active:bg-foreground/[0.14]"
          >
            Resume
          </a>
        </nav>
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
        <nav className="bg-background px-8 pb-4 pt-2 sm:hidden">
          <div className="flex flex-col gap-4 text-sm text-foreground">
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
