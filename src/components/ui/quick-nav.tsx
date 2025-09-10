"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "timeline", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function QuickNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      {/* Elegant vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/40 to-transparent transform -translate-x-1/2" />
      
      <div className="flex flex-col gap-3 relative">
        {sections.map(({ id, label }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center justify-center transition-all duration-300 hover:scale-125"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Navigate to ${label} section`}
            style={{ 
              width: '44px', 
              height: '34px',
              padding: '1px'
            }}
          >
            {/* Simple dot with smooth transitions */}
            <motion.div
              className={`rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "w-4 h-4 bg-primary"
                  : "w-3 h-3 bg-muted-foreground/30 group-hover:bg-primary/70 group-hover:w-2 group-hover:h-2"
              }`}
              animate={{
                scale: activeSection === id ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: activeSection === id ? Infinity : 0,
                repeatType: "reverse",
              }}
            />

            {/* Minimal tooltip */}
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              <div className="bg-background/90 backdrop-blur-sm border border-border/40 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-md">
                {label}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}