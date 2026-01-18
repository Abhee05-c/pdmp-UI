"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import ClientOnly from "@/components/ClientOnly";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Upload,
  Workflow,
  Users,
  Settings,
  Shield,
  LifeBuoy,
  LogOut,
  ChevronsLeft,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { UserNav } from './components/user-nav';
import { ThemeToggle } from './components/theme-toggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) 
{ //auth protection added
  const { authenticated, role, isOrgAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [loading, authenticated, router]);

  if (loading) return null;
  return (
    <ClientOnly>
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <Logo className="w-7 h-7 text-primary" />
                <span className="text-lg font-semibold">EstimateRUL</span>
              </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Predict from CSV">
                    <Link href="/dashboard/predict-csv">
                      <Upload />
                      <span>Predict from CSV</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Predict with Live Data">
                    <Link href="/dashboard/predict-live">
                      <Workflow />
                      <span>Predict with Live Data</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {isOrgAdmin && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Manage Users">
                      <Link href="/dashboard/users">
                        <Users />
                        <span>Manage Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>)
                }
                {role=="ADMIN" && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Admin Panel">
                      <Link href="/admin">
                        <Shield />
                        <span>Admin Panel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>)
                }
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <div className="flex flex-col flex-1">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
              <SidebarTrigger className="flex items-center justify-center text-muted-foreground">
                <ChevronsLeft className="h-5 w-5" />
              </SidebarTrigger>
              <div className="w-full flex-1">
                {/* Optional: Breadcrumbs or page title can go here */}
              </div>
              <ThemeToggle />
              <UserNav />
            </header>
            <main className="flex-1 w-full min-w-0 overflow-y-auto p-4 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ClientOnly>
  );
}
