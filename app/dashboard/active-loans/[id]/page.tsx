"use client"

import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  FileText,
  Phone,
  Mail,
  Home,
  Percent,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample data for active loans (this should be replaced with a proper data fetching mechanism)
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
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    propertyAddress: "456 Oak Ave, Anytown, USA 12345",
    propertyType: "Single Family Residence",
    loanPurpose: "Purchase",
    creditScore: 750,
    debtToIncome: "36%",
    loanToValue: "80%",
    documents: [
      { name: "Loan Application", status: "Submitted", date: "2023-06-01" },
      { name: "Income Verification", status: "Pending", date: "2023-06-02" },
      { name: "Credit Report", status: "Received", date: "2023-06-01" },
      { name: "Property Appraisal", status: "Scheduled", date: "2023-06-10" },
    ],
    notes: [
      { date: "2023-06-01", author: "Jane Smith", content: "Initial application received." },
      { date: "2023-06-02", author: "Mike Johnson", content: "Requested additional income documentation." },
    ],
  },
  // ... (other loan entries)
]

export default function BorrowerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const loanId = Number(params.id)
  const loan = activeLoans.find((loan) => loan.id === loanId)

  if (!loan) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Borrower Not Found</h1>
          <p>The requested borrower information could not be found.</p>
          <Button onClick={() => router.push("/dashboard/active-loans")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Active Loans
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/active-loans")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{loan.borrower}</h2>
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
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Borrower Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-xl">{getInitials(loan.borrower)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-medium">{loan.borrower}</h3>
                <p className="text-sm text-muted-foreground">Loan ID: {loan.id}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{loan.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{loan.phone}</span>
              </div>
              <div className="flex items-start">
                <Home className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm">{loan.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="col-span-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loan Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${loan.loanAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{loan.loanType}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interest Rate</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loan.interestRate}%</div>
                <p className="text-xs text-muted-foreground">{loan.loanTerm}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submission Date</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loan.submissionDate}</div>
                <p className="text-xs text-muted-foreground">Lender: {loan.lender}</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex-1">
                Documents
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                Notes
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1">
                Timeline
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Property Address</h3>
                      <p className="text-sm">{loan.propertyAddress}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Property Type</h3>
                      <p className="text-sm">{loan.propertyType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Loan Purpose</h3>
                      <p className="text-sm">{loan.loanPurpose}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Credit Score</h3>
                      <p className="text-sm">{loan.creditScore}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Debt-to-Income Ratio</h3>
                      <p className="text-sm">{loan.debtToIncome}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Loan-to-Value Ratio</h3>
                      <p className="text-sm">{loan.loanToValue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>Track the status of required loan documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loan.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.date}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            doc.status === "Submitted" || doc.status === "Received"
                              ? "success"
                              : doc.status === "Pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Notes</CardTitle>
                  <CardDescription>Communication history and important notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loan.notes.map((note, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{note.author}</p>
                          <p className="text-xs text-muted-foreground">{note.date}</p>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add Note
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="timeline" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Timeline</CardTitle>
                  <CardDescription>Track the progress of this loan application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l pl-6 pb-2">
                    <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
                    <div className="mb-6">
                      <p className="text-sm font-medium">Application Submitted</p>
                      <p className="text-xs text-muted-foreground">{loan.submissionDate}</p>
                      <p className="text-sm mt-1">Initial loan application received and processed.</p>
                    </div>
                    <div className="absolute left-0 top-24 h-3 w-3 rounded-full bg-primary"></div>
                    <div className="mb-6">
                      <p className="text-sm font-medium">Processing</p>
                      <p className="text-xs text-muted-foreground">2023-06-02</p>
                      <p className="text-sm mt-1">Loan application is being processed and reviewed.</p>
                    </div>
                    <div className="absolute left-0 top-48 h-3 w-3 rounded-full bg-muted"></div>
                    <div className="mb-6">
                      <p className="text-sm font-medium">Underwriting</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-sm mt-1">Loan will be reviewed by underwriters.</p>
                    </div>
                    <div className="absolute left-0 top-72 h-3 w-3 rounded-full bg-muted"></div>
                    <div>
                      <p className="text-sm font-medium">Closing</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-sm mt-1">Final loan approval and closing.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}

