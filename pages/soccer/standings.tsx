import { fetchStandings } from "@/services/soccer/standingsService";
import { LeagueResponse } from "@/types/soccer/standingTypes";
import { useEffect, useState } from "react";

const StandingsPage = () => {
  const [standings, setStandings] = useState<LeagueResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getStandings = async () => {
      try {
        const data = await fetchStandings();
        setStandings(data.response);
        console.log(standings);
      } catch (error) {
        setError("Failed to fetch circuits");
      } finally {
        setLoading(false);
      }
    };
    getStandings();
  }, []);
};

export default StandingsPage;
