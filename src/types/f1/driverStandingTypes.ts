export interface DriverRankingResponse {
  response: DriverRanking[];
}

export interface DriverRanking {
  position: number;
  driver: Driver;
  team: Team;
  points: number;
  wins: number;
  behind?: number; // Optional field
  season: number;
}

export interface Driver {
  id: number;
  name: string;
  abbr: string;
  number: number;
  image: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}
