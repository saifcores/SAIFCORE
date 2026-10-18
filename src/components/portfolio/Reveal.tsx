"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLayoutEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.height > 0 && rect.top < window.innerHeight - 16 && rect.bottom > 16;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = prefersReducedMotion || revealed;

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const show = () => setRevealed(true);
    if (isInViewport(el)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "64px 0px 0px 0px" },
    );
    observer.observe(el);

    const frame = window.requestAnimationFrame(() => {
      if (isInViewport(el)) {
        show();
        observer.disconnect();
      }
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay:
          visible && !prefersReducedMotion && revealed ? `${delay}ms` : "0ms",
      }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
