export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  logo: string;
  venue: Venue;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export interface TeamStats {
  team: Team;
  form: string; // e.g., "WWDLW"
  fixtures: {
    played: { home: number; away: number; total: number };
    wins: { home: number; away: number; total: number };
    draws: { home: number; away: number; total: number };
    loses: { home: number; away: number; total: number };
  };
  goals: {
    for: { home: number; away: number; total: number; average: { home: string; away: string; total: string } };
    against: { home: number; away: number; total: number; average: { home: string; away: string; total: string } };
  };
  cleanSheet: { home: number; away: number; total: number };
  failedToScore: { home: number; away: number; total: number };
}

export interface SearchResult {
  id: number;
  name: string;
  type: 'team' | 'player' | 'league';
  logo?: string;
  country?: string;
  leagueName?: string;
}
