interface NextRace {
  id: number;
  competition: {
    name: string;
    location: {
      country: string;
      city: string;
    };
  };
  season: number;
  data: any;
  type: string;
  distance: string;
  status: string;
  date: string;
  timezone: string;
  circuit: {
    name: string;
    image: string;
  };
  laps: {
    total: number;
  };
}
export const checkIfRaceIsToday = async (race: NextRace): Promise<any> => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];
    const raceDate = new Date(race.date).toISOString().split("T")[0];
    // console.log("Todays date is", todayDate);
    if (raceDate === todayDate) {
      console.log("Hello, the race is today!");
    } else {
      console.log("The race is not today.");
    }
  } catch (error) {}
};
