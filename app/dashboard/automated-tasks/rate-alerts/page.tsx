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
import {
  Percent,
  ArrowLeft,
  Plus,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  Search,
  Filter,
  Download,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample rate alert data
const rateAlerts = [
  {
    id: 1,
    clientName: "Johnson Family",
    loanAmount: "$320,000",
    targetRate: "3.5%",
    currentRate: "3.45%",
    status: "triggered",
    savings: "$150/month",
    dateCreated: "2023-05-15",
    dateTrigger: "Today",
    notified: false,
    loanType: "Conventional",
    loanTerm: "30-year fixed",
  },
  {
    id: 2,
    clientName: "Davis Household",
    loanAmount: "$420,000",
    targetRate: "3.65%",
    currentRate: "3.60%",
    status: "triggered",
    savings: "$95/month",
    dateCreated: "2023-05-20",
    dateTrigger: "Today",
    notified: false,
    loanType: "Conventional",
    loanTerm: "30-year fixed",
  },
  {
    id: 3,
    clientName: "Wilson Residence",
    loanAmount: "$275,000",
    targetRate: "3.4%",
    currentRate: "3.45%",
    status: "active",
    savings: "$0/month",
    dateCreated: "2023-05-25",
    dateTrigger: "N/A",
    notified: false,
    loanType: "FHA",
    loanTerm: "30-year fixed",
  },
  {
    id: 4,
    clientName: "Taylor Family",
    loanAmount: "$380,000",
    targetRate: "3.25%",
    currentRate: "3.45%",
    status: "active",
    savings: "$0/month",
    dateCreated: "2023-06-01",
    dateTrigger: "N/A",
    notified: false,
    loanType: "VA",
    loanTerm: "30-year fixed",
  },
  {
    id: 5,
    clientName: "Martinez Household",
    loanAmount: "$295,000",
    targetRate: "3.75%",
    currentRate: "3.45%",
    status: "triggered",
    savings: "$85/month",
    dateCreated: "2023-05-10",
    dateTrigger: "Yesterday",
    notified: true,
    loanType: "Conventional",
    loanTerm: "15-year fixed",
  },
  {
    id: 6,
    clientName: "Anderson Family",
    loanAmount: "$450,000",
    targetRate: "3.5%",
    currentRate: "3.45%",
    status: "triggered",
    savings: "$175/month",
    dateCreated: "2023-05-18",
    dateTrigger: "2 days ago",
    notified: true,
    loanType: "Jumbo",
    loanTerm: "30-year fixed",
  },
]

export default function RateAlertsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter alerts based on active tab and search term
  const filteredAlerts = rateAlerts.filter((alert) => {
    if (activeTab === "triggered" && alert.status !== "triggered") return false
    if (activeTab === "active" && alert.status !== "active") return false
    if (activeTab === "notified" && !alert.notified) return false

    if (searchTerm && !alert.clientName.toLowerCase().includes(searchTerm.toLowerCase())) return false

    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "triggered":
        return (
          <Badge className="bg-rt-primary text-white">
            <Bell className="mr-1 h-3 w-3" />
            Triggered
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-rt-secondary text-white">
            <Clock className="mr-1 h-3 w-3" />
            Active
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
          <h1 className="text-3xl font-bold tracking-tight text-rt-heading">Rate Alerts</h1>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Monitor and manage rate alerts for your clients</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-rt-primary text-rt-primary">
              <Settings className="mr-2 h-4 w-4" />
              Alert Settings
            </Button>
            <Button className="bg-rt-primary text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Alert
            </Button>
          </div>
        </div>

        {/* Rate Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Current Rate</CardTitle>
              <Percent className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-rt-primary">3.45%</div>
                <Badge className="ml-2 bg-green-500 text-white">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -0.15%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Updated: Today, 9:00 AM</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-rt-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-secondary">42</div>
              <p className="text-xs text-muted-foreground">Across 28 clients</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Triggered Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">4</div>
              <p className="text-xs text-muted-foreground">2 pending notifications</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Potential Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">$505/mo</div>
              <p className="text-xs text-muted-foreground">Total for all triggered alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Rate Alert List */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Rate Alert List</CardTitle>
              </div>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Alerts</TabsTrigger>
                  <TabsTrigger value="triggered">Triggered</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="notified">Notified</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Monitor and manage rate alerts for your clients</CardDescription>
          </CardHeader>
          <div className="px-4 py-2 border-b flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Filter by loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Loan Types</SelectItem>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="fha">FHA</SelectItem>
                    <SelectItem value="va">VA</SelectItem>
                    <SelectItem value="jumbo">Jumbo</SelectItem>
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
                  <TableHead>Client</TableHead>
                  <TableHead>Loan Details</TableHead>
                  <TableHead>Target Rate</TableHead>
                  <TableHead>Current Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Potential Savings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.clientName}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{alert.loanAmount}</div>
                          <div className="text-xs text-muted-foreground">
                            {alert.loanType}, {alert.loanTerm}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{alert.targetRate}</TableCell>
                      <TableCell className={alert.status === "triggered" ? "text-rt-primary font-medium" : ""}>
                        {alert.currentRate}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(alert.status)}
                        {alert.notified && (
                          <Badge variant="outline" className="ml-2">
                            <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                            Notified
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-rt-secondary">{alert.savings}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {alert.status === "triggered" && !alert.notified ? (
                            <Button size="sm" className="bg-rt-primary text-white">
                              Notify
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No rate alerts found</p>
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
                <span className="text-xs text-muted-foreground">Last rate check: Today, 11:30 AM</span>
              </div>
              <Button variant="link" className="text-rt-primary p-0">
                Configure Rate Check Frequency
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Create Alert Form */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-rt-primary" />
              <CardTitle className="text-rt-heading">Create New Rate Alert</CardTitle>
            </div>
            <CardDescription>Set up a new rate alert for a client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="johnson">Johnson Family</SelectItem>
                      <SelectItem value="davis">Davis Household</SelectItem>
                      <SelectItem value="wilson">Wilson Residence</SelectItem>
                      <SelectItem value="taylor">Taylor Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input id="loanAmount" placeholder="e.g. 320000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select>
                    <SelectTrigger id="loanType">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conventional">Conventional</SelectItem>
                      <SelectItem value="fha">FHA</SelectItem>
                      <SelectItem value="va">VA</SelectItem>
                      <SelectItem value="jumbo">Jumbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetRate">Target Rate</Label>
                  <Input id="targetRate" placeholder="e.g. 3.5" />
                  <p className="text-xs text-muted-foreground">Current market rate: 3.45%</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term</Label>
                  <Select>
                    <SelectTrigger id="loanTerm">
                      <SelectValue placeholder="Select loan term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-year">30-year fixed</SelectItem>
                      <SelectItem value="15-year">15-year fixed</SelectItem>
                      <SelectItem value="10-year">10-year fixed</SelectItem>
                      <SelectItem value="5-1-arm">5/1 ARM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch id="autoNotify" />
                  <Label htmlFor="autoNotify">Automatically notify client when target is reached</Label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-rt-primary text-white">Create Alert</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

