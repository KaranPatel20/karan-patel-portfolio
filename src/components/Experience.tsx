import Image from "next/image";
import Section from "@/components/Section";
import FaqAccordion from "@/components/ui/faq-accordion";
import { roles, type Role } from "@/data/portfolio";


function roleHeader(role: Role) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/10">
        <Image
          src={role.logo}
          alt={`${role.company} logo`}
          width={40}
          height={40}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-semibold tracking-tight text-foreground">{role.title}</p>
        <p className="truncate text-sm text-muted">{role.company}</p>
        <p className="mt-0.5 text-xs text-muted">{role.period}</p>
      </div>
    </div>
  );
}

function roleContent(role: Role) {
  return (
    <>
      {role.note && <p className="mb-3 text-xs italic text-muted">{role.note}</p>}
      <ul className="list-disc space-y-2 pl-5 marker:text-accent">
        {role.bullets.map((bullet, j) => (
          <li key={j} className="text-justify text-sm leading-relaxed text-muted hyphens-auto">
            {bullet}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Experience() {
  const items = roles.map((role) => ({
    id: `${role.company}-${role.title}`,
    header: roleHeader(role),
    content: roleContent(role),
  }));

  return (
    <Section id="experience" title="Experience" alt staggerContent>
      <FaqAccordion items={items} />
    </Section>
  );
}
