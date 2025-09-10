"use client";
import { useRouter } from "next/navigation";
import { useSplash } from "@/contexts/SplashContext";
import SplashScreen from "./SplashScreen";
import SplashGuard from "@/components/SplashGuard";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  const router = useRouter();
  const { markSplashAsSeen } = useSplash();

  const handleSplashComplete = () => {
    markSplashAsSeen();
    router.push("/professional");
  };

  return (
    <SplashGuard allowedWithoutSplash={true}>
      <SmoothCursor />
      <SplashScreen onComplete={handleSplashComplete} />
    </SplashGuard>
  );
}
