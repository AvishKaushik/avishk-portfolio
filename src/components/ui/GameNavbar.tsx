/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconFileCv,
  IconTerminal2,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const GameNavbar = () => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted((prev) => {
      const newMute = !prev;
      if (typeof window !== "undefined" && (window as any).gameAudio) {
        (window as any).gameAudio.setMute(newMute);
      }
      return newMute;
    });
  };

  useEffect(() => {
    // Sync React state with Phaser on mount
    if (typeof window !== "undefined" && (window as any).gameAudio) {
      setIsMuted((window as any).gameAudio.isMuted());
    }
  }, []);

  return (
    <motion.nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative">
        {/* Simple Retro Cable */}
        <div className="absolute w-3 h-12 bg-gray-600 -mt-12 left-1/2 transform -translate-x-1/2 shadow-lg">
          <div className="w-full h-full bg-gradient-to-b from-gray-500 to-gray-700 border border-gray-700" />
        </div>

        {/* Classic Controller Body - NES/SNES Style */}
        <motion.div
          className="relative w-72 h-28 bg-gray-400 rounded-lg border-4 border-gray-500"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#a1a1aa", // controller duller gray
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.2)",
          }}
        >
          {/* Classic Nintendo-style Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-2 flex flex-col items-center">
            <div className="text-[10px] font-bold text-gray-800 font-mono tracking-wider">
              AVISH&apos;S ARCADE
            </div>
            <div className="w-24 h-0.5 bg-gray-600 mt-0.5" />
          </div>

          {/* Center Mode Switch Buttons - Classic Style */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 flex space-x-2">
            {/* CV Button - bright */}
            <motion.button
              onClick={() => router.push("/professional")}
              className="w-8 h-8 bg-gray-200 text-gray-900 rounded-sm font-bold text-xs shadow-inner border-2 border-gray-400 hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Professional"
              style={{
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              <IconFileCv className="h-4 w-4 mx-auto" />
            </motion.button>

            {/* CLI Button - bright */}
            <motion.button
              onClick={() => router.push("/terminal")}
              className="w-8 h-8 bg-gray-200 text-gray-900 rounded-sm font-bold text-xs shadow-inner border-2 border-gray-400 hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Terminal"
              style={{
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              <IconTerminal2 className="h-4 w-4 mx-auto" />
            </motion.button>
          </div>

          {/* Classic Start/Select/Volume Buttons */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 bottom-3 opacity-70">
            <motion.button
              onClick={handleMuteToggle}
              className="w-6 h-3 bg-gray-600 rounded-sm shadow-inner border border-gray-700 flex items-center justify-center hover:bg-gray-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isMuted ? "Unmute" : "Mute"}
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {isMuted ? (
                <IconVolumeOff className="h-2 w-2 text-red-300" />
              ) : (
                <IconVolume className="h-2 w-2 text-green-300" />
              )}
            </motion.button>

            <div
              className="w-6 h-3 bg-gray-600 rounded-sm shadow-inner border border-gray-700"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-[6px] text-gray-300 text-center leading-3 font-mono">
                SEL
              </div>
            </div>

            <div
              className="w-6 h-3 bg-gray-600 rounded-sm shadow-inner border border-gray-700"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-[6px] text-gray-300 text-center leading-3 font-mono">
                STA
              </div>
            </div>

            <div className="w-2 h-2 rounded-full bg-red-600 mt-0.5 shadow-inner border border-red-700" />
          </div>

          {/* Left D-Pad - Classic NES Style */}
          <div
            className="absolute w-16 h-16 rounded-sm left-2 top-4 border-2 border-gray-500 bg-gray-400 opacity-70"
            style={{
              boxShadow:
                "inset 0 2px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-600 -translate-x-1/2 -translate-y-1/2 shadow-inner border border-gray-700">
              <div className="absolute w-3 h-3 bg-gray-600 -top-3 left-0 shadow-inner border border-gray-700" />
              <div className="absolute w-3 h-3 bg-gray-600 -bottom-3 left-0 shadow-inner border border-gray-700" />
              <div className="absolute w-3 h-3 bg-gray-600 top-0 -left-3 shadow-inner border border-gray-700" />
              <div className="absolute w-3 h-3 bg-gray-600 top-0 -right-3 shadow-inner border border-gray-700" />
            </div>
          </div>

          {/* Right Action Buttons - Classic SNES Colors */}
          <div
            className="absolute w-16 h-16 rounded-sm left-52 top-4 border-2 border-gray-500 bg-gray-400 flex items-center justify-center relative opacity-70"
            style={{
              boxShadow:
                "inset 0 2px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {/* X Button - Top (Purple) */}
            <motion.div
              className="absolute top-1 left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-5 h-5 rounded-full bg-purple-500 border-2 border-purple-700 flex items-center justify-center text-white text-[9px] font-bold shadow-lg"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                X
              </div>
            </motion.div>

            {/* A Button - Bottom (Red) */}
            <motion.div
              className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-5 h-5 rounded-full bg-red-600 border-2 border-red-800 flex items-center justify-center text-white text-[9px] font-bold shadow-lg"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                A
              </div>
            </motion.div>

            {/* Y Button - Left (Green) */}
            <motion.div
              className="absolute left-1 top-1/2 transform -translate-y-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-5 h-5 rounded-full bg-green-600 border-2 border-green-800 flex items-center justify-center text-white text-[9px] font-bold shadow-lg"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Y
              </div>
            </motion.div>

            {/* B Button - Right (Blue) */}
            <motion.div
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-5 h-5 rounded-full bg-blue-600 border-2 border-blue-800 flex items-center justify-center text-white text-[9px] font-bold shadow-lg"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                B
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default GameNavbar;
