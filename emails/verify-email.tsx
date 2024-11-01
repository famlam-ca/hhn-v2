import {
  Body,
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

interface VerificationEmailProps {
  data: {
    name?: string
    code?: number
  }
}

export const VerificationEmail = ({
  data: { name, code },
}: VerificationEmailProps) => {
  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Verify Your Email Address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo} data-darkreader-inline-bgcolor="">
            <Img src={`${baseUrl}/email-logo.svg`} alt="HHN Logo" width={230} />
          </Section>

          <Row style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Column style={sectionBorder} />
            <Column style={sectionCenter} />
            <Column style={sectionBorder} />
          </Row>

          <Section style={content} data-darkreader-inline-bgcolor="">
            <Heading data-darkreader-inline-color="">
              Verify Your Email Address
            </Heading>

            <Text data-darkreader-inline-color="">
              Welcome to HHN, {name}. We want to make sure it's really you.
              Please enter the following verification code when prompted.
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

            <Text data-darkreader-inline-color="">
              Sincerely,
              <br />
              The HHN Team
            </Text>
          </Section>

          <Row style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Column style={sectionBorder} />
            <Column style={sectionCenter} />
            <Column style={sectionBorder} />
          </Row>

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
              © {year} HHN™, All Rights Reserved
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

VerificationEmail.PreviewProps = {
  data: {
    name: "SlickYeet",
    code: 123456,
  },
} as VerificationEmailProps

export default VerificationEmail

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
