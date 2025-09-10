"use client";

import React, { useState } from "react";
import { Calendar, Award, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Certificate3DProps {
  cert: {
    id: number;
    title: string;
    description: string;
    issuer: string;
    date: string;
    category: string;
    credentialId: string;
    validUntil: string;
    imagePath?: string;
    skills?: string[];
    verificationUrl?: string;
  };
}

export default function Certificate3D({ cert }: Certificate3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  // Generate certificate image path based on ID if not provided
  const imagePath = cert.imagePath || `/certificates/cert-${cert.id}.jpg`;

  const onMouseEnter = () => {
    setIsHovered(true);
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.95)");
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div className="relative group/pin z-10 cursor-pointer w-full max-w-[380px] mx-auto h-[420px]">
      {/* Main Certificate Card - Fixed Size */}
      <div
        className="relative h-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0deg)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            style={{
              transform: transform,
            }}
            className={cn(
              "absolute left-1/2 top-1/2 p-0 rounded-2xl transition-all duration-700 overflow-hidden",
              "bg-card/95 backdrop-blur-xl",
              "border border-border/20",
              "shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
              isHovered &&
                "border-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] scale-[1.02]"
            )}
          >
            <div className="relative z-50 w-[350px] h-[340px]">
              {/* Certificate Image - Larger and more prominent */}
              <div className="relative w-full h-[220px] rounded-t-2xl overflow-hidden bg-muted/20">
                <motion.img
                  src={imagePath}
                  alt={`${cert.title} Certificate`}
                  className="w-full h-full object-contain bg-white/90 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='220' viewBox='0 0 350 220'%3E%3Crect width='350' height='220' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='system-ui' font-size='16'%3ECertificate%3C/text%3E%3C/svg%3E";
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Verification Badge */}
                <motion.div
                  className="absolute top-3 right-3 bg-emerald-50/95 dark:bg-emerald-950/95 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 p-2 rounded-full border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Shield className="w-3.5 h-3.5" />
                </motion.div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs font-medium border border-border/30 shadow-sm">
                  {cert.category}
                </div>

                {/* Enhanced overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Enhanced Info Section - Better spacing and readability */}
              <div className="p-5 h-[120px] flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground leading-tight tracking-tight">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-primary/40" />
                    <span className="text-sm font-medium truncate">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground/70 pt-2 border-t border-border/30">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 opacity-60" />
                    <span>{cert.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3 h-3 opacity-60" />
                    <span className="truncate">Until {cert.validUntil}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Details Panel - Above the Pin */}
        <motion.div
          className={cn(
            "pointer-events-none w-96 h-80 flex items-center justify-center z-[100] transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-full h-full -mt-7 flex-none inset-0">
            {/* Enhanced Certificate Pin */}
            <div className="absolute top-0 inset-x-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 8,
                  scale: isHovered ? 1 : 0.95,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "relative flex flex-wrap items-center justify-center gap-2 z-[100] rounded-2xl px-4 py-3 max-w-sm",
                  "bg-card/98 backdrop-blur-xl",
                  "border border-border/20",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                )}
              >
                {/* Key Skills - Better layout for mobile */}
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {cert.skills &&
                    cert.skills.slice(0, 4).map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="bg-primary/8 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/10 hover:bg-primary/12 transition-colors whitespace-nowrap"
                      >
                        {skill}
                      </motion.span>
                    ))}

                  {/* Verification Status */}
                  {cert.verificationUrl && (
                    <motion.a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="flex items-center gap-1.5 bg-emerald-50/80 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-200/30 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all pointer-events-auto group whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Verify ${cert.title} certificate`}
                    >
                      <Shield className="w-3 h-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>Verify</span>
                    </motion.a>
                  )}
                </div>

                {/* Subtle accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </motion.div>
            </div>

            {/* Subtle Ripple Effects */}
            <div
              style={{
                perspective: "1000px",
                transform: "rotateX(70deg) translateZ(0)",
              }}
              className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
            >
              {[0, 3, 6].map((delay) => (
                <motion.div
                  key={delay}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: "-50%",
                    y: "-50%",
                  }}
                  animate={{
                    opacity: [0, 0.4, 0.2, 0],
                    scale: [0.8, 1.2, 1.4, 1.6],
                    z: 0,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: delay,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] rounded-full bg-slate-800/[0.04] border border-slate-600/[0.08]"
                  style={{
                    backdropFilter: "blur(1px)",
                    boxShadow: "0 0 20px rgba(30, 41, 59, 0.08)",
                  }}
                />
              ))}
            </div>

            {/* Elegant Dark Pin Shaft - Perfect contrast against white certificates */}
            <motion.div
              className="absolute right-1/2 translate-x-[1px] bottom-1/2 translate-y-[14px] w-0.5 bg-gradient-to-b from-transparent via-slate-600/70 to-slate-800/90"
              animate={{
                height: isHovered ? "12rem" : "7rem",
                opacity: isHovered ? 0.9 : [0.6, 0.8, 0.6],
                filter: isHovered
                  ? "drop-shadow(0 0 8px rgba(30, 41, 59, 0.4)) drop-shadow(0 0 16px rgba(30, 41, 59, 0.2))"
                  : "drop-shadow(0 0 4px rgba(30, 41, 59, 0.3))",
              }}
              transition={{
                duration: isHovered ? 0.5 : 3,
                ease: "easeInOut",
                repeat: isHovered ? 0 : Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Sophisticated Dark Pin Head - Perfectly aligned with shaft */}
            <motion.div
              className="absolute right-1/2 translate-x-[5px] bottom-1/2 translate-y-[14px] w-2.5 h-2.5 rounded-full border border-slate-400/30"
              style={{
                background:
                  "linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)",
                boxShadow:
                  "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              animate={{
                scale: isHovered ? [1.3, 1.5, 1.3] : [1, 1.2, 1],
                opacity: isHovered ? 1 : [0.8, 0.95, 0.8],
                filter: isHovered
                  ? "drop-shadow(0 0 12px rgba(30, 41, 59, 0.5)) drop-shadow(0 0 24px rgba(30, 41, 59, 0.3))"
                  : "drop-shadow(0 0 6px rgba(30, 41, 59, 0.4))",
              }}
              transition={{
                duration: isHovered ? 0.8 : 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Sharp Dark Pin Tip - Aligned with shaft */}
            <motion.div
              className="absolute right-1/2 translate-x-[1px] bottom-1/2 bg-gradient-to-b from-slate-700 to-slate-900 w-0.5 h-3 translate-y-[11px]"
              style={{
                clipPath: "polygon(50% 100%, 20% 0%, 80% 0%)",
                filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
              }}
              animate={{
                opacity: isHovered ? 0.95 : [0.7, 0.85, 0.7],
              }}
              transition={{
                duration: isHovered ? 0.3 : 2,
                repeat: isHovered ? 0 : Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Subtle dark glow effect - Centered on pin head */}
            <motion.div
              className="absolute right-1/2 translate-x-[-11px] bottom-1/2 translate-y-[14px] w-6 h-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(30, 41, 59, 0.15) 0%, transparent 70%)",
              }}
              animate={{
                scale: isHovered ? [1, 1.5, 1] : [0.8, 1.2, 0.8],
                opacity: isHovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: isHovered ? 1.2 : 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
