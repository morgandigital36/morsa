import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const NOTIFICATIONS_ENABLED_KEY = '@rabithah_notifications_enabled';
const PRAYER_NOTIFICATION_CHANNEL = 'prayer-times';

class NotificationService {
  constructor() {
    this.configureNotifications();
  }

  private async configureNotifications() {
    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Configure Android channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(PRAYER_NOTIFICATION_CHANNEL, {
        name: 'Prayer Times',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
        enableVibrate: true,
        showBadge: true,
      });
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!Device.isDevice) {
      console.log('Notifications only work on physical devices');
      return false;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      if (existingStatus === 'granted') {
        return true;
      }

      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  async getPermissionStatus(): Promise<string> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Error getting permission status:', error);
      return 'undetermined';
    }
  }

  async isEnabled(): Promise<boolean> {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
      return stored === 'true';
    } catch (error) {
      console.error('Error getting notification status:', error);
      return false;
    }
  }

  async setEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, enabled.toString());
    } catch (error) {
      console.error('Error saving notification status:', error);
    }
  }

  async schedulePrayerNotification(
    prayerName: string,
    time: Date,
    prayerTime: string
  ): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.log('No notification permission');
        return null;
      }

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: '🕌 Waktu Sholat',
          body: `Sekarang waktu ${prayerName} (${prayerTime})`,
          data: { prayerName, prayerTime },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: time,
          channelId: PRAYER_NOTIFICATION_CHANNEL,
        },
      });

      return identifier;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  async scheduleDailyPrayerNotifications(
    prayers: { name: string; time: string; hours: number; minutes: number }[]
  ): Promise<void> {
    try {
      // Cancel existing notifications first
      await this.cancelAllNotifications();

      const now = new Date();

      for (const prayer of prayers) {
        const triggerTime = new Date(now);
        triggerTime.setHours(prayer.hours, prayer.minutes, 0, 0);

        // If time has passed today, schedule for tomorrow
        if (triggerTime <= now) {
          triggerTime.setDate(triggerTime.getDate() + 1);
        }

        await this.schedulePrayerNotification(
          prayer.name,
          triggerTime,
          prayer.time
        );
      }
    } catch (error) {
      console.error('Error scheduling daily notifications:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }

  async cancelNotification(identifier: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  async showImmediateNotification(
    title: string,
    body: string,
    data?: Record<string, any>
  ): Promise<void> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: null, // Immediate
      });
    } catch (error) {
      console.error('Error showing immediate notification:', error);
    }
  }

  async playAdzanSound(): Promise<void> {
    // This would play a custom adzan sound
    // For now, we use the default notification sound
    await this.showImmediateNotification(
      '🕌 Adzan',
      'Waktunya melaksanakan sholat',
      { type: 'adzan' }
    );
  }

  addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
  ): Notifications.EventSubscription {
    return Notifications.addNotificationReceivedListener(callback);
  }

  addNotificationResponseListener(
    callback: (response: Notifications.NotificationResponse) => void
  ): Notifications.EventSubscription {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }
}

export const notificationService = new NotificationService();