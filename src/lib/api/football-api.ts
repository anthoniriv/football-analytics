const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

interface ApiOptions {
  endpoint: string;
  params?: Record<string, string | number>;
}

async function fetchFromApi<T>({ endpoint, params = {} }: ApiOptions): Promise<T> {
  if (!API_FOOTBALL_KEY) {
    throw new Error('API_FOOTBALL_KEY is not configured');
  }

  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();

  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'x-apisports-key': API_FOOTBALL_KEY,
    },
    next: {
      revalidate: 300, // Cache for 5 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}

export async function searchTeams(query: string) {
  return fetchFromApi<Array<{ team: { id: number; name: string; logo: string; country: string } }>>({
    endpoint: '/teams',
    params: { search: query },
  });
}

export async function getTeam(teamId: number) {
  return fetchFromApi<Array<{
    team: {
      id: number;
      name: string;
      logo: string;
      country: string;
      founded: number;
    };
    venue: {
      id: number;
      name: string;
      address: string;
      city: string;
      capacity: number;
      image: string;
    };
  }>>({
    endpoint: '/teams',
    params: { id: teamId },
  });
}

export async function getTeamStatistics(teamId: number, leagueId: number, season: number) {
  return fetchFromApi({
    endpoint: '/teams/statistics',
    params: { team: teamId, league: leagueId, season },
  });
}

export async function getTeamFixtures(teamId: number, season = 2024) {
  return fetchFromApi({
    endpoint: '/fixtures',
    params: { team: teamId, season },
  });
}

export async function getFixtureStatistics(fixtureId: number) {
  return fetchFromApi({
    endpoint: '/fixtures/statistics',
    params: { fixture: fixtureId },
  });
}

export async function getPlayers(teamId: number, season: number) {
  return fetchFromApi({
    endpoint: '/players',
    params: { team: teamId, season },
  });
}
