'use client';

import { cn } from '@/lib/utils';
import type { ConfidenceLevel } from '@/types/metrics';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const icons = {
  high: '✅',
  medium: '⚠️',
  low: '❌',
};

const labels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const colors = {
  high: 'text-green-400 bg-green-500/20 border-green-500/30',
  medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  low: 'text-red-400 bg-red-500/20 border-red-500/30',
};

const sizes = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-base px-3 py-1.5',
};

export function ConfidenceBadge({
  level,
  showLabel = false,
  size = 'sm',
}: ConfidenceBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        colors[level],
        sizes[size]
      )}
    >
      <span>{icons[level]}</span>
      {showLabel && <span>{labels[level]}</span>}
    </span>
  );
}
