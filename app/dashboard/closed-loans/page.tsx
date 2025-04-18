"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowUpDown, Search, DollarSign, Percent, UserCheck, Calculator } from "lucide-react"

// Example data for closed loan summaries
const closedLoanSummaries = [
  { title: "Total Closed Loans", count: 150, icon: UserCheck, color: "bg-green-500" },
  { title: "Total Loan Volume", amount: "$45,000,000", icon: DollarSign, color: "bg-blue-500" },
  { title: "Average Loan Amount", amount: "$300,000", icon: Calculator, color: "bg-yellow-500" },
  { title: "Average Interest Rate", rate: "3.75%", icon: Percent, color: "bg-purple-500" },
]

// Example data for individual closed loans
const closedLoans = [
  {
    id: 1,
    borrower: "John Doe",
    loanAmount: 250000,
    interestRate: 3.5,
    closingDate: "2023-05-15",
    loanType: "Conventional",
    loanTerm: "30-year fixed",
  },
  {
    id: 2,
    borrower: "Jane Smith",
    loanAmount: 350000,
    interestRate: 3.75,
    closingDate: "2023-05-20",
    loanType: "FHA",
    loanTerm: "15-year fixed",
  },
  {
    id: 3,
    borrower: "Bob Johnson",
    loanAmount: 180000,
    interestRate: 3.25,
    closingDate: "2023-05-22",
    loanType: "VA",
    loanTerm: "30-year fixed",
  },
  {
    id: 4,
    borrower: "Alice Brown",
    loanAmount: 420000,
    interestRate: 4.0,
    closingDate: "2023-05-25",
    loanType: "Jumbo",
    loanTerm: "30-year fixed",
  },
  {
    id: 5,
    borrower: "Charlie Davis",
    loanAmount: 300000,
    interestRate: 3.6,
    closingDate: "2023-05-28",
    loanType: "Conventional",
    loanTerm: "20-year fixed",
  },
  {
    id: 6,
    borrower: "Eva Wilson",
    loanAmount: 275000,
    interestRate: 3.8,
    closingDate: "2023-06-01",
    loanType: "FHA",
    loanTerm: "30-year fixed",
  },
  {
    id: 7,
    borrower: "Frank Miller",
    loanAmount: 200000,
    interestRate: 3.4,
    closingDate: "2023-06-03",
    loanType: "VA",
    loanTerm: "15-year fixed",
  },
  {
    id: 8,
    borrower: "Grace Taylor",
    loanAmount: 380000,
    interestRate: 3.9,
    closingDate: "2023-06-05",
    loanType: "Conventional",
    loanTerm: "30-year fixed",
  },
]

export default function ClosedLoansPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const sortedLoans = [...closedLoans]
    .filter(
      (loan) =>
        loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.loanTerm.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
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
          <h1 className="text-2xl font-bold tracking-tight">Closed Loans</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {closedLoanSummaries.map((summary) => (
            <Card key={summary.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{summary.title}</CardTitle>
                <summary.icon className={`h-4 w-4 ${summary.color} text-white rounded-full p-1`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.amount || summary.count || summary.rate}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Closed Loan Details</CardTitle>
            <CardDescription>A list of all closed loans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="search" className="sr-only">
                Search closed loans
              </Label>
              <Input
                id="search"
                placeholder="Search closed loans..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
                    <Button variant="ghost" onClick={() => handleSort("interestRate")}>
                      Interest Rate
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("closingDate")}>
                      Closing Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("loanType")}>
                      Loan Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("loanTerm")}>
                      Loan Term
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.borrower}</TableCell>
                    <TableCell>${loan.loanAmount.toLocaleString()}</TableCell>
                    <TableCell>{loan.interestRate}%</TableCell>
                    <TableCell>{loan.closingDate}</TableCell>
                    <TableCell>{loan.loanType}</TableCell>
                    <TableCell>{loan.loanTerm}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Closed</Badge>
                    </TableCell>
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

