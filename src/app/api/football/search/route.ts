import { NextRequest, NextResponse } from 'next/server';
import { searchTeams } from '@/lib/api/football-api';
import type { SearchResult } from '@/types/team';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const teamsData = await searchTeams(query);

    const results: SearchResult[] = teamsData.map((item) => ({
      id: item.team.id,
      name: item.team.name,
      type: 'team' as const,
      logo: item.team.logo,
      country: item.team.country,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    );
  }
}
