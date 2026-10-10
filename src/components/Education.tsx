import Image from "next/image";
import Section from "@/components/Section";

const education = [
  {
    degree: "M.Sc. Computer Science",
    school: "Lakehead University, Thunder Bay, Canada",
    logo: "/logos/lakehead-crest.png",
    period: "Sep 2022 â€“ May 2024",
    detail: "GPA: 3.88 / 4.0",
  },
  {
    degree: "B.Tech, Information Technology",
    school: "Charotar University of Science and Technology, India",
    logo: "/logos/charusat.png",
    period: "Jul 2018 â€“ May 2022",
    detail: "GPA: 3.80 / 4.0",
  },
];

export default function Education() {
  return (
    <Section id="education" title="Education" alt>
      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((e) => (
          <div
            key={e.degree}
            className="flex gap-4 rounded-[28px] border border-border bg-surface p-6 shadow-card"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/10">
              <Image
                src={e.logo}
                alt={`${e.school} logo`}
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-base text-foreground">{e.degree}</h3>
              <p className="mt-0.5 text-sm text-muted">{e.school}</p>
              <p className="mt-0.5 text-xs text-muted">
                {e.period} · {e.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
