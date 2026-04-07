export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
}

class LocationService {
  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const city = await this.getCityFromCoordinates(locationData.latitude, locationData.longitude);
      locationData.city = city;

      localStorage.setItem('userLocation', JSON.stringify(locationData));
      window.dispatchEvent(new Event('locationUpdated'));
      return locationData;
    } catch (error) {
      console.error('Error getting location:', error);
      return this.getSavedLocation();
    }
  }

  getSavedLocation(): LocationData | null {
    const saved = localStorage.getItem('userLocation');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }

  async getCityFromCoordinates(lat: number, lon: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          headers: {
            'User-Agent': 'IslamicApp/1.0'
          }
        }
      );
      const data = await response.json();
      return data.address?.city || data.address?.town || data.address?.village || data.address?.state || 'Unknown Location';
    } catch (error) {
      console.error('Error getting city name:', error);
      return 'Unknown Location';
    }
  }

  clearSavedLocation() {
    localStorage.removeItem('userLocation');
    window.dispatchEvent(new Event('locationUpdated'));
  }
}

export const locationService = new LocationService();
