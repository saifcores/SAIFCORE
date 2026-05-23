"use client";

import { useState } from "react";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import { getContactMailto, getGithubUrl, getLinkedinUrl } from "@/site";

type Props = {
  subject: string;
  formName: string;
  formEmail: string;
  formCompany: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formNote: string;
  bookCall: string;
  calendlyHint: string;
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
  bookCall,
  calendlyHint,
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

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-12">
      <form
        onSubmit={handleSubmit}
        className="surface-panel rounded-2xl p-6 text-left sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
              {formName}
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
              {formEmail}
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
              {formCompany}
            </span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input-field px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">
              {formMessage}
            </span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={formMessagePlaceholder}
              className="input-field resize-y px-4 py-2.5 text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!directMail}
          className="btn-primary inline-flex h-12 w-full items-center justify-center px-8 text-sm sm:w-auto"
        >
          {formSubmit}
        </button>
        <p className="mt-3 text-xs text-[var(--text-muted)]">{formNote}</p>
      </form>

      <aside className="flex flex-col gap-6">
        <div className="surface-panel rounded-2xl p-6">
          <BookCallLink className="btn-outline inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold">
            {bookCall}
          </BookCallLink>
          <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
            {calendlyHint}
          </p>
        </div>
        <div className="surface-panel rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {socialTitle}
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={getLinkedinUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {linkedinLabel}
              </a>
            </li>
            <li>
              <a
                href={getGithubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {githubLabel}
              </a>
            </li>
            {directMail ? (
              <li>
                <a
                  href={directMail}
                  className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {emailLabel}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </aside>
    </div>
  );
}
