"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowUpDown } from "lucide-react"

// Example data for loan summaries
const loanSummaries = [
  { stage: "Application", count: 15, color: "bg-blue-500" },
  { stage: "Processing", count: 8, color: "bg-yellow-500" },
  { stage: "Underwriting", count: 5, color: "bg-orange-500" },
  { stage: "Approved", count: 3, color: "bg-green-500" },
  { stage: "Closing", count: 2, color: "bg-purple-500" },
]

// Example data for individual loans
const loans = [
  { id: 1, borrower: "John Doe", loanAmount: 250000, status: "Application", submissionDate: "2023-06-01" },
  { id: 2, borrower: "Jane Smith", loanAmount: 350000, status: "Processing", submissionDate: "2023-05-28" },
  { id: 3, borrower: "Bob Johnson", loanAmount: 180000, status: "Underwriting", submissionDate: "2023-05-25" },
  { id: 4, borrower: "Alice Brown", loanAmount: 420000, status: "Approved", submissionDate: "2023-05-20" },
  { id: 5, borrower: "Charlie Davis", loanAmount: 300000, status: "Closing", submissionDate: "2023-05-15" },
  { id: 6, borrower: "Eva Wilson", loanAmount: 275000, status: "Application", submissionDate: "2023-06-02" },
  { id: 7, borrower: "Frank Miller", loanAmount: 200000, status: "Processing", submissionDate: "2023-05-30" },
  { id: 8, borrower: "Grace Taylor", loanAmount: 380000, status: "Underwriting", submissionDate: "2023-05-27" },
]

export default function LoansInProcessPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const sortedLoans = [...loans].sort((a, b) => {
    if (!sortColumn) return 0

    if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Loans in Process</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Loan Application
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {loanSummaries.map((summary) => (
            <Card key={summary.stage}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{summary.stage}</CardTitle>
                <div className={`h-4 w-4 rounded-full ${summary.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Loan Applications</CardTitle>
            <CardDescription>A list of all loan applications currently in process</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Loan ID</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("borrower")}>
                      Borrower
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("loanAmount")}>
                      Loan Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("status")}>
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("submissionDate")}>
                      Submission Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.borrower}</TableCell>
                    <TableCell>${loan.loanAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{loan.status}</Badge>
                    </TableCell>
                    <TableCell>{loan.submissionDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

