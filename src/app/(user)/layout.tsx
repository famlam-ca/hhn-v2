import { Navbar } from "./_components/navbar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}
