export interface Bookmark {
  id: string;
  surah_number: number;
  ayah_number: number;
  note?: string;
  created_at: string;
}

class BookmarkService {
  private getStorageKey(): string {
    return 'quran_bookmarks';
  }

  async getBookmarks(): Promise<Bookmark[]> {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      return [];
    }
  }

  async addBookmark(surahNumber: number, ayahNumber: number, note?: string): Promise<boolean> {
    try {
      const existing = await this.isBookmarked(surahNumber, ayahNumber);
      if (existing) {
        return false;
      }

      const bookmarks = await this.getBookmarks();
      const newBookmark: Bookmark = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        surah_number: surahNumber,
        ayah_number: ayahNumber,
        note: note || undefined,
        created_at: new Date().toISOString(),
      };

      bookmarks.unshift(newBookmark);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(bookmarks));
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
      localStorage.setItem(this.getStorageKey(), JSON.stringify(filtered));
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
}

export const bookmarkService = new BookmarkService();
