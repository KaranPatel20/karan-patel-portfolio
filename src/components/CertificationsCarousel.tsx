"use client";

import {
  FaArrowUpRightFromSquare,
  FaBrain,
  FaCertificate,
  FaGoogle,
  FaMicrosoft,
} from "react-icons/fa6";
import { SiTensorflow } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import PerspectiveCarousel from "@/components/ui/perspective-carousel";

// Icons are chosen by key here (not passed as elements) so the server page only sends plain data.
const icons = {
  microsoft: FaMicrosoft,
  google: FaGoogle,
  tensorflow: SiTensorflow,
  brain: FaBrain,
  certificate: FaCertificate,
};

export type CertificationData = {
  name: string;
  issuer: string;
  date: string;
  href: string;
  icon: keyof typeof icons;
};

export default function CertificationsCarousel({
  certifications,
}: {
  certifications: CertificationData[];
}) {
  const items = certifications.map((cert) => {
    const Icon = icons[cert.icon];
    return {
      id: cert.name,
      title: cert.name,
      summary: (
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold tracking-tight leading-snug text-foreground">
              {cert.name}
            </p>
            <p className="mt-1.5 text-xs text-muted">{cert.issuer}</p>
            <p className="text-xs text-muted">{cert.date}</p>
          </div>
        </div>
      ),
      details: (
        <a
          href={cert.href}
          onClick={() =>
            trackEvent("credential_click", { certification: cert.name })
          }
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-on-accent press hover:bg-accent-hover"
        >
          Show Credentials
          <FaArrowUpRightFromSquare className="h-3 w-3" />
        </a>
      ),
    };
  });

  return (
    <PerspectiveCarousel
      items={items}
      label="Certifications"
      heightClassName="h-[260px]"
    />
  );
}
