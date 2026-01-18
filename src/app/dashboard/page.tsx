"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShieldCheck, User, Activity } from "lucide-react";
import api from "@/lib/api"; // IMPORTANT: use your axios instance

type OrgStats = {
  organization_name: string;
  total_users: number;
  org_admins: number;
  normal_users: number;
  total_predictions: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<OrgStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/dashboard/org-summary");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-destructive">Unable to load dashboard data</p>;
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Organization usage and access overview
        </p>
      </div>

      {/* Org Name */}
      <Card className="bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-muted-foreground">
            Current  Active  Organization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {stats.organization_name}
          </div>
          <p className="text-s text-muted-foreground mt-1">
            Welcome! You're logged in under this organization.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total_users}</div>
            <p className="text-xs text-muted-foreground">
              Registered users in this organization
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Org Admins</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.org_admins}</div>
            <p className="text-xs text-muted-foreground">
              Users with administrative privileges
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Standard Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.normal_users}</div>
            <p className="text-xs text-muted-foreground">
              Users with prediction access
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predictions Run</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.total_predictions}
            </div>
            <p className="text-xs text-muted-foreground">
              Total predictions made by this organization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card className="bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
        <CardHeader>
          <CardTitle>About this Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed">
          This dashboard provides a high-level overview of user access and platform usage within your organization. 
          Detailed engine analytics and predictive insights are available on demand during individual prediction workflows.
        </CardContent>
      </Card>
    </div>
  );
}
