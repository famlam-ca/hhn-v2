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

const baseUrl = "https://www.famlam.ca"

interface SupportTicketEmailProps {
  data: {
    username?: string
    subject?: string
    message?: string
  }
}

export const SupportTicketEmail = ({
  data: { username, subject, message },
}: SupportTicketEmailProps) => {
  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Support Ticket</Preview>
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
            <Text data-darkreader-inline-color="">Hi {username},</Text>

            <Text data-darkreader-inline-color="">
              We are truly sorry to hear that you are experiencing difficulties.
              We understand how frustrating this can be and we want to assure
              you that your issue is our top priority.
            </Text>

            <Text data-darkreader-inline-color="">
              Our team is working diligently to resolve your problem. We
              appreciate your patience and understanding during this time.
            </Text>

            <Text data-darkreader-inline-color="">
              In the meantime, if you have any additional information that you
              think might help us solve your issue faster, please don't hesitate
              to{" "}
              <Link href={`${baseUrl}/contact`} style={link}>
                contact
              </Link>{" "}
              us. This could include any error messages, screenshots, or steps
              you've already taken to try to resolve the issue, as it will
              assist us in providing you with a more effective solution.
            </Text>

            <Text data-darkreader-inline-color="">
              We value your support and are committed to providing you with the
              best service possible.
            </Text>

            <Text data-darkreader-inline-color="">
              We have included the details of your support ticket below:
            </Text>
            <Text data-darkreader-inline-color="">
              {subject}
              <br />
              {message}
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Thank you for being a part of HHN. We appreciate your patience and
              look forward to resolving this issue for you.
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
                <Link href={`${baseUrl}`}>
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
              © {year} HHN™, All Rights Reserved <br />
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

SupportTicketEmail.PreviewProps = {
  data: {
    username: "SlickYeet",
    subject: "Support Ticket",
    message: "Hello, I have a problem with my account.",
  },
} as SupportTicketEmailProps

export default SupportTicketEmail

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
