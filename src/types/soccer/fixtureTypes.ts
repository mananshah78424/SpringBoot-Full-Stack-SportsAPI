export interface FixtureResponse {
  response: Response[];
}
export interface Response {
  fixture: Fixture;
  teams: Teams;
  score: Score;
}
export interface Fixture {
  id: number;
  refree: string;
  timezone: string;
  date: string;
  timestamp: string;
  venue: Venue;
  status: Status;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface Status {
  long: string;
  short: string;
  elapsed: string;
}

export interface Teams {
  home: Home;
  away: Away;
}
export interface Home {
  int: number;
  name: string;
  logo: string;
  winner: boolean;
}
export interface Away {
  int: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface Score {
  fulltime: Fulltime;
}
export interface Fulltime {
  home: number;
  away: number;
}
