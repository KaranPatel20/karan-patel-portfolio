"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
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

// Translucent bar: content scrolls underneath, so there is no opaque strip and no hard divider.
export default function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex h-[52px] max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
        <a href="#top" className="press text-lg font-semibold tracking-tight text-foreground">
          kp.
        </a>
        <nav className="hidden gap-7 text-[13px] text-foreground/80 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => trackEvent("nav_click", { section: link.label.toLowerCase(), location: "header" })}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="/Karan_Patel_Resume.pdf"
          download
          onClick={() => trackEvent("resume_download", { location: "header" })}
          className="press hidden rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-on-accent hover:bg-accent-hover lg:block"
        >
          Resume
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="press -mr-2 p-2 text-foreground lg:hidden"
        >
          {open ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.45 }}
            className="overflow-hidden border-t border-border/60 lg:hidden"
          >
            <div className="flex flex-col px-6 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    trackEvent("nav_click", { section: link.label.toLowerCase(), location: "mobile-menu" });
                    setOpen(false);
                  }}
                  className="border-b border-border/50 py-3 text-lg font-medium tracking-tight text-foreground last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
