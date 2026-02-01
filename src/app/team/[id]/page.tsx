'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamHeader } from '@/components/team/TeamHeader';
import { MatchesByLeague } from '@/components/team/MatchesByLeague';
import { MetricsGrid } from '@/components/team/MetricsGrid';
import { TeamPlayers } from '@/components/team/TeamPlayers';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { useTeam, useTeamStats, useTeamMatches, useTeamMetrics, useTeamPlayers, useTeamPlayerStats, useTeamPlayerMatchStats } from '@/hooks/useTeam';

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export default function TeamPage({ params }: TeamPageProps) {
  const { id } = use(params);
  const teamId = parseInt(id, 10);

  const { data: team, isLoading: teamLoading, error: teamError } = useTeam(teamId);
  const { data: stats, isLoading: statsLoading } = useTeamStats(teamId);
  const { data: matches, isLoading: matchesLoading } = useTeamMatches(teamId, 50); // Fetch all matches
  const { data: metrics, isLoading: metricsLoading } = useTeamMetrics(teamId);
  const { data: players, isLoading: playersLoading } = useTeamPlayers(teamId);
  const { data: playerStats, isLoading: playerStatsLoading } = useTeamPlayerStats(teamId);
  const { data: playerMatchStats, isLoading: playerMatchStatsLoading } = useTeamPlayerMatchStats(teamId);

  if (teamError) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="glass rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-muted-foreground">
          Panel del Equipo
        </h1>
      </div>

      {teamLoading ? (
        <LoadingSkeleton variant="team-header" />
      ) : team ? (
        <TeamHeader team={team} stats={stats} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Equipo no encontrado</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <MatchesByLeague
          matches={matches || []}
          teamId={teamId}
          isLoading={matchesLoading}
        />

        <div className="space-y-8">
          {metrics && (
            <MetricsGrid metrics={metrics} isLoading={metricsLoading} />
          )}
        </div>
      </div>

      <TeamPlayers
        players={players || []}
        playerStats={playerStats || []}
        playerMatchStats={playerMatchStats || {}}
        matches={matches || []}
        isLoading={playersLoading || playerStatsLoading || playerMatchStatsLoading}
      />
    </div>
  );
}
