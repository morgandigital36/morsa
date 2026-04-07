import { useState, useEffect } from 'react';
import { Layout } from '../components/organisms/Layout';
import { Text } from '../components/atoms/Text';
import { Card } from '../components/atoms/Card';
import { murottalService, MurottalSurah } from '../services/api/murottal.service';
import { Play, Pause, SkipBack, SkipForward, Volume2, Loader } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export default function MurottalScreen() {
  const [localSurahs, setLocalSurahs] = useState<MurottalSurah[]>([]);
  const [loading, setLoading] = useState(true);
  const {
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
  } = useAudio();

  useEffect(() => {
    loadSurahs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSurahs = async () => {
    try {
      setLoading(true);
      const data = await murottalService.getAllSurah();
      setLocalSurahs(data || []);
      setSurahs(data || []);
    } catch (error) {
      console.error('Error loading surahs:', error);
      setLocalSurahs([]);
      setSurahs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    handleSeek(time);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout title="Murottal Al-Quran" showBackButton>
      <div className="space-y-6 pb-6">
        {currentSurah && (
          <Card className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
            <div className="p-6">
              <div className="text-center mb-4">
                <Text variant="h2" className="text-white font-uthmanic mb-2 text-4xl leading-relaxed mt-2" align="center">
                  {currentSurah.nama}
                </Text>
                <Text variant="h3" weight="bold" className="text-white mb-1">
                  {currentSurah.namaLatin}
                </Text>
                <Text variant="body" className="text-white/90">
                  {currentSurah.arti}
                </Text>
                <Text variant="caption" className="text-white/80 mt-1">
                  {currentSurah.jumlahAyat} Ayat • {currentSurah.tempatTurun}
                </Text>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white">
                  <span className="w-12 text-center">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeekChange}
                    className="flex-1 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="w-12 text-center">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4">
                  <button
                    onClick={playPrevious}
                    className="p-3 hover:bg-white/20 rounded-full transition-all active:scale-95"
                    disabled={!currentSurah}
                  >
                    <SkipBack className="w-7 h-7" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="p-5 bg-white text-teal-600 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
                    disabled={!currentSurah}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" fill="currentColor" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    )}
                  </button>
                  <button
                    onClick={playNext}
                    className="p-3 hover:bg-white/20 rounded-full transition-all active:scale-95"
                    disabled={!currentSurah}
                  >
                    <SkipForward className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <Text variant="h3" weight="bold">
              Daftar Surah
            </Text>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-teal-600" />
            </div>
          ) : localSurahs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Text variant="body" color="secondary" className="text-center">
                Tidak dapat memuat daftar surah
              </Text>
            </div>
          ) : (
            <div className="space-y-2">
              {localSurahs.map((surah) => (
                <Card
                  key={surah.nomor}
                  onClick={() => playSurah(surah)}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentSurah?.nomor === surah.nomor
                      ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-100 dark:bg-teal-900/40 rounded-lg flex items-center justify-center">
                      <Text variant="body" weight="bold" className="text-teal-600 dark:text-teal-400">
                        {surah.nomor}
                      </Text>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text variant="body" weight="semibold" className="mb-1">
                        {surah.namaLatin}
                      </Text>
                      <Text variant="caption" color="secondary">
                        {surah.arti} • {surah.jumlahAyat} Ayat • {surah.tempatTurun}
                      </Text>
                    </div>
                    <div className="flex-shrink-0">
                      <Text variant="h3" className="text-teal-600 dark:text-teal-400 font-uthmanic text-2xl pt-2">
                        {surah.nama}
                      </Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
