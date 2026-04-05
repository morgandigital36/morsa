import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../components/atoms/Text.native';
import { Card } from '../components/atoms/Card.native';
import { Button } from '../components/atoms/Button.native';
import { Layout } from '../components/organisms/Layout.native';
import { BottomNav } from '../components/organisms/BottomNav.native';

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export function QiblaCompass() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const rotateAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    getLocation();
    startCompass();

    return () => {
      stopCompass();
    };
  }, []);

  useEffect(() => {
    if (location) {
      const qibla = calculateQiblaDirection(location.lat, location.lng);
      setQiblaDirection(qibla);
    }
  }, [location]);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: heading,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [heading]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Izin lokasi ditolak');
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setError(null);
    } catch (err) {
      setError('Gagal mendapatkan lokasi');
      console.error(err);
    }
  };

  const startCompass = async () => {
    try {
      const isAvailable = await Magnetometer.isAvailableAsync();
      if (!isAvailable) {
        setError('Kompas tidak tersedia di perangkat ini');
        return;
      }

      Magnetometer.setUpdateInterval(100);

      const sub = Magnetometer.addListener((data) => {
        const { x, y } = data;
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        setHeading(360 - angle);
      });

      setSubscription(sub);
    } catch (err) {
      setError('Gagal mengaktifkan kompas');
      console.error(err);
    }
  };

  const stopCompass = () => {
    if (subscription) {
      subscription.remove();
    }
  };

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const lat1 = (lat * Math.PI) / 180;
    const lng1 = (lng * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const lng2 = (KAABA_LNG * Math.PI) / 180;

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const relativeQibla = (qiblaDirection - heading + 360) % 360;
  const isAligned = Math.abs(relativeQibla) < 10 || Math.abs(relativeQibla - 360) < 10;

  const compassRotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Layout title="Kompas Kiblat">
        <View style={styles.content}>
          <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
            Arahkan ponsel untuk menemukan arah kiblat
          </Text>

          {error && (
            <Card variant="accent" padding="md" style={styles.errorCard}>
              <View style={styles.errorContent}>
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text variant="body" style={styles.errorText}>
                  {error}
                </Text>
              </View>
              <Button variant="primary" onPress={getLocation} fullWidth style={styles.retryButton}>
                Coba Lagi
              </Button>
            </Card>
          )}

          {location && (
            <Card padding="sm" style={styles.locationCard}>
              <View style={styles.locationContent}>
                <Ionicons name="location" size={16} color="#6B7280" />
                <Text variant="caption" color="secondary">
                  Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                </Text>
              </View>
            </Card>
          )}

          {/* Compass */}
          <View style={styles.compassContainer}>
            <Animated.View
              style={[
                styles.compassCircle,
                {
                  transform: [{ rotate: compassRotation }],
                },
              ]}
            >
              {/* Cardinal Directions */}
              <View style={[styles.cardinalMark, styles.northMark]}>
                <View style={styles.northCircle}>
                  <Text variant="caption" weight="bold" style={styles.northText}>
                    N
                  </Text>
                </View>
              </View>

              <View style={[styles.cardinalMark, styles.southMark]}>
                <View style={styles.cardinalCircle}>
                  <Text variant="caption" weight="bold" style={styles.cardinalText}>
                    S
                  </Text>
                </View>
              </View>

              <View style={[styles.cardinalMark, styles.westMark]}>
                <View style={styles.cardinalCircle}>
                  <Text variant="caption" weight="bold" style={styles.cardinalText}>
                    W
                  </Text>
                </View>
              </View>

              <View style={[styles.cardinalMark, styles.eastMark]}>
                <View style={styles.cardinalCircle}>
                  <Text variant="caption" weight="bold" style={styles.cardinalText}>
                    E
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Qibla Arrow */}
            <View style={styles.arrowContainer}>
              <Animated.View
                style={[
                  styles.arrow,
                  {
                    transform: [{ rotate: `${qiblaDirection}deg` }],
                  },
                ]}
              >
                <Ionicons
                  name="navigate"
                  size={80}
                  color={isAligned ? '#10B981' : '#2A4D69'}
                />
              </Animated.View>

              <View style={styles.degreeContainer}>
                <Text
                  variant="h3"
                  weight="bold"
                  style={[styles.degreeText, isAligned && styles.degreeAligned]}
                >
                  {qiblaDirection.toFixed(0)}°
                </Text>
              </View>
            </View>
          </View>

          {isAligned && (
            <Card variant="accent" padding="md" style={styles.alignedCard}>
              <View style={styles.alignedContent}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <View style={styles.alignedText}>
                  <Text variant="h4" weight="bold" color="success">
                    Arah Kiblat Ditemukan!
                  </Text>
                  <Text variant="body" color="secondary">
                    Ponsel Anda sudah mengarah ke Kiblat
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {/* Info Card */}
          <Card padding="md">
            <Text variant="h4" weight="semibold" style={styles.infoTitle}>
              Informasi Arah
            </Text>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text variant="caption" color="secondary">
                  Arah Kiblat
                </Text>
                <Text variant="h3" weight="bold">
                  {qiblaDirection.toFixed(0)}°
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text variant="caption" color="secondary">
                  Arah Ponsel
                </Text>
                <Text variant="h3" weight="bold">
                  {heading.toFixed(0)}°
                </Text>
              </View>
            </View>
          </Card>

          <Text variant="caption" color="secondary" align="center" style={styles.hint}>
            Pastikan ponsel dalam posisi horizontal dan jauh dari benda magnetik
          </Text>
        </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    marginBottom: 16,
  },
  errorCard: {
    marginBottom: 16,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  errorText: {
    flex: 1,
    color: '#EF4444',
  },
  retryButton: {
    marginTop: 8,
  },
  locationCard: {
    marginBottom: 16,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  compassContainer: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginVertical: 24,
    position: 'relative',
  },
  compassCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    borderWidth: 8,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  cardinalMark: {
    position: 'absolute',
  },
  northMark: {
    top: 16,
    left: '50%',
    marginLeft: -16,
  },
  southMark: {
    bottom: 16,
    left: '50%',
    marginLeft: -16,
  },
  westMark: {
    left: 16,
    top: '50%',
    marginTop: -16,
  },
  eastMark: {
    right: 16,
    top: '50%',
    marginTop: -16,
  },
  northCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  northText: {
    color: '#FFFFFF',
  },
  cardinalCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardinalText: {
    color: '#FFFFFF',
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  degreeContainer: {
    position: 'absolute',
    bottom: 40,
  },
  degreeText: {
    color: '#2A4D69',
  },
  degreeAligned: {
    color: '#10B981',
  },
  alignedCard: {
    marginBottom: 16,
  },
  alignedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alignedText: {
    flex: 1,
  },
  infoTitle: {
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  hint: {
    marginTop: 16,
  },
});
