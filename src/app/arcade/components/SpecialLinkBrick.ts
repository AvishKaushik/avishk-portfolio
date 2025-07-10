import * as Phaser from 'phaser';

export class SpecialLinkBrick extends Phaser.GameObjects.Container {
  private brick: Phaser.GameObjects.Sprite;
  private triggerUrl: string;
  private hitSensor: Phaser.GameObjects.Zone;

  constructor(scene: Phaser.Scene, x: number, y: number, url: string, label: string) {
    super(scene, x, y);
    scene.add.existing(this);

    this.triggerUrl = url;

    // Visible brick
    this.brick = scene.add.sprite(0, 0, label)
      .setOrigin(0.5)
      .setDisplaySize(64, 64);
    this.add(this.brick);

    // Physics body for the brick (just visual; no need for collision)
    scene.physics.world.enable(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setImmovable(true).setAllowGravity(false);
    this.setSize(64, 64);

    // Add a small invisible sensor below
    this.hitSensor = scene.add.zone(x, y + 18, 32, 4)
      .setOrigin(0.5);
    scene.physics.world.enable(this.hitSensor);
    const sensorBody = this.hitSensor.body as Phaser.Physics.Arcade.Body;
    sensorBody.setAllowGravity(false).setImmovable(true);
  }

  public setupOverlap(player: Phaser.GameObjects.Sprite) {
    this.scene.physics.add.overlap(player, this.hitSensor, () => {
      const playerBody = player.body as Phaser.Physics.Arcade.Body;
      if (playerBody.velocity.y < 0) {
        this.activate();
      }
    });
  }

  private activate() {
    window.open(this.triggerUrl, '_blank');
    this.scene.tweens.add({
      targets: this.brick,
      y: this.brick.y - 6,
      duration: 100,
      yoyo: true,
      ease: 'Sine.easeInOut',
    });
  }
}
