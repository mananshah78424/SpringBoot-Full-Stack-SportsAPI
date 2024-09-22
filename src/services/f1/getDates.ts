export const getRaceDates = async (race: any, type?: any): Promise<any> => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    if (type === "month") {
      const raceDateString = race.response[0].date;

      const monthValue = parseInt(
        raceDateString.split("T")[0].split("-")[1],
        10
      );
      const monthName = monthNames[monthValue - 1];

      return monthName;
    } else {
      const raceDateString = race.response[0].date;

      const dayValue = parseInt(raceDateString.split("T")[0].split("-")[2], 10);
      console.log("Day value is", dayValue);

      return dayValue;
    }
  } catch (error) {
    console.error("Error getting day value");
  }
};
