import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function AdminPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Platform Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Select an option from the sidebar to manage the platform.</p>
                    <p className="mt-2">Start by viewing <Link href="/admin/organizations" className="text-primary underline">organizations</Link>.</p>
                </CardContent>
            </Card>
        </div>
    )
}
