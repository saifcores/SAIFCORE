import { Link } from "@/i18n/navigation";
import { ProfileFactChips } from "./ProfileFactChips";
import {
  RecruiterActionBar,
  type ActionBarVariant,
} from "./RecruiterActionBar";
import { Reveal } from "./Reveal";

type Props = {
  title: string;
  subtitle: string;
  backLabel: string;
  showFacts?: boolean;
  actionVariant?: ActionBarVariant | "none";
};

export async function PageHeader({
  title,
  subtitle,
  backLabel,
  showFacts = false,
  actionVariant = "balanced",
}: Props) {
  return (
    <section className="border-b border-[var(--border-subtle)] py-10 sm:py-12 md:py-16">
      <div className="page-container">
        <Reveal>
          <Link
            href="/"
            className="link-more min-h-11"
          >
            ← {backLabel}
          </Link>
          <h1 className="mt-5 max-w-[20ch] font-display text-pretty text-[clamp(1.85rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:mt-6">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>

          {showFacts ? <ProfileFactChips className="mt-5 sm:mt-6" /> : null}

          {actionVariant === "none" ? null : (
            <RecruiterActionBar
              className="mt-6 sm:mt-8"
              variant={actionVariant}
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
