import * as Phaser from "phaser";

export interface TechRingConfig {
  radius?: number;
  speed?: number;
  clockwise?: boolean;
  size?: number; // size of each tech tile (square)
  fontSize?: string;
  physicsGroup?: Phaser.Physics.Arcade.StaticGroup;
  showLabel?: boolean;
}

export class TechRing extends Phaser.GameObjects.Container {
  private readonly cfg: Required<TechRingConfig>;
  angle = 0;
  private techs: {
    label: string;
    sprite?: Phaser.Physics.Arcade.Image;
    bg: Phaser.GameObjects.Rectangle; // <== new
    theta: number;
  }[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    technologies: string[],
    config: TechRingConfig = {}
  ) {
    super(scene, x, y);

    this.cfg = {
      radius: config.radius ?? 100,
      speed: config.speed ?? 0.015,
      clockwise: config.clockwise ?? true,
      size: config.size ?? 40,
      fontSize: config.fontSize ?? "8px",
      physicsGroup: config.physicsGroup ?? scene.physics.add.staticGroup(),
      showLabel: false,
    };

    scene.add.existing(this);
    this.buildRing(technologies);
  }

  private buildRing(techs: string[]) {
    const step = (2 * Math.PI) / techs.length;

    techs.forEach((label, idx) => {
      const theta = idx * step;
      const x = this.cfg.radius * Math.cos(theta) + this.x;
      const y = this.cfg.radius * Math.sin(theta) + this.y;

      // Background rectangle
      const bg = this.scene.add
        .rectangle(x, y, 36, 36, 0xffffff, 1)
        .setStrokeStyle(1, 0xffffff)
        .setOrigin(0.5)
        .setDepth(-1); // ensure it's behind
      // DO NOT add to container

      let sprite: Phaser.Physics.Arcade.Image | undefined;
      if (this.scene.textures.exists(label)) {
        sprite = this.scene.physics.add
          .staticImage(x, y, label)
          .setDisplaySize(32, 32)
          .setOrigin(0.5);
        this.cfg.physicsGroup.add(sprite);
      }


      this.techs.push({ label, sprite, bg, theta });
    });
  }

  update() {
    const dir = this.cfg.clockwise ? 1 : -1;
    this.angle += this.cfg.speed * dir;
    const step = (2 * Math.PI) / this.techs.length;

    this.techs.forEach((entry, idx) => {
      const theta = idx * step + this.angle;
      const x = this.cfg.radius * Math.cos(theta) + this.x;
      const y = this.cfg.radius * Math.sin(theta) + this.y;

      entry.bg.setPosition(x, y);
      entry.theta = theta;

      if (entry.sprite) {
        entry.sprite.setPosition(x, y);
        entry.sprite.refreshBody();
      }

      entry.bg.setPosition(x, y); // background moves!
    });
  }

  public getPhysicsGroup() {
    return this.cfg.physicsGroup;
  }

  public getAngularVelocityInfo() {
    const dir = this.cfg.clockwise ? 1 : -1;
    return { angularSpeed: this.cfg.speed * dir, radius: this.cfg.radius };
  }
}
