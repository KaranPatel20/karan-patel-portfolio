import Image from "next/image";

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
        <h2 className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-mono text-sm text-accent">Education</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {education.map((e) => (
            <div
              key={e.degree}
              className="flex gap-3 rounded-[32px] border border-border bg-surface p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
                <Image
                  src={e.logo}
                  alt={`${e.school} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-mono text-base text-foreground">{e.degree}</p>
                <p className="text-sm text-muted">{e.school}</p>
                <p className="text-xs text-muted">
                  {e.period} · {e.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
