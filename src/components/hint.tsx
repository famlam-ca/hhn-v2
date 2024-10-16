import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

export const Hint = ({
  label,
  children,
  asChild,
  side,
  align,
  ...props
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild} tabIndex={props.tabIndex}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="border-foreground bg-foreground text-background"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
