"use client";
import * as Phaser from "phaser";

export class SoundManager {
  private scene: Phaser.Scene;
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  private musicVolume: number = 0.3;
  private sfxVolume: number = 0.5;
  private muted: boolean = false; // <-- new

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
    // Music
    ['intro-music', 'game-music', 'victory-music'].forEach((key) => {
      this.sounds.set(key, this.scene.sound.add(key, {
        volume: this.musicVolume,
        loop: key !== 'victory-music'
      }));
    });

    // SFX
    ['jump-sfx', 'attack-sfx', 'npc-interact-sfx'].forEach((key) => {
      this.sounds.set(key, this.scene.sound.add(key, { volume: this.sfxVolume }));
    });

    // Apply mute if already muted
    this.applyMute();
  }

  /** --- MUSIC & SFX CONTROL --- */
  playMusic(key: string, fadeIn: boolean = true) {
    if (this.muted) return; // skip if muted
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
    if (this.muted) return;
    const sfx = this.sounds.get(key);
    if (sfx && !sfx.isPlaying) {
      sfx.play();
    }
  }

  stopAllMusic() {
    this.sounds.forEach((sound, key) => {
      if (key.includes('music') && sound.isPlaying) sound.stop();
    });
  }

  /** --- MUTE / UNMUTE --- */
  setMute(value: boolean) {
    this.muted = value;
    this.applyMute();
  }

  toggleMute() {
    this.muted = !this.muted;
    this.applyMute();
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  private applyMute() {
    this.sounds.forEach((sound) => {
      (sound as Phaser.Sound.WebAudioSound).setMute(this.muted);
    });
  }

  /** --- VOLUME CONTROL --- */
  setMusicVolume(volume: number) {
    this.musicVolume = volume;
    this.sounds.forEach((sound, key) => {
      if (key.includes('music')) (sound as Phaser.Sound.WebAudioSound).setVolume(volume);
    });
  }

  setSFXVolume(volume: number) {
    this.sfxVolume = volume;
    this.sounds.forEach((sound, key) => {
      if (key.includes('sfx')) (sound as Phaser.Sound.WebAudioSound).setVolume(volume);
    });
  }
}
