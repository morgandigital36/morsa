import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Button } from '../components/atoms/Button.native';
import { Layout } from '../components/organisms/Layout.native';
import { BottomNav } from '../components/organisms/BottomNav.native';
import { useTheme } from '../contexts/ThemeContext.native';
import { usePermissions } from '../contexts/PermissionContext.native';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

const NOTIFICATIONS_ENABLED_KEY = '@rabithah_notifications_enabled';

export function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { 
    locationPermission, 
    notificationPermission, 
    requestLocationPermission, 
    requestNotificationPermission 
  } = usePermissions();
  
  const [location, setLocation] = useState<string>('Belum diatur');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    // Load location
    try {
      const savedLocation = await AsyncStorage.getItem('@rabithah_user_location');
      if (savedLocation) {
        const locationData = JSON.parse(savedLocation);
        // Try to get city name
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const reverseGeocode = await Location.reverseGeocodeAsync({
              latitude: locationData.latitude,
              longitude: locationData.longitude,
            });
            if (reverseGeocode.length > 0) {
              const addr = reverseGeocode[0];
              setLocation(addr.city || addr.subregion || 'Lokasi tersimpan');
            }
          }
        } catch (e) {
          setLocation('Lokasi tersimpan');
        }
      }
    } catch (e) {
      console.error('Error loading location:', e);
    }

    // Load notifications setting
    try {
      const notifEnabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
      setNotificationsEnabled(notifEnabled === 'true');
    } catch (e) {
      console.error('Error loading notifications:', e);
    }
  };

  const handleRequestLocation = async () => {
    impactAsync(ImpactFeedbackStyle.Medium);
    setIsLoadingLocation(true);
    
    const granted = await requestLocationPermission();
    if (granted) {
      try {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        await AsyncStorage.setItem('@rabithah_user_location', JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
        }));

        // Try to get city name
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (reverseGeocode.length > 0) {
            const addr = reverseGeocode[0];
            setLocation(addr.city || addr.subregion || 'Lokasi berhasil disimpan');
          }
        } catch (e) {
          setLocation('Lokasi berhasil disimpan');
        }
      } catch (e) {
        Alert.alert('Error', 'Gagal mendapatkan lokasi');
      }
    }
    
    setIsLoadingLocation(false);
  };

  const handleToggleNotifications = async () => {
    impactAsync(ImpactFeedbackStyle.Medium);
    
    if (notificationPermission !== 'granted') {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'true');
      }
    } else {
      const newValue = !notificationsEnabled;
      setNotificationsEnabled(newValue);
      await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, newValue.toString());
    }
  };

  const handleToggleTheme = () => {
    impactAsync(ImpactFeedbackStyle.Light);
    toggleTheme();
  };

  const getPermissionStatus = (permission: string) => {
    switch (permission) {
      case 'granted':
        return { icon: 'checkmark-circle', color: '#10B981', text: 'Diizinkan' };
      case 'denied':
        return { icon: 'alert-circle', color: '#EF4444', text: 'Ditolak' };
      default:
        return { icon: 'alert-circle', color: '#F59E0B', text: 'Belum diatur' };
    }
  };

  const locationStatus = getPermissionStatus(locationPermission);
  const notificationStatus = getPermissionStatus(notificationPermission);

  return (
    <View style={styles.container}>
      <Layout title="Pengaturan">
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Theme Section */}
          <View style={styles.section}>
            <Text variant="caption" weight="semibold" color="secondary" style={styles.sectionTitle}>
              Tampilan
            </Text>

            <Card>
              <TouchableOpacity
                onPress={handleToggleTheme}
                style={styles.settingItem}
                activeOpacity={0.7}
              >
                <View style={styles.settingLeft}>
                  <Ionicons 
                    name={theme === 'dark' ? 'moon' : 'sunny'} 
                    size={20} 
                    color="#14B8A6" 
                  />
                  <Text variant="body" weight="medium" style={styles.settingLabel}>
                    Mode Tema
                  </Text>
                </View>

                <Text variant="caption" color="secondary">
                  {theme === 'dark' ? 'Gelap' : theme === 'light' ? 'Terang' : 'Otomatis'}
                </Text>
              </TouchableOpacity>
            </Card>
          </View>

          {/* Permissions Section */}
          <View style={styles.section}>
            <Text variant="caption" weight="semibold" color="secondary" style={styles.sectionTitle}>
              Izin Aplikasi
            </Text>

            <Card style={styles.card}>
              {/* Location Permission */}
              <View style={styles.permissionItem}>
                <View style={styles.permissionContent}>
                  <View style={styles.settingLeft}>
                    <Ionicons name="location" size={20} color="#14B8A6" />
                    <View style={styles.permissionInfo}>
                      <Text variant="body" weight="medium">
                        Akses Lokasi
                      </Text>
                      <Text variant="caption" color="secondary" style={styles.permissionSubtext}>
                        {location}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.statusContainer}>
                    <Ionicons name={locationStatus.icon as any} size={16} color={locationStatus.color} />
                    <Text variant="caption" style={[styles.statusText, { color: locationStatus.color }]}>
                      {locationStatus.text}
                    </Text>
                  </View>
                </View>

                {locationPermission !== 'granted' && (
                  <Button
                    variant="secondary"
                    size="small"
                    onPress={handleRequestLocation}
                    loading={isLoadingLocation}
                    style={styles.permissionButton}
                  >
                    {isLoadingLocation ? 'Memuat...' : 'Izinkan Akses Lokasi'}
                  </Button>
                )}
              </View>

              <View style={styles.divider} />

              {/* Notification Permission */}
              <View style={styles.permissionItem}>
                <View style={styles.permissionContent}>
                  <View style={styles.settingLeft}>
                    <Ionicons name="notifications" size={20} color="#14B8A6" />
                    <View style={styles.permissionInfo}>
                      <Text variant="body" weight="medium">
                        Notifikasi Adzan
                      </Text>
                      <Text variant="caption" color="secondary" style={styles.permissionSubtext}>
                        Pengingat waktu sholat dengan suara adzan
                      </Text>
                    </View>
                  </View>

                  <View style={styles.statusContainer}>
                    <Ionicons name={notificationStatus.icon as any} size={16} color={notificationStatus.color} />
                    <Text variant="caption" style={[styles.statusText, { color: notificationStatus.color }]}>
                      {notificationStatus.text}
                    </Text>
                  </View>
                </View>

                {notificationPermission === 'granted' ? (
                  <View style={styles.toggleContainer}>
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={handleToggleNotifications}
                      trackColor={{ false: '#E5E7EB', true: '#14B8A6' }}
                      thumbColor="#FFFFFF"
                    />
                  </View>
                ) : (
                  <Button
                    variant="secondary"
                    size="small"
                    onPress={handleToggleNotifications}
                    style={styles.permissionButton}
                  >
                    Izinkan Notifikasi
                  </Button>
                )}
              </View>
            </Card>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text variant="caption" weight="semibold" color="secondary" style={styles.sectionTitle}>
              Tentang Aplikasi
            </Text>

            <Card>
              <View style={styles.aboutContent}>
                <Text variant="h4" weight="semibold" style={styles.aboutTitle}>
                  RabithahAPP
                </Text>

                <View style={styles.aboutInfo}>
                  <View style={styles.aboutRow}>
                    <Text variant="caption" color="secondary">
                      Versi
                    </Text>
                    <Text variant="caption" weight="medium">
                      1.0.0
                    </Text>
                  </View>

                  <View style={styles.aboutRow}>
                    <Text variant="caption" color="secondary">
                      Platform
                    </Text>
                    <Text variant="caption" weight="medium">
                      React Native (Expo)
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text variant="caption" color="secondary" align="center">
              © 2024 RabithahAPP. All rights reserved.
            </Text>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </Layout>

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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    marginLeft: 4,
  },
  permissionItem: {
    padding: 16,
  },
  permissionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  permissionInfo: {
    flex: 1,
    marginLeft: 4,
  },
  permissionSubtext: {
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
  },
  permissionButton: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  toggleContainer: {
    marginTop: 8,
  },
  aboutContent: {
    padding: 16,
  },
  aboutTitle: {
    marginBottom: 16,
  },
  aboutInfo: {
    gap: 8,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingVertical: 24,
  },
  bottomPadding: {
    height: 100,
  },
});