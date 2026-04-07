const ADZAN_AUDIO_URL = 'https://res.cloudinary.com/dbi8w5ps2/video/upload/v1775310260/mecca_56_22_revf8y.mp3';

class NotificationService {
  private audio: HTMLAudioElement | null = null;
  private scheduledNotifications: Map<string, number> = new Map();

  constructor() {
    this.audio = new Audio(ADZAN_AUDIO_URL);
    this.audio.loop = false;
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Browser does not support notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async showAdzanNotification(prayerName: string, prayerTime: string) {
    if (Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification(`Waktu ${prayerName}`, {
      body: `Saatnya untuk sholat ${prayerName} (${prayerTime})`,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `adzan-${prayerName}`,
      requireInteraction: true,
      vibrate: [200, 100, 200],
    });

    this.playAdzan();

    notification.onclick = () => {
      window.focus();
      notification.close();
      this.stopAdzan();
    };

    setTimeout(() => {
      notification.close();
      this.stopAdzan();
    }, 30000);
  }

  playAdzan() {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.audio.play().catch(error => {
        console.error('Error playing adzan:', error);
      });
    }
  }

  stopAdzan() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  scheduleNotifications(prayerTimes: Record<string, string>) {
    this.clearScheduledNotifications();

    const now = new Date();
    const prayerNames: Record<string, string> = {
      fajr: 'Subuh',
      dhuhr: 'Dzuhur',
      asr: 'Ashar',
      maghrib: 'Maghrib',
      isha: 'Isya',
    };

    Object.entries(prayerTimes).forEach(([key, time]) => {
      if (!prayerNames[key]) return;

      const [hours, minutes] = time.split(':').map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(hours, minutes, 0, 0);

      if (prayerDate <= now) {
        prayerDate.setDate(prayerDate.getDate() + 1);
      }

      const timeUntilPrayer = prayerDate.getTime() - now.getTime();

      const timeoutId = window.setTimeout(() => {
        this.showAdzanNotification(prayerNames[key], time);
      }, timeUntilPrayer);

      this.scheduledNotifications.set(key, timeoutId);
    });
  }

  clearScheduledNotifications() {
    this.scheduledNotifications.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    this.scheduledNotifications.clear();
  }

  isNotificationEnabled(): boolean {
    return Notification.permission === 'granted';
  }
}

export const notificationService = new NotificationService();
