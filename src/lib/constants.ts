export const APP_NAME = 'Football Analytics';
export const APP_DESCRIPTION = 'Professional football analytics platform for betting insights';

export const LIMITS = {
  MAX_FAVORITE_TEAMS: 20,
  MAX_FAVORITE_PLAYERS: 30,
  MAX_FAVORITE_LEAGUES: 10,
  MAX_SEARCH_HISTORY: 50,
} as const;

export const CACHE_DURATIONS = {
  SEARCH_RESULTS: 5 * 60 * 1000, // 5 minutes
  TEAM_DATA: 15 * 60 * 1000, // 15 minutes
  MATCH_STATS: 60 * 60 * 1000, // 1 hour
  FIXTURES: 5 * 60 * 1000, // 5 minutes
} as const;

export const CONFIDENCE_THRESHOLDS = {
  HIGH: 70,
  MEDIUM: 50,
} as const;

export const FORM_COLORS = {
  W: 'bg-green-500',
  D: 'bg-yellow-500',
  L: 'bg-red-500',
} as const;
