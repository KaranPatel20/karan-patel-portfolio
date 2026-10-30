// Single source of truth for the content the page renders and the assistant reads.
// Moved here verbatim from the components so the site and the "Ask my portfolio" corpus cannot
// drift apart. Task 0 (typed relationships between skills and projects) will extend this file.

export type Role = {
  title: string;
  company: string;
  logo: string;
  note?: string;
  period: string;
  bullets: string[];
};

export type ProjectIcon = "map" | "briefcase" | "chart" | "bug" | "xray";

export type Project = {
  name: string;
  tag: "Data & BI" | "AI/ML";
  stack: string;
  period: string;
  points: string[];
  links?: { label: string; href: string }[];
  icon: ProjectIcon;
};

export type SkillCategory = "data" | "software" | "ai" | "cloud" | "delivery";

export type SkillGroup = {
  title: string;
  category: SkillCategory;
  items: string[];
};

export type CertificationIcon = "microsoft" | "google" | "tensorflow" | "brain" | "certificate";

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  href: string;
  icon: CertificationIcon;
};

export type EducationEntry = {
  degree: string;
  school: string;
  logo: string;
  period: string;
  detail: string;
};

export const roles: Role[] = [
  {
    title: "Technical Lead (Volunteer)",
    company: "Voluntary Nature Conservancy",
    logo: "/logos/vnc_logo.png",
    note: "",
    period: "Jan 2022 – Present",
    bullets: [
      "Gathered requirements from non-technical program managers and built 24+ operational dashboards and 35 ad-hoc reports in Power BI and Excel to track KPIs, throughput, and data quality rates.",
      "Performed data validation and root-cause analysis on data quality issues and process delays, supporting governance policies that improved completeness and consistency of operational reporting.",
      "Facilitated requirements prioritization with operations stakeholders across Agile delivery cycles, keeping analytics deliverables on schedule.",
      "Designed predictive ML models analyzing crowdfunding participation trends, improving event planning accuracy and boosting campaign engagement by 15%.",
      "Developed CNN-based deep learning image classifiers (TensorFlow, PyTorch) for automated spider species identification, achieving ~90% classification accuracy.",
      "Built automated data pipelines for preprocessing biological image datasets, including augmentation, normalization, and feature extraction, cutting data prep time by 60%.",
    ],
  },
  {
    title: "Department Manager, General Merchandise",
    company: "Walmart Canada",
    logo: "/logos/walmart.svg",
    period: "Oct 2024 – Present",
    bullets: [
      "Converted stakeholder requirements into Tableau dashboards tracking sales, task completion, on-shelf availability, and inventory health across departments.",
      "Drove root-cause and data validation analysis on bin accuracy, overstock, and scanning gaps, turning findings into corrective-action plans that measurably improved department performance scores.",
      "Partnered with Assistant Store Managers to define reporting requirements and interpret operational reports, improving inventory accuracy through cross-functional facilitation.",
      "Led a multi-associate team through daily operations, seasonal transitions, and company-wide initiative rollouts, aligning priorities across the team.",
    ],
  },
  {
    title: "Data Analyst / ML Engineer",
    company: "Beta Code Technologies",
    logo: "/logos/betacode.png",
    period: "Jun 2022 – Jul 2023",
    bullets: [
      "Built SQL/Python models targeting operational KPIs, driving a 15% improvement in process cycle time, validated pre/post-implementation.",
      "Designed automated data validation and monitoring pipelines to track quality and error rates at scale (10M+ records), proactively surfacing anomalies.",
      "Built and deployed end-to-end ML pipelines and FastAPI microservices to put trained models into production, cutting API response time 20% and deployment time 40% via MLflow, Airflow, and AWS SageMaker.",
      "Delivered recurring functional reports and stakeholder presentations, serving as primary analytics point of contact between engineering and business teams.",
    ],
  },
  {
    title: "AI/ML Development Intern",
    company: "GoKidu Technologies Corp. (Remote)",
    logo: "/logos/gokidu.svg",
    period: "Aug 2025 – Dec 2025",
    bullets: [
      "Monitored feature performance and data quality in production, tracking latency, error rates, and reliability metrics to catch and resolve issues early.",
      "Built and maintained real-time inference data pipelines, owning requirements for data collection, preprocessing, and model update cycles.",
      "Integrated mobile apps with AI/ML APIs (image recognition, NLP, recommendation engines), improving feature delivery speed 30% and cutting inference latency 25%.",
      "Managed full app release cycles on Google Play and Apple App Store, enforcing security, privacy compliance (GDPR/PIPEDA), and version rollout strategies.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Living Flood Map",
    tag: "Data & BI",
    stack: "Python, sentence-transformers, Gemini API, Streamlit, Docker, OpenStreetMap",
    period: "Sept 2026 – Present",
    icon: "map",
    points: [
      "My teammate and I built this for a hackathon run by CE Strategies, a GIS company that works with First Nations communities on flood response.",
      "A free local model labels every tweet, and Gemini only reviews the ones it's unsure about, which kept us inside a tight API quota. It tells flood reports apart from noise like Stanley Cup chatter, then plots the places they mention.",
      "On 17,632 held-out tweets it reached F1 0.91, up from 0.65 for the local model alone."
    ],
    links: [
      { label: "Live Demo", href: "https://living-flood-map.streamlit.app/" },
      {
        label: "Github",
        href: "https://github.com/KaranPatel20/Hackathon",
      },
    ],
  },
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

export const groups: SkillGroup[] = [
  {
    title: "Requirements & Analysis",
    category: "data",
    items: [
      "Requirements gathering",
      "Functional specifications",
      "Process mapping",
      "Data mapping & validation",
      "Requirements traceability",
      "Gap analysis",
      "UAT support",
    ],
  },
  {
    title: "Analytics & BI",
    category: "data",
    items: [
      "Power BI",
      "Tableau",
      "Excel (advanced)",
      "Dashboard design",
      "KPI framework development",
      "Reporting automation",
    ],
  },
  {
    title: "Databases & SQL",
    category: "data",
    items: ["Complex SQL queries", "MySQL", "MongoDB", "Data warehouse environments"],
  },
  {
    title: "Software Development",
    category: "software",
    items: ["Python", "FastAPI", "Flask", "REST APIs", "Flutter", "Firebase"],
  },
  {
    title: "Machine Learning",
    category: "ai",
    items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch", "CNNs", "Transformers"],
  },
  {
    title: "Generative AI",
    category: "ai",
    items: ["LangChain", "RAG", "Agentic AI", "Prompt engineering", "LLM fine-tuning"],
  },
  {
    title: "Cloud & MLOps",
    category: "cloud",
    items: ["Docker", "AWS", "GCP", "Azure", "MLflow", "Airflow"],
  },
  {
    title: "Methods & Delivery",
    category: "delivery",
    items: [
      "Agile delivery",
      "Root-cause analysis",
      "SLA tracking",
      "Stakeholder facilitation",
      "Continuous improvement (PDCA)",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    degree: "M.Sc. Computer Science",
    school: "Lakehead University, Thunder Bay, Canada",
    logo: "/logos/lakehead-crest.png",
    period: "Sep 2022 – May 2024",
    detail: "GPA: 3.88 / 4.0",
  },
  {
    degree: "B.Tech, Information Technology",
    school: "Charotar University of Science and Technology, India",
    logo: "/logos/charusat.png",
    period: "Jul 2018 – May 2022",
    detail: "GPA: 3.80 / 4.0",
  },
];

export const certifications: Certification[] = [
    {
    name: "Extract, Transform and Load Data in Power BI",
    icon: "microsoft",
    issuer: "Coursera (Microsoft)",
    date: "Oct 2026",
    href: "https://coursera.org/share/4ce9fcf2df5431bd5b235003ab70da37",
  },
  {
    name: "Harnessing the Power of Data with Power BI",
    icon: "microsoft",
    issuer: "Coursera (Microsoft)",
    date: "Sep 2026",
    href: "https://coursera.org/share/9f281f04c9370fff7f8c7a9813dc07eb",
  },
  {
    name: "Preparing Data for Analysis with Microsoft Excel",
    icon: "microsoft",
    issuer: "Coursera (Microsoft)",
    date: "Aug 2026",
    href: "https://coursera.org/share/7c69c7b1ebfc1c70378d241bd332a7d1",
  },
  {
    name: "Machine Learning in Production",
    icon: "brain",
    issuer: "DeepLearning.AI",
    date: "May 2026",
    href: "https://coursera.org/share/0ba444525a2508539daea61db5b66344",
  },
  {
    name: "Oracle Generative AI Professional",
    icon: "certificate",
    issuer: "Oracle",
    date: "Oct 2025",
    href: "https://drive.google.com/file/d/1HZApNai0pe1iOnR59PgtpIRwN2cWe5oE/view?usp=drive_link",
  },
  {
    name: "Foundations: Data, Data, Everywhere",
    icon: "google",
    issuer: "Coursera (Google)",
    date: "Jan 2024",
    href: "https://www.coursera.org/learn/foundations-data",
  },
  {
    name: "Basic Image Classification with TensorFlow",
    icon: "tensorflow",
    issuer: "Coursera",
    date: "Jan 2024",
    href: "https://www.coursera.org/projects/tensorflow-beginner-basic-image-classification",
  },
  {
    name: "Introduction to TensorFlow for AI, ML & Deep Learning",
    icon: "tensorflow",
    issuer: "Coursera (DeepLearning.AI)",
    date: "Jul 2021",
    href: "https://www.coursera.org/learn/introduction-tensorflow",
  },
];

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 3, suffix: "+", label: "years in data and software" },
  { value: 5, suffix: "", label: "shipped projects" },
  { value: 6, suffix: "", label: "certifications" },
];

export const aboutText =
  "I sit between the people who need answers and the data that has them. A couple of years in retail, a wildlife nonprofit, and some tech teams taught me to gather requirements, build dashboards, and chase down why the numbers didn't add up, and an M.Sc. in Computer Science means I'd rather build the solution than just hand it off. CrocWatch, a citizen-science app I built from scratch, is proof of that. When I'm not coding, you'll probably find me out in nature, hiking or with a camera in hand.";

export const site = {
  name: "Karan Patel",
  title: "Data Analyst / Software Developer",
  location: "Mississauga, ON",
  email: "karankp20120@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/karanpatel20120",
    github: "https://github.com/KaranPatel20",
    medium: "https://medium.com/@karanpatel20",
  },
};
