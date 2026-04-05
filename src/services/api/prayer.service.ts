const PRAYER_API_BASE = 'https://api.aladhan.com/v1';

export interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
  location: string;
}

export class PrayerService {
  async getPrayerTimesByCoordinates(latitude: number, longitude: number, date?: string): Promise<PrayerTimesData> {
    try {
      const timestamp = date ? new Date(date).getTime() / 1000 : Math.floor(Date.now() / 1000);
      const url = `${PRAYER_API_BASE}/timings/${Math.floor(timestamp)}?latitude=${latitude}&longitude=${longitude}&method=20`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.code === 200) {
        const timings = data.data.timings;
        const location = data.data.meta.timezone || 'Unknown Location';

        return {
          fajr: timings.Fajr,
          sunrise: timings.Sunrise,
          dhuhr: timings.Dhuhr,
          asr: timings.Asr,
          maghrib: timings.Maghrib,
          isha: timings.Isha,
          date: data.data.date.readable,
          location: location,
        };
      }
      throw new Error('Failed to fetch prayer times');
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      throw error;
    }
  }

  async getPrayerTimesByCityId(cityId: string, date?: string): Promise<PrayerTimesData> {
    try {
      const formattedDate = date || this.getTodayDate();
      const url = `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${formattedDate}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status) {
        return {
          fajr: data.data.jadwal.subuh,
          sunrise: data.data.jadwal.terbit,
          dhuhr: data.data.jadwal.dzuhur,
          asr: data.data.jadwal.ashar,
          maghrib: data.data.jadwal.maghrib,
          isha: data.data.jadwal.isya,
          date: data.data.jadwal.date,
          location: data.data.lokasi,
        };
      }
      throw new Error('Failed to fetch prayer times');
    } catch (error) {
      console.error('Error fetching prayer times by city:', error);
      throw error;
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
}

export const prayerService = new PrayerService();
