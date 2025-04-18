"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Search, Plus, Mail, Users, BarChart, Eye, Copy, Edit } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample campaign data
const campaigns = [
  {
    id: 1,
    name: "June Rate Update",
    subject: "New Mortgage Rates Available",
    status: "Sent",
    sentDate: "2023-06-01",
    recipients: 150,
    openRate: 68,
    clickRate: 42,
  },
  {
    id: 2,
    name: "Refinance Opportunity",
    subject: "Limited Time Refinance Offer",
    status: "Scheduled",
    sentDate: "2023-06-10",
    recipients: 200,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 3,
    name: "First-Time Homebuyer Guide",
    subject: "Your Guide to First-Time Home Buying",
    status: "Draft",
    sentDate: "",
    recipients: 0,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 4,
    name: "Market Update Q2",
    subject: "Q2 2023 Housing Market Update",
    status: "Sent",
    sentDate: "2023-05-15",
    recipients: 175,
    openRate: 72,
    clickRate: 38,
  },
  {
    id: 5,
    name: "Client Appreciation",
    subject: "Thank You for Your Business",
    status: "Scheduled",
    sentDate: "2023-06-15",
    recipients: 120,
    openRate: 0,
    clickRate: 0,
  },
]

// Sample templates
const templates = [
  {
    id: 1,
    name: "Rate Update",
    description: "Template for monthly rate updates",
    lastUsed: "2023-06-01",
  },
  {
    id: 2,
    name: "Refinance Offer",
    description: "Template for refinance opportunities",
    lastUsed: "2023-05-20",
  },
  {
    id: 3,
    name: "Welcome Email",
    description: "Template for new client welcome",
    lastUsed: "2023-05-15",
  },
  {
    id: 4,
    name: "Market Update",
    description: "Template for market updates",
    lastUsed: "2023-05-10",
  },
]

export default function EmailCampaignsPage() {
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

  const filteredCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()),
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
        <h2 className="text-3xl font-bold tracking-tight">Email Campaigns</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0)}
            </div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                campaigns
                  .filter((campaign) => campaign.status === "Sent")
                  .reduce((sum, campaign) => sum + campaign.openRate, 0) /
                  campaigns.filter((campaign) => campaign.status === "Sent").length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Click Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                campaigns
                  .filter((campaign) => campaign.status === "Sent")
                  .reduce((sum, campaign) => sum + campaign.clickRate, 0) /
                  campaigns.filter((campaign) => campaign.status === "Sent").length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="mt-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Campaigns</CardTitle>
                  <CardDescription>Manage your email marketing campaigns</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    className="h-8 w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("name")}>
                        Campaign Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("subject")}>
                        Subject Line
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
                      <Button variant="ghost" onClick={() => handleSort("sentDate")}>
                        Sent Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("recipients")}>
                        Recipients
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.id}</TableCell>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.subject}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === "Sent"
                              ? "default"
                              : campaign.status === "Scheduled"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sentDate || "—"}</TableCell>
                      <TableCell>{campaign.recipients}</TableCell>
                      <TableCell>
                        {campaign.status === "Sent" ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Open Rate: {campaign.openRate}%</span>
                            </div>
                            <Progress value={campaign.openRate} className="h-1" />
                            <div className="flex items-center justify-between text-xs">
                              <span>Click Rate: {campaign.clickRate}%</span>
                            </div>
                            <Progress value={campaign.clickRate} className="h-1" />
                          </div>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
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
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage your reusable email templates</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Last used: {template.lastUsed}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

