'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'team' | 'player' | 'league';

interface SearchFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { type: FilterType; label: string; icon: React.ElementType }[] = [
  { type: 'all', label: 'All', icon: Users },
  { type: 'team', label: 'Teams', icon: Users },
  { type: 'player', label: 'Players', icon: User },
  { type: 'league', label: 'Leagues', icon: Trophy },
];

export function SearchFilters({ activeFilter, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map(({ type, label, icon: Icon }) => (
        <Button
          key={type}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(type)}
          className={cn(
            'glass rounded-full gap-2 transition-all',
            activeFilter === type && 'glow bg-primary/20'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
