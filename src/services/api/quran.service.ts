const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  indonesianName?: string;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: any[];
}

class QuranService {
  async getAllSurahs(): Promise<Surah[]> {
    const response = await fetch(`${QURAN_API_BASE}/surah`);
    const data = await response.json();
    if (data.code === 200) return data.data;
    throw new Error('Failed to fetch surahs');
  }

  async getSurah(surahNumber: number, edition: string = 'ar.alafasy'): Promise<SurahData> {
    const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}/${edition}`);
    const data = await response.json();
    if (data.code === 200) return data.data;
    throw new Error(`Failed to fetch surah ${surahNumber}`);
  }

  async getSurahWithTranslation(surahNumber: number) {
    const [arabic, translation] = await Promise.all([
      this.getSurah(surahNumber, 'ar.alafasy'),
      this.getSurah(surahNumber, 'id.indonesian'),
    ]);
    return { arabic, translation };
  }
}

export const quranService = new QuranService();
