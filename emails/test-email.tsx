import { Button, Html, Text } from "@react-email/components"

interface EmailProps {
  data: {
    url?: string
    username?: string
  }
}

export const TestEmail = ({
  data: { url = "https://example.com", username = "SlickYeet" },
}: EmailProps) => {
  return (
    <Html>
      <Text>Hello, {username}!</Text>
      <Button href={url}>Click me</Button>
    </Html>
  )
}

TestEmail.PreviewProps = {
  data: {
    url: "https://example.com",
    username: "SlickYeet",
  },
} as EmailProps

export default TestEmail
