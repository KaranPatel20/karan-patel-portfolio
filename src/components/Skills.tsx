import Section from "@/components/Section";
import SkillsFilter from "@/components/SkillsFilter";
import { groups } from "@/data/portfolio";


export default function Skills() {
  return (
    <Section id="skills" title="Skills, tools and technologies">
      <SkillsFilter groups={groups} />
    </Section>
  );
}
