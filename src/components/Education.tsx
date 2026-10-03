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
    <section id="education" className="rule-top">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-accent">Education</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {education.map((e) => (
            <div
              key={e.degree}
              className="flex gap-3 rounded-lg bg-surface p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                <Image
                  src={e.logo}
                  alt={`${e.school} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-medium text-base text-foreground">{e.degree}</p>
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
