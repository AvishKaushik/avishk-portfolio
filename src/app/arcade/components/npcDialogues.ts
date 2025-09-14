/* app/arcade/data/npcDialogues.ts
   – Updated for Avish’s Arcade latest run.
*/

export const npcDialogues = {
  /** 1️⃣  Spawn-point guide */
  intro: [
    { speaker: "npc", text: "🎮 Welcome to *Avish’s Arcade*!" },
    { speaker: "npc", text: "Move with the arrow keys ⬅️➡️⬆️⬇️." },
    {
      speaker: "npc",
      text: "Press **E** to interact, **X** to swing your sword.",
    },
    { speaker: "npc", text: "Adventure ahead—let’s level up my story!" },
  ],

  /** 2️⃣  At the ‘About Me’ chest */
  aboutGate: [
    { speaker: "npc", text: "💡 Curious about my skills?" },
    { speaker: "npc", text: "Press **E** to open this chest and reveal them." },
    { speaker: "player", text: "Nice! Full stack unlocked." },
  ],

  /** 3️⃣  Before Education zone */
  eduGate: [
    {
      speaker: "npc",
      text: "📚 Behold the *3 Pillars of Education* I pursued.",
    },
    { speaker: "npc", text: "Step up to each pillar to see a milestone." },
  ],

  /** 4️⃣  Before Experience zone */
  expGate: [
    { speaker: "npc", text: "🏢 Work Mode engaged!" },
    {
      speaker: "npc",
      text: "The billboard near the office shows my work experience.",
    },
    {
      speaker: "player",
      text: "From legacy teardown to cloud-native builds—got it!",
    },
  ],

  /** 5️⃣  Transition hint */
  ladderHint: [
    { speaker: "npc", text: "⬇️ Head below to move forward in the journey." },
  ],

  /** 6️⃣  Before Projects billboard */
  projGate: [
    { speaker: "npc", text: "🚀 Project Zone incoming!" },
    {
      speaker: "npc",
      text: "The billboard lists 4 projects—hover or click to explore.",
    },
    { speaker: "npc", text: "Live demos & GitHub links await." },
  ],

  /** 7️⃣  Before Contact zone */
  contactGate: [
    { speaker: "npc", text: "🎯 Final stop—Social Zone!" },
    {
      speaker: "npc",
      text: "Jump & hit the social bricks to open my profiles.",
    },
    { speaker: "player", text: "Pixel-perfect networking unlocked!" },
  ],
};
