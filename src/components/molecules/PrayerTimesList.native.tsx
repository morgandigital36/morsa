import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../atoms/Card.native';
import { Text } from '../atoms/Text.native';

interface Prayer {
  name: string;
  time: string;
  isPast: boolean;
}

interface PrayerTimesListProps {
  prayers: Prayer[];
}

const prayerIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Subuh: 'sunny-outline',
  Terbit: 'sunny',
  Dzuhur: 'sunny',
  Ashar: 'partly-sunny-outline',
  Maghrib: 'moon-outline',
  Isya: 'moon',
};

export function PrayerTimesList({ prayers }: PrayerTimesListProps) {
  const renderPrayerItem = ({ item }: { item: Prayer }) => (
    <View
      style={[
        styles.prayerItem,
        item.isPast && styles.prayerItemPast,
      ]}
    >
      <View style={styles.prayerLeft}>
        <Ionicons
          name={prayerIcons[item.name] || 'sunny'}
          size={20}
          color={item.isPast ? '#9CA3AF' : '#2A4D69'}
        />
        <Text
          variant="body"
          weight={item.isPast ? 'regular' : 'medium'}
          color={item.isPast ? 'secondary' : 'primary'}
        >
          {item.name}
        </Text>
      </View>
      <Text
        variant="body"
        weight="semibold"
        style={[
          styles.prayerTime,
          item.isPast && styles.prayerTimePast,
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  return (
    <Card padding="md">
      <Text variant="h3" weight="semibold" style={styles.title}>
        Jadwal Sholat Hari Ini
      </Text>
      <FlatList
        data={prayers}
        renderItem={renderPrayerItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  prayerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  prayerItemPast: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerTime: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#2A4D69',
  },
  prayerTimePast: {
    color: '#6B7280',
  },
  separator: {
    height: 8,
  },
});
