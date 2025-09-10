"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TextAnimate } from "@/components/magicui/text-animate";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ──────────────────────────────────────────────────────────────
// 🔖 Placeholder Project Data – replace with real content later
// ──────────────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  img: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "intelliview",
    title: "IntelliView Interview Platform",
    blurb: "AI-proctored mock interviews with skill analytics",
    description:
      "Can take mock interviews for any kind of interview rounds and with custom difficulty using AI. Built with Next.js, AWS Lambda, DynamoDB, and Bedrock for real-time feedback and bias detection.",
    tech: ["Next.js", "AWS", "Bedrock", "Lambda", "Tailwind"],
    liveUrl: "https://intelliview-frontend.vercel.app/",
    githubUrl: "https://github.com/AvishKaushik/intelliview-frontend",
    img: "/projects/intelliview.webp",
    featured: true,
  },
  {
    id: "eduhub",
    title: "EduHub",
    blurb: "Algorithm visualization platform",
    description:
      "A platform to understand algorithms like searching, sorting, and more using interactive visualization techniques.",
    tech: ["React", "JavaScript", "CSS", "HTML"],
    liveUrl: "https://avishkaushik.github.io/EduHub/",
    githubUrl: "https://github.com/AvishKaushik/EduHub",
    img: "/projects/eduhub.webp",
    featured: true,
  },
  {
    id: "sdg3-classifier",
    title: "SDG3 Classifier",
    blurb: "AI-based SDG3 repository classifier",
    description:
      "A website where users can submit a questionnaire to get an SDG3 score of a GitHub repo. Helps tag and discover SDG3-friendly projects, encouraging community collaboration.",
    tech: ["Python", "Flask", "ML", "JavaScript"],
    githubUrl: "https://github.com/AvishKaushik/sdg3-classifier",
    img: "/projects/sdg3.webp",
    featured: false,
  },
  {
    id: "collab",
    title: "Collab",
    blurb: "University-wide collaboration and discussion app",
    description:
      "A Flutter application for iOS and Android where users can create groups, add people, discuss in feeds, and comment/upvote posts. Designed for seamless university-wide collaboration and communication.",
    tech: ["Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/AvishKaushik/collab",
    img: "/projects/collab.webp",
    featured: false,
  },
  {
    id: "csa-simulator",
    title: "CSA Simulator",
    blurb: "Interactive computer architecture simulator",
    description:
      "A Java-based tool simulating CPU, memory, I/O devices, and conversion utilities. Provides a graphical interface to execute instructions, visualize registers/memory, and handle faults.",
    tech: ["Java", "Swing", "OOP"],
    githubUrl: "https://github.com/AvishKaushik/Simulator",
    img: "/projects/csa.webp",
    featured: false,
  },
];

// ──────────────────────────────────────────────────────────────
// 🌟 Animation Variants & Helpers
// ──────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ──────────────────────────────────────────────────────────────
// 🖼  Card Components
// ──────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  // Lightweight parallax only if animations allowed
  const yImg = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-6%", "6%"]
  );
  const scaleImg = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.05, 1]
  );

  return (
    <motion.div
      variants={cardVariants}
      className="group relative block rounded-3xl overflow-hidden border border-border shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.4)] transition-all duration-500 backdrop-blur-lg bg-background/50 will-change-transform"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Thumbnail with parallax */}
      <div
        ref={imgRef}
        className="relative w-full aspect-video overflow-hidden transform-gpu"
        style={{ position: "relative" }}
      >
        <motion.div
          style={{ y: yImg, scale: scaleImg }}
          className="relative w-full h-full"
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1000px, (min-width: 768px) 700px, 100vw"
            className="object-cover transition-all duration-700 group-hover:brightness-110"
            priority={project.featured}
            quality={85}
          />
        </motion.div>

        {/* Hover overlay with CTA buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-background/5  opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-black bg-white border border-gray-200 rounded-full px-6 py-3 text-gray-900 text-sm font-semibold hover:bg-gray-50 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 flex items-center gap-2 relative z-10"
                aria-label={`View live demo of ${project.title}`}
              >
                <span>View Live</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-black bg-white border border-gray-200 rounded-full px-6 py-3 text-gray-900 text-sm font-semibold hover:bg-gray-50 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 flex items-center gap-2 relative z-10"
                aria-label={`Github Code of ${project.title}`}
              >
                <span>GitHub</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/95 via-transparent group-hover:from-background/90" />

      {/* Content */}
      <div className="absolute bottom-0 p-6 md:p-8 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground flex items-start gap-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
            <span className="inline-block w-2 h-2 rounded-full bg-primary/80 mt-2 animate-pulse group-hover:bg-primary" />
          </h3>
          <p className="text-sm md:text-base text-foreground max-w-[50ch] line-clamp-2 group-hover:text-foreground/90">
            {project.blurb}
          </p>
          <p className="text-xs md:text-sm text-foreground/70 max-w-[55ch] line-clamp-2 transition-opacity duration-300">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] md:text-xs bg-muted/60 group-hover:bg-primary/20 group-hover:border-primary/40 rounded-full px-2 py-0.5 tracking-wide backdrop-blur-sm border border-border/60 transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col border border-border rounded-2xl overflow-hidden bg-muted/10 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 will-change-transform hover:border-primary/30"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0px)" : "translateY(36px)",
        transition:
          "opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div className="relative w-full aspect-video overflow-hidden transform-gpu">
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 350px, (min-width: 640px) 300px, 100vw"
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
          quality={80}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* CTA Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0"
                aria-label={`View live demo of ${project.title}`}
              >
                <span>Live</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0"
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <span>Code</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1">
        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/90">
          {project.blurb}
        </p>
        <p className="text-[10px] text-muted-foreground/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pb-4 mt-auto">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] bg-muted/40 group-hover:bg-primary/20 group-hover:border-primary/40 rounded-full px-1.5 py-0.5 tracking-wide backdrop-blur-sm border border-border/60 transition-all duration-300"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// 📐 Main Section Component
// ──────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // GSAP heading reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        y: 80,
        opacity: 0,
        scale: 0.965,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      {/* Heading */}
      <h2 className="projects-heading text-center text-4xl md:text-6xl font-bold mb-24 z-10 relative">
        <TextAnimate animation="blurInUp" by="character">
          Projects
        </TextAnimate>
      </h2>

      {/* Featured */}
      {featured.length > 0 && (
        <motion.div
          className="grid gap-14 z-10 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={containerVariants}
        >
          {featured.map((proj) => (
            <FeaturedCard key={proj.id} project={proj} />
          ))}
        </motion.div>
      )}

      {/* Separator */}
      {featured.length > 0 && others.length > 0 && (
        <div className="w-full h-px bg-border/50 my-24" />
      )}

      {/* Grid */}
      {others.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 z-10 relative">
          {others.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}
    </section>
  );
}
