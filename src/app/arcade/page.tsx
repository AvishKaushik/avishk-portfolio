/* app/mario/page.tsx – interactive Q&A via NPCs with zone-based dialogue box + landing screen */
"use client";

import { useEffect, useRef, useState } from "react";
import { MobileControls } from "./components/MobileControls";
import { GameConfig } from "./config/GameConfig";
import GameNavbar from "@/components/ui/GameNavbar";
import { motion } from "framer-motion";

export default function ArcadeGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null);
  const mobileControls = useRef<MobileControls | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Initialize mobile controls
  useEffect(() => {
    mobileControls.current = MobileControls.getInstance();
    mobileControls.current.create();

    // Show mobile controls on mobile devices
    const checkMobile = () => {
      if (window.innerWidth <= GameConfig.BREAKPOINTS.MOBILE) {
        mobileControls.current?.show();
      } else {
        mobileControls.current?.hide();
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mobileControls.current?.destroy();
    };
  }, []);

  // Initialize Phaser game with optimized loading
  useEffect(() => {
    if (phaserGame.current) {
      phaserGame.current.destroy(true);
      phaserGame.current = null;
    }
    if (!gameRef.current) return;

    let loadingInterval: NodeJS.Timeout;

    const initGame = async () => {
      try {
        setIsLoading(true);
        setLoadingProgress(10);

        // Simulate loading progress
        loadingInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 90) return prev;
            return prev + 10;
          });
        }, 100);

        // Lazy load Phaser and scenes
        const [
          Phaser,
          LandingSceneModule,
          StageSceneModule,
          PreloadSceneModule,
        ] = await Promise.all([
          import("phaser"),
          import("./scenes/LandingScene"),
          import("./scenes/StageScene"),
          import("./scenes/PreloadScene"),
        ]);

        setLoadingProgress(50);

        // Get responsive dimensions with DPI consideration
        // const dpr = window.devicePixelRatio || 1;
        const gameWidth = Math.min(window.innerWidth, 3840);
        const gameHeight = Math.min(window.innerHeight, 2160);

        phaserGame.current = new Phaser.default.Game({
          type: Phaser.default.AUTO,
          parent: gameRef.current!,
          width: gameWidth,
          height: gameHeight,
          backgroundColor: GameConfig.COLORS.PRIMARY,
          physics: {
            default: "arcade",
            arcade: {
              gravity: { x: 0, y: GameConfig.GRAVITY },
            },
          },
          scene: [
            LandingSceneModule.LandingScene,
            PreloadSceneModule.PreloadScene,
            StageSceneModule.StageScene,
          ],
          scale: {
            mode: Phaser.default.Scale.FIT,
            autoCenter: Phaser.default.Scale.CENTER_BOTH,
            width: gameWidth,
            height: gameHeight,
          },
          render: {
            pixelArt: false,
            antialias: true,
            roundPixels: true,
          },
          audio: {
            disableWebAudio: false, // Disable audio for faster loading
          },
        });

        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 200);
      } catch (error) {
        console.error("Failed to load game:", error);
        setIsLoading(false);
      }
    };

    initGame();

    const gameRefCurrent = gameRef.current; // capture ref

    return () => {
      if (loadingInterval) clearInterval(loadingInterval);
      if (phaserGame.current) {
        phaserGame.current.destroy(true);
        phaserGame.current = null;
      }
      gameRefCurrent?.querySelector("canvas")?.remove(); // use captured ref
    };
  }, []);

  return (
    <div className="arcade-game-container arcade-page">
      <GameNavbar />

      {/* Simple Instructions Overlay */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="fixed bottom-4 left-4 z-40 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-xs font-mono max-w-xs"
        >
          <div className="space-y-1">
            <div className="text-green-400 font-bold mb-2">🎮 CONTROLS</div>
            <div>🔄 Arrow Keys / WASD - Move</div>
            <div>🚀 Space - Jump</div>
            <div>💬 Walk to NPCs - Learn about me</div>
            <div className="text-gray-400 text-[10px] mt-2">
              📱 Touch controls available on mobile
            </div>
          </div>
        </motion.div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
          <div className="text-center space-y-8 max-w-md mx-auto px-6">
            {/* Animated Logo */}
            <div className="relative">
              <div className="text-6xl font-bold text-white mb-2 animate-pulse">
                🎮
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">
                AVISH&apos;S ARCADE
              </h1>
              <p className="text-sm text-gray-300 font-mono">
                Loading interactive portfolio...
              </p>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-4">
              <div className="relative w-80 h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-600">
                <div
                  className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transition-all duration-300 ease-out relative"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-gray-300">Progress</span>
                <span className="text-white font-bold">{loadingProgress}%</span>
              </div>
            </div>

            {/* Loading Tips */}
            <div className="text-xs text-gray-400 font-mono space-y-2">
              <p>💡 Use arrow keys or WASD to move</p>
              <p>🎯 Approach NPCs to learn about my work</p>
              <p>📱 Mobile controls available on touch devices</p>
            </div>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div ref={gameRef} className="w-full h-full" />
    </div>
  );
}
