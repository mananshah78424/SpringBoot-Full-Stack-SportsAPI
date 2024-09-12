import { TeamsResponse } from "@/src/types/soccer/teamsTypes";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SOCCER_API // Production URL from environment variables
    : "http://localhost:8080/api/soccer"; // Local development URL
console.log("URL is", API_BASE_URL);

//Fetch Teams
export const fetchTeams = async (): Promise<TeamsResponse> => {
  try {
    const response = await axios.get<TeamsResponse>(`${API_BASE_URL}/teams`);
    console.log("Got the response as: ", response);

    return response.data;
  } catch (error) {
    console.log("Error at fetching circuits");
    throw error;
  }
};
