"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";

const fileSystem = {
  "about.txt": `Hi! I'm Avish Kaushik — a passionate software engineer and builder of innovative solutions.

🎓 Currently pursuing MS in Computer Science at George Washington University
💼 Former Software Engineer at Societe Generale (3+ years)
🚀 Full-stack developer with expertise in modern web technologies
🤖 AI/ML enthusiast working on cutting-edge projects
🎮 Game developer and interactive experience creator

I love turning complex problems into elegant solutions and building products that make a difference.`,

  education: {
    "school.txt": `🏫 St. Theresa School
📅 Completed: 2018
📊 Grade: 84.8%
📍 Foundation in science and mathematics`,

    "college.txt": `🎓 VIT Bhopal University
📅 2018 - 2022
🎯 B.Tech in Computer Science Engineering
📊 CGPA: 9.06/10
🏆 Consistent academic excellence
💻 Strong foundation in algorithms, data structures, and software engineering`,

    "masters.txt": `🎓 George Washington University
📅 2024 - 2026 (Current)
🎯 MS in Computer Science
📊 GPA: 3.9/4.0
🔬 Specializing in Theory and Algorithms
🌟 Advanced coursework in AI, distributed systems, and software architecture`,
  },

  projects: {
    "eduhub.txt": `📚 EduHub - Collaborative Learning Platform
🔗 https://avishkaushik.github.io/EduHub/

🎯 A comprehensive learning management system for universities
⚡ Built with React, Firebase, and modern web technologies
📊 Features real-time quizzes, student analytics, and teacher dashboards
👥 Enables seamless collaboration between students and educators
🚀 Deployed and actively used by educational institutions`,

    "docuguard.txt": `🛡️ DocuGuard - AI-Powered Document Security
🔗 Private Enterprise Solution

🤖 Intelligent document red-teaming pipeline on AWS
⚡ Architecture: S3 → EventBridge → Step Functions → Lambda
🧠 Uses Claude AI for risk analysis and content filtering
📄 In-place PDF rewriting with PyMuPDF
🔒 Enterprise-grade security and compliance features`,

    "intelliview.txt": `🎤 IntelliView - AI Mock Interview Platform
🔗 https://intelliview-frontend.vercel.app/

🤖 AI-proctored mock interviews with real-time feedback
⚡ Built with Next.js, AWS Lambda, DynamoDB, and Bedrock
📊 Advanced skill analytics and performance tracking
🎯 Bias detection and fair assessment algorithms
💼 Helping candidates prepare for technical interviews`,
  },

  experience: {
    "societe.txt": `🏦 Societe Generale - Software Engineer
📅 July 2021 - July 2024 (3 years)
📍 Bangalore, India

🚀 Key Achievements:
• Led full-stack development of critical banking applications
• Migrated legacy systems to modern cloud architecture
• Built automation tools that reduced manual work by 60%
• Implemented CI/CD pipelines using Jenkins and Docker
• Mentored junior developers and conducted code reviews

💻 Tech Stack:
• Java, Spring Boot, React, Angular
• AWS, Docker, Kubernetes
• PostgreSQL, MongoDB
• Jenkins, Git, Jira`,

    "personal.txt": `🚀 Personal Projects & Freelance Work
📅 2020 - Present

🤖 GenAI Pipeline Development:
• Built custom AI workflows using OpenAI and Claude APIs
• Developed intelligent document processing systems
• Created chatbots and virtual assistants

🎮 Game Development:
• Interactive portfolio game using Phaser.js
• 2D platformer with custom physics and animations
• Responsive design for multiple screen sizes

🌐 Web Development:
• Modern React/Next.js applications
• Full-stack solutions with Node.js and Python
• Cloud deployment on AWS and Vercel`,
  },

  skills: {
    "languages.txt": `💻 Programming Languages:
• Java ⭐⭐⭐⭐⭐
• JavaScript/TypeScript ⭐⭐⭐⭐⭐
• Python ⭐⭐⭐⭐
• C++ ⭐⭐⭐⭐
• R ⭐⭐⭐
• Dart ⭐⭐⭐`,

    "frameworks.txt": `🛠️ Frameworks & Libraries:
• React/Next.js ⭐⭐⭐⭐⭐
• Spring Boot ⭐⭐⭐⭐⭐
• Angular ⭐⭐⭐⭐
• Express.js ⭐⭐⭐⭐
• Tailwind CSS ⭐⭐⭐⭐⭐
• Node.js ⭐⭐⭐⭐`,

    "cloud.txt": `☁️ Cloud & DevOps:
• AWS (Lambda, S3, DynamoDB, Bedrock) ⭐⭐⭐⭐
• Azure ⭐⭐⭐
• Docker ⭐⭐⭐⭐
• Kubernetes ⭐⭐⭐
• Jenkins ⭐⭐⭐⭐
• Terraform ⭐⭐⭐`,

    "databases.txt": `🗄️ Databases:
• PostgreSQL ⭐⭐⭐⭐
• MongoDB ⭐⭐⭐⭐
• DynamoDB ⭐⭐⭐⭐
• DocumentumDB ⭐⭐⭐`,
  },

  "contact.txt": `📧 Get in Touch!

📧 Email: avish.kaushik@gwu.edu
🔗 LinkedIn: https://linkedin.com/in/AvishKaushik
🐙 GitHub: https://github.com/AvishKaushik
💼 Portfolio: https://avishkaushik.dev

🌟 Open to:
• Full-time opportunities (Summer 2026)
• Internships and co-op programs
• Freelance projects
• Collaboration on open-source projects
• Technical discussions and mentoring

💬 Feel free to reach out for any opportunities or just to connect!`,
};

const resolvePath = (path: string[]) => {
  const segments: string[] = [];
  for (const p of path) {
    if (p === "..") segments.pop();
    else if (p !== ".") segments.push(p);
  }
  return segments;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFSNode = (fs: any, path: string[]) => {
  let node = fs;
  for (const seg of path) {
    if (typeof node !== "object" || !(seg in node)) return null;
    node = node[seg];
  }
  return node;
};

export default function TerminalPage() {
  const [showTerminal, setShowTerminal] = useState(false); // splash toggle
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistIndex] = useState(-1);
  const [path, setPath] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldContinueTyping = useRef(true);

  const [splashLines, setSplashLines] = useState<string[]>([]);
  const splashSequence = [
    "Trying to connect to avish@portfolio...",
    "Requesting session...",
    "Authenticating...",
    "Connection established ✔",
    "Loading CLI interface...",
    "Boot sequence initialized.",
    "Preparing environment...",
    "[▯▯▯▯▯▯▯▯▯▯]",
  ];

  const prompt = `avish@portfolio:~${path.length ? "/" + path.join("/") : ""}$`;

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setSplashLines((prev) => [...prev, splashSequence[idx]]);
      idx++;
      if (idx === splashSequence.length) {
        clearInterval(interval);

        // After loading bar finishes, simulate bar filling
        let fill = 0;
        const loadingInterval = setInterval(() => {
          fill++;
          const bar = `[${"▮".repeat(fill)}${"▯".repeat(10 - fill)}]`;
          setSplashLines((prev) => [...prev.slice(0, -1), bar]);

          if (fill >= 10) {
            clearInterval(loadingInterval);
            // Show terminal after delay
            setTimeout(() => {
              setShowTerminal(true);
            }, 500);
          }
        }, 150);
      }
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, [splashSequence]);

  // Splash screen transition
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTerminal(true);
      const banner = [
        "[32m╔═══════════════════════════════════════════════════════════════╗[0m",
        "[32m║[0m                      [32m    ___        _      __  [0m                      [32m║[0m",
        "[32m║[0m                      [32m   /   |_   __(_)____/ /_ [0m                      [32m║[0m",
        "[32m║[0m                      [32m  / /| | | / / / ___/ __ \\[0m                      [32m║[0m",
        "[32m║[0m                      [32m / ___ | |/ / (__  ) / / /[0m                      [32m║[0m",
        "[32m║[0m                      [32m/_/  |_|___/_/____/_/ /_/ [0m                      [32m║[0m",
        "[32m║[0m                                                                      [32m║[0m",
        "[32m║[0m            [37mWelcome to Avish Kaushik&apos;s Interactive CLI![0m               [32m║[0m",
        "[32m║[0m                     [90mVersion 6.4.2000 - Enhanced[0m                      [32m║[0m",
        "[32m╚═══════════════════════════════════════════════════════════════╝[0m",
        "",
        "[32m🚀 QUICK START COMMANDS:[0m",
        "  [32mabout[0m      - Learn about me",
        "  [32mprojects[0m   - View my projects",
        "  [32mcon tact[0m    - Get in touch",
        "",
        "[90m💡 Type '[32mhelp[90m' for all available commands.[0m",
        "[90m💡 Use '[32mTab[90m' for autocompletion and '[32mArrow Keys[90m' for history.[0m",
        "",
      ];
      // Process banner with colors
      const processedBanner = banner.map((line) => processAnsiColors(line));
      setLines(processedBanner);
      inputRef.current?.focus();
    }, 3500); // 3.5 seconds boot screen

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);
  useEffect(() => {
    if (showTerminal) {
      inputRef.current?.focus();
    }
  }, [showTerminal]);

  const print = (text: string) =>
    setLines((prev) => [...prev, processAnsiColors(text)]);

  const processAnsiColors = (text: string) => {
    return text
      .replace(/\[32m/g, '<span style="color: #4ecdc4;">') // Cyan - Primary
      .replace(/\[33m/g, '<span style="color: #4ecdc4;">') // Cyan - Same as primary
      .replace(/\[31m/g, '<span style="color: #ff6b6b;">') // Red - Errors only
      .replace(/\[37m/g, '<span style="color: #e9ecef;">') // White - Text
      .replace(/\[90m/g, '<span style="color: #6c757d;">') // Gray - Muted
      .replace(/\[92m/g, '<span style="color: #4ecdc4;">') // Cyan
      .replace(/\[93m/g, '<span style="color: #4ecdc4;">') // Cyan
      .replace(/\[94m/g, '<span style="color: #4ecdc4;">') // Cyan
      .replace(/\[95m/g, '<span style="color: #6c757d;">') // Gray
      .replace(/\[96m/g, '<span style="color: #4ecdc4;">') // Cyan
      .replace(/\[97m/g, '<span style="color: #e9ecef;">') // White
      .replace(/\[91m/g, '<span style="color: #ff6b6b;">') // Red
      .replace(/\[0m/g, "</span>"); // Reset
  };

  const typeText = (text: string, speed: number = 1) => {
    setIsTyping(true);
    shouldContinueTyping.current = true;
    const lines = text.split("\n");
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentText = "";

    const typeNextChar = () => {
      // Check if typing was cancelled
      if (!shouldContinueTyping.current) {
        setIsTyping(false);
        return;
      }

      if (currentLineIndex >= lines.length) {
        setIsTyping(false);
        // Ensure input gets focus back after typing
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
        return;
      }

      const currentLine = lines[currentLineIndex];

      if (currentCharIndex >= currentLine.length) {
        // Finished current line, move to next
        setLines((prev) => [...prev, processAnsiColors(currentText)]);
        currentLineIndex++;
        currentCharIndex = 0;
        currentText = "";

        if (currentLineIndex < lines.length && shouldContinueTyping.current) {
          typingTimeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          // Ensure input gets focus back after typing
          setTimeout(() => {
            inputRef.current?.focus();
          }, 50);
        }
        return;
      }

      // Add next character
      currentText += currentLine[currentCharIndex];
      currentCharIndex++;

      // Update the last line with current progress
      setLines((prev) => {
        const newLines = [...prev];
        if (newLines.length > 0 && currentText.length > 0) {
          newLines[newLines.length - 1] = processAnsiColors(currentText);
        } else if (currentText.length > 0) {
          newLines.push(processAnsiColors(currentText));
        }
        return newLines;
      });

      if (shouldContinueTyping.current) {
        typingTimeoutRef.current = setTimeout(typeNextChar, speed);
      }
    };

    // Start with empty line for typing
    setLines((prev) => [...prev, ""]);
    typeNextChar();
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(" ");
    const joined = args.join(" ").trim();

    // Prevent new commands while typing
    if (isTyping) {
      print("Please wait for the current output to finish...");
      return;
    }

    switch (command.toLowerCase()) {
      case "help":
        typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                    [32mAVISH KAUSHIK CLI v2.0[0m                    [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[32m📁 NAVIGATION COMMANDS:[0m
  ls                    - List files and directories
  cd <directory>        - Change directory
  cat <file>           - Display file contents
  pwd                  - Show current directory

[32m🚀 DIRECT ACCESS COMMANDS:[0m
  [32mabout[0m                - About me
  [32meducation[0m            - Educational background
  [32mprojects[0m             - My projects
  [32mexperience[0m           - Work experience
  [32mskills[0m               - Technical skills
  [32mcontact[0m              - Contact information

[32m🛠️ UTILITY COMMANDS:[0m
  clear                - Clear terminal
  open <url>           - Open URL in new tab
  whoami               - Display current user
  
[90m💡 PRO TIPS:[0m
  • Use [32mTab[0m for autocompletion
  • Use [32mArrow Keys[0m for command history
  • Press [32mESC[0m to cancel typing
  • Commands are case-insensitive`);
        break;

      // Direct commands
      case "about":
        typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                        [33mABOUT ME[0m                           [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[37m${fileSystem["about.txt"]}[0m`);
        break;

      case "education":
        if (joined) {
          const eduFile = getFSNode(fileSystem, ["education", joined + ".txt"]);
          if (typeof eduFile === "string") {
            typeText(eduFile);
          } else {
            print(`[31m❌ Education info not found: ${joined}[0m`);
            print(
              "[90mAvailable options: [32mschool[90m, [32mcollege[90m, [32mmasters[0m"
            );
          }
        } else {
          typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                    [32mEDUCATION MENU[0m                        [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[32mAvailable education details:[0m
  [32m• school[0m    - High school education
  [32m• college[0m   - Undergraduate degree  
  [32m• masters[0m   - Graduate studies

[90mUsage:[0m [32meducation[0m [32m<level>[0m
[90mExample:[0m [32meducation college[0m`);
        }
        break;

      case "projects":
        if (joined) {
          const projectFile = getFSNode(fileSystem, [
            "projects",
            joined + ".txt",
          ]);
          if (typeof projectFile === "string") {
            typeText(projectFile);
          } else {
            print(`[31m❌ Project not found: ${joined}[0m`);
            print(
              "[90mAvailable projects: [32meduhub[90m, [32mdocuguard[90m, [32mintelliview[0m"
            );
          }
        } else {
          typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                     [32mPROJECT PORTFOLIO[0m                     [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[32mAvailable projects:[0m
  [32m• eduhub[0m      - Collaborative learning platform
  [32m• docuguard[0m   - AI-powered document security
  [32m• intelliview[0m - Mock interview platform

[90mUsage:[0m [32mprojects[0m [32m<name>[0m
[90mExample:[0m [32mprojects eduhub[0m`);
        }
        break;

      case "experience":
        if (joined) {
          const expFile = getFSNode(fileSystem, [
            "experience",
            joined + ".txt",
          ]);
          if (typeof expFile === "string") {
            typeText(expFile);
          } else {
            print(`[31m❌ Experience info not found: ${joined}[0m`);
            print("[90mAvailable options: [32msociete[90m, [32mpersonal[0m");
          }
        } else {
          typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                   [32mWORK EXPERIENCE[0m                        [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[32mAvailable experience details:[0m
  [32m• societe[0m   - Societe Generale (Corporate)
  [32m• personal[0m  - Personal projects & freelance

[90mUsage:[0m [32mexperience[0m [32m<type>[0m
[90mExample:[0m [32mexperience societe[0m`);
        }
        break;

      case "skills":
        if (joined) {
          const skillFile = getFSNode(fileSystem, ["skills", joined + ".txt"]);
          if (typeof skillFile === "string") {
            typeText(skillFile);
          } else {
            print(`[31m❌ Skill category not found: ${joined}[0m`);
            print(
              "[90mAvailable categories: [32mlanguages[90m, [32mframeworks[90m, [32mcloud[90m, [32mdatabases[0m"
            );
          }
        } else {
          typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                   [32mTECHNICAL SKILLS[0m                       [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[32mAvailable skill categories:[0m
  [32m• languages[0m   - Programming languages
  [32m• frameworks[0m  - Frameworks & libraries
  [32m• cloud[0m       - Cloud & DevOps tools
  [32m• databases[0m   - Database technologies

[90mUsage:[0m [32mskills[0m [32m<category>[0m
[90mExample:[0m [32mskills languages[0m`);
        }
        break;

      case "contact":
        typeText(`[32m╔══════════════════════════════════════════════════════════════╗[0m
[32m║[0m                    [32mCONTACT INFO[0m                          [32m║[0m
[32m╚══════════════════════════════════════════════════════════════╝[0m

[37m${fileSystem["contact.txt"]}[0m`);
        break;

      case "whoami":
        typeText(
          "[32mavish[0m - [37mSoftware Engineer & Full-Stack Developer[0m"
        );
        break;

      case "pwd":
        print(`[32m/home/avish${path.length ? "/" + path.join("/") : ""}[0m`);
        break;

      // Traditional Unix commands
      case "cd": {
        const newPath = resolvePath(path.concat(joined.split("/")));
        const node = getFSNode(fileSystem, newPath);
        if (node && typeof node === "object") setPath(newPath);
        else print(`[31m❌ cd: no such directory: ${joined}[0m`);
        break;
      }
      case "ls": {
        const node = getFSNode(fileSystem, path);
        if (node && typeof node === "object") {
          const items = Object.keys(node);
          const formatted = items
            .map((item) => {
              const itemNode = getFSNode(fileSystem, path.concat([item]));
              return typeof itemNode === "object"
                ? `[32m📁 ${item}[0m`
                : `[37m📄 ${item}[0m`;
            })
            .join("  ");
          typeText(formatted, 1);
        } else {
          print("[31mls: not a directory[0m");
        }
        break;
      }
      case "cat": {
        const file = getFSNode(fileSystem, path.concat(joined));
        if (typeof file === "string") {
          typeText(`[37m${file}[0m`);
        } else {
          print(`[31mcat: cannot read file: ${joined}[0m`);
        }
        break;
      }
      case "open": {
        if (joined.startsWith("http")) {
          window.open(joined, "_blank");
          typeText(`[32m✓ Opening ${joined} in new tab...[0m`, 1);
        } else {
          print("[31mopen: invalid URL (must start with http)[0m");
        }
        break;
      }
      case "clear":
        setLines([]);
        return;
      default:
        print(`[31m❌ Command not found: ${command}[0m`);
        print("[90m💡 Type 'help' to see available commands.[0m");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent input while typing
    if (isTyping && e.key !== "Escape") {
      e.preventDefault();
      return;
    }

    if (e.key === "Escape" && isTyping) {
      // Cancel typing
      shouldContinueTyping.current = false;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      setIsTyping(false);
      // Add a cancellation message
      setLines((prev) => [
        ...prev,
        processAnsiColors("[90m[Cancelled by user][0m"),
      ]);
      // Restore focus to input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed) {
        // Add user command with cyan color and background to distinguish from results
        setLines((prev) => [
          ...prev,
          `<div class="command-line">${processAnsiColors(`${prompt} [32m${trimmed}[0m`)}</div>`,
        ]);
        handleCommand(trimmed);
        setHistory((prev) => [...prev, trimmed]);
      }
      setHistIndex(-1);
      setInput("");
      // Ensure input stays focused after command
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIndex((i) => {
        const next = Math.min(i + 1, history.length - 1);
        setInput(history[history.length - 1 - next] || "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIndex((i) => {
        const next = Math.max(i - 1, -1);
        setInput(history[history.length - 1 - next] || "");
        return next;
      });
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [command, ...args] = input.trim().split(" ");
      const currentArg = args.join(" ");

      const availableCommands = [
        "about",
        "education",
        "projects",
        "experience",
        "skills",
        "contact",
        "cd",
        "ls",
        "cat",
        "open",
        "clear",
        "help",
        "whoami",
        "pwd",
      ];

      // Autocomplete the command itself
      if (!args.length && command) {
        const matches = availableCommands.filter((cmd) =>
          cmd.startsWith(command)
        );
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        }
        return;
      }

      // Autocomplete paths inside current dir
      const currentDir = getFSNode(fileSystem, path);
      if (!currentDir || typeof currentDir !== "object") return;

      const segments = currentArg.split("/");
      const last = segments.pop()!;
      const basePath = segments;
      const targetDir = getFSNode(fileSystem, path.concat(basePath));
      if (!targetDir || typeof targetDir !== "object") return;

      const entries = Object.keys(targetDir);
      const matches = entries.filter((name) => name.startsWith(last));

      if (matches.length === 1) {
        const completed = [...basePath, matches[0]].join("/");
        setInput(`${command} ${completed}`);
      }
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <nav className="terminal-navbar">
        <div className="nav-left">AK&apos;s CLI</div>
        <div className="nav-center">
          <button onClick={() => (window.location.href = "/professional")}>
            Professional
          </button>
          <button onClick={() => (window.location.href = "/arcade")}>
            Arcade
          </button>
        </div>
      </nav>

      <div
        className="cli-screen"
        onClick={() => {
          if (document.activeElement !== inputRef.current) {
            inputRef.current?.focus();
          }
        }}
      >
        {!showTerminal ? (
          <div className="splash-screen">
            {splashLines.map((line, idx) => (
              <pre key={idx} className="terminal-line">
                {line}
              </pre>
            ))}
          </div>
        ) : (
          <div className="terminal" ref={terminalRef}>
            {lines.map((line, idx) => (
              <div
                key={idx}
                className="terminal-line"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
            <div className="terminal-line input-line">
              <span>{prompt} </span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoFocus
                ref={inputRef}
                disabled={isTyping}
                placeholder={isTyping ? "Typing... (Press ESC to cancel)" : ""}
              />
              {isTyping ? (
                <span className="typing-cursor">▋</span>
              ) : (
                <span className="cursor">▋</span>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .splash-screen {
          width: 100%;
          height: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 1.1rem;
          line-height: 1.6rem;
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .terminal-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 48px;
          background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);
          color: #4ecdc4;
          font-family: "Share Tech Mono", monospace;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(78, 205, 196, 0.2);
          border-bottom: 1px solid #4ecdc4;
        }

        .nav-left {
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .nav-center button {
          margin: 0 0.5rem;
          background: transparent;
          border: 1px solid #4ecdc4;
          padding: 6px 12px;
          color: #4ecdc4;
          font-family: inherit;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 4px;
        }

        .nav-center button:hover {
          background: #4ecdc4;
          color: #1a1a2e;
          box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
        }

        .cli-screen {
          position: absolute;
          top: 48px;
          left: 0;
          width: 100vw;
          height: calc(100vh - 48px);
          background: linear-gradient(
            135deg,
            #0f0f23 0%,
            #1a1a2e 50%,
            #16213e 100%
          );
          color: #e9ecef;
          font-family: "Share Tech Mono", monospace;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          overflow: hidden;
        }

        .terminal {
          width: 100%;
          height: 100%;
          padding: 2rem;
          overflow-y: auto;
          overflow-x: hidden;
          background: rgba(15, 15, 35, 0.95);
          backdrop-filter: blur(10px);
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
          z-index: 2;
          border-radius: 12px;
          margin: 10px;
          border: 1px solid rgba(78, 205, 196, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .terminal::-webkit-scrollbar {
          display: none;
        }

        .terminal-line {
          margin-bottom: 8px;
          font-size: 1.1rem;
          line-height: 1.6rem;
          white-space: pre-wrap;
          color: #e9ecef;
        }

        .input-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          background: rgba(78, 205, 196, 0.15);
          padding: 8px 12px;
          border-radius: 6px;
          border-left: 3px solid #4ecdc4;
          margin-top: 12px;
          box-shadow: 0 2px 8px rgba(78, 205, 196, 0.2);
          border: 1px solid rgba(78, 205, 196, 0.3);
        }

        .command-line {
          background: rgba(78, 205, 196, 0.08);
          padding: 4px 8px;
          border-radius: 4px;
          border-left: 2px solid rgba(78, 205, 196, 0.5);
          margin: 2px 0;
        }

        .terminal-input {
          display: inline;
          background: transparent;
          border: none;
          outline: none;
          color: #e9ecef;
          font-family: inherit;
          font-size: 1.1rem;
          line-height: 1.6rem;
          width: auto;
          flex: 1;
          min-width: 10ch;
          caret-color: transparent; /* Hide default caret since we show custom cursor */
        }

        .terminal-input:disabled {
          opacity: 0.6;
        }

        .terminal-input::placeholder {
          color: #6c757d;
          opacity: 0.7;
        }

        .typing-cursor,
        .cursor {
          animation: blink 0.8s infinite;
          color: #4ecdc4;
          margin-left: 2px;
          font-weight: bold;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        /* Matrix-like effect for special content */
        .matrix-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(57, 255, 20, 0.1),
            transparent
          );
          animation: matrix-sweep 3s infinite;
        }

        @keyframes matrix-sweep {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }

        /* Glitch effect for errors */
        .glitch {
          animation: glitch 0.3s;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </>
  );
}
