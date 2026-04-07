import { useState, useEffect } from 'react';
import { quranService, Surah, SurahData } from '../services/api/quran.service';
import { bookmarkService, Bookmark } from '../services/bookmark.service';
import { surahNamesIndonesian } from '../data/surahNames';
import { Text } from '../components/atoms/Text';
import { BottomNav } from '../components/organisms/BottomNav';
import {
  ChevronLeft,
  Search,
  Settings,
  Bookmark as BookmarkIcon,
  BookmarkCheck,
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
  const [searchQuery] = useState('');
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
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pb-24">

        {/* ── Sticky Navbar ── */}
        <div className="bg-slate-100/90 dark:bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedSurah(null)}
                className="p-2 neo-button rounded-xl transition-all active:neo-pressed"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>

              <div className="text-center">
                <h1 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                  {selectedSurah}. {currentSurah?.englishName}
                </h1>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 neo-button rounded-xl transition-all active:neo-pressed"
              >
                <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {showSettings && (
              <div className="mt-3 p-3 neo-pressed rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">Ukuran Teks Arab</span>
                  <div className="flex items-center gap-2">
                    <button onClick={decreaseFontSize} className="p-2 neo-button rounded-lg active:neo-pressed">
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-sm w-10 text-center font-mono">{fontSize}px</span>
                    <button onClick={increaseFontSize} className="p-2 neo-button rounded-lg active:neo-pressed">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">Tampilkan Terjemahan</span>
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`p-2 rounded-lg transition-colors ${
                      showTranslation
                        ? 'bg-teal-500 text-white'
                        : 'neo-button'
                    }`}
                  >
                    {showTranslation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Surah Hero Header ── Full-width gradient */}
        <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 w-full px-6 pt-8 pb-10 text-center">
          <h2 className="font-uthmanic text-white text-5xl leading-relaxed mb-3">
            {currentSurah?.name}
          </h2>
          <p className="text-teal-100 font-semibold text-lg mb-1">
            {currentSurah?.englishName} — {currentSurah?.englishNameTranslation}
          </p>
          <div className="flex justify-center items-center gap-3 mt-2">
            <span className="text-teal-200 text-sm bg-white/15 px-3 py-1 rounded-full">
              {currentSurah?.numberOfAyahs} Ayat
            </span>
            <span className="text-teal-200 text-sm bg-white/15 px-3 py-1 rounded-full">
              {getRevelationType(currentSurah?.revelationType || '')}
            </span>
          </div>
        </div>

        {/* ── Ayahs ── No card wrapper */}
        <div className="px-5 py-4 space-y-0">

          {/* Bismillah */}
          {selectedSurah !== 1 && selectedSurah !== 9 && (
            <div className="text-center pt-6 pb-8 border-b border-slate-200 dark:border-slate-700">
              <p
                className="font-uthmanic text-teal-700 dark:text-teal-300 leading-relaxed"
                style={{ fontSize: '32px', lineHeight: '2.8' }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Ayah list */}
          {surahData.arabic.ayahs.map((ayah, index) => {
            const isBookmarked = bookmarkedAyahs.has(`${selectedSurah}-${ayah.numberInSurah}`);
            return (
              <div
                key={ayah.number}
                className="py-6 border-b border-slate-200/70 dark:border-slate-700/50"
              >
                {/* Ayah number + bookmark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-600 dark:bg-teal-700">
                    <span className="text-white font-bold text-xs">
                      {ayah.numberInSurah}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(selectedSurah, ayah.numberInSurah)}
                    className={`p-2 rounded-lg transition-all ${
                      isBookmarked
                        ? 'text-amber-500'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                  </button>
                </div>

                {/* Arabic text */}
                <p
                  className="font-uthmanic text-right text-slate-800 dark:text-slate-100 mb-4 w-full"
                  style={{ fontSize: `${fontSize}px`, lineHeight: '2.6', direction: 'rtl' }}
                >
                  {ayah.text}
                </p>

                {/* Translation */}
                {showTranslation && (
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">
                    {surahData.translation.ayahs[index]?.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pb-24">
      <div className="neo-card rounded-b-lg mb-4 sticky top-0 z-10 opacity-95">
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
                    className="w-full neo-button rounded-2xl p-4 transition-all flex items-center gap-4 text-left active:neo-pressed"
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
                className="w-full neo-button rounded-2xl p-4 transition-all flex items-center gap-4 text-left active:neo-pressed"
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
