export default function About() {
  return (
    <section id="about" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-mono text-sm text-accent">About</h2>
        <div className="mt-8 grid gap-8">
          <p className="text-justify text-base leading-relaxed text-muted">
            I sit between the people who need answers and the data that has them. A couple of
            years in retail, a wildlife nonprofit, and some tech teams taught me to gather
            requirements, build dashboards, and chase down why the numbers didn't add up, and
            an M.Sc. in Computer Science means I'd rather build the solution than just hand it
            off. CrocWatch, a citizen-science app I built from scratch, is proof of that. When
            I'm not coding, you'll probably find me out in nature, hiking or with a camera in
            hand.
          </p>
        </div>
      </div>
    </section>
  );
}
