import SoccerBanner from "@/src/components/soccer/SoccerBanner";
import TopBar from "@/src/components/TopBar";
import { fetchTeams } from "@/src/services/soccer/soccerService";
import { TeamResponse } from "@/src/types/soccer/teamsTypes";

interface FetchTeamsPage {
  teams: TeamResponse[];
}

const Teams: React.FC<FetchTeamsPage> = ({ teams }) => {
  return (
    <div>
      <TopBar></TopBar>
      <div className="mt-5">
        <SoccerBanner title="Teams" />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px]">
          <div className="flex justify-center items-center p-[1rem] w-full">
            <ul className="flex flex-wrap justify-center p-[1rem] max-w-[1400px] gap-[1.5rem]">
              {teams &&
                teams.map((team, index) => {
                  return (
                    <div
                      key={index}
                      className="outline outline-[0.1rem] outline-[#ebe5eb] rounded-[0.8rem] no-underline lg:w-[14.5rem] lg:h-[10rem] p-[1.2rem] flex flex-col justify-between"
                    >
                      <div className="card-badge">
                        <img
                          className="w-[3.8rem] h-[3.8rem]"
                          src={team.team.logo}
                        ></img>
                      </div>
                      <div className="card-info flex flex-row w-full justify-between flex-end items-center">
                        <h2 className="club-card__name">{team.team.name}</h2>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        >
                          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                        </svg>
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
