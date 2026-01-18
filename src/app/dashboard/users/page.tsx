"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OrgUser = {
  user_id: number;
  username: string;
  role: string;
  is_org_admin: boolean;
  is_active: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<OrgUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const res = await api.get("/org/users");
      setUsers(res.data);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to load users",
        description: err.response?.data?.detail || "Error fetching users",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Username and password are required",
      });
      return;
    }

    try {
      await api.post("/org/users", {
        username,
        password,
      });

      toast({
        title: "User Created",
        description: `User "${username}" added successfully`,
      });

      setUsername("");
      setPassword("");
      setOpen(false);
      fetchUsers();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Creation failed",
        description: err.response?.data?.detail || "Unable to create user",
      });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await api.delete(`/org/users/${userId}`);
      toast({
        title: "User deleted",
        description: "User removed from organization",
      });
      fetchUsers();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: err.response?.data?.detail || "Unable to delete user",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>

        {/* ADD USER MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="engineer_01"
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              <Button className="w-full" onClick={handleAddUser}>
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="w-full max-w-none">
        <CardHeader>
          <CardTitle>Organization Users</CardTitle>
          <CardDescription>
            Manage users within your organization.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell className="font-medium">
                    {user.username}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={user.is_org_admin ? "default" : "secondary"}
                    >
                      {user.is_org_admin ? "Org Admin" : "User"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={user.is_active ? "outline" : "destructive"}
                      className={
                        user.is_active
                          ? "border-green-500 text-green-500"
                          : ""
                      }
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {!user.is_org_admin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteUser(user.user_id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {!loading && users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
