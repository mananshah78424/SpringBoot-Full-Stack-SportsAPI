import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import { fetchFixtures } from "@/src/services/soccer/soccerService";
import { Response } from "@/src/types/soccer/fixtureTypes";
import { useCallback, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState<Response[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentMonthOffset, setCurrentMonthOffset] = useState<number>(0);

  useEffect(() => {
    const getFixtures = async (monthOffset: number) => {
      try {
        setLoading(true);
        const data = await fetchFixtures();

        const today = new Date();
        const nextMonthDate = new Date(today);
        nextMonthDate.setMonth(today.getMonth() + monthOffset + 1);

        const filteredFixtures = data.response.filter((fixture) => {
          const fixtureDate = new Date(fixture.fixture.date);
          return fixtureDate > today && fixtureDate <= nextMonthDate;
        });

        setFixtures((prevFixtures) => {
          // Merge new fixtures and avoid duplicates by checking fixture IDs
          const newFixtures = filteredFixtures.filter(
            (newFixture) =>
              !prevFixtures.some(
                (existingFixture) =>
                  existingFixture.fixture.id === newFixture.fixture.id
              )
          );
          return [...prevFixtures, ...newFixtures];
        });

        setHasMore(filteredFixtures.length > 0); // Stop loading if no fixtures were fetched
      } catch (error) {
        setError("Failed to fetch fixtures");
      } finally {
        setLoading(false);
      }
    };

    getFixtures(currentMonthOffset);
  }, [currentMonthOffset]);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + windowHeight;

    if (scrollPosition + 100 >= fullHeight && !loading && hasMore) {
      setCurrentMonthOffset((prevOffset) => prevOffset + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const groupedFixtures = fixtures.reduce((acc, fixture) => {
    const fixtureDate = new Date(fixture.fixture.date).toDateString();
    if (!acc[fixtureDate]) {
      acc[fixtureDate] = [];
    }
    acc[fixtureDate].push(fixture);
    return acc;
  }, {} as Record<string, Response[]>);

  if (loading && fixtures.length === 0) {
    return <div>Loading fixtures...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Upcoming Fixtures</h2>
      <SoccerBanner title="Upcoming fixtures" />
      <div className="container mx-auto">
        {Object.keys(groupedFixtures).map((date) => (
          <div key={date}>
            <h3 className="text-lg font-bold my-4">{date}</h3>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4 mb-10">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Home Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Away Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedFixtures[date].map((fixture) => (
                  <tr key={fixture.fixture.id} className="border-t">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {fixture.teams.home.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {fixture.teams.away.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(fixture.fixture.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {fixture.fixture.status.long}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {loading && <div>Loading more fixtures...</div>}
    </div>
  );
};

export default Fixtures;
