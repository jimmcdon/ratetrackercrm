"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, Plus, Phone, Calendar, Clock, CheckCircle, XCircle, User } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample call list data
const callLists = [
  {
    id: 1,
    name: "Rate Check-In",
    description: "Clients to contact about new rates",
    totalCalls: 15,
    completedCalls: 8,
    dueDate: "2023-06-10",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 2,
    name: "Application Follow-Up",
    description: "Follow up on pending applications",
    totalCalls: 10,
    completedCalls: 5,
    dueDate: "2023-06-08",
    assignedTo: "Michael Brown",
  },
  {
    id: 3,
    name: "Client Satisfaction",
    description: "Check in with recent clients",
    totalCalls: 20,
    completedCalls: 12,
    dueDate: "2023-06-15",
    assignedTo: "Sarah Johnson",
  },
]

// Sample calls data
const calls = [
  {
    id: 1,
    clientName: "John Smith",
    phone: "(555) 123-4567",
    listName: "Rate Check-In",
    status: "Completed",
    notes: "Discussed new rates, client interested in refinancing",
    scheduledTime: "2023-06-05 10:30 AM",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 2,
    clientName: "Emily Davis",
    phone: "(555) 234-5678",
    listName: "Rate Check-In",
    status: "Scheduled",
    notes: "",
    scheduledTime: "2023-06-07 2:15 PM",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 3,
    clientName: "Robert Wilson",
    phone: "(555) 345-6789",
    listName: "Application Follow-Up",
    status: "Completed",
    notes: "Client provided missing documents",
    scheduledTime: "2023-06-04 11:00 AM",
    assignedTo: "Michael Brown",
  },
  {
    id: 4,
    clientName: "Jennifer Taylor",
    phone: "(555) 456-7890",
    listName: "Application Follow-Up",
    status: "Pending",
    notes: "",
    scheduledTime: "2023-06-08 9:45 AM",
    assignedTo: "Michael Brown",
  },
  {
    id: 5,
    clientName: "Michael Anderson",
    phone: "(555) 567-8901",
    listName: "Client Satisfaction",
    status: "Pending",
    notes: "",
    scheduledTime: "2023-06-09 3:30 PM",
    assignedTo: "Sarah Johnson",
  },
]

export default function CallListsPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedList, setSelectedList] = useState<number | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredCalls = calls
    .filter(
      (call) =>
        (statusFilter === "all" || call.status.toLowerCase() === statusFilter.toLowerCase()) &&
        (selectedList === null || call.listName === callLists.find((list) => list.id === selectedList)?.name) &&
        (call.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.phone.includes(searchTerm) ||
          call.listName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())),
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
        <h2 className="text-3xl font-bold tracking-tight">Call Lists</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Call List
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        {callLists.map((list) => (
          <Card
            key={list.id}
            className={`cursor-pointer ${selectedList === list.id ? "border-primary" : ""}`}
            onClick={() => setSelectedList(selectedList === list.id ? null : list.id)}
          >
            <CardHeader>
              <CardTitle>{list.name}</CardTitle>
              <CardDescription>{list.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-lg font-medium">
                    {list.completedCalls} / {list.totalCalls} calls
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Due: {list.dueDate}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-4 w-4" />
                {list.assignedTo}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Call Queue</CardTitle>
              <CardDescription>
                {selectedList
                  ? `Showing calls for ${callLists.find((list) => list.id === selectedList)?.name}`
                  : "Showing all scheduled calls"}
              </CardDescription>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: 50 }}>
                  <Checkbox />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("clientName")}>
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("listName")}>
                    List
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("scheduledTime")}>
                    Scheduled Time
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
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <Checkbox checked={call.status === "Completed"} />
                  </TableCell>
                  <TableCell className="font-medium">{call.clientName}</TableCell>
                  <TableCell>{call.phone}</TableCell>
                  <TableCell>{call.listName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {call.scheduledTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        call.status === "Completed" ? "default" : call.status === "Scheduled" ? "outline" : "secondary"
                      }
                    >
                      {call.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{call.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
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

