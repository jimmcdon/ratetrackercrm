"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpDown, Search, Upload, Download, Eye } from "lucide-react"

// Example data for document categories
const documentCategories = [
  { category: "Identification", count: 15, color: "bg-blue-500" },
  { category: "Income", count: 20, color: "bg-green-500" },
  { category: "Assets", count: 10, color: "bg-yellow-500" },
  { category: "Property", count: 8, color: "bg-purple-500" },
  { category: "Insurance", count: 5, color: "bg-red-500" },
]

// Example data for documents
const documents = [
  { id: 1, name: "Driver's License", category: "Identification", status: "Verified", date: "2023-06-01" },
  { id: 2, name: "Pay Stub", category: "Income", status: "Pending", date: "2023-06-03" },
  { id: 3, name: "Bank Statement", category: "Assets", status: "Requested", date: "2023-06-02" },
  { id: 4, name: "Property Appraisal", category: "Property", status: "Verified", date: "2023-05-28" },
  { id: 5, name: "Homeowners Insurance", category: "Insurance", status: "Pending", date: "2023-06-04" },
  { id: 6, name: "W-2 Form", category: "Income", status: "Verified", date: "2023-05-30" },
  { id: 7, name: "Passport", category: "Identification", status: "Pending", date: "2023-06-05" },
  { id: 8, name: "Investment Account Statement", category: "Assets", status: "Requested", date: "2023-06-01" },
]

export default function ClientDocumentPortalPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const sortedDocuments = [...documents]
    .filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.status.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-2xl font-bold tracking-tight">Client Document Portal</h1>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {documentCategories.map((category) => (
            <Card key={category.category}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{category.category}</CardTitle>
                <div className={`h-4 w-4 rounded-full ${category.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{category.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Document List</CardTitle>
            <CardDescription>Manage and track client documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="search" className="sr-only">
                Search documents
              </Label>
              <Input
                id="search"
                placeholder="Search documents..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("name")}>
                      Document Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("category")}>
                      Category
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
                    <Button variant="ghost" onClick={() => handleSort("date")}>
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>
                      <Badge variant={doc.status === "Verified" ? "default" : "secondary"}>{doc.status}</Badge>
                    </TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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

