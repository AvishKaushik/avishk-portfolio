/* app/arcade/components/EducationPodium.ts
   Clean podium-style education display using pillar.png.
   Each podium shows degree, school, year, and score.
*/

import * as Phaser from 'phaser';

interface Education {
  degree: string;
  school: string;
  year: string;
  score: string;
}

export class EducationPodium extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, educations: Education[]) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setDepth(5);

    // Podium spacing and height progression (low → mid → high)
    const widths = [140, 160, 180]; // wider podiums
    const heights = [120, 140, 160]; // left < middle < right
    const xOffsets = [-160, 0, 160];// left < middle < right
    const yOffsets = [0, 13, 25];

    educations.forEach((edu, i) => {
      const px = xOffsets[i];
      const py = -heights[i] / 2 +yOffsets[i];
      this.add(this.createPodium(scene, px, py, widths[i], heights[i], edu));
    });

    // Title
    const title = scene.add.text(0, -380, 'EDUCATION', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(title);
  }

  private createPodium(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    edu: Education
  ) {
    const container = scene.add.container(x, y);

    // Pillar base
    const pillar = scene.add.image(0, 0, 'pillar')
      .setDisplaySize(width, height)
      .setOrigin(0.5, 1); // base sticks to ground
    container.add(pillar);

    // Text formatting
    const textY = -height - 70;
    const degreeText = scene.add.text(0, textY, edu.degree, {
      fontFamily: 'monospace',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width + 40 },
    }).setOrigin(0.5, 1);

    const schoolText = scene.add.text(0, textY + 18, edu.school, {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#cccccc',
      align: 'center',
      wordWrap: { width: width + 40 },
    }).setOrigin(0.5, 0);

    const yearText = scene.add.text(0, textY + 36, edu.year, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#aaaaaa'
    }).setOrigin(0.5, 0);

    const scoreText = scene.add.text(0, textY + 52, `Score: ${edu.score}`, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#aaaaaa'
    }).setOrigin(0.5, 0);

    container.add([degreeText, schoolText, yearText, scoreText]);

    return container;
  }
}
