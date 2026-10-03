"use client";

import { track } from "@vercel/analytics";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa6";
import { SiMedium } from "react-icons/si";
import SocialFlipButton, { type SocialItem } from "@/components/ui/social-flip-button";

const socials = [
  { label: "Email", letter: "E", href: "mailto:karankp20120@gmail.com", platform: "email", icon: <FaEnvelope /> },
  { label: "LinkedIn", letter: "L", href: "https://linkedin.com/in/karanpatel20120", platform: "linkedin", icon: <FaLinkedin /> },
  { label: "GitHub", letter: "G", href: "https://github.com/KaranPatel20", platform: "github", icon: <FaGithub /> },
  { label: "Medium", letter: "M", href: "https://medium.com/@karanpatel20", platform: "medium", icon: <SiMedium /> },
];

export default function ContactSocials() {
  const items: SocialItem[] = socials.map(({ platform, ...item }) => ({
    ...item,
    onClick: () => track("social_click", { platform, location: "contact" }),
  }));

  return <SocialFlipButton items={items} className="mt-6" />;
}
