"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserProfile } from "@/components/dashboard/user-profile";
import { FilterProvider } from "@/contexts/filter-context";

function ProfilePage() {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <div className="mx-auto w-full md:max-w-3xl lg:max-w-5xl">
                  <h1 className="text-3xl font-bold tracking-tight mb-6">
                    Account Settings
                  </h1>
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default function Page() {
  return (
    <FilterProvider>
      <ProfilePage />
    </FilterProvider>
  );
}
