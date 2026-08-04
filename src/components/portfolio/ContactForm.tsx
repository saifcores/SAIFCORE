"use client";

import { useId, useState } from "react";
import { useLocale } from "next-intl";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import {
  getCalendlyUrl,
  getContactMailto,
  getGithubUrl,
  getLinkedinUrl,
} from "@/site";

type Props = {
  subject: string;
  formEnabled: boolean;
  formName: string;
  formEmail: string;
  formCompany: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;
  formSuccessHint: string;
  formSendAnother: string;
  formError: string;
  formNote: string;
  formUnavailable: string;
  bookCall: string;
  calendlyHint: string;
  calendlyFallbackHint: string;
  socialTitle: string;
  linkedinLabel: string;
  githubLabel: string;
  emailLabel: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({
  subject,
  formEnabled,
  formName,
  formEmail,
  formCompany,
  formMessage,
  formMessagePlaceholder,
  formSubmit,
  formSending,
  formSuccess,
  formSuccessHint,
  formSendAnother,
  formError,
  formNote,
  formUnavailable,
  bookCall,
  calendlyHint,
  calendlyFallbackHint,
  socialTitle,
  linkedinLabel,
  githubLabel,
  emailLabel,
}: Props) {
  const locale = useLocale();
  const formDomId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isSending = status === "sending";
  const isSuccess = status === "success";

  const clearStatusIfNeeded = () => {
    if (status === "error" || status === "success") setStatus("idle");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setWebsite("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEnabled || isSending) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          subject,
          locale: locale === "fr" ? "fr" : "en",
          website,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setWebsite("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const directMail = getContactMailto(subject);
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const hasCalendly = getCalendlyUrl() != null;

  const statusMessage =
    status === "error" ? formError : formEnabled ? formNote : formUnavailable;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_minmax(220px,280px)] md:gap-10 lg:gap-12">
      {isSuccess ? (
        <div
          className="surface-panel order-last rounded-2xl p-5 text-left sm:p-8 md:order-none"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
            SAIFCORE
          </p>
          <h3 className="mt-3 text-pretty text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
            {formSuccess}
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
            {formSuccessHint}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {hasCalendly ? (
              <BookCallLink className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm">
                {bookCall}
              </BookCallLink>
            ) : null}
            <button
              type="button"
              onClick={resetForm}
              className="btn-outline inline-flex min-h-12 items-center justify-center px-6 text-sm"
            >
              {formSendAnother}
            </button>
          </div>
        </div>
      ) : (
        <form
          id={formDomId}
          onSubmit={handleSubmit}
          className="surface-panel order-last rounded-2xl p-5 text-left sm:p-8 md:order-none"
          aria-label={formSubmit}
          aria-busy={isSending}
        >
          <fieldset
            className="grid gap-4 sm:grid-cols-2"
            disabled={!formEnabled || isSending}
          >
            <legend className="sr-only">{formSubmit}</legend>
            <label className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <span>Website</span>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formName}
              </span>
              <input
                required
                name="name"
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(e) => {
                  clearStatusIfNeeded();
                  setName(e.target.value);
                }}
                disabled={!formEnabled || isSending}
                className="input-field min-h-11 px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formEmail}
              </span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                value={email}
                onChange={(e) => {
                  clearStatusIfNeeded();
                  setEmail(e.target.value);
                }}
                disabled={!formEnabled || isSending}
                className="input-field min-h-11 px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formCompany}
              </span>
              <input
                name="company"
                autoComplete="organization"
                maxLength={120}
                value={company}
                onChange={(e) => {
                  clearStatusIfNeeded();
                  setCompany(e.target.value);
                }}
                disabled={!formEnabled || isSending}
                className="input-field min-h-11 px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formMessage}
              </span>
              <textarea
                required
                name="message"
                rows={5}
                minLength={10}
                maxLength={5000}
                value={message}
                onChange={(e) => {
                  clearStatusIfNeeded();
                  setMessage(e.target.value);
                }}
                placeholder={formMessagePlaceholder}
                disabled={!formEnabled || isSending}
                className="input-field min-h-[8.5rem] resize-y px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>
          </fieldset>
          <div className="mt-4 border-t border-[var(--border-subtle)] pt-4 sm:mt-6 sm:border-0 sm:pt-0">
            <button
              type="submit"
              disabled={!formEnabled || isSending}
              aria-describedby="contact-form-note"
              className="btn-primary inline-flex min-h-12 w-full items-center justify-center px-6 text-sm sm:w-auto sm:px-8"
            >
              {isSending ? formSending : formSubmit}
            </button>
            <p
              id="contact-form-note"
              role={status === "error" ? "alert" : undefined}
              aria-live={status === "error" ? "assertive" : "polite"}
              className={`mt-3 text-pretty text-xs leading-relaxed ${
                status === "error" ? "text-red-400" : "text-[var(--text-muted)]"
              }`}
            >
              {statusMessage}
            </p>
          </div>
        </form>
      )}

      <aside className="order-first grid gap-4 min-[480px]:grid-cols-2 md:order-none md:flex md:flex-col md:gap-6">
        <div className="surface-panel rounded-2xl p-5 sm:p-6">
          <BookCallLink
            className={`${hasCalendly ? "btn-primary" : "btn-outline"} inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold sm:px-6`}
          >
            {bookCall}
          </BookCallLink>
          <p className="mt-3 text-center text-xs leading-relaxed text-[var(--text-muted)]">
            {hasCalendly ? calendlyHint : calendlyFallbackHint}
          </p>
        </div>
        {linkedinUrl || githubUrl || directMail ? (
          <div className="surface-panel rounded-2xl p-5 sm:p-6 min-[480px]:col-span-2 md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {socialTitle}
            </p>
            <ul className="mt-4 space-y-1">
              {linkedinUrl ? (
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {linkedinLabel}
                  </a>
                </li>
              ) : null}
              {githubUrl ? (
                <li>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {githubLabel}
                  </a>
                </li>
              ) : null}
              {directMail ? (
                <li>
                  <a
                    href={directMail}
                    className="inline-flex min-h-11 w-full items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {emailLabel}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
