export interface StandingsResponse {
  response: LeagueResponse[];
}
export interface LeagueResponse {
  league: League;
}
export interface League {
  id: number;
  name: string;
  logo: string;
  flag: string;
  season: number;
  standings: TeamStanding[][];
}
export interface TeamStanding {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: Played;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Played {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}
export interface Goals {
  for: number;
  against: number;
}
