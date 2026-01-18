import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownContent = `
# Predictive Maintenance Platform

This platform predicts the **Remaining Useful Life (RUL)** of industrial engines using historical and live sensor data.

It is designed for **enterprise, aerospace, and defense-grade environments** where reliability and controlled access are critical.

---

## Who should use this platform?

This platform is intended for:

- Aerospace and aircraft engine testing organizations
- Defense research laboratories
- Industrial maintenance and reliability teams
- Prognostics and health management (PHM) engineers

This is **not a consumer application**.
Access is organization-based and controlled.

---

## How the system works

1. Engine sensor data is collected over operational cycles
2. Data is uploaded as a CSV file or provided as live input
3. A trained machine learning model analyzes degradation trends
4. The system predicts Remaining Useful Life (RUL)
5. Results support proactive maintenance planning

---

## Getting started

### Step 1: Sign up
- Create an organization using the Signup page
- The first user becomes the organization administrator

### Step 2: Log in
- Log in using your credentials
- You will be redirected to the dashboard

### Step 3: Add team members
- Organization admins can add users
- Each user gets secure access to predictions

---

## Authentication and roles

### Organization User
- Upload data
- Run predictions
- View results

### Organization Admin
- Add or disable organization users

### Platform Admin
- Manage organizations
- Enable or disable access
- View audit logs

All actions are protected using secure token-based authentication.

---

## Making predictions

### CSV-based prediction
Upload a CSV file containing recent engine history.
The system analyzes the latest cycles and returns an RUL estimate.

### Live data prediction
Provide recent sensor readings as structured JSON input.
This supports near–real-time diagnostics.

---

## Understanding the output

Prediction results include:
- Estimated Remaining Useful Life (in cycles)
- Diagnostic metadata
- Confidence indicators

Lower RUL values indicate higher urgency for maintenance.

---

## Security and auditability

- Role-based access control
- JWT-secured APIs
- Auditable prediction and admin actions
- No long-term storage of raw sensor data

The platform is suitable for secure, on-premise deployments.

---

## Frequently Asked Questions

**Can anyone sign up?**
No. Signup creates an organization. Additional users are added internally.

**Is sensor data stored?**
No. Data is processed only for prediction.

**Can this run inside a private network?**
Yes. The platform supports isolated deployments.
`;


export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">EstimateRUL - Docs</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Button asChild>
            <Link href="/">Back</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <article className="prose prose-stone dark:prose-invert max-w-none 
            prose-headings:font-headline prose-headings:tracking-tight 
            prose-h1:text-4xl prose-h2:text-2xl 
            prose-a:text-primary hover:prose-a:text-primary/80 
            prose-strong:text-foreground
            prose-code:bg-muted prose-code:text-foreground prose-code:p-1 prose-code:rounded-sm
            prose-blockquote:border-l-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
}
