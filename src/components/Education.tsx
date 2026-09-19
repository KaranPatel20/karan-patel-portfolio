const education = [
  {
    degree: "M.Sc. Computer Science",
    school: "Lakehead University, Thunder Bay, Canada",
    period: "Sep 2022 – May 2024",
    detail: "GPA: 3.88 / 4.0",
  },
  {
    degree: "B.Tech, Information Technology",
    school: "Charotar University of Science and Technology, India",
    period: "Jul 2018 – May 2022",
    detail: "GPA: 3.80 / 4.0",
  },
];

const certifications = [
  { name: "Preparing Data for Analysis with Microsoft Excel", date: "Sep 2026" },
  { name: "Oracle Generative AI Professional", date: "Oct 2025" },
  { name: "Foundations: Data, Data, Everywhere (Google)", date: "Jan 2024" },
  { name: "Basic Image Classification with TensorFlow", date: "Jan 2024" },
  { name: "Introduction to TensorFlow for AI, ML & Deep Learning", date: "Jul 2021" },
];

export default function Education() {
  return (
    <section id="education" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">Education &amp; Certifications</h2>
        <div className="mt-6 grid gap-10 sm:grid-cols-2">
          <div className="space-y-6">
            {education.map((e) => (
              <div key={e.degree}>
                <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                <p className="text-sm text-muted">{e.school}</p>
                <p className="text-xs text-muted">
                  {e.period} · {e.detail}
                </p>
              </div>
            ))}
          </div>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted">{c.name}</span>
                <span className="shrink-0 text-xs text-muted">{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
