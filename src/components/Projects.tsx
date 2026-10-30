import Section from "@/components/Section";
import ProjectsBento from "@/components/ProjectsBento";
import { projects } from "@/data/portfolio";


export default function Projects() {
  return (
    <Section id="projects" title="Projects" hint="Click a card for details.">
      <ProjectsBento projects={projects} />
    </Section>
  );
}
