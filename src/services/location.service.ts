import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp?: number;
}

const LOCATION_STORAGE_KEY = '@rabithah_user_location';

class LocationService {
  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return null;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      };

      // Save to storage
      await this.saveLocation(locationData);

      return locationData;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  getSavedLocation(): LocationData | null {
    try {
      const stored = AsyncStorage.getItemSync(LOCATION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error getting saved location:', error);
    }
    return null;
  }

  async saveLocation(location: LocationData): Promise<void> {
    try {
      await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } catch (error) {
      console.error('Error saving location:', error);
    }
  }

  async getCityFromCoordinates(lat: number, lon: number): Promise<string> {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });

      if (reverseGeocode.length > 0) {
        const addr = reverseGeocode[0];
        return addr.city || addr.subregion || addr.region || 'Unknown';
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
    return 'Unknown';
  }

  async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getPermissionStatus(): Promise<string> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Error getting permission status:', error);
      return 'undetermined';
    }
  }
}

export const locationService = new LocationService();
export type { LocationData };