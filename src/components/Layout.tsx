
import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { ThemeToggle } from "./ThemeToggle"
import { CyberLogo } from "./CyberLogo"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="cyber-glow" />
                <CyberLogo size="sm" />
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 p-6 cyber-grid">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
