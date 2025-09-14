"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "../../components/ui/floating-navbar";
import { IconTerminal2, IconDeviceGamepad } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import AboutSection from "./about";
import LandingSection from "./landing";
import ProjectSection from "./projects";
import TimelineSection from "./timeline";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { QuickNav } from "@/components/ui/quick-nav";
import ContactSection from "./contact";
import AchievementsSection from "./achievement";
import SplashGuard from "@/components/SplashGuard";

export default function Professional() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload sounds
    const sounds = ['/sounds/hover.mp3', '/sounds/click.mp3'];
    sounds.forEach(sound => {
      const audio = new Audio(sound);
      audio.preload = 'auto';
    });

    setIsLoaded(true);
  }, []);

  const navItems = [
    {
      name: "Game",
      link: "/arcade",
      icon: (
        <IconDeviceGamepad className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "CLI",
      link: "/terminal",
      icon: (
        <IconTerminal2 className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <SplashGuard>
      <AnimatePresence mode="wait">
        <motion.div
          key="professional"
          initial="initial"
          animate="animate"
          exit="exit"
          className="hide-system-cursor professional-page overflow-y-scroll no-scrollbar"
        >
          {/* Enhanced UI Components */}
          <ScrollProgress />
          <SmoothCursor />
          <FloatingNav navItems={navItems} />
          <QuickNav />

          {/* Page Sections */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={cn("relative h-full w-full overflow-hidden")}
          >
            <LandingSection />
          </motion.div>
          
          <motion.div className="relative flex w-full flex-col overflow-hidden">
            <AboutSection />
          </motion.div>
          
          <motion.div className="relative flex w-full flex-col overflow-hidden">
            <TimelineSection />
          </motion.div>
          
          <motion.div className="relative flex w-full flex-col overflow-hidden">
            <ProjectSection />
          </motion.div>
          
          <motion.div className="relative flex w-full flex-col overflow-hidden">
            <AchievementsSection />
          </motion.div>
          
          <motion.div className="relative flex w-full flex-col overflow-hidden">
            <ContactSection />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </SplashGuard>
  );
}
