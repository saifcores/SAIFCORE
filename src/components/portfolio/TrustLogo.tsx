"use client";

import Image from "next/image";
import { useState } from "react";
import { resolveTrustLogoSrc } from "@/data/trust-brands";

type Props = {
  logo: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
};

export function TrustLogo({
  logo,
  className,
  width = 180,
  height = 72,
  sizes,
}: Props) {
  const [hasError, setHasError] = useState(false);
  const src = resolveTrustLogoSrc(logo);

  if (!logo.trim() || hasError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}
