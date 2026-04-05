import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Layout } from '../components/organisms/Layout.native';
import { BottomNav } from '../components/organisms/BottomNav.native';
import { quranService, Surah, SurahData } from '../services/api/quran.service';
import { surahNamesIndonesian } from '../data/surahNames';
import * as Haptics from 'expo-haptics';

interface Bookmark {
  id: string;
  surah_number: number;
  ayah_number: number;
  note?: string;
  created_at: string;
}

interface SurahWithTranslation {
  arabic: SurahData;
  translation: SurahData;
}

export function QuranReader() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahData, setSurahData] = useState<SurahWithTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'bookmark'>('surah');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
      setLoading(true);
      const data = await quranService.getAllSurahs();
      setSurahs(data || []);
    } catch (error) {
      console.error('Error loading surahs:', error);
      setSurahs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem('@rabithah_bookmarks');
      if (stored) {
        const data = JSON.parse(stored) as Bookmark[];
        setBookmarks(data);
        const bookmarkedSet = new Set(
          data.map((b) => `${b.surah_number}-${b.ayah_number}`)
        );
        setBookmarkedAyahs(bookmarkedSet);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const loadSurahData = async (surahNumber: number) => {
    try {
      setLoadingSurah(true);
      const data = await quranService.getSurahWithTranslation(surahNumber);
      setSurahData(data);
    } catch (error) {
      console.error('Error loading surah:', error);
      setSurahData(null);
    } finally {
      setLoadingSurah(false);
    }
  };

  const toggleBookmark = async (surahNumber: number, ayahNumber: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const key = `${surahNumber}-${ayahNumber}`;
    const isBookmarked = bookmarkedAyahs.has(key);

    let newBookmarks: Bookmark[];
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(
        (b) => !(b.surah_number === surahNumber && b.ayah_number === ayahNumber)
      );
    } else {
      const newBookmark: Bookmark = {
        id: `${surahNumber}-${ayahNumber}-${Date.now()}`,
        surah_number: surahNumber,
        ayah_number: ayahNumber,
        created_at: new Date().toISOString(),
      };
      newBookmarks = [...bookmarks, newBookmark];
    }

    setBookmarks(newBookmarks);
    const newSet = new Set(
      newBookmarks.map((b) => `${b.surah_number}-${b.ayah_number}`)
    );
    setBookmarkedAyahs(newSet);

    try {
      await AsyncStorage.setItem('@rabithah_bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSurahs();
    await loadBookmarks();
    setRefreshing(false);
  };

  const filteredSurahs = surahs.filter((surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery) ||
    (surahNamesIndonesian[surah.number] || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRevelationType = (type: string) => {
    return type === 'Meccan' ? 'Makkiyah' : 'Madaniyah';
  };

  const increaseFontSize = () => {
    if (fontSize < 36) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 14) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFontSize(fontSize - 2);
    }
  };

  // Detail View
  if (selectedSurah && surahData) {
    const currentSurah = surahs.find((s) => s.number === selectedSurah);

    return (
      <View style={styles.container}>
        <Layout
          title={`${selectedSurah}. ${currentSurah?.name}`}
          showBackButton
          onBack={() => setSelectedSurah(null)}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.detailContent}>
            {/* Settings Toggle */}
            <TouchableOpacity
              onPress={() => setShowSettings(!showSettings)}
              style={styles.settingsToggle}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Settings Panel */}
            {showSettings && (
              <Card style={styles.settingsCard}>
                <View style={styles.settingRow}>
                  <Text variant="body">Ukuran Teks</Text>
                  <View style={styles.fontSizeControls}>
                    <TouchableOpacity onPress={decreaseFontSize} style={styles.fontButton}>
                      <Ionicons name="remove" size={20} color="#6B7280" />
                    </TouchableOpacity>
                    <Text variant="body" weight="medium" style={styles.fontSizeText}>
                      {fontSize}px
                    </Text>
                    <TouchableOpacity onPress={increaseFontSize} style={styles.fontButton}>
                      <Ionicons name="add" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.settingRow}>
                  <Text variant="body">Tampilkan Terjemahan</Text>
                  <TouchableOpacity
                    onPress={() => setShowTranslation(!showTranslation)}
                    style={[
                      styles.toggleButton,
                      showTranslation && styles.toggleButtonActive,
                    ]}
                  >
                    <Ionicons
                      name={showTranslation ? 'eye' : 'eye-off'}
                      size={20}
                      color={showTranslation ? '#14B8A6' : '#6B7280'}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            )}

            {/* Surah Header */}
            <Card style={styles.surahHeader}>
              <Text variant="caption" color="secondary" align="center">
                Surah: {currentSurah?.name}
              </Text>
              <Text variant="h2" align="center" style={styles.surahNameArabic}>
                {currentSurah?.name}
              </Text>
              <Text variant="body" color="secondary" align="center">
                {currentSurah?.englishNameTranslation}
              </Text>
              <View style={styles.surahMeta}>
                <Text variant="caption" color="secondary">
                  {currentSurah?.numberOfAyahs} Ayat
                </Text>
                <Text variant="caption" color="secondary"> • </Text>
                <Text variant="caption" color="secondary">
                  {getRevelationType(currentSurah?.revelationType || '')}
                </Text>
              </View>
            </Card>

            {/* Bismillah */}
            {selectedSurah !== 1 && selectedSurah !== 9 && (
              <Card style={styles.bismillahCard}>
                <Text variant="h2" align="center" style={styles.bismillah}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </Text>
              </Card>
            )}

            {/* Ayahs */}
            {loadingSurah ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#14B8A6" />
              </View>
            ) : (
              surahData.arabic.ayahs.map((ayah, index) => {
                const isBookmarked = bookmarkedAyahs.has(`${selectedSurah}-${ayah.numberInSurah}`);
                return (
                  <Card key={ayah.number} style={styles.ayahCard}>
                    <View style={styles.ayahHeader}>
                      <View style={styles.ayahNumber}>
                        <Text variant="body" weight="medium" style={styles.ayahNumberText}>
                          {ayah.numberInSurah}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => toggleBookmark(selectedSurah, ayah.numberInSurah)}
                        style={styles.bookmarkButton}
                      >
                        <Ionicons
                          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                          size={20}
                          color={isBookmarked ? '#F59E0B' : '#9CA3AF'}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      variant="body"
                      align="right"
                      style={[styles.ayahText, { fontSize }]}
                    >
                      {ayah.text}
                    </Text>

                    {showTranslation && surahData.translation.ayahs[index] && (
                      <Text variant="body" color="secondary" style={styles.translationText}>
                        {surahData.translation.ayahs[index].text}
                      </Text>
                    )}
                  </Card>
                );
              })
            )}

            <View style={styles.bottomPadding} />
          </ScrollView>
        </Layout>
        <BottomNav />
      </View>
    );
  }

  // List View
  return (
    <View style={styles.container}>
      <Layout title="Al-Quran" showBackButton>
        <View style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari surah..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => setActiveTab('surah')}
              style={[styles.tab, activeTab === 'surah' && styles.tabActive]}
            >
              <Text
                variant="body"
                weight={activeTab === 'surah' ? 'semibold' : 'regular'}
                style={activeTab === 'surah' ? styles.tabTextActive : styles.tabText}
              >
                Surah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('bookmark')}
              style={[styles.tab, activeTab === 'bookmark' && styles.tabActive]}
            >
              <Text
                variant="body"
                weight={activeTab === 'bookmark' ? 'semibold' : 'regular'}
                style={activeTab === 'bookmark' ? styles.tabTextActive : styles.tabText}
              >
                Penanda
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#14B8A6" />
            </View>
          ) : activeTab === 'bookmark' ? (
            <FlatList
              data={bookmarks}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#14B8A6']} />
              }
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="bookmark-outline" size={48} color="#D1D5DB" />
                  <Text variant="body" color="secondary" align="center" style={styles.emptyText}>
                    Belum ada ayat yang ditandai
                  </Text>
                </View>
              }
              renderItem={({ item }) => {
                const surah = surahs.find((s) => s.number === item.surah_number);
                return (
                  <Card
                    padding="md"
                    hoverable
                    onPress={() => setSelectedSurah(item.surah_number)}
                    style={styles.bookmarkCard}
                  >
                    <View style={styles.bookmarkContent}>
                      <View style={styles.bookmarkIcon}>
                        <Ionicons name="bookmark" size={20} color="#F59E0B" />
                      </View>
                      <View style={styles.bookmarkInfo}>
                        <Text variant="body" weight="semibold">
                          {surah?.name} - Ayat {item.ayah_number}
                        </Text>
                        <Text variant="caption" color="secondary">
                          {surah?.englishNameTranslation}
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              }}
            />
          ) : (
            <FlatList
              data={filteredSurahs}
              keyExtractor={(item) => item.number.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#14B8A6']} />
              }
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <Card
                  padding="md"
                  hoverable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedSurah(item.number);
                  }}
                  style={styles.surahCard}
                >
                  <View style={styles.surahContent}>
                    <View style={styles.surahNumber}>
                      <Text variant="body" weight="bold" style={styles.surahNumberText}>
                        {item.number}
                      </Text>
                    </View>
                    <View style={styles.surahInfo}>
                      <Text variant="body" weight="semibold" style={styles.surahName}>
                        {surahNamesIndonesian[item.number] || item.englishName}
                      </Text>
                      <Text variant="caption" color="secondary">
                        {getRevelationType(item.revelationType)} • {item.numberOfAyahs} Ayat
                      </Text>
                    </View>
                    <Text variant="h3" style={styles.surahArabic}>
                      {item.name}
                    </Text>
                  </View>
                </Card>
              )}
            />
          )}
        </View>
      </Layout>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  detailContent: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#14B8A6',
  },
  tabText: {
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#14B8A6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  surahCard: {
    marginBottom: 12,
  },
  surahContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumberText: {
    color: '#14B8A6',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    marginBottom: 4,
  },
  surahArabic: {
    color: '#14B8A6',
  },
  settingsToggle: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  settingsCard: {
    marginBottom: 16,
    gap: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fontButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  fontSizeText: {
    minWidth: 50,
    textAlign: 'center',
  },
  toggleButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#F0FDFA',
  },
  surahHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  surahNameArabic: {
    marginVertical: 8,
    color: '#14B8A6',
  },
  surahMeta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bismillahCard: {
    marginBottom: 16,
  },
  bismillah: {
    color: '#14B8A6',
    fontSize: 24,
    lineHeight: 40,
  },
  ayahCard: {
    marginBottom: 12,
  },
  ayahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ayahNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayahNumberText: {
    color: '#14B8A6',
    fontSize: 14,
  },
  bookmarkButton: {
    padding: 8,
  },
  ayahText: {
    lineHeight: 36,
    color: '#1F2937',
    marginBottom: 8,
  },
  translationText: {
    lineHeight: 24,
  },
  bookmarkCard: {
    marginBottom: 12,
  },
  bookmarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkInfo: {
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
});