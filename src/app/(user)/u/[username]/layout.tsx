import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function UsernameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MaxWidthWrapper className="pt-20 md:pt-24">{children}</MaxWidthWrapper>
  )
}
