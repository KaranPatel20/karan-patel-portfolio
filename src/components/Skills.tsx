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

const secondary = [
  "Python (Pandas, NumPy, scikit-learn)",
  "LangChain / RAG / Agentic AI",
  "TensorFlow, PyTorch, CNNs, Transformers",
  "FastAPI, Flask, REST APIs",
  "MLflow, Airflow, Docker, AWS / GCP / Azure",
  "Prompt engineering & LLM fine-tuning",
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">Skills</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {primary.map((group) => (
            <div key={group.title} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-dashed border-border p-5">
          <h3 className="text-sm font-semibold text-foreground">
            Also proficient in AI/ML engineering
          </h3>
          <p className="mt-1 text-sm text-muted">
            Relevant if you&apos;re hiring for an AI/ML or technical analyst role.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {secondary.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
