"use client";

export const GameConfig = {
  // Level settings
  LEVEL_WIDTH: 4500,
  PLAYER_START_X: 64,
  PLAYER_SPEED: 660,
  PLAYER_JUMP_VELOCITY: -1960,
  GRAVITY: 980,
  
  // Coin positions
  COIN_POSITIONS: [
    [400, 0], // Will be adjusted with screen height
    [800, 0],
    [1400, 0],
    [2000, 0],
    [2800, 0],
    [3200, 0],
  ],
  
  // Platform positions
  PLATFORM_POSITIONS: [
    [300, -120],
    [650, -180],
    [1200, -220],
    [1800, -150],
    [2500, -200],
  ],
  
  // Section spacing (distance between sections)
  SECTION_SPACING: 800,
  
  // Visual settings
  PARTICLE_FREQUENCY: 300,
  CLOUD_COUNT: 8,
  BACKGROUND_SCROLL_SPEED: {
    CLOUDS: 10000,
    MOUNTAINS: 15000,
  },
  
  // Responsive breakpoints
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
  },
  
  // Colors
  COLORS: {
    PRIMARY: "#5c94fc",
    SECONDARY: "#4a7bc8",
    TEXT: "#fff",
    GLOW: "#ffff00",
    NPC_COLORS: ["#fff", "#ff0", "#0ff", "#f0f", "#ff6b6b"],
  },
  
  // Fonts
  FONTS: {
    PRIMARY: "PressStart2P, monospace",
    SIZES: {
      TITLE: "32px",
      SUBTITLE: "16px",
      BODY: "12px",
      NPC: "16px",
    },
  },
} as const; 