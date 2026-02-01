import { NextRequest, NextResponse } from 'next/server';
import { getTeamFixtures } from '@/lib/api/football-api';
import type { Match } from '@/types/match';

interface FixtureResponse {
  fixture: {
    id: number;
    date: string;
    timestamp: number;
    venue: {
      name: string;
      city: string;
    };
    status: {
      short: string;
      long: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
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
  const limit = parseInt(searchParams.get('limit') || '5', 10);
  const season = parseInt(searchParams.get('season') || '2024', 10);

  try {
    const fixturesData = await getTeamFixtures(teamId, season) as FixtureResponse[];

    // Status codes for finished and live matches
    const finishedStatuses = ['FT', 'AET', 'PEN']; // Finished, After Extra Time, Penalties
    const liveStatuses = ['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE']; // Live match statuses

    const now = Date.now() / 1000;

    // Get live matches first
    const liveMatches = fixturesData
      .filter((f) => liveStatuses.includes(f.fixture.status.short))
      .sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);

    // Get finished matches (most recent first)
    const finishedMatches = fixturesData
      .filter((f) => finishedStatuses.includes(f.fixture.status.short))
      .sort((a, b) => b.fixture.timestamp - a.fixture.timestamp)
      .slice(0, limit - liveMatches.length);

    // Combine: live first, then finished
    const allMatches = [...liveMatches, ...finishedMatches].slice(0, limit);

    const matches: Match[] = allMatches.map((fixture) => ({
      id: fixture.fixture.id,
      date: fixture.fixture.date,
      timestamp: fixture.fixture.timestamp,
      league: {
        id: fixture.league.id,
        name: fixture.league.name,
        country: fixture.league.country || '',
        logo: fixture.league.logo,
        round: fixture.league.round || '',
      },
      homeTeam: {
        id: fixture.teams.home.id,
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo,
      },
      awayTeam: {
        id: fixture.teams.away.id,
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo,
      },
      goals: {
        home: fixture.goals.home,
        away: fixture.goals.away,
      },
      score: {
        halftime: {
          home: fixture.score?.halftime?.home ?? null,
          away: fixture.score?.halftime?.away ?? null,
        },
        fulltime: {
          home: fixture.score?.fulltime?.home ?? null,
          away: fixture.score?.fulltime?.away ?? null,
        },
      },
      status: {
        short: fixture.fixture.status.short,
        long: fixture.fixture.status.long,
      },
    }));

    return NextResponse.json({ matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
