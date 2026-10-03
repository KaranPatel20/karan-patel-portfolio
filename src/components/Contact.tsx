import ThemeToggle from "@/components/ThemeToggle";
import TrackedLink from "@/components/TrackedLink";
import ContactSocials from "@/components/ContactSocials";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16 text-center">
        <h2 className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-mono text-sm text-accent">Contact</h2>
        <p className="mt-4 font-mono text-2xl text-foreground">
          Let&apos;s talk about your data or analytics team.
        </p>
        <ContactSocials />
        <TrackedLink
          href="mailto:karankp20120@gmail.com"
          event="social_click"
          eventProps={{ platform: "email", location: "contact" }}
          className="mt-4 inline-block text-sm text-muted transition-colors hover:text-accent"
        >
          karankp20120@gmail.com
        </TrackedLink>
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
