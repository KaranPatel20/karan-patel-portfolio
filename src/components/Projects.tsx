import ProjectsBento, { type ProjectData } from "@/components/ProjectsBento";

const projects: ProjectData[] = [
  {
    name: "CrocWatch Data Submission Analytics",
    tag: "Data & BI",
    stack: "Power BI, Excel, SQL, Flutter, Firebase",
    period: "Mar 2026 – Present",
    icon: "map",
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
    icon: "briefcase",
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
    icon: "chart",
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
    icon: "bug",
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
    icon: "xray",
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
        <p className="mt-1 text-xs text-muted">Click a card for details.</p>
        <ProjectsBento projects={projects} />
      </div>
    </section>
  );
}
