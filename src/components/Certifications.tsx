import Section from "@/components/Section";
import CertificationsCarousel from "@/components/CertificationsCarousel";
import { certifications } from "@/data/portfolio";


export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications" hint="Swipe, use the arrows, or click a side card.">
      <CertificationsCarousel certifications={certifications} />
    </Section>
  );
}
