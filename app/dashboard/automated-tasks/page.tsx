"use client"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AutomatedTasksList } from "@/components/automated-tasks-list"
import { Settings, Plus, Percent, Mail, Clock, Search, Calendar, BarChart3, ArrowUpDown } from "lucide-react"

export default function AutomatedTasksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-rt-heading">Automated Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor AI-powered automated tasks and notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-rt-primary text-rt-primary">
              <Settings className="mr-2 h-4 w-4" />
              Task Settings
            </Button>
            <Button className="bg-rt-primary text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Task Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Rate Alerts</CardTitle>
              <Percent className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">12</div>
              <p className="text-xs text-muted-foreground">3 pending alerts today</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Loan Searches</CardTitle>
              <Search className="h-4 w-4 text-rt-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-secondary">8</div>
              <p className="text-xs text-muted-foreground">2 pending searches today</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Scheduled Emails</CardTitle>
              <Mail className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">15</div>
              <p className="text-xs text-muted-foreground">Next: Tomorrow, 9:00 AM</p>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Follow-ups</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">7</div>
              <p className="text-xs text-muted-foreground">1 high priority today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Task List */}
        <AutomatedTasksList />

        {/* Scheduled Emails */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Scheduled Emails</CardTitle>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/automated-tasks/scheduled-emails">View All</a>
              </Button>
            </div>
            <CardDescription>Upcoming automated email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Weekly Rate Update</div>
                    <div className="text-sm text-muted-foreground">125 recipients</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge className="bg-rt-secondary text-white mb-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    Tomorrow, 9:00 AM
                  </Badge>
                  <div className="text-xs text-muted-foreground">Weekly frequency</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Refinance Opportunity Alert</div>
                    <div className="text-sm text-muted-foreground">42 recipients</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge className="bg-rt-secondary text-white mb-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    Tomorrow, 10:30 AM
                  </Badge>
                  <div className="text-xs text-muted-foreground">One-time campaign</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Application Follow-up Reminder</div>
                    <div className="text-sm text-muted-foreground">15 recipients</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge className="bg-rt-secondary text-white mb-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    Today, 2:00 PM
                  </Badge>
                  <div className="text-xs text-muted-foreground">Triggered campaign</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Analytics */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Task Analytics</CardTitle>
              </div>
              <Tabs defaultValue="week">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Performance metrics for automated tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-rt-heading">Task Completion Rate</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rt-primary">92%</span>
                  <Badge className="bg-green-500 text-white">
                    <ArrowUpDown className="mr-1 h-3 w-3" />
                    +5%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">92% of automated tasks were completed on time this week</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-rt-heading">Client Engagement</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rt-secondary">78%</span>
                  <Badge className="bg-green-500 text-white">
                    <ArrowUpDown className="mr-1 h-3 w-3" />
                    +12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">78% of clients engaged with automated communications</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-rt-heading">Conversion Rate</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-500">23%</span>
                  <Badge className="bg-green-500 text-white">
                    <ArrowUpDown className="mr-1 h-3 w-3" />
                    +3%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  23% of automated tasks led to client action or conversion
                </p>
              </div>
            </div>

            <div className="mt-8 h-64 border rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Task performance chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Task Calendar */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rt-primary" />
                <CardTitle className="text-rt-heading">Task Calendar</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="text-rt-primary border-rt-primary">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Task
              </Button>
            </div>
            <CardDescription>View and manage upcoming automated tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 border rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Task calendar will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

