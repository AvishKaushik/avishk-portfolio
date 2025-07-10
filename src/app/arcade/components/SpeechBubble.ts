/* app/arcade/components/SpeechBubble.ts ─────────────────────────────
   Reusable speech bubble with typing animation.
   Style update: white background, black border, larger font, black text. */

   import * as Phaser from 'phaser';

   export class SpeechBubble extends Phaser.GameObjects.Container {
     private box: Phaser.GameObjects.Graphics;
     private textObj: Phaser.GameObjects.Text;
     private typingTimer?: Phaser.Time.TimerEvent;
   
     constructor(scene: Phaser.Scene, x: number, y: number, width = 200) {
       super(scene, x, y);
       scene.add.existing(this);
       this.setDepth(1000);
   
       // Draw bubble background + border
       this.box = scene.add.graphics();
       const bgColor = 0xffffff; // white
       const borderColor = 0x000000; // black
       const radius = 8;
   
       this.box.fillStyle(bgColor, 1);
       this.box.lineStyle(2, borderColor, 1);
       this.box.fillRoundedRect(-width / 2, -52, width, 60, radius);
       this.box.strokeRoundedRect(-width / 2, -52, width, 60, radius);
   
       // Pointer triangle
       this.box.fillTriangle(-10, 8, 0, 26, 10, 8);
       this.box.beginPath();
       this.box.moveTo(-10, 8);
       this.box.lineTo(0, 26);
       this.box.lineTo(10, 8);
       this.box.closePath();
       this.box.strokePath();
   
       this.add(this.box);
   
       // Text
       this.textObj = scene.add.text(0, -44, '', {
         fontFamily: '"PressStart2P"',
         fontSize: '14px', // larger font
         color: '#000000', // black text
         wordWrap: { width: width - 24 },
         lineSpacing: 2,
       }).setOrigin(0.5, 0);
       this.add(this.textObj);
     }
   
     /** Type out text with character delay (ms). */
     typeText(full: string, speed = 18) {
       this.textObj.setText('');
       let idx = 0;
       this.typingTimer?.remove(false);
       this.typingTimer = this.scene.time.addEvent({
         delay: speed,
         repeat: full.length - 1,
         callback: () => {
           this.textObj.setText(full.slice(0, ++idx));
         },
       });
     }
   
     /** Cleanly destroy bubble */
     hide() {
       this.typingTimer?.remove(false);
       this.destroy();
     }
   }
   