import F1PageHeading from "@/src/components/f1/f1Heading";
import Layout from "@/src/components/Layout";
import { DriverRankingResponse } from "@/src/types/f1/driverStandingTypes";
import { TeamRankingResponse } from "@/src/types/f1/teamStandingTypes";
import React, { useState } from "react";

const Rankings: React.FC = () => {
  const [rankingsType, setRankingsType] = useState<"drivers" | "teams">(
    "teams"
  );
  const [season, setSeason] = useState<number>(2024);
  const [title, setTitle] = useState<string>("2024 Team Standings");
  const [data, setData] = useState<
    TeamRankingResponse | DriverRankingResponse | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setError(null);
  //       setData(null);
  //       if (rankingsType === "teams") {
  //         const result = await fetchTeamsRankings(season);
  //         setTitle(`${season} Teams Standings`);

  //         console.log(result);

  //         setData(result);
  //       } else {
  //         const result = await fetchDriverRankings(season);
  //         console.log(result);
  //         setTitle(`${season} Driver Standings`);
  //         setData(result);
  //       }
  //     } catch (err) {
  //       setError("Sorry could not find any rankings for this year. ");
  //     }
  //   };
  //   fetchData();
  // }, [rankingsType, season]);
  const years = Array.from({ length: 2024 - 1980 + 1 }, (_, i) => 2024 - i);

  return (
    <Layout>
      <div className="flex flex-col mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" min-h-screen mt-4">
          <div className="f1-option-bar container">
            <div className="grid grid-cols-2 gap-8 border-b border-gray-300 pb-4">
              <div className="p-normal">
                <div className="f1-ranking-option">
                  <div
                    className={`cursor-pointer p-4 ${
                      rankingsType === "teams"
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRankingsType("teams")}
                  >
                    Teams
                  </div>
                  <div
                    className={`cursor-pointer p-4 ${
                      rankingsType === "drivers"
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRankingsType("drivers")}
                  >
                    Drivers
                  </div>
                </div>
              </div>

              <div className="p-normal">
                <div className="f1-ranking-option">
                  {years.map((year) => (
                    <div
                      key={year}
                      className={`cursor-pointer p-4 ${
                        season === year
                          ? "font-bold underline"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => setSeason(year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <F1PageHeading
              title={title}
              subtitle="2024 FIA FORMULA ONE WORLD CHAMPIONSHIP™ RANKINGS"
            ></F1PageHeading>

            <hr />
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex-1 lg:overflow-y-auto lg:pb-16 min-h-screen text-white container f1-option-bar mt-5">
              {/* Display the data in a table with zebra stripes */}
              {data && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                          Points
                        </th>
                        {rankingsType === "drivers" && (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                              Wins
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                              Behind
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rankingsType === "drivers" &&
                        (data as DriverRankingResponse).response.map(
                          (ranking, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-black">
                                {ranking.position}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {ranking.driver && ranking.driver.image && (
                                  <img
                                    src={ranking.driver.image}
                                    alt={`${ranking.driver.name}'s image`}
                                    className="w-12 h-12 object-cover rounded-full"
                                  />
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ranking.driver && ranking.driver.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ranking.points}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ranking.wins}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ranking.behind ?? "N/A"}
                              </td>
                            </tr>
                          )
                        )}
                      {rankingsType === "teams" &&
                        (data as TeamRankingResponse).response.map(
                          (ranking, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-black">
                                {ranking.position}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <img
                                  src={ranking.team.logo}
                                  alt={`${ranking.team.name} logo`}
                                  className="w-12 h-12 object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ranking.team.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ranking.points}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* {data && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {rankingsType === "drivers" &&
              (data as DriverRankingResponse).response.map((ranking, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded shadow-md flex items-center gap-4"
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    {ranking.driver.image && (
                      <img
                        src={ranking.driver.image}
                        alt={`${ranking.driver.name}'s image`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {ranking.driver.name}
                    </h2>
                    <p className="text-gray-700">
                      Position: {ranking.position}
                    </p>
                    <p className="text-gray-700">Points: {ranking.points}</p>
                    <p className="text-gray-700">Wins: {ranking.wins}</p>
                    <p className="text-gray-700">
                      Behind: {ranking.behind ?? "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            {rankingsType === "teams" &&
              (data as TeamRankingResponse).response.map((ranking, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded shadow-md flex items-center gap-4"
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={ranking.team.logo}
                      alt={`${ranking.team.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {ranking.team.name}
                    </h2>
                    <p className="text-gray-700">
                      Position: {ranking.position}
                    </p>
                    <p className="text-gray-700">Points: {ranking.points}</p>
                  </div>
                </div>
              ))}
          </div>
        )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rankings;
