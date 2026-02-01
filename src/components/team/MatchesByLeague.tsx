'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/components/common/GlassCard';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { MatchDetailDialog } from './MatchDetailDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Match } from '@/types/match';

interface MatchesByLeagueProps {
  matches: Match[];
  teamId: number;
  isLoading?: boolean;
}

export function MatchesByLeague({ matches, teamId, isLoading }: MatchesByLeagueProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const matchesByLeague = useMemo(() => {
    const grouped: Record<string, { leagueName: string; leagueId: number; matches: Match[] }> = {};

    matches.forEach((match) => {
      const key = match.league.id.toString();
      if (!grouped[key]) {
        grouped[key] = {
          leagueName: match.league.name,
          leagueId: match.league.id,
          matches: [],
        };
      }
      grouped[key].matches.push(match);
    });

    // Sort matches within each league by date (newest first)
    Object.values(grouped).forEach((league) => {
      league.matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    return Object.values(grouped);
  }, [matches]);

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Partidos por Competición</h2>
        <LoadingSkeleton variant="match" count={3} />
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Partidos por Competición</h2>
        <GlassCard>
          <p className="text-muted-foreground text-center py-8">
            No se encontraron partidos
          </p>
        </GlassCard>
      </div>
    );
  }

  const defaultTab = matchesByLeague[0]?.leagueId.toString() || '';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Partidos por Competición</h2>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="glass w-full justify-start overflow-x-auto flex-nowrap">
          {matchesByLeague.map((league) => (
            <TabsTrigger
              key={league.leagueId}
              value={league.leagueId.toString()}
              className="whitespace-nowrap"
            >
              {league.leagueName}
              <span className="ml-2 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                {league.matches.length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {matchesByLeague.map((league) => (
          <TabsContent key={league.leagueId} value={league.leagueId.toString()} className="mt-4">
            <div className="space-y-3">
              {league.matches.map((match) => {
                const isHome = match.homeTeam.id === teamId;
                const teamGoals = isHome ? match.goals.home : match.goals.away;
                const opponentGoals = isHome ? match.goals.away : match.goals.home;

                let result: 'win' | 'draw' | 'loss' = 'draw';
                if (teamGoals !== null && opponentGoals !== null) {
                  if (teamGoals > opponentGoals) result = 'win';
                  else if (teamGoals < opponentGoals) result = 'loss';
                }

                const resultStyles = {
                  win: 'border-l-green-500',
                  draw: 'border-l-yellow-500',
                  loss: 'border-l-red-500',
                };

                return (
                  <GlassCard
                    key={match.id}
                    hover
                    className={cn('border-l-4 cursor-pointer', resultStyles[result])}
                    onClick={() => handleMatchClick(match)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden bg-background/50">
                          <Image
                            src={match.homeTeam.logo}
                            alt={match.homeTeam.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span
                          className={cn(
                            'font-medium truncate',
                            match.homeTeam.id === teamId && 'text-primary'
                          )}
                        >
                          {match.homeTeam.name}
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 px-4">
                        <span
                          className={cn(
                            'text-2xl font-bold min-w-[24px] text-center',
                            match.homeTeam.id === teamId && 'text-primary'
                          )}
                        >
                          {match.goals.home ?? '-'}
                        </span>
                        <span className="text-muted-foreground">-</span>
                        <span
                          className={cn(
                            'text-2xl font-bold min-w-[24px] text-center',
                            match.awayTeam.id === teamId && 'text-primary'
                          )}
                        >
                          {match.goals.away ?? '-'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                        <span
                          className={cn(
                            'font-medium truncate text-right',
                            match.awayTeam.id === teamId && 'text-primary'
                          )}
                        >
                          {match.awayTeam.name}
                        </span>
                        <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden bg-background/50">
                          <Image
                            src={match.awayTeam.logo}
                            alt={match.awayTeam.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{match.league.round}</span>
                      <span>{new Date(match.date).toLocaleDateString('es-ES')}</span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <MatchDetailDialog
        match={selectedMatch}
        teamId={teamId}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
