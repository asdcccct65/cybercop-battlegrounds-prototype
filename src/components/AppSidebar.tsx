
import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  Home, 
  Target, 
  Trophy, 
  Users, 
  Settings,
  BookOpen,
  Activity
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { CyberLogo } from "./CyberLogo"

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Mode Selection", url: "/mode-selection", icon: Target },
  { title: "Mission Dashboard", url: "/missions", icon: Activity },
  { title: "Progress Tracker", url: "/progress", icon: Trophy },
  { title: "Learning Hub", url: "/learning", icon: BookOpen },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavClasses = (active: boolean) =>
    `transition-all duration-300 ${
      active 
        ? "bg-cyber-blue/20 text-cyber-blue border-r-2 border-cyber-blue" 
        : "hover:bg-muted/50 hover:text-cyber-blue"
    }`

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300 border-r border-border/50`}>
      <div className="p-4">
        {!collapsed && <CyberLogo size="sm" />}
        {collapsed && <SidebarTrigger className="cyber-glow" />}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyber-blue/60">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(isActive(item.url))}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
