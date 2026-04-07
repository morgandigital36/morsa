import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const localStorageDB = {
  get(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  getArray(key: string) {
    const data = this.get(key);
    return Array.isArray(data) ? data : [];
  },
  addToArray(key: string, item: Record<string, unknown>) {
    const arr = this.getArray(key);
    const newItem = { ...item, id: Date.now().toString() };
    arr.push(newItem);
    this.set(key, arr);
    return newItem;
  },
  removeFromArray(key: string, id: string) {
    const arr = this.getArray(key);
    const filtered = arr.filter((item: Record<string, unknown>) => item.id !== id);
    this.set(key, filtered);
  },
};

export const db = {
  preferences: {
    async get(userId: string) {
      if (!hasSupabase) {
        return localStorageDB.get(`preferences_${userId}`);
      }
      const { data, error } = await supabase!
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) console.error(error);
      return data;
    },
  },
  locations: {
    async getDefault(userId: string) {
      if (!hasSupabase) {
        return localStorageDB.get(`location_${userId}`);
      }
      const { data, error } = await supabase!
        .from('locations')
        .select('*')
        .eq('user_id', userId)
        .eq('is_default', true)
        .maybeSingle();
      if (error) console.error(error);
      return data;
    },
  },
  prayerTimes: {
    async get(locationId: string, date: string) {
      if (!hasSupabase) {
        return localStorageDB.get(`prayer_${locationId}_${date}`);
      }
      const { data, error } = await supabase!
        .from('prayer_times')
        .select('*')
        .eq('location_id', locationId)
        .eq('date', date)
        .maybeSingle();
      if (error) console.error(error);
      return data;
    },
    async upsert(locationId: string, prayerTimes: Record<string, unknown>) {
      if (!hasSupabase) {
        const key = `prayer_${locationId}_${prayerTimes.date}`;
        localStorageDB.set(key, { location_id: locationId, ...prayerTimes });
        return localStorageDB.get(key);
      }
      const { data, error } = await supabase!
        .from('prayer_times')
        .upsert({ location_id: locationId, ...prayerTimes })
        .select()
        .single();
      if (error) console.error(error);
      return data;
    },
  },
  quranProgress: {
    async get(userId: string) {
      if (!hasSupabase) {
        return localStorageDB.get(`quran_progress_${userId}`);
      }
      const { data, error } = await supabase!
        .from('quran_progress')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) console.error(error);
      return data;
    },
    async update(userId: string, progress: Record<string, unknown>) {
      if (!hasSupabase) {
        const existing = localStorageDB.get(`quran_progress_${userId}`) || {};
        const updated = { user_id: userId, ...existing, ...progress };
        localStorageDB.set(`quran_progress_${userId}`, updated);
        return updated;
      }
      const { data, error } = await supabase!
        .from('quran_progress')
        .upsert({ user_id: userId, ...progress })
        .select()
        .single();
      if (error) console.error(error);
      return data;
    },
  },
  quranBookmarks: {
    async getAll(userId: string) {
      if (!hasSupabase) {
        return localStorageDB.getArray(`quran_bookmarks_${userId}`);
      }
      const { data, error } = await supabase!
        .from('quran_bookmarks')
        .select('*')
        .eq('user_id', userId);
      if (error) console.error(error);
      return data || [];
    },
    async add(userId: string, bookmark: Record<string, unknown>) {
      if (!hasSupabase) {
        return localStorageDB.addToArray(`quran_bookmarks_${userId}`, {
          user_id: userId,
          ...bookmark,
        });
      }
      const { data, error } = await supabase!
        .from('quran_bookmarks')
        .insert({ user_id: userId, ...bookmark })
        .select()
        .single();
      if (error) console.error(error);
      return data;
    },
    async remove(id: string) {
      if (!hasSupabase) {
        const userId = 'guest';
        localStorageDB.removeFromArray(`quran_bookmarks_${userId}`, id);
        return;
      }
      const { error } = await supabase!.from('quran_bookmarks').delete().eq('id', id);
      if (error) console.error(error);
    },
  },
  dhikrPresets: {
    async getAll(userId: string) {
      if (!hasSupabase) {
        return localStorageDB.getArray(`dhikr_presets_${userId}`);
      }
      const { data, error } = await supabase!
        .from('dhikr_presets')
        .select('*')
        .eq('user_id', userId);
      if (error) console.error(error);
      return data || [];
    },
    async create(userId: string, preset: Record<string, unknown>) {
      if (!hasSupabase) {
        return localStorageDB.addToArray(`dhikr_presets_${userId}`, {
          user_id: userId,
          ...preset,
        });
      }
      const { data, error } = await supabase!
        .from('dhikr_presets')
        .insert({ user_id: userId, ...preset })
        .select()
        .single();
      if (error) console.error(error);
      return data;
    },
    async delete(id: string) {
      if (!hasSupabase) {
        const userId = 'guest';
        localStorageDB.removeFromArray(`dhikr_presets_${userId}`, id);
        return;
      }
      const { error } = await supabase!.from('dhikr_presets').delete().eq('id', id);
      if (error) console.error(error);
    },
  },
  dhikrSessions: {
    async getAll(userId: string, limit = 50) {
      if (!hasSupabase) {
        const all = localStorageDB.getArray(`dhikr_sessions_${userId}`);
        return all.slice(0, limit);
      }
      const { data, error } = await supabase!
        .from('dhikr_sessions')
        .select('*')
        .eq('user_id', userId)
        .limit(limit);
      if (error) console.error(error);
      return data || [];
    },
    async add(userId: string, session: Record<string, unknown>) {
      if (!hasSupabase) {
        return localStorageDB.addToArray(`dhikr_sessions_${userId}`, {
          user_id: userId,
          created_at: new Date().toISOString(),
          ...session,
        });
      }
      const { data, error } = await supabase!
        .from('dhikr_sessions')
        .insert({ user_id: userId, ...session })
        .select()
        .single();
      if (error) console.error(error);
      return data;
    },
  },
  achievements: {
    async getAll(userId: string) {
      if (!hasSupabase) {
        return localStorageDB.getArray(`achievements_${userId}`);
      }
      const { data, error } = await supabase!
        .from('achievements')
        .select('*')
        .eq('user_id', userId);
      if (error) console.error(error);
      return data || [];
    },
  },
};
