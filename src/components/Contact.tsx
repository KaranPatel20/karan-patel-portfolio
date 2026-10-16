import ThemeToggle from "@/components/ThemeToggle";
import TrackedLink from "@/components/TrackedLink";
import ContactSocials from "@/components/ContactSocials";
import Reveal from "@/components/Reveal";
import { container } from "@/lib/layout";

export default function Contact() {
  return (
    <section id="contact" className="bg-surface-2">
      <Reveal className={`${container} py-14 text-center sm:py-16`}>
        <h2 className="mx-auto max-w-3xl text-balance text-2xl text-foreground sm:text-3xl">
          Let&apos;s talk about your data or analytics team.
        </h2>
        <ContactSocials />
        <TrackedLink
          href="mailto:karankp20120@gmail.com"
          event="social_click"
          eventProps={{ platform: "email", location: "contact" }}
          className="press mt-4 inline-block text-sm text-accent hover:text-accent-hover"
        >
          karankp20120@gmail.com
        </TrackedLink>
      </Reveal>
      <footer className="border-t border-border py-6">
        <div className={`${container} flex flex-col items-center justify-center gap-3 text-center text-xs text-muted sm:flex-row sm:justify-between`}>
          <p>© {new Date().getFullYear()} Karan Patel. Built with Next.js &amp; Tailwind.</p>
          <ThemeToggle />
        </div>
      </footer>
    </section>
  );
}
