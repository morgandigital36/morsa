import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Layout } from '../components/organisms/Layout.native';
import { BottomNav } from '../components/organisms/BottomNav.native';
import { murottalService, MurottalSurah } from '../services/api/murottal.service';
import { useAudio } from '../contexts/AudioContext.native';
import * as Haptics from 'expo-haptics';

export function MurottalScreen() {
  const [localSurahs, setLocalSurahs] = useState<MurottalSurah[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    currentSurah,
    isPlaying,
    isLoading: audioLoading,
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

  const handlePlaySurah = (surah: MurottalSurah) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    playSurah(surah);
  };

  const handleTogglePlayPause = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await togglePlayPause();
  };

  const handlePrevious = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playPrevious();
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playNext();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderSurahItem = ({ item }: { item: MurottalSurah }) => {
    const isCurrentSurah = currentSurah?.nomor === item.nomor;

    return (
      <Card
        padding="none"
        hoverable
        onPress={() => handlePlaySurah(item)}
        style={[styles.surahCard, isCurrentSurah && styles.surahCardActive]}
      >
        <View style={styles.surahContent}>
          <View style={[styles.surahNumber, isCurrentSurah && styles.surahNumberActive]}>
            <Text variant="body" weight="bold" style={isCurrentSurah ? styles.surahNumberTextActive : styles.surahNumberText}>
              {item.nomor}
            </Text>
          </View>

          <View style={styles.surahInfo}>
            <Text variant="body" weight="semibold" style={styles.surahName}>
              {item.namaLatin}
            </Text>
            <Text variant="caption" color="secondary">
              {item.arti} • {item.jumlahAyat} Ayat • {item.tempatTurun}
            </Text>
          </View>

          <Text variant="h3" style={styles.surahArabic}>
            {item.nama}
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Layout title="Murottal Al-Quran" showBackButton>
        <View style={styles.content}>
          {/* Now Playing Card */}
          {currentSurah && (
            <Card style={styles.nowPlayingCard}>
              <View style={styles.nowPlayingContent}>
                <View style={styles.nowPlayingInfo}>
                  <Text variant="h2" style={styles.nowPlayingTitle}>
                    {currentSurah.nama}
                  </Text>
                  <Text variant="h4" weight="bold" style={styles.nowPlayingSubtitle}>
                    {currentSurah.namaLatin}
                  </Text>
                  <Text variant="body" color="secondary">
                    {currentSurah.arti}
                  </Text>
                  <Text variant="caption" color="secondary" style={styles.nowPlayingMeta}>
                    {currentSurah.jumlahAyat} Ayat • {currentSurah.tempatTurun}
                  </Text>
                </View>

                <View style={styles.playerControls}>
                  <View style={styles.progressContainer}>
                    <Text variant="caption" style={styles.timeText}>
                      {formatTime(currentTime)}
                    </Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={duration || 0}
                      value={currentTime}
                      onSlidingComplete={handleSeek}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                      thumbTintColor="#FFFFFF"
                    />
                    <Text variant="caption" style={styles.timeText}>
                      {formatTime(duration)}
                    </Text>
                  </View>

                  <View style={styles.controlButtons}>
                    <TouchableOpacity
                      onPress={handlePrevious}
                      style={styles.controlButton}
                      activeOpacity={0.7}
                      disabled={!currentSurah}
                    >
                      <Ionicons name="play-skip-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleTogglePlayPause}
                      style={styles.playButton}
                      activeOpacity={0.8}
                      disabled={!currentSurah || audioLoading}
                    >
                      {audioLoading ? (
                        <ActivityIndicator size="small" color="#14B8A6" />
                      ) : (
                        <Ionicons
                          name={isPlaying ? 'pause' : 'play'}
                          size={32}
                          color="#14B8A6"
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleNext}
                      style={styles.controlButton}
                      activeOpacity={0.7}
                      disabled={!currentSurah}
                    >
                      <Ionicons name="play-skip-forward" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card>
          )}

          {/* Surah List Header */}
          <View style={styles.listHeader}>
            <Ionicons name="musical-notes" size={20} color="#14B8A6" />
            <Text variant="h4" weight="bold" style={styles.listTitle}>
              Daftar Surah
            </Text>
          </View>

          {/* Surah List */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#14B8A6" />
            </View>
          ) : localSurahs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text variant="body" color="secondary" align="center">
                Tidak dapat memuat daftar surah
              </Text>
            </View>
          ) : (
            <FlatList
              data={localSurahs}
              renderItem={renderSurahItem}
              keyExtractor={(item) => item.nomor.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
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
  nowPlayingCard: {
    backgroundColor: '#14B8A6',
    marginBottom: 20,
  },
  nowPlayingContent: {
    padding: 20,
  },
  nowPlayingInfo: {
    marginBottom: 20,
  },
  nowPlayingTitle: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nowPlayingSubtitle: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nowPlayingMeta: {
    marginTop: 8,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playerControls: {
    gap: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 11,
    width: 40,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: 20,
    marginHorizontal: 8,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  listTitle: {
    color: '#14B8A6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  listContent: {
    paddingBottom: 100,
  },
  surahCard: {
    marginBottom: 12,
  },
  surahCardActive: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#14B8A6',
  },
  surahContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumberActive: {
    backgroundColor: '#14B8A6',
  },
  surahNumberText: {
    color: '#14B8A6',
  },
  surahNumberTextActive: {
    color: '#FFFFFF',
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
});