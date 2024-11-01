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
}: {
  animate?: boolean
  label?: string
  href?: string
  hide?: boolean
}) {
  return (
    <Link
      id={animate ? "logo" : undefined}
      href={href}
      className={cn(
        "flex items-center gap-x-2 transition hover:opacity-75",
        hide && "hidden md:flex",
      )}
    >
      <Image
        src="/logo.dark.svg"
        alt="logo"
        width={40}
        height={40}
        className="hidden dark:block"
      />
      <Image
        src="/logo.svg"
        alt="logo"
        width={40}
        height={40}
        className="block dark:hidden"
      />
      <p className={cn("pt-1 text-2xl", headingFont.className)}>{label}</p>
    </Link>
  )
}
