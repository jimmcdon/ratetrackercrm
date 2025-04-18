"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, Search, Percent, Briefcase, FileCheck, FileText, Users, Brain, Target, TrendingDown } from "lucide-react"
import { AIInsights } from "@/components/ai-insights"

// Example search results (in a real application, this would come from an API)
const searchResults = [
  { id: 1, type: "Loan", title: "Loan Application - John Doe", link: "/dashboard/loans/1" },
  { id: 2, type: "Lead", title: "New Lead - Jane Smith", link: "/dashboard/organic-leads/2" },
  { id: 3, type: "Task", title: "Follow up on Wilson application", link: "/dashboard/todo" },
  { id: 4, type: "Calendar", title: "Meeting with Real Estate Agent", link: "/dashboard/calendar" },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof searchResults>([])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // In a real application, this would be an API call
    const filteredResults = searchResults.filter((result) => result.title.toLowerCase().includes(term.toLowerCase()))
    setSearchResults(filteredResults)
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-rt-heading">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-rt-primary text-rt-primary">
              <Target className="mr-2 h-4 w-4" />
              Set Rate Target
            </Button>
            <Button className="bg-rt-primary text-white">
              <Brain className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Automated Task Alert */}
        <Alert className="bg-rt-secondary/10 border-rt-secondary">
          <Bell className="h-4 w-4 text-rt-secondary" />
          <AlertTitle className="text-rt-secondary">Automated Tasks</AlertTitle>
          <AlertDescription>
            2 loan searches need to be completed. Automated emails will be sent if not completed by EOD.
          </AlertDescription>
        </Alert>

        {/* Custom Search Component */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <CardTitle className="text-rt-heading">Quick Search</CardTitle>
            <CardDescription>Search across loans, leads, tasks, and calendar events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-rt-primary" />
              <Input
                type="search"
                placeholder="Search..."
                className="flex-1 border-rt-primary/20 focus-visible:ring-rt-primary"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {searchTerm && (
              <div className="mt-4 space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-2 hover:bg-rt-primary/5 rounded-md"
                    >
                      <div>
                        <p className="font-medium">{result.title}</p>
                        <p className="text-sm text-muted-foreground">{result.type}</p>
                      </div>
                      <Button
                        variant="ghost"
                        asChild
                        className="text-rt-primary hover:text-rt-primary hover:bg-rt-primary/10"
                      >
                        <a href={result.link}>View</a>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No results found</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights Component */}
        <AIInsights />

        {/* Today's Interest Rate - Moved to top */}
        <Card className="border-rt-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rt-heading">Today's Interest Rate</CardTitle>
            <Percent className="h-4 w-4 text-rt-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-rt-primary">3.75%</div>
              <Badge className="ml-2 bg-green-500 text-white">
                <TrendingDown className="mr-1 h-3 w-3" />
                Trending Down
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Last updated: Today, 9:00 AM</p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">New Leads</CardTitle>
              <Users className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">12</div>
              <div className="text-xs text-rt-secondary">+3 from AI-identified opportunities</div>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Active Loans</CardTitle>
              <Briefcase className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">24</div>
              <div className="text-xs text-rt-secondary">5 predicted to close this month</div>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Pre-approved Loans</CardTitle>
              <FileCheck className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">8</div>
              <div className="text-xs text-rt-secondary">3 high-priority leads</div>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rt-heading">Estimates Out</CardTitle>
              <FileText className="h-4 w-4 text-rt-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rt-primary">15</div>
              <div className="text-xs text-rt-secondary">72% conversion predicted</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-rt-primary/20">
            <CardHeader>
              <CardTitle className="text-rt-heading">Daily Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox text-rt-primary" />
                  <span>Complete loan searches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox text-rt-primary" />
                  <span>Review new applications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox text-rt-primary" />
                  <span>Update loan conditions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox text-rt-primary" />
                  <span className="flex items-center">
                    <span>Follow up with high-priority leads</span>
                    <Badge className="ml-2 bg-rt-primary text-white text-xs">AI Suggested</Badge>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-rt-primary/20">
            <CardHeader>
              <CardTitle className="text-rt-heading">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Client Birthday - John Doe</span>
                  <span className="text-sm text-rt-secondary">Tomorrow</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Loan Anniversary - Smith Family</span>
                  <span className="text-sm text-rt-secondary">In 3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span>Rate Target Alert - 5 clients</span>
                    <Badge className="ml-2 bg-rt-primary text-white text-xs">AI Predicted</Badge>
                  </span>
                  <span className="text-sm text-rt-secondary">This week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loansifter Integration */}
        <Card className="border-rt-primary/20">
          <CardHeader>
            <CardTitle className="text-rt-heading">Loansifter Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Last sync: 5 minutes ago</span>
                <Button className="bg-rt-primary hover:bg-rt-primary/90 text-white">Sync Now</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold text-rt-heading">New Rates</h4>
                  <p className="text-2xl font-bold text-rt-primary">3.75%</p>
                  <p className="text-xs text-rt-secondary">AI predicts further drop</p>
                </div>
                <div>
                  <h4 className="font-semibold text-rt-heading">Products Updated</h4>
                  <p className="text-2xl font-bold text-rt-primary">127</p>
                  <p className="text-xs text-rt-secondary">15 match client profiles</p>
                </div>
                <div>
                  <h4 className="font-semibold text-rt-heading">Lenders Active</h4>
                  <p className="text-2xl font-bold text-rt-primary">45</p>
                  <p className="text-xs text-rt-secondary">Top 5 ranked by AI</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

