"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, Search, DollarSign, UserCheck, Clock, Download, Plus } from "lucide-react"

// Sample data for active loans
const activeLoans = [
  {
    id: 1,
    borrower: "John Doe",
    loanAmount: 250000,
    interestRate: 3.5,
    status: "Processing",
    submissionDate: "2023-06-01",
    loanType: "Conventional",
    loanTerm: "30-year fixed",
    lender: "Bank of America",
  },
  {
    id: 2,
    borrower: "Jane Smith",
    loanAmount: 350000,
    interestRate: 3.75,
    status: "Underwriting",
    submissionDate: "2023-05-28",
    loanType: "FHA",
    loanTerm: "15-year fixed",
    lender: "Wells Fargo",
  },
  {
    id: 3,
    borrower: "Bob Johnson",
    loanAmount: 180000,
    interestRate: 3.25,
    status: "Approved",
    submissionDate: "2023-05-25",
    loanType: "VA",
    loanTerm: "30-year fixed",
    lender: "Chase",
  },
  {
    id: 4,
    borrower: "Alice Brown",
    loanAmount: 420000,
    interestRate: 4.0,
    status: "Closing",
    submissionDate: "2023-05-20",
    loanType: "Jumbo",
    loanTerm: "30-year fixed",
    lender: "Citibank",
  },
  {
    id: 5,
    borrower: "Charlie Davis",
    loanAmount: 300000,
    interestRate: 3.6,
    status: "Processing",
    submissionDate: "2023-05-30",
    loanType: "Conventional",
    loanTerm: "20-year fixed",
    lender: "US Bank",
  },
]

export default function ActiveLoansPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedLoans = activeLoans
    .filter(
      (loan) =>
        loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.lender.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Active Loans</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Loan
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Loans</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeLoans.length}</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Loan Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${activeLoans.reduce((sum, loan) => sum + loan.loanAmount, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14 days</div>
                <p className="text-xs text-muted-foreground">-2 days from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Card className="col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Loan Applications</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search loans..."
                      className="h-8 w-[150px] lg:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>A list of all active loan applications currently in process</CardDescription>
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
                        <Button variant="ghost" onClick={() => handleSort("lender")}>
                          Lender
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
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("loanType")}>
                          Loan Type
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedLoans.map((loan) => (
                      <TableRow
                        key={loan.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => router.push(`/dashboard/active-loans/${loan.id}`)}
                      >
                        <TableCell className="font-medium">{loan.id}</TableCell>
                        <TableCell>{loan.borrower}</TableCell>
                        <TableCell>{loan.lender}</TableCell>
                        <TableCell>${loan.loanAmount.toLocaleString()}</TableCell>
                        <TableCell>{loan.interestRate}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              loan.status === "Approved"
                                ? "success"
                                : loan.status === "Processing"
                                  ? "default"
                                  : loan.status === "Underwriting"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {loan.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{loan.submissionDate}</TableCell>
                        <TableCell>{loan.loanType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{filteredAndSortedLoans.length}</strong> of <strong>{activeLoans.length}</strong>{" "}
                  loans
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics for your active loans.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download reports for your active loans.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Report generation options will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

