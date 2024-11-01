import { Logo } from "@/components/logo"

export function Header() {
  return (
    <div className="mb-10 hidden items-center justify-center gap-2 lg:flex">
      <Logo label="Sign In" />
    </div>
  )
}
