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

export type ContactAutoReplyEmailProps = {
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
    lineHeight: "1.7",
    margin: "0 0 18px",
    paddingLeft: "18px",
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
    preview: "SAIFCORE received your brief",
    heading: "Brief received",
    intro: (name: string) => `Hi ${name},`,
    p1: "Thanks for reaching out via SAIFCORE.",
    p2: "I’ve received your brief and will reply within two business days — with focused questions and, when the fit is clear, a concrete next step (discovery call, workshop, or engagement package).",
    faster: "To move faster, you can:",
    bulletGoals: "share goals, constraints, timeline, and stack;",
    bulletCall: "or book a 30-minute discovery call:",
    bulletReply: "or reply directly to this message.",
    cta: "Book a discovery call",
    positioning:
      "I partner on enterprise backends, payments, and regulated platforms (Java / Spring Boot, distributed systems, cloud) — remote, EN/FR.",
    regards: "Best regards,",
  },
  fr: {
    preview: "SAIFCORE a bien reçu votre brief",
    heading: "Brief reçu",
    intro: (name: string) => `Bonjour ${name},`,
    p1: "Merci pour votre message via SAIFCORE.",
    p2: "Votre brief est bien reçu. Je le lis avec attention et vous réponds sous deux jours ouvrables — avec des questions précises et, si le besoin est clair, un prochain pas concret (appel discovery, atelier, ou package d’engagement).",
    faster: "Pour avancer plus vite, vous pouvez :",
    bulletGoals: "préciser objectifs, contraintes, timeline et stack ;",
    bulletCall: "ou réserver un appel discovery de 30 min :",
    bulletReply: "ou me répondre directement à ce message.",
    cta: "Réserver un appel discovery",
    positioning:
      "Je collabore principalement sur les backends enterprise, les paiements et les plateformes régulées (Java / Spring Boot, systèmes distribués, cloud) — en remote, EN/FR.",
    regards: "Bien cordialement,",
  },
} as const;

export function ContactAutoReplyEmail({
  name,
  locale,
  calendlyUrl,
  linkedinUrl,
  siteUrl,
}: ContactAutoReplyEmailProps) {
  const t = copy[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>SAIFCORE</Text>
          <Heading style={styles.heading}>{t.heading}</Heading>

          <Text style={styles.text}>{t.intro(name)}</Text>
          <Text style={styles.text}>{t.p1}</Text>
          <Text style={styles.text}>{t.p2}</Text>

          <Text style={styles.text}>{t.faster}</Text>
          <Text style={styles.list}>
            • {t.bulletGoals}
            <br />• {calendlyUrl ? t.bulletCall : t.bulletReply}
          </Text>

          {calendlyUrl ? (
            <Section style={{ marginBottom: "18px" }}>
              <Button href={calendlyUrl} style={styles.button}>
                {t.cta}
              </Button>
            </Section>
          ) : null}

          <Text style={styles.text}>{t.positioning}</Text>

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

export default ContactAutoReplyEmail;
