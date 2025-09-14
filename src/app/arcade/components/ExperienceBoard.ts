import * as Phaser from 'phaser';

interface Experience {
  title: string;
  company: string;
  duration: string;
  tech: string;
  desc: string;
}

export class ExperienceBoard extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, experiences: Experience[]) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setDepth(5);

    // Clean modern background
    const board = scene.add.rectangle(0, 0, 540, 350, 0x1a1a1a, 0.95)
      .setStrokeStyle(2, 0xffffff)
      .setOrigin(0.5);
    this.add(board);

    // Title Label
    const title = scene.add.text(0, -155, 'EXPERIENCE', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(title);

    // Cards layout
    const spacingY = 105;
    experiences.forEach((exp, index) => {
      const yOffset = -90 + index * spacingY;
      this.add(this.createExperienceCard(scene, 0, yOffset, exp));
    });
  }

  private createExperienceCard(scene: Phaser.Scene, x: number, y: number, exp: Experience) {
    const container = scene.add.container(x, y);

    const cardBg = scene.add.rectangle(0, 0, 480, 90, 0x2c2c2c, 1)
      .setStrokeStyle(1.5, 0x999999)
      .setOrigin(0.5);
    container.add(cardBg);

    const title = scene.add.text(-220, -30, exp.title, {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0, 0);

    const company = scene.add.text(-220, -10, exp.company, {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#aaaaaa'
    }).setOrigin(0, 0);

    const duration = scene.add.text(-220, 10, exp.duration, {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#aaaaaa'
    }).setOrigin(0, 0);

    const tech = scene.add.text(0, -32, `Tech: ${exp.tech}`, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#cccccc'
    }).setOrigin(0, 0);

    const desc = scene.add.text(0, -14, exp.desc, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#cccccc',
      wordWrap: { width: 220 }
    }).setOrigin(0, 0);

    container.add([title, company, duration, tech, desc]);

    container.setInteractive(new Phaser.Geom.Rectangle(-240, -45, 480, 90), Phaser.Geom.Rectangle.Contains);
    container.on('pointerover', () => {
      scene.tweens.add({ targets: container, scale: 1.02, duration: 150, ease: 'Sine.easeOut' });
    });
    container.on('pointerout', () => {
      scene.tweens.add({ targets: container, scale: 1, duration: 150, ease: 'Sine.easeIn' });
    });

    return container;
  }
}