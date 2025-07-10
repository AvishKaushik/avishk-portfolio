"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";

const fileSystem = {
  "about.txt":
    "Hi! I'm Avish Kaushik — software engineer and builder of cool things.",
  education: {
    "school.txt": "St. Theresa School — 12th Grade — 84.8%",
    "college.txt": "VIT Bhopal — B.Tech CSE — 9.06 CGPA",
    "masters.txt": "George Washington University — MS CS — GPA 3.9",
  },
  projects: {
    "eduhub.txt": "EduHub: Learning platform for universities.",
    "docuguard.txt":
      "DocuGuard: AI-secure doc pipeline using Claude + S3 + Lambda.",
    "intelliview.txt":
      "Intelliview: Mock interview platform with skill analytics.",
  },
  experience: {
    "societe.txt":
      "Societe Generale — Software Engineer — Jul 2021 to Jul 2024",
    "personal.txt": "Built GenAI pipelines, Phaser game, and more",
  },
  "contact.txt":
    "Email: avish@example.com | GitHub: /avishkaushik | LinkedIn: /in/avishkaushik",
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
  const [histIndex, setHistIndex] = useState(-1);
  const [path, setPath] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  console.log(histIndex);

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
  }, []);

  // Splash screen transition
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTerminal(true);
      const banner = [
        "          _____                __    ",
        "    ____ / ___/___  __  ______/ /___ ",
        "   / __ \\\\__ \\/ _ \\/ / / / __  / __ \\",
        "  / /_/ /__/ /  __/ /_/ / /_/ / /_/ /",
        " / .___/____/\\___/\\__,_/\\__,_/\\____/ ",
        "/_/                                  ",
        "",
        "Welcome to Avish Kaushik's CLI!",
        "Type 'help' to explore available commands.",
        "",
      ];
      setLines(banner);
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

  const print = (text: string) => setLines((prev) => [...prev, text]);

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(" ");
    const joined = args.join(" ").trim();

    switch (command) {
      case "help":
        print("Available commands: cd, ls, cat, open, clear, help");
        break;
      case "cd": {
        const newPath = resolvePath(path.concat(joined.split("/")));
        const node = getFSNode(fileSystem, newPath);
        if (node && typeof node === "object") setPath(newPath);
        else print(`cd: no such directory: ${joined}`);
        break;
      }
      case "ls": {
        const node = getFSNode(fileSystem, path);
        if (node && typeof node === "object")
          print(Object.keys(node).join("  "));
        else print("ls: not a directory");
        break;
      }
      case "cat": {
        const file = getFSNode(fileSystem, path.concat(joined));
        if (typeof file === "string") print(file);
        else print(`cat: cannot read file: ${joined}`);
        break;
      }
      case "open": {
        if (joined.startsWith("http")) {
          window.open(joined, "_blank");
        } else print("open: invalid URL");
        break;
      }
      case "clear":
        setLines([]);
        return;
      default:
        print(`Unknown command: ${command}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed) {
        setLines((prev) => [...prev, `${prompt} ${trimmed}`]);
        handleCommand(trimmed);
        setHistory((prev) => [...prev, trimmed]);
      }
      setHistIndex(-1);
      setInput("");
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

      const availableCommands = ["cd", "ls", "cat", "open", "clear", "help"];

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
              <div key={idx} className="terminal-line">
                {line}
              </div>
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
              />
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
          background: #000;
          color: #39ff14;
          font-family: "Share Tech Mono", monospace;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          z-index: 1000;
          box-shadow: 0 2px 5px rgba(0, 255, 0, 0.3);
          border-bottom: 1px solid #39ff14;
        }

        .nav-left {
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .nav-center button {
          margin: 0 0.5rem;
          background: transparent;
          border: 1px solid #39ff14;
          padding: 6px 12px;
          color: #39ff14;
          font-family: inherit;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .nav-center button:hover {
          background: #39ff14;
          color: #000;
        }

        .cli-screen {
          position: absolute;
          top: 48px;
          left: 0;
          width: 100vw;
          height: calc(100vh - 48px);
          background: #000;
          color: #39ff14;
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
          background-color: rgba(0, 0, 0, 0.85);
          box-shadow: inset 0 0 8px #0f0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .terminal::-webkit-scrollbar {
          display: none;
        }

        .terminal-line {
          margin-bottom: 8px;
          font-size: 1.1rem;
          line-height: 1.6rem;
          white-space: pre-wrap;
          text-shadow: 0 0 2px #39ff14;
        }

        .input-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .terminal-input {
          display: inline;
          background: transparent;
          border: none;
          outline: none;
          color: #39ff14;
          font-family: inherit;
          font-size: 1.1rem;
          line-height: 1.6rem;
          width: auto;
          flex: 1;
          min-width: 10ch;
          caret-color: #39ff14;
        }
      `}</style>
    </>
  );
}
