"use client";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { trackEvent } from "@/lib/analytics";
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
        <p className="text-base font-semibold tracking-tight leading-snug text-foreground">{cert.name}</p>
        <p className="mt-1.5 text-xs text-muted">{cert.issuer}</p>
        <p className="text-xs text-muted">{cert.date}</p>
      </div>
    ),
    details: (
      <a
        href={cert.href}
        onClick={() => trackEvent("credential_click", { certification: cert.name })}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-on-accent press hover:bg-accent-hover"
      >
        Show Credentials
        <FaArrowUpRightFromSquare className="h-3 w-3" />
      </a>
    ),
  }));

  return <PerspectiveCarousel items={items} label="Certifications" heightClassName="h-[260px]" />;
}
