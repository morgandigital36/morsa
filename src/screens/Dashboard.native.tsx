import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Button } from '../components/atoms/Button.native';
import { PrayerTimeCard } from '../components/molecules/PrayerTimeCard.native';
import { BottomNav } from '../components/organisms/BottomNav.native';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { usePermissions } from '../contexts/PermissionContext.native';

export function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const { prayerTimes, loading, error, refetch } = usePrayerTimes();
  const { requestLocationPermission } = usePermissions();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const menuItems = [
    {
      title: 'Al-Qur\'an',
      icon: '📖',
      route: '/quran',
      color: '#2A4D69',
    },
    {
      title: 'Wirid',
      icon: '📿',
      route: '/wirid',
      color: '#4CAF50',
    },
    {
      title: 'Qibla',
      icon: '🧭',
      route: '/qibla',
      color: '#FF9800',
    },
    {
      title: 'Doa',
      icon: '🤲',
      route: '/doa',
      color: '#9C27B0',
    },
    {
      title: 'Murottal',
      icon: '🎵',
      route: '/murottal',
      color: '#00BCD4',
    },
    {
      title: 'Settings',
      icon: '⚙️',
      route: '/settings',
      color: '#607D8B',
    },
  ];

  // Mock prayer times data - replace with actual data from usePrayerTimes
  const nextPrayer = {
    name: 'Dzuhur',
    time: '12:15',
    countdown: '2 jam 30 menit',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="h1" weight="bold" color="primary">
            RabithahAPP
          </Text>
          <Text variant="body" color="secondary">
            Pendamping Spiritual Muslim
          </Text>
        </View>

        {/* Next Prayer Card */}
        <PrayerTimeCard
          prayerName={nextPrayer.name}
          time={nextPrayer.time}
          isNext={true}
          countdown={nextPrayer.countdown}
          location="Jakarta, Indonesia"
        />

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <Card
              key={item.route}
              padding="md"
              hoverable
              onPress={() => router.push(item.route as any)}
              style={styles.menuCard}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text variant="body" weight="semibold" align="center">
                {item.title}
              </Text>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onPress={() => router.push('/quran')}
          >
            Baca Al-Qur'an
          </Button>
          <View style={styles.buttonSpacing} />
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onPress={() => router.push('/wirid')}
          >
            Mulai Wirid
          </Button>
        </View>

        {/* Bottom padding for nav */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 20,
  },
  menuCard: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  quickActions: {
    padding: 20,
    paddingBottom: 20,
  },
  buttonSpacing: {
    height: 12,
  },
  bottomPadding: {
    height: 20,
  },
});
