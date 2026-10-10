import Section from "@/components/Section";
const primary = [
  {
    title: "Requirements & Analysis",
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
    items: ["Complex SQL queries", "MySQL", "MongoDB", "Data warehouse environments"],
  },
  {
    title: "Methods & Delivery",
    items: [
      "Agile delivery",
      "Root-cause analysis",
      "SLA tracking",
      "Stakeholder facilitation",
      "Continuous improvement (PDCA)",
    ],
  },
];

const secondary = {
  title: "AI/ML Engineering",
  items: [
    "Python",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "LangChain",
    "RAG",
    "Agentic AI",
    "TensorFlow",
    "PyTorch",
    "CNNs",
    "Transformers",
    "FastAPI",
    "Flask",
    "REST APIs",
    "MLflow",
    "Airflow",
    "Docker",
    "AWS",
    "GCP",
    "Azure",
    "Prompt engineering",
    "LLM fine-tuning",
  ],
};

function SkillColumn({
  title,
  items,
  className = "",
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-border bg-surface p-6 shadow-card transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <h3 className="text-base text-foreground">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-full bg-surface-2 px-3 py-1 text-xs text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills, tools and technologies">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {primary.map((group) => (
          <SkillColumn key={group.title} title={group.title} items={group.items} />
        ))}
        <SkillColumn
          title={secondary.title}
          items={secondary.items}
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>
    </Section>
  );
}
