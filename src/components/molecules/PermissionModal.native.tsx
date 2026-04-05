import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text.native';
import { Button } from '../atoms/Button.native';
import { Card } from '../atoms/Card.native';
import { usePermissions } from '../../contexts/PermissionContext.native';
import * as Haptics from 'expo-haptics';

export function PermissionModal() {
  const {
    showPermissionModal,
    locationPermission,
    notificationPermission,
    requestLocationPermission,
    requestNotificationPermission,
    dismissPermissionModal,
  } = usePermissions();

  const handleRequestPermissions = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (locationPermission !== 'granted') {
      await requestLocationPermission();
    }
    if (notificationPermission !== 'granted') {
      await requestNotificationPermission();
    }
    dismissPermissionModal();
  };

  const handleDismiss = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dismissPermissionModal();
  };

  return (
    <Modal
      visible={showPermissionModal}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={handleDismiss}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="notifications" size={40} color="#FFFFFF" />
                  </View>
                </View>

                {/* Title */}
                <Text variant="h2" weight="bold" align="center" style={styles.title}>
                  Izinkan Akses
                </Text>
                <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
                  Untuk memberikan pengalaman terbaik, aplikasi memerlukan beberapa izin
                </Text>

                {/* Permissions */}
                <View style={styles.permissionsContainer}>
                  {/* Location Permission */}
                  <View style={styles.permissionItem}>
                    <View style={styles.permissionIcon}>
                      <Ionicons name="location" size={24} color="#14B8A6" />
                    </View>
                    <View style={styles.permissionText}>
                      <Text variant="body" weight="semibold" style={styles.permissionTitle}>
                        Lokasi
                      </Text>
                      <Text variant="caption" color="secondary">
                        Untuk menentukan waktu sholat yang akurat sesuai lokasi Anda
                      </Text>
                    </View>
                  </View>

                  {/* Notification Permission */}
                  <View style={styles.permissionItem}>
                    <View style={styles.permissionIcon}>
                      <Ionicons name="notifications" size={24} color="#14B8A6" />
                    </View>
                    <View style={styles.permissionText}>
                      <Text variant="body" weight="semibold" style={styles.permissionTitle}>
                        Notifikasi
                      </Text>
                      <Text variant="caption" color="secondary">
                        Untuk mengingatkan Anda saat waktu adzan tiba
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                  <Button
                    variant="primary"
                    size="large"
                    fullWidth
                    onPress={handleRequestPermissions}
                  >
                    Izinkan Akses
                  </Button>
                  <Button
                    variant="ghost"
                    size="large"
                    fullWidth
                    onPress={handleDismiss}
                  >
                    Nanti Saja
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Card>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 8,
  },
  content: {
    padding: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#14B8A6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  permissionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  permissionItem: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  permissionIcon: {
    marginTop: 2,
  },
  permissionText: {
    flex: 1,
    gap: 4,
  },
  permissionTitle: {
    marginBottom: 4,
  },
  buttonsContainer: {
    gap: 12,
  },
});
