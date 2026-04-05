import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { MurottalSurah } from '../services/api/murottal.service';

interface AudioContextType {
  currentSurah: MurottalSurah | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  playSurah: (surah: MurottalSurah) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  playNext: () => void;
  playPrevious: () => void;
  handleSeek: (time: number) => Promise<void>;
  setSurahs: (surahs: MurottalSurah[]) => void;
  surahs: MurottalSurah[];
  stop: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [surahs, setSurahs] = useState<MurottalSurah[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Configure audio mode on mount
  useEffect(() => {
    configureAudio();
    return () => {
      // Cleanup on unmount
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const configureAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.error('Error configuring audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error('Playback error:', status.error);
        setIsLoading(false);
        setIsPlaying(false);
      }
      return;
    }

    setIsPlaying(status.isPlaying);
    setIsLoading(status.isBuffering);
    setCurrentTime(status.positionMillis / 1000);
    
    if (status.durationMillis) {
      setDuration(status.durationMillis / 1000);
    }

    // Auto play next when current finishes
    if (status.didJustFinish && !status.isLooping) {
      playNext();
    }
  };

  const playSurah = async (surah: MurottalSurah) => {
    try {
      setIsLoading(true);

      // Unload previous sound
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Create and load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: surah.audio },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentSurah(surah);
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error playing surah:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    if (!sound || !currentSurah) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const stop = async () => {
    if (!sound) return;

    try {
      await sound.stopAsync();
      setIsPlaying(false);
      setCurrentTime(0);
    } catch (error) {
      console.error('Error stopping audio:', error);
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

  const handleSeek = async (time: number) => {
    if (!sound) return;

    try {
      await sound.setPositionAsync(time * 1000);
      setCurrentTime(time);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSurah,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        playSurah,
        togglePlayPause,
        playNext,
        playPrevious,
        handleSeek,
        setSurahs,
        surahs,
        stop,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
