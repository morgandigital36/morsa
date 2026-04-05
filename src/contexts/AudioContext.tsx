import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { MurottalSurah } from '../services/api/murottal.service';

interface AudioContextType {
  currentSurah: MurottalSurah | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playSurah: (surah: MurottalSurah) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  handleSeek: (time: number) => void;
  setSurahs: (surahs: MurottalSurah[]) => void;
  surahs: MurottalSurah[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [currentSurah, setCurrentSurah] = useState<MurottalSurah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [surahs, setSurahs] = useState<MurottalSurah[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSurah = (surah: MurottalSurah) => {
    if (!audioRef.current) return;

    setCurrentSurah(surah);
    audioRef.current.src = surah.audio;
    audioRef.current.load();

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    });
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSurah) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const playNext = () => {
    if (!currentSurah || surahs.length === 0) return;
    const currentIndex = surahs.findIndex(s => s.nomor === currentSurah.nomor);
    const nextIndex = (currentIndex + 1) % surahs.length;
    playSurah(surahs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSurah || surahs.length === 0) return;
    const currentIndex = surahs.findIndex(s => s.nomor === currentSurah.nomor);
    const prevIndex = currentIndex === 0 ? surahs.length - 1 : currentIndex - 1;
    playSurah(surahs[prevIndex]);
  };

  const handleSeek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSurah,
        isPlaying,
        currentTime,
        duration,
        playSurah,
        togglePlayPause,
        playNext,
        playPrevious,
        handleSeek,
        setSurahs,
        surahs,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
