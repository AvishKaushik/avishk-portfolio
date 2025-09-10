"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TrophyImageProps {
  imagePath: string;
  title: string;
  className?: string;
}

export default function TrophyImage({ imagePath, title, className = "" }: TrophyImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      animate={{
        rotateY: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 10,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative w-full h-full max-w-[300px] max-h-[300px]">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
          priority
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-xl opacity-50" />
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-primary rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>
    </motion.div>
  );
}