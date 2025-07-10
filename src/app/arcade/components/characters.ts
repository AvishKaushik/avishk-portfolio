/* app/arcade/characters.ts ──────────────────────────────────────────────
   Character catalogue (multi‑sheet edition).
   Each action (idle, run, jump…) has its own spritesheet PNG.
*/

export interface ActionSheet {
    /** filename path for the spritesheet */
    path: string;
    /** frame dimensions */
    frameWidth: number;
    frameHeight: number;
    /** animation frames in that sheet */
    start: number;
    end: number;
    frameRate: number;
  }
  
  export interface CharacterMeta {
    name: string;      // Menu label
    key: string;       // Unique id (used as prefix)
    actions: {
      idle: ActionSheet;
      run: ActionSheet;
      jump?: ActionSheet;
      attack?: ActionSheet;
      hurt?: ActionSheet;
      dead?: ActionSheet;
    };
  }
  
  export const characters: CharacterMeta[] = [
    {
      name: 'PixelHero',
      key: 'pixelHero',
      actions: {
        idle:   { path: '/game/assets/characters/pixelHero/idle.png',   frameWidth: 128, frameHeight: 128, start: 0, end: 5, frameRate: 6 },
        run:    { path: '/game/assets/characters/pixelHero/run.png',    frameWidth: 128, frameHeight: 128, start: 0, end: 8, frameRate: 8 },
        jump:   { path: '/game/assets/characters/pixelHero/jump.png',   frameWidth: 128, frameHeight: 128, start: 0, end: 12, frameRate: 12 },
        attack: { path: '/game/assets/characters/pixelHero/attack.png', frameWidth: 128, frameHeight: 128, start: 0, end: 6, frameRate: 6 },
        hurt:   { path: '/game/assets/characters/pixelHero/hurt.png',   frameWidth: 128, frameHeight: 128, start: 0, end: 2, frameRate: 2 },
        dead:   { path: '/game/assets/characters/pixelHero/dead.png',   frameWidth: 128, frameHeight: 128, start: 0, end: 3, frameRate: 3 },
      },
    },
  ];
  
  /* Helper functions -----------------------------------------------------*/
  
  /** Preload all spritesheets for every character. Call inside PreloadScene */
  export function preloadCharacterSheets(scene: Phaser.Scene) {
    characters.forEach((char) => {
      Object.entries(char.actions).forEach(([action, sheet]) => {
        const sheetKey = `${char.key}-${action}`;
        if (!scene.textures.exists(sheetKey)) {
          scene.load.spritesheet(sheetKey, sheet.path, {
            frameWidth: sheet.frameWidth,
            frameHeight: sheet.frameHeight,
          });
        }
      });
    });
  }
  
  /** Create Phaser animations once (idempotent). Call in Scene.create() */
  export function createCharacterAnimations(scene: Phaser.Scene) {
    characters.forEach((char) => {
      Object.entries(char.actions).forEach(([action, sheet]) => {
        const animKey = `${char.key}-${action}`;
        const sheetKey = `${char.key}-${action}`;
        if (!scene.anims.exists(animKey)) {
          scene.anims.create({
            key: animKey,
            frames: scene.anims.generateFrameNumbers(sheetKey, {
              start: sheet.start,
              end: sheet.end,
            }),
            frameRate: sheet.frameRate,
            repeat: action === 'dead' || action === 'attack' ? 0 : -1, // dead plays once, others loop
          });
        }
      });
    });
  }
  