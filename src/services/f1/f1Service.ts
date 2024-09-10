import { MainCircuitResponse } from "@/src/types/f1/circuitTypes";
import { DriverRankingResponse } from "@/src/types/f1/driverStandingTypes";
import { RaceResponse, RaceType } from "@/src/types/f1/fixtureTypes";
import { TeamRankingResponse } from "@/src/types/f1/teamStandingTypes";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_F1_API // Production URL from environment variables
    : "http://localhost:8080/api/f1"; // Local development URL
console.log("URL is", API_BASE_URL);

//Fetch circuits
export const fetchCircuits = async (): Promise<MainCircuitResponse> => {
  try {
    const response = await axios.get<MainCircuitResponse>(
      `${API_BASE_URL}/circuits`
    );
    console.log("Got the response as: ", response);

    return response.data;
  } catch (error) {
    console.log("Error at fetching circuits");
    throw error;
  }
};

//Fetch Driver rankings
export const fetchDriverRankings = async (
  season: number
): Promise<DriverRankingResponse> => {
  try {
    const response = await axios.get<DriverRankingResponse>(
      `${API_BASE_URL}/rankings/drivers?season=${season}`
    );
    console.log("Done returning driver data with length: ");

    return response.data;
  } catch (error) {
    console.error("Error fetching driver standings");
    throw error;
  }
};

//Fetch Teams rankings
export const fetchTeamsRankings = async (
  season: number
): Promise<TeamRankingResponse> => {
  try {
    const response = await axios.get<TeamRankingResponse>(
      `${API_BASE_URL}/rankings/teams?season=${season}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching driver standings");
    throw error;
  }
};

//Fetch fixtures
export const fetchFixtures = async (
  season: number,
  raceType?: RaceType
): Promise<RaceResponse> => {
  try {
    const response = await axios.get<RaceResponse>(
      `${API_BASE_URL}/races?season=${season}${
        raceType ? `&type=${raceType}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching race fixtures");
    throw error;
  }
};
