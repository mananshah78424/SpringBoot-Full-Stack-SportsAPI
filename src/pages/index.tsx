import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const Index = (props: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-screen h-full indexpage">
      {isVisible && (
        <div className="fixed top-4 right-4 w-160 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-10">
          <span className="mr-4">
            {
              "The backend is hosted on Render, so it may take 1-2 minutes for the server to start. Please refresh in 1-2 minuts, if the content or APIs do not load at first."
            }
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
          >
            X
          </button>
        </div>
      )}
      <div className="mx-auto h-[500px] w-full">
        <div
          className={`main-banner h-full bg-pl-banner bg-cover bg-left w-full bg-no-repeat`}
        ></div>
      </div>
      {isClient && (
        <div className="max-w-screen-xl mx-[auto] h-screen w-full text-black mt-10 space-y-[5rem] px-[40px]">
          <section className="relative mx-auto max-w-full px-[10px] flex place-items-center place-content-center !max-w-none !p-0 h-[180px] lg:h-[470px] overflow-hidden mb-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[180px] before:mobile:h-[215px] before:lg:h-[470px] before:desktopWide:h-[450px] before:bg-carbonBlack/50">
            <h1 className="font-formula text-left text-carbonBlack text-32 lg:text-[3.875rem] absolute text-white font-f1NavbarFont font-black">
              Formula 1
            </h1>
            <div className="font-formula text-left text-carbonBlack text-12 lg:text-[1.475rem] absolute text-white font-f1NavbarFont font-black mt-[10rem]">
              <ul className="list-none flex flex-row space-x-8">
                <Link href={"/f1/rankings"}>
                  <li>Rankings</li>
                </Link>
                <Link href={"/f1/circuits"}>
                  <li>Circuits</li>
                </Link>
                <Link href={"/f1/calender"}>
                  <li>Fixtures</li>
                </Link>
                <Link href={"/f1/drivers"}>
                  <li>Drivers</li>
                </Link>
              </ul>
            </div>
            <img
              alt="F1 Image Drivver"
              width="1024"
              height="1024"
              decoding="async"
              data-nimg="1"
              className="w-full"
              sizes="100vw"
              src="https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Tag%20collections/Teams/Red%20Bull"
              pinger-seen="true"
            ></img>
          </section>
          <div className="w-full lg:h-[40%]">
            <div className="sport-heading-text h-full flex flex-row justify-between">
              <div className="flex flex-1 flex-col items-start justify-center ml-[10rem] order-2">
                <Link href="/soccer">
                  <h1 className="lg:text-[3.625rem] font-black font-archivo">
                    Soccer
                  </h1>
                </Link>
                <p>Soccer Stats</p>
                <div className="flex flex-row space-x-8 mt-4">
                  <Link href="/soccer">Home</Link>
                  <Link href="/soccer/standings">Standings</Link>
                  <Link href="/soccer/teams">Teams</Link>
                  <Link href="/soccer/rankings">Rankings</Link>
                </div>
              </div>
              <div className="image relative w-[165px] h-[32px] lg:w-[600px] lg:h-full order-1">
                <Image
                  src="https://resources.premierleague.com/photos/2024/06/06/8c73e9d7-a4dd-4a6d-8566-01e0f801385c/ManCityTrophy2324.jpeg?width=1400&height=800"
                  alt="Soccer image"
                  fill
                  className="h-full w-full object-fill"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
