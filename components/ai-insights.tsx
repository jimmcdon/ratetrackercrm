"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  AlertCircle,
  Clock,
  Users,
  Brain,
  Target,
  BarChart3,
  UserCheck,
  Lightbulb,
  ArrowRight,
} from "lucide-react"

export function AIInsights() {
  const [activeTab, setActiveTab] = useState("rate-predictions")

  return (
    <Card className="border-rt-primary/20">
      <CardHeader className="bg-gradient-to-r from-rt-primary/10 to-rt-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-rt-primary" />
            <CardTitle className="text-rt-heading">AI-Powered Insights</CardTitle>
          </div>
          <Badge className="bg-rt-secondary text-white">New</Badge>
        </div>
        <CardDescription>Intelligent predictions and recommendations powered by machine learning</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="rate-predictions" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none border-b grid grid-cols-3">
            <TabsTrigger value="rate-predictions" className="data-[state=active]:text-rt-primary">
              Rate Predictions
            </TabsTrigger>
            <TabsTrigger value="lead-insights" className="data-[state=active]:text-rt-primary">
              Lead Insights
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:text-rt-primary">
              Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Rate Predictions Tab */}
          <TabsContent value="rate-predictions" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-rt-heading">Short-Term Rate Forecast</h3>
                <p className="text-sm text-muted-foreground">Based on market trends and economic indicators</p>
              </div>
              <Badge className="bg-amber-500 text-white">
                <TrendingDown className="mr-1 h-3 w-3" />
                Trending Down
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-rt-body p-3 rounded-md border border-rt-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">7-Day Forecast</span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-rt-primary">3.65%</div>
                <div className="text-xs text-green-600">-0.10% from current</div>
              </div>

              <div className="bg-rt-body p-3 rounded-md border border-rt-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">30-Day Forecast</span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-rt-primary">3.55%</div>
                <div className="text-xs text-green-600">-0.20% from current</div>
              </div>

              <div className="bg-rt-body p-3 rounded-md border border-rt-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Confidence Level</span>
                  <AlertCircle className="h-4 w-4 text-rt-primary" />
                </div>
                <div className="text-2xl font-bold text-rt-primary">78%</div>
                <div className="text-xs text-muted-foreground">Based on 24 indicators</div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Personalized Rate Qualification Estimate</h4>
              <div className="p-3 bg-rt-secondary/10 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">Your Estimated Rate:</span>
                    <span className="ml-2 text-lg font-bold text-rt-secondary">3.85%</span>
                  </div>
                  <Badge variant="outline" className="border-rt-secondary text-rt-secondary">
                    Personalized
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on your credit score range (740-759), LTV (75%), and loan amount ($320,000)
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Lead Insights Tab */}
          <TabsContent value="lead-insights" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-rt-heading">Lead Scoring & Prioritization</h3>
                <p className="text-sm text-muted-foreground">AI-ranked leads based on conversion likelihood</p>
              </div>
              <Button variant="outline" size="sm" className="text-rt-primary border-rt-primary">
                View All Leads
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Michael Johnson", score: 92, status: "Ready to Apply", lastContact: "2 days ago" },
                { name: "Sarah Williams", score: 87, status: "Considering Options", lastContact: "1 day ago" },
                { name: "David Thompson", score: 76, status: "Rate Shopping", lastContact: "4 days ago" },
              ].map((lead, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-rt-body rounded-md border border-rt-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                        lead.score > 90 ? "bg-rt-primary" : lead.score > 80 ? "bg-rt-secondary" : "bg-amber-500"
                      }`}
                    >
                      {lead.score}
                    </div>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">Status: {lead.status}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground">Last Contact: {lead.lastContact}</span>
                    <Button variant="ghost" size="sm" className="text-rt-primary">
                      Contact Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Database Mining Opportunities</h4>
              <div className="p-3 bg-rt-primary/10 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-rt-primary" />
                    <span className="font-medium">12 Past Clients Ready for Refinance</span>
                  </div>
                  <Button size="sm" className="bg-rt-primary text-white">
                    View Opportunities
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  AI has identified clients who could save an average of $210/month by refinancing at current rates
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-rt-heading">Next Best Actions</h3>
                <p className="text-sm text-muted-foreground">AI-recommended actions to optimize your workflow</p>
              </div>
              <Badge className="bg-rt-primary text-white">5 New Actions</Badge>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Follow up with Sarah Williams",
                  description: "Lead engagement score increased to 87% after rate drop notification",
                  priority: "High",
                  icon: UserCheck,
                },
                {
                  title: "Send market update to refinance candidates",
                  description: "12 clients would benefit from current rates - template ready",
                  priority: "Medium",
                  icon: Users,
                },
                {
                  title: "Review pipeline forecast",
                  description: "AI predicts 15% increase in closings next month based on current leads",
                  priority: "Medium",
                  icon: BarChart3,
                },
              ].map((action, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-rt-body rounded-md border border-rt-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-rt-primary/10 flex items-center justify-center text-rt-primary">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={action.priority === "High" ? "bg-rt-primary text-white" : "bg-rt-secondary text-white"}
                    >
                      {action.priority}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-rt-primary">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Dynamic Target Recommendations</h4>
              <div className="p-3 bg-rt-secondary/10 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-rt-secondary" />
                    <span className="font-medium">Suggested Rate Target: 3.50%</span>
                  </div>
                  <Button size="sm" variant="secondary" className="bg-rt-secondary text-white">
                    Set Target
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on current trends, this target has a 65% chance of being reached within 45 days
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-rt-primary/5 to-rt-secondary/5 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last updated: Today, 10:15 AM</span>
          </div>
          <Button variant="link" className="text-rt-primary p-0">
            View AI Settings
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

