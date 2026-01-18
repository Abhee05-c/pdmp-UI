"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getOrganizations,
  disableOrganization,
  enableOrganization,
} from "@/app/actions/admin";

type Org = {
  org_id: number;
  org_name: string;
  email: string;
  is_active: boolean;
};

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrgs() {
    setLoading(true);
    try {
      const data = await getOrganizations();
      setOrgs(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrgs();
  }, []);

  async function toggleOrg(org: Org) {
    if (org.is_active) {
      await disableOrganization(org.org_id);
    } else {
      await enableOrganization(org.org_id);
    }
    await loadOrgs();
  }

  if (loading) return <p>Loading organizations</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organizations</h1>

      {orgs.map((org) => (
        <Card key={org.org_id} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{org.org_name}</p>
            <p className="text-sm text-muted-foreground">{org.email}</p>
          </div>

          <Button
            variant={org.is_active ? "destructive" : "default"}
            onClick={() => toggleOrg(org)}
          >
            {org.is_active ? "Disable" : "Enable"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
