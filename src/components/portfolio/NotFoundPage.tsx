import type { Locale } from "next-intl";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NotFoundContent } from "./NotFoundContent";

type Props = {
  locale: Locale;
};

export async function NotFoundPage({ locale }: Props) {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main
        id="main-content"
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 pb-28 xl:pb-16"
        tabIndex={-1}
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div
          className="ambient-glow pointer-events-none absolute -top-24 left-1/2 h-72 w-[min(90vw,480px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-600/20 via-blue-500/8 to-transparent blur-3xl"
          aria-hidden
        />
        <NotFoundContent locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
