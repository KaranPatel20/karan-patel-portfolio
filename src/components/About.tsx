import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-mono text-sm text-accent">About</h2>
        <div className="mt-4 grid gap-8 sm:grid-cols-[1.3fr_1fr]">
          <ScrollReveal>
            <p className="text-justify text-base leading-relaxed text-muted">
              I like sitting between the people who need answers and the data that has them. Across Walmart, 
              a wildlife conservation nonprofit, and a couple of tech teams, I&apos;ve spent the last few years 
              gathering requirements, building dashboards, and chasing down why the numbers didn&apos;t add up.


            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-justify text-base leading-relaxed text-muted">
              What sets me apart is that I don&apos;t stop at analysis. With an M.Sc. in Computer Science, 
              I&apos;m just as comfortable in an ML pipeline as I am in a spreadsheet, and honestly, I&apos;d rather 
              build the solution myself than just hand off a recommendation. CrocWatch, a citizen-science 
              app I built from scratch, is a good example of that. When I&apos;m not coding, you&apos;ll probably find 
              me out in nature, hiking or with a camera in hand.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
