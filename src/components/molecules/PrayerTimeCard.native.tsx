import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../atoms/Card.native';
import { Text } from '../atoms/Text.native';

interface PrayerTimeCardProps {
  prayerName: string;
  time: string;
  isNext: boolean;
  countdown?: string;
  location?: string;
}

export function PrayerTimeCard({ 
  prayerName, 
  time, 
  isNext, 
  countdown, 
  location 
}: PrayerTimeCardProps) {
  return (
    <Card 
      variant={isNext ? 'primary' : 'default'} 
      padding="lg"
      style={styles.card}
    >
      <View style={styles.container}>
        {isNext && (
          <View style={styles.nextBadge}>
            <Ionicons name="time-outline" size={16} color="#3B82F6" />
            <Text variant="caption" style={styles.nextText}>
              Waktu Sholat Berikutnya
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <Text variant="h2" weight="bold" align="center" style={styles.prayerName}>
            {prayerName}
          </Text>
          <Text variant="h1" weight="light" align="center" style={styles.time}>
            {time}
          </Text>
        </View>

        {countdown && isNext && (
          <View style={styles.countdownContainer}>
            <Text variant="h3" weight="semibold" style={styles.countdown}>
              {countdown}
            </Text>
            <Text variant="caption" color="secondary" align="center">
              hingga waktu sholat
            </Text>
          </View>
        )}

        {location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text variant="caption" color="secondary">
              {location}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  container: {
    alignItems: 'center',
  },
  nextBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
  },
  nextText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    marginBottom: 16,
  },
  prayerName: {
    marginBottom: 8,
  },
  time: {
    fontSize: 56,
    color: '#2A4D69',
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  countdown: {
    fontSize: 28,
    color: '#2A4D69',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
