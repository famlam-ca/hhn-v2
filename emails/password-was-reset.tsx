import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

interface PasswordWasResetProps {
  data: {
    username?: string
    updatedDate?: Date
  }
}

const baseUrl = "https://www.famlam.ca"

export const PasswordWasResetEmail = ({
  data: { username, updatedDate },
}: PasswordWasResetProps) => {
  const year = new Date().getFullYear()
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate)

  return (
    <Html>
      <Head />
      <Preview>You updated the password for your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo} data-darkreader-inline-bgcolor="">
            <Img
              src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
              width={230}
              alt="HHN"
            />
          </Section>

          <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content} data-darkreader-inline-bgcolor="">
            <Text data-darkreader-inline-color="">Hi {username},</Text>

            <Text data-darkreader-inline-color="">
              You updated the password for your account on {formattedDate}. If
              this was you, then no further action is required.
            </Text>

            <Text data-darkreader-inline-color="">
              However if you did NOT perform this password change, please{" "}
              <Link href={`${baseUrl}/u/${username}/account`} style={link}>
                reset your password
              </Link>{" "}
              immediately.
            </Text>

            <Text data-darkreader-inline-color="">
              Remember to use a password that is both strong and unique to your
              account. To learn more about how to create a strong and unique
              password,{" "}
              <Link
                href="https://support.google.com/googleone/answer/12262531?hl=en"
                style={link}>
                click here.
              </Link>
            </Text>

            <Text data-darkreader-inline-color="">
              Still have questions? Please contact{" "}
              <Link href={`${baseUrl}/contact/support`} style={link}>
                Support
              </Link>
            </Text>

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
                <Link href="https://www.famlam.ca">
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
                color: "#363949",
                fontSize: "12px",
                lineHeight: "14px",
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
              data-darkreader-inline-color="">
              © {year} HHN™, All Rights Reserved <br />
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

PasswordWasResetEmail.PreviewProps = {
  data: {
    username: "SlickYeet",
    updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
  },
} as PasswordWasResetProps

export default PasswordWasResetEmail

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
