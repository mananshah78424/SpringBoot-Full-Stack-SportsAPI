import F1PageHeading from "@/src/components/f1/f1Heading";
import Layout from "@/src/components/Layout";
import { fetchDriverRankings } from "@/src/services/f1/f1Service";
import { DriverRankingResponse } from "@/src/types/f1/driverStandingTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DriverCard: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverRankingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState<number>(2024);
  const driverNationality: { [key: number]: string } = {}; // Add an explicit type for the object
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setDrivers(null);
        const result = await fetchDriverRankings(season);
        // console.log(
        //   "Len of result of DriverRankings is ",
        //   result.response.length
        // );

        // // const getDriverDetails = await fetchDrivers(undefined, 20);
        // // console.log(getDriverDetails);
        // for (const individualDriver of result.response) {
        //   const driverId = individualDriver.driver.id;

        //   const getDriverDetails = await fetchDrivers(undefined, driverId);
        //   console.log(getDriverDetails, driverId);

        //   // if (getDriverDetails && getDriverDetails.response) {

        //   //   driverNationality[driverId] =
        //   //     getDriverDetails.response[0].country.name;
        //   //   console.log(driverNationality);
        //   // }
        // }

        console.log(result);
        setDrivers(result);
      } catch (err) {
        setError("Error fetching driver rankings");
      }
    };
    fetchData();
  }, [season]);
  return (
    <Layout>
      <div className="flex flex-col mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="min-h-screen mt-4 pb-10">
          <div className="f1-option-bar container">
            <div className="f1-option-bar container mt-6 text-[50px] font-thin">
              <F1PageHeading title={`F1 DRIVERS ${season}`}></F1PageHeading>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-12 [&>*]:col-span-12 md:[&>*]:col-span-6 gap-xl lg:[&>*]:col-span-4 lg:[&>*:nth-child(-n+3)]:col-span-4 lg:[&>*:nth-child(n+4)]:col-span-3">
              {drivers &&
                drivers.response.map((driver, index) => {
                  // const nationalityImageLink = `https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/${}.jpg`;
                  const [firstName, lastName] = driver.driver.name.split(" ");
                  const numberForLink = `https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/${firstName.slice(
                    0,
                    3
                  )}${lastName.slice(0, 3)}01`;
                  console.log(numberForLink);

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
                  const driverLink = `https://www.formula1.com/en/drivers/${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
                  return (
                    <Link
                      key={index}
                      className="outline outline-offset-4 outline-brand-black group outline-0 focus-visible:outline-2"
                      href={driverLink}
                    >
                      <div className="border-t-double border-r-double rounded-tr-s f1-utils-inner-padding-tr--half f1-driver-listing-card border-brand-black transition-all hover:-mt-xs hover:pt-l hover:border-current text-3671C6 group-focus-visible:outline group-focus-visible:outline-3671C6 group-focus-visible:transition-all group-focus-visible:border-current">
                        <div className="flex flex-col gap-xs">
                          <div className="flex align-center justify-between text-brand-black">
                            <p className="font-formulaOne tracking-normal font-black text-[42px] leading-none">
                              {driver.position}
                            </p>
                            <div className="flex flex-col gap-micro items-end">
                              <p className="font-formulaOneWide tracking-normal font-normal text-[18px] leading-none">
                                {driver.points}
                              </p>
                              <p className="font-formulaOneWide tracking-normal font-normal text-[12px] leading-none uppercase py-micro rounded-xxs bg-brand-black">
                                pts
                              </p>
                            </div>
                          </div>
                          <hr className="my-xxs border-greyLight" />
                          <div className="flex relative items-center border-l pl-xs border-current">
                            <div className="flex flex-col gap-micro text-brand-black">
                              <div className="flex gap-xxs flex-col">
                                <p className="tracking-normal text-[12px] leading-tight uppercase font-normal font-formulaOne">
                                  {firstName}
                                </p>
                                <p className="tracking-normal text-[18px] leading-tight uppercase font-bold font-formulaOne">
                                  {lastName}
                                </p>
                              </div>
                            </div>
                            <img
                              alt="Netherlands"
                              src="https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/Netherlands.jpg"
                              className="h-[2em] ml-auto mr-0 border border-greyDark rounded-xxs"
                            />
                          </div>
                          <hr className="my-xxs border-greyLight" />
                          <p className="tracking-normal text-fs-12px leading-tight normal-case font-normal non-italic text-greyDark">
                            {driver.team.name}
                          </p>
                          <div className="flex items-baseline">
                            <img
                              alt={String(driver.driver.number)}
                              src={numberForLink}
                              className="f1-utils-square-block text-[6rem]"
                            />
                            <img
                              alt=""
                              src={imageLink}
                              className="ml-0 mr-0 pr-s max-w-3/4"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DriverCard;
