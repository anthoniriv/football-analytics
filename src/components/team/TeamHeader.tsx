'use client';

import Image from 'next/image';
import { Heart, Share2, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';
import { TeamForm } from './TeamForm';
import { useFavoritesStore } from '@/stores/favorites';
import { cn } from '@/lib/utils';
import type { Team, TeamStats } from '@/types/team';

interface TeamHeaderProps {
  team: Team;
  stats?: TeamStats;
}

export function TeamHeader({ team, stats }: TeamHeaderProps) {
  const { isTeamFavorite, addTeam, removeTeam } = useFavoritesStore();
  const isFavorite = isTeamFavorite(team.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeTeam(team.id);
    } else {
      addTeam({ id: team.id, name: team.name, logo: team.logo });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${team.name} - Football Analytics`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <GlassCard variant="strong" className="overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative shrink-0">
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-background/50">
            <Image
              src={team.logo}
              alt={team.name}
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">{team.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {team.country}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Fundado en {team.founded}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteClick}
                className={cn(
                  'glass rounded-full transition-all',
                  isFavorite && 'text-red-500 glow'
                )}
              >
                <Heart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="glass rounded-full"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {stats && (
            <div className="mt-4">
              <TeamForm form={stats.form} />
            </div>
          )}

          {team.venue && (
            <p className="text-sm text-muted-foreground mt-4">
              Estadio: {team.venue.name} ({team.venue.capacity.toLocaleString()} capacidad)
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
