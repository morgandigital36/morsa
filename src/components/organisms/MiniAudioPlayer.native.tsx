import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudio } from '../../contexts/AudioContext.native';
import { Text } from '../atoms/Text.native';
import * as Haptics from 'expo-haptics';

export const MiniAudioPlayer = () => {
  const {
    currentSurah,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    handleSeek,
    stop,
  } = useAudio();

  if (!currentSurah) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClose = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await stop();
  };

  const handlePlayPause = async () => {
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

  const handlePlayerPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/murottal');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.player}>
        {/* Info Section */}
        <TouchableOpacity
          onPress={handlePlayerPress}
          style={styles.infoSection}
          activeOpacity={0.8}
        >
          <View style={styles.textContainer}>
            <Text variant="body" weight="semibold" style={styles.surahName} numberOfLines={1}>
              {currentSurah.namaLatin}
            </Text>
            <Text variant="caption" style={styles.surahMeaning} numberOfLines={1}>
              {currentSurah.arti}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
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

        {/* Controls */}
        <View style={styles.controlsSection}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={styles.controlButton}
            activeOpacity={0.7}
          >
            <Ionicons name="play-skip-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePlayPause}
            style={styles.playButton}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <Ionicons name="hourglass" size={28} color="#14B8A6" />
            ) : isPlaying ? (
              <Ionicons name="pause" size={28} color="#14B8A6" />
            ) : (
              <Ionicons name="play" size={28} color="#14B8A6" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.controlButton}
            activeOpacity={0.7}
          >
            <Ionicons name="play-skip-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 40,
  },
  player: {
    backgroundColor: '#14B8A6',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  surahName: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 2,
  },
  surahMeaning: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  closeButton: {
    padding: 4,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
