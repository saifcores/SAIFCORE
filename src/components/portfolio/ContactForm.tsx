"use client";

import { useState } from "react";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import {
  getCalendlyUrl,
  getContactMailto,
  getGithubUrl,
  getLinkedinUrl,
} from "@/site";

type Props = {
  subject: string;
  formName: string;
  formEmail: string;
  formCompany: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
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

export function ContactForm({
  subject,
  formName,
  formEmail,
  formCompany,
  formMessage,
  formMessagePlaceholder,
  formSubmit,
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = getContactMailto(subject, body);
    if (mailto) {
      window.location.href = mailto;
    }
  };

  const directMail = getContactMailto(subject);
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const hasCalendly = getCalendlyUrl() != null;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_minmax(220px,280px)] md:gap-10 lg:gap-12">
      <form
        onSubmit={handleSubmit}
        className="surface-panel order-last rounded-2xl p-5 text-left sm:p-8 md:order-none"
        aria-label={formSubmit}
      >
        <fieldset className="grid gap-4 sm:grid-cols-2" disabled={!directMail}>
          <legend className="sr-only">{formSubmit}</legend>
          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
              {formName}
            </span>
            <input
              required
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!directMail}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!directMail}
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
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={!directMail}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={formMessagePlaceholder}
              disabled={!directMail}
              className="input-field min-h-[8.5rem] resize-y px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>
        </fieldset>
        <div className="mt-4 border-t border-[var(--border-subtle)] pt-4 sm:mt-6 sm:border-0 sm:pt-0">
          <button
            type="submit"
            disabled={!directMail}
            aria-describedby="contact-form-note"
            className="btn-primary inline-flex min-h-12 w-full items-center justify-center px-6 text-sm sm:w-auto sm:px-8"
          >
            {formSubmit}
          </button>
          <p
            id="contact-form-note"
            className="mt-3 text-pretty text-xs leading-relaxed text-[var(--text-muted)]"
          >
            {directMail ? formNote : formUnavailable}
          </p>
        </div>
      </form>

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
