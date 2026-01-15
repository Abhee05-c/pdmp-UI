import type { Metadata } from 'next';
import { Lato, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const fontBody = Lato({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-body' 
});

const fontHeadline = Poppins({ 
  subsets: ['latin'], 
  weight: ['600', '700'],
  variable: '--font-headline' 
});


export const metadata: Metadata = {
  title: 'FlyHigh - Predictive Maintenance',
  description: 'Predictive Maintenance for the Modern Fleet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The new next/font integration handles font loading, so manual links are not needed. */}
      </head>
      <body className={`${fontBody.variable} ${fontHeadline.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
