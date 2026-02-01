export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface BettingMetric {
  label: string;
  value: string | number;
  percentage?: number;
  confidence: ConfidenceLevel;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
}

export interface GoalsMetrics {
  over05: BettingMetric;
  over15: BettingMetric;
  over25: BettingMetric;
  over35: BettingMetric;
  btts: BettingMetric;
  cleanSheets: BettingMetric;
  failedToScore: BettingMetric;
  avgGoalsScored: number;
  avgGoalsConceded: number;
}

export interface CardsMetrics {
  avgYellowCards: number;
  avgRedCards: number;
  over15Cards: BettingMetric;
  over25Cards: BettingMetric;
  over35Cards: BettingMetric;
  over45Cards: BettingMetric;
}

export interface CornersMetrics {
  avgCorners: number;
  avgCornersFor: number;
  avgCornersAgainst: number;
  over75Corners: BettingMetric;
  over85Corners: BettingMetric;
  over95Corners: BettingMetric;
  over105Corners: BettingMetric;
}

export interface XGMetrics {
  avgXG: number;
  avgXGA: number;
  xgDifference: number;
  overPerformance: number;
}

export interface TeamMetrics {
  goals: GoalsMetrics;
  cards: CardsMetrics;
  corners: CornersMetrics;
  xg?: XGMetrics;
}
