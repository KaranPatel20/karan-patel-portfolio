type Project = {
  name: string;
  tag: "Data & BI" | "AI/ML";
  stack: string;
  period: string;
  points: string[];
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    name: "CrocWatch Data Submission Analytics",
    tag: "Data & BI",
    stack: "Power BI, Excel, SQL, Flutter, Firebase",
    period: "Mar 2026 – Present",
    points: [
      "Built CrocWatch end to end with Flutter and Firebase, a citizen-science app that lets forest officers and researchers log crocodile sightings across India offline, for review before they go on a public conservation map. Development was AI-assisted with Claude Code, but the architecture, code review, and testing were mine, not vibe-coded.",
      "Also designed the operational reporting layer behind it: a relational schema and Power BI/Excel dashboards tracking submission volume, validation turnaround, and reviewer workload, which cut validation delays and got approved sightings onto the map faster.",
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
    points: [
      "Engineered a fully automated, requirements-driven pipeline collecting and classifying tech job listings, reducing manual tracking effort by ~80%.",
      "Used the Gemini API to extract and structure job metadata (role, skills, location, seniority), feeding a live Google Sheets dashboard for filtering and prioritization.",
    ],
  },
  {
    name: "AI-Powered Stock Technical Analysis Bot",
    tag: "AI/ML",
    stack: "n8n, LangChain, Google Gemini, Telegram Bot API",
    period: "Dec 2025",
    points: [
      "Built an agentic stock analysis bot using n8n workflows and LangChain with session memory, enabling contextual multi-turn financial discussions via Telegram.",
      "Applied 200-day EMA and technical indicators for automated trend detection; integrated RAG-style context retrieval to maintain conversation history across sessions.",
    ],
    links: [{ label: "Try the bot", href: "https://t.me/karanpateln8n_bot" }],
  },
  {
    name: "BugNet: Insect Species Classification (291 Classes)",
    tag: "AI/ML",
    stack: "Transfer Learning, TensorFlow, OpenCV, Pandas",
    period: "Sep 2023 – Apr 2024",
    points: [
      "Fine-tuned CNN models using transfer learning on a 291-class insect image dataset; achieved ~86% species-level accuracy, reducing misclassifications by 20% vs. prior baselines.",
      "Collaborated with entomology experts for field validation; built a preprocessing pipeline with data augmentation to improve generalization.",
    ],
  },
  {
    name: "NeuroXRay: Radiogenomic Medical Image Classifier",
    tag: "AI/ML",
    stack: "TensorFlow, ResNet, Xception, Streamlit, Optuna",
    period: "Jun 2021 – Dec 2021",
    points: [
      "Built a deep learning classifier (ResNet + Xception) detecting COVID-19, Pneumonia, Lung Cancer, and Brain Tumors from radiological images, achieving ~92% accuracy with Optuna hyperparameter tuning.",
      "Deployed via a Streamlit web app, presented at the Derbi Foundation Hackathon.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">Projects</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col rounded-lg border border-border bg-surface p-5"
            >
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
                {project.points.map((point, i) => (
                  <li key={i} className="text-justify text-sm leading-relaxed text-muted">
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
          ))}
        </div>
      </div>
    </section>
  );
}
