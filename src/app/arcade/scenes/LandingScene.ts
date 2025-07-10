"use client";
import * as Phaser from "phaser";

export class LandingScene extends Phaser.Scene {
  constructor() {
    super("Landing");
  }

  preload() {
    // Load the font via WebFont loader
    this.load.image("bg_sky", "/game/assets/scanlines.png");
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }

  create() {
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
    // Main title
    this.add
      .text(width / 2, height / 2 - 80, "AVISH'S ARCADE", {
        fontFamily: "'Press Start 2P'",
        fontSize: "28px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    // Subtitle
    const subtitle = this.add
      .text(width / 2, height / 2 - 20, "Press ENTER to Start", {
        fontFamily: "'Press Start 2P'",
        fontSize: "14px",
        color: "#ffff00",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: subtitle,
      alpha: 0,
      yoyo: true,
      repeat: -1,
      duration: 800,
    });

    // Footer
    this.add
      .text(width / 2, height - 40, "Explore. Jump. Learn.", {
        fontFamily: "'Press Start 2P'",
        fontSize: "10px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
      
    if (!this.input.keyboard) {
      throw new Error("Keyboard input is not enabled on the scene.");
    }
    this.input.keyboard.once("keydown-ENTER", () => {
      const flash = this.add.rectangle(0, 0, width * 2, height * 2, 0xffffff);
      flash.setOrigin(0);
      flash.setAlpha(0);

      this.tweens.add({
        targets: flash,
        alpha: 1,
        duration: 150,
        onComplete: () => this.scene.start("Preload"),
      });
    });
  }
}
