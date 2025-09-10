"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SplashContextType {
  hasSeenSplash: boolean;
  markSplashAsSeen: () => void;
  isLoading: boolean;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function useSplash() {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
}

interface SplashProviderProps {
  children: ReactNode;
}

export function SplashProvider({ children }: SplashProviderProps) {
  const [hasSeenSplash, setHasSeenSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has seen splash in this session
    const splashSeen = sessionStorage.getItem("splash-seen");
    
    if (splashSeen === "true") {
      setHasSeenSplash(true);
      setIsLoading(false);
    } else {
      // If user hasn't seen splash and is not on home page, redirect to home
      if (pathname !== "/") {
        router.replace("/");
      }
      setIsLoading(false);
    }
  }, [pathname, router]);

  const markSplashAsSeen = () => {
    setHasSeenSplash(true);
    sessionStorage.setItem("splash-seen", "true");
  };

  return (
    <SplashContext.Provider
      value={{
        hasSeenSplash,
        markSplashAsSeen,
        isLoading,
      }}
    >
      {children}
    </SplashContext.Provider>
  );
}