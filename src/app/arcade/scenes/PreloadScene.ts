"use client";

import * as Phaser from "phaser";
// import { sections } from "../sections";
import { preloadCharacterSheets } from "../components/characters";
import { SoundManager } from "../components/SoundManager";

export class PreloadScene extends Phaser.Scene {
  private loadedTextures: Set<string> = new Set();
  private soundManager: SoundManager | undefined;

  constructor() {
    super("Preload");
  }

  private loadTextureSafely(
    key: string,
    path: string,
    type: "image" | "spritesheet" = "image",
    config?: { frameWidth: number; frameHeight: number }
  ) {
    if (this.loadedTextures.has(key)) {
      console.warn(`Texture ${key} already loaded, skipping`);
      return;
    }

    try {
      if (type === "spritesheet") {
        this.load.spritesheet(key, path, config);
      } else {
        this.load.image(key, path);
      }
      this.loadedTextures.add(key);
    } catch (error) {
      console.warn(`Failed to load texture ${key}:`, error);
    }
  }

  preload() {
    preloadCharacterSheets(this);
    const { width, height } = this.scale;
    // Create loading bar
    this.add
      .tileSprite(0, 0, width, height, "bg_sky")
      .setOrigin(0)
      .setScrollFactor(0);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x000000, 0.5);
    progressBox.fillRect(240, 270, 320, 50);

    this.soundManager = new SoundManager(this);
    this.soundManager.preloadSounds();

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        fontFamily: "'Press Start 2P'",
        fontSize: "20px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        fontFamily: "'Press Start 2P'",
        fontSize: "14px",
        color: "#ffff00",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "14px monospace",
        color: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // Update progress bar
    this.load.on("progress", (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff88, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(Math.floor(value * 100) + "%");
    });

    this.load.on("fileprogress", (file: { key: string }) => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // Load essential assets only
    const essentialAssets = [
      { key: "tiles", path: "/game/assets/tiles.png" },
      { key: "tiles2", path: "/game/assets/tiles2.png" },
      { key: "coin", path: "/game/assets/coin.png" },
      { key: "scroll", path: "/game/assets/scroll.png" },
      { key: "white", path: "/game/assets/white.png" },
      { key: "young_me", path: "/game/assets/white.png" },
      { key: "sg", path: "/game/assets/buildings/sg.png" },
      { key: "scroll-bg", path: "/game/assets/scroll_parchment.png" },
      { key: "pin", path: "/game/assets/pin.png" },
      { key: "paper", path: "/game/assets/paper.png" },
      { key: "noticeboard-bg", path: "/game/assets/noticeboard.png" },
      { key: "sign", path: "/game/assets/sign.png" },
      { key: "pillar", path: "/game/assets/pillar.png" },
      { key: "React", path: "/game/assets/tech/React.png" },
      { key: "Docker", path: "/game/assets/tech/Docker.png" },
      { key: "Java", path: "/game/assets/tech/Java.png" },
      { key: "Azure", path: "/game/assets/tech/Azure.png" },
      { key: "AWS", path: "/game/assets/tech/AWS.png" },
      { key: "Github", path: "/game/assets/tech/Github.png" },
      { key: "C++", path: "/game/assets/tech/C++.png" },
      { key: "Python", path: "/game/assets/tech/Python.png" },
      { key: "Postgre", path: "/game/assets/tech/Postgre.png" },
      { key: "Typescript", path: "/game/assets/tech/Typescript.png" },
      { key: "Angular", path: "/game/assets/tech/Angular.png" },
      { key: "Springboot", path: "/game/assets/tech/Springboot.png" },
      { key: "Jenkins", path: "/game/assets/tech/Jenkins.png" },
      { key: "linkedin", path: "/game/assets/linkedin.png" },
      { key: "github", path: "/game/assets/github.png" },
      { key: "mail", path: "/game/assets/mail.png" },
      { key: "eduhub", path: "/projects/eduhub.png" },
      { key: "intelliview", path: "/projects/intelliview.png" },
      { key: "sdg3", path: "/projects/sdg3.png" },
      { key: "portfolio", path: "/projects/portfolio.png" },
    ];
    this.load.spritesheet("intro_npc", "/game/assets/npc/intro_npc.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("about_npc", "/game/assets/npc/about_npc.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet(
      "education_npc",
      "/game/assets/npc/education_npc.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
    this.load.spritesheet("exp_npc", "/game/assets/npc/exp_npc.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("ladder_npc", "/game/assets/npc/ladder_npc.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("project_npc", "/game/assets/npc/project_npc.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("contact_npc", "/game/assets/npc/contact_npc.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.image("scanlines", "/game/assets/scanlines.png");

    essentialAssets.forEach((asset) => {
      this.loadTextureSafely(asset.key, asset.path, "image");
    });

    // Load player sprite with error handling
    this.loadTextureSafely("player", "/game/assets/player.png", "spritesheet", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chest", "/game/assets/chest.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Create fallback player texture if main one fails
    this.load.on("loaderror", (file: { key: string }) => {
      if (file.key === "player" && !this.textures.exists("player")) {
        console.warn("Player texture failed to load, creating fallback");
        // Create a simple colored rectangle as fallback
        const graphics = this.add.graphics();
        graphics.fillStyle(0x00ff88);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture("player", 32, 32);
        graphics.destroy();
      }
    });

    // Load optional background assets (skip if missing)
    const optionalAssets = [
      { key: "decor", path: "/game/assets/decor.png" },
      { key: "sky", path: "/game/assets/bg_sky.png" },
      { key: "clouds", path: "/game/assets/bg_clouds.png" },
      { key: "mountains", path: "/game/assets/bg_mountains.png" },
      { key: "sparkle", path: "/game/assets/sparkle.png" },
    ];

    optionalAssets.forEach((asset) => {
      this.loadTextureSafely(asset.key, asset.path, "image");
    });
  }

  create() {
    // Add a small delay to show loading completion
    this.soundManager?.createSounds();

    this.soundManager?.stopAllMusic();
    // Example: start intro music in your landing scene
    this.soundManager?.playMusic("intro-music");

    this.time.delayedCall(500, () => {
      this.soundManager?.stopAllMusic();
      this.scene.start("Stage", { soundManager: this.soundManager });
    });
  }
}
