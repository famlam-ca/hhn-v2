import { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full">
      {children}
      <div className="relative hidden flex-1 bg-[url('/assets/marketing/dashboard.png')] bg-cover dark:bg-[url('/assets/marketing/dashboard.dark.png')] lg:block">
        <div className="pointer-events-none absolute inset-x-0 left-0 h-full w-32 bg-gradient-to-r from-background" />
      </div>
    </div>
  )
}
