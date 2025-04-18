import { DashboardLayout } from "@/components/layout"
import { LeadFormBuilder } from "@/components/lead-form-builder"

export default function LeadFormBuilderPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Lead Form Builder</h1>
        <LeadFormBuilder />
      </div>
    </DashboardLayout>
  )
}

