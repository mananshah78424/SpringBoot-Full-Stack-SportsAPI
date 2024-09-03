// src/types/f1/teamStandingTypes.ts

export interface TeamRankingResponse {
  response: TeamRanking[];
}

export interface TeamRanking {
  position: number;
  team: Team;
  points: number;
  season: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}
