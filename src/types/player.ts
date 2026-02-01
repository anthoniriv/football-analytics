export type PlayerPosition = 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero';

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  photo: string;
  position: PlayerPosition;
  number: number;
}

export interface PlayerStats {
  player: Player;
  games: {
    appearances: number;
    minutes: number;
    lineups: number;
    position: PlayerPosition;
  };
  goals: {
    total: number;
    assists: number;
  };
  shots: {
    total: number;
    on: number;
  };
  passes: {
    total: number;
    accuracy: number;
  };
  tackles: {
    total: number;
    interceptions: number;
  };
  duels: {
    total: number;
    won: number;
  };
  dribbles: {
    attempts: number;
    success: number;
  };
  fouls: {
    drawn: number;
    committed: number;
  };
  cards: {
    yellow: number;
    red: number;
  };
  rating: number;
}

export interface PlayerMatchStats {
  matchId: number;
  player: Player;
  minutes: number;
  position: PlayerPosition;
  rating: number;
  goals: number;
  assists: number;
  shots: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  saves?: number; // Para porteros
  yellowCards: number;
  redCards: number;
}
