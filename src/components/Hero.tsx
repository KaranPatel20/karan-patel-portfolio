import { FaLinkedin, FaGithub } from "react-icons/fa6";
import TrackedLink from "@/components/TrackedLink";
import HeroRotator from "@/components/HeroRotator";
import HeroTitle from "@/components/HeroTitle";
import HeroResult from "@/components/HeroResult";
import HeroStats from "@/components/HeroStats";

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

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,var(--accent-soft),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-14 text-center sm:px-12 sm:pb-16 sm:pt-20 lg:px-16">
        <p style={rise(0)} className="hero-rise text-sm font-semibold text-accent">
          Data Analyst / Software Developer
        </p>
        <div className="mt-3">
          <HeroTitle text="Hi, I'm Karan." />
        </div>
        <p
          style={rise(4)}
          className="hero-rise mx-auto mt-4 max-w-xl text-lg leading-[1.55] text-foreground/85"
        >
          I turn data into decisions, and ideas into software. 3+ years building dashboards,
          KPIs, and the software behind them.
        </p>
        <div style={rise(5)} className="hero-rise mt-5">
          <HeroRotator />
        </div>

        <div
          style={rise(6)}
          className="hero-rise mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <a
            href="#projects"
            className="press inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-on-accent hover:bg-accent-hover"
          >
            See my work
          </a>
          <TrackedLink
            href="mailto:karankp20120@gmail.com"
            event="social_click"
            eventProps={{ platform: "email", location: "hero" }}
            className="press inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
          >
            Email me <span aria-hidden>&rsaquo;</span>
          </TrackedLink>
        </div>

        <div
          style={rise(7)}
          className="hero-rise mt-6 flex flex-wrap items-center justify-center gap-6"
        >
          {links.map(({ label, href, Icon, platform }) => (
            <TrackedLink
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              event="social_click"
              eventProps={{ platform, location: "hero" }}
              className="press flex items-center gap-2 text-sm text-muted hover:text-foreground"
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
            className="press text-sm text-muted hover:text-foreground"
          >
            Resume
          </TrackedLink>
        </div>

        <HeroResult />
        <HeroStats />
      </div>
    </section>
  );
}
