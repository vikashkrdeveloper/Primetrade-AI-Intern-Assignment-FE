"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { LoginForm } from "@/components/login-form";
import { AnimatedBackground } from "@/components/animated-background";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <AnimatedBackground />
      <div className="fixed inset-0 -z-10">
        <DottedGlowBackground
          className="pointer-events-none"
          opacity={0.4}
          gap={20}
          radius={1.5}
        />
      </div>
      <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Primetrade AI
        </Link>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
