import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Gauge, Upload, Workflow, Users, ShieldCheck, Menu, LockIcon} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import BackendTest from "@/components/BackendTest";


export default function LandingPage() {
  
  const features = [
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: 'CSV Prediction',
      description: 'Upload CSV files of sensor data to get Remaining Useful Life (RUL) predictions for your equipment.',
    },
    {
      icon: <Workflow className="w-8 h-8 text-primary" />,
      title: 'Live Data Analysis',
      description: 'Input live sensor data for real-time RUL prediction and immediate operational insights.',
    },
    {
      icon: <Gauge className="w-8 h-8 text-primary" />,
      title: 'Predictive Health Tool',
      description: 'Leverage generative AI to receive suggested resolutions based on sensor inputs and predictions.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'User Management',
      description: 'Organization admins can easily manage users, roles, and permissions within their team.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'Admin Oversight',
      description: 'Platform administrators have a full overview of organizations, users, and system audit logs.',
    },
    {
      icon: <LockIcon className="w-8 h-8 text-primary" />,
      title: 'Full Proof Encryption',
      description: 'All data is encrypted both in transit and at rest to ensure maximum security and compliance.',
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BackendTest />
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">EstimateRUL</span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
          <Link
            href="/docs"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Documentation
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-6">
                 <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Get Started
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.800/50)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800/50)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

          <div className="relative px-4 md:px-6 text-center text-white flex justify-center">
            <div className="w-full max-w-5xl flex flex-col items-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                Engine Health Monitoring & Remaining Useful Life Prediction
              </h1>

              <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl">
                Predict engine degradation early, estimate remaining useful life, and plan maintenance with confidence.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">Request a Demo</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/login">Access Your Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
        >
          <div className="px-4 md:px-6 flex justify-center">
            <div className="w-full max-w-6xl flex flex-col items-center">
              
              {/* Heading */}
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Key Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                    A Smarter Way to Maintain Your Assets
                  </h2>
                  <p className="mx-auto max-w-2xl text-center text-muted-foreground md:text-xl leading-relaxed">
                    EstimateRUL provides a comprehensive suite of tools to move from
                    reactive fixes to proactive, data-driven maintenance strategies.
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2.5 place-items-center">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col gap-2 rounded-lg border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background px-6 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-end text-sm text-muted-foreground">

          {/* LEFT — Legal */}
          <div className="text-left">
            <p>© {new Date().getFullYear()} EstimateRUL Inc.</p>
            <p>All rights reserved.</p>
          </div>

          {/* CENTER — Links (side by side) */}
          <div className="flex flex-row items-center justify-center gap-4">
            <Link href="/docs" className="hover:underline underline-offset-4">
              Documentation
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Privacy
            </Link>
          </div>

          {/* RIGHT — Developer Info */}
          <div className="text-right">
            <p>Developed by AP</p>
            <p>
              <a
                href="mailto:abheelearns@gmail.com"
                className="hover:underline underline-offset-4"
              >
                abheelearns@gmail.com
              </a>
            </p>
            <p>Odisha, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

