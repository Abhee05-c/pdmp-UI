"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getOrganizations,
  disableOrganization,
  enableOrganization,
} from "@/app/actions/admin";
import { Users } from "lucide-react";
import Link from "next/link";

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<any[]>([]);

  useEffect(() => {
    getOrganizations().then(setOrgs);
  }, []);

  async function handleToggle(org: any) {
    if (org.is_active) {
      await disableOrganization(org.org_id);
    } else {
      await enableOrganization(org.org_id);
    }
    setOrgs(await getOrganizations());
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organizations</h1>

      {orgs.map((org) => (
        <Card
          key={org.org_id}
          className="p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{org.org_name}</p>
            <p className="text-sm text-muted-foreground">{org.email}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={org.is_active ? "destructive" : "default"}
              onClick={() => handleToggle(org)}
            >
              {org.is_active ? "Disable" : "Enable"}
            </Button>

            <Button asChild variant="secondary">
              <Link
                href={`/admin/organizations/${org.org_id}/users`}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                View Users
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
