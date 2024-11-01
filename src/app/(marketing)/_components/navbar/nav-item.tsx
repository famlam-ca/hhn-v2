import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  label: string
  target?: string
}

export function NavItem({ href, label, target }: NavItemProps) {
  return (
    <li className="hidden md:block">
      <Link
        href={href}
        target={target}
        className={cn(
          "text-sm font-medium transition-all hover:text-foreground",
          target && "flex",
        )}
      >
        {label}
        {target ? <ArrowUpRight className="size-3" /> : null}
      </Link>
    </li>
  )
}
