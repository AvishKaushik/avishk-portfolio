# Arcade Mode - Portfolio Game

A modular, responsive 2D platformer game built with Phaser.js that showcases your portfolio in an interactive way.

## 🏗️ Architecture

The codebase is now organized into modular components for better maintainability:

### 📁 File Structure

```
src/app/arcade/
├── components/           # Reusable game components
│   ├── Background.ts     # Background and particle systems
│   ├── CoinSystem.ts     # Coin collection and effects
│   ├── DialogueBox.ts    # Responsive dialogue UI
│   ├── MobileControls.ts # Touch controls for mobile
│   ├── Player.ts         # Player logic and animations
│   └── SectionManager.ts # Section creation and management
├── scenes/               # Phaser game scenes
│   ├── LandingScene.ts   # Title screen
│   ├── PreloadScene.ts   # Asset loading
│   └── StageScene.ts     # Main gameplay
├── config/               # Game configuration
│   └── GameConfig.ts     # Centralized game settings
├── sections/             # Portfolio content sections
│   ├── about.tsx         # About section
│   ├── education.tsx     # Education section
│   ├── experience.tsx    # Experience section
│   ├── projects.tsx      # Projects section
│   ├── contact.tsx       # Contact section
│   ├── types.ts          # Section type definitions
│   └── index.ts          # Section exports
└── page.tsx              # Main game component
```

## 🎮 Features

### ✅ Implemented
- **Modular Architecture**: Clean separation of concerns
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Mobile Controls**: Touch-based D-pad for mobile devices
- **Enhanced Visuals**: Particle effects, glowing text, animations
- **Coin System**: Collectible coins with effects
- **Dialogue System**: Responsive NPC dialogue boxes
- **Parallax Background**: Multi-layer scrolling backgrounds

### 🚧 Planned Features
- **Section-Specific Assets**: Different backgrounds and decorations per section
- **Tech Stack Tiles**: Animated tiles representing your skills
- **Dark/Night Mode**: Alternative theme with stars
- **Sound Effects**: Audio feedback for interactions
- **Mini-Games**: Interactive elements in each section

## 🛠️ Development

### Adding New Sections
1. Create a new section file in `sections/`
2. Follow the `SectionDef` interface
3. Add to `sections/index.ts`
4. The game will automatically include it

### Modifying Visuals
- **Backgrounds**: Edit `Background.ts`
- **Particles**: Modify particle systems in `Background.ts`
- **Colors**: Update `GameConfig.ts`
- **Animations**: Adjust in respective component files

### Adding Mobile Features
- **Controls**: Modify `MobileControls.ts`
- **Responsive UI**: Update `DialogueBox.ts` styles
- **Touch Events**: Add to relevant components

### Configuration
All game settings are centralized in `GameConfig.ts`:
- Level dimensions
- Player physics
- Visual settings
- Responsive breakpoints
- Colors and fonts

## 📱 Responsive Design

The game automatically adapts to different screen sizes:
- **Desktop**: Full keyboard controls
- **Tablet**: Touch controls with larger UI
- **Mobile**: Optimized touch controls and smaller UI

## 🎨 Customization

### Colors and Themes
Edit `GameConfig.ts` to change:
- Background colors
- Text colors
- NPC colors
- Glow effects

### Section Content
Each section can have:
- Custom NPC messages
- Section-specific assets
- Unique decorations
- Interactive elements

### Visual Effects
- Particle systems
- Screen shake
- Glow effects
- Animations

## 🔧 Technical Notes

### Performance
- Modular components reduce bundle size
- Lazy loading of Phaser.js
- Efficient particle systems
- Optimized mobile controls

### Browser Support
- Modern browsers with ES6+ support
- Touch devices for mobile controls
- Responsive design for all screen sizes

### Future Enhancements
- WebGL optimizations
- Progressive loading
- Offline support
- Analytics integration

## 🚀 Getting Started

1. The game loads automatically when visiting `/arcade`
2. Use arrow keys or WASD to move
3. Jump with spacebar or up arrow
4. Collect coins for visual effects
5. Approach NPCs to see portfolio information
6. On mobile, use the on-screen D-pad

## 📝 Contributing

When adding new features:
1. Follow the modular structure
2. Update this README
3. Test on multiple devices
4. Maintain responsive design
5. Keep performance in mind 