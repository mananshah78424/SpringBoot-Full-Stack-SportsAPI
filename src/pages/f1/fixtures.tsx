import F1PageHeading from "@/src/components/f1/f1Heading";
import Layout from "@/src/components/Layout";
import { fetchFixtures } from "@/src/services/f1/f1Service";
import { RaceResponse, RaceType } from "@/src/types/f1/fixtureTypes";
import React, { useEffect, useState } from "react";

const RacePage: React.FC = () => {
  const [season, setSeason] = useState<number>(2024);
  const [raceType, setRaceType] = useState<RaceType>(RaceType.RACE);
  const [fixtures, setFixtures] = useState<RaceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFixtures = async () => {
      if (season && raceType) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchFixtures(season, raceType);
          console.log(data);

          setFixtures(data);
        } catch (error) {
          setError("Failed to fetch race fixtures");
        } finally {
          setLoading(false);
        }
      }
    };

    getFixtures();
  }, [season, raceType]);

  const years = Array.from({ length: 2024 - 1980 + 1 }, (_, i) => 2024 - i);

  return (
    <Layout>
      <div className="flex flex-col mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen mt-4">
          <div className="f1-option-bar container">
            <div className="grid grid-cols-2 gap-8 border-b border-gray-300 pb-4">
              <div className="p-normal">
                <div className="f1-ranking-option">
                  <div
                    className={`cursor-pointer p-4 ${
                      raceType === RaceType.RACE
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRaceType(RaceType.RACE)}
                  >
                    Race
                  </div>
                  <div
                    className={`cursor-pointer p-4 ${
                      raceType === RaceType.FIRST_QUALIFYING
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRaceType(RaceType.FIRST_QUALIFYING)}
                  >
                    1st Qualifying
                  </div>
                  <div
                    className={`cursor-pointer p-4 ${
                      raceType === RaceType.SECOND_QUALIFYING
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRaceType(RaceType.SECOND_QUALIFYING)}
                  >
                    2nd Qualifying
                  </div>
                  <div
                    className={`cursor-pointer p-4 ${
                      raceType === RaceType.THIRD_QUALIFYING
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRaceType(RaceType.THIRD_QUALIFYING)}
                  >
                    3rd Qualifying
                  </div>
                  <div
                    className={`cursor-pointer p-4 ${
                      raceType === RaceType.SPRINT
                        ? "font-bold underline"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setRaceType(RaceType.SPRINT)}
                  >
                    Sprint
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

            <F1PageHeading title={`${season} ${raceType} Fixtures`} />

            <hr />
            {error && <p className="text-red-500">{error}</p>}

            {loading && (
              <div className="flex justify-center">
                <p>Loading fixtures...</p>
              </div>
            )}

            <div className="flex-1 lg:overflow-y-auto lg:pb-16 min-h-screen text-white container f1-option-bar">
              {fixtures && (
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                        Race
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                        Circuit
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r-0">
                        Winner/Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fixtures.response.map((race, index) => {
                      const dateObj = new Date(race.date);

                      const date = dateObj.toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
                      const day = dateObj.toLocaleDateString("en-US", {
                        weekday: "long",
                      }); // Get day of the week
                      const time = dateObj.toTimeString().split(" ")[0]; // Extract time (HH:MM:SS)
                      return (
                        <tr
                          key={race.id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-black">
                            {`${day}, ${date}, ${time} UTC`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-black">
                            {race.competition.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {race.circuit && (
                              <img
                                src={race.circuit.image}
                                alt={`${race.circuit.name}'s image`}
                                className="w-12 h-12 object-cover rounded-full"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-black">
                            {race.status ? race.status : race.date}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RacePage;
