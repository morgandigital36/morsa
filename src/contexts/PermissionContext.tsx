import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PermissionContextType {
  locationPermission: PermissionState;
  notificationPermission: NotificationPermission;
  requestLocationPermission: () => Promise<boolean>;
  requestNotificationPermission: () => Promise<boolean>;
  hasAllPermissions: boolean;
  showPermissionModal: boolean;
  dismissPermissionModal: () => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [locationPermission, setLocationPermission] = useState<PermissionState>('prompt');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if ('permissions' in navigator) {
      try {
        const locationStatus = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(locationStatus.state);

        locationStatus.onchange = () => {
          setLocationPermission(locationStatus.state);
        };
      } catch {
        console.log('Permission query not supported');
      }
    }

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    const hasAskedBefore = localStorage.getItem('permissionsAsked');
    if (!hasAskedBefore) {
      setTimeout(() => setShowPermissionModal(true), 1000);
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const result = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      setLocationPermission('granted');

      // Reverse geocode to get city name
      let city = 'Indonesia';
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${result.coords.latitude}&lon=${result.coords.longitude}&format=json`,
          { headers: { 'User-Agent': 'RabithahApp/1.0' } }
        );
        const data = await res.json();
        city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.state ||
          'Indonesia';
      } catch {
        // Geocode failed silently — use default city
      }

      localStorage.setItem(
        'userLocation',
        JSON.stringify({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
          city,
        })
      );
      window.dispatchEvent(new Event('locationUpdated'));
      return true;
    } catch {
      setLocationPermission('denied');
      return false;
    }
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission === 'granted';
    } catch {
      return false;
    }
  };

  const dismissPermissionModal = () => {
    setShowPermissionModal(false);
    localStorage.setItem('permissionsAsked', 'true');
  };

  const hasAllPermissions = locationPermission === 'granted' && notificationPermission === 'granted';

  return (
    <PermissionContext.Provider
      value={{
        locationPermission,
        notificationPermission,
        requestLocationPermission,
        requestNotificationPermission,
        hasAllPermissions,
        showPermissionModal,
        dismissPermissionModal,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within PermissionProvider');
  }
  return context;
}
