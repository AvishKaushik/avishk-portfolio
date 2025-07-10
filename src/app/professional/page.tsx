"use client";
import { FloatingNav } from "../../components/ui/floating-navbar";
import { IconTerminal2, IconDeviceGamepad } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AboutSection from "./about";
import LandingSection from "./landing";
import ProjectSection from "./projects";
import TimelineSection from "./timeline";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ContactSection from "./contact";
import AchievementsSection from "./achievement";

export default function Professional() {
  const navItems = [
    {
      name: "Game",
      link: "/arcade",
      icon: <IconDeviceGamepad className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "CLI",
      link: "/terminal",
      icon: (
        <IconTerminal2 className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="hide-system-cursor">
      <SmoothCursor/>
      <FloatingNav navItems={navItems} />
      <motion.div
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={cn("relative h-full w-full overflow-hidden")}
      >
        <LandingSection />
      </motion.div>
      <motion.div className="relative flex w-full flex-col overflow-hidden rounded-lg">
        <AboutSection />
      </motion.div>
      <motion.div className="relative flex w-full flex-col overflow-hidden rounded-lg">
        <TimelineSection />
      </motion.div>
      <motion.div className="relative flex w-full flex-col overflow-hidden rounded-lg">
        <ProjectSection />
      </motion.div>
      <motion.div className="relative flex w-full flex-col overflow-hidden rounded-lg">
        <AchievementsSection />
      </motion.div>
      <motion.div className="relative flex w-full flex-col overflow-hidden rounded-lg">
        <ContactSection />
      </motion.div>
    </div>
  );
}
