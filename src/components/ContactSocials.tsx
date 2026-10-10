"use client";

import { trackEvent } from "@/lib/analytics";
import { FaEnvelope, FaLinkedin, FaGithub, FaMedium } from "react-icons/fa6";
import { MaskedAvatars, type MaskedAvatar } from "@/components/ui/masked-avatars";

const socials = [
  { name: "Email", href: "mailto:karankp20120@gmail.com", platform: "email", icon: <FaEnvelope /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/karanpatel20120", platform: "linkedin", icon: <FaLinkedin /> },
  { name: "GitHub", href: "https://github.com/KaranPatel20", platform: "github", icon: <FaGithub /> },
  { name: "Medium", href: "https://medium.com/@karanpatel20", platform: "medium", icon: <FaMedium /> },
];

export default function ContactSocials() {
  const avatars: MaskedAvatar[] = socials.map(({ platform, ...item }) => ({
    ...item,
    onClick: () => trackEvent("social_click", { platform, location: "contact" }),
  }));

  return (
    <div className="mt-16 flex justify-center">
      <MaskedAvatars avatars={avatars} size={60} column={50} border={4} movement={0.55} />
    </div>
  );
}
