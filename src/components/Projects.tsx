import { FaMapLocationDot, FaBriefcase, FaChartLine, FaBug, FaXRay } from "react-icons/fa6";
import type { IconType } from "react-icons";
import ScrollReveal from "@/components/ScrollReveal";

type Project = {
  name: string;
  tag: "Data & BI" | "AI/ML";
  stack: string;
  period: string;
  points: string[];
  links?: { label: string; href: string }[];
  Icon: IconType;
  gradient: string;
};

const projects: Project[] = [
  {
    name: "CrocWatch Data Submission Analytics",
    tag: "Data & BI",
    stack: "Power BI, Excel, SQL, Flutter, Firebase",
    period: "Mar 2026 – Present",
    Icon: FaMapLocationDot,
    gradient: "from-teal-500 to-emerald-400",
    points: [
      "Built CrocWatch end to end (Flutter, Firebase), an offline crocodile-sighting app for India's conservation researchers, using AI-assisted development under my own architecture and review.",
      "Designed the Power BI/Excel reporting layer tracking submission volume and reviewer workload, cutting validation delays.",
    ],
    links: [
      { label: "Website", href: "https://crocwatch.app/" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.crocwatch.latestapp",
      },
      { label: "App Store", href: "https://apps.apple.com/ua/app/croc-watch/id1598145012" },
    ],
  },
  {
    name: "PositionTrackr: Automated Job Scraping & Analysis",
    tag: "Data & BI",
    stack: "Python, Google Apps Script, Gemini API, Google Sheets",
    period: "Mar 2025",
    Icon: FaBriefcase,
    gradient: "from-blue-500 to-cyan-400",
    points: [
      "Automated Python pipeline scraping and classifying tech job listings, cutting manual tracking effort by ~80%.",
      "Used the Gemini API to structure job metadata into a live, filterable Google Sheets dashboard.",
    ],
  },
  {
    name: "AI-Powered Stock Technical Analysis Bot",
    tag: "AI/ML",
    stack: "n8n, LangChain, Google Gemini, Telegram Bot API",
    period: "Dec 2025",
    Icon: FaChartLine,
    gradient: "from-emerald-500 to-teal-400",
    points: [
      "Agentic stock analysis bot (n8n, LangChain) with session memory for multi-turn Telegram conversations.",
      "Applies 200-day EMA and RAG-style context retrieval for automated trend detection.",
    ],
    links: [{ label: "Try the bot", href: "https://t.me/karanpateln8n_bot" }],
  },
  {
    name: "BugNet: Insect Species Classification (291 Classes)",
    tag: "AI/ML",
    stack: "Transfer Learning, TensorFlow, OpenCV, Pandas",
    period: "Sep 2023 – Apr 2024",
    Icon: FaBug,
    gradient: "from-lime-500 to-green-400",
    points: [
      "Fine-tuned CNNs on a 291-class insect image dataset, reaching ~86% species-level accuracy.",
      "Built an augmentation pipeline validated with entomology experts.",
    ],
  },
  {
    name: "NeuroXRay: Radiogenomic Medical Image Classifier",
    tag: "AI/ML",
    stack: "TensorFlow, ResNet, Xception, Streamlit, Optuna",
    period: "Jun 2021 – Dec 2021",
    Icon: FaXRay,
    gradient: "from-indigo-500 to-purple-400",
    points: [
      "Deep learning classifier (ResNet + Xception) detecting COVID-19, pneumonia, lung cancer, and brain tumors at ~92% accuracy.",
      "Deployed via Streamlit and presented at the Derbi Foundation Hackathon.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-mono text-sm text-accent">Projects</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 60}>
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div
                  className={`flex h-24 w-full items-center justify-center bg-gradient-to-br ${project.gradient}`}
                >
                  <project.Icon className="h-9 w-9 text-white/90" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        project.tag === "Data & BI"
                          ? "bg-accent-soft text-accent"
                          : "border border-border text-muted"
                      }`}
                    >
                      {project.tag}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted">{project.stack}</p>
                  <p className="text-xs text-muted">{project.period}</p>
                  <ul className="mt-3 space-y-1.5">
                    {project.points.map((point, j) => (
                      <li key={j} className="text-justify text-sm leading-relaxed text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {project.links && (
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-medium text-accent hover:underline"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
