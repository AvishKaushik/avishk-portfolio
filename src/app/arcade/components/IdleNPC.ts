/* app/arcade/components/IdleNPC.ts – v2
   Static NPC that speaks once when player ENTERS range; stays quiet until
   player EXITS and re‑enters. Uses SpeechBubble for minimal UI. */

import * as Phaser from "phaser";
import { SpeechBubble } from "./SpeechBubble";

export interface DialogueLine {
  speaker: "npc" | "player";
  text: string;
}

export class IdleNPC {
  private scene: Phaser.Scene;
  private sprite: Phaser.GameObjects.Sprite;
  private zone: Phaser.GameObjects.Zone;
  private player!: Phaser.Physics.Arcade.Sprite;

  private bubble?: SpeechBubble;
  private lines: { speaker: string; text: string; }[];
  private index = 0;

  private isPlayerNear = false; // true while overlapping
  private inConversation = false; // true while dialogue running

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    lines: { speaker: string; text: string; }[],
    faceLeft: boolean = false // ⬅️ new optional param
  ) {
    this.scene = scene;
    this.lines = lines;

    // NPC sprite (idle frame)
    this.sprite = scene.add.sprite(x, y, texture).setOrigin(0.5, 1);
    this.sprite.anims.play("npc-idle-loop");
    if (faceLeft) this.sprite.setFlipX(true);

    // Invisible proximity zone
    this.zone = scene.add.zone(x, y - 32, 90, 140);
    scene.physics.world.enable(this.zone, Phaser.Physics.Arcade.STATIC_BODY);

    // Hook into scene update loop to manage enter/exit detection
    scene.events.on("update", this.update, this);
  }

  /** Wire the player so we can test overlap each frame */
  setPlayer(player: Phaser.Physics.Arcade.Sprite) {
    this.player = player;
  }

  private update() {
    if (!this.player) return;

    const dx = this.player.x - this.sprite.x;
    if (Math.abs(dx) > 4) {
      this.sprite.setFlipX(dx < 0); // face left if player is left
    }

    const overlapping = this.scene.physics.overlap(this.player, this.zone);

    // Player just entered zone
    if (overlapping && !this.isPlayerNear) {
      this.isPlayerNear = true;
      if (!this.inConversation) this.startConversation();
    }

    // Player just left zone
    if (!overlapping && this.isPlayerNear) {
      this.isPlayerNear = false;
      if (this.inConversation) this.endConversation();
    }
  }

  private startConversation() {
    this.inConversation = true;
    this.index = 0;
    this.showNextLine();
  }

  private showNextLine() {
    if (!this.inConversation) return;

    if (this.index >= this.lines.length) {
      this.endConversation();
      return;
    }

    // Destroy previous bubble
    this.bubble?.hide();

    const line = this.lines[this.index++];
    const speakerObj = line.speaker === "npc" ? this.sprite : this.player;

    this.bubble = new SpeechBubble(this.scene, speakerObj.x, line.speaker === "npc" ? speakerObj.y - 115 : speakerObj.y - 53);
    this.bubble.typeText(line.text);

    const delay = Math.max(1200, (line.text.length * 40) + 300);
    this.scene.time.delayedCall(delay, () => this.showNextLine());
  }

  private endConversation() {
    this.bubble?.hide();
    this.inConversation = false;
  }
}
