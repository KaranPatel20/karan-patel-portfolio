import { FaLinkedin, FaGithub } from "react-icons/fa6";
import TrackedLink from "@/components/TrackedLink";
import HeroRotator from "@/components/HeroRotator";
import HeroStats from "@/components/HeroStats";
import Hero3D from "@/components/hero3d/Hero3D";
import { container } from "@/lib/layout";

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
    <>
      {/* ~360vh track with a sticky stage; the copy and readout render without any scene JS. */}
      <section id="hero-track" aria-label="Introduction">
        <span id="top" />
        <Hero3D />
      </section>

      <div className={`${container} pb-14 pt-10 text-center sm:pb-16`}>
        <HeroRotator />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
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
        <HeroStats />
      </div>
    </>
  );
}
