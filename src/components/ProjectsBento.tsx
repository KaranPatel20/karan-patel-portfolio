"use client";

import { FaMapLocationDot, FaBriefcase, FaChartLine, FaBug, FaXRay } from "react-icons/fa6";
import ExpandableBentoGrid from "@/components/ui/expandable-bento-grid";

const icons = {
  map: FaMapLocationDot,
  briefcase: FaBriefcase,
  chart: FaChartLine,
  bug: FaBug,
  xray: FaXRay,
};

export type ProjectData = {
  name: string;
  tag: "Data & BI" | "AI/ML";
  stack: string;
  period: string;
  points: string[];
  links?: { label: string; href: string }[];
  icon: keyof typeof icons;
};

export default function ProjectsBento({ projects }: { projects: ProjectData[] }) {
  const items = projects.map((project) => {
    const Icon = icons[project.icon];
    return {
      id: project.name,
      title: project.name,
      subtitle: project.stack,
      period: project.period,
      tag: project.tag,
      icon: <Icon className="h-5 w-5" />,
      content: (
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          {project.points.map((point, j) => (
            <li key={j} className="text-sm leading-relaxed text-muted">
              {point}
            </li>
          ))}
        </ul>
      ),
      links: project.links,
    };
  });

  return <ExpandableBentoGrid items={items} className="mt-6" />;
}
