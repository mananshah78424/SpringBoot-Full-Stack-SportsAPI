import { MainStandingsResponse } from "@/src/types/soccer/standingTypes";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_SOCCER_API;
console.log(API_BASE_URL);
export const fetchStandings = async (): Promise<MainStandingsResponse> => {
  try {
    const response = await axios.get<MainStandingsResponse>(
      `${API_BASE_URL}/standings`
    );
    console.log("Got the response as: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
