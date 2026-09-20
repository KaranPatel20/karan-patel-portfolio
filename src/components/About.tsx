import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">About</h2>
        <div className="mt-4 grid gap-8 sm:grid-cols-[1.3fr_1fr]">
          <ScrollReveal>
            <p className="text-justify text-base leading-relaxed text-muted">
              I like sitting between the people who need answers and the data that has
              them. Over the last few years at Walmart, a wildlife conservation
              nonprofit, and a couple of tech teams, I&apos;ve gathered requirements,
              built dashboards, and chased down why the numbers didn&apos;t add up.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-justify text-base leading-relaxed text-muted">
              What&apos;s a little different about me is that I don&apos;t stop at the
              analysis. I have an M.Sc. in Computer Science, I built a citizen-science
              app (CrocWatch) from scratch, and I&apos;m just as comfortable in an ML
              pipeline as I am in a spreadsheet. If something needs building, I&apos;d
              rather build it than hand it off.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
