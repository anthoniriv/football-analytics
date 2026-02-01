'use client';

import { cn } from '@/lib/utils';
import type { MatchResult } from '@/types/match';

interface TeamFormProps {
  form: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

const resultColors: Record<MatchResult, string> = {
  W: 'bg-green-500 text-white',
  D: 'bg-yellow-500 text-black',
  L: 'bg-red-500 text-white',
};

const sizes = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
};

export function TeamForm({ form, size = 'md', showLabels = false }: TeamFormProps) {
  const results = form.split('') as MatchResult[];

  const stats = {
    wins: results.filter((r) => r === 'W').length,
    draws: results.filter((r) => r === 'D').length,
    losses: results.filter((r) => r === 'L').length,
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        {results.map((result, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full flex items-center justify-center font-bold shadow-lg',
              resultColors[result],
              sizes[size]
            )}
            title={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}
          >
            {result}
          </div>
        ))}
      </div>
      {showLabels && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {stats.wins} {stats.wins === 1 ? 'Win' : 'Wins'}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            {stats.draws} {stats.draws === 1 ? 'Draw' : 'Draws'}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            {stats.losses} {stats.losses === 1 ? 'Loss' : 'Losses'}
          </span>
        </div>
      )}
    </div>
  );
}
