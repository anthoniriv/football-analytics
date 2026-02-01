'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, Target, Timer, TrendingUp, ChevronRight, X, Shirt } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { Player, PlayerStats, PlayerMatchStats, PlayerPosition } from '@/types/player';
import type { Match } from '@/types/match';

interface TeamPlayersProps {
  players: Player[];
  playerStats: PlayerStats[];
  playerMatchStats: Record<number, PlayerMatchStats[]>;
  matches: Match[];
  isLoading?: boolean;
}

const positionColors: Record<PlayerPosition, string> = {
  'Portero': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Defensa': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Mediocampista': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Delantero': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const positionOrder: PlayerPosition[] = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];

function getRatingColor(rating: number): string {
  if (rating >= 8.0) return 'text-green-400';
  if (rating >= 7.0) return 'text-yellow-400';
  if (rating >= 6.0) return 'text-orange-400';
  return 'text-red-400';
}

function getRatingBg(rating: number): string {
  if (rating >= 8.0) return 'bg-green-500/20 border-green-500/30';
  if (rating >= 7.0) return 'bg-yellow-500/20 border-yellow-500/30';
  if (rating >= 6.0) return 'bg-orange-500/20 border-orange-500/30';
  return 'bg-red-500/20 border-red-500/30';
}

export function TeamPlayers({ players, playerStats, playerMatchStats, matches, isLoading }: TeamPlayersProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState<PlayerPosition>('Portero');

  const playersByPosition = useMemo(() => {
    const grouped: Record<PlayerPosition, Player[]> = {
      'Portero': [],
      'Defensa': [],
      'Mediocampista': [],
      'Delantero': [],
    };
    players.forEach((player) => {
      if (grouped[player.position]) {
        grouped[player.position].push(player);
      }
    });
    return grouped;
  }, [players]);

  const getPlayerStats = (playerId: number): PlayerStats | undefined => {
    return playerStats.find((ps) => ps.player.id === playerId);
  };

  const getPlayerMatchHistory = (playerId: number): { match: Match; stats: PlayerMatchStats }[] => {
    const history: { match: Match; stats: PlayerMatchStats }[] = [];

    Object.entries(playerMatchStats).forEach(([matchId, stats]) => {
      const playerStat = stats.find((s) => s.player.id === playerId);
      const match = matches.find((m) => m.id === parseInt(matchId));
      if (playerStat && match) {
        history.push({ match, stats: playerStat });
      }
    });

    return history.sort((a, b) => b.match.timestamp - a.match.timestamp);
  };

  const selectedPlayerStats = selectedPlayer ? getPlayerStats(selectedPlayer.id) : null;
  const selectedPlayerMatchHistory = selectedPlayer ? getPlayerMatchHistory(selectedPlayer.id) : [];

  if (isLoading) {
    return (
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Plantilla</h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </GlassCard>
    );
  }

  if (players.length === 0) {
    return (
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Plantilla</h2>
        </div>
        <p className="text-muted-foreground text-center py-8">
          No hay datos de jugadores disponibles
        </p>
      </GlassCard>
    );
  }

  return (
    <>
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Plantilla</h2>
          <Badge variant="secondary" className="ml-auto">
            {players.length} jugadores
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PlayerPosition)}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            {positionOrder.map((position) => (
              <TabsTrigger key={position} value={position} className="text-xs sm:text-sm">
                {position === 'Mediocampista' ? 'Medio' : position}
                <span className="ml-1 text-muted-foreground">
                  ({playersByPosition[position].length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {positionOrder.map((position) => (
            <TabsContent key={position} value={position} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={position}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {playersByPosition[position].map((player) => {
                    const stats = getPlayerStats(player.id);
                    return (
                      <motion.div
                        key={player.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedPlayer(player)}
                        className="flex items-center gap-3 p-3 rounded-xl glass-subtle cursor-pointer hover:bg-primary/5 transition-colors"
                      >
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-background/50 shrink-0">
                          <Image
                            src={player.photo}
                            alt={player.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold truncate">{player.name}</span>
                            <Badge variant="outline" className="shrink-0 text-xs">
                              #{player.number}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{player.nationality}</span>
                            <span>{player.age} años</span>
                          </div>
                        </div>

                        {stats && (
                          <div className="hidden sm:flex items-center gap-4 text-sm">
                            <div className="text-center">
                              <p className="font-semibold">{stats.games.appearances}</p>
                              <p className="text-xs text-muted-foreground">PJ</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">{stats.goals.total}</p>
                              <p className="text-xs text-muted-foreground">Goles</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">{stats.goals.assists}</p>
                              <p className="text-xs text-muted-foreground">Asist</p>
                            </div>
                            <div className={`px-2 py-1 rounded border ${getRatingBg(stats.rating)}`}>
                              <p className={`font-bold ${getRatingColor(stats.rating)}`}>
                                {stats.rating.toFixed(1)}
                              </p>
                            </div>
                          </div>
                        )}

                        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </GlassCard>

      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPlayer && (
                <>
                  <div className="relative h-14 w-14 rounded-full overflow-hidden bg-background/50">
                    <Image
                      src={selectedPlayer.photo}
                      alt={selectedPlayer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{selectedPlayer.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={positionColors[selectedPlayer.position]}>
                        {selectedPlayer.position}
                      </Badge>
                      <Badge variant="outline">#{selectedPlayer.number}</Badge>
                    </div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedPlayer && selectedPlayerStats && (
            <div className="space-y-6 mt-4">
              {/* Season Stats */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Estadísticas de Temporada
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold">{selectedPlayerStats.games.appearances}</p>
                    <p className="text-xs text-muted-foreground">Partidos</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold">{selectedPlayerStats.goals.total}</p>
                    <p className="text-xs text-muted-foreground">Goles</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold">{selectedPlayerStats.goals.assists}</p>
                    <p className="text-xs text-muted-foreground">Asistencias</p>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${getRatingBg(selectedPlayerStats.rating)}`}>
                    <p className={`text-2xl font-bold ${getRatingColor(selectedPlayerStats.rating)}`}>
                      {selectedPlayerStats.rating.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
                  <div className="p-2 rounded bg-muted/30 text-center">
                    <p className="font-semibold text-sm">{selectedPlayerStats.games.minutes}</p>
                    <p className="text-xs text-muted-foreground">Min</p>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-center">
                    <p className="font-semibold text-sm">{selectedPlayerStats.shots.on}/{selectedPlayerStats.shots.total}</p>
                    <p className="text-xs text-muted-foreground">Tiros</p>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-center">
                    <p className="font-semibold text-sm">{selectedPlayerStats.passes.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">Pases</p>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-center">
                    <p className="font-semibold text-sm">{selectedPlayerStats.tackles.total}</p>
                    <p className="text-xs text-muted-foreground">Tackles</p>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-center">
                    <p className="font-semibold text-sm">{selectedPlayerStats.dribbles.success}/{selectedPlayerStats.dribbles.attempts}</p>
                    <p className="text-xs text-muted-foreground">Regates</p>
                  </div>
                  <div className="p-2 rounded bg-muted/30 text-center">
                    <p className="font-semibold text-sm">
                      <span className="text-yellow-500">{selectedPlayerStats.cards.yellow}</span>
                      /
                      <span className="text-red-500">{selectedPlayerStats.cards.red}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Tarjetas</p>
                  </div>
                </div>
              </div>

              {/* Match History */}
              {selectedPlayerMatchHistory.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Historial por Partido
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedPlayerMatchHistory.map(({ match, stats }) => (
                      <div
                        key={match.id}
                        className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {match.homeTeam.name} vs {match.awayTeam.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {match.goals.home} - {match.goals.away}
                            </Badge>
                          </div>
                          <Badge className={positionColors[stats.position]}>
                            {stats.position}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <span className="text-muted-foreground">
                            <Timer className="h-3 w-3 inline mr-1" />
                            {stats.minutes}'
                          </span>
                          <span className={getRatingColor(stats.rating)}>
                            <Star className="h-3 w-3 inline mr-1" />
                            {stats.rating.toFixed(1)}
                          </span>
                          {stats.goals > 0 && (
                            <span className="text-green-400">
                              <Target className="h-3 w-3 inline mr-1" />
                              {stats.goals} {stats.goals === 1 ? 'gol' : 'goles'}
                            </span>
                          )}
                          {stats.assists > 0 && (
                            <span className="text-blue-400">
                              {stats.assists} {stats.assists === 1 ? 'asistencia' : 'asistencias'}
                            </span>
                          )}
                          {stats.saves && stats.saves > 0 && (
                            <span className="text-amber-400">
                              {stats.saves} {stats.saves === 1 ? 'parada' : 'paradas'}
                            </span>
                          )}
                          <span className="text-muted-foreground">
                            {stats.passAccuracy}% pases
                          </span>
                          {stats.yellowCards > 0 && (
                            <span className="text-yellow-500">
                              {stats.yellowCards} amarilla{stats.yellowCards > 1 ? 's' : ''}
                            </span>
                          )}
                          {stats.redCards > 0 && (
                            <span className="text-red-500">
                              {stats.redCards} roja{stats.redCards > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {match.league.name} - {match.league.round}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
