import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import "../../styles/soccer.css";
type Props = {};

const index = (props: Props) => {
  return (
    <div className="mt-10">
      <SoccerBanner title=""></SoccerBanner>
      <div className="container mx-auto"></div>
    </div>
  );
};

export default index;
