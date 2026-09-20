import ScrollReveal from "@/components/ScrollReveal";

const palette = ["#8b5cf6", "#3b82f6", "#10b981", "#f97316", "#ef4444", "#14b8a6", "#6366f1"];

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
  note: "Relevant if you're hiring for an AI/ML or technical analyst role.",
  items: [
    "Python (Pandas, NumPy, scikit-learn)",
    "LangChain / RAG / Agentic AI",
    "TensorFlow, PyTorch, CNNs, Transformers",
    "FastAPI, Flask, REST APIs",
    "MLflow, Airflow, Docker",
    "AWS / GCP / Azure",
    "Prompt engineering & LLM fine-tuning",
  ],
};

function SkillColumn({
  title,
  items,
  note,
  muted = false,
}: {
  title: string;
  items: string[];
  note?: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-transform hover:-translate-y-1 ${
        muted ? "border-dashed border-border" : "border-border bg-surface"
      }`}
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
      <div className="mt-4 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <div
            key={item}
            className="rounded-lg border-2 bg-surface px-4 py-2 text-sm font-medium text-foreground"
            style={{ borderColor: palette[i % palette.length] }}
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
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-sm text-accent">Skills, Tools &amp; Technologies</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 80}>
              <SkillColumn title={group.title} items={group.items} />
            </ScrollReveal>
          ))}
          <ScrollReveal delay={primary.length * 80}>
            <SkillColumn
              title={secondary.title}
              items={secondary.items}
              note={secondary.note}
              muted
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
