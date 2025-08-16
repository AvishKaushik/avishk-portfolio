"use client";
import * as Phaser from "phaser";

import { Player } from "../components/Player";
import { Background } from "../components/Background";
import { TechRing } from "@/app/arcade/components/TechRing";
import { IdleNPC } from "../components/IdleNPC";
import { npcDialogues } from "../components/npcDialogues";
import { ChestAsset } from "../components/ChestAsset";
import { Billboard } from "../components/Billboard";
import { ExperienceBoard } from "../components/ExperienceBoard";
import { SectionSign } from "../components/SectionSign";
import { EducationPodium } from "../components/EducationPodium";
import { SpecialLinkBrick } from "../components/SpecialLinkBrick";
import { SoundManager } from "../components/SoundManager";

export class StageScene extends Phaser.Scene {
  private player!: Player;
  private background!: Background;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private soundManager!: SoundManager;

  private readonly LEVEL_WIDTH = 10000;

  constructor() {
    super("Stage");
  }

  init(data: { soundManager: SoundManager }) {
    if (data.soundManager) {
      this.soundManager = data.soundManager;
    } else {
      // Fallback: create a new SoundManager if none passed
      this.soundManager = new SoundManager(this);
      this.soundManager.createSounds();
    }
  }

  create() {
    this.soundManager.createSounds();
    this.soundManager?.stopAllMusic();
    this.soundManager.playMusic("game-music");
    const { height } = this.scale;

    const ring = new TechRing(
      this,
      2200,
      height - 600,
      ["C++", "Java", "Python", "Typescript", "Springboot"],
      { speed: 0.002 }
    );
    const ring2 = new TechRing(
      this,
      2200,
      height - 600,
      [
        "AWS",
        "Azure",
        "Jenkins",
        "Postgre",
        "Docker",
        "Angular",
        "React",
        "Github",
      ],
      { radius: 210, clockwise: false, size: 40, speed: 0.002 }
    );
    this.add.existing(ring);
    this.add.existing(ring2);
    this.events.on("update", () => ring.update());
    this.events.on("update", () => ring2.update());

    // Set up physics world
    this.physics.world.setBounds(0, 0, this.LEVEL_WIDTH, height);
    this.cameras.main.setBounds(0, 0, this.LEVEL_WIDTH, height);

    // Create background
    this.background = new Background(this, this.LEVEL_WIDTH);
    this.background.create();

    // Create ground and platforms
    this.createGroundAndPlatforms(height);

    // Create player with a small delay to ensure assets are ready
    this.time.delayedCall(100, () => {
      // createCharacterAnimations(this); // once per scene

      // Pick a character
      const groundY = height - 200; // adjust so feet touch tiles
      // this.player = new Player(this, 200, groundY, "pixelHero");
      this.player = new Player(this, 9000, height - 1000, "pixelHero", this.soundManager);
      const playerSprite = this.player.getSprite();
      const skills = [
        { name: "Java", score: 5 },
        { name: "ReactJS", score: 4 },
        { name: "Python", score: 3 },
        { name: "AWS", score: 4 },
      ];

      new ChestAsset(
        this,
        1800, // x position in About zone
        height - 224, // y (on ground)
        playerSprite,
        skills
      );

      const experienceData = [
        {
          title: "Software Engineer",
          company: "Societe Generale",
          duration: "Jul 2021 – Jul 2024",
          tech: "Java, React, Docker",
          desc: "Migrated legacy systems.\nBuilt automation tools.",
        },
        {
          title: "Frontend Intern",
          company: "EduTech Inc.",
          duration: "Jan 2021 – Jun 2021",
          tech: "React, TypeScript",
          desc: "Designed dashboard for students & teachers.",
        },
        {
          title: "Frontend Intern",
          company: "EduTech Inc.",
          duration: "Jan 2021 – Jun 2021",
          tech: "React, TypeScript",
          desc: "Designed dashboard for students & teachers.",
        },
      ];

      new ExperienceBoard(this, 4650, height - 700, experienceData);

      new Billboard(this, 6800, groundY - 184, [
        {
          title: "IntelliView",
          url: "https://intelliview-frontend.vercel.app/",
          imageKey: "intelliview",
        },
        {
          title: "Eduhub",
          url: "https://avishkaushik.github.io/EduHub/",
          imageKey: "eduhub",
        },
        {
          title: "SDG3 Classifier",
          url: "https://sdg3-classifier.vercel.app/",
          imageKey: "sdg3",
        },
        {
          title: "Portfolio v3",
          url: "#",
          imageKey: "portfolio",
        },
      ]);

      new SectionSign(this, 1570, groundY - 22, "ABOUT", 1.2);
      new SectionSign(this, 2900, groundY - 150, "EDUCATION", 1.2);
      new SectionSign(this, 4270, groundY - 278, "EXPERIENCE", 1.2);
      new SectionSign(this, 6050, groundY + 106, "PROJECTS", 1.2);
      new SectionSign(this, 7500, groundY + 106, "CONTACT", 1.2);

      const educationList = [
        {
          degree: "12th Grade",
          school: "St. Theresa School",
          year: "2018",
          score: "84.8%",
        },
        {
          degree: "B.Tech CSE",
          school: "VIT Bhopal",
          year: "2018–2022",
          score: "9.06 CGPA",
        },
        {
          degree: "MS CS",
          school: "George Washington Univ.",
          year: "2024–2026",
          score: "GPA 3.9",
        },
      ];

      const eduDisplay = new EducationPodium(
        this,
        3400,
        height - 283,
        educationList
      );
      this.add.existing(eduDisplay);

      this.add
        .image(4900, height - 930, "sg")
        .setOrigin(0)
        .setScrollFactor(1) // makes it stay fixed on screen
        .setDepth(-10);

      // NPC SECTION
      const introNPC = new IdleNPC(
        this,
        400,
        height - 96,
        "intro_npc",
        npcDialogues.intro,
        this.soundManager
      );
      introNPC.setPlayer(playerSprite);

      // 2. About gate NPC before tech ring
      const aboutNPC = new IdleNPC(
        this,
        1440,
        height - 224,
        "about_npc",
        npcDialogues.aboutGate,
        this.soundManager
      );
      aboutNPC.setPlayer(playerSprite);

      // 3. Education gate
      const eduNPC = new IdleNPC(
        this,
        2784,
        height - 352,
        "education_npc",
        npcDialogues.eduGate,
        this.soundManager
      );
      eduNPC.setPlayer(playerSprite);

      // 4. Experience gate
      const expNPC = new IdleNPC(
        this,
        4160,
        height - 480,
        "exp_npc",
        npcDialogues.expGate,
        this.soundManager
      );
      expNPC.setPlayer(playerSprite);

      // 5. Ladder informant near ladder zone
      const ladderNPC = new IdleNPC(
        this,
        5860,
        height - 480,
        "ladder_npc",
        npcDialogues.ladderHint,
        this.soundManager
      );
      ladderNPC.setPlayer(playerSprite);

      // 6. Projects billboard greeter
      const projNPC = new IdleNPC(
        this,
        6180,
        height - 96,
        "project_npc",
        npcDialogues.projGate,
        this.soundManager
      );
      projNPC.setPlayer(playerSprite);

      // 7. Contact zone NPC
      const contactNPC = new IdleNPC(
        this,
        7620,
        height - 96,
        "contact_npc",
        npcDialogues.contactGate,
        this.soundManager
      );
      contactNPC.setPlayer(playerSprite);
      const contactBricks = [
        {
          x: 7950,
          y: height - 280,
          url: "mailto:avish.kaushik@gwu.edu",
          label: "mail",
        },
        {
          x: 8200,
          y: height - 280,
          url: "https://github.com/AvishKaushik",
          label: "github",
        },
        {
          x: 8450,
          y: height - 280,
          url: "https://linkedin.com/in/AvishKaushik",
          label: "linkedin",
        },
      ];

      // const endZone = new EndZone(this, 9000, height - 96, this.soundManager);
      // endZone.setupOverlap(playerSprite);


      contactBricks.forEach(({ x, y, url, label }) => {
        const brick = new SpecialLinkBrick(this, x, y, url, label);
        brick.setupOverlap(playerSprite); // Setup head-hit detection
      });

      // NPC SECTION END

      this.physics.add.collider(
        playerSprite,
        ring.getPhysicsGroup(),
        (playerObj) => {
          const player = playerObj as Phaser.Physics.Arcade.Sprite;
          if (!player.body || !player.body.touching.down) return;

          const { angularSpeed, radius } = ring.getAngularVelocityInfo();
          const dx = player.x - ring.x;
          const dy = player.y - ring.y;
          const angle = Math.atan2(dy, dx) + Math.PI / 2;

          const vx = angularSpeed * radius * Math.cos(angle);
          // Optionally limit the velocity
          player.setVelocityX(Phaser.Math.Clamp(vx, -60, 60));
        }
      );

      this.physics.add.collider(
        playerSprite,
        ring2.getPhysicsGroup(),
        (playerObj) => {
          const player = playerObj as Phaser.Physics.Arcade.Sprite;
          if (!player.body || !player.body.touching.down) return;

          const { angularSpeed, radius } = ring2.getAngularVelocityInfo();
          const dx = player.x - ring2.x;
          const dy = player.y - ring2.y;
          const angle = Math.atan2(dy, dx) + Math.PI / 2;

          const vx = angularSpeed * radius * Math.cos(angle);
          // Optionally limit the velocity
          player.setVelocityX(Phaser.Math.Clamp(vx, -60, 60));
        }
      );

      // Set up camera to follow player horizontally only
      this.cameras.main.startFollow(playerSprite, true, 0.08, 0.01);
      this.cameras.main.roundPixels = true;

      // Set a large deadzone for vertical movement to prevent camera bounce
      this.cameras.main.setDeadzone(200, height);

      // Ensure camera stays within world bounds
      this.cameras.main.setBounds(0, 0, this.LEVEL_WIDTH, height);

      // Set camera zoom to 1 (no zoom)
      this.cameras.main.setZoom(1);

      // Set up collisions
      this.physics.add.collider(playerSprite, this.ground);
      this.physics.add.collider(playerSprite, this.platforms);

      // Store player reference for external access
      this.registry.set("player", playerSprite);
    });
  }

  private createGroundAndPlatforms(height: number) {
    const heights = [
      16, 48, 80, 112, 144, 176, 208, 240, 272, 304, 336, 368, 400, 432, 464,
    ];
    const rng = [
      [0, this.LEVEL_WIDTH, 0, this.LEVEL_WIDTH],
      [0, this.LEVEL_WIDTH, 0, this.LEVEL_WIDTH],
      [0, this.LEVEL_WIDTH, 1280, 5600],
      [1280, 5601, 1312, 5601],
      [1312, 5601, 1344, 5601],
      [1344, 5601, 1376, 5601],
      [1376, 5601, 2624, 5601],
      [2624, 5601, 2656, 5601],
      [2656, 5601, 2688, 5601],
      [2688, 5601, 2720, 5601],
      [2720, 5601, 4000, 5601],
      [4000, 5601, 4032, 5601],
      [4032, 5601, 4064, 5601],
      [4064, 5601, 4096, 5601],
      [4096, 5601, 5601, 5601],
    ];
    this.ground = this.physics.add.staticGroup();
    for (let i = 0; i < heights.length; i++) {
      const h = heights[i];
      for (let x = rng[i][0]; x < rng[i][1]; x += 32) {
        if (x < rng[i][2] || x > rng[i][3])
          this.ground.create(x, height - h, "tiles2").refreshBody();
        else {
          this.ground.create(x, height - h, "tiles").refreshBody();
        }
      }
    }

    for (let x = 5696; x < 6208; x += 32) {
      this.ground.create(x, height - 464, "tiles2").refreshBody();
    }
    for (let x = 464; x < 3400; x += 32) {
      this.ground.create(6208, height - x, "tiles").refreshBody();
    }
    this.ground.create(5632, height - 368, "tiles2").refreshBody();
    this.ground.create(5664, height - 336, "tiles2").refreshBody();
    this.ground.create(5696, height - 304, "tiles2").refreshBody();
    this.ground.create(5728, height - 272, "tiles2").refreshBody();
    this.ground.create(5760, height - 240, "tiles2").refreshBody();
    this.ground.create(5792, height - 208, "tiles2").refreshBody();
    this.ground.create(5824, height - 176, "tiles2").refreshBody();
    this.ground.create(5856, height - 144, "tiles2").refreshBody();
    this.ground.create(5888, height - 112, "tiles2").refreshBody();
  }

  update() {
    if (this.player) {
      this.player.update();
    }
  }
}
