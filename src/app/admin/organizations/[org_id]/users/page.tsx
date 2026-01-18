"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getOrgUsers,
  disableUser,
  enableUser,
} from "@/app/actions/admin";

export default function AdminOrgUsersPage() {
  const params = useParams();
  const orgId = Number(params.org_id);

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getOrgUsers(orgId).then(setUsers);
  }, [orgId]);

  async function toggleUser(user: any) {
    if (user.is_active) {
      await disableUser(user.user_id);
    } else {
      await enableUser(user.user_id);
    }
    setUsers(await getOrgUsers(orgId));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organization Users</h1>

      {users.map((user) => (
        <Card
          key={user.user_id}
          className="p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary">{user.role}</Badge>
              {user.org_admin && (
                <Badge variant="outline">Org Admin</Badge>
              )}
            </div>
          </div>

          <Button
            variant={user.is_active ? "destructive" : "default"}
            onClick={() => toggleUser(user)}
          >
            {user.is_active ? "Disable" : "Enable"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
