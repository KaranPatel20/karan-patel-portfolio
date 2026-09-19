export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <p className="font-mono text-sm text-accent">Business &amp; Data Analyst</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        I turn messy requirements into dashboards, KPIs, and decisions people trust.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        3+ years gathering requirements, validating data, and building reporting that
        stakeholders actually use — with an M.Sc. in Computer Science and hands-on AI/ML
        engineering experience (LLMs, RAG, computer vision, MLOps) I bring to data-heavy
        and technical teams alike.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="/Karan_Patel_Resume.pdf"
          download
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-[#0b1220] transition-opacity hover:opacity-90"
        >
          Download Resume
        </a>
        <a
          href="mailto:karankp20120@gmail.com"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          karankp20120@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/karanpatel"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/KaranPatel20"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
