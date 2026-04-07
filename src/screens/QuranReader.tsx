import { useState, useEffect } from 'react';
import { quranService, Surah, SurahData } from '../services/api/quran.service';
import { bookmarkService, Bookmark } from '../services/bookmark.service';
import { surahNamesIndonesian } from '../data/surahNames';
import { Text } from '../components/atoms/Text';
import { BottomNav } from '../components/organisms/BottomNav';
import {
  ChevronLeft,
  ChevronDown,
  Search,
  Settings,
  Bookmark as BookmarkIcon,
  BookmarkCheck,
  Home,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuranReader() {
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahData, setSurahData] = useState<{ arabic: SurahData; translation: SurahData } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fontSize, setFontSize] = useState(24);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'halaman' | 'juz' | 'bookmark'>('surah');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadSurahs();
    loadBookmarks();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      loadSurahData(selectedSurah);
    }
  }, [selectedSurah]);

  const loadSurahs = async () => {
    try {
      const data = await quranService.getAllSurahs();
      setSurahs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading surahs:', error);
      setLoading(false);
    }
  };

  const loadBookmarks = async () => {
    try {
      const data = await bookmarkService.getBookmarks();
      setBookmarks(data);
      const bookmarkedSet = new Set(
        data.map((b) => `${b.surah_number}-${b.ayah_number}`)
      );
      setBookmarkedAyahs(bookmarkedSet);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const loadSurahData = async (surahNumber: number) => {
    try {
      setLoading(true);
      const data = await quranService.getSurahWithTranslation(surahNumber);
      setSurahData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading surah:', error);
      setLoading(false);
    }
  };

  const toggleBookmark = async (surahNumber: number, ayahNumber: number) => {
    const key = `${surahNumber}-${ayahNumber}`;
    const isBookmarked = bookmarkedAyahs.has(key);

    if (isBookmarked) {
      const success = await bookmarkService.removeBookmark(surahNumber, ayahNumber);
      if (success) {
        const newSet = new Set(bookmarkedAyahs);
        newSet.delete(key);
        setBookmarkedAyahs(newSet);
        loadBookmarks();
      }
    } else {
      const success = await bookmarkService.addBookmark(surahNumber, ayahNumber);
      if (success) {
        const newSet = new Set(bookmarkedAyahs);
        newSet.add(key);
        setBookmarkedAyahs(newSet);
        loadBookmarks();
      }
    }
  };

  const filteredSurahs = surahs.filter((surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery)
  );

  const getRevelationType = (type: string) => {
    return type === 'Meccan' ? 'Makkiyah' : 'Madaniyah';
  };

  const increaseFontSize = () => {
    if (fontSize < 40) setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 16) setFontSize(fontSize - 2);
  };

  if (selectedSurah && surahData) {
    const currentSurah = surahs.find((s) => s.number === selectedSurah);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
        <div className="bg-white dark:bg-gray-800 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="container-app px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedSurah(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                <Text variant="h3" weight="bold">
                  {selectedSurah}. {currentSurah?.name}
                </Text>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Settings className="w-6 h-6" />
              </button>
            </div>

            {showSettings && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Text variant="body">Ukuran Teks</Text>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decreaseFontSize}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-sm w-12 text-center">{fontSize}px</span>
                    <button
                      onClick={increaseFontSize}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Text variant="body">Tampilkan Terjemahan</Text>
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`p-2 rounded-lg transition-colors ${
                      showTranslation
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {showTranslation ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 text-white px-6 py-8 mb-6">
          <div className="text-center">
            <Text variant="caption" className="text-white/80 mb-2">
              Surah: {currentSurah?.name}
            </Text>
            <Text variant="h2" className="text-white mb-1 font-uthmanic text-3xl">
              {currentSurah?.name}
            </Text>
            <Text variant="caption" className="text-white/80 mb-4">
              {currentSurah?.englishNameTranslation}
            </Text>
            <div className="flex justify-center gap-6 text-sm">
              <span>{currentSurah?.numberOfAyahs} Ayat</span>
              <span>•</span>
              <span>{getRevelationType(currentSurah?.revelationType || '')}</span>
            </div>
          </div>
        </div>

        <div className="container-app px-6 space-y-6">
          {selectedSurah !== 1 && selectedSurah !== 9 && (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-teal-50 dark:border-teal-900/30 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-600 via-transparent to-transparent"></div>
              <Text variant="h2" className="text-4xl mb-4 font-uthmanic text-teal-700 dark:text-teal-400 relative z-10" align="center">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </Text>
            </div>
          )}

          {surahData.arabic.ayahs.map((ayah, index) => {
            const isBookmarked = bookmarkedAyahs.has(`${selectedSurah}-${ayah.numberInSurah}`);
            return (
              <div
                key={ayah.number}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-teal-50 dark:border-teal-900/30 relative group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 relative">
                    <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/40 rotate-45 rounded-xl group-hover:rotate-90 transition-transform duration-500"></div>
                    <span className="relative z-10 text-teal-700 dark:text-teal-300 font-bold text-sm">
                      {ayah.numberInSurah}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(selectedSurah, ayah.numberInSurah)}
                    className={`p-2 rounded-full transition-all ${
                      isBookmarked
                        ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-500'
                        : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                  </button>
                </div>

                <Text
                  variant="h2"
                  className="mb-6 font-uthmanic text-gray-900 dark:text-gray-100"
                  align="right"
                  style={{ fontSize: `${fontSize}px`, lineHeight: '2.4' }}
                >
                  {ayah.text}
                </Text>

                {showTranslation && (
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50">
                    <Text variant="body" color="secondary" className="leading-relaxed text-gray-600 dark:text-gray-400">
                      {surahData.translation.ayahs[index]?.text}
                    </Text>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <div className="bg-white dark:bg-gray-800 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <div className="container-app px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <Text variant="h2" weight="bold">
              Al-Quran
            </Text>

            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700 -mb-px">
            {(['surah', 'halaman', 'juz', 'bookmark'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 capitalize font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'surah' ? 'Surah' : tab === 'halaman' ? 'Halaman' : tab === 'juz' ? 'Juz' : 'Penanda'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-app px-6 py-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <Text variant="body" color="secondary">
              Memuat Al-Quran...
            </Text>
          </div>
        ) : activeTab === 'bookmark' ? (
          <div className="space-y-3">
            {bookmarks.length === 0 ? (
              <div className="text-center py-12">
                <BookmarkIcon className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <Text variant="body" color="secondary">
                  Belum ada ayat yang ditandai
                </Text>
              </div>
            ) : (
              bookmarks.map((bookmark) => {
                const surah = surahs.find((s) => s.number === bookmark.surah_number);
                return (
                  <button
                    key={bookmark.id}
                    onClick={() => setSelectedSurah(bookmark.surah_number)}
                    className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 hover:shadow-md transition-shadow flex items-center gap-4 text-left"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <BookmarkCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>

                    <div className="flex-1">
                      <Text variant="h4" weight="semibold" className="mb-1">
                        {surah?.name} - Ayat {bookmark.ayah_number}
                      </Text>
                      <Text variant="caption" color="secondary">
                        {surah?.englishNameTranslation}
                      </Text>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSurahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => setSelectedSurah(surah.number)}
                className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 hover:shadow-md transition-shadow flex items-center gap-4 text-left"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                  <Text variant="body" weight="bold" className="text-teal-600 dark:text-teal-400">
                    {surah.number}
                  </Text>
                </div>

                <div className="flex-1">
                  <Text variant="h4" weight="semibold" className="mb-1">
                    {surahNamesIndonesian[surah.number] || surah.englishName}
                  </Text>
                  <Text variant="caption" color="secondary">
                    {getRevelationType(surah.revelationType)} • {surah.numberOfAyahs} Ayat
                  </Text>
                </div>

                <Text variant="h2" className="text-2xl font-uthmanic">
                  {surah.name}
                </Text>
              </button>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
