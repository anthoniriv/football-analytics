'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { MetricCard } from '@/components/metrics/MetricCard';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Goal, CreditCard, CornerUpRight, Target, TrendingUp } from 'lucide-react';
import type { TeamMetrics, BettingMetric } from '@/types/metrics';

interface MetricsGridProps {
  metrics: TeamMetrics;
  isLoading?: boolean;
}

export function MetricsGrid({ metrics, isLoading }: MetricsGridProps) {
  const [selectedMetric, setSelectedMetric] = useState<BettingMetric | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMetricClick = (metric: BettingMetric) => {
    setSelectedMetric(metric);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Métricas de Apuestas</h2>
        <LoadingSkeleton variant="metric" count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Métricas de Apuestas</h2>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="glass w-full justify-start overflow-x-auto">
          <TabsTrigger value="goals" className="gap-2">
            <Goal className="h-4 w-4" />
            Goles
          </TabsTrigger>
          <TabsTrigger value="cards" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Tarjetas
          </TabsTrigger>
          <TabsTrigger value="corners" className="gap-2">
            <CornerUpRight className="h-4 w-4" />
            Córners
          </TabsTrigger>
          {metrics.xg && (
            <TabsTrigger value="xg" className="gap-2">
              <Target className="h-4 w-4" />
              xG
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="goals" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div onClick={() => handleMetricClick(metrics.goals.over05)} className="cursor-pointer">
              <MetricCard metric={metrics.goals.over05} />
            </div>
            <div onClick={() => handleMetricClick(metrics.goals.over15)} className="cursor-pointer">
              <MetricCard metric={metrics.goals.over15} />
            </div>
            <div onClick={() => handleMetricClick(metrics.goals.over25)} className="cursor-pointer">
              <MetricCard metric={metrics.goals.over25} />
            </div>
            <div onClick={() => handleMetricClick(metrics.goals.over35)} className="cursor-pointer">
              <MetricCard metric={metrics.goals.over35} />
            </div>
            <div onClick={() => handleMetricClick(metrics.goals.btts)} className="cursor-pointer">
              <MetricCard metric={metrics.goals.btts} />
            </div>
            <div onClick={() => handleMetricClick(metrics.goals.cleanSheets)} className="cursor-pointer">
              <MetricCard metric={metrics.goals.cleanSheets} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Promedio Goles Anotados</p>
              <p className="text-2xl font-bold text-gradient">
                {metrics.goals.avgGoalsScored.toFixed(2)}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Promedio Goles Recibidos</p>
              <p className="text-2xl font-bold text-gradient">
                {metrics.goals.avgGoalsConceded.toFixed(2)}
              </p>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div onClick={() => handleMetricClick(metrics.cards.over15Cards)} className="cursor-pointer">
              <MetricCard metric={metrics.cards.over15Cards} />
            </div>
            <div onClick={() => handleMetricClick(metrics.cards.over25Cards)} className="cursor-pointer">
              <MetricCard metric={metrics.cards.over25Cards} />
            </div>
            <div onClick={() => handleMetricClick(metrics.cards.over35Cards)} className="cursor-pointer">
              <MetricCard metric={metrics.cards.over35Cards} />
            </div>
            <div onClick={() => handleMetricClick(metrics.cards.over45Cards)} className="cursor-pointer">
              <MetricCard metric={metrics.cards.over45Cards} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Promedio Amarillas</p>
              <p className="text-2xl font-bold text-yellow-500">
                {metrics.cards.avgYellowCards.toFixed(1)}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Promedio Rojas</p>
              <p className="text-2xl font-bold text-red-500">
                {metrics.cards.avgRedCards.toFixed(1)}
              </p>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="corners" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div onClick={() => handleMetricClick(metrics.corners.over75Corners)} className="cursor-pointer">
              <MetricCard metric={metrics.corners.over75Corners} />
            </div>
            <div onClick={() => handleMetricClick(metrics.corners.over85Corners)} className="cursor-pointer">
              <MetricCard metric={metrics.corners.over85Corners} />
            </div>
            <div onClick={() => handleMetricClick(metrics.corners.over95Corners)} className="cursor-pointer">
              <MetricCard metric={metrics.corners.over95Corners} />
            </div>
            <div onClick={() => handleMetricClick(metrics.corners.over105Corners)} className="cursor-pointer">
              <MetricCard metric={metrics.corners.over105Corners} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Promedio Total</p>
              <p className="text-2xl font-bold text-gradient">
                {metrics.corners.avgCorners.toFixed(1)}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Córners a Favor</p>
              <p className="text-2xl font-bold text-green-500">
                {metrics.corners.avgCornersFor.toFixed(1)}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-1">Córners en Contra</p>
              <p className="text-2xl font-bold text-red-500">
                {metrics.corners.avgCornersAgainst.toFixed(1)}
              </p>
            </GlassCard>
          </div>
        </TabsContent>

        {metrics.xg && (
          <TabsContent value="xg" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <GlassCard>
                <p className="text-sm text-muted-foreground mb-1">Promedio xG</p>
                <p className="text-2xl font-bold text-gradient">
                  {metrics.xg.avgXG.toFixed(2)}
                </p>
              </GlassCard>
              <GlassCard>
                <p className="text-sm text-muted-foreground mb-1">Promedio xGA</p>
                <p className="text-2xl font-bold text-gradient">
                  {metrics.xg.avgXGA.toFixed(2)}
                </p>
              </GlassCard>
              <GlassCard>
                <p className="text-sm text-muted-foreground mb-1">Diferencia xG</p>
                <p
                  className={`text-2xl font-bold ${
                    metrics.xg.xgDifference > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {metrics.xg.xgDifference > 0 ? '+' : ''}
                  {metrics.xg.xgDifference.toFixed(2)}
                </p>
              </GlassCard>
              <GlassCard>
                <p className="text-sm text-muted-foreground mb-1">Sobrerendimiento</p>
                <p
                  className={`text-2xl font-bold ${
                    metrics.xg.overPerformance > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {metrics.xg.overPerformance > 0 ? '+' : ''}
                  {metrics.xg.overPerformance.toFixed(2)}
                </p>
              </GlassCard>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Metric Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">{selectedMetric?.label}</DialogTitle>
          </DialogHeader>
          {selectedMetric && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-5xl font-bold text-gradient mb-2">{selectedMetric.value}</p>
                <p className="text-muted-foreground">Probabilidad basada en los últimos partidos</p>
              </div>

              <div className="h-4 bg-background/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    selectedMetric.confidence === 'high'
                      ? 'bg-green-500'
                      : selectedMetric.confidence === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${selectedMetric.percentage || 0}%` }}
                />
              </div>

              <GlassCard>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nivel de Confianza</span>
                  <span
                    className={`font-bold capitalize ${
                      selectedMetric.confidence === 'high'
                        ? 'text-green-500'
                        : selectedMetric.confidence === 'medium'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  >
                    {selectedMetric.confidence === 'high' ? 'Alto' : selectedMetric.confidence === 'medium' ? 'Medio' : 'Bajo'}
                  </span>
                </div>
              </GlassCard>

              <p className="text-sm text-muted-foreground text-center">
                {selectedMetric.confidence === 'high'
                  ? '✅ Buena opción de apuesta basada en el historial'
                  : selectedMetric.confidence === 'medium'
                  ? '⚠️ Considerar con precaución'
                  : '❌ Bajo rendimiento histórico en esta métrica'}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
