"use client";

import { trackEvent } from "@/lib/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventProps?: Record<string, string>;
  children: ReactNode;
};

export default function TrackedLink({
  event,
  eventProps,
  onClick,
  children,
  ...anchorProps
}: TrackedLinkProps) {
  return (
    <a
      {...anchorProps}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
