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
  actionVariant?: ActionBarVariant;
};

export async function PageHeader({
  title,
  subtitle,
  backLabel,
  showFacts = false,
  actionVariant = "balanced",
}: Props) {
  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >
            ← {backLabel}
          </Link>
          <h1 className="mt-5 font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:mt-6 sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>

          {showFacts ? <ProfileFactChips className="mt-5 sm:mt-6" /> : null}

          <RecruiterActionBar
            className="mt-6 sm:mt-8"
            variant={actionVariant}
          />
        </Reveal>
      </div>
    </section>
  );
}
