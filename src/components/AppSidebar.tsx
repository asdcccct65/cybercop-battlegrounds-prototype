
import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CyberLogo } from "./CyberLogo"
import { 
  Home, 
  Users, 
  Target, 
  Trophy, 
  Settings,
  Shield
} from "lucide-react"

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Mode Selection",
    url: "/mode-selection",
    icon: Users,
  },
  {
    title: "Missions",
    url: "/missions",
    icon: Target,
  },
  {
    title: "Progress",
    url: "/progress",
    icon: Trophy,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
      <SidebarHeader className="border-b border-border/50 p-4">
        <CyberLogo size="sm" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                <Link to={item.url} className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-cyber-blue/10">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-cyber-blue/10">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
