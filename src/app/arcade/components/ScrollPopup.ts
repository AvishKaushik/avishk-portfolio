/* app/arcade/components/ScrollPopup.ts
   Ancient-style parchment scroll with bold skills display.
*/

import * as Phaser from 'phaser';

interface Skill {
  name: string;
  score: number; // 0 to 5
}

export class ScrollPopup extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Image;
  private title: Phaser.GameObjects.Text;
  private skills: Skill[];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    skills: Skill[]
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setDepth(1000);

    this.skills = skills;

    const width = 500;
    const height = 540;

    // Use a parchment-style image (make sure to preload it as 'scroll-bg')
    this.background = scene.add.image(0, 0, 'scroll-bg')
      .setDisplaySize(width, height)
      .setAlpha(0.92);
    this.add(this.background);

    // Title text
    this.title = scene.add.text(0, -height / 2 + 120, 'Skill Sheet', {
      fontFamily: '"PressStart2P"',
      fontSize: '16px',
      color: '#4B2E05', // dark brown
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5, 0);
    this.add(this.title);

    this.renderSkillBars(width, height);
  }

  private renderSkillBars(width: number, height: number) {
    const barWidth = 18;
    const barHeight = 16;
    const gapY = 34;

    this.skills.forEach((skill, i) => {
      const y = -height / 2 + 180 + i * gapY;

      // Skill name
      const nameText = this.scene.add.text(-width / 2 + 150, y, skill.name, {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#3A2200',
        stroke: '#000000',
        strokeThickness: 1.5,
      }).setOrigin(0, 0);
      this.add(nameText);

      // Bars
      for (let j = 0; j < 5; j++) {
        const filled = j < skill.score;
        const color = filled ? 0x5A3D1E : 0xD2B48C; // dark brown vs parchment tan
        const bar = this.scene.add.graphics();
        bar.fillStyle(color, 1);
        bar.fillRoundedRect(-width / 2 + 230 + j * (barWidth + 3), y-6, barWidth, barHeight, 4);
        this.add(bar);
      }
    });
  }
}
