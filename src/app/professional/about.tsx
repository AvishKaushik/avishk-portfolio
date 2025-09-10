"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { TextAnimate } from "@/components/magicui/text-animate";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

import { FaGithub, FaLinkedin, FaDiscord, FaHackerrank } from "react-icons/fa";
import {
  SiLeetcode,
  SiCodechef,
  SiDocker,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiSpring,
  SiTailwindcss,
  SiMongodb,
  SiJenkins,
  SiKubernetes,
  SiCplusplus
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const orbitIcons = [
  <FaJava key="java" />,
  <SiCplusplus key="cplusplus" />,
  <SiPython key="python" />,
  <SiJavascript key="javascript" />,
  <SiTypescript key="typescript" />,
  <SiReact key="react" />,
  <SiNextdotjs key="nextdotjs" />,
  <SiSpring key="spring" />,
  <SiTailwindcss key="tailwindcss" />,
  <SiDocker key="docker" />,
  <FaAws key="aws" />,
  <SiMongodb key="mongodb" />,
  <SiJenkins key="jenkins" />,
  <SiKubernetes key="kubernetes" />,
];

const techStack = {
  Languages: ["Java", "C++", "Python", "JavaScript", "TypeScript", "R", "Dart"],
  Frameworks: [
    "React",
    "Next.js",
    "Angular",
    "Spring Boot",
    "Express",
    "Tailwind",
    "Node.js",
  ],
  Cloud: [
    "AWS Lambda",
    "AWS S3",
    "AWS IAM",
    "AWS Bedrock",
    "API Gateway",
    "Cognito",
    "DynamoDB",
    "Step Functions",
    "Azure",
  ],
  Tools: [
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Git",
    "Terraform",
    "XLDeploy",
    "RabbitMQ",
  ],
  Databases: ["MongoDB", "PostgreSQL", "DocumentumDB"],
  Others: [
    "GraphQL",
    "REST API",
    "SOAP API",
    "Jira",
    "VS Code",
    "IntelliJ",
    "PyCharm",
    "Google Colab",
  ],
};

const socials = [
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://linkedin.com/in/AvishKaushik",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    url: "https://github.com/AvishKaushik",
  },
  {
    name: "LeetCode",
    icon: <SiLeetcode />,
    url: "https://leetcode.com/avish00",
  },
  {
    name: "HackerRank",
    icon: <FaHackerrank />,
    url: "https://hackerrank.com/avish_kaushik20",
  },
  {
    name: "CodeChef",
    icon: <SiCodechef />,
    url: "https://codechef.com/users/avish00",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    url: "https://discordapp.com/users/avi._.k",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-bio", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".orbit-wrapper", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".tech-list", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex flex-col px-6 md:px-12 py-24 bg-background overflow-visible"
    >
      <div className="text-center about-heading">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          <TextAnimate animation="blurInUp" by="character">
            About&nbsp;Me
          </TextAnimate>
        </h2>
        <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground about-bio">
          I’m Avish Kaushik — a curious and creative full-stack developer who
          builds robust applications, scales cloud pipelines, and loves
          exploring the intersection of data, AI, and design. With experience
          from Societe Generale to GWU, I bring vision to execution.
        </p>
      </div>

      <div className="about-bio space-y-4 mt-20 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
        <div className="orbit-wrapper about-circles relative flex items-center justify-center overflow-visible md:w-full h-[550px] justify-self-center">
          <OrbitingCircles radius={180} className="h-[400px] w-[400px]">
            {orbitIcons.map((icon, i) => (
              <div
                key={i}
                className="text-2xl md:text-3xl text-primary bg-muted/30 rounded-full p-2 shadow-lg"
              >
                {icon}
              </div>
            ))}
          </OrbitingCircles>
        </div>

        <div className="tech-list grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(techStack).map(([category, items]) => (
            <div
              key={category}
              className="bg-muted/10 rounded-xl p-4 shadow-inner"
            >
              <h4 className="font-semibold text-base text-primary mb-3 border-b pb-1">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {items.map((item) => (
                  <span
                    key={item}
                    className="bg-muted px-3 py-1 rounded-full shadow-sm border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-5">
        {socials.map(({ name, icon, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="group relative p-3 rounded-full border border-border bg-background shadow-md hover:shadow-xl transition hover:-translate-y-1 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label={`Visit my ${name} profile`}
          >
            <span className="text-xl group-hover:scale-110 transition-transform" aria-hidden="true">
              {icon}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
