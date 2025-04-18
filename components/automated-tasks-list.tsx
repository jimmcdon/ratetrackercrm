"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Bell, Mail, Search, Clock, CheckCircle, AlertCircle, Calendar, Percent, RefreshCw, Filter } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Rate Alert for Johnson Family",
    description: "Target rate of 3.5% has been reached. Send notification.",
    type: "rate-alert",
    status: "pending",
    dueDate: "Today",
    dueTime: "5:00 PM",
    priority: "high",
    clientName: "Johnson Family",
    loanAmount: "$320,000",
    targetRate: "3.5%",
    currentRate: "3.45%",
    savings: "$150/month",
  },
  {
    id: 2,
    title: "Loan Search for Smith Refinance",
    description: "Complete loan search based on updated criteria.",
    type: "loan-search",
    status: "pending",
    dueDate: "Today",
    dueTime: "EOD",
    priority: "medium",
    clientName: "Smith Family",
    loanAmount: "$275,000",
    loanType: "Conventional",
    loanTerm: "30-year fixed",
    creditScore: "740-759",
  },
  {
    id: 3,
    title: "Scheduled Email: Rate Update Newsletter",
    description: "Weekly rate update newsletter to all active clients.",
    type: "scheduled-email",
    status: "scheduled",
    dueDate: "Tomorrow",
    dueTime: "9:00 AM",
    priority: "medium",
    recipients: "125 clients",
    openRate: "68%",
    template: "Weekly Rate Update",
  },
  {
    id: 4,
    title: "Follow-up with Wilson on Application",
    description: "Automated follow-up reminder for incomplete application.",
    type: "follow-up",
    status: "pending",
    dueDate: "Today",
    dueTime: "3:00 PM",
    priority: "high",
    clientName: "Robert Wilson",
    lastContact: "5 days ago",
    applicationStatus: "70% complete",
  },
  {
    id: 5,
    title: "Rate Alert for Davis Household",
    description: "Target rate of 3.65% has been reached. Send notification.",
    type: "rate-alert",
    status: "pending",
    dueDate: "Today",
    dueTime: "5:00 PM",
    priority: "medium",
    clientName: "Davis Household",
    loanAmount: "$420,000",
    targetRate: "3.65%",
    currentRate: "3.60%",
    savings: "$95/month",
  },
  {
    id: 6,
    title: "Scheduled Email: Refinance Opportunity",
    description: "Targeted email to clients who could benefit from current rates.",
    type: "scheduled-email",
    status: "scheduled",
    dueDate: "Tomorrow",
    dueTime: "10:30 AM",
    priority: "high",
    recipients: "42 clients",
    openRate: "N/A",
    template: "Refinance Opportunity",
  },
]

export function AutomatedTasksList() {
  const [activeTab, setActiveTab] = useState("all")
  const [showCompleted, setShowCompleted] = useState(false)

  // Filter tasks based on active tab and completion status
  const filteredTasks = tasks.filter((task) => {
    if (activeTab !== "all" && task.type !== activeTab) return false
    if (!showCompleted && task.status === "completed") return false
    return true
  })

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "rate-alert":
        return <Percent className="h-5 w-5 text-rt-primary" />
      case "loan-search":
        return <Search className="h-5 w-5 text-rt-secondary" />
      case "scheduled-email":
        return <Mail className="h-5 w-5 text-blue-500" />
      case "follow-up":
        return <Clock className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-rt-primary" />
    }
  }

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-500 text-white">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-blue-500 text-white">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-rt-primary text-white">High</Badge>
      case "medium":
        return <Badge className="bg-rt-secondary text-white">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTaskDetails = (task: (typeof tasks)[0]) => {
    switch (task.type) {
      case "rate-alert":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div>
              <span className="text-muted-foreground">Client:</span> {task.clientName}
            </div>
            <div>
              <span className="text-muted-foreground">Loan Amount:</span> {task.loanAmount}
            </div>
            <div>
              <span className="text-muted-foreground">Target Rate:</span> {task.targetRate}
            </div>
            <div>
              <span className="text-muted-foreground">Current Rate:</span> {task.currentRate}
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Potential Savings:</span>{" "}
              <span className="text-rt-secondary font-medium">{task.savings}</span>
            </div>
          </div>
        )
      case "loan-search":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div>
              <span className="text-muted-foreground">Client:</span> {task.clientName}
            </div>
            <div>
              <span className="text-muted-foreground">Loan Amount:</span> {task.loanAmount}
            </div>
            <div>
              <span className="text-muted-foreground">Loan Type:</span> {task.loanType}
            </div>
            <div>
              <span className="text-muted-foreground">Loan Term:</span> {task.loanTerm}
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Credit Score Range:</span> {task.creditScore}
            </div>
          </div>
        )
      case "scheduled-email":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div>
              <span className="text-muted-foreground">Recipients:</span> {task.recipients}
            </div>
            <div>
              <span className="text-muted-foreground">Expected Open Rate:</span> {task.openRate}
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Template:</span> {task.template}
            </div>
          </div>
        )
      case "follow-up":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div>
              <span className="text-muted-foreground">Client:</span> {task.clientName}
            </div>
            <div>
              <span className="text-muted-foreground">Last Contact:</span> {task.lastContact}
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Application Status:</span> {task.applicationStatus}
              <Progress value={70} className="h-2 mt-1" />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="border-rt-primary/20">
      <CardHeader className="bg-gradient-to-r from-rt-primary/10 to-rt-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-rt-primary" />
            <CardTitle className="text-rt-heading">Automated Tasks</CardTitle>
          </div>
          <Badge className="bg-rt-primary text-white">{filteredTasks.length} Tasks</Badge>
        </div>
        <CardDescription>AI-powered automated tasks and notifications</CardDescription>
      </CardHeader>
      <div className="px-4 py-2 border-b flex items-center justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all" className="data-[state=active]:text-rt-primary">
              All Tasks
            </TabsTrigger>
            <TabsTrigger value="rate-alert" className="data-[state=active]:text-rt-primary">
              Rate Alerts
            </TabsTrigger>
            <TabsTrigger value="loan-search" className="data-[state=active]:text-rt-primary">
              Loan Searches
            </TabsTrigger>
            <TabsTrigger value="scheduled-email" className="data-[state=active]:text-rt-primary">
              Scheduled Emails
            </TabsTrigger>
            <TabsTrigger value="follow-up" className="data-[state=active]:text-rt-primary">
              Follow-ups
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="px-4 py-2 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="show-completed" checked={showCompleted} onCheckedChange={setShowCompleted} />
            <Label htmlFor="show-completed">Show Completed</Label>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-rt-primary border-rt-primary">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <CardContent className="p-0">
        <div className="divide-y">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getTaskIcon(task.type)}</div>
                    <div>
                      <div className="font-medium text-rt-heading">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.description}</div>
                      {getTaskDetails(task)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {getTaskStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due: {task.dueDate} at {task.dueTime}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm" className="bg-rt-primary text-white">
                        Complete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-rt-heading mb-1">No tasks found</h3>
              <p className="text-sm text-muted-foreground">
                {showCompleted
                  ? "No tasks match your current filters."
                  : "All tasks have been completed. Toggle 'Show Completed' to view past tasks."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-rt-primary/5 to-rt-secondary/5 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last updated: Today, 11:30 AM</span>
          </div>
          <Button variant="link" className="text-rt-primary p-0">
            Task Settings
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

