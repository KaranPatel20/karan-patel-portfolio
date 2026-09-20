import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import ScrollReveal from "@/components/ScrollReveal";

const certifications = [
  {
    name: "Preparing Data for Analysis with Microsoft Excel",
    issuer: "Coursera (Microsoft)",
    date: "Sep 2026",
    href: "https://www.coursera.org/learn/preparing-data-for-analysis-with-microsoft-excel",
  },
  {
    name: "Oracle Generative AI Professional",
    issuer: "Oracle",
    date: "Oct 2025",
    href: "https://learn.oracle.com/ols/course/oracle-cloud-infrastructure-generative-ai-professional/138070/136035",
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
    <section id="certifications" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-mono text-sm text-accent">Certifications</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 60}>
              <div className="group relative flex h-full flex-col justify-between rounded-lg border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                <FaArrowUpRightFromSquare className="absolute right-5 top-5 h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="pr-6">
                  <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                  <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                  <p className="text-xs text-muted">{cert.date}</p>
                </div>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block w-fit rounded-md border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Show Credentials
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
