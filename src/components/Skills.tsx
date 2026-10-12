import Section from "@/components/Section";
import SkillsFilter, { type SkillGroup } from "@/components/SkillsFilter";

const groups: SkillGroup[] = [
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

export default function Skills() {
  return (
    <Section id="skills" title="Skills, tools and technologies">
      <SkillsFilter groups={groups} />
    </Section>
  );
}
