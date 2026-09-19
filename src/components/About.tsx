export default function About() {
  return (
    <section id="about" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">About</h2>
        <div className="mt-4 grid gap-8 sm:grid-cols-[1.3fr_1fr]">
          <p className="text-justify text-base leading-relaxed text-muted">
            I&apos;m an analyst who moves fluidly between stakeholder conversations and
            SQL. Across retail, nonprofit, and tech environments I&apos;ve gathered
            requirements from non-technical program managers, built KPI frameworks and
            dashboards in Power BI/Tableau/Excel, and run root-cause analysis that turned
            into real process fixes, including a 15% reduction in cycle time at Beta
            Code Technologies and measurable gains in reporting accuracy at Walmart
            Canada and Voluntary Nature Conservancy.
          </p>
          <p className="text-justify text-base leading-relaxed text-muted">
            What sets me apart is the engineering depth behind the analysis: an M.Sc. in
            Computer Science, production experience with LLMs, RAG, computer vision, and
            MLOps pipelines. When a reporting problem needs automation, a predictive
            model, or an AI-assisted workflow, I can build it myself instead of just
            flagging it to engineering.
          </p>
        </div>
      </div>
    </section>
  );
}
