import { FaLinkedin, FaGithub } from "react-icons/fa6";
import TrackedLink from "@/components/TrackedLink";

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/karanpatel20120",
    Icon: FaLinkedin,
    platform: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/KaranPatel20",
    Icon: FaGithub,
    platform: "github",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[120px] -top-20 h-[360px] w-[360px] rounded-full bg-accent-2-soft"
      />

      <div className="relative mx-auto max-w-[640px] px-8 pb-8 pt-16 sm:px-12 sm:pt-24 lg:px-16">
        <span className="inline-flex items-center rounded-full bg-accent-2-soft px-2.5 py-1 text-[11px] tracking-wide text-accent-2">
          Data Analyst / Software Developer
        </span>
        <h1 className="text-balance mt-4 font-mono text-[clamp(2.75rem,7vw,4.75rem)] font-normal leading-none tracking-[-0.015em] text-foreground">
          Hi, I&apos;m Karan.
        </h1>
        <p className="mb-6 mt-4 max-w-[480px] text-lg leading-[1.55] text-foreground/90">
          I turn data into decisions, and ideas into software. 3+ years building dashboards,
          KPIs, and the software behind them.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 font-mono text-sm text-background transition-colors hover:bg-accent-hover active:bg-accent-active"
          >
            See my work
          </a>
          <TrackedLink
            href="mailto:karankp20120@gmail.com"
            event="social_click"
            eventProps={{ platform: "email", location: "hero" }}
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:bg-foreground/5 active:bg-foreground/10"
          >
            Email me
          </TrackedLink>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          {links.map(({ label, href, Icon, platform }) => (
            <TrackedLink
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              event="social_click"
              eventProps={{ platform, location: "hero" }}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" />
              {label}
            </TrackedLink>
          ))}
          <TrackedLink
            href="/Karan_Patel_Resume.pdf"
            download
            event="resume_download"
            eventProps={{ location: "hero" }}
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Resume
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
