/* app/arcade/components/ChestAsset.ts – fixes & improvements
   • Supports large 500×500 chest frames (scaled down to 64×64)
   • Plays idle‑open after animation complete
   • Slightly larger interaction radius (80px)
*/

import * as Phaser from 'phaser';
import { ScrollPopup } from './ScrollPopup';
import { MobileControls } from './MobileControls';

export class ChestAsset extends Phaser.GameObjects.Container {
  private chest: Phaser.GameObjects.Sprite;
  private scroll: ScrollPopup;
  private player: Phaser.Physics.Arcade.Sprite;
  private eKey: Phaser.Input.Keyboard.Key;
  private isOpen = false;
  private overlay: Phaser.GameObjects.Rectangle;


  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    player: Phaser.Physics.Arcade.Sprite,
    lines: { name: string; score: number; }[]
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.player = player;
    if (!scene.input.keyboard) {
      throw new Error("Keyboard input is not enabled on the scene.");
    }
    this.eKey = scene.input.keyboard.addKey('E');

    this.ensureAnimations(scene);

    // Chest sprite (scaled from 500px sheet)
    this.chest = scene.add.sprite(0, 0, 'chest', 0)
      .setOrigin(0.5, 1)
      .setDisplaySize(64, 64);
    this.chest.play('chest-close');
    this.add(this.chest);

    this.scroll = new ScrollPopup(scene, x, y - 310, lines);
    this.scroll.setVisible(false);

    this.overlay = scene.add.rectangle(
        scene.scale.width / 2,
        scene.scale.height / 2,
        scene.scale.width,
        scene.scale.height,
        0x000000,
        0.4 // opacity
      )
        .setScrollFactor(0) // stays in place
        .setDepth(999)      // below scroll
        .setVisible(false);
      

    scene.events.on('update', this.update, this);
  }

  private ensureAnimations(scene: Phaser.Scene) {
    if (!scene.anims.exists('chest-open')) {
      scene.anims.create({
        key: 'chest-open',
        frames: scene.anims.generateFrameNumbers('chest', { start: 0, end: 2 }),
        frameRate: 8,
        repeat: 0,
      });
    }
    if (!scene.anims.exists('chest-close')) {
      scene.anims.create({
        key: 'chest-close',
        frames: scene.anims.generateFrameNumbers('chest', { start: 2, end: 0 }),
        frameRate: 8,
        repeat: 0,
      });
    }
    if (!scene.anims.exists('chest-idle-open')) {
      scene.anims.create({
        key: 'chest-idle-open',
        frames: [{ key: 'chest', frame: 2 }],
        frameRate: 1,
        repeat: -1,
      });
    }
  }

  private toggleChest() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chest.play('chest-open');
      this.overlay.setVisible(true);
      this.scroll.setDepth(1000);
      this.scroll.setVisible(true);
    } else {
      this.chest.play('chest-close');
      this.overlay.setVisible(false);
      this.scroll.setVisible(false);
    }
  }
  

  update() {
    if (this.scroll.visible) {
      this.scroll.setPosition(this.x, this.y - 310);
    }

    const dist = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    const overlapping = dist < 80; // larger radius
    const mobile = MobileControls.getInstance();

    if (overlapping && (Phaser.Input.Keyboard.JustDown(this.eKey) || mobile.interactDown)) {
      this.toggleChest();
    }

    if (!overlapping && this.isOpen) {
        this.toggleChest();
      }
  }
  
}
