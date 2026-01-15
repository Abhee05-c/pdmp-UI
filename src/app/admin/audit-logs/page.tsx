import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

const logs = [
    { id: 1, timestamp: "2024-05-21 10:00:15", user: "admin@flyhigh.io", action: "DISABLE_ORG", target: "org_3", details: "Disabled Wayne Enterprises" },
    { id: 2, timestamp: "2024-05-21 09:45:30", user: "john.doe@acme.com", action: "LOGIN_SUCCESS", target: "user_101", details: "User logged in successfully" },
    { id: 3, timestamp: "2024-05-21 09:45:01", user: "john.doe@acme.com", action: "LOGIN_FAIL", target: "user_101", details: "Failed login attempt" },
    { id: 4, timestamp: "2024-05-20 16:20:00", user: "admin@acme.com", action: "CREATE_USER", target: "user_104", details: "Created user alice.brown@acme.com" },
    { id: 5, timestamp: "2024-05-20 11:30:00", user: "tony@stark.io", action: "PREDICT_CSV", target: "engine_SN12345", details: "RUL prediction from CSV upload" },
];

export default function AuditLogsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>System Events</CardTitle>
                    <CardDescription>
                        A log of important activities that have occurred across the platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Filter logs by user, action, or target..." className="max-w-sm" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Target ID</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                                    <TableCell className="font-medium">{log.user}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{log.action}</Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">{log.target}</TableCell>
                                    <TableCell>{log.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
