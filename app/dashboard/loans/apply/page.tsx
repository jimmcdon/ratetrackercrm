import { DashboardLayout } from "@/components/layout"
import { LoanApplicationForm } from "@/components/loan-application-form"

export default function LoanApplicationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loan Application</h2>
          <p className="text-muted-foreground">
            Complete the form below to apply for a new loan or refinance an existing one.
          </p>
        </div>
        <LoanApplicationForm />
      </div>
    </DashboardLayout>
  )
}

