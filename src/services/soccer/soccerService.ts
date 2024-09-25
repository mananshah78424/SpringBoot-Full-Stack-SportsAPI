import { FixtureResponse } from "@/src/types/soccer/fixtureTypes";
import { StandingsResponse } from "@/src/types/soccer/standingTypes";
import { TeamsResponse } from "@/src/types/soccer/teamsTypes";
import { PlayerStatsResponse } from "@/src/types/soccer/topPlayerStats";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SOCCER_API // Production URL from environment variables
    : "http://localhost:8080/api/soccer"; // Local development URL
console.log("URL is", API_BASE_URL);

//Standings
export const fetchStandings = async (): Promise<StandingsResponse> => {
  try {
    const response = await axios.get<StandingsResponse>(
      `${API_BASE_URL}/standings`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Fetch Teams
export const fetchTeams = async (): Promise<TeamsResponse> => {
  try {
    const response = await axios.get<TeamsResponse>(`${API_BASE_URL}/teams`);

    return response.data;
  } catch (error) {
    console.log("Error at fetching circuits");
    throw error;
  }
};

//Fixtures
export const fetchFixtures = async (): Promise<FixtureResponse> => {
  try {
    const response = await axios.get<FixtureResponse>(
      `${API_BASE_URL}/fixtures`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching soccer fixtures");
    throw error;
  }
};

//Top Players
export const topPlayersStats = async (): Promise<PlayerStatsResponse> => {
  try {
    const response = await axios.get<PlayerStatsResponse>(
      `${API_BASE_URL}/topplayers`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
