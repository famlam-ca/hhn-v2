import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { signOut } from "./actinos"

interface SignOutButtonProps {
  children?: React.ReactNode
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
  className?: string
}

export function SignOutButton({
  children = "Sign Out",
  className,
  size = "sm",
  variant = "outline",
}: SignOutButtonProps) {
  return (
    <Button
      onClick={signOut}
      size={size}
      variant={variant}
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
