const DOA_API_BASE = 'https://doa-doa-api-ahmadramadhan.fly.dev/api';

export interface DoaItem {
  id: string;
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
}

class DoaService {
  async getAllDoa(): Promise<DoaItem[]> {
    try {
      const response = await fetch(DOA_API_BASE);
      if (!response.ok) {
        throw new Error('Failed to fetch doa');
      }
      const data: DoaItem[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doa:', error);
      return [];
    }
  }
}

export const doaService = new DoaService();
