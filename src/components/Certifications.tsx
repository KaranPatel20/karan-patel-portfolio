import Section from "@/components/Section";
import CertificationsCarousel from "@/components/CertificationsCarousel";

const certifications = [
  {
    name: "Harnessing the Power of Data with Power BI",
    issuer: "Coursera (Microsoft)",
    date: "Sep 2026",
    href: "https://coursera.org/share/9f281f04c9370fff7f8c7a9813dc07eb",
  },
  {
    name: "Preparing Data for Analysis with Microsoft Excel",
    issuer: "Coursera (Microsoft)",
    date: "Aug 2026",
    href: "https://coursera.org/share/7c69c7b1ebfc1c70378d241bd332a7d1",
  },
  {
    name: "Machine Learning in Production",
    issuer: "DeepLearning.AI",
    date: "May 2026",
    href: "https://coursera.org/share/0ba444525a2508539daea61db5b66344",
  },
  {
    name: "Oracle Generative AI Professional",
    issuer: "Oracle",
    date: "Oct 2025",
    href: "https://drive.google.com/file/d/1HZApNai0pe1iOnR59PgtpIRwN2cWe5oE/view?usp=drive_link",
  },
  {
    name: "Foundations: Data, Data, Everywhere",
    issuer: "Coursera (Google)",
    date: "Jan 2024",
    href: "https://www.coursera.org/learn/foundations-data",
  },
  {
    name: "Basic Image Classification with TensorFlow",
    issuer: "Coursera",
    date: "Jan 2024",
    href: "https://www.coursera.org/projects/tensorflow-beginner-basic-image-classification",
  },
  {
    name: "Introduction to TensorFlow for AI, ML & Deep Learning",
    issuer: "Coursera (DeepLearning.AI)",
    date: "Jul 2021",
    href: "https://www.coursera.org/learn/introduction-tensorflow",
  },
];

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications" hint="Swipe, use the arrows, or click a side card.">
      <CertificationsCarousel certifications={certifications} />
    </Section>
  );
}
