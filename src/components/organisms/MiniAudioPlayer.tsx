import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';
import { Text } from '../atoms/Text';
import { useNavigate } from 'react-router-dom';

export const MiniAudioPlayer = () => {
  const navigate = useNavigate();
  const {
    currentSurah,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    handleSeek,
    playSurah,
  } = useAudio();

  if (!currentSurah) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (isPlaying) {
      togglePlayPause();
    }
    playSurah(currentSurah);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    handleSeek(time);
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-2xl z-40 animate-slide-up">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/murottal')}
            className="flex-1 text-left min-w-0"
          >
            <Text variant="body" weight="semibold" className="text-white truncate text-sm">
              {currentSurah.namaLatin}
            </Text>
            <Text variant="caption" className="text-white/80 truncate text-xs">
              {currentSurah.arti}
            </Text>
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-all flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs w-10 text-center">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeekChange}
            className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="text-xs w-10 text-center">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={playPrevious}
            className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-95"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-2.5 bg-white text-teal-600 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            )}
          </button>
          <button
            onClick={playNext}
            className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-95"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
