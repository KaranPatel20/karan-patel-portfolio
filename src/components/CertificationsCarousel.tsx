"use client";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import PerspectiveCarousel from "@/components/ui/perspective-carousel";

export type CertificationData = {
  name: string;
  issuer: string;
  date: string;
  href: string;
};

export default function CertificationsCarousel({ certifications }: { certifications: CertificationData[] }) {
  const items = certifications.map((cert) => ({
    id: cert.name,
    title: cert.name,
    summary: (
      <div>
        <p className="font-mono text-base leading-snug text-foreground">{cert.name}</p>
        <p className="mt-2 text-xs text-muted">{cert.issuer}</p>
        <p className="text-xs text-muted">{cert.date}</p>
      </div>
    ),
    details: (
      <a
        href={cert.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        Show Credentials
        <FaArrowUpRightFromSquare className="h-3 w-3" />
      </a>
    ),
  }));

  return <PerspectiveCarousel items={items} label="Certifications" heightClassName="h-[260px]" className="mt-6" />;
}
