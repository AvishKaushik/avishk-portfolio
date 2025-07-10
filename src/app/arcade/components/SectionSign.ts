/* app/arcade/components/SectionSign.ts
   Reusable section signboard with label text on top of 'sign.png'.
*/

import * as Phaser from "phaser";

export class SectionSign extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    scale = 1
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setDepth(10); // above terrain

    const sign = scene.add
      .image(0, 0, "sign")
      .setOrigin(0.5, 1)
      .setScale(scale);

    const text = scene.add
      .text(0, -sign.displayHeight + 60, label, {
        fontFamily: '"PressStart2P"',
        fontSize: `${14 * scale}px`, // slightly larger
        color: "#ffffff", // white text
        align: "center",
        stroke: "#000000", // black outline
        strokeThickness: 3,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 2,
          fill: true,
        },
        wordWrap: { width: sign.displayWidth - 20 },
      })
      .setOrigin(0.5, 0);

    this.add([sign, text]);
  }
}
