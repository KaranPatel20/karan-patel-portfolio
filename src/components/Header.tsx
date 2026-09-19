const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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
          className="rounded-md border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
