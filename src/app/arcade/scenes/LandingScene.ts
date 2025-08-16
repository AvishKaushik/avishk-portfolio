"use client";
import * as Phaser from "phaser";
import { SoundManager } from "../components/SoundManager";

export class LandingScene extends Phaser.Scene {

  private soundManager!: SoundManager;
  constructor() {
    super("Landing");
  }

  init(data: { soundManager: SoundManager }) {
    if (data.soundManager) {
      this.soundManager = data.soundManager;
    } else {
      // Fallback: create a new SoundManager if none passed
      this.soundManager = new SoundManager(this);
      // this.soundManager.createSounds();
    }
  }

  preload() {
    // Load the font via WebFont loader
    this.load.image("bg_sky", "/game/assets/scanlines.png");
    this.load.audio('intro-music', '/game/sounds/intro-music.mp3');
    this.load.audio('game-music', '/game/sounds/game-music.mp3');
    this.load.audio('victory-music', '/game/sounds/victory.mp3');
  
    this.load.audio('jump-sfx', '/game/sounds/jump.mp3');
    this.load.audio('attack-sfx', '/game/sounds/attack.mp3');
    this.load.audio('npc-interact-sfx', '/game/sounds/npc-interact.mp3');
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }

  create() {
    this.soundManager.createSounds();
    this.soundManager.preloadSounds();
    this.soundManager.playMusic("intro-music");
    const { width, height } = this.scale;

    // Use bg_sky image as tiled background
    this.add
      .tileSprite(0, 0, width, height, "bg_sky")
      .setOrigin(0)
      .setScrollFactor(0);

    // Load the web font before drawing text
    (
      window.WebFont as {
        load: (options: {
          google: { families: string[] };
          active: () => void;
          inactive?: () => void;
        }) => void;
      }
    ).load({
      google: { families: ["Press Start 2P"] },
      active: () => this.drawUI(width, height),
    });
  }

  private drawUI(width: number, height: number) {
    // Animated background particles
    this.createParticles(width, height);

    // Responsive font sizing based on screen dimensions
    const baseWidth = 3840;
    const baseHeight = 2160;
    
    // Use the smaller scale factor to ensure text fits
    const widthScale = width / baseWidth;
    const heightScale = height / baseHeight;
    const scaleFactor = Math.min(widthScale, heightScale);
    
    // Responsive font sizes with minimum values for readability
    const titleSize = Math.max(16, Math.min(80, 120 * scaleFactor));
    const subtitleSize = Math.max(10, Math.min(24, 48 * scaleFactor));
    const instructionSize = Math.max(8, Math.min(16, 32 * scaleFactor));

    // Main title with 4K base styling
    const title = this.add
      .text(width / 2, height / 2 - height * 0.15, "AVISH'S ARCADE", {
        fontFamily: "'Press Start 2P'",
        fontSize: `${titleSize}px`,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: Math.max(4, titleSize * 0.1),
        align: "center",
      })
      .setOrigin(0.5);

    // Title glow effect
    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      yoyo: true,
      repeat: -1,
      duration: 2000,
      ease: 'Sine.easeInOut'
    });

    // Subtitle with 4K base sizing
    const subtitle = this.add
      .text(width / 2, height / 2 - height * 0.06, "Press ENTER or SPACE to Start", {
        fontFamily: "'Press Start 2P'",
        fontSize: `${subtitleSize}px`,
        color: "#00ff00",
        stroke: "#004400",
        strokeThickness: Math.max(2, subtitleSize * 0.08),
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: subtitle,
      alpha: 0.3,
      yoyo: true,
      repeat: -1,
      duration: 1000,
      ease: 'Power2'
    });

    // Instructions - Responsive and mobile-friendly
    const instructions = [
      "🎮 Use ARROW KEYS or WASD to move",
      "🚀 Press SPACE to jump",
      "💬 Approach NPCs to learn about my work",
      "📱 Mobile controls available on touch devices"
    ];

    // Adjust instruction positioning and spacing for mobile
    const startY = height / 2 + height * 0.08;
    const lineSpacing = Math.max(instructionSize + 8, instructionSize * 1.8);

    instructions.forEach((instruction, index) => {
      // Break long text on mobile
      let displayText = instruction;
      if (width < 800 && instruction.length > 35) {
        // Split long instructions for mobile
        if (instruction.includes("ARROW KEYS")) {
          displayText = "🎮 ARROW KEYS/WASD - Move";
        } else if (instruction.includes("Mobile controls")) {
          displayText = "📱 Touch controls on mobile";
        }
      }
      
      this.add
        .text(width / 2, startY + (index * lineSpacing), displayText, {
          fontFamily: "'Press Start 2P'",
          fontSize: `${instructionSize}px`,
          color: "#cccccc",
          align: "center",
          wordWrap: { width: width * 0.8 }
        })
        .setOrigin(0.5)
        .setAlpha(0.8);
    });

    // Enhanced footer with responsive positioning
    const footerMainSize = Math.max(10, instructionSize * 1.1);
    const footerSubSize = Math.max(8, instructionSize * 0.7);
    
    this.add
      .text(width / 2, height - Math.max(60, height * 0.08), "Interactive Portfolio Experience", {
        fontFamily: "'Press Start 2P'",
        fontSize: `${footerMainSize}px`,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: Math.max(1, scaleFactor * 2),
        wordWrap: { width: width * 0.9 }
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height - Math.max(30, height * 0.04), "© 2024 Avish Kaushik", {
        fontFamily: "'Press Start 2P'",
        fontSize: `${footerSubSize}px`,
        color: "#888888",
      })
      .setOrigin(0.5);
      
    // Enhanced input handling
    if (!this.input.keyboard) {
      throw new Error("Keyboard input is not enabled on the scene.");
    }

    const startGame = () => {
      this.soundManager?.stopAllMusic();
      const flash = this.add.rectangle(0, 0, width * 2, height * 2, 0x00ff00);
      flash.setOrigin(0);
      flash.setAlpha(0);

      this.tweens.add({
        targets: flash,
        alpha: 0.8,
        duration: 200,
        yoyo: true,
        onComplete: () => this.scene.start("Preload"),
      });
    };

    this.input.keyboard.once("keydown-ENTER", startGame);
    this.input.keyboard.once("keydown-SPACE", startGame);
  }

  private createParticles(width: number, height: number) {
    // Create floating particles for ambiance - responsive
    const baseArea = 3840 * 2160; // 4K area
    const currentArea = width * height;
    const areaRatio = currentArea / baseArea;
    
    const particleCount = Math.max(10, Math.floor(40 * areaRatio));
    const particleSize = Math.max(1, Math.floor(4 * Math.sqrt(areaRatio)));
    
    for (let i = 0; i < particleCount; i++) {
      const particle = this.add.circle(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(0, height),
        Phaser.Math.Between(1, particleSize),
        0x00ff00,
        0.3
      );

      this.tweens.add({
        targets: particle,
        y: particle.y - Phaser.Math.Between(50, 150),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000),
        onRepeat: () => {
          particle.y = height + 10;
          particle.x = Phaser.Math.Between(0, width);
          particle.alpha = 0.3;
        }
      });
    }
  }
}
