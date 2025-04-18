import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/layout"

export default function ActiveLoansLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
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

