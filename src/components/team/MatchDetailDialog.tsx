'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Match } from '@/types/match';

interface MatchDetailDialogProps {
  match: Match | null;
  teamId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchDetailDialog({ match, teamId, open, onOpenChange }: MatchDetailDialogProps) {
  if (!match) return null;

  const isHome = match.homeTeam.id === teamId;
  const teamGoals = isHome ? match.goals.home : match.goals.away;
  const opponentGoals = isHome ? match.goals.away : match.goals.home;

  let result: 'victoria' | 'empate' | 'derrota' = 'empate';
  if (teamGoals !== null && opponentGoals !== null) {
    if (teamGoals > opponentGoals) result = 'victoria';
    else if (teamGoals < opponentGoals) result = 'derrota';
  }

  const resultColors = {
    victoria: 'bg-green-500/20 text-green-400 border-green-500/30',
    empate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    derrota: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const totalGoals = (match.goals.home ?? 0) + (match.goals.away ?? 0);
  const btts = (match.goals.home ?? 0) > 0 && (match.goals.away ?? 0) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-sm text-muted-foreground">{match.league.name}</span>
            <br />
            <span className="text-xs text-muted-foreground">{match.league.round}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Score */}
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-background/50">
                <Image
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className={cn('font-medium text-center text-sm', isHome && 'text-primary')}>
                {match.homeTeam.name}
              </span>
              {isHome && <Badge variant="outline" className="text-xs">Tu equipo</Badge>}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">{match.goals.home ?? '-'}</span>
                <span className="text-2xl text-muted-foreground">-</span>
                <span className="text-4xl font-bold">{match.goals.away ?? '-'}</span>
              </div>
              <Badge className={cn('capitalize', resultColors[result])}>
                {result}
              </Badge>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-background/50">
                <Image
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className={cn('font-medium text-center text-sm', !isHome && 'text-primary')}>
                {match.awayTeam.name}
              </span>
              {!isHome && <Badge variant="outline" className="text-xs">Tu equipo</Badge>}
            </div>
          </div>

          {/* Match Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(match.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Halftime Score */}
          {match.score.halftime.home !== null && (
            <GlassCard className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Marcador al Descanso</p>
              <p className="text-xl font-bold">
                {match.score.halftime.home} - {match.score.halftime.away}
              </p>
            </GlassCard>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <GlassCard className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Goles</p>
              <p className={cn(
                'text-2xl font-bold',
                totalGoals >= 3 ? 'text-green-500' : totalGoals >= 2 ? 'text-yellow-500' : 'text-red-500'
              )}>
                {totalGoals}
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Ambos Anotaron</p>
              <p className={cn('text-2xl font-bold', btts ? 'text-green-500' : 'text-red-500')}>
                {btts ? 'Sí' : 'No'}
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Over 2.5</p>
              <p className={cn('text-2xl font-bold', totalGoals > 2.5 ? 'text-green-500' : 'text-red-500')}>
                {totalGoals > 2.5 ? 'Sí' : 'No'}
              </p>
            </GlassCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
