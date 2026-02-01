import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LIMITS } from '@/lib/constants';

interface FavoriteItem {
  id: number;
  name: string;
  logo?: string;
  addedAt: number;
}

interface FavoritesState {
  teams: FavoriteItem[];
  players: FavoriteItem[];
  leagues: FavoriteItem[];
  addTeam: (team: Omit<FavoriteItem, 'addedAt'>) => boolean;
  removeTeam: (id: number) => void;
  isTeamFavorite: (id: number) => boolean;
  addPlayer: (player: Omit<FavoriteItem, 'addedAt'>) => boolean;
  removePlayer: (id: number) => void;
  isPlayerFavorite: (id: number) => boolean;
  addLeague: (league: Omit<FavoriteItem, 'addedAt'>) => boolean;
  removeLeague: (id: number) => void;
  isLeagueFavorite: (id: number) => boolean;
  clearAll: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      teams: [],
      players: [],
      leagues: [],

      addTeam: (team) => {
        const { teams } = get();
        if (teams.length >= LIMITS.MAX_FAVORITE_TEAMS) return false;
        if (teams.some((t) => t.id === team.id)) return false;
        set({ teams: [...teams, { ...team, addedAt: Date.now() }] });
        return true;
      },

      removeTeam: (id) => {
        set({ teams: get().teams.filter((t) => t.id !== id) });
      },

      isTeamFavorite: (id) => {
        return get().teams.some((t) => t.id === id);
      },

      addPlayer: (player) => {
        const { players } = get();
        if (players.length >= LIMITS.MAX_FAVORITE_PLAYERS) return false;
        if (players.some((p) => p.id === player.id)) return false;
        set({ players: [...players, { ...player, addedAt: Date.now() }] });
        return true;
      },

      removePlayer: (id) => {
        set({ players: get().players.filter((p) => p.id !== id) });
      },

      isPlayerFavorite: (id) => {
        return get().players.some((p) => p.id === id);
      },

      addLeague: (league) => {
        const { leagues } = get();
        if (leagues.length >= LIMITS.MAX_FAVORITE_LEAGUES) return false;
        if (leagues.some((l) => l.id === league.id)) return false;
        set({ leagues: [...leagues, { ...league, addedAt: Date.now() }] });
        return true;
      },

      removeLeague: (id) => {
        set({ leagues: get().leagues.filter((l) => l.id !== id) });
      },

      isLeagueFavorite: (id) => {
        return get().leagues.some((l) => l.id === id);
      },

      clearAll: () => {
        set({ teams: [], players: [], leagues: [] });
      },
    }),
    {
      name: 'football-analytics-favorites',
    }
  )
);
