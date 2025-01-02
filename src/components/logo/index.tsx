import localFont from "next/font/local"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import "./styles.css"

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
})

export function Logo({
  animate,
  label = "HHN",
  href = "/",
  hide = true,
  size = "md",
}: {
  animate?: boolean
  label?: string
  href?: string
  hide?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const textSize =
    size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl"
  const imageSize = size === "sm" ? 32 : size === "md" ? 40 : 48

  return (
    <Link
      id={animate ? "logo" : undefined}
      href={href}
      className={cn(
        "flex items-center justify-center gap-x-2 transition hover:opacity-75",
        hide && "hidden md:flex",
        textSize,
      )}
    >
      <Image
        src="/logo.dark.svg"
        alt="logo"
        width={imageSize}
        height={imageSize}
        className="hidden dark:block"
      />
      <Image
        src="/logo.svg"
        alt="logo"
        width={imageSize}
        height={imageSize}
        className="block dark:hidden"
      />
      <p className={cn("pt-1", headingFont.className, textSize)}>{label}</p>
    </Link>
  )
}
