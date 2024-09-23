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

export const fetchFixtures = async (
  season?: number,
  raceType?: RaceType,
  competitionId?: number | null,
  next?: number
): Promise<RaceResponse | null> => {
  var response;
  season = season != null ? season : 2024;
  try {
    if (season && raceType && competitionId && next) {
      response = await axios.get<RaceResponse>(
        `${API_BASE_URL}/races?season=${season}&type=${raceType}&next=${next}&competition=${competitionId}&timezone=America/Los_Angeles`
      );
    } else if (season && raceType && competitionId) {
      response = await axios.get<RaceResponse>(
        `${API_BASE_URL}/races?season=${season}&type=${raceType}&competition=${competitionId}&timezone=America/Los_Angeles`
      );
    } else if (season && raceType && next) {
      response = await axios.get<RaceResponse>(
        `${API_BASE_URL}/races?season=${season}&type=${raceType}&next=${next}&timezone=America/Los_Angeles`
      );
    } else if (season && raceType) {
      response = await axios.get<RaceResponse>(
        `${API_BASE_URL}/races?season=${season}&type=${raceType}&timezone=America/Los_Angeles`
      );
    } else {
      response = await axios.get<RaceResponse>(
        `${API_BASE_URL}/races?season=${season}&timezone=America/Los_Angeles`
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching race fixtures");
    throw error;
  }
};

//Fetch fixtures
// export const fetchFixtures = async (
//   season: number,
//   raceType?: RaceType
// ): Promise<RaceResponse> => {
//   try {
//     console.log(raceType);

//     const response = await axios.get<RaceResponse>(
//       `${API_BASE_URL}/races?season=${season}${
//         raceType ? `&type=${raceType}` : ""
//       }`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching race fixtures");
//     throw error;
//   }
// };

// export const fetchFixturesWithNext = async (
//   season: number,
//   raceType?: RaceType
// ): Promise<RaceResponse> => {
//   try {
//     console.log(raceType);

//     const response = await axios.get<RaceResponse>(
//       `${API_BASE_URL}/races?season=${season}&next=1&timezone=America/Los_Angeles${
//         raceType ? `&type=${raceType}` : ""
//       }`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching race fixtures");
//     throw error;
//   }
// };

// export const fetchFixturesWithComepeitionId = async (
//   season: number,
//   id?: number
// ): Promise<RaceResponse> => {
//   try {
//     const response = await axios.get<RaceResponse>(
//       `${API_BASE_URL}/races?season=${season}&competition=${id}&timezone=America/Los_Angeles`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching race fixtures");
//     throw error;
//   }
// };
//Fetch Drivers
export const fetchDrivers = async (
  search?: String,
  id?: number
): Promise<any> => {
  try {
    const response = await axios.get<any>(
      `${API_BASE_URL}/driver${search ? `?search=${search}` : `?id=${id}`}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching driver details");
    throw error;
  }
};

//Sending Email
export const subscribeUserF1 = async (email: string): Promise<any> => {
  try {
    const response = await axios.post<any>(
      `${API_BASE_URL}/email?email=${email}&sport=f1`
    );
    return response.data;
  } catch (error) {
    console.error("Error subscribing users ");
    throw error;
  }
};
