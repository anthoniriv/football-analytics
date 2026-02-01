import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LIMITS } from '@/lib/constants';

interface SearchHistoryItem {
  id: string;
  query: string;
  type: 'team' | 'player' | 'league';
  resultId?: number;
  resultName?: string;
  timestamp: number;
}

interface SearchState {
  history: SearchHistoryItem[];
  incognitoMode: boolean;
  addSearch: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  removeSearch: (id: string) => void;
  clearHistory: () => void;
  setIncognitoMode: (enabled: boolean) => void;
  getFrequentSearches: () => SearchHistoryItem[];
  getRecentSearches: (limit?: number) => SearchHistoryItem[];
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      history: [],
      incognitoMode: false,

      addSearch: (item) => {
        const { incognitoMode, history } = get();
        if (incognitoMode) return;

        const newItem: SearchHistoryItem = {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        };

        const updatedHistory = [newItem, ...history].slice(0, LIMITS.MAX_SEARCH_HISTORY);
        set({ history: updatedHistory });
      },

      removeSearch: (id) => {
        set({ history: get().history.filter((item) => item.id !== id) });
      },

      clearHistory: () => {
        set({ history: [] });
      },

      setIncognitoMode: (enabled) => {
        set({ incognitoMode: enabled });
      },

      getFrequentSearches: () => {
        const { history } = get();
        const frequencyMap = new Map<string, { item: SearchHistoryItem; count: number }>();

        history.forEach((item) => {
          const key = `${item.type}-${item.resultId || item.query}`;
          const existing = frequencyMap.get(key);
          if (existing) {
            existing.count++;
          } else {
            frequencyMap.set(key, { item, count: 1 });
          }
        });

        return Array.from(frequencyMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map((entry) => entry.item);
      },

      getRecentSearches: (limit = 10) => {
        return get().history.slice(0, limit);
      },
    }),
    {
      name: 'football-analytics-search',
    }
  )
);
