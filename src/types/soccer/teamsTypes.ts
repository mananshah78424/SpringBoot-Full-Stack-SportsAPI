export interface TeamsResponse {
  response: TeamResponse[];
}
export interface TeamResponse {
  team: Team;
  venue: Venue;
}
export interface Team {
  id: number;
  name: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}
export interface Venue {
  id: number;
  name: string;
  address: string;
  capacity: number;

  surface: string;
  image: string;
}
