import AsyncStorage from '@react-native-async-storage/async-storage';

interface Bookmark {
  id: string;
  surah_number: number;
  ayah_number: number;
  note?: string;
  created_at: string;
}

const BOOKMARKS_STORAGE_KEY = '@rabithah_bookmarks';

class BookmarkService {
  async getBookmarks(): Promise<Bookmark[]> {
    try {
      const stored = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error getting bookmarks:', error);
    }
    return [];
  }

  async addBookmark(
    surahNumber: number,
    ayahNumber: number,
    note?: string
  ): Promise<boolean> {
    try {
      const bookmarks = await this.getBookmarks();
      
      // Check if already bookmarked
      const exists = bookmarks.some(
        (b) => b.surah_number === surahNumber && b.ayah_number === ayahNumber
      );
      
      if (exists) {
        return false;
      }

      const newBookmark: Bookmark = {
        id: `${surahNumber}-${ayahNumber}-${Date.now()}`,
        surah_number: surahNumber,
        ayah_number: ayahNumber,
        note,
        created_at: new Date().toISOString(),
      };

      bookmarks.push(newBookmark);
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      
      return true;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      return false;
    }
  }

  async removeBookmark(surahNumber: number, ayahNumber: number): Promise<boolean> {
    try {
      const bookmarks = await this.getBookmarks();
      const filtered = bookmarks.filter(
        (b) => !(b.surah_number === surahNumber && b.ayah_number === ayahNumber)
      );
      
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(filtered));
      
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  }

  async isBookmarked(surahNumber: number, ayahNumber: number): Promise<boolean> {
    try {
      const bookmarks = await this.getBookmarks();
      return bookmarks.some(
        (b) => b.surah_number === surahNumber && b.ayah_number === ayahNumber
      );
    } catch (error) {
      console.error('Error checking bookmark:', error);
      return false;
    }
  }

  async updateNote(
    surahNumber: number,
    ayahNumber: number,
    note: string
  ): Promise<boolean> {
    try {
      const bookmarks = await this.getBookmarks();
      const index = bookmarks.findIndex(
        (b) => b.surah_number === surahNumber && b.ayah_number === ayahNumber
      );

      if (index === -1) {
        return false;
      }

      bookmarks[index].note = note;
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      return false;
    }
  }

  async clearAllBookmarks(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(BOOKMARKS_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      return false;
    }
  }

  async getBookmarkCount(): Promise<number> {
    const bookmarks = await this.getBookmarks();
    return bookmarks.length;
  }

  async getBookmarksBySurah(surahNumber: number): Promise<Bookmark[]> {
    const bookmarks = await this.getBookmarks();
    return bookmarks.filter((b) => b.surah_number === surahNumber);
  }
}

export const bookmarkService = new BookmarkService();
export type { Bookmark };