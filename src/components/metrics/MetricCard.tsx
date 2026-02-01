'use client';

import { GlassCard } from '@/components/common/GlassCard';
import { ConfidenceBadge } from '@/components/common/ConfidenceBadge';
import { cn } from '@/lib/utils';
import type { BettingMetric } from '@/types/metrics';

interface MetricCardProps {
  metric: BettingMetric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const percentage = metric.percentage ?? 0;

  return (
    <GlassCard hover className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground">{metric.label}</span>
        <ConfidenceBadge level={metric.confidence} />
      </div>

      <div className="text-3xl font-bold text-gradient mb-3">{metric.value}</div>

      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            metric.confidence === 'high' && 'bg-green-500',
            metric.confidence === 'medium' && 'bg-yellow-500',
            metric.confidence === 'low' && 'bg-red-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {metric.description && (
        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
      )}
    </GlassCard>
  );
}
