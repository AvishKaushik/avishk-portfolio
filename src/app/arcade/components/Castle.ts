"use client";
import * as Phaser from "phaser";

export class Castle extends Phaser.GameObjects.Container {
  private castleSprite!: Phaser.GameObjects.Sprite;
  private flag!: Phaser.GameObjects.Rectangle;
  private windows: Phaser.GameObjects.Rectangle[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    this.createCastle();
    scene.add.existing(this);
  }

  private createCastle() {
    // Main castle structure (using existing tiles and assets)
    const castleWidth = 400;
    const castleHeight = 300;
    
    // Castle base
    const base = this.scene.add.rectangle(0, 0, castleWidth, castleHeight, 0x8B4513);
    base.setStrokeStyle(4, 0x654321);
    this.add(base);

    // Castle towers
    const leftTower = this.scene.add.rectangle(-150, -50, 80, 200, 0x8B4513);
    leftTower.setStrokeStyle(4, 0x654321);
    this.add(leftTower);

    const rightTower = this.scene.add.rectangle(150, -50, 80, 200, 0x8B4513);
    rightTower.setStrokeStyle(4, 0x654321);
    this.add(rightTower);

    const centerTower = this.scene.add.rectangle(0, -80, 100, 240, 0x8B4513);
    centerTower.setStrokeStyle(4, 0x654321);
    this.add(centerTower);

    // Castle gate
    const gate = this.scene.add.rectangle(0, 80, 80, 120, 0x4A4A4A);
    gate.setStrokeStyle(3, 0x2F2F2F);
    this.add(gate);

    // Gate details
    const gateArch = this.scene.add.arc(0, 20, 35, 0, Math.PI, true, 0x2F2F2F);
    this.add(gateArch);

    // Windows
    this.createWindows();

    // Flags on towers
    this.createFlags();

    // Castle details
    this.createDetails();

    this.setDepth(10);
  }

  private createWindows() {
    const windowPositions = [
      { x: -150, y: -80 }, { x: -150, y: -20 },
      { x: 150, y: -80 }, { x: 150, y: -20 },
      { x: -50, y: -40 }, { x: 50, y: -40 },
      { x: 0, y: -120 }
    ];

    windowPositions.forEach(pos => {
      const window = this.scene.add.rectangle(pos.x, pos.y, 20, 25, 0x4169E1);
      window.setStrokeStyle(2, 0x000080);
      this.add(window);
      this.windows.push(window as Phaser.GameObjects.Rectangle);

      // Window glow effect
      this.scene.tweens.add({
        targets: window,
        alpha: 0.6,
        duration: 2000 + Math.random() * 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  private createFlags() {
    // Left tower flag
    const leftFlagPole = this.scene.add.rectangle(-150, -150, 3, 40, 0x8B4513);
    this.add(leftFlagPole);
    
    const leftFlag = this.scene.add.rectangle(-135, -160, 25, 15, 0xFF0000);
    this.add(leftFlag);
    
    // Right tower flag
    const rightFlagPole = this.scene.add.rectangle(150, -150, 3, 40, 0x8B4513);
    this.add(rightFlagPole);
    
    const rightFlag = this.scene.add.rectangle(165, -160, 25, 15, 0xFF0000);
    this.add(rightFlag);

    // Center tower flag
    const centerFlagPole = this.scene.add.rectangle(0, -200, 3, 40, 0x8B4513);
    this.add(centerFlagPole);
    
    this.flag = this.scene.add.rectangle(15, -210, 30, 20, 0x00FF00);
    this.add(this.flag);

    // Flag waving animation
    this.scene.tweens.add({
      targets: [leftFlag, rightFlag, this.flag],
      scaleX: 0.8,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private createDetails() {
    // Battlements
    const battlementPositions = [-180, -120, -60, 0, 60, 120, 180];
    battlementPositions.forEach(x => {
      const battlement = this.scene.add.rectangle(x, -150, 15, 20, 0x8B4513);
      battlement.setStrokeStyle(2, 0x654321);
      this.add(battlement);
    });

    // Castle banner
    const banner = this.scene.add.rectangle(0, -50, 60, 40, 0x800080);
    banner.setStrokeStyle(2, 0x4B0082);
    this.add(banner);

    // Banner text
    const bannerText = this.scene.add.text(0, -50, 'AVISH', {
      fontSize: '12px',
      color: '#FFFFFF',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    bannerText.setOrigin(0.5);
    this.add(bannerText);
  }

  public celebrateVictory() {
    // Victory animation for the castle
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 500,
      yoyo: true,
      repeat: 2,
      ease: 'Back.easeOut'
    });

    // Flag celebration
    this.scene.tweens.add({
      targets: this.flag,
      angle: 360,
      duration: 1000,
      repeat: 3,
      ease: 'Power2'
    });

    // Windows celebration
    this.windows.forEach((window, index) => {
      this.scene.time.delayedCall(index * 100, () => {
        this.scene.tweens.add({
          targets: window,
          scaleX: 1.5,
          scaleY: 1.5,
          duration: 300,
          yoyo: true,
          ease: 'Back.easeOut'
        });
      });
    });
  }
}