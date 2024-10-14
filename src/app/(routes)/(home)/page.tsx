import { User } from "@prisma/client"
import Link from "next/link"

import { validateSession } from "@/server/auth"

import { FeatureSection } from "./_components/feature-section"

export default async function Home() {
  const { user } = await validateSession()

  return (
    <div className="leading-7">
      <div className="mx-auto my-0 max-w-[90rem] space-y-8 pl-[max(1.5rem)] pr-[max(1.5rem)]">
        <h1 className="ml-[-0.2rem] mt-16 inline-flex flex-col text-4xl font-bold leading-tight tracking-[-0.12rem] text-foreground md:text-5xl lg:text-6xl xl:text-7xl xl:tracking-[-0.08rem]">
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Server Management <br /> Made Simple
          </span>
        </h1>
        <p className="text-balance text-base leading-[1.6] lg:text-lg xl:text-xl">
          The digital home for friends and family, make yourself confortable.
          <br className="hidden sm:block" />
          Get ready to start hosting and managing your own servers,
          <br className="hidden sm:block" />
          with competitive pricing and a simple and easy to use dashboard.
        </p>
        <p
          style={{
            fontSize: "clamp(1.3rem, 3.5vw, 1.2rem)",
            fontFeatureSettings: "initial",
          }}
          className="text-xl leading-[1.6]"
        >
          <Link
            href={user ? "/dashboard" : "/signup?next=/dashboard"}
            className="group mt-2 inline-block select-none rounded-full bg-gradient-to-br from-primary to-primary-foreground px-6 py-3 text-white transition-all hover:shadow-[0_5px_30px_-10px_hsl(var(--primary))] hover:brightness-105 focus-visible:outline-offset-2 active:shadow-[0_1px_3px_hsl(var(--primary))] active:brightness-95"
          >
            Start Hosting Now{" "}
            <span className="inline-block transition-all group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] group-active:translate-x-[5px]">
              →
            </span>
          </Link>
        </p>
      </div>

      <div className="mx-0 mb-0 mt-32 bg-black/10 px-0 py-16 dark:bg-black">
        <div className="mx-auto my-0 -mt-32 max-w-[90rem] space-y-8 pl-[max(1.5rem)] pr-[max(1.5rem)]">
          <FeatureSection user={user as User} />
        </div>
      </div>
    </div>
  )
}
