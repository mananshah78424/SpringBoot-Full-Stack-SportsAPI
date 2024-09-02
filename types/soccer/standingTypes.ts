export interface Paging {
  current: number;
  total: number;
}

export interface Parameters {
  league: string;
  season: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

// Define the TeamStanding interface
export interface TeamStanding {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: TeamStanding[][];
}

export interface LeagueResponse {
  league: League;
}

export interface MainStandingsResponse {
  get: string;
  parameters: Parameters;
  errors: any; // You might want to specify the type based on what errors could be
  results: number;
  paging: Paging;
  response: LeagueResponse[];
}
