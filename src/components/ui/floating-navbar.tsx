"use client";
import React, { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "glass fixed top-4 left-4 right-4 z-[5000] px-6 py-5 rounded-full flex items-center justify-between max-w-2xl mx-auto",
          "backdrop-blur-md backdrop-saturate-250",
          "bg-white/30 dark:bg-black/20",
          // "border border-white/40 dark:border-white/20",
          "shadow-lg",
          className
        )}
      >
        {/* Left - Name */}
        <div className="font-semibold text-sm sm:text-base sign">
          Avish Kaushik
        </div>

        {/* Center - Icons */}
        <div className="absolute left-1/2 -translate-x-1/2 flex space-x-4">
          {navItems.map((navItem, idx) => (
            <Button
              key={`nav-${idx}`}
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 p-0 border-white/30"
            >
              <a
                href={navItem.link}
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <span className="block">{navItem.icon}</span>
              </a>
            </Button>
          ))}
        </div>
        {/* <ModeMenu /> */}

        {/* Right - Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full w-10 h-10 p-0 border-white/30"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
