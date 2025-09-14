"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { MagneticButton } from "@/components/ui/magnetic-button";
import TrophyImage from "@/components/ui/TrophyImage";
import { lazy, Suspense } from "react";
import { useSound } from "@/hooks/useSound";

const Certificate3D = lazy(() => import("@/components/3d/Certificate3D"));
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trophies = [
  {
    id: 1,
    title: "Brainac YG Award",
    description:
      "Received the Brainac YG Award at Societe Generale Global Solution Centre.",
    rank: "Award",
    date: "2023",
    category: "Corporate Award",
    imagePath: "/trophy/brainiac3d.png",
    level: "Organization",
  },
  {
    id: 2,
    title: "BL Special Award",
    description:
      "Received the BL Special Award at Societe Generale Global Solution Centre.",
    rank: "Award",
    date: "2023",
    category: "Corporate Award",
    imagePath: "/trophy/blspecial3d.png",
    level: "Organization",
  },
  {
    id: 3,
    title: "Spot Award",
    description:
      "Received the Spot Award at Societe Generale Global Solution Centre.",
    rank: "Award",
    date: "2022",
    category: "Corporate Award",
    imagePath: "/trophy/spot3d.png",
    level: "Organization",
  },
  {
    id: 4,
    title: "Reply Code Challenge 2021",
    description:
      "Achieved Global Rank 363 and National Rank 73 in this international programming competition.",
    rank: "Global Rank 363 • National Rank 73",
    date: "2021",
    category: "Programming Competition",
    imagePath: "/trophy/reply3d.png",
    level: "International",
  },
  {
    id: 5,
    title: "HashCode 2021",
    description:
      "Achieved International Rank 2282 and National Rank 495 in this coding competition organized by Google.",
    rank: "International Rank 2282 • National Rank 495",
    date: "2021",
    category: "Programming Competition",
    imagePath: "/trophy/google3d.png",
    level: "International",
  },
  {
    id: 6,
    title: "DeCipher 2019",
    description:
      "Achieved International Rank 39 in the DeCipher contest organized at IEM Kolkata.",
    rank: "International Rank 39",
    date: "2019",
    category: "Programming Competition",
    imagePath: "/trophy/decipher3d.png",
    level: "International",
  },
  {
    id: 7,
    title: "Quicky Sudoku Quiz 2016",
    description:
      "Achieved National Rank 1 in the Quicky Sudoku Quiz held at Akash Institute.",
    rank: "National Rank 1",
    date: "2016",
    category: "Quiz Competition",
    imagePath: "/trophy/sudoku3d.png",
    level: "National",
  },
];

const certifications = [
  {
    id: 1,
    title: "Java (Basic)",
    description:
      "Certification from HackerRank validating understanding of fundamental Java programming concepts including OOP, data types, operators, control flow, and basic problem solving.",
    issuer: "HackerRank",
    date: "Nov 2020",
    category: "Programming",
    credentialId: "1d1d281ade56",
    validUntil: "Lifetime",
    skills: ["Java", "OOP", "Control Structures", "Basic Algorithms"],
    verificationUrl: "https://www.hackerrank.com/certificates/1d1d281ade56",
    imagePath: "/certificates/java_basic.png",
  },
  {
    id: 2,
    title: "Data Structures Course",
    description:
      "Course on fundamental data structures including arrays, linked lists, stacks, queues, hash tables, and trees with practical problem-solving techniques.",
    issuer: "UC San Diego (Coursera)",
    date: "Aug 2020",
    category: "Computer Science",
    credentialId: "BWHNVH2TBDZB",
    validUntil: "Lifetime",
    skills: [
      "Arrays",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Trees",
      "Hash Tables",
    ],
    verificationUrl:
      "https://www.coursera.org/account/accomplishments/verify/BWHNVH2TBDZB",
    imagePath: "/certificates/data_structures.jpeg",
  },
  {
    id: 3,
    title: "Algorithmic Toolbox Course",
    description:
      "Introductory algorithms course covering greedy algorithms, divide and conquer, dynamic programming, and efficient problem solving strategies.",
    issuer: "UC San Diego (Coursera)",
    date: "Jul 2020",
    category: "Algorithms",
    credentialId: "SQK74BTE79TQ",
    validUntil: "Lifetime",
    skills: ["Greedy Algorithms", "Divide & Conquer", "Dynamic Programming"],
    verificationUrl:
      "https://www.coursera.org/account/accomplishments/verify/SQK74BTE79TQ",
    imagePath: "/certificates/algo_toolbox.jpeg",
  },
  {
    id: 4,
    title: "Big Data Foundation",
    description:
      "Certification program introducing Big Data concepts, ecosystem components, and applications with hands-on exposure to large-scale data handling.",
    issuer: "NASSCOM FutureSkills",
    date: "Jul 2020",
    category: "Big Data",
    credentialId: "CAC/2020/07/39550",
    validUntil: "Lifetime",
    skills: ["Big Data", "Data Analytics", "Data Processing"],
    verificationUrl: "https://futureskillsprime.in", // generic, replace if you have official
    imagePath: "/certificates/nasscom.webp",
  },
  {
    id: 5,
    title: "Web Development Specialization",
    description:
      "Web development specialization focusing on front-end foundations including HTML5, CSS3, JavaScript, and responsive design practices.",
    issuer: "Johns Hopkins University (Coursera)",
    date: "Jul 2020",
    category: "Frontend Development",
    credentialId: "HK3SW4RYP7MJ",
    validUntil: "Lifetime",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    verificationUrl:
      "https://www.coursera.org/account/accomplishments/verify/HK3SW4RYP7MJ",
    imagePath: "/certificates/web_dev.jpeg",
  },
  {
    id: 6,
    title: "Problem Solving (Basic)",
    description:
      "HackerRank certification demonstrating problem-solving ability in programming fundamentals and simple algorithmic challenges.",
    issuer: "HackerRank",
    date: "Jul 2020",
    category: "Problem Solving",
    credentialId: "b84f36eb3d9e",
    validUntil: "Lifetime",
    skills: ["Basic Algorithms", "Logic", "Programming Fundamentals"],
    verificationUrl: "https://www.hackerrank.com/certificates/b84f36eb3d9e",
    imagePath: "/certificates/problem_solving.png",
  },
  {
    id: 7,
    title: "Python (Basic)",
    description:
      "HackerRank certification covering Python syntax, basic data structures, control flow, and problem solving with Python.",
    issuer: "HackerRank",
    date: "Jul 2020",
    category: "Programming",
    credentialId: "bff79b885fe1",
    validUntil: "Lifetime",
    skills: ["Python", "Data Structures", "Loops", "Functions"],
    verificationUrl: "https://www.hackerrank.com/certificates/bff79b885fe1",
    imagePath: "/certificates/python_basic.png",
  },
  {
    id: 8,
    title: "Problem Solving (Intermediate)",
    description:
      "Certification validating ability to solve intermediate-level programming problems, algorithmic thinking, and optimization techniques.",
    issuer: "HackerRank",
    date: "Jul 2020",
    category: "Problem Solving",
    credentialId: "b4fca97a80d7",
    validUntil: "Lifetime",
    skills: ["Algorithms", "Complexity Analysis", "Problem Solving"],
    verificationUrl: "https://www.hackerrank.com/certificates/b4fca97a80d7",
    imagePath: "/certificates/pob_solving_intermediate.png",
  },
  {
    id: 9,
    title: "REST API (Intermediate)",
    description:
      "Intermediate-level certification in building and consuming REST APIs, covering HTTP methods, JSON, authentication, and RESTful best practices.",
    issuer: "HackerRank",
    date: "Jul 2021",
    category: "Backend Development",
    credentialId: "401014b69331",
    validUntil: "Lifetime",
    skills: ["REST API", "HTTP", "JSON", "Backend Development"],
    verificationUrl: "https://www.hackerrank.com/certificates/401014b69331",
    imagePath: "/certificates/rest_api_intermediate.png",
  },
  {
    id: 10,
    title: "Oracle Java Fundamentals",
    description:
      "Oracle certification covering foundational Java programming concepts, including object-oriented programming, data types, exception handling, and basic APIs.",
    issuer: "Oracle",
    date: "2020",
    category: "Programming",
    credentialId: "ORACLE-JAVA-FUND-2020",
    validUntil: "Lifetime",
    skills: ["Java", "OOP", "Exception Handling", "Java APIs"],
    verificationUrl: "https://education.oracle.com",
    imagePath: "/certificates/oracle.webp",
  },
];

function TrophyCarousel({ items }: { items: typeof trophies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { play: playClick } = useSound("/sounds/click.mp3", { volume: 0.3 });

  const nextItem = useCallback(() => {
    playClick();
    setCurrentIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, playClick]);
  const prevItem = useCallback(() => {
    playClick();
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, playClick]);

  const getOffsetIndex = (index: number) => {
    const total = items.length;
    return (index + total) % total;
  };

  // Auto-rotation (pause on mobile to avoid conflicts with touch)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // Don't auto-rotate on mobile

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  // Touch/swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextItem(); // Swipe left = next
        } else {
          prevItem(); // Swipe right = previous
        }
      }

      startX = 0;
      startY = 0;
    };

    // Keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevItem();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextItem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, nextItem, prevItem]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden right-2 min-h-[850px]">
      <div className="absolute flex justify-between w-full px-4 md:px-8 lg:px-16 mb-10 z-20">
        <MagneticButton
          onClick={prevItem}
          className="p-3 md:p-4 rounded-full bg-muted/20 hover:bg-muted/40 transition shadow-lg backdrop-blur-sm border border-border/50 touch-manipulation"
          aria-label="Previous trophy"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </MagneticButton>
        <MagneticButton
          onClick={nextItem}
          className="p-3 md:p-4 rounded-full bg-muted/20 hover:bg-muted/40 transition shadow-lg backdrop-blur-sm border border-border/50 touch-manipulation"
          aria-label="Next trophy"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </MagneticButton>
      </div>

      <div className="relative flex items-center justify-center w-full h-[800px] md:h-[800px] sm:h-[800px]">
        {/* Minimal Carousel indicators */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 bg-background/70 backdrop-blur-sm border border-border/20 rounded-full px-3 py-2 shadow-sm">
            {items.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  playClick();
                  setCurrentIndex(idx);
                }}
                className="group relative flex items-center justify-center transition-all duration-300 hover:scale-125"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to trophy ${idx + 1}`}
                style={{
                  width: "44px",
                  height: "44px",
                  padding: "1px",
                }}
              >
                {/* Simple dot */}
                <motion.div
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-4 h-4 bg-primary"
                      : "w-4 h-4 bg-muted-foreground/30 group-hover:bg-primary/70"
                  }`}
                  animate={{
                    scale: idx === currentIndex ? [1, 1.15, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: idx === currentIndex ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, idx) => {
            const relativeIndex = getOffsetIndex(idx - currentIndex);
            const offset =
              relativeIndex > items.length / 2
                ? relativeIndex - items.length
                : relativeIndex;

            const isCenter = offset === 0;

            return (
              <motion.div
                key={item.id}
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                animate={{
                  x: offset * 300,
                  scale: isCenter ? 1.2 : 0.8,
                  opacity: isCenter ? 1 : 0.4,
                  zIndex: isCenter ? 10 : 0,
                  filter: isCenter ? "blur(0px)" : "blur(4px)",
                }}
                transition={{ type: "spring", stiffness: 120, damping: 25 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => !isCenter && setCurrentIndex(idx)}
                whileHover={!isCenter ? { scale: 0.9, opacity: 0.6 } : {}}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[350px]">
                    <TrophyImage
                      imagePath={item.imagePath}
                      title={item.title}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                {isCenter && (
                  <motion.div
                    className="mt-6 text-center max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.level === "International"
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                            : "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white"
                        } shadow-lg`}
                      >
                        {item.level}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2 px-10">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">{item.rank}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2 px-10">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </div>
                      <div className="bg-muted/30 px-2 py-1 rounded-full">
                        {item.category}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CertificationPin({ cert }: { cert: (typeof certifications)[0] }) {
  return <Certificate3D cert={cert} />;
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"trophies" | "certifications">(
    "trophies"
  );
  const { play: playClick } = useSound("/sounds/click.mp3", { volume: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".achievements-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Optimized floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full will-change-transform"
          animate={{
            translateX: [0, 100, 0],
            translateY: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear",
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            transform: "translateZ(0)", // Force GPU layer
          }}
        />
      ))}

      <div className="relative z-10 mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="achievements-heading text-4xl md:text-6xl font-bold mb-6">
            <TextAnimate animation="blurInUp" by="character">
              Achievements
            </TextAnimate>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition and certifications that showcase my journey in
            technology and problem-solving
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-muted/20 rounded-2xl p-2 backdrop-blur-sm border border-border/50">
            <MagneticButton
              onClick={() => {
                playClick();
                setActiveTab("trophies");
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "trophies"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="w-4 h-4 mr-2 inline" />
              Trophies & Awards
            </MagneticButton>
            <MagneticButton
              onClick={() => {
                playClick();
                setActiveTab("certifications");
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "certifications"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Award className="w-4 h-4 mr-2 inline" />
              Certifications
            </MagneticButton>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "trophies" ? (
            <div className="mb-16">
              <TrophyCarousel items={trophies} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-20 justify-items-center max-w-[1600px] mx-auto px-8">
              <Suspense
                fallback={
                  <div className="animate-pulse bg-muted/20 rounded-2xl h-96 w-80" />
                }
              >
                {certifications.map((cert) => (
                  <CertificationPin key={cert.id} cert={cert} />
                ))}
              </Suspense>
            </div>
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {[
            { value: "4", label: "Competition Wins" },
            { value: "3", label: "Recognition Awards" },
            { value: "10", label: "Certifications" },
            { value: "39", label: "Best Global Rank" },
            { value: "1", label: "Best National Rank" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
