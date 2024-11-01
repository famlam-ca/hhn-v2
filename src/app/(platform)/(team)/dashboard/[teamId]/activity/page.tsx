import { Suspense } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"

import { ActivityList } from "./_components/activity-list"

interface ActivityPageProps {
  params: Promise<{
    teamId: string
  }>
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { teamId } = await params

  return (
    <Suspense fallback={<ActivityList.Skeleton />}>
      <ScrollArea className="h-[calc(100dvh-11rem)] md:h-[calc(100dvh-12rem)]">
        <ActivityList teamId={teamId} />
      </ScrollArea>
    </Suspense>
  )
}
