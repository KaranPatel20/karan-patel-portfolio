import Image from "next/image";
import Section from "@/components/Section";
import FaqAccordion from "@/components/ui/faq-accordion";

type Role = {
  title: string;
  company: string;
  logo: string;
  note?: string;
  period: string;
  bullets: string[];
};

const roles: Role[] = [
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

function roleHeader(role: Role) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/10">
        <Image
          src={role.logo}
          alt={`${role.company} logo`}
          width={40}
          height={40}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-semibold tracking-tight text-foreground">{role.title}</p>
        <p className="truncate text-sm text-muted">{role.company}</p>
        <p className="mt-0.5 text-xs text-muted">{role.period}</p>
      </div>
    </div>
  );
}

function roleContent(role: Role) {
  return (
    <>
      {role.note && <p className="mb-3 text-xs italic text-muted">{role.note}</p>}
      <ul className="list-disc space-y-2 pl-5 marker:text-accent">
        {role.bullets.map((bullet, j) => (
          <li key={j} className="text-justify text-sm leading-relaxed text-muted hyphens-auto">
            {bullet}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Experience() {
  const items = roles.map((role) => ({
    id: `${role.company}-${role.title}`,
    header: roleHeader(role),
    content: roleContent(role),
  }));

  return (
    <Section id="experience" title="Experience" alt>
      <FaqAccordion items={items} />
    </Section>
  );
}
