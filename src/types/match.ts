export interface Match {
  id: number;
  date: string;
  timestamp: number;
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    round: string;
  };
  homeTeam: {
    id: number;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
  };
  status: {
    short: string;
    long: string;
  };
  events?: MatchEvent[];
  statistics?: MatchStatistics[];
}

export interface MatchEvent {
  time: { elapsed: number; extra: number | null };
  team: { id: number; name: string };
  player: { id: number; name: string };
  assist: { id: number | null; name: string | null };
  type: 'Goal' | 'Card' | 'subst' | 'Var';
  detail: string;
}

export interface MatchStatistics {
  team: { id: number; name: string };
  statistics: Array<{
    type: string;
    value: number | string | null;
  }>;
}

export type MatchResult = 'W' | 'D' | 'L';
