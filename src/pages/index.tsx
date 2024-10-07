import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import MainBar from "../components/MainNavBar";
import { Article, scrapeNews } from "../services/f1/getF1News";
import { getFromCache, saveToCache } from "../services/General/Caching";
import { scrapeMainScreenNews } from "../services/soccer/newsScarper";

type Props = {};
const index = 0;
const Index = (props: Props) => {
  const images = [
    "https://drop-assets.ea.com/images/2N1pVhNm2IvimaZ5VwWppY/6f5452953164520a0e12add363b794f7/UT-POS_v03_8K_LR_16x9_Jun27_3D.jpg?im=AspectCrop=(16,9),xPosition=0.5114583333333333,yPosition=0.525&w=1280",
    "https://images.pexels.com/photos/2127038/pexels-photo-2127038.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1905009/pexels-photo-1905009.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ];
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [f1News, setF1News] = useState<Article[]>([]);
  const [soccerNews, setSoccerNews] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLiveF1news = async () => {
      try {
        const f1newsFromCache = getFromCache("f1news");
        const soccerNewsFromCache = getFromCache("soccerNews");
        if (f1newsFromCache) {
          setF1News(f1newsFromCache);
        } else {
          const f1NewsResponse = await scrapeNews();
          setF1News(f1NewsResponse);
          saveToCache("f1news", f1NewsResponse, 1000 * 60 * 60);
        }

        if (soccerNewsFromCache) {
          setSoccerNews(soccerNewsFromCache);
        } else {
          const soccerNewsResponse = await scrapeMainScreenNews();
          setSoccerNews(soccerNewsResponse);
          saveToCache(
            "soccerNewsFromCache",
            soccerNewsResponse,
            1000 * 60 * 60
          );
        }
      } catch {
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };
    getLiveF1news();
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen h-full indexpage bg-black">
      <MainBar></MainBar>
      {isVisible && (
        <div className="fixed top-4 right-4 w-[70%] lg:w-160 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-50">
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

      <div className="bg-carbonBlack text-white w-full flex flex-col lg:mt-10">
        <section className="relative mx-auto max-w-full px-[10px] flex place-items-center place-content-center !max-w-none !p-0 h-[180px] lg:h-[570px] overflow-hidden mb-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[180px] before:mobile:h-[215px] before:lg:h-[570px] before:desktopWide:h-[450px] before:bg-carbonBlack/50">
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
              <Link href={"/f1/fixtures"}>
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
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-[50%]">
            <h1 className="px-[3rem] font-f1NavbarFont text-[2rem]">
              Formula One News
            </h1>
            <div className="flex flex-row flex-wrap  py-[2rem] px-[3rem]">
              {f1News &&
                f1News.slice(0, 4).map((news, index) => {
                  const isLastChild = (index + 1) % 2 === 0; // Adjust according to the number of columns in your layout
                  return (
                    <Link href={news.link} key={index} className="">
                      <section className="w-[300px] mb-[2rem]">
                        {/* Container for image */}
                        <div
                          className={`w-full h-[200px] ${
                            !isLastChild ? "lg:pr-8" : ""
                          }`}
                        >
                          <img
                            src={news.imageSrc}
                            className="w-full h-full object-cover rounded-xl"
                            alt={news.title}
                          />
                        </div>
                        <p className="text-sm font-400 my-4 lg:pr-8 font-f1NavbarFont">
                          {news.title}
                        </p>
                      </section>
                    </Link>
                  );
                })}
            </div>
          </div>

          <div className="w-full lg:!w-[50%] lg:py-[2rem] lg:pr-[4rem] h-full">
            <div className="container mx-auto my-4 h-full">
              {f1News ? (
                f1News.slice(5, 6).map((news, index) => (
                  <Link href={news.link} key={index}>
                    <div className="w-full p-4">
                      {/* Container for image */}
                      <div className="w-full h-[31rem]">
                        <img
                          src={news.imageSrc}
                          className="w-full h-full lg:object-cover rounded-xl"
                          alt={news.title}
                        />
                      </div>
                      {/* Container for text */}
                      <p className="font-400 my-4 pr-8 font-f1NavbarFont text-[1.4rem]">
                        {news.title}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <Loading></Loading>
              )}
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="bg-carbonBlack text-white w-full flex flex-col lg:mt-10">
        <section className="relative max-w-full px-[10px] flex place-items-center place-content-center !max-w-none !p-0 h-[180px] lg:h-[570px] overflow-hidden mb-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[180px] before:mobile:h-[215px] before:lg:h-[570px] before:desktopWide:h-[450px] before:bg-carbonBlack/50">
          <h1 className="font-formula text-left text-carbonBlack text-32 lg:text-[3.875rem] absolute text-white font-f1NavbarFont font-black">
            <Link href={"/soccer"}>Soccer </Link>
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
            src="https://i.pinimg.com/564x/ae/3b/04/ae3b04323e82e3097101abbcd2590616.jpg"
            pinger-seen="true"
          ></img>
        </section>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-[50%] min-w-[50%]">
            <h1 className="px-[3rem] font-f1NavbarFont text-[2rem]">
              Soccer News
            </h1>
            <div className="flex flex-row flex-wrap  py-[2rem] px-[3rem]">
              {!loading ? (
                soccerNews.slice(0, 4).map((news, index) => {
                  const isLastChild = (index + 1) % 2 === 0; // Adjust according to the number of columns in your layout
                  return (
                    <Link href={news.link} key={index} className="">
                      <section className="w-[300px] mb-[2rem]">
                        {/* Container for image */}
                        <div
                          className={`w-full h-[200px] ${
                            !isLastChild ? "lg:pr-8" : ""
                          }`}
                        >
                          <img
                            src={news.imageSrc}
                            className="w-full h-full object-cover rounded-xl"
                            alt={news.title}
                          />
                        </div>
                        <p className="text-sm font-400 my-4 lg:pr-8 font-f1NavbarFont">
                          {news.title}
                        </p>
                      </section>
                    </Link>
                  );
                })
              ) : (
                <section className="h-[100px] w-[300px] mb-[2rem]">
                  <Loading />
                </section>
              )}
            </div>
          </div>

          <div className="w-full lg:!w-[50%] lg:py-[2rem] lg:pr-[4rem] h-full">
            <div className="container mx-auto my-4 h-full">
              {soccerNews ? (
                soccerNews.slice(5, 6).map((news, index) => (
                  <Link href={news.link} key={index}>
                    <div className="w-full p-4">
                      {/* Container for image */}
                      <div className="w-full h-[31rem]">
                        <img
                          src={news.imageSrc}
                          className="w-full h-full lg:object-cover rounded-xl"
                          alt={news.title}
                        />
                      </div>
                      {/* Container for text */}
                      <p className="font-400 my-4 pr-8 font-f1NavbarFont text-[1.4rem]">
                        {news.title}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <Loading></Loading>
              )}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
