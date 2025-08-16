"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  soundEnabled?: boolean;
}

export const MagneticButton = ({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
  soundEnabled = true,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { play: playHover } = useSound("/sounds/hover.mp3", { volume: 0.2 });
  const { play: playClick } = useSound("/sounds/click.mp3", { volume: 0.3 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    if (soundEnabled) playHover();
  };

  const handleClick = () => {
    if (soundEnabled) playClick();
    onClick?.();
  };

  const Component = href ? motion.a : motion.div;
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      ref={(el: HTMLAnchorElement | HTMLDivElement | null) => {
        ref.current = el;
      }}
      className={`cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Component>
  );
};
