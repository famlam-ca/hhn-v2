import type { Metadata } from "next"
import localFont from "next/font/local"

import { siteConfig } from "@/config/site"
import { ThemeProvider, Toaster } from "@/providers"

import "./globals.css"

const font = localFont({
  src: "../../public/fonts/font.woff2",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  icons: [
    { rel: "icon", url: siteConfig.favicon },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.openGraph.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.openGraph.siteName,
    images: [
      {
        url: siteConfig.openGraph.image,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.url,
    creator: siteConfig.twitter.creator,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.twitter.image,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="system">
      <body className={`${font.className} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
