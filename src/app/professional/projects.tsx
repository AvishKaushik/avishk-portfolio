"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  name: string;
  description: string;
  image: string;
  url: string;
}

const projects: Project[] = [
  {
    name: "IntelliView",
    description: "Interactive learning management platform for universities.",
    image: "/projects/intelliview.png",
    url: "https://intelliview-frontend.vercel.app/",
  },
  {
    name: "Retro Arcade",
    description: "A nostalgic 2D web-based arcade game that showcases portfolio content through classic game mechanics and pixel art.",
    image: "/projects/arcade.png",
    url: "#",
  },
  {
    name: "Portfolio V3",
    description: "3‑mode personal portfolio with game & terminal interface.",
    image: "/projects/portfolio.png",
    url: "#",
  },
  {
    name: "EduHub",
    description: "Interactive learning management platform for universities.",
    image: "/projects/eduhub.png",
    url: "https://avishkaushik.github.io/EduHub/",
  },
  {
    name: "SDG3 Classifier",
    description:
      "A machine learning model that classifies health-related text data aligned with UN Sustainable Development Goal 3",
    image: "/projects/sdg3.png",
    url: "https://sdg3-classifier.vercel.app/",
  },
];

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 bg-background text-foreground"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-16"
      >
        Projects
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="group perspective-1000"
            whileHover={{ zIndex: 2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/5 border border-white/15 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.4)] flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-semibold text-primary group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
