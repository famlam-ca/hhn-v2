import { PropsWithChildren } from "react"

import { Footer } from "./_components/footer"
import { Navbar } from "./_components/navbar"

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="bg-white/80 pt-20 dark:bg-black/80">{children}</main>
      <Footer />
    </div>
  )
}
