'use client';

import Image from 'next/image';
import { GlassCard } from '@/components/common/GlassCard';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { cn } from '@/lib/utils';
import type { Match } from '@/types/match';

interface RecentMatchesProps {
  matches: Match[];
  teamId: number;
  isLoading?: boolean;
}

export function RecentMatches({ matches, teamId, isLoading }: RecentMatchesProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Matches</h2>
        <LoadingSkeleton variant="match" count={3} />
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Matches</h2>
        <GlassCard>
          <p className="text-muted-foreground text-center py-8">
            No recent matches found
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Matches</h2>
      <div className="space-y-3">
        {matches.map((match) => {
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
              className={cn('border-l-4', resultStyles[result])}
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
                <span>{match.league.name}</span>
                <span>{new Date(match.date).toLocaleDateString()}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
