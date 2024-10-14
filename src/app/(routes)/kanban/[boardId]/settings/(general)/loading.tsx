import { Skeleton } from "@/components/ui/skeleton"

const BoardSettingsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-24" />
      <div className="mb-6 mt-3 h-px bg-accent" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-20 w-80" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="size-64" />
        </div>

        <div className="col-span-full">
          <Skeleton className="h-10 w-48" />
          <div className="mt-2 rounded-lg border-2">
            <div className="flex items-center justify-between p-4">
              <span className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-[25rem]" />
              </span>
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-[30rem]" />
              </span>
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-[35rem]" />
              </span>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardSettingsSkeleton
