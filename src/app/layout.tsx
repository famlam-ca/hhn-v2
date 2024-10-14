import { type Metadata } from "next"
import { Noto_Sans as Font } from "next/font/google"

import { Providers } from "@/providers"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

import "./globals.css"

const font = Font({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | HHN",
    default: "Humble Home Network",
  },
  description:
    "The digital home for friends and family, make yourself confortable. Get ready to start hosting and managing your own servers with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="system">
      <body className={font.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
