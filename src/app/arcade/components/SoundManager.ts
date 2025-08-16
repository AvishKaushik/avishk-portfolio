"use client";
import * as Phaser from "phaser";

export class SoundManager {
  private scene: Phaser.Scene;
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  private musicVolume: number = 0.3;
  private sfxVolume: number = 0.5;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preloadSounds() {
    // Music
    this.scene.load.audio('intro-music', '/game/sounds/intro-music.mp3');
    this.scene.load.audio('game-music', '/game/sounds/game-music.mp3');
    this.scene.load.audio('victory-music', '/game/sounds/victory.mp3');
    
    // Sound effects
    this.scene.load.audio('jump-sfx', '/game/sounds/jump.mp3');
    this.scene.load.audio('attack-sfx', '/game/sounds/attack.mp3');
    this.scene.load.audio('npc-interact-sfx', '/game/sounds/npc-interact.mp3');
  }

  createSounds() {
    // Create music tracks
    this.sounds.set('intro-music', this.scene.sound.add('intro-music', { 
      volume: this.musicVolume, 
      loop: true 
    }));
    
    this.sounds.set('game-music', this.scene.sound.add('game-music', { 
      volume: this.musicVolume, 
      loop: true 
    }));
    
    this.sounds.set('victory-music', this.scene.sound.add('victory-music', { 
      volume: this.musicVolume, 
      loop: false 
    }));

    // Create sound effects
    this.sounds.set('jump-sfx', this.scene.sound.add('jump-sfx', { 
      volume: this.sfxVolume 
    }));
    
    this.sounds.set('attack-sfx', this.scene.sound.add('attack-sfx', { 
      volume: this.sfxVolume 
    }));
    
    this.sounds.set('npc-interact-sfx', this.scene.sound.add('npc-interact-sfx', { 
      volume: this.sfxVolume 
    }));
  }

  playMusic(key: string, fadeIn: boolean = true) {
    // Stop current music
    this.stopAllMusic();
    
    const music = this.sounds.get(key);
    if (music) {
      if (fadeIn) {
        music.play();
        this.scene.tweens.add({
          targets: music,
          volume: this.musicVolume,
          duration: 1000,
          ease: 'Power2'
        });
      } else {
        music.play();
      }
    }
  }

  playSFX(key: string) {
    const sfx = this.sounds.get(key);
    if (sfx && !sfx.isPlaying) {
      sfx.play();
    }
  }

  stopAllMusic() {
    this.sounds.forEach((sound, key) => {
      if (key.includes('music') && sound.isPlaying) {
        sound.stop();
      }
    });
  }

  fadeOutMusic(duration: number = 1000) {
    this.sounds.forEach((sound, key) => {
      if (key.includes('music') && sound.isPlaying) {
        this.scene.tweens.add({
          targets: sound,
          volume: 0,
          duration: duration,
          ease: 'Power2',
          onComplete: () => sound.stop()
        });
      }
    });
  }

  setMusicVolume(volume: number) {
    this.musicVolume = volume;
    this.sounds.forEach((sound, key) => {
      if (key.includes('music')) {
        (sound as Phaser.Sound.WebAudioSound).setVolume(volume);
      }
    });
  }

  setSFXVolume(volume: number) {
    this.sfxVolume = volume;
    this.sounds.forEach((sound, key) => {
      if (key.includes('sfx')) {
        (sound as Phaser.Sound.WebAudioSound).setVolume(volume);
      }
    });
  }
}