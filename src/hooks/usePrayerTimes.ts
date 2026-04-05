import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { prayerService, PrayerTimesData } from '../services/api/prayer.service';
import { locationService, LocationData } from '../services/location.service';
import { notificationService } from '../services/notification.service';

const PRAYER_TIMES_CACHE_KEY = '@rabithah_prayer_times_cache';
const PRAYER_TIMES_DATE_KEY = '@rabithah_prayer_times_date';
const NOTIFICATIONS_ENABLED_KEY = '@rabithah_notifications_enabled';

interface UsePrayerTimesResult {
  prayerTimes: PrayerTimesData | null;
  loading: boolean;
  error: string | null;
  location: LocationData | null;
  notificationsEnabled: boolean;
  refetch: () => Promise<void>;
  toggleNotifications: (enabled: boolean) => Promise<void>;
}

export function usePrayerTimes(): UsePrayerTimesResult {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load saved location
      const savedLocation = locationService.getSavedLocation();
      if (savedLocation) {
        setLocation(savedLocation);
        await loadPrayerTimes(savedLocation.latitude, savedLocation.longitude);
      } else {
        // Try to get current location
        const currentLocation = await locationService.getCurrentLocation();
        if (currentLocation) {
          setLocation(currentLocation);
          await loadPrayerTimes(currentLocation.latitude, currentLocation.longitude);
        } else {
          // Use default location (Jakarta)
          const defaultLocation = { latitude: -6.2088, longitude: 106.8456 };
          setLocation(defaultLocation);
          await loadPrayerTimes(defaultLocation.latitude, defaultLocation.longitude);
        }
      }

      // Load notification setting
      const notifEnabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
      setNotificationsEnabled(notifEnabled === 'true');
    } catch (err) {
      setError('Gagal memuat jadwal sholat');
      console.error('Error loading prayer times:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPrayerTimes = async (lat: number, lon: number) => {
    try {
      // Check cache first
      const cachedDate = await AsyncStorage.getItem(PRAYER_TIMES_DATE_KEY);
      const today = new Date().toISOString().split('T')[0];

      if (cachedDate === today) {
        const cached = await AsyncStorage.getItem(PRAYER_TIMES_CACHE_KEY);
        if (cached) {
          setPrayerTimes(JSON.parse(cached));
          return;
        }
      }

      // Fetch fresh data
      const data = await prayerService.getPrayerTimesByCoordinates(lat, lon);
      
      if (data) {
        setPrayerTimes(data);
        
        // Cache the result
        await AsyncStorage.setItem(PRAYER_TIMES_CACHE_KEY, JSON.stringify(data));
        await AsyncStorage.setItem(PRAYER_TIMES_DATE_KEY, today);
      }
    } catch (err) {
      console.error('Error loading prayer times:', err);
      // Try to use cached data even if expired
      const cached = await AsyncStorage.getItem(PRAYER_TIMES_CACHE_KEY);
      if (cached) {
        setPrayerTimes(JSON.parse(cached));
      }
    }
  };

  const refetch = useCallback(async () => {
    if (location) {
      setLoading(true);
      await loadPrayerTimes(location.latitude, location.longitude);
      setLoading(false);
    }
  }, [location]);

  const toggleNotifications = useCallback(async (enabled: boolean) => {
    try {
      if (enabled) {
        const hasPermission = await notificationService.requestPermission();
        if (hasPermission) {
          setNotificationsEnabled(true);
          await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'true');
          
          // Schedule prayer notifications if prayer times available
          if (prayerTimes) {
            const prayers = [
              { name: 'Subuh', time: prayerTimes.subuh, hours: 4, minutes: 30 },
              { name: 'Dzuhur', time: prayerTimes.dzuhur, hours: 12, minutes: 0 },
              { name: 'Ashar', time: prayerTimes.ashar, hours: 15, minutes: 15 },
              { name: 'Maghrib', time: prayerTimes.maghrib, hours: 18, minutes: 0 },
              { name: 'Isya', time: prayerTimes.isya, hours: 19, minutes: 15 },
            ];
            await notificationService.scheduleDailyPrayerNotifications(prayers);
          }
        }
      } else {
        await notificationService.cancelAllNotifications();
        setNotificationsEnabled(false);
        await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'false');
      }
    } catch (err) {
      console.error('Error toggling notifications:', err);
    }
  }, [prayerTimes]);

  return {
    prayerTimes,
    loading,
    error,
    location,
    notificationsEnabled,
    refetch,
    toggleNotifications,
  };
}