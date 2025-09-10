"use client";

import { ReactNode } from "react";
import { useSplash } from "@/contexts/SplashContext";
import SplashScreen from "@/app/SplashScreen";

interface SplashGuardProps {
  children: ReactNode;
  allowedWithoutSplash?: boolean;
}

export default function SplashGuard({ 
  children, 
  allowedWithoutSplash = false 
}: SplashGuardProps) {
  const { hasSeenSplash, markSplashAsSeen, isLoading } = useSplash();

  // Show loading state while checking splash status
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If this page is allowed without splash (like the home page), show it
  if (allowedWithoutSplash) {
    return <>{children}</>;
  }

  // If user hasn't seen splash, show splash screen
  if (!hasSeenSplash) {
    return (
      <SplashScreen
        onComplete={() => {
          markSplashAsSeen();
          // Don't redirect here, let the page render normally
        }}
      />
    );
  }

  // User has seen splash, show the page
  return <>{children}</>;
}