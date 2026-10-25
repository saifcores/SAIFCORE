"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isContactIntent } from "@/contact-intent";
import { getContactMailto, getGithubUrl, getLinkedinUrl } from "@/site";

type Props = {
  subject: string;
  formEnabled: boolean;
  formName: string;
  formEmail: string;
  formCompany: string;
  formIntent: string;
  formIntentPlaceholder: string;
  formIntentHiring: string;
  formIntentFreelance: string;
  formIntentOther: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formMessagePlaceholderHiring: string;
  formMessagePlaceholderFreelance: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;
  formSuccessHint: string;
  formSendAnother: string;
  formError: string;
  formNote: string;
  formUnavailable: string;
  socialTitle: string;
  linkedinLabel: string;
  githubLabel: string;
  emailLabel: string;
  initialIntent?: string;
  showAside?: boolean;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({
  subject,
  formEnabled,
  formName,
  formEmail,
  formCompany,
  formIntent,
  formIntentPlaceholder,
  formIntentHiring,
  formIntentFreelance,
  formIntentOther,
  formMessage,
  formMessagePlaceholder,
  formMessagePlaceholderHiring,
  formMessagePlaceholderFreelance,
  formSubmit,
  formSending,
  formSuccess,
  formSuccessHint,
  formSendAnother,
  formError,
  formNote,
  formUnavailable,
  socialTitle,
  linkedinLabel,
  githubLabel,
  emailLabel,
  initialIntent = "",
  showAside = true,
}: Props) {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const opensInNewTab = tCommon("opensInNewTab");
  const formDomId = useId();
  const nameId = `${formDomId}-name`;
  const emailId = `${formDomId}-email`;
  const companyId = `${formDomId}-company`;
  const intentId = `${formDomId}-intent`;
  const messageId = `${formDomId}-message`;
  const noteId = `${formDomId}-note`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState(
    isContactIntent(initialIntent) ? initialIntent : "",
  );
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isSending = status === "sending";
  const isSuccess = status === "success";
  const messagePlaceholder =
    intent === "hiring"
      ? formMessagePlaceholderHiring
      : intent === "freelance"
        ? formMessagePlaceholderFreelance
        : formMessagePlaceholder;

  const clearStatusIfNeeded = () => {
    if (status === "error" || status === "success") setStatus("idle");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setIntent("");
    setMessage("");
    setWebsite("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEnabled || isSending) return;
    if (!isContactIntent(intent)) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          intent,
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

      resetForm();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const mailtoSubject = isContactIntent(intent)
    ? `${subject} · ${intent}`
    : subject;
  const directMail = getContactMailto(mailtoSubject);
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();

  const statusMessage =
    status === "error" ? formError : formEnabled ? formNote : formUnavailable;

  return (
    <div
      className={
        showAside
          ? "grid gap-6 md:grid-cols-[1fr_minmax(220px,280px)] md:gap-10 lg:gap-12"
          : undefined
      }
    >
      {isSuccess ? (
        <div
          className="surface-panel rounded-[16px] p-5 text-left sm:p-8"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            SAIFCORE
          </p>
          <h3 className="mt-3 text-pretty text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
            {formSuccess}
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
            {formSuccessHint}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
          className="surface-panel rounded-[16px] p-5 text-left sm:p-8"
          aria-label={formSubmit}
          aria-busy={isSending}
        >
          <fieldset
            className="grid gap-4 sm:grid-cols-2"
            disabled={!formEnabled || isSending}
          >
            <legend className="sr-only">{formSubmit}</legend>
            <div
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <label>
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
            </div>
            <label className="block sm:col-span-1" htmlFor={nameId}>
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formName}
              </span>
              <input
                id={nameId}
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
            <label className="block sm:col-span-1" htmlFor={emailId}>
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formEmail}
              </span>
              <input
                id={emailId}
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
            <label className="block sm:col-span-1" htmlFor={companyId}>
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formCompany}
              </span>
              <input
                id={companyId}
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
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 block text-xs font-medium text-[var(--text-muted)]">
                {formIntent}
              </legend>
              <div
                className="flex flex-wrap gap-2"
                role="radiogroup"
                aria-required="true"
                aria-label={formIntent}
              >
                {(
                  [
                    ["hiring", formIntentHiring],
                    ["freelance", formIntentFreelance],
                    ["other", formIntentOther],
                  ] as const
                ).map(([value, label]) => {
                  const selected = intent === value;
                  return (
                    <label
                      key={value}
                      className={`chip cursor-pointer ${selected ? "chip-active" : ""} ${
                        !formEnabled || isSending
                          ? "pointer-events-none opacity-60"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={value}
                        checked={selected}
                        required
                        disabled={!formEnabled || isSending}
                        onChange={() => {
                          clearStatusIfNeeded();
                          setIntent(value);
                        }}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
              <p className="sr-only" id={intentId}>
                {intent ? undefined : formIntentPlaceholder}
              </p>
            </fieldset>
            <label className="block sm:col-span-2" htmlFor={messageId}>
              <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
                {formMessage}
              </span>
              <textarea
                id={messageId}
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
                placeholder={messagePlaceholder}
                disabled={!formEnabled || isSending}
                className="input-field min-h-[8.5rem] resize-y px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>
          </fieldset>
          <div className="mt-4 border-t border-[var(--border-subtle)] pt-4 sm:mt-6 sm:border-0 sm:pt-0">
            <button
              type="submit"
              disabled={!formEnabled || isSending}
              aria-describedby={noteId}
              className="btn-primary inline-flex min-h-12 w-full items-center justify-center px-6 text-sm sm:w-auto sm:px-8"
            >
              {isSending ? formSending : formSubmit}
            </button>
            <p
              id={noteId}
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

      {showAside && (linkedinUrl || githubUrl || directMail) ? (
        <aside>
          <div className="surface-panel rounded-[16px] p-5 sm:p-6">
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
                    aria-label={`${linkedinLabel} (${opensInNewTab})`}
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
                    aria-label={`${githubLabel} (${opensInNewTab})`}
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
        </aside>
      ) : null}
    </div>
  );
}
