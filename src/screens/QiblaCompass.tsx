import { useState, useEffect } from 'react';
import { Card } from '../components/atoms/Card';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { MapPin, Navigation } from 'lucide-react';
import { BottomNav } from '../components/organisms/BottomNav';

// Extend DeviceOrientationEvent for Safari
interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export function QiblaCompass() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<PermissionState>('prompt');

  useEffect(() => {
    getLocation();
    checkPermission();
  }, []);

  useEffect(() => {
    if (location) {
      const qibla = calculateQiblaDirection(location.lat, location.lng);
      setQiblaDirection(qibla);
    }
  }, [location]);

  useEffect(() => {
    if (permission === 'granted') {
      startCompass();
    }

    return () => {
      stopCompass();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission]);

  const checkPermission = async () => {
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        setPermission(result.state);
      } catch (err) {
        console.error('Permission check error:', err);
      }
    }
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError('Gagal mendapatkan lokasi. Pastikan GPS aktif.');
          console.error(err);
        }
      );
    } else {
      setError('Browser tidak mendukung geolocation');
    }
  };

  const startCompass = () => {
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else if ('ondeviceorientationabsolute' in window) {
      (window as Window).addEventListener('deviceorientationabsolute' as keyof WindowEventMap, handleOrientation as EventListener);
    } else {
      setError('Browser tidak mendukung kompas');
    }
  };

  const stopCompass = () => {
    window.removeEventListener('deviceorientation', handleOrientation);
    (window as Window).removeEventListener('deviceorientationabsolute' as keyof WindowEventMap, handleOrientation as EventListener);
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const extEvent = event as DeviceOrientationEventExtended;
    let alpha = extEvent.alpha;

    if (alpha !== null && alpha !== undefined) {
      if (extEvent.webkitCompassHeading) {
        alpha = extEvent.webkitCompassHeading;
      }

      setHeading(360 - alpha);
    }
  };

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const lat1 = (lat * Math.PI) / 180;
    const lng1 = (lng * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const lng2 = (KAABA_LNG * Math.PI) / 180;

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const relativeQibla = (qiblaDirection - heading + 360) % 360;
  const isAligned = Math.abs(relativeQibla) < 5 || Math.abs(relativeQibla - 360) < 5;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 pb-24">
      <div className="container-app max-w-2xl space-y-8">
        <div className="text-center">
          <Text variant="h1" weight="bold" className="text-gradient">
            Kompas Kiblat
          </Text>
          <Text variant="body" color="secondary" className="mt-2">
            Arahkan ponsel untuk menemukan arah kiblat
          </Text>
        </div>

        {error && (
          <Card variant="accent" padding="md">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <Navigation className="w-5 h-5" />
              <Text variant="body">{error}</Text>
            </div>
            <Button variant="primary" onClick={getLocation} className="mt-4" fullWidth>
              Coba Lagi
            </Button>
          </Card>
        )}

        {location && (
          <Card padding="md">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>
                Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
              </span>
            </div>
          </Card>
        )}

        <div className="relative">
          <div className="w-full aspect-square max-w-md mx-auto relative">
            <div
              className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"
              style={{
                transform: `rotate(${heading}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                  N
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
              </div>

              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">
                  W
                </div>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div
                  className={`transition-transform duration-100 ${
                    isAligned ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    transform: `rotate(${qiblaDirection}deg)`,
                  }}
                >
                  <Navigation
                    className={`w-24 h-24 ${
                      isAligned
                        ? 'text-emerald-500 drop-shadow-lg'
                        : 'text-teal-600 dark:text-teal-400'
                    }`}
                    fill="currentColor"
                  />
                </div>

                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Text
                    variant="h3"
                    weight="bold"
                    color={isAligned ? 'success' : 'primary'}
                    align="center"
                  >
                    {qiblaDirection.toFixed(0)}°
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isAligned && (
          <Card variant="accent" padding="md" className="animate-fade-in">
            <div className="text-center space-y-2">
              <Text variant="h3" weight="bold" color="success">
                ✓ Arah Kiblat Ditemukan!
              </Text>
              <Text variant="body" color="secondary">
                Ponsel Anda sudah mengarah ke Kiblat
              </Text>
            </div>
          </Card>
        )}

        <Card padding="md">
          <div className="space-y-3">
            <Text variant="h4" weight="semibold">
              Informasi Arah
            </Text>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Text variant="caption" color="secondary">
                  Arah Kiblat
                </Text>
                <Text variant="h3" weight="bold">
                  {qiblaDirection.toFixed(0)}°
                </Text>
              </div>

              <div>
                <Text variant="caption" color="secondary">
                  Arah Ponsel
                </Text>
                <Text variant="h3" weight="bold">
                  {heading.toFixed(0)}°
                </Text>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center space-y-2">
          <Text variant="caption" color="secondary">
            Pastikan ponsel dalam posisi horizontal dan jauh dari benda magnetik
          </Text>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
