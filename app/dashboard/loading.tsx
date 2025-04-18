import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/layout"

export default function DashboardLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    </DashboardLayout>
  )
}

