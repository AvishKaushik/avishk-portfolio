"use client";
import React, { JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";

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
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      return;
    }

    // Ensure cursor stays hidden during transition
    const ensureCursorHidden = () => {
      document.body.style.cursor = "none";
      document.documentElement.style.cursor = "none";
      // Force all elements to have no cursor
      const style = document.createElement("style");
      style.id = "transition-cursor-fix";
      style.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    const removeCursorFix = () => {
      const style = document.getElementById("transition-cursor-fix");
      if (style) {
        style.remove();
      }
      // Reset cursor styles
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };

    // Apply cursor fix before transition
    ensureCursorHidden();

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
      });
    });

    await transition.ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    const animation = document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    // Remove cursor fix after animation completes
    animation.addEventListener("finish", removeCursorFix);
    transition.finished.then(removeCursorFix).catch(removeCursorFix);
  };

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ display: "none" }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 20 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(
            "fixed top-4 left-4 right-4 z-[5000] px-6 py-5 max-w-2xl mx-auto",
            "rounded-full flex items-center justify-between",
            "backdrop-blur-xl bg-white/10 dark:bg-black/30",
            "border border-white/20 dark:border-white/10",
            "shadow-[0_4px_15px_rgba(0,0,0,0.2)]",
            "bg-gradient-to-tr from-white/10 via-white/5 to-transparent",
            className
          )}
        >
          {/* Left - Name */}
          <div className="font-semibold text-sm sm:text-base sign text-black dark:text-white drop-shadow-sm">
            Avish Kaushik
          </div>

          {/* Center - Simple Animated Icons */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex gap-4"
            style={{ filter: "url(#goo)" }}
          >
            {navItems.map((navItem, idx) => {
              // Define simple, visible animations based on the nav item name
              const getIconAnimation = () => {
                if (navItem.name === "Game") {
                  // Controller joystick movement - left and right like playing
                  return {
                    animate: {
                      x: [0, -4, 4, -2, 2, 0],
                      rotate: [0, -8, 8, -4, 4, 0],
                    },
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  };
                } else if (navItem.name === "CLI") {
                  // Terminal typing movement - up and down like typing
                  return {
                    animate: {
                      y: [0, -2, 0, -1, 0],
                      rotate: [0, 2, -2, 1, 0],
                    },
                    transition: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  };
                }
                return {};
              };

              const iconAnimation = getIconAnimation();

              return (
                <motion.div
                  key={`nav-${idx}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full w-12 h-12 p-0",
                      "bg-white/20 dark:bg-white/10 backdrop-blur-md",
                      "border border-white/30 dark:border-white/10",
                      "shadow-[0_4px_8px_rgba(0,0,0,0.15)]",
                      "transition-all duration-300 hover:shadow-lg"
                    )}
                  >
                    <a
                      href={navItem.link}
                      className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <span className="block" {...iconAnimation}>
                        {navItem.icon}
                      </span>
                    </a>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Right - Animated Theme Toggle */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              ref={buttonRef}
              variant="ghost"
              size="icon"
              onClick={changeTheme}
              className={cn(
                "rounded-full w-12 h-12 p-0 relative",
                "bg-white/20 dark:bg-white/10 backdrop-blur-md",
                "border border-white/30 dark:border-white/10",
                "shadow-[0_4px_8px_rgba(0,0,0,0.15)]",
                "transition-all duration-300 hover:shadow-lg"
              )}
            >
              {/* Animated Sun */}
              <motion.div
                animate={{
                  rotate: theme === "light" ? 360 : 0,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              </motion.div>

              {/* Animated Moon */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  y: theme === "dark" ? [0, -2, 0] : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </motion.div>

              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
