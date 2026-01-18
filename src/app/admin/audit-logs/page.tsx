"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

import { useEffect, useState } from "react";
import api from "@/lib/api"; // axios instance with JWT


export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/admin/auditlogs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch audit logs", err);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(filter.toLowerCase()) ||
    String(log.user_id).includes(filter) ||
    log.endpoint.toLowerCase().includes(filter.toLowerCase())
  );

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
            <Input
              placeholder="Filter logs by action, user, or endpoint..."
              className="max-w-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Endpoint</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.user_id}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.endpoint}
                  </TableCell>
                </TableRow>
              ))}

              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No audit logs found
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
