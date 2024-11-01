"use client"

import { CheckIcon, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

import { Button, ButtonProps } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import { themeMapping } from "@/providers/theme-provider"

type ThemeSwitchProps = {
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
  lite?: boolean
  className?: string
}

export function ThemeSwitch({
  size = "icon",
  variant = "outline",
  lite,
  className,
}: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()
  const { mounted } = useMounted()

  useEffect(() => {
    if (!mounted) return
  }, [mounted])

  const IconToUse = theme === "system" ? Monitor : theme === "dark" ? Moon : Sun

  return (
    <>
      {lite ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={variant} size={size}>
              <Sun className="size-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(themeMapping).map(([key, value]) => (
              <DropdownMenuItem key={key} onClick={() => setTheme(value)}>
                {value === "system" ? (
                  <Monitor />
                ) : value === "dark" ? (
                  <Moon />
                ) : (
                  <Sun />
                )}
                <span className="capitalize">{value}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto size-4 opacity-0",
                    theme === value && "opacity-100",
                  )}
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Select
          defaultValue={theme}
          onValueChange={(v) => {
            setTheme(v)
          }}
        >
          <SelectTrigger
            className={cn(
              "gap-4 text-current hover:text-foreground focus:text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0",
              className,
            )}
          >
            <div className="flex items-center gap-4">
              <IconToUse />
              <span className="capitalize">
                {
                  Object.entries(themeMapping).find(
                    ([, value]) => value === theme,
                  )?.[1]
                }
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(themeMapping).map(([key, value]) => (
              <SelectItem key={key} value={value} className="capitalize">
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  )
}
