const axios = require("axios");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., Gmail, replace with your email provider
  auth: {
    user: "sportingsphereupdates@gmail.com", // your email address
    pass: "SportingSphereEmail1234@", // your email password (or use an app-specific password)
  },
});
exports.handler = async (event) => {
  try {
    const apiKey = process.env.API_KEY;
    const maps = ["1st Qualifying", "race"];
    const todayDate = new Date();
    const options = {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const pstDate = todayDate
      .toLocaleDateString("en-CA", options)
      .replace(/\//g, "-"); // Replace slashes with dashes
    console.log("Today's Date in PST:", pstDate);
    const dict = {};

    for (const map of maps) {
      const response = await axios.get(
        `https://springboot-full-stack-sportsapi.onrender.com/api/f1/races?season=2024&next=1&type=${map}&timezone=America/Los_Angeles`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
        }
      );

      const fixtures = response.data.response;

      if (fixtures.length > 0) {
        const fixture = fixtures[0]; // Get the first fixture
        const wholeDate = fixture.date;
        const fixtureDate = fixture.date.split("T")[0]; // Extract the date
        if (pstDate === fixtureDate) {
          dict[map] = fixture;
        }
        console.log(`Fixture Date for ${map}: ${fixtureDate} :${wholeDate}`);
      } else {
        console.log(`No fixtures found for ${map}`);
      }
    }

    const usersResponse = await axios.get(
      "https://springboot-full-stack-sportsapi.onrender.com/api/f1/allsubscribedusers"
    );
    const users = usersResponse.data;

    console.log(users);

    if (Object.keys(dict).length >= 0) {
      for (const user of users) {
        if (user.sport == "f1") {
          const mailOptions = {
            from: "sportingsphereupdates@gmail.com", // Sender address
            to: user.email, // List of recipients
            subject: "Upcoming F1 Race", // Subject line
            text: `Hello ${user.name},\n\nThere is an upcoming F1 race today. Don't miss it!\n\nBest regards,\nYour Sports Team`, //
          };

          // Send the email
          try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);
          } catch (error) {
            console.error(`Failed to send email to ${user.email}: ${error}`);
          }
        }
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Fixtures processed", data: dict }),
    };
  } catch (error) {
    console.error("Error fetching race data:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error fetching race data",
        error: error.message,
      }),
    };
  }
};
