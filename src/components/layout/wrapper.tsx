import { cn } from "@/lib/utils"

export const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="bg-secondary/5 ring-ring/10 -m-2 rounded-xl p-2 ring-1 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
          <div className="bg-background/80 ring-ring/10 rounded-md p-4 shadow-2xl ring-1 sm:p-8 md:p-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
