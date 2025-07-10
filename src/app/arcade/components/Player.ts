/* app/arcade/components/Player.ts – ladder physics (no climb animation) */

import * as Phaser from "phaser";
import {
  characters,
  CharacterMeta,
  createCharacterAnimations,
} from "@/app/arcade/components/characters";

export class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private meta: CharacterMeta;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private runKey: Phaser.Input.Keyboard.Key;
  private attackKey: Phaser.Input.Keyboard.Key;
  private ladderGroup?: Phaser.Physics.Arcade.StaticGroup;

  private attackCooldown = false;
  private inAir = false;
  private onLadder = false;
  private isAttacking = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    characterKey: string = characters[0].key
  ) {
    this.scene = scene;
    this.meta = characters.find((c) => c.key === characterKey)!;

    createCharacterAnimations(scene);

    this.sprite = scene.physics.add.sprite(x, y, `${characterKey}-idle`, 0);
    this.sprite.setCollideWorldBounds(true).setDepth(20);

    // Smart body box (35%×70%)
    const sheet = this.meta.actions.idle;
    const bw = (sheet.frameWidth * 0.25) | 0;
    const bh = (sheet.frameHeight * 0.7) | 0;
    if (!this.sprite.body) {
      throw new Error("Keyboard input is not enabled on the scene.");
    }
    this.sprite.body
      .setSize(bw, bh)
      .setOffset(((sheet.frameWidth - bw) / 2) | 0, (sheet.frameHeight - bh) | 0);

    if (!scene.input.keyboard) {
      throw new Error("Keyboard input is not enabled on the scene.");
    }
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.runKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  }

  /* Assign ladder static‑group after ladders are created */
  setLadderGroup(group: Phaser.Physics.Arcade.StaticGroup) {
    this.ladderGroup = group;
  }

  getSprite() {
    return this.sprite;
  }

  update() {
    const speed = this.runKey.isDown ? 480 : 400;
    const { left, right, up, down } = this.cursors;
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    // ── Ladder overlap check first ────────────────────────
    if (this.ladderGroup) {
      const overlapping = this.scene.physics.overlap(this.sprite, this.ladderGroup);
      if (overlapping && (up?.isDown || down?.isDown)) {
        // Enter climbing state
        this.onLadder = true;
        body.setAllowGravity(false);
        body.setVelocityX(0);
        body.setVelocityY(up?.isDown ? -120 : 120);
      } else if (!overlapping && this.onLadder) {
        // Exit ladder
        this.onLadder = false;
        body.setAllowGravity(true);
      }
    }

    // If climbing, ignore ground movement & jump
    if (this.onLadder) {
      // Align X to ladder centre (prettier)
      const ladder = this.ladderGroup?.getFirst(true) as Phaser.GameObjects.Zone;
      if (ladder) this.sprite.x = ladder.x;
      // No climb animation available, so keep idle sprite
      this.sprite.anims.play(`${this.meta.key}-idle`, true);
      return;
    }

    const onGround = body.blocked.down;

    // ── Attack ───────────────────────────────────────────
    if (Phaser.Input.Keyboard.JustDown(this.attackKey) && !this.attackCooldown && this.meta.actions.attack) {
      this.isAttacking = true;
      this.attackCooldown = true;
      body.setVelocityX(0);
      this.sprite.anims.play(`${this.meta.key}-attack`, true);
      this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isAttacking = false;
        this.scene.time.delayedCall(150, () => (this.attackCooldown = false));
      });
    }
    if (this.isAttacking) return;

    // ── Horizontal movement ──────────────────────────────
    if (left?.isDown) {
      body.setVelocityX(-speed);
      this.sprite.flipX = true;
    } else if (right?.isDown) {
      body.setVelocityX(speed);
      this.sprite.flipX = false;
    } else {
      body.setVelocityX(0);
    }

    // ── Jump ─────────────────────────────────────────────
    if (up?.isDown && onGround) {
      body.setVelocityY(-520);
      this.inAir = true;
      this.playAnim('jump');
    }

    // ── Air/ground state ────────────────────────────────
    if (!onGround) {
      if (!this.inAir) {
        this.inAir = true;
        this.playAnim('jump');
      }
    } else if (this.inAir) {
      this.inAir = false;
    }

    if (this.inAir) return; // keep jump anim

    // ── Ground animations ───────────────────────────────
    if (body.velocity.x !== 0) {
      this.playAnim('run');
    } else {
      this.playAnim('idle');
    }
  }

  private playAnim(action: keyof CharacterMeta['actions']) {
    const key = `${this.meta.key}-${action}`;
    if (this.scene.anims.exists(key) && this.sprite.anims.getName() !== key) {
      this.sprite.anims.play(key, true);
    }
  }
}
