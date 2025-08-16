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
import Trophy3D from "@/components/3d/Trophy3D";
import Certificate3D from "@/components/3d/Certificate3D";
import { useSound } from "@/hooks/useSound";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

const trophies = [
  {
    id: 1,
    title: "Reply Code Challenge 2021",
    description:
      "Achieved Global Rank 363 and India Rank 73 in this prestigious international programming competition",
    rank: "Global Rank 363 • India Rank 73",
    date: "2021",
    category: "Programming Competition",
    modelPath: "/models/trophy1.glb",
    level: "International",
  },
  {
    id: 2,
    title: "Google HashCode 2021",
    description:
      "Participated in Google's team programming competition, solving real-world engineering problems",
    rank: "International Rank 2282 • India Rank 495",
    date: "2021",
    category: "Team Programming",
    modelPath: "/models/trophy2.glb",
    level: "International",
  },
  {
    id: 3,
    title: "DeCipher IEM 2019",
    description:
      "Secured International Rank 39 in this competitive programming and problem-solving contest",
    rank: "International Rank 39",
    date: "2019",
    category: "Problem Solving",
    modelPath: "/models/trophy3.glb",
    level: "International",
  },
  {
    id: 4,
    title: "Quicky Sudoku Quiz 2016",
    description:
      "Achieved National Rank 1 in Sudoku competition organized by Aakash Institute",
    rank: "National Rank 1",
    date: "2016",
    category: "Logic & Reasoning",
    modelPath: "/models/trophy4.glb",
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
    imagePath: "/certificates/java-basic-hackerrank.svg",
  },
  {
    id: 2,
    title: "Data Structures",
    description:
      "Course on fundamental data structures including arrays, linked lists, stacks, queues, hash tables, and trees with practical problem-solving techniques.",
    issuer: "University of California San Diego (Coursera)",
    date: "Aug 2020",
    category: "Computer Science",
    credentialId: "BWHNVH2TBDZB",
    validUntil: "Lifetime",
    skills: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Tables"],
    verificationUrl:
      "https://www.coursera.org/account/accomplishments/verify/BWHNVH2TBDZB",
    imagePath: "/certificates/data-structures-ucsd.svg",
  },
  {
    id: 3,
    title: "Algorithmic Toolbox",
    description:
      "Introductory algorithms course covering greedy algorithms, divide and conquer, dynamic programming, and efficient problem solving strategies.",
    issuer: "University of California San Diego (Coursera)",
    date: "Jul 2020",
    category: "Algorithms",
    credentialId: "SQK74BTE79TQ",
    validUntil: "Lifetime",
    skills: ["Greedy Algorithms", "Divide & Conquer", "Dynamic Programming"],
    verificationUrl:
      "https://www.coursera.org/account/accomplishments/verify/SQK74BTE79TQ",
    imagePath: "/certificates/algorithmic-toolbox-ucsd.svg",
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
    imagePath: "/certificates/big-data-foundation-nasscom.svg",
  },
  {
    id: 5,
    title: "HTML, CSS, and JavaScript for Web Developers",
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
    imagePath: "/certificates/html-css-js-jhu.svg",
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
    imagePath: "/certificates/problem-solving-basic-hackerrank.svg",
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
    imagePath: "/certificates/python-basic-hackerrank.svg",
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
    imagePath: "/certificates/problem-solving-intermediate-hackerrank.svg",
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
    imagePath: "/certificates/rest-api-intermediate-hackerrank.svg",
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
    verificationUrl: "https://education.oracle.com", // generic, replace if you have actual
    imagePath: "/certificates/oracle-java-fundamentals.svg",
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
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute flex justify-between w-full px-4 md:px-8 lg:px-16 mb-10 z-20">
        <MagneticButton
          onClick={prevItem}
          className="p-3 md:p-4 rounded-full bg-muted/20 hover:bg-muted/40 transition shadow-lg backdrop-blur-sm border border-border/50 touch-manipulation"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </MagneticButton>
        <MagneticButton
          onClick={nextItem}
          className="p-3 md:p-4 rounded-full bg-muted/20 hover:bg-muted/40 transition shadow-lg backdrop-blur-sm border border-border/50 touch-manipulation"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </MagneticButton>
      </div>

      <div className="relative flex items-center justify-center w-full h-[800px] md:h-[800px] sm:h-[800px]">
        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                playClick();
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                idx === currentIndex
                  ? "bg-primary w-6 md:w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
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
                    <Canvas
                      camera={{ position: [1, 1, 1] }}
                      style={{ width: "100%", height: "100%" }}
                      gl={{ antialias: true, alpha: true }}
                      dpr={[1, 2]}
                    >
                      <ambientLight intensity={2} />
                      <directionalLight intensity={3} position={[2, 2, 5]} />
                      <Trophy3D modelPath={item.modelPath} />
                    </Canvas>
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

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {certifications.map((cert) => (
                <CertificationPin key={cert.id} cert={cert} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "4", label: "Competition Wins" },
            { value: "3", label: "Certifications" },
            { value: "39", label: "Best Global Rank" },
            { value: "1", label: "National Rank" },
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
                className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
