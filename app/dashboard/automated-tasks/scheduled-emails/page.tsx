"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  ArrowLeft,
  Plus,
  Settings,
  Calendar,
  Clock,
  CheckCircle,
  Users,
  BarChart3,
  Filter,
  Download,
  Eye,
  Copy,
  Edit,
  Trash2,
  Send,
  Search,
  ArrowUpDown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Sample email templates
const emailTemplates = [
  { id: 1, name: "Rate Update", description: "Weekly rate update for clients" },
  { id: 2, name: "Refinance Opportunity", description: "Targeted email for refinance candidates" },
  { id: 3, name: "New Client Welcome", description: "Welcome email for new clients" },
  { id: 4, name: "Application Follow-up", description: "Follow-up for incomplete applications" },
  { id: 5, name: "Market Update", description: "Monthly market update newsletter" },
  { id: 6, name: "Client Anniversary", description: "Anniversary of loan closing" },
]

// Sample scheduled emails
const scheduledEmails = [
  {
    id: 1,
    name: "Weekly Rate Update",
    subject: "This Week's Mortgage Rate Update",
    status: "scheduled",
    scheduledDate: "Tomorrow",
    scheduledTime: "9:00 AM",
    recipients: "125 clients",
    segmentation: "All active clients",
    template: "Rate Update",
    frequency: "Weekly",
    lastSent: "7 days ago",
    openRate: "68%",
    clickRate: "42%",
    unsubscribeRate: "0.8%",
  },
  {
    id: 2,
    name: "Refinance Opportunity Alert",
    subject: "Limited Time: Refinance and Save",
    status: "scheduled",
    scheduledDate: "Tomorrow",
    scheduledTime: "10:30 AM",
    recipients: "42 clients",
    segmentation: "Refinance candidates",
    template: "Refinance Opportunity",
    frequency: "One-time",
    lastSent: "N/A",
    openRate: "N/A",
    clickRate: "N/A",
    unsubscribeRate: "N/A",
  },
  {
    id: 3,
    name: "New Client Welcome Series - Day 1",
    subject: "Welcome to Our Mortgage Family",
    status: "scheduled",
    scheduledDate: "Today",
    scheduledTime: "3:00 PM",
    recipients: "8 clients",
    segmentation: "New clients (last 24h)",
    template: "New Client Welcome",
    frequency: "Triggered",
    lastSent: "Yesterday",
    openRate: "85%",
    clickRate: "60%",
    unsubscribeRate: "0%",
  },
  {
    id: 4,
    name: "Application Follow-up Reminder",
    subject: "Complete Your Mortgage Application",
    status: "scheduled",
    scheduledDate: "Today",
    scheduledTime: "2:00 PM",
    recipients: "15 clients",
    segmentation: "Incomplete applications",
    template: "Application Follow-up",
    frequency: "Triggered",
    lastSent: "2 days ago",
    openRate: "72%",
    clickRate: "45%",
    unsubscribeRate: "0.5%",
  },
  {
    id: 5,
    name: "June Market Update",
    subject: "June 2023 Housing Market Update",
    status: "draft",
    scheduledDate: "June 15, 2023",
    scheduledTime: "9:00 AM",
    recipients: "All clients",
    segmentation: "All clients",
    template: "Market Update",
    frequency: "Monthly",
    lastSent: "May 15, 2023",
    openRate: "70%",
    clickRate: "38%",
    unsubscribeRate: "1.2%",
  },
  {
    id: 6,
    name: "Loan Anniversary - 1 Year",
    subject: "Happy Loan Anniversary!",
    status: "scheduled",
    scheduledDate: "June 10, 2023",
    scheduledTime: "10:00 AM",
    recipients: "12 clients",
    segmentation: "1-year loan anniversaries",
    template: "Client Anniversary",
    frequency: "Triggered",
    lastSent: "Ongoing",
    openRate: "75%",
    clickRate: "30%",
    unsubscribeRate: "0.2%",
  },
  {
    id: 7,
    name: "Rate Drop Alert",
    subject: "Rates Just Dropped - Act Now!",
    status: "sent",
    scheduledDate: "June 1, 2023",
    scheduledTime: "11:00 AM",
    recipients: "150 clients",
    segmentation: "Rate-sensitive clients",
    template: "Rate Update",
    frequency: "Triggered",
    lastSent: "June 1, 2023",
    openRate: "82%",
    clickRate: "55%",
    unsubscribeRate: "0.3%",
  },
  {
    id: 8,
    name: "Loan Closing Congratulations",
    subject: "Congratulations on Your New Home!",
    status: "sent",
    scheduledDate: "May 28, 2023",
    scheduledTime: "2:00 PM",
    recipients: "5 clients",
    segmentation: "Recent closings",
    template: "Custom",
    frequency: "Triggered",
    lastSent: "May 28, 2023",
    openRate: "100%",
    clickRate: "80%",
    unsubscribeRate: "0%",
  },
]

export default function ScheduledEmailsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Filter emails based on active tab and search term
  const filteredEmails = scheduledEmails.filter((email) => {
    if (activeTab === "scheduled" && email.status !== "scheduled") return false
    if (activeTab === "sent" && email.status !== "sent") return false
    if (activeTab === "draft" && email.status !== "draft") return false

    if (
      searchTerm &&
      !email.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !email.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false

    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-rt-secondary text-white">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "sent":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Sent
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline">
            <Edit className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="/dashboard/automated-tasks">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tasks
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-rt-heading">Scheduled Emails</h1>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Create, schedule, and monitor automated email campaigns</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-rt-primary text-rt-primary">
              <Settings className="mr-2 h-4 w-4" />
              Email Settings
            </Button>
            <Button className="bg-rt-primary text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Email
            </Button>
          </div>
        </div>

        {/* Email Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Total Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">8</div>
              <p className="text-xs text-muted-foreground">5 active, 3 completed</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Scheduled Today</CardTitle>
              <Calendar className="h-4 w-4 text-rt-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-secondary">2</div>
              <p className="text-xs text-muted-foreground">Next: 2:00 PM</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Average Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">75%</div>
              <p className="text-xs text-muted-foreground">Industry avg: 21%</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Total Recipients</CardTitle>
              <Users className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">357</div>
              <p className="text-xs text-muted-foreground">Across all campaigns</p>
            </CardContent>
          </Card>
        </div>

        {/* Email Campaign List */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Email Campaigns</CardTitle>
              </div>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Emails</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Manage your automated email campaigns</CardDescription>
          </CardHeader>
          <div className="px-4 py-2 border-b flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search campaigns..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Filter by template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Templates</SelectItem>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.name.toLowerCase().replace(/\s+/g, "-")}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="font-medium">{email.name}</TableCell>
                      <TableCell>{email.subject}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{email.recipients}</div>
                          <div className="text-xs text-muted-foreground">{email.segmentation}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{email.scheduledDate}</div>
                          <div className="text-xs text-muted-foreground">{email.scheduledTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(email.status)}
                        <div className="text-xs text-muted-foreground mt-1">{email.frequency}</div>
                      </TableCell>
                      <TableCell>
                        {email.status === "sent" ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Open: {email.openRate}</span>
                            </div>
                            <Progress value={Number.parseInt(email.openRate)} className="h-1" />
                            <div className="flex items-center justify-between text-xs">
                              <span>Click: {email.clickRate}</span>
                            </div>
                            <Progress value={Number.parseInt(email.clickRate)} className="h-1" />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not sent yet</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {email.status === "scheduled" ? (
                            <>
                              <Button size="sm" className="bg-rt-primary text-white">
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </>
                          ) : email.status === "draft" ? (
                            <>
                              <Button size="sm" className="bg-rt-primary text-white">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Mail className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No email campaigns found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-rt-primary/5 to-rt-secondary/5 border-t">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Last email sent: Today, 9:00 AM</span>
              </div>
              <Button variant="link" className="text-rt-primary p-0">
                View Email History
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Email Templates */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Email Templates</CardTitle>
              </div>
              <Button size="sm" className="bg-rt-primary text-white">
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </div>
            <CardDescription>Reusable email templates for your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emailTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer hover:border-rt-primary/50 transition-colors ${
                    selectedTemplate === template.name ? "border-rt-primary" : ""
                  }`}
                  onClick={() => setSelectedTemplate(selectedTemplate === template.name ? null : template.name)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Email Form */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-rt-primary" />
              <CardTitle className="text-rt-heading">Create New Email Campaign</CardTitle>
            </div>
            <CardDescription>Set up a new automated email campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input id="campaignName" placeholder="e.g. June Rate Update" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Email Subject</Label>
                  <Input id="emailSubject" placeholder="e.g. New Mortgage Rates Available" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Email Template</Label>
                  <Select>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.name.toLowerCase().replace(/\s+/g, "-")}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select>
                    <SelectTrigger id="recipients">
                      <SelectValue placeholder="Select recipient group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-clients">All Clients</SelectItem>
                      <SelectItem value="active-clients">Active Clients</SelectItem>
                      <SelectItem value="refinance-candidates">Refinance Candidates</SelectItem>
                      <SelectItem value="new-clients">New Clients (Last 30 Days)</SelectItem>
                      <SelectItem value="rate-alerts">Rate Alert Subscribers</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Estimated recipients: 125 clients</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Scheduled Date</Label>
                  <Input id="scheduledDate" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduledTime">Scheduled Time</Label>
                  <Input id="scheduledTime" type="time" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="triggered">Triggered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customMessage">Custom Message (Optional)</Label>
                  <Textarea
                    id="customMessage"
                    placeholder="Add a custom message to include in the email template..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-rt-primary text-white">Schedule Email</Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Analytics */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Email Analytics</CardTitle>
              </div>
              <Tabs defaultValue="week">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Performance metrics for your email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-rt-heading">Average Open Rate</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rt-primary">75%</span>
                  <Badge className="bg-green-500 text-white">
                    <ArrowUpDown className="mr-1 h-3 w-3" />
                    +5%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Industry average: 21%</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-rt-heading">Average Click Rate</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rt-secondary">42%</span>
                  <Badge className="bg-green-500 text-white">
                    <ArrowUpDown className="mr-1 h-3 w-3" />
                    +3%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Industry average: 2.5%</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-rt-heading">Unsubscribe Rate</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-500">0.5%</span>
                  <Badge className="bg-green-500 text-white">
                    <ArrowUpDown className="mr-1 h-3 w-3" />
                    -0.2%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Industry average: 0.5%</p>
              </div>
            </div>

            <div className="mt-8 h-64 border rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Email performance chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Best Performing Emails */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-rt-primary" />
              <CardTitle className="text-rt-heading">Best Performing Emails</CardTitle>
            </div>
            <CardDescription>Your top performing email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Rate Drop Alert</div>
                    <div className="text-sm text-muted-foreground">Sent: June 1, 2023</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-rt-primary">82% Open Rate</div>
                  <div className="text-sm text-rt-secondary">55% Click Rate</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">New Client Welcome Series - Day 1</div>
                    <div className="text-sm text-muted-foreground">Sent: Ongoing</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-rt-primary">85% Open Rate</div>
                  <div className="text-sm text-rt-secondary">60% Click Rate</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Loan Closing Congratulations</div>
                    <div className="text-sm text-muted-foreground">Sent: May 28, 2023</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-rt-primary">100% Open Rate</div>
                  <div className="text-sm text-rt-secondary">80% Click Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

