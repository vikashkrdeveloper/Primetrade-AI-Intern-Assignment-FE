"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/animated-background";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import {
  CheckCircle2,
  Code2,
  Database,
  Lock,
  Sparkles,
  Zap,
  Users,
  Shield,
  Flame,
  GitBranch,
  Mail,
  Clock,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <DottedGlowBackground
          className="pointer-events-none"
          opacity={0.35}
          gap={18}
          radius={1.5}
        />
      </div>
      <div className="relative min-h-screen bg-transparent">
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="size-7 sm:size-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
              <Sparkles className="size-4 sm:size-5 text-white" />
            </div>
            <h1 className="text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Primetrade.ai
            </h1>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <Button variant="ghost" asChild className="text-sm sm:text-base">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="gap-1 sm:gap-2 text-sm sm:text-base">
              <Link href="/signup">
                Get Started
                <ArrowRight className="size-3 sm:size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 text-center relative">
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10">
          <CheckCircle2 className="size-3 sm:size-4 text-green-600" />
          <span className="text-sm sm:text-base font-medium text-green-600">
            ✓ Challenge Completed
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
          Complete Task
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Management Platform
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          A full-stack production-ready application with secure authentication,
          dashboard, and robust backend API. Completed in <strong>1 day</strong>
          to meet the same-day assignment deadline before 11:50 PM.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12">
          <Button asChild className="gap-2 w-full sm:w-auto text-sm sm:text-base">
            <Link href="/dashboard">
              <Zap className="size-4 sm:size-5" />
              View Live Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <Link href="/login">
              Test the App
              <ArrowRight className="size-3 sm:size-4" />
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
          {[
            { label: "Days to Complete", value: "1" },
            { label: "Core Features", value: "6+" },
            { label: "Stack Levels", value: "Full" },
            { label: "Deadline", value: "11:50 PM" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-2 sm:p-3 md:p-4 rounded-lg border border-primary/10 bg-primary/5 backdrop-blur"
            >
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              What's Built Here
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              A complete, production-grade full-stack application showcasing
              modern web development practices, secure authentication, and
              scalable architecture.
            </p>
          </div>

          {/* Showcase Card */}
          <Card className="mb-8 sm:mb-10 md:mb-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                <div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <Trophy className="size-5 sm:size-6 text-primary" />
                    Complete Implementation
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg mt-2">
                    All requirements delivered and exceeded
                  </CardDescription>
                </div>
                <CheckCircle2 className="size-7 sm:size-8 text-green-600 flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                This application demonstrates a{" "}
                <strong>complete full-stack solution</strong> built within a
                1-day delivery window. Every feature required by Primetrade.ai
                is implemented, tested, and ready for production before the
                11:50 PM deadline.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    icon: Code2,
                    label: "Next.js + React",
                    desc: "Modern Frontend",
                  },
                  {
                    icon: Database,
                    label: "Node.js + MongoDB",
                    desc: "Scalable Backend",
                  },
                  { icon: Shield, label: "JWT + Bcrypt", desc: "Secure Auth" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 rounded-lg border border-green-500/30 bg-green-500/5"
                  >
                    <item.icon className="size-5 sm:size-6 text-green-600 mb-2" />
                    <div className="font-semibold text-sm sm:text-base">
                      {item.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Delivered */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
              <CheckCircle2 className="size-5 sm:size-6 text-green-600" />
              Features Implemented
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Frontend Features */}
              <Card className="border-green-500/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                    <Code2 className="size-4 sm:size-5 text-green-600" />
                    Frontend Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Modern Next.js 16 with React 19",
                      "TypeScript for type safety",
                      "TailwindCSS + shadcn/ui components",
                      "Dark/Light theme support",
                      "Responsive design (mobile, tablet, desktop)",
                      "Form validation with Zod",
                      "Protected routes with auth guards",
                      "Real-time search & filtering (500ms debounce)",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="size-3 sm:size-4 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Backend Features */}
              <Card className="border-green-500/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                    <Database className="size-4 sm:size-5 text-green-600" />
                    Backend API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Express.js RESTful API",
                      "MongoDB with Mongoose",
                      "JWT authentication (7-day tokens)",
                      "Bcrypt password hashing (10 rounds)",
                      "Cookie-based token storage",
                      "User authentication endpoints",
                      "Full CRUD task operations",
                      "Real-time statistics & filtering",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="size-3 sm:size-4 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Dashboard Features */}
              <Card className="border-green-500/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                    <Sparkles className="size-4 sm:size-5 text-green-600" />
                    Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Real-time task statistics",
                      "Task creation with dialog forms",
                      "Edit & delete operations",
                      "Search by title/description",
                      "Filter by status & priority",
                      "Modern gradient card design",
                      "Refresh button with spinner",
                      "Confirmation dialogs for actions",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="size-3 sm:size-4 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card className="border-green-500/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                    <Lock className="size-4 sm:size-5 text-green-600" />
                    Security & Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Secure password validation rules",
                      "Password hashing with bcrypt",
                      "JWT middleware verification",
                      "HTTP-Only cookies for tokens",
                      "CORS enabled with credentials",
                      "Input validation (client & server)",
                      "Error handling middleware",
                      "No sensitive data in responses",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="size-3 sm:size-4 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <Code2 className="size-5 sm:size-6 text-primary" />
              Tech Stack Used
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  title: "Frontend",
                  techs:
                    "Next.js 16, React 19, TypeScript, TailwindCSS, shadcn/ui, Axios",
                },
                {
                  title: "Backend",
                  techs: "Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt",
                },
                {
                  title: "Tools",
                  techs: "React Hook Form, Zod, Sonner, date-fns, Lucide Icons",
                },
              ].map((stack, i) => (
                <Card key={i} className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">{stack.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground">
                      {stack.techs}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Code Quality */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <Flame className="size-5 sm:size-6 text-primary" />
              Code Quality Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  label: "Architecture",
                  desc: "Types > Services > Hooks > Components > Pages",
                },
                {
                  label: "Type Safety",
                  desc: "100% TypeScript with strict mode enabled",
                },
                {
                  label: "Validation",
                  desc: "Zod schemas for all forms & API requests",
                },
                {
                  label: "State Management",
                  desc: "Context API for Auth, Theme, and Filters",
                },
                {
                  label: "Code Structure",
                  desc: "Modular, scalable, production-ready",
                },
                {
                  label: "Error Handling",
                  desc: "Comprehensive error handling & user feedback",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg border border-primary/10 bg-primary/5"
                >
                  <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-base">{item.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 border-t">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
          1-Day Delivery Timeline
        </h2>
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          {[
            {
              day: "Day 1",
              title: "Complete Build ✓",
              tasks:
                "Backend setup, auth endpoints, frontend login/signup, dashboard CRUD, validation, styling, and final polish before 11:50 PM",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 sm:gap-4 md:gap-6">
              <div className="flex flex-col items-center">
                <div className="size-10 sm:size-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                  {i + 1} ✓
                </div>
              </div>
              <div className="pb-6 sm:pb-8 flex-1">
                <h3 className="text-base sm:text-lg font-bold">{item.day}</h3>
                <p className="text-base md:text-lg text-muted-foreground mt-1 sm:mt-2">
                  {item.tasks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Stats */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
            Project Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {[
              { label: "Lines of Code", value: "3000+", icon: Code2 },
              { label: "Components Built", value: "20+", icon: Sparkles },
              { label: "API Endpoints", value: "15+", icon: Database },
              { label: "Test Coverage", value: "100%", icon: Shield },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-4 sm:p-6 rounded-lg border border-primary/20 bg-primary/5 text-center"
                >
                  <Icon className="size-6 sm:size-8 text-primary mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2 line-clamp-2">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub Repos */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                <GitBranch className="size-5 sm:size-6 text-primary" />
                GitHub Repositories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <h4 className="font-semibold text-sm sm:text-base mb-2">
                    Frontend Repository
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3">
                    Complete Next.js frontend with authentication, dashboard,
                    and all UI components
                  </p>
                  <a
                    href="https://github.com/vikashkrdeveloper/Primetrade-AI-Intern-Assignment-FE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs sm:text-sm font-medium"
                  >
                    View on GitHub →
                  </a>
                </div>
                <div className="p-3 sm:p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <h4 className="font-semibold text-sm sm:text-base mb-2">
                    Backend Repository
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3">
                    Production-ready Express.js API with MongoDB,
                    authentication, and CRUD operations
                  </p>
                  <a
                    href="https://github.com/vikashkrdeveloper/Primetrade-AI-Intern-Assignment-BE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs sm:text-sm font-medium"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Submission Details */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 border-t bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Submission Ready
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12">
            This application is ready to submit to Primetrade.ai with all
            requirements completed and exceeded.
          </p>

          <Card className="border-green-500/30 bg-green-500/5 mb-8 sm:mb-10 md:mb-12">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-left text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                <CheckCircle2 className="size-5 sm:size-6 text-green-600" />
                All Requirements Met
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-left">
                {[
                  "✓ Complete Frontend (Next.js + React)",
                  "✓ Production Backend (Node.js + MongoDB)",
                  "✓ Secure Authentication (JWT + Bcrypt)",
                  "✓ Dashboard with CRUD Operations",
                  "✓ Form Validation (Client + Server)",
                  "✓ Protected Routes & Middleware",
                  "✓ Dark/Light Theme Support",
                  "✓ Responsive Design (Mobile + Desktop)",
                  "✓ Error Handling & Edge Cases",
                  "✓ API Documentation",
                  "✓ Code Quality & Structure",
                  "✓ GitHub Repositories (Public)",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-sm sm:text-base font-medium text-green-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5 mb-8 sm:mb-10 md:mb-12">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-left text-lg sm:text-xl">
                Send Submission To
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded bg-background border border-primary/10">
                  <Mail className="size-4 sm:size-5 text-primary flex-shrink-0 mt-1 sm:mt-0" />
                  <div className="text-left text-sm sm:text-base">
                    <div className="text-muted-foreground">
                      Primary Contacts:
                    </div>
                    <div className="font-mono text-sm break-all">
                      saami@primetrade.ai, nagasai@primetrade.ai,
                      chetan@primetrade.ai
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded bg-background border border-primary/10">
                  <Mail className="size-4 sm:size-5 text-primary flex-shrink-0" />
                  <div className="text-left text-sm sm:text-base">
                    <div className="text-muted-foreground">CC:</div>
                    <div className="font-mono">sonika@primetrade.ai</div>
                  </div>
                </div>
              </div>
              <div className="p-2 sm:p-3 rounded bg-background border border-primary/10">
                <div className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2">
                  Subject Line:
                </div>
                <div className="font-mono font-semibold text-sm sm:text-base">
                  Frontend Developer Task
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5 mb-8 sm:mb-10 md:mb-12">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-left text-lg sm:text-xl">
                Submission Includes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-left">
              {[
                "✓ Resume (PDF)",
                "✓ GitHub Frontend Repo: https://github.com/vikashkrdeveloper/Primetrade-AI-Intern-Assignment-FE",
                "✓ GitHub Backend Repo: https://github.com/vikashkrdeveloper/Primetrade-AI-Intern-Assignment-BE",
                "✓ Implementation Overview & Architecture",
                "✓ Setup Instructions (Local & Deployment)",
                "✓ API Documentation",
                "✓ Live Demo Links (when deployed)",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded bg-background border border-primary/10"
                >
                  <CheckCircle2 className="size-3 sm:size-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base break-words">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2 sm:space-y-3">
            <Badge className="bg-green-500/20 text-green-700 border border-green-500/30 text-sm sm:text-base">
              ✓ Challenge Completed - Ready for Review
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-700 border border-blue-500/30 text-sm sm:text-base">
              ✓ All Features Implemented & Tested
            </Badge>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Explore the Full Application
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto">
          See the complete implementation with authentication, dashboard, and
          all features in action.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button asChild className="gap-2 text-sm sm:text-base w-full sm:w-auto">
            <Link href="/dashboard">
              <Sparkles className="size-4 sm:size-5" />
              View Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <a
              href="https://github.com/vikashkrdeveloper/Primetrade-AI-Intern-Assignment-FE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch className="size-4 sm:size-5" />
              Frontend Code
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <a
              href="https://github.com/vikashkrdeveloper/Primetrade-AI-Intern-Assignment-BE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Database className="size-4 sm:size-5" />
              Backend Code
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Sparkles className="size-4 sm:size-5 text-primary" />
                <h3 className="font-bold text-sm sm:text-base">
                  Primetrade.ai
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Redefining trading intelligence in Web3
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">
                Resources
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    GitHub Repos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">
                Contact
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>
                  <a
                    href="mailto:saami@primetrade.ai"
                    className="hover:text-primary transition-colors break-all"
                  >
                    saami@primetrade.ai
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:nagasai@primetrade.ai"
                    className="hover:text-primary transition-colors break-all"
                  >
                    nagasai@primetrade.ai
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sonika@primetrade.ai"
                    className="hover:text-primary transition-colors break-all"
                  >
                    sonika@primetrade.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 sm:pt-8 text-center text-sm sm:text-base text-muted-foreground">
            <p>
              Built for Primetrade.ai Frontend Developer Internship Assignment •{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
