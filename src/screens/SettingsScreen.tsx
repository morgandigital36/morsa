import { useState, useEffect } from 'react';
import { Layout } from '../components/organisms/Layout';
import { Card } from '../components/atoms/Card';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import {
  Moon,
  Sun,
  Bell,
  BellOff,
  MapPin,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePermissions } from '../contexts/PermissionContext';
import { locationService } from '../services/location.service';
import { usePrayerTimes } from '../hooks/usePrayerTimes';

export function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { locationPermission, notificationPermission, requestLocationPermission, requestNotificationPermission } = usePermissions();
  const { notificationsEnabled, toggleNotifications } = usePrayerTimes();
  const [location, setLocation] = useState<string>('Belum diatur');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const savedLocation = locationService.getSavedLocation();
    if (savedLocation) {
      const city = await locationService.getCityFromCoordinates(
        savedLocation.latitude,
        savedLocation.longitude
      );
      setLocation(city);
    }
  };

  const handleRequestLocation = async () => {
    setIsLoadingLocation(true);
    const granted = await requestLocationPermission();
    if (granted) {
      const locationData = await locationService.getCurrentLocation();
      if (locationData) {
        const city = await locationService.getCityFromCoordinates(
          locationData.latitude,
          locationData.longitude
        );
        setLocation(city);
      }
    }
    setIsLoadingLocation(false);
  };

  const handleToggleNotifications = async () => {
    if (notificationPermission !== 'granted') {
      const granted = await requestNotificationPermission();
      if (granted) {
        toggleNotifications(true);
      }
    } else {
      toggleNotifications(!notificationsEnabled);
    }
  };

  const getPermissionStatus = (permission: PermissionState | NotificationPermission) => {
    switch (permission) {
      case 'granted':
        return { icon: Check, color: 'text-green-600', text: 'Diizinkan' };
      case 'denied':
        return { icon: AlertCircle, color: 'text-red-600', text: 'Ditolak' };
      default:
        return { icon: AlertCircle, color: 'text-yellow-600', text: 'Belum diatur' };
    }
  };

  const locationStatus = getPermissionStatus(locationPermission);
  const notificationStatus = getPermissionStatus(notificationPermission);

  return (
    <Layout title="Pengaturan">
      <div className="space-y-6 pb-6">
        <div className="space-y-3">
          <Text variant="caption" weight="semibold" color="secondary" className="px-2">
            Tampilan
          </Text>

          <Card>
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-teal-600 dark:text-teal-400">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <Text variant="body" weight="medium">
                  Mode Tema
                </Text>
              </div>

              <Text variant="caption" color="secondary">
                {theme === 'dark' ? 'Gelap' : 'Terang'}
              </Text>
            </button>
          </Card>
        </div>

        <div className="space-y-3">
          <Text variant="caption" weight="semibold" color="secondary" className="px-2">
            Izin Aplikasi
          </Text>

          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <Text variant="body" weight="medium">
                      Akses Lokasi
                    </Text>
                    <Text variant="caption" color="secondary" className="mt-1">
                      {location}
                    </Text>
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${locationStatus.color}`}>
                  <locationStatus.icon className="w-4 h-4" />
                  <Text variant="caption" className={locationStatus.color}>
                    {locationStatus.text}
                  </Text>
                </div>
              </div>
              {locationPermission !== 'granted' && (
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={handleRequestLocation}
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? 'Memuat...' : 'Izinkan Akses Lokasi'}
                </Button>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <Text variant="body" weight="medium">
                      Notifikasi Adzan
                    </Text>
                    <Text variant="caption" color="secondary" className="mt-1">
                      Pengingat waktu sholat dengan suara adzan
                    </Text>
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${notificationStatus.color}`}>
                  <notificationStatus.icon className="w-4 h-4" />
                  <Text variant="caption" className={notificationStatus.color}>
                    {notificationStatus.text}
                  </Text>
                </div>
              </div>
              {notificationPermission === 'granted' ? (
                <Button
                  variant={notificationsEnabled ? 'primary' : 'secondary'}
                  size="sm"
                  fullWidth
                  onClick={handleToggleNotifications}
                  leftIcon={notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                >
                  {notificationsEnabled ? 'Notifikasi Aktif' : 'Aktifkan Notifikasi'}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={handleToggleNotifications}
                >
                  Izinkan Notifikasi
                </Button>
              )}
            </div>
          </Card>
        </div>

        <Card>
          <div className="p-4 space-y-3">
            <Text variant="h4" weight="semibold">
              Tentang Aplikasi
            </Text>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <Text variant="caption" color="secondary">
                  Versi
                </Text>
                <Text variant="caption" weight="medium">
                  1.0.0
                </Text>
              </div>

              <div className="flex justify-between">
                <Text variant="caption" color="secondary">
                  Platform
                </Text>
                <Text variant="caption" weight="medium">
                  Web
                </Text>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center pt-4">
          <Text variant="caption" color="secondary">
            © 2024 RabithahAPP. All rights reserved.
          </Text>
        </div>
      </div>
    </Layout>
  );
}
