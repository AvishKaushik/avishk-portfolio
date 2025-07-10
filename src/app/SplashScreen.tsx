"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioning(true); // Start animation
      setTimeout(() => router.push("/professional"), 1000); // Route after animation
    }, 2000); // Wait 5s before animating

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={`splash-container ${transitioning ? "transitioning" : ""}`}>
      <div className={`splash-section gaming ${transitioning ? "hide" : ""}`}>
        <h1 className="ascii-text">🎮 Avish Kaushik</h1>
        {/* <p className="ascii-sub">Arcade Mode - Explore my skills through an interactive game.</p> */}
      </div>

      <div
        className={`splash-section professional ${
          transitioning ? "expand" : ""
        }`}
      >
        <h1 className="pro-text">Avish Kaushik</h1>
        {/* <p className="pro-sub">For recruiters and hiring managers — clean & impactful.</p> */}
      </div>

      <div className={`splash-section cli ${transitioning ? "hide" : ""}`}>
        {/* <pre className="cli-text"></pre> */}
        <pre className="cli-sub">Avish Kaushik_</pre>
      </div>

      <style jsx>{`
        .splash-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hide {
          opacity: 0;
          height: 0;
          transition: all 0.6s ease-in-out;
          overflow: hidden;
        }

        /* Expand the middle/professional section to full screen */
        .expand {
          flex: none !important;
          height: 100vh;
          transition: all 0.6s ease-in-out;
          z-index: 10;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
        }

        .splash-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.5s;
          text-align: center;
        }

        /* Top: Gaming */
        .gaming {
          background: repeating-linear-gradient(
            45deg,
            #0f0c29,
            #302b63,
            #24243e
          );
          color: #ffeb3b;
          font-family: "Press Start 2P", monospace;
        }

        .ascii-text {
          font-size: 1.1rem;
          text-shadow: 0 0 5px #f9f871;
        }

        .ascii-sub {
          font-size: 0.8rem;
          margin-top: 10px;
        }

        /* Middle: Professional */
        .professional {
          background: linear-gradient(135deg, #f0f0f0, #ffffff);
          color: #111;
          font-family: "Inter", sans-serif;
        }

        .pro-text {
          font-size: 2rem;
          font-weight: 600;
        }

        .pro-sub {
          font-size: 1rem;
          opacity: 0.8;
          margin-top: 8px;
        }

        /* Bottom: CLI */
        .cli {
          background: radial-gradient(circle, #000000, #111111);
          color: #39ff14;
          font-family: "Share Tech Mono", monospace;
        }

        .cli-text {
          font-size: 1rem;
          margin-bottom: 8px;
        }

        .cli-sub {
          font-size: 1.2rem;
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        @media screen and (max-width: 768px) {
          .ascii-text,
          .pro-text,
          .cli-text {
            font-size: 1rem;
          }
          .ascii-sub,
          .pro-sub,
          .cli-sub {
            font-size: 0.75rem;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Press+Start+2P&family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
