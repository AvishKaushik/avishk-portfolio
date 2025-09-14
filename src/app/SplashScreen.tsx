"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransitioning(true);
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          if (onComplete) {
            onComplete();
          } else {
            router.push("/professional");
          }
        },
      });
    }, 4200); // Wait for signature animation to complete

    return () => clearTimeout(timeout);
  }, [router, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-50 overflow-hidden bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Particles Effect */}
        <Particles
          className="absolute inset-0 z-0"
          quantity={1200}
          ease={500}
          staticity={40}
          color={color}
          refresh
        />
        
        <div className="relative flex h-screen w-full flex-col items-center justify-center z-10 text-center px-6">
          <div className="signature-typing-container w-full h-full">
            <h1 className="signature-animation text-4xl md:text-8xl lg:text-9xl xl:text-[12rem] font-normal tracking-wide leading-none h-full content-center">
              Avish Kaushik
            </h1>
          </div>
        </div>

        {/* Skip Button */}
        {/* <motion.button
          className="absolute top-6 right-6 z-30 px-4 py-2 text-sm font-medium rounded-lg bg-muted/20 text-muted-foreground hover:bg-muted/30 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => {
            setIsTransitioning(true);
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.inOut",
              onComplete: () => {
                if (onComplete) {
                  onComplete();
                } else {
                  router.push("/professional");
                }
              },
            });
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Skip splash screen animation"
        >
          Skip
        </motion.button> */}

        {/* Overlay for smooth transition */}
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-background z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
