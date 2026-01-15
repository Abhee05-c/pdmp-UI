import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-secondary">
            <div className="mb-6 flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">AirWise</h1>
            </div>
            {children}
            <p className="text-center text-sm text-muted-foreground mt-6">
                Go back to{' '}
                <Link href="/" className="underline hover:text-primary">
                    Landing Page
                </Link>
            </p>
        </div>
    )
}