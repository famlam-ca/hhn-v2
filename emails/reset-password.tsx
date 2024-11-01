import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

const baseUrl = process.env.NEXT_URL
  ? process.env.NEXT_URL
  : "http://localhost:3000"

interface PasswordResetEmailProps {
  data: {
    name?: string
    code?: string
  }
}

export const PasswordResetEmail = ({
  data: { name, code },
}: PasswordResetEmailProps) => {
  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo} data-darkreader-inline-bgcolor="">
            <Img src={`${baseUrl}/email-logo.svg`} alt="HHN" width={230} />
          </Section>

          <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content} data-darkreader-inline-bgcolor="">
            <Heading data-darkreader-inline-color="">
              Reset Your Password
            </Heading>

            <Text data-darkreader-inline-color="">
              Hi, {name}. You recently requested to reset your password.
              <br />
              If you did not make this request, please ignore this email.
            </Text>

            <Section style={{ height: "30px" }} />

            <Section>
              <Text style={codeText}>{code}</Text>
              <Text style={validityText}>
                (This code is valid for 10 minutes)
              </Text>
            </Section>

            <Section style={{ height: "30px" }} />

            <Text data-darkreader-inline-color="">
              If you received this email by mistake or did not authorize the
              request, please contact&nbsp;
              <Link
                href={`https://lasse.famlam.ca#contact`}
                style={link}
                data-darkreader-inline-color=""
              >
                support
              </Link>
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Sincerely,
              <br />
              The HHN Team
            </Text>
          </Section>

          <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={footer}>
            <Row>
              <Column
                align="right"
                style={{ width: "50%", paddingRight: "8px" }}
              >
                <Link href={baseUrl}>
                  <Img
                    src={`${baseUrl}/email-logo.svg`}
                    alt="Website"
                    width={50}
                  />
                </Link>
              </Column>
              <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
                <Link href="https://github.com/famlam-ca/hhn-v1">
                  <Img
                    src={`https://github.com/favicon.ico`}
                    alt="Github"
                    width={25}
                    height={25}
                  />
                </Link>
              </Column>
            </Row>

            <Text style={footerLinksWrapper}>
              <Link href={`${baseUrl}/about`} style={footerLinks}>
                About
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://lasse.famlam.ca#projects" style={footerLinks}>
                Projects
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://docs.famlam.ca" style={footerLinks}>
                Docs
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link
                href={`https://lasse.famlam.ca#contact`}
                style={footerLinks}
              >
                Contact
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link
                href={`https://lasse.famlam.ca#contact`}
                style={footerLinks}
              >
                Support
              </Link>
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontSize: "12px",
                lineHeight: "14px",
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
            >
              © {year} HHN™, All Rights Reserved <br />
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

PasswordResetEmail.PreviewProps = {
  data: {
    username: "SlickYeet",
    url: `${baseUrl}/reset`,
  },
} as PasswordResetEmailProps

export default PasswordResetEmail

const fontFamily = "Inter,Inter,Arial,sans-serif"

const main = {
  backgroundColor: "#fffff",
  color: "#0a0a0a",
  fontWeight: 500,
  fontFamily,
}

const container = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "500px",
}

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: "15px 30px",
  marginBottom: "10px",
  backgroundColor: "#f5f5f5",
}

const content = {
  padding: 30,
  marginBottom: 10,
  textAlign: "center" as const,
  backgroundColor: "#f5f5f5",
  fontSize: 16,
}

const codeText = {
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
}

const validityText = {
  margin: "0px",
  textAlign: "center" as const,
}

const footer = {
  backgroundColor: "#f5f5f5",
  maxWidth: "580px",
  margin: "0 auto",
}

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
}

const footerLinks = {
  color: "#0a0a0a",
}

const link = {
  textDecoration: "underline",
  color: "#2463eb",
}

const sectionsBorders = {
  width: "100%",
  display: "flex",
}

const sectionBorder = {
  borderBottom: "1px solid #e6e6e6",
  width: "249px",
}

const sectionCenter = {
  borderBottom: "1px solid #2463eb",
  width: "102px",
}
