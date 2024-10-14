import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

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
  lite?: boolean
  className?: string
}

export function ThemeSwitch({ lite, className }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()
  const { mounted } = useMounted()

  useEffect(() => {
    if (!mounted) return
  }, [])

  const IconToUse = theme === "system" ? Monitor : theme === "dark" ? Moon : Sun

  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : theme === "light" ? "system" : "dark"
    setTheme(newTheme)
  }

  return (
    <>
      {lite ? (
        <button
          tabIndex={0}
          onClick={toggleTheme}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleTheme
            }
          }}
          className={className}
        >
          <IconToUse />
        </button>
      ) : (
        <Select
          defaultValue={theme}
          onValueChange={(v) => {
            setTheme(v)
          }}
        >
          <SelectTrigger
            className={cn(
              "hover:text-foreground focus:text-foreground text-current",
              className,
            )}
          >
            <IconToUse />
            <span className="capitalize">
              {
                Object.entries(themeMapping).find(
                  ([_, value]) => value === theme,
                )?.[1]
              }
            </span>
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