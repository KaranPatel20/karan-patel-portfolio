import Image from "next/image";
import Section from "@/components/Section";
import { education } from "@/data/portfolio";
import { RevealItem } from "@/components/Reveal";
import { card, cardGap } from "@/lib/layout";


export default function Education() {
  return (
    <Section id="education" title="Education" alt staggerContent>
      <div className={`grid ${cardGap} sm:grid-cols-2`}>
        {education.map((e, i) => (
          <RevealItem key={e.degree} order={i + 1} className={`flex gap-4 ${card}`}>
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
          </RevealItem>
        ))}
      </div>
    </Section>
  );
}
