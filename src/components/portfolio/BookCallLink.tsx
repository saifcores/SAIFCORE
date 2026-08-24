"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getCalendlyUrl } from "@/site";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/**
 * Primary booking action: opens Calendly in a new tab when configured,
 * otherwise navigates to the home contact section (locale-aware).
 */
export function BookCallLink({ className, children, onClick }: Props) {
  const calendly = getCalendlyUrl();

  if (calendly) {
    return (
      <a
        href={calendly}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href="/#contact" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
