import Layout from "@/src/components/Layout";
import { fetchDriverRankings } from "@/src/services/f1/f1Service";
import { DriverRanking } from "@/src/types/f1/driverStandingTypes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MainScreenImage from "../../images/f1-main-screen.webp";
import standingBg from "../../images/standing-bg.png";
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
  const [error, setError] = useState<string | null>(null);
  const season = 2024;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const result = await fetchDriverRankings(season);
        if (result?.response) {
          setDrivers(result.response);
          const topThreeDrivers = result.response.slice(0, 3);
          console.log(topThreeDrivers);
          const topTenDrivers = result.response.slice(0, 10);
          setTopTenDrivers(topTenDrivers);

          setTopThreeDrivers(topThreeDrivers);
        }
      } catch (err) {
        setError("Error fetching driver rankings");
      }
    };
    fetchData();
  }, [season]);

  return (
    <Layout>
      <div className="bg-grey-20">
        <div className="container mx-auto pt-16">
          <div className="mx-auto flex">
            <div className="container h-full align-center flex mx-auto justify-center rounded-lg shadow-lg">
              <Image
                src={MainScreenImage}
                layout="responsive"
                width={800}
                height={100}
                alt="Main screen image"
                className="w-full object-cover"
              />
            </div>
          </div>

          <div
            className="mx-auto container mt-6 relative before:absolute before:top-0 before:left-0 before:bg-driverStandingHome before:bg-center before:bg-cover before:w-full before:h-64 before:h-80 bg-grey-20 react-tabs__tab-panel--selected"
            style={{
              backgroundImage: `url(${standingBg.src})`,
            }}
          >
            <div className="f1-container container relative f1-utils-flex-container items-center py-xl __variable_ada7bd">
              <h2 className="f1-heading-wide text-branding-white tracking-normal font-normal non-italic text-fs-25px leading-tight normal-case text-center px-xs font-formulaOneWide">
                Driver Standings
              </h2>
              <div className="grid gap-normal w-full sm:pt-[5rem] lg:pt-[10rem] px-36">
                <div className="grid grid-cols-[5fr_5fr_5fr] items-end gap-s">
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

                      const driverClass = index === 1 ? "col-start-2" : "";
                      return (
                        <a
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
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto container mt-4 text-white">
            {topTenDrivers &&
              topTenDrivers.map((driver, index) => {
                const [firstName, lastName] = driver.driver.name.split(" ");
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between rounded-xxs items-center p-4 border-b bg-white text-black font-normal normal-case text-fs-17px"
                  >
                    <div className="leftEnd flex flex-row">
                      <span className="f1-heading tracking-normal text-fs-14px leading-tight normal-case font-bold non-italic f1-heading__body font-formulaOne">
                        {driver.position}
                        <span
                          className="driverName border-teamColor border-l-4 pl-xs ml-xs"
                          style={
                            {
                              "--teamColor": "#FF8000",
                            } as React.CSSProperties
                          }
                        >
                          <span className="font-normal tablet:inline">
                            {firstName}
                          </span>
                          &nbsp;<span className="uppercase">{lastName}</span>
                        </span>
                        <span className="f1-text font-titillium tracking-normal font-normal non-italic normal-case leading-snug f1-text__body text-fs-17px text-grey-70 tablet:inline-block px-xs">
                          <small>{driver.team.name}</small>
                        </span>
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
      </div>
    </Layout>
  );
}
