"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  School,
} from "lucide-react";

interface Milestone {
  title: string;
  description: string;
  date: string;
  type: "education" | "work" | "achievement";
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    title: "M.S. @ George Washington University",
    description: "Specializing in Theory and Algorithms",
    date: "Aug 2024",
    type: "education",
    icon: <School className="w-4 h-4" />,
  },
  {
    title: "Software Engineer @ Societe Generale",
    description: "Led full-stack delivery, cloud migration, and legacy decommissioning.",
    date: "Jan 2022 – Jul 2024",
    type: "work",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    title: "Software Engineer Intern @ Kogniti",
    description: "Built an interactive educational game using React to enhance learning engagement.",
    date: "Oct 2021 – Jan 2022",
    type: "work",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    title: "B. Tech @ VIT Bhopal",
    description: "B.Tech Computer Science (CGPA 9.06)",
    date: "Aug 2018 – Jul 2022",
    type: "education",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    title: "St. Theresa School",
    description: "12th Grade CBSE — 84.8%",
    date: "May 2018",
    type: "education",
    icon: <School className="w-4 h-4" />,
  },
];

const DOT: Record<Milestone["type"], string> = {
  education: "bg-blue-500",
  work: "bg-emerald-500",
  achievement: "bg-amber-400",
};

const ROW_H = 150; // vertical space per row
const RADIUS = 80; // curve radius

/* Build the S‑curve for a given number of rows */
function buildPath(rows: number) {
  const h = ROW_H / 10;
  const r = RADIUS / 10;
  let d = `M ${r} 0`;
  for (let i = 0; i < rows; i++) {
    const dir = i % 2 === 0 ? 1 : -1;
    d += ` h ${dir * (100 - 2 * r)}`;
    if (i < rows - 1) {
      const sweep = dir === 1 ? 1 : 0;
      d += ` a ${r} ${r} 0 0 ${sweep} ${dir * r} ${r}`;
      d += ` v ${h - 2 * r}`;
      d += ` a ${r} ${r} 0 0 ${sweep} ${-dir * r} ${r}`;
    }
  }
  return d;
}

export default function TimelineSection() {
  const rows = Math.ceil(milestones.length / 2);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.95"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Individual hook calls for each milestone
  const reveal0 = useTransform(pathLength, (v) => (v > 0 / rows ? 1 : 0));
  const translateY0 = useTransform(reveal0, (o) => (o === 1 ? "0px" : "20px"));
  
  const reveal1 = useTransform(pathLength, (v) => (v > 0 / rows ? 1 : 0));
  const translateY1 = useTransform(reveal1, (o) => (o === 1 ? "0px" : "20px"));
  
  const reveal2 = useTransform(pathLength, (v) => (v > 1 / rows ? 1 : 0));
  const translateY2 = useTransform(reveal2, (o) => (o === 1 ? "0px" : "20px"));
  
  const reveal3 = useTransform(pathLength, (v) => (v > 1 / rows ? 1 : 0));
  const translateY3 = useTransform(reveal3, (o) => (o === 1 ? "0px" : "20px"));
  
  const reveal4 = useTransform(pathLength, (v) => (v > 2 / rows ? 1 : 0));
  const translateY4 = useTransform(reveal4, (o) => (o === 1 ? "0px" : "20px"));
  
  const milestoneTransforms = [
    { reveal: reveal0, translateY: translateY0 },
    { reveal: reveal1, translateY: translateY1 },
    { reveal: reveal2, translateY: translateY2 },
    { reveal: reveal3, translateY: translateY3 },
    { reveal: reveal4, translateY: translateY4 },
  ];
  
  return (
    <section
      id="timeline"
      className="relative py-24 px-6 md:px-14 bg-background"
    >
      <h2 className="text-4xl md:text-6xl font-bold text-center">My Journey</h2>

      {/* -------- desktop / tablet -------- */}
      <div
        ref={trackRef}
        className="hidden md:block relative mx-auto w-full max-w-6xl mt-56"
        style={{ height: rows * ROW_H }}
      >
        <svg
          viewBox={`0 0 100 ${rows * (ROW_H / 10)}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <motion.path
            d={buildPath(rows)}
            stroke="#444"
            strokeWidth="0.15"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {milestones.map((m, idx) => {
          const row = Math.floor(idx / 2);
          const isFirstInRow = row % 2 == 0 ? idx % 2 === 0 : idx % 2 == 1;
          const dotLeft = isFirstInRow ? "30%" : "70%";
          const cardLeft = isFirstInRow
            ? "calc(30% - 210px)"
            : "calc(70% - 140px)";

          return (
            <motion.div
              key={m.title}
              className="absolute w-full"
              style={{
                top: row * ROW_H,
                opacity: milestoneTransforms[idx].reveal,
                transform: milestoneTransforms[idx].translateY,
                transition: "all 0.4s ease",
              }}
            >
              <motion.span
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-background ${
                  DOT[m.type]
                }`}
                style={{
                  left: dotLeft,
                  top: 0,
                  opacity: milestoneTransforms[idx].reveal,
                  transition: "opacity 0.3s ease",
                }}
              />

              <div
                className="glass max-w-xs p-4 rounded-xl"
                style={{
                  position: "absolute",
                  left: cardLeft,
                  top: "-110px",
                }}
              >
                <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                  {m.icon}
                  {m.title}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {m.description}
                </p>
                <span className="block text-[10px] text-muted-foreground italic mt-1">
                  {m.date}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* -------- mobile fallback (unchanged) -------- */}
      <div className="md:hidden relative max-w-xl mx-auto mt-24">
        <span className="absolute left-2 top-0 h-full w-px bg-muted" />
        <div className="space-y-12 pl-8">
          {milestones.map((m) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span
                className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-background ${
                  DOT[m.type]
                }`}
              />
              <div className="glass p-5 rounded-xl">
                <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                  {m.icon}
                  {m.title}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {m.description}
                </p>
                <span className="text-[10px] text-muted-foreground italic block mt-1">
                  {m.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 