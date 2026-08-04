import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

export type ContactLeadEmailProps = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  locale: "en" | "fr";
  calendlyUrl: string | null;
  siteUrl: string;
};

const styles = {
  body: {
    backgroundColor: "#0b1220",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
    margin: "0",
    padding: "24px 12px",
  },
  container: {
    backgroundColor: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "28px 24px",
  },
  brand: {
    color: "#93c5fd",
    fontSize: "12px",
    fontWeight: "600" as const,
    letterSpacing: "0.14em",
    margin: "0 0 16px",
    textTransform: "uppercase" as const,
  },
  heading: {
    color: "#f9fafb",
    fontSize: "22px",
    fontWeight: "700" as const,
    lineHeight: "1.3",
    margin: "0 0 8px",
  },
  meta: {
    color: "#9ca3af",
    fontSize: "13px",
    margin: "0 0 20px",
  },
  label: {
    color: "#6b7280",
    fontSize: "11px",
    fontWeight: "600" as const,
    letterSpacing: "0.12em",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
  },
  row: {
    color: "#e5e7eb",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 4px",
  },
  muted: {
    color: "#9ca3af",
  },
  messageBox: {
    backgroundColor: "#0b1220",
    border: "1px solid #1f2937",
    borderRadius: "8px",
    color: "#e5e7eb",
    fontSize: "14px",
    lineHeight: "1.65",
    margin: "0",
    padding: "14px 16px",
    whiteSpace: "pre-wrap" as const,
  },
  list: {
    color: "#d1d5db",
    fontSize: "13px",
    lineHeight: "1.7",
    margin: "0",
    paddingLeft: "18px",
  },
  hr: {
    borderColor: "#1f2937",
    borderTop: "1px solid #1f2937",
    margin: "20px 0",
  },
  footer: {
    color: "#6b7280",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "0",
  },
  link: {
    color: "#93c5fd",
    textDecoration: "underline",
  },
};

export function ContactLeadEmail({
  name,
  email,
  company,
  subject,
  message,
  locale,
  calendlyUrl,
  siteUrl,
}: ContactLeadEmailProps) {
  const companyLabel = company || "—";
  const preview = `Lead: ${name}${company ? ` · ${company}` : ""}`;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>SAIFCORE · Lead</Text>
          <Heading style={styles.heading}>Nouveau brief</Heading>
          <Text style={styles.meta}>
            saifcore.tech · locale {locale.toUpperCase()}
          </Text>

          <Section>
            <Text style={styles.label}>Lead</Text>
            <Text style={styles.row}>
              <span style={styles.muted}>Nom · </span>
              {name}
            </Text>
            <Text style={styles.row}>
              <span style={styles.muted}>Email · </span>
              <Link href={`mailto:${email}`} style={styles.link}>
                {email}
              </Link>
            </Text>
            <Text style={styles.row}>
              <span style={styles.muted}>Société · </span>
              {companyLabel}
            </Text>
            <Text style={styles.row}>
              <span style={styles.muted}>Objet · </span>
              {subject}
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Brief</Text>
            <Text style={styles.messageBox}>{message}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Qualif (reply)</Text>
            <Text style={styles.list}>
              • Recrutement / freelance / embed équipe ?
              <br />
              • Objectif : paiements, API, modernisation, MVP, audit…
              <br />
              • Timeline + contraintes (réglementaire, stack, scale)
              <br />• Cadre : forfait / TJM / mission
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Next</Text>
            <Text style={styles.list}>
              1. Reply ce thread
              <br />
              2. Si fit clair → discovery
              {calendlyUrl ? (
                <>
                  <br />
                  <Link href={calendlyUrl} style={styles.link}>
                    {calendlyUrl}
                  </Link>
                </>
              ) : null}
              <br />
              3. Sinon → 3–5 questions ciblées + package adapté
            </Text>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            SAIFCORE · Backend · Payments · Platforms
            <br />
            <Link href={siteUrl} style={styles.link}>
              {siteUrl}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactLeadEmail;
