"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  FileText,
  Home,
  List,
  Briefcase,
  Users,
  UserCircle,
  Mail,
  Phone,
  MessageSquare,
  Settings,
  Search,
  CheckCircle,
  Target,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarInput,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const [isLoansOpen, setIsLoansOpen] = useState(false)
  const [isClientsOpen, setIsClientsOpen] = useState(false)
  const pathname = usePathname()

  // Update the clientItems array to include the new pages
  const clientItems = [
    { title: "Client Directory", icon: UserCircle, href: "/dashboard/clients/client-directory" },
    { title: "Communication Log", icon: MessageSquare, href: "/dashboard/clients/communication-log" },
    { title: "Email Campaigns", icon: Mail, href: "/dashboard/clients/email-campaigns" },
    { title: "Call Lists", icon: Phone, href: "/dashboard/clients/call-lists" },
  ]

  // Add a new array for loan items
  const loanItems = [
    { title: "Active Loans", icon: Briefcase, href: "/dashboard/active-loans" },
    { title: "Closed Loans", icon: CheckCircle, href: "/dashboard/closed-loans" },
    { title: "Apply for Loan", icon: FileText, href: "/dashboard/loans/apply" },
  ]

  // Update the mainNavItems array to include the automated tasks link
  const mainNavItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "Daily Checklist", icon: List, href: "/dashboard/todo" },
    { title: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
    { title: "Leads", icon: Users, href: "/dashboard/leads" },
    { title: "Client Document Portal", icon: FileText, href: "/dashboard/client-documents" },
    { title: "Automated Tasks", icon: Bell, href: "/dashboard/automated-tasks" },
  ]

  return (
    <>
      <Sidebar variant="inset" className="border-r">
        <SidebarHeader className="border-b px-6 py-3 bg-rt-primary">
          <div className="flex items-center gap-2 text-white">
            <Target className="h-6 w-6" />
            <span className="text-xl font-bold">RateTracker</span>
          </div>
        </SidebarHeader>
        <div className="px-3 py-2 bg-rt-body">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput type="search" placeholder="Search..." className="pl-8 w-full" />
          </div>
        </div>
        <SidebarContent className="bg-rt-body">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-rt-heading">Automated Tasks</h3>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full justify-start hover:bg-rt-primary/10">
                    <Link href="/dashboard/automated-tasks/rate-alerts" className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-rt-secondary" />
                      <span className="text-sm font-medium">Rate Alerts</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full justify-start hover:bg-rt-primary/10">
                    <Link href="/dashboard/automated-tasks/scheduled-emails" className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-rt-secondary" />
                      <span className="text-sm font-medium">Scheduled Emails</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-rt-heading">Main Navigation</h3>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className={`w-full justify-start hover:bg-rt-primary/10 ${pathname === item.href ? "bg-rt-primary text-white" : ""}`}
                    >
                      <Link href={item.href} className="flex items-center">
                        <item.icon
                          className={`mr-2 h-4 w-4 ${pathname === item.href ? "text-white" : "text-rt-primary"}`}
                        />
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            <div className="px-3 py-2">
              <Collapsible open={isLoansOpen} onOpenChange={setIsLoansOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuItem className="list-none">
                    <SidebarMenuButton
                      className="w-full flex justify-between items-center hover:bg-rt-primary/10"
                      onClick={() => setIsLoansOpen(!isLoansOpen)}
                    >
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-rt-primary" />
                        <span className="text-sm font-medium">Loans</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {loanItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                          className={`w-full justify-start hover:bg-rt-primary/10 ${pathname === item.href ? "bg-rt-primary text-white" : ""}`}
                        >
                          <Link href={item.href} className="flex items-center">
                            <item.icon
                              className={`mr-2 h-4 w-4 ${pathname === item.href ? "text-white" : "text-rt-secondary"}`}
                            />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="px-3 py-2">
              <Collapsible open={isClientsOpen} onOpenChange={setIsClientsOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuItem className="list-none">
                    <SidebarMenuButton
                      className="w-full flex justify-between items-center hover:bg-rt-primary/10"
                      onClick={() => setIsClientsOpen(!isClientsOpen)}
                    >
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-rt-primary" />
                        <span className="text-sm font-medium">Clients</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {clientItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                          className={`w-full justify-start hover:bg-rt-primary/10 ${pathname === item.href ? "bg-rt-primary text-white" : ""}`}
                        >
                          <Link href={item.href} className="flex items-center">
                            <item.icon
                              className={`mr-2 h-4 w-4 ${pathname === item.href ? "text-white" : "text-rt-secondary"}`}
                            />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="border-t p-3 bg-rt-body">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-rt-primary flex items-center justify-center text-white">RT</div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Loan Officer</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-rt-primary hover:text-rt-primary/80 hover:bg-rt-primary/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
        <SidebarTrigger className="md:hidden" />
      </Sidebar>
    </>
  )
}

