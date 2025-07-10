/* app/arcade/components/BillboardAsset.ts ──────────────────────────────
   Large 3D-styled billboard with glowing lights and 4 clickable project areas.
   Placement: Two rows (UL, UR, LL, LR). Includes a realistic support pole. */

   import * as Phaser from 'phaser';

   export class Billboard extends Phaser.GameObjects.Container {
     private projectZones: Phaser.GameObjects.Zone[] = [];
   
     constructor(
       scene: Phaser.Scene,
       x: number,
       y: number,
       projects: { title: string; url: string; imageKey: string }[]
     ) {
       super(scene, x, y);
       scene.add.existing(this);
       this.setDepth(5);
   
       const width = 600;
       const height = 420;
   
       // BACKGROUND PANEL (MAIN BILLBOARD BODY)
       const bg = scene.add.rectangle(0, 0, width, height, 0x1a1a1a)
         .setStrokeStyle(6, 0xffffff)
         .setOrigin(0.5);
       this.add(bg);
   
       // 3D EFFECT — LEFT EDGE
      //  const side = scene.add.rectangle(-width / 2 - 6, 0, 12, height, 0x333333)
      //    .setOrigin(1, 0.5);
      //  this.add(side);
   
       // SUPPORT POLE
       const pole = scene.add.rectangle(0, height / 2 + 42, 40, 77, 0x444444)
         .setOrigin(0.5);
       this.add(pole);
   
       // LIGHTS — TOP GLOWING BULBS
       for (let i = -2; i <= 2; i++) {
         const bulb = scene.add.ellipse(i * 100, -height / 2 - 20, 14, 14, 0xffcc00)
           .setStrokeStyle(2, 0xffffff)
           .setOrigin(0.5);
         this.add(bulb);
       }
   
       // TITLE
       const title = scene.add.text(0, -height / 2 + 20, 'PROJECTS', {
         fontFamily: 'PressStart2P',
         fontSize: '16px',
         color: '#ffffff',
       }).setOrigin(0.5);
       this.add(title);
   
       // PROJECT PANELS (UL, UR, LL, LR)
       const positions = [
         [-width / 4, -height / 4],
         [width / 4, -height / 4],
         [-width / 4, height / 4],
         [width / 4, height / 4],
       ];
   
       projects.slice(0, 4).forEach((proj, idx) => {
         const [px, py] = positions[idx];
   
         const panelContainer = scene.add.container(px, py);
         this.add(panelContainer);
   
         const panelBg = scene.add.rectangle(0, 0, 295, 205, 0x2e2e2e)
           .setStrokeStyle(3, 0xffffff)
           .setOrigin(0.5)
           .setInteractive({ useHandCursor: true });
         panelContainer.add(panelBg);
   
         // Project Image
         const image = scene.add.image(0, 0, proj.imageKey)
           .setDisplaySize(260, 160)
           .setOrigin(0.5)
           .setInteractive({ useHandCursor: true });
         panelContainer.add(image);
   
         // Optional: Add subtle fade or shadow overlay
         const overlay = scene.add.rectangle(0, 0, 260, 160, 0x000000, 0.25).setOrigin(0.5);
         panelContainer.add(overlay);
   
         // Hover zoom effect
         image.on('pointerover', () => {
           scene.tweens.add({
             targets: panelContainer,
             scale: 1.05,
             duration: 150,
             ease: 'Sine.easeOut',
           });
         });
         image.on('pointerout', () => {
           scene.tweens.add({
             targets: panelContainer,
             scale: 1,
             duration: 150,
             ease: 'Sine.easeIn',
           });
         });
   
         image.on('pointerdown', () => {
           window.open(proj.url, '_blank');
         });
   
         const zone = scene.add.zone(px, py, 260, 160).setOrigin(0.5);
         scene.physics.world.enable(zone);
         (zone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setImmovable(true);
         this.projectZones.push(zone);
   
         scene.input.enable(zone);
       });
     }
   
     public getZones() {
       return this.projectZones;
     }
   }