"use client";
import * as Phaser from "phaser";
import { Castle } from "./Castle";
import { FireworksEffect } from "./FireworksEffect";
import { SoundManager } from "./SoundManager";

export class EndZone extends Phaser.GameObjects.Container {
  private castle!: Castle;
  private fireworks!: FireworksEffect;
  private soundManager?: SoundManager;
  private triggerZone!: Phaser.GameObjects.Zone;
  private hasTriggered: boolean = false;
  private victoryTexts: Phaser.GameObjects.Text[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, soundManager?: SoundManager) {
    super(scene, x, y);
    this.scene = scene;
    this.soundManager = soundManager;
    this.createEndZone();
    scene.add.existing(this);
  }

  private createEndZone() {
    // Create castle
    this.castle = new Castle(this.scene, 0, -100);
    this.add(this.castle);

    // Create fireworks effect
    this.fireworks = new FireworksEffect(this.scene, 0, -200);
    this.add(this.fireworks);

    // Create trigger zone for victory
    this.triggerZone = this.scene.add.zone(0, 0, 200, 300);
    this.scene.physics.world.enable(this.triggerZone, Phaser.Physics.Arcade.STATIC_BODY);
    this.triggerZone.setDepth(-1);

    // Add some decorative elements
    this.createDecorations();

    this.setDepth(5);
  }

  private createDecorations() {
    // Victory podium
    const podium = this.scene.add.rectangle(0, 50, 150, 30, 0xFFD700);
    podium.setStrokeStyle(3, 0xFFA500);
    this.add(podium);

    // Podium steps
    const step1 = this.scene.add.rectangle(0, 65, 180, 15, 0xC0C0C0);
    step1.setStrokeStyle(2, 0xA0A0A0);
    this.add(step1);

    const step2 = this.scene.add.rectangle(0, 75, 210, 15, 0x808080);
    step2.setStrokeStyle(2, 0x606060);
    this.add(step2);

    // Decorative banners
    const leftBanner = this.scene.add.rectangle(-120, -50, 30, 80, 0x800080);
    leftBanner.setStrokeStyle(2, 0x4B0082);
    this.add(leftBanner);

    const rightBanner = this.scene.add.rectangle(120, -50, 30, 80, 0x800080);
    rightBanner.setStrokeStyle(2, 0x4B0082);
    this.add(rightBanner);

    // Banner animation
    this.scene.tweens.add({
      targets: [leftBanner, rightBanner],
      scaleY: 0.9,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Welcome sign
    const sign = this.scene.add.rectangle(0, -250, 200, 60, 0x8B4513);
    sign.setStrokeStyle(3, 0x654321);
    this.add(sign);

    const signText = this.scene.add.text(0, -250, 'JOURNEY COMPLETE!', {
      fontSize: '16px',
      color: '#FFFFFF',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    signText.setOrigin(0.5);
    this.add(signText);

    // Sign glow effect
    this.scene.tweens.add({
      targets: signText,
      alpha: 0.7,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  public setupPlayerCollision(player: Phaser.Physics.Arcade.Sprite) {
    this.scene.physics.add.overlap(player, this.triggerZone, () => {
      if (!this.hasTriggered) {
        this.triggerVictory();
      }
    });
  }

  private triggerVictory() {
    if (this.hasTriggered) return;
    this.hasTriggered = true;

    console.log("🎉 Victory triggered!");

    // Stop game music and play victory music
    if (this.soundManager) {
      this.soundManager.fadeOutMusic(1000);
      this.scene.time.delayedCall(1000, () => {
        this.soundManager?.playMusic('victory-music', false);
      });
    }

    // Castle celebration
    this.castle.celebrateVictory();

    // Start fireworks after a short delay
    this.scene.time.delayedCall(1000, () => {
      this.fireworks.startFireworks();
    });

    // Create victory text
    this.scene.time.delayedCall(1500, () => {
      const { victoryText, subText } = this.fireworks.createVictoryText();
      this.victoryTexts.push(victoryText, subText);
    });

    // Add completion message
    this.scene.time.delayedCall(3000, () => {
      this.createCompletionMessage();
    });

    // Optional: Add restart button after some time
    this.scene.time.delayedCall(8000, () => {
      this.createRestartButton();
    });
  }

  private createCompletionMessage() {
    const completionText = this.scene.add.text(this.x, this.y + 150, 
      'Thank you for exploring my interactive portfolio!\n\nYou have successfully learned about my:\n• Background & Skills\n• Education Journey\n• Professional Experience\n• Projects & Achievements\n• Contact Information', {
      fontSize: '18px',
      color: '#FFFFFF',
      fontFamily: 'Arial',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 2,
      wordWrap: { width: 400 }
    });
    completionText.setOrigin(0.5);
    completionText.setDepth(102);

    // Fade in completion text
    completionText.setAlpha(0);
    this.scene.tweens.add({
      targets: completionText,
      alpha: 1,
      duration: 2000,
      ease: 'Power2'
    });

    this.victoryTexts.push(completionText);
  }

  private createRestartButton() {
    const buttonBg = this.scene.add.rectangle(this.x, this.y + 280, 200, 50, 0x4169E1);
    buttonBg.setStrokeStyle(3, 0x000080);
    buttonBg.setDepth(103);
    buttonBg.setInteractive();

    const buttonText = this.scene.add.text(this.x, this.y + 280, 'RESTART JOURNEY', {
      fontSize: '16px',
      color: '#FFFFFF',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    buttonText.setOrigin(0.5);
    buttonText.setDepth(104);

    // Button hover effects
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0x5A7FE1);
      this.scene.tweens.add({
        targets: [buttonBg, buttonText],
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 200,
        ease: 'Back.easeOut'
      });
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0x4169E1);
      this.scene.tweens.add({
        targets: [buttonBg, buttonText],
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Back.easeOut'
      });
    });

    buttonBg.on('pointerdown', () => {
      // Restart the game
      this.scene.scene.start('Landing');
    });

    // Fade in button
    buttonBg.setAlpha(0);
    buttonText.setAlpha(0);
    this.scene.tweens.add({
      targets: [buttonBg, buttonText],
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    });
  }

  public cleanup() {
    this.fireworks.stopFireworks();
    this.victoryTexts.forEach(text => text.destroy());
    this.victoryTexts = [];
  }
}