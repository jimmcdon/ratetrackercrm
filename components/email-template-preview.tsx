"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Clock, Edit, Copy, Send } from "lucide-react"

interface EmailTemplatePreviewProps {
  template: {
    id: number
    name: string
    description: string
    subject: string
    previewText?: string
    lastUsed?: string
    content?: string
  }
  onClose?: () => void
}

export function EmailTemplatePreview({ template, onClose }: EmailTemplatePreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")

  return (
    <Card className="border-rt-primary/20 w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-rt-primary/10 to-rt-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-rt-primary" />
            <CardTitle className="text-rt-heading">{template.name}</CardTitle>
          </div>
          <Badge className="bg-rt-secondary text-white">Template</Badge>
        </div>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <div className="px-4 py-2 border-b">
        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="preview" className="data-[state=active]:text-rt-primary">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="data-[state=active]:text-rt-primary">
              HTML
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:text-rt-primary">
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <CardContent className="p-4">
        <TabsContent value="preview" className="mt-0">
          <div className="border rounded-md p-4">
            <div className="mb-4 pb-4 border-b">
              <div className="font-medium">Subject: {template.subject}</div>
              {template.previewText && (
                <div className="text-sm text-muted-foreground">Preview Text: {template.previewText}</div>
              )}
            </div>

            {template.name === "Rate Update" && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <h2 className="text-xl font-bold text-rt-primary">Weekly Mortgage Rate Update</h2>
                  <p className="text-muted-foreground">June 5, 2023</p>
                </div>

                <p>Hello [Client Name],</p>

                <p>We hope this email finds you well. Here's your weekly update on mortgage rates:</p>

                <div className="my-6 p-4 bg-muted/20 rounded-md">
                  <h3 className="font-bold text-rt-primary mb-2">Current Rates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium">30-Year Fixed</div>
                      <div className="text-2xl font-bold text-rt-primary">3.45%</div>
                      <div className="text-sm text-green-500">↓ 0.15% from last week</div>
                    </div>
                    <div>
                      <div className="font-medium">15-Year Fixed</div>
                      <div className="text-2xl font-bold text-rt-primary">2.95%</div>
                      <div className="text-sm text-green-500">↓ 0.10% from last week</div>
                    </div>
                  </div>
                </div>

                <p>Rates have continued their downward trend this week, creating potential opportunities for:</p>

                <ul className="list-disc pl-6 my-4 space-y-2">
                  <li>Refinancing to a lower rate</li>
                  <li>Reducing your monthly payment</li>
                  <li>Shortening your loan term</li>
                  <li>Taking advantage of improved purchasing power</li>
                </ul>

                <div className="my-6 text-center">
                  <Button className="bg-rt-primary text-white">Schedule a Consultation</Button>
                </div>

                <p>
                  If you have any questions or would like to discuss how these rates might benefit your specific
                  situation, please don't hesitate to reach out.
                </p>

                <p className="mt-4">Best regards,</p>
                <p>
                  John Doe
                  <br />
                  Mortgage Specialist
                  <br />
                  RateTracker
                </p>
              </div>
            )}

            {template.name === "Refinance Opportunity" && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <h2 className="text-xl font-bold text-rt-primary">Limited Time Refinance Opportunity</h2>
                </div>

                <p>Hello [Client Name],</p>

                <p>
                  We've identified that you may be able to benefit from current market conditions with a refinance of
                  your existing mortgage.
                </p>

                <div className="my-6 p-4 bg-rt-primary/10 rounded-md">
                  <h3 className="font-bold text-rt-primary mb-2">Your Potential Savings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Rate:</span>
                      <span className="font-bold">[Current Rate]%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Rate:</span>
                      <span className="font-bold text-rt-primary">3.45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Monthly Savings:</span>
                      <span className="font-bold text-rt-secondary">$[Monthly Savings]</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Lifetime Savings:</span>
                      <span className="font-bold text-rt-secondary">$[Lifetime Savings]</span>
                    </div>
                  </div>
                </div>

                <p>This opportunity is available for a limited time as rates continue to fluctuate in the market.</p>

                <div className="my-6 text-center">
                  <Button className="bg-rt-primary text-white">Check My Refinance Options</Button>
                </div>

                <p>
                  I'm available to discuss your specific situation and answer any questions you might have about the
                  refinance process.
                </p>

                <p className="mt-4">Best regards,</p>
                <p>
                  John Doe
                  <br />
                  Mortgage Specialist
                  <br />
                  RateTracker
                </p>
              </div>
            )}

            {!["Rate Update", "Refinance Opportunity"].includes(template.name) && (
              <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-md">
                <div className="text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Email template preview will appear here</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <div className="border rounded-md p-4 bg-muted/20">
            <pre className="text-xs overflow-auto max-h-[400px]">
              {`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${template.name}</title>
  <style>
    /* Email styles would go here */
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .content { padding: 20px 0; }
    .footer { text-align: center; padding: 20px 0; font-size: 12px; color: #666; }
    .button { display: inline-block; padding: 10px 20px; background-color: #C84B22; color: white; text-decoration: none; border-radius: 4px; }
    .stats { background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #C84B22;">Weekly Mortgage Rate Update</h1>
      <p>June 5, 2023</p>
    </div>
    
    <div class="content">
      <p>Hello [Client Name],</p>
      
      <p>We hope this email finds you well. Here's your weekly update on mortgage rates:</p>
      
      <div class="stats">
        <h3 style="color: #C84B22;">Current Rates</h3>
        <table width="100%">
          <tr>
            <td width="50%">
              <div>30-Year Fixed</div>
              <div style="font-size: 24px; font-weight: bold; color: #C84B22;">3.45%</div>
              <div style="color: green;">↓ 0.15% from last week</div>
            </td>
            <td width="50%">
              <div>15-Year Fixed</div>
              <div style="font-size: 24px; font-weight: bold; color: #C84B22;">2.95%</div>
              <div style="color: green;">↓ 0.10% from last week</div>
            </td>
          </tr>
        </table>
      </div>
      
      <p>Rates have continued their downward trend this week, creating potential opportunities for:</p>
      
      <ul>
        <li>Refinancing to a lower rate</li>
        <li>Reducing your monthly payment</li>
        <li>Shortening your loan term</li>
        <li>Taking advantage of improved purchasing power</li>
      </ul>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">Schedule a Consultation</a>
      </div>
      
      <p>If you have any questions or would like to discuss how these rates might benefit your specific situation, please don't hesitate to reach out.</p>
      
      <p>Best regards,<br>
      John Doe<br>
      Mortgage Specialist<br>
      RateTracker</p>
    </div>
    
    <div class="footer">
      <p>© 2023 RateTracker. All rights reserved.</p>
      <p>
        <a href="#">Unsubscribe</a> | 
        <a href="#">Privacy Policy</a> | 
        <a href="#">Contact Us</a>
      </p>
    </div>
  </div>
</body>
</html>`}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Template Name</h3>
                <p className="text-sm">{template.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Last Used</h3>
                <p className="text-sm">{template.lastUsed || "Never"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Default Subject</h3>
                <p className="text-sm">{template.subject}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Preview Text</h3>
                <p className="text-sm">{template.previewText || "None"}</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-2">Template Variables</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm p-2 bg-muted/20 rounded">[Client Name]</div>
                <div className="text-sm p-2 bg-muted/20 rounded">[Current Rate]</div>
                <div className="text-sm p-2 bg-muted/20 rounded">[Monthly Savings]</div>
                <div className="text-sm p-2 bg-muted/20 rounded">[Lifetime Savings]</div>
                <div className="text-sm p-2 bg-muted/20 rounded">[Loan Amount]</div>
                <div className="text-sm p-2 bg-muted/20 rounded">[Loan Term]</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-rt-primary/5 to-rt-secondary/5 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last updated: 2 days ago</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" className="bg-rt-primary text-white">
              <Send className="mr-2 h-4 w-4" />
              Use Template
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

