"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, Plus, Mail, Phone, MessageSquare, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample communication data
const communications = [
  {
    id: 1,
    clientName: "John Smith",
    type: "Email",
    subject: "Loan Application Status",
    date: "2023-06-05",
    time: "10:30 AM",
    status: "Sent",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 2,
    clientName: "Emily Davis",
    type: "Phone",
    subject: "Rate Discussion",
    date: "2023-06-04",
    time: "2:15 PM",
    status: "Completed",
    assignedTo: "Michael Brown",
  },
  {
    id: 3,
    clientName: "Robert Wilson",
    type: "Meeting",
    subject: "Loan Closing Preparation",
    date: "2023-06-07",
    time: "11:00 AM",
    status: "Scheduled",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 4,
    clientName: "Jennifer Taylor",
    type: "Email",
    subject: "Document Request",
    date: "2023-06-03",
    time: "9:45 AM",
    status: "Sent",
    assignedTo: "Michael Brown",
  },
  {
    id: 5,
    clientName: "Michael Anderson",
    type: "Phone",
    subject: "Follow-up Call",
    date: "2023-06-06",
    time: "3:30 PM",
    status: "Scheduled",
    assignedTo: "Sarah Johnson",
  },
]

export default function CommunicationLogPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredCommunications = communications
    .filter(
      (comm) =>
        (typeFilter === "all" || comm.type.toLowerCase() === typeFilter.toLowerCase()) &&
        (comm.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comm.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Communication Log</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Communication
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Track all client communications</CardDescription>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="h-8 w-[150px] lg:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("clientName")}>
                    Client
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
                  <Button variant="ghost" onClick={() => handleSort("subject")}>
                    Subject
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("date")}>
                    Date & Time
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
                  <Button variant="ghost" onClick={() => handleSort("assignedTo")}>
                    Assigned To
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommunications.map((comm) => (
                <TableRow key={comm.id}>
                  <TableCell className="font-medium">{comm.id}</TableCell>
                  <TableCell>{comm.clientName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {comm.type === "Email" && <Mail className="mr-2 h-4 w-4" />}
                      {comm.type === "Phone" && <Phone className="mr-2 h-4 w-4" />}
                      {comm.type === "Meeting" && <Calendar className="mr-2 h-4 w-4" />}
                      {comm.type}
                    </div>
                  </TableCell>
                  <TableCell>{comm.subject}</TableCell>
                  <TableCell>
                    {comm.date} at {comm.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        comm.status === "Sent" || comm.status === "Completed"
                          ? "default"
                          : comm.status === "Scheduled"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {comm.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{comm.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      {comm.type === "Email" && (
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      {comm.type === "Phone" && (
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      )}
                      {comm.type === "Meeting" && (
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

