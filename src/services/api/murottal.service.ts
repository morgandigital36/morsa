const BASE_URL = 'https://api.quran.gading.dev';

export interface MurottalSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface QuranApiSurah {
  number: number;
  name: {
    short: string;
    transliteration: {
      id: string;
    };
    translation: {
      id: string;
    };
  };
  numberOfVerses: number;
  revelation: {
    id: string;
  };
  tafsir: {
    id: string;
  };
  recitation: {
    full: string;
  };
}

interface QuranApiResponse {
  code: number;
  data: QuranApiSurah[];
}

interface QuranApiDetailResponse {
  code: number;
  data: QuranApiSurah;
}

export const murottalService = {
  async getAllSurah(): Promise<MurottalSurah[]> {
    try {
      const response = await fetch(`${BASE_URL}/surah`);
      if (!response.ok) {
        throw new Error('Failed to fetch murottal list');
      }
      const result: QuranApiResponse = await response.json();

      return result.data.map((surah) => ({
        nomor: surah.number,
        nama: surah.name.short,
        namaLatin: surah.name.transliteration.id,
        jumlahAyat: surah.numberOfVerses,
        tempatTurun: surah.revelation.id,
        arti: surah.name.translation.id,
        deskripsi: surah.tafsir.id,
        audio: `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${surah.number.toString().padStart(3, '0')}.mp3`,
      }));
    } catch (error) {
      console.error('Error fetching murottal:', error);
      return [];
    }
  },

  async getSurahDetail(surahNumber: number): Promise<MurottalSurah | null> {
    try {
      const response = await fetch(`${BASE_URL}/surah/${surahNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch surah detail');
      }
      const result: QuranApiDetailResponse = await response.json();
      const surah = result.data;

      return {
        nomor: surah.number,
        nama: surah.name.short,
        namaLatin: surah.name.transliteration.id,
        jumlahAyat: surah.numberOfVerses,
        tempatTurun: surah.revelation.id,
        arti: surah.name.translation.id,
        deskripsi: surah.tafsir.id,
        audio: `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${surah.number.toString().padStart(3, '0')}.mp3`,
      };
    } catch (error) {
      console.error('Error fetching surah detail:', error);
      return null;
    }
  },
};
