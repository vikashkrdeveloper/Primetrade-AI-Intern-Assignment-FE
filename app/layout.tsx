import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Primetrade.ai Frontend Developer Internship Assignment",
  description:
    "A scalable web app with authentication and dashboard built for the Primetrade.ai Frontend Developer Internship Assignment. This project demonstrates the ability to create modern, scalable, and secure web applications, integrating a basic backend for API requests, showcasing frontend engineering skills and backend integration capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
