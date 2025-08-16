"use client";
import * as Phaser from "phaser";

export class FireworksEffect extends Phaser.GameObjects.Container {
  private particles: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
  private isActive: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    scene.add.existing(this);
    this.setDepth(100);
  }

  public startFireworks() {
    if (this.isActive) return;
    this.isActive = true;

    // Create multiple firework bursts
    this.createFireworkBurst(0, -200, 0xFF0000, 0xFF6666); // Red
    
    this.scene.time.delayedCall(500, () => {
      this.createFireworkBurst(-150, -250, 0x00FF00, 0x66FF66); // Green
    });

    this.scene.time.delayedCall(1000, () => {
      this.createFireworkBurst(150, -180, 0x0000FF, 0x6666FF); // Blue
    });

    this.scene.time.delayedCall(1500, () => {
      this.createFireworkBurst(-100, -300, 0xFFFF00, 0xFFFF66); // Yellow
    });

    this.scene.time.delayedCall(2000, () => {
      this.createFireworkBurst(100, -220, 0xFF00FF, 0xFF66FF); // Magenta
    });

    this.scene.time.delayedCall(2500, () => {
      this.createFireworkBurst(0, -280, 0x00FFFF, 0x66FFFF); // Cyan
    });

    // Continue fireworks for celebration
    this.scene.time.delayedCall(3000, () => {
      this.createContinuousFireworks();
    });
  }

  private createFireworkBurst(x: number, y: number, color1: number, color2: number) {
    // Create particle emitter for firework burst
    const emitZone: Phaser.Types.GameObjects.Particles.EmitZoneData = {
      type: 'edge',
      source: {
        getRandomPoint: (point?: Phaser.Types.Math.Vector2Like) => {
          const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
          const radius = 5;
          if (!point) point = { x: 0, y: 0 };
          point.x = Math.cos(angle) * radius;
          point.y = Math.sin(angle) * radius;
          return point;
        }
      }
    };
    
    const emitter = this.scene.add.particles(this.x + x, this.y + y, 'white', {
      speed: { min: 100, max: 200 },
      scale: { start: 0.3, end: 0 },
      lifespan: 1000,
      quantity: 30,
      tint: [color1, color2],
      blendMode: 'ADD',
      emitZone
    });

    // Burst effect
    emitter.explode(30);

    // Add sparkle trail
    const sparkleEmitter = this.scene.add.particles(this.x + x, this.y + y, 'white', {
      speed: { min: 50, max: 100 },
      scale: { start: 0.1, end: 0 },
      lifespan: 2000,
      quantity: 15,
      tint: [0xFFFFFF, color1],
      blendMode: 'ADD',
      alpha: { start: 1, end: 0 }
    });

    sparkleEmitter.explode(15);

    // Clean up after animation
    this.scene.time.delayedCall(3000, () => {
      emitter.destroy();
      sparkleEmitter.destroy();
    });

    this.particles.push(emitter);
  }

  private createContinuousFireworks() {
    const colors = [
      [0xFF0000, 0xFF6666], // Red
      [0x00FF00, 0x66FF66], // Green
      [0x0000FF, 0x6666FF], // Blue
      [0xFFFF00, 0xFFFF66], // Yellow
      [0xFF00FF, 0xFF66FF], // Magenta
      [0x00FFFF, 0x66FFFF], // Cyan
      [0xFFA500, 0xFFB366], // Orange
      [0x800080, 0xB366B3]  // Purple
    ];

    const launchFirework = () => {
      if (!this.isActive) return;

      const randomX = Phaser.Math.Between(-200, 200);
      const randomY = Phaser.Math.Between(-300, -150);
      const colorPair = Phaser.Utils.Array.GetRandom(colors);
      
      this.createFireworkBurst(randomX, randomY, colorPair[0], colorPair[1]);

      // Schedule next firework
      this.scene.time.delayedCall(Phaser.Math.Between(800, 1500), launchFirework);
    };

    // Start continuous fireworks
    launchFirework();
  }

  public stopFireworks() {
    this.isActive = false;
    
    // Clean up all particles
    this.particles.forEach(emitter => {
      if (emitter && emitter.active) {
        emitter.destroy();
      }
    });
    this.particles = [];
  }

  public createVictoryText() {
    // Victory text with special effects
    const victoryText = this.scene.add.text(this.x, this.y - 100, 'CONGRATULATIONS!', {
      fontSize: '48px',
      color: '#FFD700',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    });
    victoryText.setOrigin(0.5);
    victoryText.setDepth(101);

    // Victory text animation
    this.scene.tweens.add({
      targets: victoryText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Rainbow color effect
    this.scene.tweens.add({
      targets: victoryText,
      duration: 2000,
      repeat: -1,
      onUpdate: (tween) => {
        const progress = tween.progress;
        const hue = Math.floor(progress * 360);
        victoryText.setTint(Phaser.Display.Color.HSVToRGB(hue / 360, 1, 1).color);
      }
    });

    const subText = this.scene.add.text(this.x, this.y - 40, 'You completed the journey!', {
      fontSize: '24px',
      color: '#FFFFFF',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 2
    });
    subText.setOrigin(0.5);
    subText.setDepth(101);

    // Fade in sub text
    subText.setAlpha(0);
    this.scene.tweens.add({
      targets: subText,
      alpha: 1,
      duration: 1000,
      delay: 500,
      ease: 'Power2'
    });

    return { victoryText, subText };
  }
}