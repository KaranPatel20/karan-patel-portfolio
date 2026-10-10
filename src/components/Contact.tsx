import ThemeToggle from "@/components/ThemeToggle";
import TrackedLink from "@/components/TrackedLink";
import ContactSocials from "@/components/ContactSocials";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-surface-2">
      <Reveal className="mx-auto max-w-7xl px-6 py-14 text-center sm:px-12 sm:py-16 lg:px-16">
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 text-center text-xs text-muted sm:flex-row sm:justify-between sm:px-12 lg:px-16">
          <p>© {new Date().getFullYear()} Karan Patel. Built with Next.js &amp; Tailwind.</p>
          <ThemeToggle />
        </div>
      </footer>
    </section>
  );
}
