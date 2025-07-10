import * as Phaser from 'phaser';

interface Education {
  degree: string;
  school: string;
  duration: string;
  focus: string;
}

export class EducationBoard extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, education: Education[]) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setDepth(5);

    // Modern glassy panel look
    const panel = scene.add.rectangle(0, 0, 560, 320, 0x101010, 0.85)
      .setStrokeStyle(2, 0x999999)
      .setOrigin(0.5)
      .setAlpha(0.9);
    this.add(panel);

    // Title
    const title = scene.add.text(0, -140, 'EDUCATION', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(title);

    const sectionHeight = 90;
    education.forEach((edu, i) => {
      const offsetY = -80 + i * sectionHeight;
      this.add(this.createEduEntry(scene, 0, offsetY, edu));
    });
  }

  private createEduEntry(scene: Phaser.Scene, x: number, y: number, edu: Education) {
    const group = scene.add.container(x, y);

    const bg = scene.add.rectangle(0, 0, 500, 70, 0x1e1e1e)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0x555555);
    group.add(bg);

    const degree = scene.add.text(-230, -20, edu.degree, {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0, 0);

    const school = scene.add.text(-230, 0, edu.school, {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#aaaaaa'
    }).setOrigin(0, 0);

    const duration = scene.add.text(-230, 20, edu.duration, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#888888'
    }).setOrigin(0, 0);

    const focus = scene.add.text(20, -10, edu.focus, {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#dddddd',
      wordWrap: { width: 220 }
    }).setOrigin(0, 0);

    group.add([degree, school, duration, focus]);

    return group;
  }
}