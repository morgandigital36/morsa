import { useState, useEffect, useRef } from 'react';
import { prayerService, PrayerTimesData } from '../services/api/prayer.service';
import { notificationService } from '../services/notification.service';
import { locationService } from '../services/location.service';

interface NextPrayer {
  name: string;
  time: string;
  countdown: string;
}

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const prayerTimesRef = useRef<PrayerTimesData | null>(null);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    fetchPrayerTimes();
    
    // Update next prayer countdown every second
    const interval = setInterval(() => {
      if (prayerTimesRef.current) updateNextPrayer(prayerTimesRef.current);
    }, 1000);

    const notifEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    setNotificationsEnabled(notifEnabled);

    // Listen to location updates
    const handleLocationUpdate = () => {
      fetchPrayerTimes();
    };
    window.addEventListener('locationUpdated', handleLocationUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('locationUpdated', handleLocationUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prayerTimes && notificationsEnabled && notificationService.isNotificationEnabled()) {
      const prayerRecord: Record<string, string> = {
        fajr: prayerTimes.fajr,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
      };
      notificationService.scheduleNotifications(prayerRecord);
    }
    return () => {
      notificationService.clearScheduledNotifications();
    };
  }, [prayerTimes, notificationsEnabled]);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      setError(null);

      let location = locationService.getSavedLocation();
      if (!location) {
        location = await locationService.getCurrentLocation();
      }

      if (location && location.latitude && location.longitude) {
        const times = await prayerService.getPrayerTimesByCoordinates(
          location.latitude,
          location.longitude
        );
        setPrayerTimes(times);
        prayerTimesRef.current = times;
        updateNextPrayer(times);
      } else {
        const times = await prayerService.getPrayerTimesByCityId('1301');
        setPrayerTimes(times);
        prayerTimesRef.current = times;
        updateNextPrayer(times);
      }
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      setError('Gagal memuat jadwal sholat');
      try {
        const times = await prayerService.getPrayerTimesByCityId('1301');
        setPrayerTimes(times);
        prayerTimesRef.current = times;
        updateNextPrayer(times);
      } catch (fallbackErr) {
        console.error('Fallback also failed:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem('notificationsEnabled', enabled.toString());
  };

  const updateNextPrayer = (times: PrayerTimesData) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const prayers = [
      { name: 'Subuh', time: times.fajr },
      { name: 'Dzuhur', time: times.dhuhr },
      { name: 'Ashar', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isya', time: times.isha },
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      if (prayerMinutes > currentMinutes) {
        const diffMinutes = prayerMinutes - currentMinutes;
        const hrs = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        const secs = now.getSeconds();
        const countdown = hrs > 0 ? `${hrs} jam ${mins} menit` : `${mins} menit ${60 - secs} detik`;
        setNextPrayer({ name: prayer.name, time: prayer.time, countdown });
        return;
      }
    }

    const firstPrayer = prayers[0];
    const [hours, minutes] = firstPrayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;
    const diffMinutes = (24 * 60 - currentMinutes) + prayerMinutes;
    const hrs = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    const countdown = `${hrs} jam ${mins} menit`;
    setNextPrayer({ name: firstPrayer.name, time: firstPrayer.time, countdown });
  };

  const getAllPrayers = () => {
    if (!prayerTimes) return [];
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const prayers = [
      { name: 'Subuh', time: prayerTimes.fajr },
      { name: 'Terbit', time: prayerTimes.sunrise },
      { name: 'Dzuhur', time: prayerTimes.dhuhr },
      { name: 'Ashar', time: prayerTimes.asr },
      { name: 'Maghrib', time: prayerTimes.maghrib },
      { name: 'Isya', time: prayerTimes.isha },
    ];

    return prayers.map((prayer) => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      return { ...prayer, isPassed: prayerMinutes < currentMinutes };
    });
  };

  return {
    prayerTimes,
    nextPrayer,
    allPrayers: getAllPrayers(),
    loading,
    error,
    refetch: fetchPrayerTimes,
    notificationsEnabled,
    toggleNotifications,
  };
}
