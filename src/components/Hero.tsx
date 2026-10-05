import { FaLinkedin, FaGithub } from "react-icons/fa6";
import TrackedLink from "@/components/TrackedLink";
import HeroRotator from "@/components/HeroRotator";
import HeroTitle from "@/components/HeroTitle";
import MagneticButton from "@/components/MagneticButton";
import HeroDashboard from "@/components/HeroDashboard";
import HeroStats from "@/components/HeroStats";
import { HeroFade, HeroParallax } from "@/components/HeroScroll";

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
      <div className="absolute -right-[120px] -top-20">
        <HeroParallax speed={0.18} className="hero-drift h-[360px] w-[360px] rounded-full bg-accent-2-soft" />
      </div>
      <div className="absolute -bottom-24 right-[18%]">
        <HeroParallax speed={-0.1} className="hero-drift-alt h-[220px] w-[220px] rounded-full bg-accent-soft" />
      </div>

      <HeroFade>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
        <span style={{ "--i": 0 } as React.CSSProperties} className="hero-rise inline-flex items-center rounded-full bg-accent-2-soft px-2.5 py-1 text-[11px] tracking-wide text-accent-2">
          Data Analyst / Software Developer
        </span>
        <HeroTitle text="Hi, I'm Karan." />
        <p style={{ "--i": 2 } as React.CSSProperties} className="hero-rise mb-4 mt-4 max-w-[480px] text-lg leading-[1.55] text-foreground/90">
          I turn data into decisions, and ideas into software. 3+ years building dashboards,
          KPIs, and the software behind them.
        </p>
        <div style={{ "--i": 3 } as React.CSSProperties} className="hero-rise mb-6">
          <HeroRotator />
        </div>
        <div style={{ "--i": 4 } as React.CSSProperties} className="hero-rise flex flex-wrap items-center gap-3">
          <MagneticButton>
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 font-mono text-sm text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md active:translate-y-0 active:bg-accent-active"
          >
            See my work
          </a>
          </MagneticButton>
          <MagneticButton>
          <TrackedLink
            href="mailto:karankp20120@gmail.com"
            event="social_click"
            eventProps={{ platform: "email", location: "hero" }}
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 font-mono text-sm text-foreground transition-all hover:-translate-y-0.5 hover:bg-foreground/5 active:translate-y-0 active:bg-foreground/10"
          >
            Email me
          </TrackedLink>
          </MagneticButton>
        </div>

        <div style={{ "--i": 5 } as React.CSSProperties} className="hero-rise mt-6 flex flex-wrap items-center gap-5">
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
        <div style={{ "--i": 6 } as React.CSSProperties} className="hero-rise">
          <HeroStats />
        </div>
        </div>
        <HeroDashboard />
        </div>
      </HeroFade>
    </section>
  );
}
