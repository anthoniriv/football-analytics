import type { Team, TeamStats, SearchResult } from '@/types/team';
import type { Match } from '@/types/match';
import type { TeamMetrics, ConfidenceLevel } from '@/types/metrics';
import type { Player, PlayerStats, PlayerMatchStats } from '@/types/player';

function getConfidence(percentage: number): ConfidenceLevel {
  if (percentage >= 70) return 'high';
  if (percentage >= 50) return 'medium';
  return 'low';
}

export const mockTeams: Team[] = [
  {
    id: 33,
    name: 'Manchester United',
    code: 'MUN',
    country: 'Inglaterra',
    founded: 1878,
    logo: 'https://media.api-sports.io/football/teams/33.png',
    venue: {
      id: 556,
      name: 'Old Trafford',
      address: 'Sir Matt Busby Way',
      city: 'Manchester',
      capacity: 76212,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/556.png',
    },
  },
  {
    id: 34,
    name: 'Newcastle United',
    code: 'NEW',
    country: 'Inglaterra',
    founded: 1892,
    logo: 'https://media.api-sports.io/football/teams/34.png',
    venue: {
      id: 562,
      name: "St. James' Park",
      address: 'St. James Street',
      city: 'Newcastle upon Tyne',
      capacity: 52305,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/562.png',
    },
  },
  {
    id: 40,
    name: 'Liverpool',
    code: 'LIV',
    country: 'Inglaterra',
    founded: 1892,
    logo: 'https://media.api-sports.io/football/teams/40.png',
    venue: {
      id: 550,
      name: 'Anfield',
      address: 'Anfield Road',
      city: 'Liverpool',
      capacity: 55212,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/550.png',
    },
  },
  {
    id: 42,
    name: 'Arsenal',
    code: 'ARS',
    country: 'Inglaterra',
    founded: 1886,
    logo: 'https://media.api-sports.io/football/teams/42.png',
    venue: {
      id: 494,
      name: 'Emirates Stadium',
      address: 'Queensland Road',
      city: 'London',
      capacity: 60260,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/494.png',
    },
  },
  {
    id: 49,
    name: 'Chelsea',
    code: 'CHE',
    country: 'Inglaterra',
    founded: 1905,
    logo: 'https://media.api-sports.io/football/teams/49.png',
    venue: {
      id: 519,
      name: 'Stamford Bridge',
      address: 'Fulham Road',
      city: 'London',
      capacity: 41837,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/519.png',
    },
  },
  {
    id: 50,
    name: 'Manchester City',
    code: 'MCI',
    country: 'Inglaterra',
    founded: 1880,
    logo: 'https://media.api-sports.io/football/teams/50.png',
    venue: {
      id: 555,
      name: 'Etihad Stadium',
      address: 'Rowsley Street',
      city: 'Manchester',
      capacity: 55097,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/555.png',
    },
  },
  {
    id: 47,
    name: 'Tottenham Hotspur',
    code: 'TOT',
    country: 'Inglaterra',
    founded: 1882,
    logo: 'https://media.api-sports.io/football/teams/47.png',
    venue: {
      id: 593,
      name: 'Tottenham Hotspur Stadium',
      address: '782 High Road',
      city: 'London',
      capacity: 62062,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/593.png',
    },
  },
  {
    id: 529,
    name: 'Barcelona',
    code: 'BAR',
    country: 'España',
    founded: 1899,
    logo: 'https://media.api-sports.io/football/teams/529.png',
    venue: {
      id: 18630,
      name: 'Estadi Olímpic Lluís Companys',
      address: 'Passeig Olímpic',
      city: 'Barcelona',
      capacity: 56000,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/18630.png',
    },
  },
  {
    id: 541,
    name: 'Real Madrid',
    code: 'RMA',
    country: 'España',
    founded: 1902,
    logo: 'https://media.api-sports.io/football/teams/541.png',
    venue: {
      id: 1456,
      name: 'Estadio Santiago Bernabéu',
      address: 'Avenida de Concha Espina',
      city: 'Madrid',
      capacity: 81044,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/1456.png',
    },
  },
  {
    id: 157,
    name: 'Bayern Munich',
    code: 'BAY',
    country: 'Alemania',
    founded: 1900,
    logo: 'https://media.api-sports.io/football/teams/157.png',
    venue: {
      id: 700,
      name: 'Allianz Arena',
      address: 'Werner-Heisenberg-Allee 25',
      city: 'München',
      capacity: 75000,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/700.png',
    },
  },
];

export const mockTeamStats: Record<number, TeamStats> = {
  33: {
    team: mockTeams[0],
    form: 'WDWLW',
    fixtures: {
      played: { home: 10, away: 10, total: 20 },
      wins: { home: 6, away: 4, total: 10 },
      draws: { home: 2, away: 3, total: 5 },
      loses: { home: 2, away: 3, total: 5 },
    },
    goals: {
      for: { home: 18, away: 12, total: 30, average: { home: '1.8', away: '1.2', total: '1.5' } },
      against: { home: 8, away: 14, total: 22, average: { home: '0.8', away: '1.4', total: '1.1' } },
    },
    cleanSheet: { home: 4, away: 2, total: 6 },
    failedToScore: { home: 1, away: 2, total: 3 },
  },
  40: {
    team: mockTeams[2],
    form: 'WWWDW',
    fixtures: {
      played: { home: 10, away: 10, total: 20 },
      wins: { home: 8, away: 6, total: 14 },
      draws: { home: 1, away: 2, total: 3 },
      loses: { home: 1, away: 2, total: 3 },
    },
    goals: {
      for: { home: 25, away: 18, total: 43, average: { home: '2.5', away: '1.8', total: '2.15' } },
      against: { home: 6, away: 10, total: 16, average: { home: '0.6', away: '1.0', total: '0.8' } },
    },
    cleanSheet: { home: 6, away: 4, total: 10 },
    failedToScore: { home: 0, away: 1, total: 1 },
  },
  42: {
    team: mockTeams[3],
    form: 'DWWWW',
    fixtures: {
      played: { home: 10, away: 10, total: 20 },
      wins: { home: 7, away: 6, total: 13 },
      draws: { home: 2, away: 2, total: 4 },
      loses: { home: 1, away: 2, total: 3 },
    },
    goals: {
      for: { home: 22, away: 16, total: 38, average: { home: '2.2', away: '1.6', total: '1.9' } },
      against: { home: 7, away: 11, total: 18, average: { home: '0.7', away: '1.1', total: '0.9' } },
    },
    cleanSheet: { home: 5, away: 3, total: 8 },
    failedToScore: { home: 1, away: 1, total: 2 },
  },
};

// More matches per team across different leagues
export const mockMatches: Record<number, Match[]> = {
  33: [
    // Premier League
    {
      id: 1001,
      date: '2024-01-20',
      timestamp: 1705766400,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 22' },
      homeTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      awayTeam: { id: 47, name: 'Tottenham Hotspur', logo: mockTeams[6].logo },
      goals: { home: 2, away: 2 },
      score: { halftime: { home: 1, away: 1 }, fulltime: { home: 2, away: 2 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 1002,
      date: '2024-01-14',
      timestamp: 1705248000,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 21' },
      homeTeam: { id: 47, name: 'Tottenham Hotspur', logo: mockTeams[6].logo },
      awayTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      goals: { home: 0, away: 2 },
      score: { halftime: { home: 0, away: 1 }, fulltime: { home: 0, away: 2 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 1003,
      date: '2024-01-07',
      timestamp: 1704643200,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 20' },
      homeTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      awayTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      goals: { home: 0, away: 1 },
      score: { halftime: { home: 0, away: 0 }, fulltime: { home: 0, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 1004,
      date: '2023-12-26',
      timestamp: 1703548800,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 19' },
      homeTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      awayTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      goals: { home: 1, away: 3 },
      score: { halftime: { home: 0, away: 2 }, fulltime: { home: 1, away: 3 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // Champions League
    {
      id: 1010,
      date: '2024-01-23',
      timestamp: 1706025600,
      league: { id: 2, name: 'UEFA Champions League', country: 'Europa', logo: '', round: 'Octavos - Ida' },
      homeTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      awayTeam: { id: 157, name: 'Bayern Munich', logo: mockTeams[9].logo },
      goals: { home: 1, away: 0 },
      score: { halftime: { home: 1, away: 0 }, fulltime: { home: 1, away: 0 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 1011,
      date: '2023-12-12',
      timestamp: 1702339200,
      league: { id: 2, name: 'UEFA Champions League', country: 'Europa', logo: '', round: 'Fase de Grupos - J6' },
      homeTeam: { id: 157, name: 'Bayern Munich', logo: mockTeams[9].logo },
      awayTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      goals: { home: 2, away: 3 },
      score: { halftime: { home: 1, away: 2 }, fulltime: { home: 2, away: 3 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // FA Cup
    {
      id: 1020,
      date: '2024-01-28',
      timestamp: 1706457600,
      league: { id: 45, name: 'FA Cup', country: 'Inglaterra', logo: '', round: 'Cuartos de Final' },
      homeTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      awayTeam: { id: 49, name: 'Chelsea', logo: mockTeams[4].logo },
      goals: { home: 2, away: 1 },
      score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // EFL Cup
    {
      id: 1030,
      date: '2024-01-10',
      timestamp: 1704844800,
      league: { id: 48, name: 'EFL Cup', country: 'Inglaterra', logo: '', round: 'Semifinal - Ida' },
      homeTeam: { id: 34, name: 'Newcastle United', logo: mockTeams[1].logo },
      awayTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      goals: { home: 0, away: 3 },
      score: { halftime: { home: 0, away: 1 }, fulltime: { home: 0, away: 3 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
  ],
  40: [
    // Premier League
    {
      id: 2001,
      date: '2024-01-21',
      timestamp: 1705852800,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 22' },
      homeTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      awayTeam: { id: 50, name: 'Manchester City', logo: mockTeams[5].logo },
      goals: { home: 1, away: 1 },
      score: { halftime: { home: 1, away: 0 }, fulltime: { home: 1, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 2002,
      date: '2024-01-14',
      timestamp: 1705248000,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 21' },
      homeTeam: { id: 34, name: 'Newcastle United', logo: mockTeams[1].logo },
      awayTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      goals: { home: 1, away: 3 },
      score: { halftime: { home: 0, away: 2 }, fulltime: { home: 1, away: 3 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 2003,
      date: '2024-01-07',
      timestamp: 1704643200,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 20' },
      homeTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      awayTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      goals: { home: 0, away: 1 },
      score: { halftime: { home: 0, away: 0 }, fulltime: { home: 0, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 2004,
      date: '2023-12-23',
      timestamp: 1703289600,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 19' },
      homeTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      awayTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      goals: { home: 2, away: 0 },
      score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 0 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // Champions League
    {
      id: 2010,
      date: '2024-01-24',
      timestamp: 1706112000,
      league: { id: 2, name: 'UEFA Champions League', country: 'Europa', logo: '', round: 'Octavos - Ida' },
      homeTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      awayTeam: { id: 541, name: 'Real Madrid', logo: mockTeams[8].logo },
      goals: { home: 2, away: 1 },
      score: { halftime: { home: 1, away: 1 }, fulltime: { home: 2, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 2011,
      date: '2023-12-13',
      timestamp: 1702425600,
      league: { id: 2, name: 'UEFA Champions League', country: 'Europa', logo: '', round: 'Fase de Grupos - J6' },
      homeTeam: { id: 529, name: 'Barcelona', logo: mockTeams[7].logo },
      awayTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      goals: { home: 1, away: 1 },
      score: { halftime: { home: 0, away: 1 }, fulltime: { home: 1, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // FA Cup
    {
      id: 2020,
      date: '2024-01-27',
      timestamp: 1706371200,
      league: { id: 45, name: 'FA Cup', country: 'Inglaterra', logo: '', round: 'Cuartos de Final' },
      homeTeam: { id: 40, name: 'Liverpool', logo: mockTeams[2].logo },
      awayTeam: { id: 34, name: 'Newcastle United', logo: mockTeams[1].logo },
      goals: { home: 4, away: 2 },
      score: { halftime: { home: 2, away: 1 }, fulltime: { home: 4, away: 2 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
  ],
  42: [
    // Premier League
    {
      id: 3001,
      date: '2024-01-20',
      timestamp: 1705766400,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 22' },
      homeTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      awayTeam: { id: 49, name: 'Chelsea', logo: mockTeams[4].logo },
      goals: { home: 3, away: 1 },
      score: { halftime: { home: 2, away: 0 }, fulltime: { home: 3, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 3002,
      date: '2024-01-13',
      timestamp: 1705161600,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 21' },
      homeTeam: { id: 50, name: 'Manchester City', logo: mockTeams[5].logo },
      awayTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      goals: { home: 0, away: 1 },
      score: { halftime: { home: 0, away: 1 }, fulltime: { home: 0, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 3003,
      date: '2024-01-06',
      timestamp: 1704556800,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 20' },
      homeTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      awayTeam: { id: 34, name: 'Newcastle United', logo: mockTeams[1].logo },
      goals: { home: 4, away: 1 },
      score: { halftime: { home: 2, away: 0 }, fulltime: { home: 4, away: 1 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    {
      id: 3004,
      date: '2023-12-26',
      timestamp: 1703548800,
      league: { id: 39, name: 'Premier League', country: 'Inglaterra', logo: '', round: 'Jornada 19' },
      homeTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      awayTeam: { id: 33, name: 'Manchester United', logo: mockTeams[0].logo },
      goals: { home: 1, away: 3 },
      score: { halftime: { home: 0, away: 2 }, fulltime: { home: 1, away: 3 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // Champions League
    {
      id: 3010,
      date: '2024-01-23',
      timestamp: 1706025600,
      league: { id: 2, name: 'UEFA Champions League', country: 'Europa', logo: '', round: 'Octavos - Ida' },
      homeTeam: { id: 529, name: 'Barcelona', logo: mockTeams[7].logo },
      awayTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      goals: { home: 1, away: 2 },
      score: { halftime: { home: 1, away: 1 }, fulltime: { home: 1, away: 2 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
    // FA Cup
    {
      id: 3020,
      date: '2024-01-28',
      timestamp: 1706457600,
      league: { id: 45, name: 'FA Cup', country: 'Inglaterra', logo: '', round: 'Cuartos de Final' },
      homeTeam: { id: 42, name: 'Arsenal', logo: mockTeams[3].logo },
      awayTeam: { id: 47, name: 'Tottenham Hotspur', logo: mockTeams[6].logo },
      goals: { home: 3, away: 0 },
      score: { halftime: { home: 1, away: 0 }, fulltime: { home: 3, away: 0 } },
      status: { short: 'FT', long: 'Finalizado' },
    },
  ],
};

export function getMockMetrics(teamId: number): TeamMetrics {
  const stats = mockTeamStats[teamId] || mockTeamStats[33];
  const played = stats.fixtures.played.total;

  const over25Pct = 65;
  const bttsPct = 55;
  const cleanSheetPct = (stats.cleanSheet.total / played) * 100;
  const failedToScorePct = (stats.failedToScore.total / played) * 100;

  return {
    goals: {
      over05: { label: 'Más de 0.5', value: '95%', percentage: 95, confidence: 'high' },
      over15: { label: 'Más de 1.5', value: '80%', percentage: 80, confidence: 'high' },
      over25: { label: 'Más de 2.5', value: `${over25Pct}%`, percentage: over25Pct, confidence: getConfidence(over25Pct) },
      over35: { label: 'Más de 3.5', value: '40%', percentage: 40, confidence: 'low' },
      btts: { label: 'Ambos Anotan', value: `${bttsPct}%`, percentage: bttsPct, confidence: getConfidence(bttsPct) },
      cleanSheets: { label: 'Portería a Cero', value: `${cleanSheetPct.toFixed(0)}%`, percentage: cleanSheetPct, confidence: getConfidence(cleanSheetPct) },
      failedToScore: { label: 'No Anotó', value: `${failedToScorePct.toFixed(0)}%`, percentage: failedToScorePct, confidence: 'low' },
      avgGoalsScored: parseFloat(stats.goals.for.average.total),
      avgGoalsConceded: parseFloat(stats.goals.against.average.total),
    },
    cards: {
      avgYellowCards: 2.1,
      avgRedCards: 0.1,
      over15Cards: { label: 'Más de 1.5', value: '85%', percentage: 85, confidence: 'high' },
      over25Cards: { label: 'Más de 2.5', value: '65%', percentage: 65, confidence: 'medium' },
      over35Cards: { label: 'Más de 3.5', value: '45%', percentage: 45, confidence: 'low' },
      over45Cards: { label: 'Más de 4.5', value: '25%', percentage: 25, confidence: 'low' },
    },
    corners: {
      avgCorners: 10.2,
      avgCornersFor: 5.8,
      avgCornersAgainst: 4.4,
      over75Corners: { label: 'Más de 7.5', value: '85%', percentage: 85, confidence: 'high' },
      over85Corners: { label: 'Más de 8.5', value: '70%', percentage: 70, confidence: 'high' },
      over95Corners: { label: 'Más de 9.5', value: '55%', percentage: 55, confidence: 'medium' },
      over105Corners: { label: 'Más de 10.5', value: '40%', percentage: 40, confidence: 'low' },
    },
    xg: {
      avgXG: 1.8,
      avgXGA: 1.1,
      xgDifference: 0.7,
      overPerformance: 0.2,
    },
  };
}

export function searchMockData(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  return mockTeams
    .filter((team) =>
      team.name.toLowerCase().includes(normalizedQuery) ||
      team.code.toLowerCase().includes(normalizedQuery) ||
      team.country.toLowerCase().includes(normalizedQuery)
    )
    .map((team) => ({
      id: team.id,
      name: team.name,
      type: 'team' as const,
      logo: team.logo,
      country: team.country,
    }));
}

export function getMockTeam(id: number): Team | undefined {
  return mockTeams.find((team) => team.id === id);
}

export function getMockTeamStats(id: number): TeamStats | undefined {
  return mockTeamStats[id];
}

export function getMockMatches(teamId: number): Match[] {
  return mockMatches[teamId] || [];
}

// Mock Players Data
export const mockPlayers: Record<number, Player[]> = {
  33: [
    { id: 1, name: 'André Onana', firstName: 'André', lastName: 'Onana', age: 27, nationality: 'Camerún', photo: 'https://media.api-sports.io/football/players/38791.png', position: 'Portero', number: 24 },
    { id: 2, name: 'Lisandro Martínez', firstName: 'Lisandro', lastName: 'Martínez', age: 26, nationality: 'Argentina', photo: 'https://media.api-sports.io/football/players/47380.png', position: 'Defensa', number: 6 },
    { id: 3, name: 'Raphaël Varane', firstName: 'Raphaël', lastName: 'Varane', age: 30, nationality: 'Francia', photo: 'https://media.api-sports.io/football/players/2285.png', position: 'Defensa', number: 19 },
    { id: 4, name: 'Luke Shaw', firstName: 'Luke', lastName: 'Shaw', age: 28, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/2935.png', position: 'Defensa', number: 23 },
    { id: 5, name: 'Diogo Dalot', firstName: 'Diogo', lastName: 'Dalot', age: 24, nationality: 'Portugal', photo: 'https://media.api-sports.io/football/players/42134.png', position: 'Defensa', number: 20 },
    { id: 6, name: 'Casemiro', firstName: 'Casemiro', lastName: '', age: 31, nationality: 'Brasil', photo: 'https://media.api-sports.io/football/players/2296.png', position: 'Mediocampista', number: 18 },
    { id: 7, name: 'Bruno Fernandes', firstName: 'Bruno', lastName: 'Fernandes', age: 29, nationality: 'Portugal', photo: 'https://media.api-sports.io/football/players/1485.png', position: 'Mediocampista', number: 8 },
    { id: 8, name: 'Kobbie Mainoo', firstName: 'Kobbie', lastName: 'Mainoo', age: 18, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/401629.png', position: 'Mediocampista', number: 37 },
    { id: 9, name: 'Mason Mount', firstName: 'Mason', lastName: 'Mount', age: 25, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/9980.png', position: 'Mediocampista', number: 7 },
    { id: 10, name: 'Marcus Rashford', firstName: 'Marcus', lastName: 'Rashford', age: 26, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/2933.png', position: 'Delantero', number: 10 },
    { id: 11, name: 'Rasmus Højlund', firstName: 'Rasmus', lastName: 'Højlund', age: 21, nationality: 'Dinamarca', photo: 'https://media.api-sports.io/football/players/327217.png', position: 'Delantero', number: 11 },
    { id: 12, name: 'Alejandro Garnacho', firstName: 'Alejandro', lastName: 'Garnacho', age: 19, nationality: 'Argentina', photo: 'https://media.api-sports.io/football/players/284324.png', position: 'Delantero', number: 17 },
  ],
  40: [
    { id: 101, name: 'Alisson Becker', firstName: 'Alisson', lastName: 'Becker', age: 31, nationality: 'Brasil', photo: 'https://media.api-sports.io/football/players/2932.png', position: 'Portero', number: 1 },
    { id: 102, name: 'Virgil van Dijk', firstName: 'Virgil', lastName: 'van Dijk', age: 32, nationality: 'Países Bajos', photo: 'https://media.api-sports.io/football/players/2287.png', position: 'Defensa', number: 4 },
    { id: 103, name: 'Trent Alexander-Arnold', firstName: 'Trent', lastName: 'Alexander-Arnold', age: 25, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/2287.png', position: 'Defensa', number: 66 },
    { id: 104, name: 'Andrew Robertson', firstName: 'Andrew', lastName: 'Robertson', age: 29, nationality: 'Escocia', photo: 'https://media.api-sports.io/football/players/2287.png', position: 'Defensa', number: 26 },
    { id: 105, name: 'Ibrahima Konaté', firstName: 'Ibrahima', lastName: 'Konaté', age: 24, nationality: 'Francia', photo: 'https://media.api-sports.io/football/players/2287.png', position: 'Defensa', number: 5 },
    { id: 106, name: 'Alexis Mac Allister', firstName: 'Alexis', lastName: 'Mac Allister', age: 25, nationality: 'Argentina', photo: 'https://media.api-sports.io/football/players/47357.png', position: 'Mediocampista', number: 10 },
    { id: 107, name: 'Dominik Szoboszlai', firstName: 'Dominik', lastName: 'Szoboszlai', age: 23, nationality: 'Hungría', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Mediocampista', number: 8 },
    { id: 108, name: 'Ryan Gravenberch', firstName: 'Ryan', lastName: 'Gravenberch', age: 21, nationality: 'Países Bajos', photo: 'https://media.api-sports.io/football/players/186789.png', position: 'Mediocampista', number: 38 },
    { id: 109, name: 'Mohamed Salah', firstName: 'Mohamed', lastName: 'Salah', age: 31, nationality: 'Egipto', photo: 'https://media.api-sports.io/football/players/306.png', position: 'Delantero', number: 11 },
    { id: 110, name: 'Darwin Núñez', firstName: 'Darwin', lastName: 'Núñez', age: 24, nationality: 'Uruguay', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Delantero', number: 9 },
    { id: 111, name: 'Luis Díaz', firstName: 'Luis', lastName: 'Díaz', age: 27, nationality: 'Colombia', photo: 'https://media.api-sports.io/football/players/47186.png', position: 'Delantero', number: 7 },
    { id: 112, name: 'Cody Gakpo', firstName: 'Cody', lastName: 'Gakpo', age: 24, nationality: 'Países Bajos', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Delantero', number: 18 },
  ],
  42: [
    { id: 201, name: 'David Raya', firstName: 'David', lastName: 'Raya', age: 28, nationality: 'España', photo: 'https://media.api-sports.io/football/players/18985.png', position: 'Portero', number: 22 },
    { id: 202, name: 'William Saliba', firstName: 'William', lastName: 'Saliba', age: 22, nationality: 'Francia', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Defensa', number: 2 },
    { id: 203, name: 'Gabriel Magalhães', firstName: 'Gabriel', lastName: 'Magalhães', age: 26, nationality: 'Brasil', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Defensa', number: 6 },
    { id: 204, name: 'Ben White', firstName: 'Ben', lastName: 'White', age: 26, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Defensa', number: 4 },
    { id: 205, name: 'Oleksandr Zinchenko', firstName: 'Oleksandr', lastName: 'Zinchenko', age: 27, nationality: 'Ucrania', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Defensa', number: 35 },
    { id: 206, name: 'Declan Rice', firstName: 'Declan', lastName: 'Rice', age: 25, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Mediocampista', number: 41 },
    { id: 207, name: 'Martin Ødegaard', firstName: 'Martin', lastName: 'Ødegaard', age: 25, nationality: 'Noruega', photo: 'https://media.api-sports.io/football/players/2295.png', position: 'Mediocampista', number: 8 },
    { id: 208, name: 'Kai Havertz', firstName: 'Kai', lastName: 'Havertz', age: 24, nationality: 'Alemania', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Mediocampista', number: 29 },
    { id: 209, name: 'Bukayo Saka', firstName: 'Bukayo', lastName: 'Saka', age: 22, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Delantero', number: 7 },
    { id: 210, name: 'Gabriel Martinelli', firstName: 'Gabriel', lastName: 'Martinelli', age: 22, nationality: 'Brasil', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Delantero', number: 11 },
    { id: 211, name: 'Leandro Trossard', firstName: 'Leandro', lastName: 'Trossard', age: 29, nationality: 'Bélgica', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Delantero', number: 19 },
    { id: 212, name: 'Eddie Nketiah', firstName: 'Eddie', lastName: 'Nketiah', age: 24, nationality: 'Inglaterra', photo: 'https://media.api-sports.io/football/players/129718.png', position: 'Delantero', number: 14 },
  ],
};

// Mock Player Stats per season
export const mockPlayerStats: Record<number, PlayerStats[]> = {
  33: [
    { player: mockPlayers[33][0], games: { appearances: 20, minutes: 1800, lineups: 20, position: 'Portero' }, goals: { total: 0, assists: 0 }, shots: { total: 0, on: 0 }, passes: { total: 580, accuracy: 82 }, tackles: { total: 0, interceptions: 0 }, duels: { total: 15, won: 10 }, dribbles: { attempts: 0, success: 0 }, fouls: { drawn: 2, committed: 1 }, cards: { yellow: 1, red: 0 }, rating: 7.2 },
    { player: mockPlayers[33][1], games: { appearances: 18, minutes: 1580, lineups: 18, position: 'Defensa' }, goals: { total: 2, assists: 1 }, shots: { total: 8, on: 4 }, passes: { total: 1120, accuracy: 89 }, tackles: { total: 42, interceptions: 28 }, duels: { total: 156, won: 98 }, dribbles: { attempts: 12, success: 8 }, fouls: { drawn: 18, committed: 22 }, cards: { yellow: 4, red: 0 }, rating: 7.4 },
    { player: mockPlayers[33][6], games: { appearances: 19, minutes: 1710, lineups: 19, position: 'Mediocampista' }, goals: { total: 8, assists: 6 }, shots: { total: 52, on: 28 }, passes: { total: 1380, accuracy: 85 }, tackles: { total: 38, interceptions: 15 }, duels: { total: 210, won: 108 }, dribbles: { attempts: 45, success: 28 }, fouls: { drawn: 32, committed: 18 }, cards: { yellow: 5, red: 0 }, rating: 7.8 },
    { player: mockPlayers[33][9], games: { appearances: 18, minutes: 1420, lineups: 16, position: 'Delantero' }, goals: { total: 7, assists: 4 }, shots: { total: 48, on: 22 }, passes: { total: 520, accuracy: 78 }, tackles: { total: 12, interceptions: 5 }, duels: { total: 145, won: 58 }, dribbles: { attempts: 82, success: 45 }, fouls: { drawn: 28, committed: 8 }, cards: { yellow: 2, red: 0 }, rating: 7.3 },
    { player: mockPlayers[33][10], games: { appearances: 17, minutes: 1280, lineups: 14, position: 'Delantero' }, goals: { total: 10, assists: 2 }, shots: { total: 58, on: 32 }, passes: { total: 380, accuracy: 75 }, tackles: { total: 8, interceptions: 2 }, duels: { total: 168, won: 72 }, dribbles: { attempts: 35, success: 18 }, fouls: { drawn: 35, committed: 12 }, cards: { yellow: 3, red: 0 }, rating: 7.5 },
    { player: mockPlayers[33][11], games: { appearances: 16, minutes: 980, lineups: 8, position: 'Delantero' }, goals: { total: 5, assists: 5 }, shots: { total: 32, on: 18 }, passes: { total: 290, accuracy: 80 }, tackles: { total: 6, interceptions: 3 }, duels: { total: 98, won: 45 }, dribbles: { attempts: 65, success: 38 }, fouls: { drawn: 22, committed: 6 }, cards: { yellow: 1, red: 0 }, rating: 7.2 },
  ],
  40: [
    { player: mockPlayers[40][0], games: { appearances: 20, minutes: 1800, lineups: 20, position: 'Portero' }, goals: { total: 0, assists: 0 }, shots: { total: 0, on: 0 }, passes: { total: 620, accuracy: 78 }, tackles: { total: 0, interceptions: 0 }, duels: { total: 18, won: 14 }, dribbles: { attempts: 2, success: 2 }, fouls: { drawn: 1, committed: 0 }, cards: { yellow: 0, red: 0 }, rating: 7.5 },
    { player: mockPlayers[40][1], games: { appearances: 19, minutes: 1710, lineups: 19, position: 'Defensa' }, goals: { total: 3, assists: 1 }, shots: { total: 12, on: 6 }, passes: { total: 1450, accuracy: 92 }, tackles: { total: 35, interceptions: 32 }, duels: { total: 142, won: 112 }, dribbles: { attempts: 8, success: 6 }, fouls: { drawn: 12, committed: 15 }, cards: { yellow: 2, red: 0 }, rating: 7.8 },
    { player: mockPlayers[40][8], games: { appearances: 20, minutes: 1750, lineups: 20, position: 'Delantero' }, goals: { total: 15, assists: 8 }, shots: { total: 72, on: 42 }, passes: { total: 680, accuracy: 82 }, tackles: { total: 18, interceptions: 8 }, duels: { total: 185, won: 92 }, dribbles: { attempts: 95, success: 58 }, fouls: { drawn: 38, committed: 12 }, cards: { yellow: 1, red: 0 }, rating: 8.2 },
    { player: mockPlayers[40][9], games: { appearances: 18, minutes: 1380, lineups: 15, position: 'Delantero' }, goals: { total: 11, assists: 5 }, shots: { total: 68, on: 35 }, passes: { total: 420, accuracy: 72 }, tackles: { total: 15, interceptions: 5 }, duels: { total: 210, won: 95 }, dribbles: { attempts: 52, success: 28 }, fouls: { drawn: 42, committed: 18 }, cards: { yellow: 4, red: 0 }, rating: 7.4 },
    { player: mockPlayers[40][10], games: { appearances: 19, minutes: 1520, lineups: 17, position: 'Delantero' }, goals: { total: 9, assists: 6 }, shots: { total: 48, on: 28 }, passes: { total: 580, accuracy: 84 }, tackles: { total: 22, interceptions: 10 }, duels: { total: 165, won: 85 }, dribbles: { attempts: 88, success: 52 }, fouls: { drawn: 35, committed: 8 }, cards: { yellow: 2, red: 0 }, rating: 7.6 },
  ],
  42: [
    { player: mockPlayers[42][0], games: { appearances: 20, minutes: 1800, lineups: 20, position: 'Portero' }, goals: { total: 0, assists: 0 }, shots: { total: 0, on: 0 }, passes: { total: 480, accuracy: 75 }, tackles: { total: 0, interceptions: 0 }, duels: { total: 12, won: 8 }, dribbles: { attempts: 0, success: 0 }, fouls: { drawn: 0, committed: 1 }, cards: { yellow: 1, red: 0 }, rating: 7.3 },
    { player: mockPlayers[42][1], games: { appearances: 20, minutes: 1800, lineups: 20, position: 'Defensa' }, goals: { total: 2, assists: 0 }, shots: { total: 8, on: 4 }, passes: { total: 1580, accuracy: 94 }, tackles: { total: 45, interceptions: 38 }, duels: { total: 168, won: 128 }, dribbles: { attempts: 5, success: 4 }, fouls: { drawn: 8, committed: 12 }, cards: { yellow: 3, red: 0 }, rating: 7.9 },
    { player: mockPlayers[42][6], games: { appearances: 18, minutes: 1620, lineups: 18, position: 'Mediocampista' }, goals: { total: 7, assists: 10 }, shots: { total: 42, on: 22 }, passes: { total: 1420, accuracy: 88 }, tackles: { total: 28, interceptions: 12 }, duels: { total: 178, won: 95 }, dribbles: { attempts: 58, success: 38 }, fouls: { drawn: 28, committed: 15 }, cards: { yellow: 2, red: 0 }, rating: 8.0 },
    { player: mockPlayers[42][8], games: { appearances: 20, minutes: 1780, lineups: 20, position: 'Delantero' }, goals: { total: 12, assists: 9 }, shots: { total: 62, on: 38 }, passes: { total: 720, accuracy: 85 }, tackles: { total: 25, interceptions: 15 }, duels: { total: 195, won: 102 }, dribbles: { attempts: 112, success: 72 }, fouls: { drawn: 45, committed: 10 }, cards: { yellow: 2, red: 0 }, rating: 8.1 },
    { player: mockPlayers[42][9], games: { appearances: 19, minutes: 1580, lineups: 18, position: 'Delantero' }, goals: { total: 8, assists: 7 }, shots: { total: 52, on: 28 }, passes: { total: 580, accuracy: 82 }, tackles: { total: 18, interceptions: 8 }, duels: { total: 145, won: 72 }, dribbles: { attempts: 92, success: 55 }, fouls: { drawn: 32, committed: 8 }, cards: { yellow: 1, red: 0 }, rating: 7.7 },
  ],
};

// Mock Player Match Stats - stats for each player in each match
export const mockPlayerMatchStats: Record<number, Record<number, PlayerMatchStats[]>> = {
  33: {
    1001: [ // MU vs Tottenham 2-2
      { matchId: 1001, player: mockPlayers[33][0], minutes: 90, position: 'Portero', rating: 6.8, goals: 0, assists: 0, shots: 0, passes: 32, passAccuracy: 78, tackles: 0, saves: 4, yellowCards: 0, redCards: 0 },
      { matchId: 1001, player: mockPlayers[33][1], minutes: 90, position: 'Defensa', rating: 7.2, goals: 0, assists: 0, shots: 1, passes: 68, passAccuracy: 91, tackles: 4, yellowCards: 1, redCards: 0 },
      { matchId: 1001, player: mockPlayers[33][6], minutes: 90, position: 'Mediocampista', rating: 8.2, goals: 1, assists: 1, shots: 4, passes: 72, passAccuracy: 88, tackles: 3, yellowCards: 0, redCards: 0 },
      { matchId: 1001, player: mockPlayers[33][9], minutes: 85, position: 'Delantero', rating: 7.5, goals: 1, assists: 0, shots: 4, passes: 28, passAccuracy: 75, tackles: 1, yellowCards: 0, redCards: 0 },
      { matchId: 1001, player: mockPlayers[33][10], minutes: 90, position: 'Delantero', rating: 6.9, goals: 0, assists: 0, shots: 3, passes: 22, passAccuracy: 72, tackles: 0, yellowCards: 0, redCards: 0 },
    ],
    1002: [ // Tottenham vs MU 0-2
      { matchId: 1002, player: mockPlayers[33][0], minutes: 90, position: 'Portero', rating: 7.8, goals: 0, assists: 0, shots: 0, passes: 28, passAccuracy: 82, tackles: 0, saves: 5, yellowCards: 0, redCards: 0 },
      { matchId: 1002, player: mockPlayers[33][1], minutes: 90, position: 'Defensa', rating: 8.0, goals: 0, assists: 0, shots: 0, passes: 72, passAccuracy: 94, tackles: 5, yellowCards: 0, redCards: 0 },
      { matchId: 1002, player: mockPlayers[33][6], minutes: 90, position: 'Mediocampista', rating: 7.8, goals: 1, assists: 0, shots: 3, passes: 65, passAccuracy: 86, tackles: 2, yellowCards: 1, redCards: 0 },
      { matchId: 1002, player: mockPlayers[33][9], minutes: 78, position: 'Delantero', rating: 7.6, goals: 1, assists: 0, shots: 5, passes: 24, passAccuracy: 78, tackles: 1, yellowCards: 0, redCards: 0 },
      { matchId: 1002, player: mockPlayers[33][11], minutes: 68, position: 'Delantero', rating: 7.2, goals: 0, assists: 1, shots: 2, passes: 18, passAccuracy: 82, tackles: 0, yellowCards: 0, redCards: 0 },
    ],
    1003: [ // MU vs Liverpool 0-1
      { matchId: 1003, player: mockPlayers[33][0], minutes: 90, position: 'Portero', rating: 7.0, goals: 0, assists: 0, shots: 0, passes: 25, passAccuracy: 76, tackles: 0, saves: 3, yellowCards: 0, redCards: 0 },
      { matchId: 1003, player: mockPlayers[33][1], minutes: 90, position: 'Defensa', rating: 6.8, goals: 0, assists: 0, shots: 0, passes: 62, passAccuracy: 88, tackles: 3, yellowCards: 1, redCards: 0 },
      { matchId: 1003, player: mockPlayers[33][6], minutes: 90, position: 'Mediocampista', rating: 6.5, goals: 0, assists: 0, shots: 2, passes: 58, passAccuracy: 82, tackles: 2, yellowCards: 0, redCards: 0 },
      { matchId: 1003, player: mockPlayers[33][9], minutes: 90, position: 'Delantero', rating: 5.8, goals: 0, assists: 0, shots: 1, passes: 18, passAccuracy: 65, tackles: 0, yellowCards: 0, redCards: 0 },
      { matchId: 1003, player: mockPlayers[33][10], minutes: 75, position: 'Delantero', rating: 6.2, goals: 0, assists: 0, shots: 2, passes: 15, passAccuracy: 70, tackles: 1, yellowCards: 0, redCards: 0 },
    ],
    1004: [ // Arsenal vs MU 1-3
      { matchId: 1004, player: mockPlayers[33][0], minutes: 90, position: 'Portero', rating: 7.5, goals: 0, assists: 0, shots: 0, passes: 30, passAccuracy: 80, tackles: 0, saves: 4, yellowCards: 0, redCards: 0 },
      { matchId: 1004, player: mockPlayers[33][1], minutes: 90, position: 'Defensa', rating: 7.8, goals: 1, assists: 0, shots: 2, passes: 70, passAccuracy: 92, tackles: 4, yellowCards: 0, redCards: 0 },
      { matchId: 1004, player: mockPlayers[33][6], minutes: 90, position: 'Mediocampista', rating: 8.5, goals: 1, assists: 1, shots: 4, passes: 75, passAccuracy: 89, tackles: 3, yellowCards: 0, redCards: 0 },
      { matchId: 1004, player: mockPlayers[33][9], minutes: 82, position: 'Delantero', rating: 8.0, goals: 1, assists: 1, shots: 5, passes: 25, passAccuracy: 78, tackles: 1, yellowCards: 0, redCards: 0 },
      { matchId: 1004, player: mockPlayers[33][10], minutes: 90, position: 'Delantero', rating: 7.2, goals: 0, assists: 0, shots: 3, passes: 20, passAccuracy: 72, tackles: 0, yellowCards: 1, redCards: 0 },
    ],
    1010: [ // MU vs Bayern 1-0 (Champions)
      { matchId: 1010, player: mockPlayers[33][0], minutes: 90, position: 'Portero', rating: 8.2, goals: 0, assists: 0, shots: 0, passes: 28, passAccuracy: 85, tackles: 0, saves: 7, yellowCards: 0, redCards: 0 },
      { matchId: 1010, player: mockPlayers[33][1], minutes: 90, position: 'Defensa', rating: 8.5, goals: 0, assists: 0, shots: 1, passes: 75, passAccuracy: 93, tackles: 6, yellowCards: 0, redCards: 0 },
      { matchId: 1010, player: mockPlayers[33][6], minutes: 90, position: 'Mediocampista', rating: 7.8, goals: 0, assists: 1, shots: 2, passes: 68, passAccuracy: 87, tackles: 4, yellowCards: 1, redCards: 0 },
      { matchId: 1010, player: mockPlayers[33][9], minutes: 88, position: 'Delantero', rating: 8.0, goals: 1, assists: 0, shots: 4, passes: 22, passAccuracy: 75, tackles: 1, yellowCards: 0, redCards: 0 },
      { matchId: 1010, player: mockPlayers[33][11], minutes: 72, position: 'Delantero', rating: 6.8, goals: 0, assists: 0, shots: 2, passes: 15, passAccuracy: 68, tackles: 0, yellowCards: 0, redCards: 0 },
    ],
  },
  40: {
    2001: [ // Liverpool vs Man City 1-1
      { matchId: 2001, player: mockPlayers[40][0], minutes: 90, position: 'Portero', rating: 7.5, goals: 0, assists: 0, shots: 0, passes: 35, passAccuracy: 80, tackles: 0, saves: 5, yellowCards: 0, redCards: 0 },
      { matchId: 2001, player: mockPlayers[40][1], minutes: 90, position: 'Defensa', rating: 7.8, goals: 0, assists: 0, shots: 1, passes: 82, passAccuracy: 94, tackles: 4, yellowCards: 0, redCards: 0 },
      { matchId: 2001, player: mockPlayers[40][8], minutes: 90, position: 'Delantero', rating: 8.2, goals: 1, assists: 0, shots: 5, passes: 38, passAccuracy: 85, tackles: 2, yellowCards: 0, redCards: 0 },
      { matchId: 2001, player: mockPlayers[40][9], minutes: 85, position: 'Delantero', rating: 6.8, goals: 0, assists: 0, shots: 4, passes: 22, passAccuracy: 70, tackles: 1, yellowCards: 1, redCards: 0 },
      { matchId: 2001, player: mockPlayers[40][10], minutes: 90, position: 'Delantero', rating: 7.2, goals: 0, assists: 1, shots: 3, passes: 32, passAccuracy: 82, tackles: 2, yellowCards: 0, redCards: 0 },
    ],
    2002: [ // Newcastle vs Liverpool 1-3
      { matchId: 2002, player: mockPlayers[40][0], minutes: 90, position: 'Portero', rating: 7.2, goals: 0, assists: 0, shots: 0, passes: 32, passAccuracy: 78, tackles: 0, saves: 3, yellowCards: 0, redCards: 0 },
      { matchId: 2002, player: mockPlayers[40][1], minutes: 90, position: 'Defensa', rating: 7.5, goals: 1, assists: 0, shots: 2, passes: 78, passAccuracy: 92, tackles: 3, yellowCards: 0, redCards: 0 },
      { matchId: 2002, player: mockPlayers[40][8], minutes: 90, position: 'Delantero', rating: 8.5, goals: 2, assists: 0, shots: 6, passes: 35, passAccuracy: 88, tackles: 1, yellowCards: 0, redCards: 0 },
      { matchId: 2002, player: mockPlayers[40][9], minutes: 78, position: 'Delantero', rating: 7.0, goals: 0, assists: 1, shots: 3, passes: 18, passAccuracy: 72, tackles: 0, yellowCards: 0, redCards: 0 },
      { matchId: 2002, player: mockPlayers[40][10], minutes: 82, position: 'Delantero', rating: 7.4, goals: 0, assists: 1, shots: 2, passes: 28, passAccuracy: 85, tackles: 2, yellowCards: 0, redCards: 0 },
    ],
  },
  42: {
    3001: [ // Arsenal vs Chelsea 3-1
      { matchId: 3001, player: mockPlayers[42][0], minutes: 90, position: 'Portero', rating: 7.2, goals: 0, assists: 0, shots: 0, passes: 28, passAccuracy: 75, tackles: 0, saves: 3, yellowCards: 0, redCards: 0 },
      { matchId: 3001, player: mockPlayers[42][1], minutes: 90, position: 'Defensa', rating: 8.0, goals: 1, assists: 0, shots: 2, passes: 85, passAccuracy: 95, tackles: 5, yellowCards: 0, redCards: 0 },
      { matchId: 3001, player: mockPlayers[42][6], minutes: 90, position: 'Mediocampista', rating: 8.5, goals: 1, assists: 2, shots: 4, passes: 78, passAccuracy: 90, tackles: 3, yellowCards: 0, redCards: 0 },
      { matchId: 3001, player: mockPlayers[42][8], minutes: 90, position: 'Delantero', rating: 8.2, goals: 1, assists: 0, shots: 5, passes: 42, passAccuracy: 88, tackles: 2, yellowCards: 0, redCards: 0 },
      { matchId: 3001, player: mockPlayers[42][9], minutes: 85, position: 'Delantero', rating: 7.5, goals: 0, assists: 1, shots: 3, passes: 32, passAccuracy: 82, tackles: 1, yellowCards: 0, redCards: 0 },
    ],
    3002: [ // Man City vs Arsenal 0-1
      { matchId: 3002, player: mockPlayers[42][0], minutes: 90, position: 'Portero', rating: 8.5, goals: 0, assists: 0, shots: 0, passes: 25, passAccuracy: 72, tackles: 0, saves: 8, yellowCards: 0, redCards: 0 },
      { matchId: 3002, player: mockPlayers[42][1], minutes: 90, position: 'Defensa', rating: 8.8, goals: 0, assists: 0, shots: 0, passes: 80, passAccuracy: 94, tackles: 7, yellowCards: 0, redCards: 0 },
      { matchId: 3002, player: mockPlayers[42][6], minutes: 90, position: 'Mediocampista', rating: 7.5, goals: 0, assists: 1, shots: 2, passes: 72, passAccuracy: 88, tackles: 4, yellowCards: 1, redCards: 0 },
      { matchId: 3002, player: mockPlayers[42][8], minutes: 90, position: 'Delantero', rating: 8.0, goals: 1, assists: 0, shots: 4, passes: 38, passAccuracy: 85, tackles: 2, yellowCards: 0, redCards: 0 },
      { matchId: 3002, player: mockPlayers[42][9], minutes: 90, position: 'Delantero', rating: 7.2, goals: 0, assists: 0, shots: 2, passes: 28, passAccuracy: 80, tackles: 1, yellowCards: 0, redCards: 0 },
    ],
  },
};

export function getMockPlayers(teamId: number): Player[] {
  return mockPlayers[teamId] || [];
}

export function getMockPlayerStats(teamId: number): PlayerStats[] {
  return mockPlayerStats[teamId] || [];
}

export function getMockPlayerMatchStats(teamId: number, matchId: number): PlayerMatchStats[] {
  return mockPlayerMatchStats[teamId]?.[matchId] || [];
}

export function getAllMockPlayerMatchStats(teamId: number): Record<number, PlayerMatchStats[]> {
  return mockPlayerMatchStats[teamId] || {};
}
