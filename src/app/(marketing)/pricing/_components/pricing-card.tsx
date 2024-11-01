"use client"

import { Session } from "@prisma/client"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { Interval } from "./pricing-wrapper"

interface PricingCardProps {
  isYearly?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: string[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
  interval: Interval
  session: Session | null
}

export function PricingCard({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
  interval,
  session,
}: PricingCardProps) {
  const router = useRouter()

  return (
    <Card
      className={cn(
        "animate-background-shine bg-white bg-[length:200%_100%] p-1 transition-colors dark:bg-black",
        popular &&
          "p-0.5 dark:bg-[linear-gradient(110deg,#fb7185,45%,#fb923c,55%,#fb7185)]",
        exclusive &&
          "dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]",
      )}
    >
      <div
        className={cn(
          `mx-auto flex h-[25rem] w-72 flex-col justify-between rounded-lg bg-white py-1 shadow-2xl drop-shadow-sm dark:bg-black sm:mx-0`,
          popular && "h-[26rem] w-80",
        )}
      >
        {popular && (
          <div className="absolute right-0 top-0">
            <p className="animate-background-shine rounded-bl-lg bg-white bg-[length:200%_100%] px-2.5 py-1 text-sm text-white transition-colors dark:bg-[linear-gradient(110deg,#fb7185,45%,#fb923c,55%,#fb7185)]">
              Popular Choice
            </p>
          </div>
        )}

        <div>
          <CardHeader className="pb-8 pt-4">
            {isYearly && yearlyPrice && monthlyPrice ? (
              <div className="flex justify-between">
                <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
                  {title}
                </CardTitle>
                <div
                  className={cn(
                    "h-fit rounded-xl bg-zinc-200 px-2.5 py-1 text-sm text-black dark:bg-zinc-800 dark:text-white",
                    {
                      "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black":
                        popular,
                    },
                  )}
                >
                  Save ${monthlyPrice * 12 - yearlyPrice}
                </div>
              </div>
            ) : (
              <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
                {title}
              </CardTitle>
            )}
            <div className="flex gap-0.5">
              <h3 className="text-3xl font-bold">
                {yearlyPrice && isYearly
                  ? "$" + yearlyPrice
                  : "$" + monthlyPrice}
              </h3>
              <span className="mb-1 flex flex-col justify-end text-sm">
                {yearlyPrice && isYearly
                  ? "/year"
                  : monthlyPrice
                    ? "/month"
                    : null}
              </span>
            </div>
            <CardDescription className="h-12 pt-1.5">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {features.map((feature: string) => (
              <CheckItem key={feature} text={feature} />
            ))}
          </CardContent>
        </div>
        <CardFooter className="mt-2">
          <Button
            onClick={() => {
              router.push(
                // TODO: Redirect user to upgrade page if a session exists
                session
                  ? `/dashboard/${session.teamId}/billing`
                  : `/signup?plan=${title.toUpperCase()}&interval=${interval}`,
              )
            }}
            className="relative w-full bg-black px-6 text-white transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-white dark:text-black"
          >
            {popular ? (
              <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            ) : (
              <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-45 blur" />
            )}
            {!session && actionLabel === "Go to dashboard"
              ? "Sign up"
              : session && actionLabel !== "Go to dashboard"
                ? "Upgrade to " + title
                : actionLabel}
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <CheckCircle2 size={18} className="my-auto text-green-400" />
      <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  )
}
