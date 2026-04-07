import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';
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
    closePlayer,
  } = useAudio();

  if (!currentSurah) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    closePlayer();
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    handleSeek(time);
  };

  return (
    <div className="fixed bottom-[68px] left-0 right-0 z-40 animate-slide-up px-3">
      <div className="max-w-md mx-auto bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl shadow-2xl text-white overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          {/* Header row: info + close */}
          <div className="flex items-center gap-3 mb-2">
            <div
              onClick={() => navigate('/murottal')}
              className="flex-1 min-w-0 cursor-pointer"
            >
              <p className="font-semibold text-sm leading-tight truncate">{currentSurah.namaLatin}</p>
              <p className="text-white/75 text-xs truncate">{currentSurah.arti}</p>
            </div>
            {/* X Close button */}
            <button
              onClick={handleClose}
              aria-label="Tutup player"
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/35 active:bg-white/50 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Seek bar */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs w-10 text-center opacity-80">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeekChange}
              className="flex-1 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="text-xs w-10 text-center opacity-80">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 pb-1">
            <button
              onClick={playPrevious}
              className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlayPause}
              className="w-11 h-11 bg-white text-teal-600 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={playNext}
              className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
