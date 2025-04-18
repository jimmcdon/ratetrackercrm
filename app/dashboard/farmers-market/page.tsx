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

// Example data for farmers market lead sources
const leadSources = [
  { source: "Information Booth", count: 30, color: "bg-green-500" },
  { source: "Flyer Distribution", count: 25, color: "bg-yellow-500" },
  { source: "Vendor Referrals", count: 15, color: "bg-blue-500" },
  { source: "On-site Consultations", count: 20, color: "bg-purple-500" },
]

// Example data for individual farmers market leads
const leads = [
  { id: 1, name: "Emily Johnson", source: "Information Booth", status: "New", date: "2023-06-05", type: "R&T" },
  {
    id: 2,
    name: "Michael Lee",
    source: "Flyer Distribution",
    status: "Contacted",
    date: "2023-06-04",
    type: "Cash Out",
  },
  {
    id: 3,
    name: "Sarah Davis",
    source: "Vendor Referrals",
    status: "Qualified",
    date: "2023-06-03",
    type: "Shorten Term",
  },
  { id: 4, name: "David Wilson", source: "On-site Consultations", status: "New", date: "2023-06-05", type: "Purchase" },
  { id: 5, name: "Jessica Brown", source: "Information Booth", status: "Contacted", date: "2023-06-02", type: "R&T" },
  {
    id: 6,
    name: "Ryan Taylor",
    source: "Flyer Distribution",
    status: "Qualified",
    date: "2023-06-01",
    type: "Cash Out",
  },
  {
    id: 7,
    name: "Amanda Martinez",
    source: "Vendor Referrals",
    status: "New",
    date: "2023-06-04",
    type: "Shorten Term",
  },
  {
    id: 8,
    name: "Christopher Lee",
    source: "On-site Consultations",
    status: "Contacted",
    date: "2023-06-03",
    type: "Purchase",
  },
]

export default function FarmersMarketLeadsPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const sortedLeads = [...leads]
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.type.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-2xl font-bold tracking-tight">Farmers Market Leads</h1>
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
            <CardDescription>A list of all farmers market leads from various sources</CardDescription>
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
                    <Button variant="ghost" onClick={() => handleSort("type")}>
                      Type
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
                    <TableCell>{lead.type}</TableCell>
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

