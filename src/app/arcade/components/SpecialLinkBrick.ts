export class SpecialLinkBrick extends Phaser.GameObjects.Container {
  private brick: Phaser.GameObjects.Sprite;
  private triggerUrl: string;
  private hitSensor: Phaser.GameObjects.Zone;
  private activated: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, url: string, label: string) {
    super(scene, x, y);
    scene.add.existing(this);

    this.triggerUrl = url;

    // Visible brick
    this.brick = scene.add.sprite(0, 0, label)
      .setOrigin(0.5)
      .setDisplaySize(64, 64);
    this.add(this.brick);

    // Physics body for the brick (just visual)
    scene.physics.world.enable(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setImmovable(true).setAllowGravity(false);
    this.setSize(64, 64);

    // Hit sensor
    this.hitSensor = scene.add.zone(x, y + 18, 32, 4)
      .setOrigin(0.5);
    scene.physics.world.enable(this.hitSensor);
    const sensorBody = this.hitSensor.body as Phaser.Physics.Arcade.Body;
    sensorBody.setAllowGravity(false);
    sensorBody.setImmovable(true);
  }

  public setupOverlap(player: Phaser.GameObjects.Sprite) {
    const playerBody = player.body as Phaser.Physics.Arcade.Body;

    // Trigger activate only once per hit
    this.scene.physics.add.overlap(player, this.hitSensor, () => {
      if (!this.activated && playerBody.velocity.y < 0) {
        this.activate();
      }
    });

    // Reset activated when player leaves the sensor
    this.scene.events.on('update', () => {
      if (this.activated) {
        const playerBounds = player.getBounds();
        const sensorBounds = this.hitSensor.getBounds();

        if (!Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, sensorBounds)) {
          this.activated = false;
        }
      }
    });
  }

  private activate() {
    this.activated = true;
    window.open(this.triggerUrl, '_blank'); // opens link
    this.scene.tweens.add({
      targets: this.brick,
      y: this.brick.y - 6,
      duration: 100,
      yoyo: true,
      ease: 'Sine.easeInOut',
    });
  }
}
