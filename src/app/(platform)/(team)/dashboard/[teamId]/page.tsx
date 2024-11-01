import { Suspense } from "react"

import { BoardList } from "./_components/board-list"

interface TeamPageProps {
  params: Promise<{
    teamId: string
  }>
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params

  return (
    <div className="px-2 md:px-4">
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList teamId={teamId} />
      </Suspense>
    </div>
  )
}
