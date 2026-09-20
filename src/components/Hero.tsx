import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa6";

const links = [
  { label: "karankp20120@gmail.com", href: "mailto:karankp20120@gmail.com", Icon: FaEnvelope },
  { label: "LinkedIn", href: "https://linkedin.com/in/karanpatel20120", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/KaranPatel20", Icon: FaGithub },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <div
        aria-hidden
        className="animate-blob animate-blob-shape pointer-events-none absolute -right-24 -top-24 h-72 w-72 bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob-slow animate-blob-shape pointer-events-none absolute -left-16 top-40 h-56 w-56 bg-accent/10 blur-3xl"
      />

      <div className="relative grid gap-10 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="order-2 sm:order-1">
          <p className="font-mono text-sm text-accent">Data Analyst / Software Developer</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            I turn data into decisions, and ideas into software.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            3+ years building dashboards, KPIs, and the software behind them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
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
          <a
            href="/Karan_Patel_Resume.pdf"
            download
            className="mt-6 block w-full rounded-md bg-gradient-to-br from-accent to-accent/40 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 sm:hidden"
          >
            Resume
          </a>
        </div>

        <div className="order-1 flex justify-center sm:order-2 sm:justify-end">
          <div className="animate-blob-shape flex h-40 w-40 shrink-0 items-center justify-center bg-gradient-to-br from-accent to-accent/40 text-4xl font-bold text-white shadow-lg sm:h-48 sm:w-48">
            KP
          </div>
        </div>
      </div>
    </section>
  );
}
