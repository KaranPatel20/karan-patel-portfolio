import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const certifications = [
  {
    name: "Preparing Data for Analysis with Microsoft Excel",
    issuer: "Coursera (Microsoft)",
    date: "Sep 2026",
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
    <section id="certifications" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-mono text-sm text-accent">Certifications</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group relative flex h-full flex-col justify-between rounded-[32px] border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-md"
            >
              <FaArrowUpRightFromSquare className="absolute right-5 top-5 h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pr-6">
                <p className="font-mono text-base text-foreground">{cert.name}</p>
                <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                <p className="text-xs text-muted">{cert.date}</p>
              </div>
              <a
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block w-fit rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Show Credentials
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
