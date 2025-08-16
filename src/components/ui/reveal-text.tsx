"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const RevealText = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8 
}: RevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = children.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)" 
          } : {}}
          transition={{
            duration,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};