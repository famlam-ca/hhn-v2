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

const baseUrl = "https://www.famlam.ca"

interface VerifyEmailProps {
  data: {
    username?: string
    url?: string
  }
}

export const VerifyEmailEmail = ({
  data: { username, url },
}: VerifyEmailProps) => {
  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Verify Your Email Address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo} data-darkreader-inline-bgcolor="">
            <Img
              src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
              width={230}
              alt="HHN"
            />
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

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Welcome to HHN, {username}. To help protect your privacy (and be
              sure we have the right address), please click the button below.
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Section>
              <Button
                href={url}
                style={{
                  textTransform: "uppercase",
                  padding: "15px 80px",
                  borderRadius: "3px",
                  backgroundColor: "#2463eb",
                  border: "none",
                  color: "#fff",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                data-darkreader-inline-bgcolor=""
                data-darkreader-inline-border-top=""
                data-darkreader-inline-border-right=""
                data-darkreader-inline-border-bottom=""
                data-darkreader-inline-border-left=""
                data-darkreader-inline-color="">
                verify
              </Button>
            </Section>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Or copy/paste this link into your browser:
            </Text>

            <Text style={link} data-darkreader-inline-color="">
              <Link href={url}>{url}</Link>
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              If you received this email by mistake or did not authorize the
              request, please&nbsp;
              <Link
                href={`${baseUrl}/contact/support`}
                style={link}
                data-darkreader-inline-color="">
                contact support
              </Link>
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

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
            <Section style={logo} data-darkreader-inline-bgcolor="">
              <Img
                src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
                width={120}
                alt="HHN"
              />
            </Section>

            <Row>
              <Column
                align="right"
                style={{ width: "50%", paddingRight: "8px" }}>
                <Link href={baseUrl}>
                  <Img
                    src={`${baseUrl}/logo/logo512-dark-s.png`}
                    alt="Website"
                    width={25}
                    height={25}
                  />
                </Link>
              </Column>
              <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
                <Link href="https://github.com/famlam-ca/hhn">
                  <Img
                    src={`${baseUrl}/github/github-mark.svg`}
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
              <Link href="https://lasse.famlam.ca" style={footerLinks}>
                Projects
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://docs.famlam.ca" style={footerLinks}>
                Docs
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href={`${baseUrl}/contact`} style={footerLinks}>
                Contact
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href={`${baseUrl}/contact/support`} style={footerLinks}>
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
              }}>
              © {year} HHN™, All Rights Reserved
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

VerifyEmailEmail.PreviewProps = {
  data: {
    username: "SlickYeet",
    url: `${baseUrl}/verify-email`,
  },
} as VerifyEmailProps

export default VerifyEmailEmail

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
