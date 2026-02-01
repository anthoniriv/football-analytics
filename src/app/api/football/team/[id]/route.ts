import { NextRequest, NextResponse } from 'next/server';
import { getTeam, getTeamStatistics } from '@/lib/api/football-api';
import type { Team, TeamStats } from '@/types/team';

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
    const teamData = await getTeam(teamId);

    if (!teamData || teamData.length === 0) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    const teamInfo = teamData[0];

    const team: Team = {
      id: teamInfo.team.id,
      name: teamInfo.team.name,
      code: teamInfo.team.name.substring(0, 3).toUpperCase(),
      logo: teamInfo.team.logo,
      country: teamInfo.team.country,
      founded: teamInfo.team.founded || 0,
      venue: {
        id: teamInfo.venue?.id || 0,
        name: teamInfo.venue?.name || 'Unknown',
        address: teamInfo.venue?.address || '',
        city: teamInfo.venue?.city || 'Unknown',
        capacity: teamInfo.venue?.capacity || 0,
        surface: 'grass',
        image: teamInfo.venue?.image || '',
      },
    };

    // Try to get statistics
    let stats: TeamStats | null = null;
    try {
      const rawStats = await getTeamStatistics(teamId, leagueId, season) as {
        form?: string;
        fixtures?: {
          played: { home: number; away: number; total: number };
          wins: { home: number; away: number; total: number };
          draws: { home: number; away: number; total: number };
          loses: { home: number; away: number; total: number };
        };
        goals?: {
          for: {
            total: { home: number; away: number; total: number };
            average: { home: string; away: string; total: string };
          };
          against: {
            total: { home: number; away: number; total: number };
            average: { home: string; away: string; total: string };
          };
        };
        clean_sheet?: { home: number; away: number; total: number };
        failed_to_score?: { home: number; away: number; total: number };
      };

      if (rawStats) {
        stats = {
          team,
          form: rawStats.form || '',
          fixtures: rawStats.fixtures || {
            played: { home: 0, away: 0, total: 0 },
            wins: { home: 0, away: 0, total: 0 },
            draws: { home: 0, away: 0, total: 0 },
            loses: { home: 0, away: 0, total: 0 },
          },
          goals: {
            for: {
              home: rawStats.goals?.for?.total?.home || 0,
              away: rawStats.goals?.for?.total?.away || 0,
              total: rawStats.goals?.for?.total?.total || 0,
              average: rawStats.goals?.for?.average || { home: '0', away: '0', total: '0' },
            },
            against: {
              home: rawStats.goals?.against?.total?.home || 0,
              away: rawStats.goals?.against?.total?.away || 0,
              total: rawStats.goals?.against?.total?.total || 0,
              average: rawStats.goals?.against?.average || { home: '0', away: '0', total: '0' },
            },
          },
          cleanSheet: rawStats.clean_sheet || { home: 0, away: 0, total: 0 },
          failedToScore: rawStats.failed_to_score || { home: 0, away: 0, total: 0 },
        };
      }
    } catch (statsError) {
      console.warn('Could not fetch team statistics:', statsError);
    }

    return NextResponse.json({ team, stats });
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}
