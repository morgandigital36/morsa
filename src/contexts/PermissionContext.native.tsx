import { createContext, useContext, useState, useEffect, ReactNode, Platform } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

interface PermissionContextType {
  locationPermission: PermissionStatus;
  notificationPermission: PermissionStatus;
  requestLocationPermission: () => Promise<boolean>;
  requestNotificationPermission: () => Promise<boolean>;
  hasAllPermissions: boolean;
  showPermissionModal: boolean;
  dismissPermissionModal: () => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

const PERMISSIONS_ASKED_KEY = '@rabithah_permissions_asked';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [locationPermission, setLocationPermission] = useState<PermissionStatus>('undetermined');
  const [notificationPermission, setNotificationPermission] = useState<PermissionStatus>('undetermined');
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    // Check location permission
    try {
      const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(mapPermissionStatus(locationStatus));
    } catch (error) {
      console.error('Error checking location permission:', error);
    }

    // Check notification permission
    try {
      const { status: notificationStatus } = await Notifications.getPermissionsAsync();
      setNotificationPermission(mapPermissionStatus(notificationStatus));
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }

    // Show permission modal if not asked before
    try {
      const hasAskedBefore = await AsyncStorage.getItem(PERMISSIONS_ASKED_KEY);
      if (!hasAskedBefore) {
        setTimeout(() => setShowPermissionModal(true), 2000);
      }
    } catch (error) {
      console.error('Error checking permissions asked:', error);
    }
  };

  const mapPermissionStatus = (status: Location.PermissionStatus | Notifications.PermissionStatus): PermissionStatus => {
    if (status === Location.PermissionStatus.GRANTED || status === Notifications.PermissionStatus.GRANTED) {
      return 'granted';
    }
    if (status === Location.PermissionStatus.DENIED || status === Notifications.PermissionStatus.DENIED) {
      return 'denied';
    }
    return 'undetermined';
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const permissionStatus = mapPermissionStatus(status);
      setLocationPermission(permissionStatus);

      if (status === Location.PermissionStatus.GRANTED) {
        // Get and save current location
        try {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          
          await AsyncStorage.setItem(
            '@rabithah_user_location',
            JSON.stringify({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              timestamp: Date.now(),
            })
          );
        } catch (error) {
          console.error('Error getting location:', error);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationPermission('denied');
      return false;
    }
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      const permissionStatus = mapPermissionStatus(status);
      setNotificationPermission(permissionStatus);

      if (status === Notifications.PermissionStatus.GRANTED) {
        // Configure notification channel for Android
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('prayer-times', {
            name: 'Prayer Times',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            sound: 'default',
            enableVibrate: true,
          });
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setNotificationPermission('denied');
      return false;
    }
  };

  const dismissPermissionModal = async () => {
    setShowPermissionModal(false);
    try {
      await AsyncStorage.setItem(PERMISSIONS_ASKED_KEY, 'true');
    } catch (error) {
      console.error('Error saving permissions asked:', error);
    }
  };

  const hasAllPermissions = 
    locationPermission === 'granted' && 
    notificationPermission === 'granted';

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
