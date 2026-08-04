import {
  Body,
  Button,
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

export type ContactQualifyReplyEmailProps = {
  name: string;
  locale: "en" | "fr";
  calendlyUrl: string | null;
  linkedinUrl: string | null;
  siteUrl: string;
};

const styles = {
  body: {
    backgroundColor: "#f3f4f6",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
    margin: "0",
    padding: "24px 12px",
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "28px 24px",
  },
  brand: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "600" as const,
    letterSpacing: "0.14em",
    margin: "0 0 16px",
    textTransform: "uppercase" as const,
  },
  heading: {
    color: "#111827",
    fontSize: "22px",
    fontWeight: "700" as const,
    lineHeight: "1.3",
    margin: "0 0 16px",
  },
  text: {
    color: "#374151",
    fontSize: "15px",
    lineHeight: "1.65",
    margin: "0 0 14px",
  },
  list: {
    color: "#374151",
    fontSize: "15px",
    lineHeight: "1.75",
    margin: "0 0 18px",
  },
  button: {
    backgroundColor: "#1d4ed8",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "600" as const,
    padding: "12px 20px",
    textDecoration: "none",
  },
  hr: {
    borderColor: "#e5e7eb",
    borderTop: "1px solid #e5e7eb",
    margin: "22px 0",
  },
  signoff: {
    color: "#111827",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 4px",
  },
  footer: {
    color: "#6b7280",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "16px 0 0",
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
};

const copy = {
  en: {
    preview: "Scoping questions from SAIFCORE",
    heading: "Let’s scope this",
    intro: (name: string) => `Hi ${name},`,
    p1: "Thanks for the brief. To scope this quickly and suggest the right next step:",
    q1: "Primary business outcome (payments, API, modernization, MVP, audit…)?",
    q2: "Target timeline / go-live?",
    q3: "Current stack and constraints (security, compliance, scale)?",
    q4: "Engagement model: fixed scope, day rate, or team embed?",
    closer:
      "From there I can recommend either a 30-min discovery call or the right engagement package.",
    cta: "Book a discovery call",
    regards: "Best regards,",
  },
  fr: {
    preview: "Questions de cadrage — SAIFCORE",
    heading: "Cadrons votre besoin",
    intro: (name: string) => `Bonjour ${name},`,
    p1: "Merci pour votre brief. Pour le cadrer rapidement et vous proposer le bon prochain pas :",
    q1: "Objectif business prioritaire (paiement, API, modernisation, MVP, audit…) ?",
    q2: "Deadline / go-live souhaité ?",
    q3: "Stack actuelle et contraintes (sécu, compliance, volumes) ?",
    q4: "Cadre : forfait, TJM, ou embed dans l’équipe ?",
    closer:
      "Sur cette base, je vous propose soit un appel de 30 min, soit un package d’engagement adapté.",
    cta: "Réserver un appel discovery",
    regards: "Bien cordialement,",
  },
} as const;

/** First human reply after auto-confirmation — qualification / scoping. */
export function ContactQualifyReplyEmail({
  name,
  locale,
  calendlyUrl,
  linkedinUrl,
  siteUrl,
}: ContactQualifyReplyEmailProps) {
  const t = copy[locale];
  const first = name.trim().split(/\s+/)[0] || name;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>SAIFCORE</Text>
          <Heading style={styles.heading}>{t.heading}</Heading>

          <Text style={styles.text}>{t.intro(first)}</Text>
          <Text style={styles.text}>{t.p1}</Text>

          <Text style={styles.list}>
            1) {t.q1}
            <br />
            2) {t.q2}
            <br />
            3) {t.q3}
            <br />
            4) {t.q4}
          </Text>

          <Text style={styles.text}>{t.closer}</Text>

          {calendlyUrl ? (
            <Section style={{ marginBottom: "18px" }}>
              <Button href={calendlyUrl} style={styles.button}>
                {t.cta}
              </Button>
            </Section>
          ) : null}

          <Hr style={styles.hr} />

          <Text style={styles.signoff}>{t.regards}</Text>
          <Text style={styles.signoff}>Saïfoulaye Diallo</Text>
          <Text style={styles.signoff}>SAIFCORE</Text>

          <Text style={styles.footer}>
            <Link href={siteUrl} style={styles.link}>
              {siteUrl}
            </Link>
            {linkedinUrl ? (
              <>
                <br />
                <Link href={linkedinUrl} style={styles.link}>
                  LinkedIn
                </Link>
              </>
            ) : null}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactQualifyReplyEmail;
