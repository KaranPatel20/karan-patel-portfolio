import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa6";
import { SiMedium } from "react-icons/si";
import ThemeToggle from "@/components/ThemeToggle";
import TrackedLink from "@/components/TrackedLink";

const links = [
  {
    label: "karankp20120@gmail.com",
    href: "mailto:karankp20120@gmail.com",
    Icon: FaEnvelope,
    platform: "email",
  },
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
  {
    label: "Medium",
    href: "https://medium.com/@karanpatel20",
    Icon: SiMedium,
    platform: "medium",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16 text-center">
        <h2 className="font-mono text-sm text-accent">Contact</h2>
        <p className="mt-4 text-2xl font-semibold text-foreground">
          Let&apos;s talk about your data or analytics team.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {links.map(({ label, href, Icon, platform }) => (
            <TrackedLink
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              event="social_click"
              eventProps={{ platform, location: "contact" }}
              className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" />
              {label}
            </TrackedLink>
          ))}
        </div>
      </div>
      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-8 sm:px-12 lg:px-16 text-center text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Karan Patel. Built with Next.js &amp; Tailwind.</p>
          <ThemeToggle />
        </div>
      </footer>
    </section>
  );
}
