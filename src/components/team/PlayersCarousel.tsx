'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Player {
  id: number;
  name: string;
  photo: string;
  position: string;
  number: number;
  goals?: number;
  assists?: number;
}

interface PlayersCarouselProps {
  players: Player[];
  title?: string;
}

export function PlayersCarousel({ players, title = 'Top Players' }: PlayersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  if (!players.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="glass rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="glass rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {players.map((player) => (
          <GlassCard
            key={player.id}
            hover
            className="flex-shrink-0 w-40 text-center"
          >
            <div className="relative h-20 w-20 mx-auto mb-3 rounded-full overflow-hidden bg-background/50">
              <Image
                src={player.photo}
                alt={player.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium truncate">{player.name}</p>
            <p className="text-sm text-muted-foreground">{player.position}</p>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              {player.goals !== undefined && (
                <span>
                  <span className="text-green-500 font-bold">{player.goals}</span> goals
                </span>
              )}
              {player.assists !== undefined && (
                <span>
                  <span className="text-blue-500 font-bold">{player.assists}</span> assists
                </span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
