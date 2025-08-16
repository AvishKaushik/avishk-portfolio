"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";

type CarouselProps = {
  children: ReactNode;
};

export const Carousel = ({ children }: CarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
    }
  }, [children]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden cursor-grab">
      <motion.div className="flex gap-6" drag="x" dragConstraints={{ right: 0, left: -width }} whileTap={{ cursor: "grabbing" }}>
        {children}
      </motion.div>
    </div>
  );
};