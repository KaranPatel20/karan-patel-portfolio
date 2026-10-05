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
      className={`rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-md ${className}`}
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-accent"
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
    <section id="skills" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="font-mono text-sm text-accent">Skills, Tools &amp; Technologies</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((group) => (
            <SkillColumn key={group.title} title={group.title} items={group.items} />
          ))}
          <SkillColumn
            title={secondary.title}
            items={secondary.items}
            className="sm:col-span-2 lg:col-span-3"
          />
        </div>
      </div>
    </section>
  );
}
