import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gauge, Upload, Workflow, Users, ShieldCheck, Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

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
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
          <div className="container relative px-4 md:px-6 text-center text-white">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                Engine Health Monitoring & Remaining Useful Life Prediction
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-gray-300">
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

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Smarter Way to Maintain Your Assets
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EstimateRUL provides a comprehensive suite of tools to move from
                  reactive fixes to proactive, data-driven maintenance
                  strategies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-6 pt-12">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    'flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
                    'lg:col-span-2',
                    index === 3 && 'lg:col-start-2'
                  )}
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
        </section>
      </main>
      <footer className="flex flex-col gap-4 py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/docs" className="text-xs hover:underline underline-offset-4">
            Documentation
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
            </Link>
        </nav>
        <div className="text-xs text-muted-foreground text-center">
            <p>Developed by Abhisekh Padhy</p>
            <p><a href="mailto:abheelearns@gmail.com" className="hover:underline underline-offset-4">abheelearns@gmail.com</a> • Odisha, India</p>
            <p className="mt-2">&copy; {new Date().getFullYear()} EstimateRUL Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
