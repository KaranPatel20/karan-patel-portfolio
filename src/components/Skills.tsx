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
      className={`rounded-lg bg-surface p-5 elev-hover ${className}`}
    >
      <h3 className="text-[17px] font-medium leading-tight text-foreground">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-md bg-neutral-800 px-2.5 py-[3px] text-[11px] tracking-[0.02em] text-neutral-100 transition-colors hover:bg-accent-800 hover:text-accent-100"
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
    <section id="skills" className="rule-top">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-16">
        <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-accent">Skills, Tools &amp; Technologies</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((group) => (
            <SkillColumn key={group.title} title={group.title} items={group.items} />
          ))}
          <SkillColumn
            title={secondary.title}
            items={secondary.items}
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
