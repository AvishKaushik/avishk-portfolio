"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingSection() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".landing-heading", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      });

      // Subtext animation
      gsap.from(".landing-subtext", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen flex items-center justify-center flex-col px-6 bg-background"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={500}
        ease={1000}
        staticity={20}
        color={color}
        refresh
      />

      <div className="relative flex h-screen w-full flex-col items-center justify-center z-10 text-center space-y-4">
        <h1 className="landing-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-8xl">
          Hi, I&apos;m{" "}
          <LineShadowText shadowColor={color}>Avish</LineShadowText>{" "}
          <LineShadowText shadowColor={color}>Kaushik</LineShadowText>
        </h1>

        <p className="landing-subtext text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl text-muted-foreground">
          Full Stack Developer | CS @ GWU
        </p>

        {/* Resume Button */}
        <a
          href="/Avish_Kaushik_Resume.pdf"
          download
          className="mt-6 resume-button inline-flex items-center gap-2 rounded-md border border-muted-foreground px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/30 transition-colors duration-300"
        >
          <span>Download Resume</span>
        </a>
      </div>
    </section>
  );
}
