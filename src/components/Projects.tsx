import { FaMapLocationDot, FaBriefcase, FaChartLine, FaBug, FaXRay } from "react-icons/fa6";
import type { IconType } from "react-icons";

type Project = {
  name: string;
  tag: "Data & BI" | "AI/ML";
  stack: string;
  period: string;
  points: string[];
  links?: { label: string; href: string }[];
  Icon: IconType;
};

const projects: Project[] = [
  {
    name: "CrocWatch Data Submission Analytics",
    tag: "Data & BI",
    stack: "Power BI, Excel, SQL, Flutter, Firebase",
    period: "Mar 2026 – Present",
    Icon: FaMapLocationDot,
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
    points: [
      "Deep learning classifier (ResNet + Xception) detecting COVID-19, pneumonia, lung cancer, and brain tumors at ~92% accuracy.",
      "Deployed via Streamlit and presented at the Derbi Foundation Hackathon.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-mono text-sm text-accent">Projects</h2>
        <p className="mt-1 hidden text-xs text-muted sm:block">Hover a card for details.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const description = (
              <ul className="space-y-1.5">
                {project.points.map((point, j) => (
                  <li key={j} className="text-justify text-sm leading-relaxed text-muted">
                    {point}
                  </li>
                ))}
              </ul>
            );

            return (
              <div
                key={project.name}
                className="group rounded-[32px] border border-border bg-surface p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <project.Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-snug text-foreground">
                        {project.name}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          project.tag === "Data & BI"
                            ? "bg-accent-2-soft text-accent-2"
                            : "border border-border text-muted"
                        }`}
                      >
                        {project.tag}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted">{project.stack}</p>
                    <p className="text-xs text-muted">{project.period}</p>
                  </div>
                </div>

                {project.links && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-accent hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {/* Mobile: description always visible */}
                <div className="mt-3 sm:hidden">{description}</div>

                {/* Desktop: description revealed on hover */}
                <div className="hidden overflow-hidden opacity-0 transition-all duration-200 sm:block sm:max-h-0 group-hover:sm:mt-3 group-hover:sm:max-h-96 group-hover:sm:opacity-100">
                  {description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
