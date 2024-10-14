import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { Skeleton } from "@/components/ui/skeleton"

const KanbanBoardLoading = () => {
  return (
    <div className="h-[calc(100%-10rem)] w-full">
      <div className="border-border fixed inset-x-0 top-16 z-50 h-16 border-b bg-transparent backdrop-blur-lg transition-all">
        <MaxWidthWrapper className="flex h-full w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-96" />

            <Skeleton className="size-10" />
            <Skeleton className="size-10" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="size-10" />
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="mt-16 w-full">
        <div className="flex h-full w-full gap-3 p-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full">
              <div className="mb-3 flex items-center justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="size-6" />
              </div>
              <div className="h-full w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="mt-1.5 h-16 w-full" />
                ))}
                <div className="w-full">
                  <div className="flex gap-1.5 px-3 py-1.5">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="size-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Skeleton className="mt-10 size-56 shrink-0" />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default KanbanBoardLoading
