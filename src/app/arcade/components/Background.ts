"use client";

import Phaser from "phaser";

export class Background {
  private scene: Phaser.Scene;
  private levelWidth: number;

  constructor(scene: Phaser.Scene, levelWidth: number) {
    this.scene = scene;
    this.levelWidth = levelWidth;
  }

  create() {
    this.createParallaxLayers();
  }

  private createParallaxLayers() {
    const sky = this.scene.add
      .image(0, 0, "sky")
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(-10);

    sky.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
  }
}
