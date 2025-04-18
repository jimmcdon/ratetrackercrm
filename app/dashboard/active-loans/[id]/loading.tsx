import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/layout"

export default function BorrowerDetailsLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    </DashboardLayout>
  )
}

