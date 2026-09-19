type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    title: "Data Analyst Intern",
    company: "Voluntary Nature Conservancy",
    location: "Rudolph, USA",
    period: "Jan 2026 – Present",
    bullets: [
      "Gathered requirements from non-technical program managers and developed 24 operational dashboards and 35 ad-hoc reports in Power BI and Excel to track KPIs, throughput, and data quality rates.",
      "Performed data validation and root-cause analysis on data quality issues and process delays; supported governance policies that improved completeness and consistency of operational reporting.",
      "Facilitated requirements prioritization with operations stakeholders in Agile delivery cycles, ensuring timely delivery of analytics deliverables.",
    ],
  },
  {
    title: "General Merchandise Department Manager",
    company: "Walmart Canada",
    location: "Ontario, Canada",
    period: "Oct 2024 – Present",
    bullets: [
      "Gathered and translated stakeholder requirements into Tableau dashboard specifications tracking sales, task completion, on-shelf availability, and inventory health, enabling real-time corrective action across departments.",
      "Improved department performance score by conducting root-cause and data validation analysis (bin accuracy, overstock, scanning gaps) and facilitating corrective-action plans with the team.",
      "Partnered with Assistant Store Managers to define reporting requirements and interpret operational reports, improving inventory accuracy through cross-functional facilitation.",
      "Led daily operations for a multi-associate team; facilitated stakeholder alignment on priorities, seasonal transitions, and company-wide initiative rollouts.",
    ],
  },
  {
    title: "AI Development Intern",
    company: "GoKidu Technologies Corp.",
    location: "Ottawa, Canada (Remote)",
    period: "Aug 2025 – Dec 2025",
    bullets: [
      "Monitored feature performance and validated data quality across production environments, tracking latency, error rates, and reliability metrics to identify and resolve service issues, reducing average inference latency by 25%.",
      "Built and maintained automated data pipelines for real-time inference, managing requirements for data collection, preprocessing, and model update cycles with 99%+ reliability.",
      "Integrated mobile apps with RESTful APIs and third-party AI/ML services (image recognition, NLP chatbots, recommendation engines), improving feature delivery speed by 30%.",
      "Managed full app release cycles on Google Play and Apple App Store, enforcing security and privacy compliance (GDPR/PIPEDA).",
    ],
  },
  {
    title: "Data Analyst",
    company: "Beta Code Technologies Pvt. Ltd.",
    location: "Bangalore, India",
    period: "Jun 2022 – Jul 2023",
    bullets: [
      "Documented business requirements and built SQL/Python models targeting operational KPIs, achieving a 15% improvement in process cycle times, validated through pre/post-implementation measurement.",
      "Designed automated monitoring and data validation pipelines to track data quality and error rates, proactively flagging anomalies and supporting root-cause and requirements traceability analysis.",
      "Produced recurring functional reports and stakeholder presentations in Excel and BI tools, serving as primary point of contact for cross-functional analytics and reporting requests.",
      "Designed and deployed end-to-end ML pipelines and FastAPI microservices for real-time data processing on datasets exceeding 10M+ records, cutting deployment time by 40% via MLflow, Airflow, and AWS SageMaker.",
    ],
  },
  {
    title: "Technical Lead (Volunteer)",
    company: "Voluntary Nature Conservancy",
    location: "Remote",
    period: "Jan 2022 – Dec 2025",
    bullets: [
      "Designed predictive models analyzing crowdfunding participation trends, improving event planning accuracy and boosting campaign engagement by 15%.",
      "Developed deep learning image classification models (CNNs) for automated spider species identification, achieving ~90% classification accuracy.",
      "Built automated data pipelines for preprocessing biological image datasets, reducing data preparation time by 60%.",
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
                <p className="mt-1 text-xs text-muted">{role.location}</p>
                <p className="text-xs text-muted">{role.period}</p>
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
