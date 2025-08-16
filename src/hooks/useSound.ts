import { useCallback, useRef } from 'react';

interface SoundOptions {
  volume?: number;
  playbackRate?: number;
}

export const useSound = (src: string, options: SoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.volume = options.volume ?? 0.5;
        audioRef.current.playbackRate = options.playbackRate ?? 1;
      }
      
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Silently handle autoplay restrictions
      });
    } catch (error) {
      // Silently handle audio errors
      console.log(error)
    }
  }, [src, options.volume, options.playbackRate]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};