import Loading from "@/src/components/Loading";
import SoccerNavbar from "@/src/components/soccer/SoccerNavbar";
import { getFromCache, saveToCache } from "@/src/services/General/Caching";
import { Article, scrapeNews } from "@/src/services/soccer/newsScarper";
import { topPlayersStats } from "@/src/services/soccer/soccerService";
import { StatsResponse } from "@/src/types/soccer/topPlayerStats";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../styles/soccer.css";
type Props = {};

const Index = (props: Props) => {
  const [articles, setArticles] = useState<Article[]>([]); // Array of articles
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topPlayerStats, setTopPlayerStats] = useState<StatsResponse[]>();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        const cachedDrivers = getFromCache("soccer_news");
        const topPlayerStats = getFromCache("topPlayerStats");
        if (cachedDrivers) {
          setArticles(cachedDrivers); // Set articles to the fetched response
        } else {
          const response = await scrapeNews(); // Ensure this returns an array of articles
          setArticles(response);
          saveToCache("soccer_news", response, 1000 * 60 * 60);
        }

        if (topPlayerStats) {
          setTopPlayerStats(topPlayerStats);
        } else {
          const response = await topPlayersStats();
          setTopPlayerStats(response.response);
          saveToCache("topPlayerStats", response.response, 1000 * 60 * 60);
        }
        console.log(topPlayerStats);
      } catch (error) {
        console.error("Error fetching soccer news:", error);
        setError("Error fetching news. Please try again."); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (topPlayerStats) {
    // Get the player with the highest goals
    const highestGoalScorer = topPlayerStats.reduce((max, current) => {
      const currentGoals = current.statistics[0].goals.total;
      return currentGoals > max.statistics[0].goals.total ? current : max;
    }, topPlayerStats[0]);
    // Get the player with the highest assists
    const highestAssists = topPlayerStats.reduce((max, current) => {
      const currentAssists = current.statistics[0].goals.assists;
      return currentAssists > max.statistics[0].goals.assists ? current : max;
    }, topPlayerStats[0]);

    console.log("Highest goalscored", highestGoalScorer);
    console.log("Highest assists", highestAssists);
  }

  return (
    <div className="">
      <SoccerNavbar></SoccerNavbar>
      {/* <div className="mt-5">
        <SoccerBanner title=""></SoccerBanner>
      </div> */}
      <div className="flex flex-row justify-center bg-soccerMainBanner mb-4">
        <div className="container mx-auto">
          <div className="mt-10 pb-10">
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-2/3">
                <span className="relative flex justify-center items-center main-banner lg:h-[550px]  bg-[url('https://drop-assets.ea.com/images/2wkno2XZ6KoqdKyx4no5Yj/ebc5161e1e321070600f06eefa390f93/FC25_UT-Hero_4x3.jpg?im=AspectCrop=(4,3),xPosition=0.5,yPosition=0.5&w=1191')] bg-cover bg-left w-full bg-no-repeat before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[280px] before:h-[215px] before:lg:h-[550px] before:lg:h-[450px] before:bg-carbonBlack/50"></span>
                <p className="text-white text-[20px] mt-2">Feature</p>
                <h2 className="text-white text-[32px]">
                  Premier League weekend review: What we learned
                </h2>
              </div>
              <div className="w-1/3">
                {loading ? (
                  <Loading /> // Display loading component if loading is true
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    {" "}
                    {/* Centers the content vertically and horizontally */}
                    {articles.slice(0, 3).map((article, index) => {
                      return (
                        <Link href={article.link} key={index}>
                          <div
                            className="flex flex-col items-center mb-4"
                            key={index}
                          >
                            {" "}
                            {/* Flex column layout to stack image and text */}
                            <img
                              src={article.imageSrc}
                              className="w-[270px] object-contain" // Use object-contain for better image scaling
                              alt={article.title} // Add alt attribute for better accessibility
                            />
                            <h2 className="mt-2 text-white text-left w-[300px] text-[1.2rem]">
                              {article.title}
                            </h2>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full">
        {/* Left empty div for layout spacing */}
        <div className="w-1/3 px-[3rem]">
          <div className="container> mx-auto">
            <div className="border border-[#ebe5eb] rounded-lg overflow-hidden flex flex-col">
              <div className="w-full text-black">
                <div className="stats_card_top_section flex relative ">
                  <div className="stats-card__stats-list-wrapper">
                    <div className="js-player-club stats-card__badge">
                      <a
                        className="featured-player__club"
                        href="//www.premierleague.com/clubs/11/Manchester-City/overview"
                      >
                        <span
                          className="featured-player__badge badge badge-image-container"
                          data-widget="club-badge-image"
                          data-size="100"
                        >
                          <img
                            className="badge-image sm:badge-image--100 js-badge-image w-24 h-24"
                            src="https://resources.premierleague.com/premierleague/badges/100/t43.png"
                            srcSet="https://resources.premierleague.com/premierleague/badges/100/t43.png, https://resources.premierleague.com/premierleague/badges/100/t43@x2.png 2x"
                            alt="Club Badge"
                          />
                        </span>
                      </a>
                    </div>

                    <ul
                      className="stats-card__stats-list js-featured-player-stats space-y-2 mt-4"
                      data-widget="featuredplayerstats"
                    >
                      <li className="stats-card__row flex flex-col justify-between">
                        <div
                          className="stats-card__pos text-gray-600"
                          title="Appearances"
                        >
                          Appearances
                        </div>
                        <div className="stats-card__stat font-bold">71</div>
                      </li>

                      <li className="stats-card__row flex flex-col  justify-between">
                        <div
                          className="stats-card__pos text-gray-600"
                          title="Goals"
                        >
                          Goals
                        </div>
                        <div className="stats-card__stat font-bold">73</div>
                      </li>

                      <li className="stats-card__row flex flex-col  justify-between">
                        <div
                          className="stats-card__pos text-gray-600"
                          title="Assists"
                        >
                          Assists
                        </div>
                        <div className="stats-card__stat font-bold">13</div>
                      </li>

                      <li className="stats-card__row flex flex-col  justify-between">
                        <div
                          className="stats-card__pos text-gray-600"
                          title="Shots"
                        >
                          Shots
                        </div>
                        <div className="stats-card__stat font-bold">270</div>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="stats-card__player-image js-featured-player-image t43"
                    data-list-image="false"
                  >
                    <img
                      data-script="pl_player-image"
                      data-widget="player-image"
                      data-player="p223094"
                      data-size="110x140"
                      className="statCardImg statCardPlayer"
                      src="https://resources.premierleague.com/premierleague/photos/players/110x140/p223094.png"
                      alt="Erling Haaland"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 flex flex-wrap">
          {" "}
          {/* Applied flex-wrap to allow wrapping */}
          <div className="flex flex-col w-full">
            <p className="mb-4">Latest news</p>{" "}
            {loading ? (
              <Loading></Loading>
            ) : (
              <div className="flex flex-wrap gap-2">
                {/* Ensure this div has flex-wrap */}
                {articles.slice(3).map((article, index) => {
                  return (
                    <Link href={article.link} key={index}>
                      <div className="flex flex-col items-center mb-4 w-[300px]">
                        {" "}
                        {/* Set width for items */}
                        <img
                          src={article.imageSrc}
                          className="w-full object-contain" // Full width within parent container
                          alt={article.title} // Alt attribute for better accessibility
                        />
                        <h2 className="mt-2 text-black text-left w-full article-text text-[#37003c]">
                          {article.title}
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
