import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import { fetchTeams } from "@/src/services/soccer/soccerService";
import { TeamResponse } from "@/src/types/soccer/teamsTypes";

interface FetchTeamsPage {
  teams: TeamResponse[];
}

const Teams: React.FC<FetchTeamsPage> = ({ teams }) => {
  return (
    <div>
      <SoccerBanner title="Teams" />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px]">
          <div className="flex justify-center items-center p-[1rem] w-full">
            <ul className="flex flex-wrap justify-center p-[1rem] max-w-[1400px] gap-[1.5rem]">
              {teams &&
                teams.map((team, index) => {
                  return (
                    <div
                      key={index}
                      className="outline outline-[0.1rem] outline-[#ebe5eb] rounded-[0.8rem] no-underline lg:w-[14.5rem] lg:h-[14rem] p-[1.2rem] flex flex-col justify-between"
                    >
                      <div className="card-badge">
                        <img
                          className="w-[7.8rem] h-[7.8rem]"
                          src={team.team.logo}
                        ></img>
                      </div>
                      <div className="card-info flex flex-row w-full justify-between flex-end">
                        <h2>{team.team.name}</h2>
                      </div>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetchTeams();
    // console.log("Data after fetching teams is", data);

    return { props: { teams: data.response } };
  } catch (error) {
    return { props: { error: "Failed to fetch circuits" } };
  }
}
export default Teams;
