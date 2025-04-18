"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ArrowUpDown, Search } from "lucide-react"

// Example data for purchase lead sources
const leadSources = [
  { source: "Online Listings", count: 40, color: "bg-blue-500" },
  { source: "Real Estate Agents", count: 30, color: "bg-green-500" },
  { source: "Open Houses", count: 20, color: "bg-yellow-500" },
  { source: "Referrals", count: 15, color: "bg-purple-500" },
]

// Example data for individual purchase leads
const leads = [
  { id: 1, name: "Alex Johnson", source: "Online Listings", status: "New", date: "2023-06-05" },
  { id: 2, name: "Samantha Lee", source: "Real Estate Agents", status: "Contacted", date: "2023-06-04" },
  { id: 3, name: "Daniel Brown", source: "Open Houses", status: "Qualified", date: "2023-06-03" },
  { id: 4, name: "Emma Wilson", source: "Referrals", status: "New", date: "2023-06-05" },
  { id: 5, name: "Oliver Davis", source: "Online Listings", status: "Contacted", date: "2023-06-02" },
  { id: 6, name: "Sophia Martinez", source: "Real Estate Agents", status: "Qualified", date: "2023-06-01" },
  { id: 7, name: "Liam Taylor", source: "Open Houses", status: "New", date: "2023-06-04" },
  { id: 8, name: "Ava Anderson", source: "Referrals", status: "Contacted", date: "2023-06-03" },
]

export default function PurchaseLeadsPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const sortedLeads = [...leads]
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.status.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-2xl font-bold tracking-tight">Purchase Leads</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Lead
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {leadSources.map((source) => (
            <Card key={source.source}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{source.source}</CardTitle>
                <div className={`h-4 w-4 rounded-full ${source.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{source.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lead Details</CardTitle>
            <CardDescription>A list of all purchase leads from various sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="search" className="sr-only">
                Search leads
              </Label>
              <Input
                id="search"
                placeholder="Search leads..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Lead ID</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("name")}>
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("source")}>
                      Source
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.id}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.status}</Badge>
                    </TableCell>
                    <TableCell>{lead.date}</TableCell>
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

