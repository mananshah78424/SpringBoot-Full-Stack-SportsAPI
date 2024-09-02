import { MainCircuitResponse } from "@/types/f1/circuitTypes";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_F1_API;
console.log(API_BASE_URL);

export const fetchCircuits = async (): Promise<MainCircuitResponse> => {
  try {
    const response = await axios.get<MainCircuitResponse>(
      `${API_BASE_URL}/circuits`
    );
    console.log("Got the response as: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
