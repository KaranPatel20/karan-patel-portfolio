import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa6";
import { SiMedium } from "react-icons/si";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "karankp20120@gmail.com", href: "mailto:karankp20120@gmail.com", Icon: FaEnvelope },
  { label: "LinkedIn", href: "https://linkedin.com/in/karanpatel20120", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/KaranPatel20", Icon: FaGithub },
  { label: "Medium", href: "https://medium.com/@karanpatel20", Icon: SiMedium },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-mono text-sm text-accent">Contact</h2>
        <p className="mt-4 text-2xl font-semibold text-foreground">
          Let&apos;s talk about your data or analytics team.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" />
              {label}
            </a>
          ))}
        </div>
      </div>
      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 sm:px-6 lg:px-8 text-center text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Karan Patel. Built with Next.js &amp; Tailwind.</p>
          <ThemeToggle />
        </div>
      </footer>
    </section>
  );
}
