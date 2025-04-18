"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, Plus, Mail, Phone, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample client data
const clients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "Active",
    loanOfficer: "Sarah Johnson",
    lastContact: "2023-06-01",
    loanType: "Conventional",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(555) 234-5678",
    status: "Inactive",
    loanOfficer: "Michael Brown",
    lastContact: "2023-05-15",
    loanType: "FHA",
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "(555) 345-6789",
    status: "Active",
    loanOfficer: "Sarah Johnson",
    lastContact: "2023-06-03",
    loanType: "VA",
  },
  {
    id: 4,
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    phone: "(555) 456-7890",
    status: "Active",
    loanOfficer: "Michael Brown",
    lastContact: "2023-05-28",
    loanType: "Jumbo",
  },
  {
    id: 5,
    name: "Michael Anderson",
    email: "michael.anderson@example.com",
    phone: "(555) 567-8901",
    status: "Inactive",
    loanOfficer: "Sarah Johnson",
    lastContact: "2023-05-10",
    loanType: "Conventional",
  },
]

export default function ClientDirectoryPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.loanOfficer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedClients = [...filteredClients].sort((a, b) => {
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
        <h2 className="text-3xl font-bold tracking-tight">Client Directory</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client List</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    className="h-8 w-[150px] lg:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>Manage your client relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("name")}>
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("status")}>
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("loanOfficer")}>
                        Loan Officer
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("lastContact")}>
                        Last Contact
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm flex items-center">
                            <Mail className="mr-2 h-3 w-3" /> {client.email}
                          </span>
                          <span className="text-sm flex items-center">
                            <Phone className="mr-2 h-3 w-3" /> {client.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                      </TableCell>
                      <TableCell>{client.loanOfficer}</TableCell>
                      <TableCell>{client.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Clients</CardTitle>
              <CardDescription>Clients with active loans or applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Loan Officer</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients
                    .filter((client) => client.status === "Active")
                    .map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm flex items-center">
                              <Mail className="mr-2 h-3 w-3" /> {client.email}
                            </span>
                            <span className="text-sm flex items-center">
                              <Phone className="mr-2 h-3 w-3" /> {client.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{client.loanType}</TableCell>
                        <TableCell>{client.loanOfficer}</TableCell>
                        <TableCell>{client.lastContact}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Clients</CardTitle>
              <CardDescription>Clients with no active loans or applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Loan Type</TableHead>
                    <TableHead>Loan Officer</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients
                    .filter((client) => client.status === "Inactive")
                    .map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm flex items-center">
                              <Mail className="mr-2 h-3 w-3" /> {client.email}
                            </span>
                            <span className="text-sm flex items-center">
                              <Phone className="mr-2 h-3 w-3" /> {client.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{client.loanType}</TableCell>
                        <TableCell>{client.loanOfficer}</TableCell>
                        <TableCell>{client.lastContact}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

