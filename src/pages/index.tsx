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
        <div className="fixed top-4 right-4 w-[70%] lg:w-160 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-10">
          <span className="mr-4 text-[0.575rem] lg:text-[1rem]">
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
      <div className="mx-auto  h-[280px] lg:h-[700px] w-full">
        <div
          className={`relative flex justify-center items-center main-banner h-full bg-pl-banner bg-cover bg-left w-full bg-no-repeat before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[280px] before:mobile:h-[215px] before:lg:h-[700px] before:desktopWide:h-[450px] before:bg-carbonBlack/50`}
        >
          <h1 className="w-full text-center px-4 lg:px-0 lg:w-[80%] font-formula text-carbonBlack text-32 lg:text-[3.875rem] text-white font-f1NavbarFont font-black z-10">
            GET LIVE UPDATES ON EVERY SPORT!
          </h1>
        </div>
      </div>
      {isClient && (
        <div className=" mx-[auto] w-full text-black mt-10 space-y-[2rem] lg:space-y-[5rem] px-[40px] pb-20">
          <Link href={"/f1"}>
            <section className="relative mx-auto max-w-full px-[10px] flex place-items-center place-content-center !max-w-none !p-0 h-[180px] lg:h-[470px] overflow-hidden mb-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[180px] before:mobile:h-[215px] before:lg:h-[470px] before:desktopWide:h-[450px] before:bg-carbonBlack/50">
              <h1 className="font-formula text-left text-carbonBlack text-32 lg:text-[3.875rem] absolute text-white font-f1NavbarFont font-black">
                <Link href={"/f1"}>Formula 1</Link>
              </h1>
              <div className="font-formula text-left text-carbonBlack text-[0.475rem] lg:text-[1.475rem] absolute text-white font-f1NavbarFont font-black mt-[4rem] lg:mt-[10rem]">
                <ul className="list-none flex flex-row space-x-2 lg:space-x-8">
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
          </Link>

          <Link href={"/soccer"}>
            <section className="relative mx-auto max-w-full px-[10px] flex place-items-center place-content-center !max-w-none !p-0 h-[180px] lg:h-[470px] overflow-hidden mb-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[180px] before:mobile:h-[215px] before:lg:h-[470px] before:desktopWide:h-[450px] before:bg-carbonBlack/50">
              <h1 className="font-formula text-left text-carbonBlack text-32 lg:text-[3.875rem] absolute text-white font-f1NavbarFont font-black">
                Soccer
              </h1>
              <div className="font-formula text-left text-carbonBlack text-[0.475rem] lg:text-[1.475rem] absolute text-white font-f1NavbarFont font-black mt-[4rem] lg:mt-[10rem]">
                <ul className="list-none flex flex-row space-x-8">
                  <Link href={"/soccer/teams"}>
                    <li>Teams</li>
                  </Link>
                  <Link href={"/soccer/standings"}>
                    <li>Standings</li>
                  </Link>
                  <Link href={"/soccer/fixtures"}>
                    <li>Fixtures</li>
                  </Link>
                  {/* <Link href={"/soccer/drivers"}>
                    <li>Drivers</li>
                  </Link> */}
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
                src="https://i.pinimg.com/564x/5b/08/2d/5b082d29ce41c33b8bf53e567776f116.jpg"
                pinger-seen="true"
              ></img>
            </section>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
