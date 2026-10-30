import Section from "@/components/Section";
import { aboutText } from "@/data/portfolio";

export default function About() {
  return (
    <Section id="about" title="About" alt>
      <p className="text-justify text-base leading-relaxed text-muted hyphens-auto">{aboutText}</p>
    </Section>
  );
}
