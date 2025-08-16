"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
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
      // Clean, smooth entrance animations
      gsap.from(".landing-heading", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".landing-subtext", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".landing-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.7,
        ease: "power3.out",
      });

      gsap.from(".cta-buttons", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.9,
        ease: "power3.out",
      });

      gsap.from(".scroll-indicator", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 1.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="landing"
      ref={sectionRef}
      className="h-screen flex items-center justify-center flex-col px-6 bg-background"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={1200}
        ease={500}
        staticity={40}
        color={color}
        refresh
      />

      <div className="relative flex h-screen w-full flex-col items-center justify-center z-10 text-center space-y-6">
        <div className="space-y-4">
          <h1 className="landing-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-8xl">
            Hi, I&apos;m{" "}
            <LineShadowText shadowColor={color}>Avish</LineShadowText>{" "}
            <LineShadowText shadowColor={color}>Kaushik</LineShadowText>
          </h1>

          <p className="landing-subtext text-xl font-semibold tracking-tight md:text-3xl lg:text-4xl text-muted-foreground">
            Full Stack Developer | CS @ GWU
          </p>
          
          <p className="landing-description text-sm md:text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Building scalable applications with modern tech stacks. 
            Passionate about AI, cloud architecture, and creating exceptional user experiences.
          </p>
        </div>

        {/* Enhanced CTA Section with Magnetic Buttons */}
        <div className="cta-buttons flex flex-col sm:flex-row gap-4 mt-8">
          <MagneticButton
            href="/Avish_Kaushik_Resume.pdf"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Resume</span>
          </MagneticButton>
          
          <MagneticButton
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-muted-foreground px-6 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <span>View Projects</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
