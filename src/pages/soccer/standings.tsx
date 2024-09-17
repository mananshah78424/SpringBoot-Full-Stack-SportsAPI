import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import TopBar from "@/src/components/TopBar";
import { fetchStandings } from "@/src/services/soccer/soccerService";
import { TeamStanding } from "@/src/types/soccer/standingTypes";
import { useEffect, useState } from "react";

const StandingsPage = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getStandings = async () => {
      try {
        const data = await fetchStandings();
        setStandings(data.response[0].league.standings[0]);
        console.log(data.response[0].league.standings[0]);
      } catch (error) {
        setError("Failed to fetch circuits");
      } finally {
        setLoading(false);
      }
    };
    getStandings();
  }, []);
  return (
    <div className="">
      <TopBar></TopBar>
      <div className="mt-5">
        <SoccerBanner title="Standings"></SoccerBanner>
      </div>
      <div className="container mx-auto">
        <div className="wrapper col-12 league-table__table-header mt-6">
          <div className="league-table__comp-logo-container js-table-logo">
            <img
              className="league-table__comp-logo "
              src="https://resources.premierleague.com/premierleague/competitions/competition_1.png"
            />
          </div>
        </div>
        {standings && (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4 mb-10">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Played
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Won
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drawn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.map((teamStanding) => (
                <tr key={teamStanding.team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={teamStanding.team.logo}
                      alt={teamStanding.team.name}
                      className="w-8 h-8 mr-2"
                    />
                    {teamStanding.team.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.all.played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.all.win}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.all.draw}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.all.lose}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.all.goals.for}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.all.goals.against}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.goalsDiff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamStanding.form}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StandingsPage;
