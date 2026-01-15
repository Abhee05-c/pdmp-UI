import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const organizations = [
    { id: "org_1", name: "Acme Aerospace", email: "contact@acme.com", users: 4, status: "Active" },
    { id: "org_2", name: "Stark Industries", email: "info@stark.io", users: 12, status: "Active" },
    { id: "org_3", name: "Wayne Enterprises", email: "support@wayne.co", users: 8, status: "Disabled" },
    { id: "org_4", name: "Cyberdyne Systems", email: "hr@cyberdyne.net", users: 25, status: "Active" },
]

export default function OrganizationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Platform Organizations</CardTitle>
                    <CardDescription>
                        Manage all registered organizations on the FlyHigh platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact Email</TableHead>
                                <TableHead className="text-center">Users</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {organizations.map((org) => (
                                <TableRow key={org.id}>
                                    <TableCell className="font-medium">{org.name}</TableCell>
                                    <TableCell>{org.email}</TableCell>
                                    <TableCell className="text-center">{org.users}</TableCell>
                                    <TableCell>
                                        <Badge variant={org.status === 'Active' ? 'outline' : 'destructive'} 
                                            className={org.status === 'Active' ? 'border-green-500 text-green-500' : ''}>
                                            {org.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Users</DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {org.status === 'Active' ? 'Disable' : 'Enable'}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
