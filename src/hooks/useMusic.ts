import { useState, useEffect, useCallback, useRef } from 'react';

export const useMusic = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingBeforeExternalPause = useRef(false);

  useEffect(() => {
    const newAudio = new Audio(url);
    newAudio.loop = true;
    setAudio(newAudio);

    // Jika sedang memutar lagu dan URL diubah, langsung mainkan lagu yang baru
    if (isPlaying) {
      newAudio.play().catch((err) => console.error('Audio play error on change:', err));
    }

    return () => {
      newAudio.pause();
      newAudio.src = '';
    };
  }, [url]);

  const toggle = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      wasPlayingBeforeExternalPause.current = false;
    } else {
      audio.play().catch((err) => console.error('Audio play error:', err));
      setIsPlaying(true);
    }
  }, [audio, isPlaying]);

  const play = useCallback(() => {
    if (!audio) return;
    audio.play().catch((err) => console.error('Audio play error:', err));
    setIsPlaying(true);
  }, [audio]);

  const pause = useCallback(() => {
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, [audio]);

  // Efek untuk mengontrol musik dari luar (misalnya saat memutar video pre-wedding)
  useEffect(() => {
    const handleExternalPause = () => {
      if (audio && isPlaying) {
        audio.pause();
        setIsPlaying(false);
        wasPlayingBeforeExternalPause.current = true;
      }
    };

    const handleExternalPlay = () => {
      if (audio && wasPlayingBeforeExternalPause.current) {
        audio.play().catch((err) => console.error('Audio play error on resume:', err));
        setIsPlaying(true);
        wasPlayingBeforeExternalPause.current = false;
      }
    };

    window.addEventListener('pauseBackgroundMusic', handleExternalPause);
    window.addEventListener('playBackgroundMusic', handleExternalPlay);

    return () => {
      window.removeEventListener('pauseBackgroundMusic', handleExternalPause);
      window.removeEventListener('playBackgroundMusic', handleExternalPlay);
    };
  }, [audio, isPlaying]);

  return { isPlaying, toggle, play, pause };
};

