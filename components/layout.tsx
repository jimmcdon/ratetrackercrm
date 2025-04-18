"use client"

import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 lg:px-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

