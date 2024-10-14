"use client"

import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { Skeleton } from "@/components/ui/skeleton"

import { Layout } from "./_components/kanban-dashboard"

const KanbanDashboardLoadingSkeleton = () => {
  const layout = localStorage.getItem("layout") as Layout

  return (
    <MaxWidthWrapper className="flex h-full max-w-full flex-col">
      <div className="pt-16">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-0">
          <Skeleton className="h-10 w-80 rounded-lg" />

          <div className="flex justify-between md:justify-normal md:gap-6">
            <div className="flex gap-2">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
            <Skeleton className="size-10 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="my-6 space-y-6">
        <div className="flex items-center gap-6">
          <Skeleton className="size-6 w-32 rounded-lg" />

          <Skeleton className="size-10 w-40 rounded-lg" />
        </div>
      </div>

      <div className="h-full">
        {layout === "grid" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-10 2xl:grid-cols-4 2xl:gap-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default KanbanDashboardLoadingSkeleton
