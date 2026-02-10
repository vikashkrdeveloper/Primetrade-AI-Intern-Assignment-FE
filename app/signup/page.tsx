"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { AnimatedBackground } from "@/components/animated-background";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function SignupPage() {
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
      <div className="bg-transparent flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Primetrade AI
          </Link>
          <SignupForm />
        </div>
      </div>
    </>
  );
}
