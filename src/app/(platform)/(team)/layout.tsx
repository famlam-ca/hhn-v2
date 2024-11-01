import { PropsWithChildren } from "react"

import { Navbar } from "./_components/navbar"

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}
