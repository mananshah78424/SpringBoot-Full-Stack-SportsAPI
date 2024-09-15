import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import { fetchFixtures } from "@/src/services/soccer/soccerService";
import { Response } from "@/src/types/soccer/fixtureTypes";
import { useCallback, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const Fixtures = () => {
  const [allFixtures, setAllFixtures] = useState<Response[]>([]); // Store all fixtures after today's date
  const [visibleFixtures, setVisibleFixtures] = useState<Response[]>([]); // Store fixtures to be shown
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsToShow, setItemsToShow] = useState<number>(10); // Start by showing 10 items
  useEffect(() => {
    const getFixtures = async () => {
      try {
        setLoading(true);
        const data = await fetchFixtures();
        // Filter fixtures that are after today's date
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const filteredFixtures = data.response.filter((fixture) => {
          const fixtureDate = new Date(fixture.fixture.date);
          return fixtureDate >= today;
        });

        setAllFixtures(filteredFixtures); // Store all fixtures after today
        setVisibleFixtures(filteredFixtures.slice(0, itemsToShow)); // Initially show 10 fixtures
      } catch (error) {
        setError("Failed to fetch fixtures");
      } finally {
        setLoading(false);
      }
    };

    getFixtures();
  }, []); // Fetch data only once on component mount

  useEffect(() => {
    // Update visible fixtures when itemsToShow changes (without refetching data)
    setVisibleFixtures(allFixtures.slice(0, itemsToShow));
  }, [itemsToShow, allFixtures]);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + windowHeight;

    if (
      scrollPosition + 100 >= fullHeight &&
      !loading &&
      visibleFixtures.length < allFixtures.length
    ) {
      setItemsToShow((prev) => prev + 10); // Load 10 more fixtures
    }
  }, [loading, visibleFixtures.length, allFixtures.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const groupedFixtures = visibleFixtures.reduce((acc, fixture) => {
    const fixtureDate = new Date(fixture.fixture.date).toDateString();
    if (!acc[fixtureDate]) {
      acc[fixtureDate] = [];
    }
    acc[fixtureDate].push(fixture);
    return acc;
  }, {} as Record<string, Response[]>);
  console.log("Grpuped Fixture is", groupedFixtures);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading && allFixtures.length === 0) {
    return <div>Loading fixtures...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SoccerBanner title="Upcoming fixtures" />
      <div className="container mx-auto">
        {Object.keys(groupedFixtures).map((date) => {
          return (
            <div key={date}>
              <h3 className="text-[1.2rem] text-[#37003c] font-bold my-4 ">
                {formatDate(date)}
              </h3>
              <div className="mt-4">
                {groupedFixtures[date].map((fixture) => (
                  <div
                    key={fixture.fixture.id}
                    className="flex flex-row justify-between items-center mb-4"
                  >
                    <div className="team-fixture flex flex-row items-center w-full justify-between">
                      {/* Home Team */}
                      <div className="flex items-center justify-end w-1/2">
                        <p className="text-right mr-2">
                          {fixture.teams.home.name}
                        </p>
                        <img
                          src={fixture.teams.home.logo}
                          className="w-[2.2rem] h-[2.2rem]"
                          alt={fixture.teams.home.name}
                        />
                      </div>

                      {/* Fixture Time */}
                      <div className="time-fixture mx-4 text-center">
                        {new Date(fixture.fixture.date).toLocaleTimeString(
                          "en-US",
                          {
                            timeZone: "America/Los_Angeles",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false, // 24-hour format
                          }
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center justify-start w-1/2">
                        <img
                          src={fixture.teams.away.logo}
                          className="w-[2.2rem] h-[2.2rem] mr-2"
                          alt={fixture.teams.away.name}
                        />
                        <p className="text-left">{fixture.teams.away.name}</p>
                      </div>
                    </div>

                    {/* Stadium Name */}
                    <span className="match-fixture__stadium-name text-center">
                      <span className="match-fixture__stadium-icon">
                        <svg
                          className="svg"
                          width="16"
                          height="11"
                          viewBox="0 0 16 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.9846 6.419V6.88792L8.64637 10.3198V9.85089L15.9846 6.419ZM7.27558 9.09389L8.45642 9.84944V10.3098L7.27558 9.55034V9.09389ZM0 6.38323L5.05679 9.68344V10.1523L0 6.83811V6.38323ZM6.73304 9.08212V9.52922L5.33611 10.1523V9.70525L6.73304 9.08212ZM15.9846 5.2896V5.75851L8.64637 9.1904V8.72149L15.9846 5.2896ZM7.27558 7.96608L8.45642 8.72241V9.18274L7.27558 8.4233V7.96608ZM0 5.19779L5.05679 8.49724V8.96693L0 5.65189V5.19779ZM6.73304 7.89669V8.34378L5.33611 8.96691V8.51904L6.73304 7.89669ZM7.5566 0.166687L8.86323 1.02894L10.4778 0.288202L15.912 3.01601L14.2117 3.74974L16 4.61343L8.63254 7.98689L7.00484 6.88708L5.10085 7.78205L0.029439 4.45305L1.96198 3.6905L0.544977 2.84305L7.5566 0.166687ZM8.71869 1.84297L3.86501 3.82296L7.0618 5.71494L12.0467 3.61732L8.71869 1.84297ZM15.9992 3.55344V4.00054L15.621 4.16956L15.1502 3.932L15.9992 3.55344ZM0.544938 3.27306L1.26193 3.70847L0.775702 3.91177L0.54185 3.78091L0.544938 3.27306Z"
                          ></path>
                        </svg>
                      </span>
                      {fixture.fixture.venue.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fixtures;
