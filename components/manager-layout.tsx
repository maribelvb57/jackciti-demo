"use client"

import { SiteNavbar } from "@/components/site-navbar"
import { ManagerSidebar } from "@/components/manager-sidebar"
import { ManagerContextBar } from "@/components/manager-context-bar"

interface ManagerLayoutProps {
  hotelId: string
  children: React.ReactNode
}

export function ManagerLayout({ hotelId, children }: ManagerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F6F7F9" }}>
      <SiteNavbar />
      <ManagerContextBar hotelId={hotelId} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <ManagerSidebar hotelId={hotelId} />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
