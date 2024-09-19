import standingBg from "@/public/images/standing-bg.png";
import Footer from "@/src/components/f1/f1Footer";
import Layout from "@/src/components/Layout";
import Loading from "@/src/components/Loading";
import {
  fetchDriverRankings,
  fetchFixtures,
  subscribeUserF1,
} from "@/src/services/f1/f1Service";
import { DriverRanking } from "@/src/types/f1/driverStandingTypes";
import { Race, RaceResponse, RaceType } from "@/src/types/f1/fixtureTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/f1.css";

type Props = {};

export default function Index({}: Props) {
  const [drivers, setDrivers] = useState<DriverRanking[] | null>(null);
  const [topThreeDrivers, setTopThreeDrivers] = useState<
    DriverRanking[] | null
  >(null);
  const [topTenDrivers, setTopTenDrivers] = useState<DriverRanking[] | null>(
    null
  );
  const [fixtures, setFixtures] = useState<RaceResponse | null>(null);
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [circuitImage, setCircuitImage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const season = 2024;
  var circuitCountry;

  // Caching function: Save data to localStorage with an expiry time
  const saveToCache = (key: string, data: any, ttl: number) => {
    const expiry = new Date().getTime() + ttl;
    localStorage.setItem(key, JSON.stringify({ data, expiry }));
  };

  // Retrieve data from cache if not expired
  const getFromCache = (key: string) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, expiry } = JSON.parse(cached);
      if (expiry > new Date().getTime()) {
        return data;
      }
    }
    return null;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(null);

        // Check cache for drivers and fixtures
        const cachedDrivers = getFromCache("f1_drivers");
        const cachedFixtures = getFromCache("f1_fixtures");
        const cachedTop3Drivers = getFromCache("top_3_f1_drivers");
        const cachedTop10Drivers = getFromCache("top_10_f1_drivers");

        // Load drivers from cache or fetch from API
        if (cachedDrivers) {
          console.log("Found drivers in the cache, hence not calling API!");
          setDrivers(cachedDrivers);
          setTopThreeDrivers(cachedTop3Drivers);
          setTopTenDrivers(cachedTop10Drivers);
        } else {
          const result = await fetchDriverRankings(season);
          if (result?.response) {
            setDrivers(result.response);
            const topThreeDrivers = result.response.slice(0, 3);
            const topTenDrivers = result.response.slice(0, 10);
            setTopThreeDrivers(topThreeDrivers);
            setTopTenDrivers(topTenDrivers);

            // Save drivers and top drivers to cache
            saveToCache("f1_drivers", result.response, 1000 * 60 * 60); // Cache for 1 hour
            saveToCache("top_3_f1_drivers", topThreeDrivers, 1000 * 60 * 60);
            saveToCache("top_10_f1_drivers", topTenDrivers, 1000 * 60 * 60);
          }
        }

        // Load fixtures from cache or fetch from API
        if (cachedFixtures) {
          console.log("Found fixtures in the cache, hence not calling API!");
          setFixtures(cachedFixtures);
          const nextRace = getNextRace(cachedFixtures);
          setNextRace(nextRace);
          updateCircuitImage(nextRace);
        } else {
          const fixturesData = await fetchFixtures(season, RaceType.RACE);
          setFixtures(fixturesData);
          saveToCache("f1_fixtures", fixturesData, 1000 * 60 * 60); // Cache for 1 hour

          const nextRace = getNextRace(fixturesData);
          setNextRace(nextRace);
          updateCircuitImage(nextRace);
        }
      } catch (err) {
        setError("Error fetching F1 data");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    // Helper function to get the next scheduled race
    const getNextRace = (fixturesData: RaceResponse) => {
      const scheduledRaces = fixturesData.response.filter(
        (race) => race.status === "Scheduled"
      );
      return scheduledRaces.reduce((closestRace, currentRace) => {
        const closestRaceDate = new Date(closestRace.date);
        const currentRaceDate = new Date(currentRace.date);
        return currentRaceDate < closestRaceDate ? currentRace : closestRace;
      });
    };

    // Helper function to set circuit image
    const updateCircuitImage = (nextRace: Race) => {
      circuitCountry = nextRace?.competition?.location?.country
        ? nextRace.competition.location.country.replace(/\s+/g, "_")
        : null;
      setCircuitImage(
        `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit maps 16x9/${circuitCountry}_Circuit`
      );
    };

    fetchData();
  }, [season]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      const data = await subscribeUserF1(email);
    }
  };
  if (loading) {
    return (
      <Layout>
        <Loading></Loading>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-grey-20 w-[100vh] lg:w-full">
        <div className="container mx-auto pt-16  ">
          <div className="border-brand-primary border-t-thick lg:border-none ">
            <h1 className="font-f1NavbarFont sm:ml-10 md:ml-10 text-[2rem] lg:text-[5rem] mb-4 mt-3">
              Next Race
            </h1>
          </div>
          {nextRace && (
            <fieldset className="border-t-thick border-r-thick rounded-tr-l f1-utils-inner-padding-tr--half relative border-primary pt-normal pr-normal ml-4">
              <legend className="mr-l px-normal">
                <div className="flex items-center">
                  {nextRace ? (
                    <img
                      alt=""
                      src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/${nextRace?.competition.location.country
                        .replace(/\s+/g, "-")
                        .toLowerCase()}-flag.png`}
                      className="f1-c-image max-w-14 rounded object-cover"
                    />
                  ) : (
                    <img
                      alt=""
                      src={
                        "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1000/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/united-states-of-america-flag"
                      }
                      className="f1-c-image max-w-14 rounded object-cover"
                    />
                  )}
                  <h2 className="f1-heading tracking-normal text-fs-20px text-[1.5625rem] ml-4 leading-none normal-case font-bold non-italic f1-heading__body font-titillium hidden lg:block ml-4 lg:ml-0">
                    <div className="ml-normal">{nextRace?.circuit.name}</div>
                  </h2>
                </div>
              </legend>
              <h2 className="f1-heading tracking-normal text-fs-20px text-[1.5625rem] ml-4 leading-none normal-case font-bold non-italic f1-heading__body font-titillium  lg:hidden ml-4 lg:ml-0">
                <div className="ml-normal">{nextRace?.circuit.name}</div>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-normal">
                <div className="col-span-1 lg:col-span-7">
                  {nextRace ? (
                    <img
                      alt=""
                      src={circuitImage}
                      className="f1-c-image w-full h-auto object-cover"
                    ></img>
                  ) : (
                    <img
                      alt=""
                      src={
                        "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Las%20Vegas"
                      }
                      className="f1-c-image w-full h-auto object-cover"
                    ></img>
                  )}
                </div>
                <div className="col-span-1 lg:col-span-5">
                  <div className="grid gap-normal f1-grid grid-cols-1 lg:grid-cols-3">
                    <div className="col-span-3 laptop:col-span-2 desktop:col-span-3">
                      <div className="grid gap-normal f1-grid grid-cols-1 lg:grid-cols-2 mt-10">
                        <div className="border-r-double border-b-double rounded-br-s f1-utils-inner-padding-br--half border-gray20">
                          <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px">
                            Country
                          </span>
                          <h2 className="f1-heading tracking-normal text-fs-22px text-fs-32px leading-tight normal-case font-bold non-italic f1-heading__body font-f1NavbarFont">
                            {nextRace?.competition.location.country}
                            <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px pl-xxs">
                              {" "}
                            </span>
                          </h2>
                        </div>
                        <div className="border-r-double border-b-double rounded-br-s f1-utils-inner-padding-br--half border-gray20">
                          <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px">
                            Status
                          </span>
                          <h2 className="f1-heading tracking-normal text-fs-22px text-fs-32px leading-tight normal-case font-bold non-italic f1-heading__body font-f1NavbarFont">
                            {nextRace?.status}
                            <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px pl-xxs">
                              {" "}
                            </span>
                          </h2>
                        </div>

                        <div className="border-r-double border-b-double rounded-br-s f1-utils-inner-padding-br--half border-gray20">
                          <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px">
                            Number of Laps
                          </span>
                          <h2 className="f1-heading tracking-normal text-fs-22px text-fs-32px leading-tight normal-case font-bold non-italic f1-heading__body font-f1NavbarFont">
                            {nextRace?.laps.total}
                            <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px pl-xxs">
                              {" "}
                            </span>
                          </h2>
                        </div>

                        <div className="border-r-double border-b-double rounded-br-s f1-utils-inner-padding-br--half border-gray20">
                          <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px">
                            Race Distance
                          </span>
                          <h2 className="f1-heading tracking-normal text-fs-22px text-fs-32px leading-tight normal-case font-bold non-italic f1-heading__body font-f1NavbarFont">
                            {nextRace?.distance}
                            <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px pl-xxs">
                              {" "}
                              km
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          )}

          <div className="my-4 w-full relative overflow-hidden w-full flex items-center mt-10 lg:h-96 before:block before:absolute before:w-full before:bg-carbonBlack/50 before:h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="font-formula font-bold text-left text-white text-32 tablet:text-62 text-center mb-1.5 uppercase">
                {nextRace?.competition.location.country}
              </h1>
              <img
                className="max-w-28 tablet:max-w-44 m-auto"
                src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/year%20icon/${new Date().getFullYear()}.png`}
                alt="Singapore"
              />
              <span className="text-center mb-1.5 uppercase bg-black text-white rounded-2xl py-1 px-2.5 !font-formula text-xs inline-block mt-3">
                20 - 22 Sep
              </span>
            </div>
            {nextRace ? (
              <img
                src={`https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/${nextRace?.competition.location.country
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              ></img>
            ) : (
              <img src="https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Las%20Vegas"></img>
            )}
          </div>

          <div
            className="mx-auto container mt-6 relative before:absolute before:top-0 before:left-0 before:bg-driverStandingHome before:bg-center before:bg-cover before:w-full before:h-64 before:h-80 bg-grey-20 react-tabs__tab-panel--selected"
            style={{
              backgroundImage: `url(${standingBg.src})`,
            }}
          >
            <div className="f1-container container relative f1-utils-flex-container items-center py-xl ">
              <h2 className="f1-heading-wide text-branding-white tracking-normal font-normal non-italic text-[2rem] lg:text-[5rem] leading-tight normal-case text-center px-xs font-f1NavbarFont">
                Driver Standings
              </h2>
              <div className="grid gap-normal w-full sm:pt-[5rem] lg:pt-[16rem] px-36 mt-[16rem] lg:mt-0">
                <div className="grid rid-cols-[2fr_2fr_2fr] lg:grid-cols-[5fr_5fr_5fr] items-end gap-s">
                  {topThreeDrivers &&
                    topThreeDrivers.map((driver, index) => {
                      const [firstName, lastName] =
                        driver.driver.name.split(" ");
                      const nameForlink =
                        firstName.slice(0, 3) +
                        lastName.slice(0, 3) +
                        "01" +
                        "_" +
                        firstName +
                        "_" +
                        lastName;

                      const imageNameForlink =
                        firstName.slice(0, 3) +
                        lastName.slice(0, 3) +
                        "01" +
                        ".png";
                      const imageLink = `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${firstName.slice(
                        0,
                        1
                      )}/${nameForlink}/${imageNameForlink}`;
                      console.log(imageLink);

                      const driverClass =
                        index === 0
                          ? "block mt-[16rem] lg:mt-0 sm:block"
                          : "hidden lg:block";
                      return (
                        <Link
                          key={index}
                          className={driverClass}
                          data-event="seasonResultsHome"
                          data-location-in-page="Standings - Drivers"
                          data-path=""
                          href="/"
                        >
                          <figure className="sm:hidden md:block block">
                            <div
                              className="relative bg-brand-white rounded-tl-sm rounded-tr-sm h-32"
                              style={
                                {
                                  "--teamColor": "#FF8000",
                                } as React.CSSProperties
                              }
                            >
                              <svg
                                aria-label="slash-2"
                                className="absolute top-s left-xs text-current"
                                viewBox="0 0 1024 1024"
                                style={{
                                  width: "6em",
                                  height: "6em",
                                  stroke: "currentColor",
                                  fill: "currentColor",
                                }}
                              >
                                <path d="M938.668 448c0 0-132.752 133.356-213.158 213.256h-195.396c0 0 59.365-59.259 127.332-126.967 27.101-26.995 65.114-64.874 86.689-86.289h194.534zM716.518 448h-194.534c-0.036 0.036-0.071 0.071-0.098 0.098h-430.617c-2.808 0-5.936 0.195-5.936 1.582 0 1.982 5.625 2.666 15.79 3.128 271.395 12.191 349.065 20.322 349.065 54.469 0 6.771-0.302 12.413-14.892 27.004 0.009 0 0.018-0.009 0.027-0.009-0.009 0.009-0.018 0.009-0.027 0.018-67.966 67.709-127.323 126.967-127.323 126.967h195.387c80.406-79.9 213.158-213.256 213.158-213.256z"></path>
                              </svg>

                              <div className="absolute w-72 w-full bottom-0 right-0 z-10">
                                <img alt={driver.driver.name} src={imageLink} />
                              </div>

                              <hr
                                className="border-8 border-teamColor absolute left-0 bottom-0 w-full"
                                style={
                                  {
                                    "--teamColor": "#FF8000;",
                                  } as React.CSSProperties
                                }
                              />
                            </div>

                            <figcaption className="sm:hidden md:block block bg-grey-80 p-4 rounded-bl-sm rounded-br-sm text-left">
                              <p className="f1-heading text-2xl :text-3xl uppercase font-bold non-italic text-brand-white">
                                <span className="flex items-baseline gap-1 text-lg font-normal normal-case">
                                  {firstName}
                                  <img
                                    alt="Country flag"
                                    src="https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/United%20Kingdom.jpg"
                                    className="h-4 rounded-sm bg-brand-carbonBlack"
                                  />
                                </span>
                                {lastName}
                              </p>
                            </figcaption>
                            <p className="text-black">{driver.position}</p>
                          </figure>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto container mt-4 text-white pb-10 pr-[0.9375rem] pl-[1.875rem] lg:px-[9rem] tracking-normal">
            {topTenDrivers &&
              topTenDrivers.map((driver, index) => {
                const [firstName, lastName] = driver.driver.name.split(" ");
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between rounded-xxs items-center p-4 border-b bg-white text-black font-normal normal-case text-fs-14px hover:bg-grey-80  hover:text-white transition-colors"
                  >
                    <div className="leftEnd flex flex-row flex-1 space-x-5">
                      <span className="f1-heading tracking-normal text-fs-14px leading-tight normal-case non-italic f1-heading__body font-f1NavbarFont">
                        {driver.position}
                      </span>

                      <div className="font-f1NavbarFont flex flex-row space-x-2 w-[20%]">
                        <span className="font-normal inline hidden lg:block">
                          {firstName}
                        </span>
                        <span className="uppercase">{lastName}</span>
                      </div>
                      <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__body text-fs-17px text-grey-70 hidden lg:block inline-block px-xs">
                        <small>{driver.team.name}</small>
                      </span>
                    </div>
                    <div className="flex items-center gap-xxs">
                      <div className="px-xs py-micro rounded-full bg-grey-20 text-brand-black">
                        <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__micro text-fs-15px">
                          {driver.points} PTS
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-carbonBlack pb-20">
          <div className="container mx-auto ">
            <h1 className="font-F1Black uppercase text-2xl sm:text-O4xl mb-2 pt-4 sm:mb-6 flex items-center justify-center text-[white]">
              STREAM F1 YOUR WAY
            </h1>
            <div className="subscribe-content mt-4 bg-white flex flex-col w-full justify-center items-center">
              <div className="flex flex-row">
                <div className="w-1/3 flex flex-col justify-center p-[3rem] border-r border-r-1">
                  <div className="title flex flex-col items-center justify-center">
                    <h1> Get Live Updates on F1</h1>
                    <p className="text-center mt-3">
                      F1 live and on demand. Stream practice sessions,
                      qualifying and the races, ad free, anywhere, any time.
                    </p>
                  </div>
                  <div className="image-box mt-3">
                    <img src="https://media.formula1.com/f_auto,c_limit,w_1080,q_auto/proposition-page/Images/promo1"></img>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col justify-center p-[3rem] border-r border-r-1">
                  <div className="title flex flex-col items-center justify-center">
                    <h1> Get Live Updates on F1</h1>
                    <p className="text-center mt-3">
                      F1 live and on demand. Stream practice sessions,
                      qualifying and the races, ad free, anywhere, any time.
                    </p>
                  </div>
                  <div className="image-box mt-3">
                    <img src="https://media.formula1.com/f_auto,c_limit,w_1080,q_auto/proposition-page/Images/promo1"></img>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col justify-center p-[3rem] border-r border-r-1">
                  <div className="title flex flex-col items-center justify-center">
                    <h1> Get Live Updates on F1</h1>
                    <p className="text-center mt-3">
                      F1 live and on demand. Stream practice sessions,
                      qualifying and the races, ad free, anywhere, any time.
                    </p>
                  </div>
                  <div className="image-box mt-3">
                    <img src="https://media.formula1.com/f_auto,c_limit,w_1080,q_auto/proposition-page/Images/promo1"></img>
                  </div>
                </div>
              </div>
              <div className="container mx-auto pb-10">
                <form
                  className="flex flex-col items-center justify-center w-full space-y-4"
                  onSubmit={handleSubmit}
                >
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email to subscribe!"
                    className="w-96 text-center"
                  />
                  <div>
                    <button type="submit">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </Layout>
  );
}
