"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { TbUserQuestion } from "react-icons/tb"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MagicCard } from "@/components/ui/magic-card"
import { PROJECT_TEAM } from "@/constants/project-team"
import Link from "next/link"

export function ProjectTeam() {
  const { theme } = useTheme()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Meet The Team</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECT_TEAM.map((member, index) => (
            <MagicCard
              key={index}
              gradientColor={theme === "light" ? "#D9D9D955" : "#262626"}
              className="flex items-center justify-center shadow-xl"
            >
              <CardHeader className="flex-1">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 rounded-full"
                  />
                ) : (
                  <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-muted">
                    <TbUserQuestion className="size-12" />
                  </div>
                )}

                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">
                  {member.role}
                </CardDescription>

                <div className="flex items-center justify-center gap-2">
                  {member.href ? (
                    Array.isArray(member.href) ? (
                      member.href.map((link) => (
                        <Link
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          className="text-sm text-primary underline-offset-2 hover:underline"
                        >
                          {link.name}
                        </Link>
                      ))
                    ) : (
                      <Link
                        href={member.href}
                        target="_blank"
                        className="text-sm text-primary underline-offset-2 hover:underline"
                      >
                        Contact Me!
                      </Link>
                    )
                  ) : null}
                </div>
              </CardHeader>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  )
}
