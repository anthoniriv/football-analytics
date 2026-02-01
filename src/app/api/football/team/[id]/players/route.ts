import { NextRequest, NextResponse } from 'next/server';
import { getPlayers } from '@/lib/api/football-api';
import type { Player, PlayerPosition } from '@/types/player';

interface PlayerResponse {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: Array<{
    games: {
      appearences: number | null;
      lineups: number | null;
      minutes: number | null;
      number: number | null;
      position: string;
      rating: string | null;
    };
    goals: {
      total: number | null;
      assists: number | null;
    };
    cards: {
      yellow: number | null;
      red: number | null;
    };
  }>;
}

function translatePosition(position: string): PlayerPosition {
  const positionMap: Record<string, PlayerPosition> = {
    'Goalkeeper': 'Portero',
    'Defender': 'Defensa',
    'Midfielder': 'Mediocampista',
    'Attacker': 'Delantero',
  };
  return positionMap[position] || 'Mediocampista';
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
  const season = parseInt(searchParams.get('season') || '2024', 10);

  try {
    const playersData = await getPlayers(teamId, season) as PlayerResponse[];

    // Map and sort by goals + assists
    const players: Player[] = playersData
      .map((item) => {
        const stats = item.statistics[0];

        return {
          id: item.player.id,
          name: item.player.name,
          firstName: item.player.firstname || '',
          lastName: item.player.lastname || '',
          age: item.player.age || 0,
          nationality: item.player.nationality || 'Unknown',
          photo: item.player.photo || '',
          position: translatePosition(stats?.games?.position || 'Midfielder'),
          number: stats?.games?.number || 0,
        };
      })
      .sort((a, b) => a.number - b.number);

    return NextResponse.json({ players });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}
