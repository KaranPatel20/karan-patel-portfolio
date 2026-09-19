type Role = {
  title: string;
  company: string;
  note?: string;
  period: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    title: "Technical Lead (Volunteer)",
    company: "Voluntary Nature Conservancy",
    note: "Includes concurrent Data Analyst Intern scope, Jan 2026 – Present",
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
    period: "Aug 2025 – Dec 2025",
    bullets: [
      "Monitored feature performance and data quality in production, tracking latency, error rates, and reliability metrics to catch and resolve issues early.",
      "Built and maintained real-time inference data pipelines, owning requirements for data collection, preprocessing, and model update cycles.",
      "Integrated mobile apps with AI/ML APIs (image recognition, NLP, recommendation engines), improving feature delivery speed 30% and cutting inference latency 25%.",
      "Managed full app release cycles on Google Play and Apple App Store, enforcing security, privacy compliance (GDPR/PIPEDA), and version rollout strategies.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">Experience</h2>
        <div className="mt-6 space-y-10">
          {roles.map((role) => (
            <div key={`${role.company}-${role.title}`} className="grid gap-2 sm:grid-cols-[1fr_2.5fr] sm:gap-8">
              <div>
                <p className="text-sm font-semibold text-foreground">{role.title}</p>
                <p className="text-sm text-muted">{role.company}</p>
                <p className="mt-1 text-xs text-muted">{role.period}</p>
                {role.note && (
                  <p className="mt-1 text-xs italic text-muted">{role.note}</p>
                )}
              </div>
              <ul className="space-y-2 border-l border-border pl-5">
                {role.bullets.map((bullet, i) => (
                  <li key={i} className="text-justify text-sm leading-relaxed text-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
