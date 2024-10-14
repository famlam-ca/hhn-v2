"use client"

import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import { Feature, Features } from "./features"
import "./features.css"

import dashboardDark from "/public/assets/home/dashboard.dark.png"
import dashboard from "/public/assets/home/dashboard.png"
import proxmoxDark from "/public/assets/home/proxmox.dark.png"
import proxmox from "/public/assets/home/proxmox.png"

export const FeatureSection = ({ user }: { user: User }) => {
  const getStarted = user ? "/dashboard" : "/signup?next=/dashboard"

  return (
    <Features>
      {/* Dashboard */}
      <Feature
        index={0}
        large
        centered
        href={getStarted}
        target="_blank"
        className="aspect-[135/86] max-md:max-h-[348px] max-md:w-full lg:aspect-auto"
      >
        <Image
          src={dashboard}
          alt="Background"
          loading="eager"
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 h-full select-none object-cover object-left dark:hidden max-md:w-[250%] max-md:max-w-[initial] max-md:object-[-26px,_0]"
        />
        <Image
          src={dashboardDark}
          alt="Background (Dark)"
          loading="eager"
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 hidden h-full select-none object-cover object-left dark:block max-md:w-[250%] max-md:max-w-[initial] max-md:object-[-26px,_0]"
        />
        <h3 className="z-[2 relative text-balance text-2xl text-[clamp(34px,_4vw_22px)] font-semibold leading-5 -tracking-wide sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] xl:text-4xl xl:text-[clamp(36px,_4vw,_24px)]">
          Server management made simple
        </h3>
      </Feature>

      {/* Proxmox */}
      <Feature
        index={1}
        centered
        href="https://pve.proxmox.com/wiki/Main_Page"
        target="_blank"
      >
        <div className="flex h-full flex-col justify-between gap-y-6">
          <h3 className="relative z-[2] text-balance text-2xl text-[clamp(34px,_4vw_22px)] font-semibold leading-5 -tracking-wide sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] lg:text-4xl lg:text-[clamp(36px,_4vw,_24px)]">
            Host your servers with <span className="font-light">ease</span>
          </h3>
          <p className="text-left">
            We provide a simple and easy way to host your servers with{" "}
            <Link
              href="https://pve.proxmox.com/wiki/Main_Page"
              target="_blank"
              className="text-primary underline underline-offset-2"
            >
              Proxmox VE
            </Link>{" "}
            and an intuitive{" "}
            <Link
              href={getStarted}
              target="_blank"
              className="text-primary underline underline-offset-2"
            >
              Admin Dashboard
            </Link>{" "}
            to manage your servers.
          </p>
          <div>
            <Image
              src={proxmox}
              alt="Background"
              loading="eager"
              className="pointer-events-none z-0 block select-none rounded-lg object-cover dark:hidden"
            />
            <Image
              src={proxmoxDark}
              alt="Background (Dark)"
              loading="eager"
              className="pointer-events-none z-0 hidden select-none rounded-lg object-cover dark:block"
            />
          </div>
          <p className="text-left">
            To provide you with the easiest and simplest way to host your
            servers, we built upon the powerful{" "}
            <br className="hidden xl:block" />
            <Link
              href="https://proxmox.com/en/proxmox-virtual-environment/overview"
              target="_blank"
              className="text-primary underline-offset-2 hover:underline"
            >
              Proxmox VE
            </Link>{" "}
            platform.
          </p>
        </div>
      </Feature>

      {/* Performance */}
      <Feature
        index={2}
        className="performance-feature min-h-[15rem] bg-[length:692px] bg-[position:center_calc(100%-200%)] bg-no-repeat lg:bg-[position:-6px_calc(100%+190%)]"
      >
        <h3 className="relative z-[2] mb-8 text-balance text-2xl text-[clamp(34px,_4vw_22px)] font-semibold leading-5 -tracking-wide sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] lg:text-4xl lg:text-[clamp(36px,_4vw,_24px)]">
          We take care of the heavy lifting for you
        </h3>
        <p>
          HHN is built on top of{" "}
          <Link
            href="https://proxmox.com/en/proxmox-virtual-environment/overview"
            target="_blank"
            className="text-primary underline-offset-2 hover:underline"
          >
            Proxmox VE
          </Link>{" "}
          and{" "}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            className="text-primary underline-offset-2 hover:underline"
          >
            Next.js
          </Link>
          , with a focus on simplicity and performance. Allowing you to focus on
          what matters most...{" "}
          <span className="font-semibold text-current">gaming</span>!
        </p>
      </Feature>

      {/* TODO: Change video */}
      {/* Easy Setup */}
      <Feature
        index={6}
        large
        href={getStarted}
        className="flex aspect-[2.5/2] flex-col justify-start max-sm:min-h-[350px] max-sm:items-stretch sm:aspect-[8/3] sm:justify-center"
      >
        <div className="z-[2]">
          <h3 className="relative z-[2] mb-8 text-center text-2xl text-[clamp(34px,_4vw_22px)] font-semibold leading-5 -tracking-wide sm:text-left sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] lg:text-4xl lg:text-[clamp(36px,_4vw,_24px)]">
            Easy Setup,
            <br />
            No Hassle!
          </h3>
          <p className="max-w-full sm:max-w-80">
            Get your VPS up and running in no time with our easy setup process.
            Whether you're a tech newbie or a seasoned pro, you'll find our
            platform intuitive and user-friendly.
          </p>
        </div>
        <div className="absolute inset-0 z-[1] hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--background))_250px,_transparent)] dark:bg-[linear-gradient(to_right,hsl(var(--background))_250px,_transparent)] sm:block" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none relative right-0 top-6 block h-[430px] max-w-[calc(100%+3.5em)] dark:hidden dark:mix-blend-lighten max-sm:m-[0.75em,-1.75em,0] sm:absolute sm:max-w-[60%] xl:aspect-[787/623] xl:h-auto"
        >
          <source src="/videos/search.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none relative right-0 top-6 hidden h-[430px] max-w-[calc(100%+3.5em)] -translate-x-4 dark:block dark:mix-blend-lighten max-sm:m-[0.75em,-1.75em,0] sm:absolute sm:max-w-[60%] xl:aspect-[787/623] xl:h-auto"
        >
          <source src="/videos/search-dark.mp4" type="video/mp4" />
        </video>
      </Feature>

      {/* Dark mode */}
      <Feature
        index={7}
        large
        style={{
          backgroundImage:
            "url(/assets/home/darkmode.png), url(/assets/home/gradient-bg.jpeg)",
          backgroundSize: "140%, 180%",
          backgroundPosition: "130px -8px, top",
          backgroundRepeat: "no-repeat",
          textShadow: "0 1px 6px rgb(38 59 82 / 18%)",
          aspectRatio: "1.765",
          minHeight: "15rem",
        }}
      >
        <h3 className="relative z-[2] w-[min(300px,_41%)] min-w-[155px] text-left text-2xl text-[clamp(34px,_4vw_22px)] font-semibold tracking-wide text-white sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] lg:text-4xl lg:text-[clamp(36px,_4vw,_24px)] lg:!leading-tight">
          Dark👏
          <br />
          Mode👏
          <br />
          Included👏
          <br />!
        </h3>
      </Feature>

      {/* TODO: Change image */}
      {/* Security */}
      <Feature
        index={8}
        href={user ? "/dashboard/security" : "/signup?next=/dashboard/security"}
        target="_blank"
        style={{
          backgroundSize: 750,
          backgroundImage: "url(/assets/home/high-contrast.png)",
        }}
        className="min-h-72 bg-[center_220px] bg-no-repeat min-[375px]:bg-[center_190px] min-[500px]:bg-[center_150px] lg:bg-[-160px_280px] min-[1200px]:bg-[-160px_240px] xl:bg-[-160px_200px]"
      >
        <h3 className="relative z-[2] mb-8 text-2xl text-[clamp(34px,_4vw_22px)] font-semibold leading-5 -tracking-wide sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] lg:text-4xl lg:text-[clamp(36px,_4vw,_24px)]">
          Advanced Security
        </h3>
        <p>
          We offers top-notch security features including{" "}
          <br className="sm:block" />
          <b>DDoS Protection</b> <b>Regular Backups</b> and{" "}
          <b>Firewall Management</b>.
        </p>
      </Feature>

      {/* And more */}
      <Feature
        index={10}
        large
        className="flex h-full flex-col justify-between"
      >
        <div>
          <h3 className="relative z-[2] mb-8 text-2xl text-[clamp(34px,_4vw_22px)] font-semibold leading-5 -tracking-wide sm:text-3xl sm:text-[clamp(28px,_4vw,_22px)] lg:text-4xl lg:text-[clamp(36px,_4vw,_24px)]">
            And more...
          </h3>
          <p className="mb-4">
            High Performance / Full Root Access / Scalable Resources / 24/7
            Support / SSD Storage / Multiple OS Options...
            <br />A lot of new possibilities to be explored.
          </p>
        </div>
        <p className="text-xl leading-[1.6]">
          <Link href={getStarted} className="text-primary">
            Start hosting like a pro →
          </Link>
        </p>
      </Feature>

      {/* TODO: Coming soon... Kanban */}
      <Feature
        index={3}
        href="https://github.com/famlam-ca/hhn/blob/master/README.md#roadmap"
        target="_blank"
        className="flex flex-col items-center justify-center bg-[url(/assets/home/gradient-bg.jpeg)] bg-cover bg-center text-white"
      >
        More content coming soon...
      </Feature>
    </Features>
  )
}
