'use client';

import { useQuery } from '@tanstack/react-query';
import type { Team, TeamStats } from '@/types/team';
import type { Match } from '@/types/match';
import type { TeamMetrics } from '@/types/metrics';
import type { Player, PlayerStats, PlayerMatchStats } from '@/types/player';

interface TeamResponse {
  team: Team;
  stats: TeamStats | null;
}

interface MatchesResponse {
  matches: Match[];
}

interface MetricsResponse {
  metrics: TeamMetrics;
  rawStats: unknown;
}

export function useTeam(teamId: number) {
  return useQuery<Team | undefined>({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const response = await fetch(`/api/football/team/${teamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team');
      }
      const data: TeamResponse = await response.json();
      return data.team;
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useTeamStats(teamId: number) {
  return useQuery<TeamStats | undefined>({
    queryKey: ['team-stats', teamId],
    queryFn: async () => {
      const response = await fetch(`/api/football/team/${teamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team stats');
      }
      const data: TeamResponse = await response.json();
      return data.stats || undefined;
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useTeamMatches(teamId: number, limit = 5) {
  return useQuery<Match[]>({
    queryKey: ['team-matches', teamId, limit],
    queryFn: async () => {
      const response = await fetch(`/api/football/team/${teamId}/matches?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      const data: MatchesResponse = await response.json();
      return data.matches || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTeamMetrics(teamId: number) {
  return useQuery<TeamMetrics>({
    queryKey: ['team-metrics', teamId],
    queryFn: async () => {
      const response = await fetch(`/api/football/team/${teamId}/metrics`);
      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }
      const data: MetricsResponse = await response.json();
      return data.metrics;
    },
    staleTime: 15 * 60 * 1000,
  });
}

interface PlayersResponse {
  players: Player[];
}

export function useTeamPlayers(teamId: number) {
  return useQuery<Player[]>({
    queryKey: ['team-players', teamId],
    queryFn: async () => {
      const response = await fetch(`/api/football/team/${teamId}/players`);
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data: PlayersResponse = await response.json();
      return data.players || [];
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useTeamPlayerStats(teamId: number) {
  return useQuery<PlayerStats[]>({
    queryKey: ['team-player-stats', teamId],
    queryFn: async () => {
      // TODO: Implement player stats endpoint
      return [];
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useTeamPlayerMatchStats(teamId: number) {
  return useQuery<Record<number, PlayerMatchStats[]>>({
    queryKey: ['team-player-match-stats', teamId],
    queryFn: async () => {
      // TODO: Implement player match stats endpoint
      return {};
    },
    staleTime: 15 * 60 * 1000,
  });
}
