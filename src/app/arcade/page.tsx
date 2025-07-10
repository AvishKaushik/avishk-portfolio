/* app/mario/page.tsx – interactive Q&A via NPCs with zone-based dialogue box + landing screen */
"use client";

import { useEffect, useRef, useState } from "react";
import { MobileControls } from "./components/MobileControls";
import { GameConfig } from "./config/GameConfig";
import GameNavbar from "@/components/ui/GameNavbar";

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
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
          setLoadingProgress(prev => {
            if (prev >= 90) return prev;
            return prev + 10;
          });
        }, 100);

        // Lazy load Phaser and scenes
        const [Phaser, LandingSceneModule, StageSceneModule, PreloadSceneModule] = await Promise.all([
          import("phaser"),
          import("./scenes/LandingScene"),
          import("./scenes/StageScene"),
          import("./scenes/PreloadScene")
        ]);

        setLoadingProgress(50);

        phaserGame.current = new Phaser.default.Game({
          type: Phaser.default.AUTO,
          parent: gameRef.current!,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: GameConfig.COLORS.PRIMARY,
          physics: { 
            default: "arcade", 
            arcade: { 
              gravity: { x: 0, y: GameConfig.GRAVITY } 
            } 
          },
          scene: [LandingSceneModule.LandingScene, PreloadSceneModule.PreloadScene, StageSceneModule.StageScene],
          scale: {
            mode: Phaser.default.Scale.RESIZE,
            autoCenter: Phaser.default.Scale.CENTER_BOTH,
          },
          render: {
            pixelArt: false,
            antialias: true,
          },
          audio: {
            disableWebAudio: true, // Disable audio for faster loading
          },
        });

        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 200);

      } catch (error) {
        console.error('Failed to load game:', error);
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
    <div className="w-full h-screen relative z-0">
      <GameNavbar />
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-white text-2xl font-bold mb-4">Loading Arcade...</div>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-white text-sm mt-2">{loadingProgress}%</div>
          </div>
        </div>
      )}
      <div ref={gameRef} className="w-full h-full" />
    </div>
  );
}