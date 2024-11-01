import { Menu } from "lucide-react"
import { redirect } from "next/navigation"

import { Logo } from "@/components/logo"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/user-button"
import { getSession } from "@/server/session"

export async function Navbar() {
  const { session, user, teamId } = await getSession()
  if (session === null) {
    return redirect("/signin")
  }

  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center border-b bg-background px-4 shadow-sm">
      <Button size="sm" variant="ghost" className="mr-2 block md:hidden">
        <Menu className="size-4" />
      </Button>

      <MaxWidthWrapper className="flex items-center">
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">
            <Logo animate href={`/dashboard/${teamId}`} />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-2">
          <UserButton user={user} />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
