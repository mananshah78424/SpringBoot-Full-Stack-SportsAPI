import { fetchTeams } from "@/src/services/soccer/soccerService";
import { TeamsResponse } from "@/src/types/soccer/teamsTypes";
import { useEffect, useState } from "react";

type Props = {};

const Teams = (props: Props) => {
  const [teams, setTeams] = useState<TeamsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTeams = async () => {
      try {
        setError(null);
        const result = await fetchTeams();
        console.log(result);
      } catch (error) {
        setError("Error fetching driver rankings");
      }
    };
    getTeams();
  });
  return <div>teams</div>;
};

export default Teams;
