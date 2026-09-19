export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="font-mono text-sm text-accent">Contact</h2>
        <p className="mt-4 text-2xl font-semibold text-foreground">
          Let&apos;s talk about your data or analytics team.
        </p>
        <p className="mt-3 text-sm text-muted">Mississauga, ON, Canada</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:karankp20120@gmail.com"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-[#0b1220] transition-opacity hover:opacity-90"
          >
            karankp20120@gmail.com
          </a>
          <a
            href="tel:+18078420702"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            +1 807 842-0702
          </a>
        </div>
        <div className="mt-6 flex justify-center gap-6 text-sm text-muted">
          <a href="https://linkedin.com/in/karanpatel" target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href="https://github.com/KaranPatel20" target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href="https://medium.com/@karanpatel20" target="_blank" rel="noreferrer" className="hover:text-accent">
            Medium
          </a>
        </div>
      </div>
      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Karan Patel. Built with Next.js &amp; Tailwind.
      </footer>
    </section>
  );
}
