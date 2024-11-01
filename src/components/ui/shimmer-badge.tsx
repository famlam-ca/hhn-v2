import AnimatedShinyText from "./shimmer-text"

export function ShimmerBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-fit items-center justify-center rounded-full bg-black/15 text-center dark:bg-muted/80">
        <AnimatedShinyText className="px-4 py-1">
          <span>{label}</span>
        </AnimatedShinyText>
      </div>
    </div>
  )
}
