import { MapPin, Bell, X } from 'lucide-react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { usePermissions } from '../../contexts/PermissionContext';

export function PermissionModal() {
  const {
    showPermissionModal,
    locationPermission,
    notificationPermission,
    requestLocationPermission,
    requestNotificationPermission,
    dismissPermissionModal,
  } = usePermissions();

  if (!showPermissionModal) return null;

  const handleRequestPermissions = async () => {
    if (locationPermission !== 'granted') {
      await requestLocationPermission();
    }
    if (notificationPermission !== 'granted') {
      await requestNotificationPermission();
    }
    dismissPermissionModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="max-w-md w-full relative">
        <button
          onClick={dismissPermissionModal}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <Text variant="h2" weight="bold" className="mb-2">
              Izinkan Akses
            </Text>
            <Text variant="body" color="secondary">
              Untuk memberikan pengalaman terbaik, aplikasi memerlukan beberapa izin
            </Text>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <Text variant="body" weight="semibold" className="mb-1">
                  Lokasi
                </Text>
                <Text variant="caption" color="secondary">
                  Untuk menentukan waktu sholat yang akurat sesuai lokasi Anda
                </Text>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Bell className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <Text variant="body" weight="semibold" className="mb-1">
                  Notifikasi
                </Text>
                <Text variant="caption" color="secondary">
                  Untuk mengingatkan Anda saat waktu adzan tiba
                </Text>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="primary" fullWidth onClick={handleRequestPermissions}>
              Izinkan Akses
            </Button>
            <Button variant="ghost" fullWidth onClick={dismissPermissionModal}>
              Nanti Saja
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
