import { MaxWidthWrapper } from "@/components/max-width-wrapper"

import { CallToAction } from "./_components/call-to-action"
import { AboutHeader } from "./_components/header"
import { KanbanFeatures } from "./_components/kanban-features"
import { ProjectTeam } from "./_components/project-team"
import { VPSFeatures } from "./_components/vps-features"

export default function AboutPage() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <AboutHeader />
      <MaxWidthWrapper>
        <KanbanFeatures />
        <VPSFeatures />
        <ProjectTeam />
        <CallToAction />
      </MaxWidthWrapper>

      <div className="absolute -right-5 top-10 h-[350px] w-[350px] rounded-bl-full bg-gradient-to-t from-purple-500/50 to-transparent blur-3xl" />
    </div>
  )
}
