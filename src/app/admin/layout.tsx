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
  Users,
  Settings,
  Shield,
  LifeBuoy,
  Building,
  History,
  ChevronsLeft,
  LayoutDashboard
} from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { UserNav } from '../dashboard/components/user-nav';
import { ThemeToggle } from '../dashboard/components/theme-toggle';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-primary" />
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>User Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Organizations">
                  <Link href="/admin/organizations">
                    <Building />
                    <span>Organizations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Audit Logs">
                  <Link href="/admin/audit-logs">
                    <History />
                    <span>Audit Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                        <Link href="#">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="flex items-center justify-center text-muted-foreground">
              <ChevronsLeft className="h-5 w-5" />
            </SidebarTrigger>
            <div className="w-full flex-1">
              <p className="font-semibold">FlyHigh Platform Administration</p>
            </div>
            <ThemeToggle />
            <UserNav />
          </header>
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
