/* app/arcade/data/npcDialogues.ts
   – Updated for latest Avish's Arcade experience.
*/

export const npcDialogues = {
    /** 1️⃣  Spawn‑point guide */
    intro: [
      { speaker: "npc", text: "🎮 Welcome to *Avish’s Arcade*!" },
      { speaker: "npc", text: "Run ➡️, jump ⬆️, press E near signs to interact." },
      { speaker: "npc", text: "Each zone unlocks part of my dev journey." },
      { speaker: "npc", text: "Let’s roll—fun & facts ahead!" },
    ],
  
    /** 2️⃣  At the ‘About Me’ gate */
    aboutGate: [
      { speaker: "npc", text: "Ever met a dev with game?" },
      { speaker: "npc", text: "Spinning tech ring to shows my stack." },
      { speaker: "player", text: "TypeScript, Java, AWS… Looking sharp!" },
      { speaker: "npc", text: "I code it all—and play it cool. ➡️" },
    ],
  
    /** 3️⃣  Before Education zone */
    eduGate: [
      { speaker: "npc", text: "📚 Academia alert!" },
      { speaker: "npc", text: "Each pillar shows a milestone from my college life." },
      { speaker: "npc", text: "Bounce your way up to explore!" },
    ],
  
    /** 4️⃣  Before Experience zone */
    expGate: [
      { speaker: "npc", text: "Work mode: ON 🏢" },
      { speaker: "npc", text: "Land on each office to view past roles and highlights." },
      { speaker: "player", text: "Cloud-native + legacy teardown? 🔥" },
    ],
  
    /** 5️⃣  Removed ladder hint — no ladders now */
    ladderHint: [
      { speaker: "npc", text: "This message self-destructed. No ladders in this run!" },
    ],
  
    /** 6️⃣  Before Projects billboard */
    projGate: [
      { speaker: "npc", text: "🚀 Project Zone detected!" },
      { speaker: "npc", text: "Stand near the billboard & hover and click to browse my builds." },
      { speaker: "npc", text: "Preview live demos, GitHub links & more." },
    ],
  
    /** 7️⃣  Before Contact zone */
    contactGate: [
      { speaker: "npc", text: "Final stop—let’s connect 🤝" },
      { speaker: "npc", text: "Jump and hit a contact block to reach out (Mail, LinkedIn, GitHub)." },
      { speaker: "player", text: "Nothing like pixel-perfect networking!" },
    ],
  };
  