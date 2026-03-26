"use client";

import type { ReactNode } from "react";
import { getCalendlyUrl } from "@/lib/site";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/**
 * Primary booking action: opens Calendly in a new tab when configured,
 * otherwise scrolls to `#contact`.
 */
export function BookCallLink({ className, children, onClick }: Props) {
  const calendly = getCalendlyUrl();
  const href = calendly ?? "#contact";
  const external = calendly != null;

  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      {...(external
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
