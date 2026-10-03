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
    <section id="top">
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-16 sm:px-12 sm:pt-24 lg:px-16">
        <div className="max-w-[620px]">
          <div
            aria-hidden
            className="h-0.5 w-8 bg-accent shadow-[0_0_12px_var(--accent)]"
          />
          <p className="mt-6 text-[10px] uppercase tracking-[0.1em] text-accent">
            Data Analyst / Software Developer
          </p>
          <h1 className="mt-3 text-balance text-[clamp(36px,6vw,56px)] leading-[1.05] tracking-[-0.02em] text-foreground">
            Hi, I&apos;m Karan.
          </h1>
          <p className="mb-6 mt-4 max-w-[460px] text-base leading-[1.55] text-neutral-300">
            I turn data into decisions, and ideas into software. 3+ years building dashboards,
            KPIs, and the software behind them.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/[0.12] active:bg-accent/[0.22]"
            >
              See my work
            </a>
            <TrackedLink
              href="mailto:karankp20120@gmail.com"
              event="social_click"
              eventProps={{ platform: "email", location: "hero" }}
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.07] active:bg-foreground/[0.14]"
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
                className="flex items-center gap-2 text-sm text-accent-300 transition-colors hover:text-accent-100"
              >
                <Icon className="h-4 w-4" />
                {label}
              </TrackedLink>
            ))}
            <TrackedLink
              href="/Karan_Patel_Resume.pdf"
              download
              event="resume_download"
              eventProps={{ location: "hero" }}
              className="text-sm text-accent-300 transition-colors hover:text-accent-100"
            >
              Resume
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
