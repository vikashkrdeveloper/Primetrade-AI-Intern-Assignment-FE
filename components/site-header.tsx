"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/contexts/filter-context"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus, 
  Filter, 
  Bell, 
  Settings,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  User,
  Zap
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const pathname = usePathname()
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, setCreateDialogOpen } = useFilters()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Debounced search - update global search after 500ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 500)

    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery])

  // Sync local search with global search on mount
  useEffect(() => {
    setLocalSearch(searchQuery)
  }, [searchQuery])

  // Dynamic page title based on route
  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Dashboard"
    if (pathname.includes("/profile")) return "Profile Settings"
    if (pathname.includes("/tasks")) return "My Tasks"
    return "Primetrade"
  }

  // Get page icon and description
  const getPageDetails = () => {
    const titles: Record<string, { icon: React.ReactNode; desc: string }> = {
      "/dashboard": { 
        icon: <LayoutDashboard className="size-4 text-primary" />, 
        desc: "Manage your tasks efficiently" 
      },
      "/profile": { 
        icon: <User className="size-4 text-primary" />, 
        desc: "Account settings and preferences" 
      },
    }
    
    for (const [path, details] of Object.entries(titles)) {
      if (pathname.includes(path)) return details
    }
    return { icon: <Zap className="size-4 text-primary" />, desc: "Welcome to Primetrade" }
  }

  const pageDetails = getPageDetails()
  const pageTitle = getPageTitle()

  // Check if any filter is active
  const hasActiveFilter = statusFilter !== "all"

  const filterOptions = [
    { label: "All Tasks", icon: CheckCircle2, value: "all" },
    { label: "Pending", icon: Clock, value: "pending" },
    { label: "In Progress", icon: Clock, value: "in-progress" },
    { label: "Completed", icon: CheckCircle2, value: "completed" },
  ]

  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-gradient-to-r from-background via-background to-background/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-3 px-4 lg:gap-4 lg:px-6">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="-ml-1 hover:bg-accent" />
        
        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Page Title & Description */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
            {pageDetails.icon}
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {pageTitle}
            </h1>
            <p className="text-[11px] text-muted-foreground">{pageDetails.desc}</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search Bar - Show on Dashboard */}
          {pathname.includes("/dashboard") && (
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search tasks..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-48 pl-9 pr-4 h-9 text-sm bg-accent/50 border-accent/50 rounded-lg focus:bg-accent focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Filter Dropdown - Show on Dashboard */}
          {pathname.includes("/dashboard") && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:flex gap-2 hover:bg-accent relative"
                >
                  <Filter className="size-4" />
                  <span className="hidden lg:inline text-xs">Filters</span>
                  {hasActiveFilter && (
                    <Badge 
                      variant="default" 
                      className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px] rounded-full"
                    >
                      1
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Filter Tasks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                    className="cursor-pointer gap-2"
                  >
                    <option.icon className="size-4 text-muted-foreground" />
                    <span>{option.label}</span>
                    {statusFilter === option.value && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Create Task Button - Show on Dashboard */}
          {pathname.includes("/dashboard") && (
            <Button 
              size="sm" 
              onClick={() => setCreateDialogOpen(true)}
              className="hidden sm:flex gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
            >
              <Plus className="size-4" />
              <span className="hidden lg:inline">New Task</span>
            </Button>
          )}

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative hover:bg-accent"
          >
            <Bell className="size-4" />
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full animate-pulse" />
          </Button>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-accent"
          >
            <Settings className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
