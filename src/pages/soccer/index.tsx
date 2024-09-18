import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import "../../styles/soccer.css";
type Props = {};

const index = (props: Props) => {
  return (
    <div className="">
      {/* <TopBar></TopBar> */}
      <div className="mt-5">
        <SoccerBanner title=""></SoccerBanner>
      </div>
      <div className="container mx-auto"></div>
    </div>
  );
};

export default index;
