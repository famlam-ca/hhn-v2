import { cn } from "@/lib/utils"

interface MaxWdithWrapperProps {
  id?: string
  className?: string
  children: React.ReactNode
}

export function MaxWidthWrapper({
  id,
  className,
  children,
}: MaxWdithWrapperProps) {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-2.5 lg:px-[4.5rem]",
        className,
      )}
    >
      {children}
    </div>
  )
}
