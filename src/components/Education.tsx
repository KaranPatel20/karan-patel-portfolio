import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const education = [
  {
    degree: "M.Sc. Computer Science",
    school: "Lakehead University, Thunder Bay, Canada",
    logo: "/logos/lakehead-crest.png",
    period: "Sep 2022 – May 2024",
    detail: "GPA: 3.88 / 4.0",
  },
  {
    degree: "B.Tech, Information Technology",
    school: "Charotar University of Science and Technology, India",
    logo: "/logos/charusat.png",
    period: "Jul 2018 – May 2022",
    detail: "GPA: 3.80 / 4.0",
  },
];

export default function Education() {
  return (
    <section id="education" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="font-mono text-sm text-accent">Education</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {education.map((e, i) => (
            <ScrollReveal key={e.degree} delay={i * 80}>
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm">
                  <Image
                    src={e.logo}
                    alt={`${e.school} logo`}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                  <p className="text-sm text-muted">{e.school}</p>
                  <p className="text-xs text-muted">
                    {e.period} · {e.detail}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
