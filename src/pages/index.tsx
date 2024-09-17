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
          <div className="w-full lg:h-[40%] cursor-pointer">
            <Link href="/f1">
              <div className="sport-heading-text h-full flex flex-row justify-between">
                <div className="flex flex-1 flex-col items-start justify-center ml-[10rem]">
                  <h1 className="lg:text-[3.625rem] font-black font-archivo">
                    Formula 1
                  </h1>
                  <p>F1 IS BACK. AND IT’S ALL TO DRIVE FOR.</p>
                  <div className="flex flex-row space-x-8 mt-4">
                    <Link href="/f1">Home</Link>
                    <Link href="/f1/drivers">Drivers</Link>
                    <Link href="/f1/rankings">Rankings</Link>
                  </div>
                </div>
                <div className="image relative w-[165px] h-[32px] lg:w-[600px] lg:h-full">
                  <Image
                    src="https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1682606473/Teams_1920x1080.jpg"
                    alt="F1 image"
                    fill
                    className="h-full w-full object-fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </Link>
          </div>

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
