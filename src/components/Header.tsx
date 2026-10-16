"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { container } from "@/lib/layout";
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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Highlight the nav link of the section currently crossing the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    const top = () => {
      if (window.scrollY < 200) setActiveSection(null);
    };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <div className={`${container} flex h-[52px] items-center justify-between`}>
        <a href="#top" className="press text-lg font-semibold tracking-tight text-foreground">
          kp.
        </a>
        <nav className="hidden gap-7 text-[13px] text-foreground/80 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => trackEvent("nav_click", { section: link.label.toLowerCase(), location: "header" })}
              aria-current={activeSection === link.href ? "true" : undefined}
              className={`transition-colors hover:text-foreground ${
                activeSection === link.href ? "font-medium text-accent" : ""
              }`}
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

      {!reduce && (
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
        />
      )}

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
