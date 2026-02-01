import { NextRequest, NextResponse } from 'next/server';
import { getTeamStatistics } from '@/lib/api/football-api';
import type { TeamMetrics, BettingMetric, ConfidenceLevel } from '@/types/metrics';

interface TeamStatistics {
  league: {
    id: number;
    name: string;
    season: number;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  form: string;
  fixtures: {
    played: { home: number; away: number; total: number };
    wins: { home: number; away: number; total: number };
    draws: { home: number; away: number; total: number };
    loses: { home: number; away: number; total: number };
  };
  goals: {
    for: {
      total: { home: number; away: number; total: number };
      average: { home: string; away: string; total: string };
    };
    against: {
      total: { home: number; away: number; total: number };
      average: { home: string; away: string; total: string };
    };
  };
  clean_sheet: { home: number; away: number; total: number };
  failed_to_score: { home: number; away: number; total: number };
  penalty: {
    scored: { total: number; percentage: string };
    missed: { total: number; percentage: string };
  };
  cards: {
    yellow: Record<string, { total: number | null; percentage: string | null }>;
    red: Record<string, { total: number | null; percentage: string | null }>;
  };
}

function getConfidence(percentage: number): ConfidenceLevel {
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
}

function createBettingMetric(label: string, percentage: number): BettingMetric {
  return {
    label,
    value: `${percentage}%`,
    percentage,
    confidence: getConfidence(percentage),
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const teamId = parseInt(id, 10);

  if (isNaN(teamId)) {
    return NextResponse.json(
      { error: 'Invalid team ID' },
      { status: 400 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const leagueId = parseInt(searchParams.get('league') || '39', 10);
  const season = parseInt(searchParams.get('season') || '2024', 10);

  try {
    const stats = await getTeamStatistics(teamId, leagueId, season) as TeamStatistics;

    if (!stats) {
      return NextResponse.json(
        { error: 'Statistics not available for this team' },
        { status: 404 }
      );
    }

    const played = stats.fixtures?.played?.total || 1;
    const goalsScored = stats.goals?.for?.total?.total || 0;
    const goalsConceded = stats.goals?.against?.total?.total || 0;
    const cleanSheets = stats.clean_sheet?.total || 0;
    const failedToScore = stats.failed_to_score?.total || 0;

    const avgGoalsScored = parseFloat(stats.goals?.for?.average?.total || '0');
    const avgGoalsConceded = parseFloat(stats.goals?.against?.average?.total || '0');
    const avgTotalGoals = avgGoalsScored + avgGoalsConceded;

    // Calculate BTTS percentage (both teams to score)
    const matchesWithBothScoring = played - cleanSheets - failedToScore +
      Math.min(cleanSheets, failedToScore);
    const bttsPercentage = Math.round((matchesWithBothScoring / played) * 100);

    // Calculate over goals percentages based on average
    const over05Pct = Math.min(95, Math.round((avgTotalGoals / 0.5) * 30));
    const over15Pct = Math.min(90, Math.round((avgTotalGoals / 1.5) * 35));
    const over25Pct = Math.min(85, Math.round((avgTotalGoals / 2.5) * 40));
    const over35Pct = Math.min(70, Math.round((avgTotalGoals / 3.5) * 40));

    // Calculate clean sheet percentage
    const cleanSheetPct = Math.round((cleanSheets / played) * 100);
    const failedToScorePct = Math.round((failedToScore / played) * 100);

    // Calculate card stats
    const totalYellowCards = Object.values(stats.cards?.yellow || {}).reduce(
      (sum, period) => sum + (period?.total || 0), 0
    );
    const totalRedCards = Object.values(stats.cards?.red || {}).reduce(
      (sum, period) => sum + (period?.total || 0), 0
    );
    const avgYellowCards = totalYellowCards / played;
    const avgRedCards = totalRedCards / played;
    const avgTotalCards = avgYellowCards + avgRedCards;

    // Card over percentages
    const over15CardsPct = Math.min(90, Math.round((avgTotalCards / 1.5) * 40));
    const over25CardsPct = Math.min(80, Math.round((avgTotalCards / 2.5) * 40));
    const over35CardsPct = Math.min(70, Math.round((avgTotalCards / 3.5) * 40));
    const over45CardsPct = Math.min(60, Math.round((avgTotalCards / 4.5) * 40));

    // Corner stats (API doesn't provide corners, estimate based on goals)
    const avgCornersFor = avgGoalsScored * 2.5 + 3;
    const avgCornersAgainst = avgGoalsConceded * 2.5 + 3;
    const avgCorners = avgCornersFor + avgCornersAgainst;

    const over75CornersPct = Math.min(85, Math.round((avgCorners / 7.5) * 50));
    const over85CornersPct = Math.min(75, Math.round((avgCorners / 8.5) * 50));
    const over95CornersPct = Math.min(65, Math.round((avgCorners / 9.5) * 50));
    const over105CornersPct = Math.min(55, Math.round((avgCorners / 10.5) * 50));

    const metrics: TeamMetrics = {
      goals: {
        over05: createBettingMetric('Más de 0.5', over05Pct),
        over15: createBettingMetric('Más de 1.5', over15Pct),
        over25: createBettingMetric('Más de 2.5', over25Pct),
        over35: createBettingMetric('Más de 3.5', over35Pct),
        btts: createBettingMetric('Ambos Anotan', bttsPercentage),
        cleanSheets: createBettingMetric('Portería a Cero', cleanSheetPct),
        failedToScore: createBettingMetric('No Anota', failedToScorePct),
        avgGoalsScored,
        avgGoalsConceded,
      },
      cards: {
        avgYellowCards,
        avgRedCards,
        over15Cards: createBettingMetric('Más de 1.5', over15CardsPct),
        over25Cards: createBettingMetric('Más de 2.5', over25CardsPct),
        over35Cards: createBettingMetric('Más de 3.5', over35CardsPct),
        over45Cards: createBettingMetric('Más de 4.5', over45CardsPct),
      },
      corners: {
        avgCorners,
        avgCornersFor,
        avgCornersAgainst,
        over75Corners: createBettingMetric('Más de 7.5', over75CornersPct),
        over85Corners: createBettingMetric('Más de 8.5', over85CornersPct),
        over95Corners: createBettingMetric('Más de 9.5', over95CornersPct),
        over105Corners: createBettingMetric('Más de 10.5', over105CornersPct),
      },
    };

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
