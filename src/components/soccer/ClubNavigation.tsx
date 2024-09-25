import React from "react";

const ClubNavigation: React.FC = () => {
  const clubs = [
    {
      name: "Arsenal",
      url: "http://www.arsenal.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t3.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t3@x2.png",
    },
    {
      name: "Aston Villa",
      url: "https://www.avfc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t7.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t7@x2.png",
    },
    {
      name: "AFC Bournemouth",
      url: "https://www.afcb.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t91.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t91@x2.png",
    },
    {
      name: "Brentford",
      url: "https://www.brentfordfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t94.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t94@x2.png",
    },
    {
      name: "Brighton & Hove Albion",
      url: "https://www.brightonandhovealbion.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t36.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t36@x2.png",
    },
    {
      name: "Chelsea",
      url: "https://www.chelseafc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t8.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t8@x2.png",
    },
    {
      name: "Crystal Palace",
      url: "http://www.cpfc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t31.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t31@x2.png",
    },
    {
      name: "Everton",
      url: "http://www.evertonfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t11.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t11@x2.png",
    },
    {
      name: "Fulham",
      url: "https://www.fulhamfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t54.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t54@x2.png",
    },
    {
      name: "Ipswich Town",
      url: "https://www.itfc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t40.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t40@x2.png",
    },
    {
      name: "Leicester City",
      url: "https://www.lcfc.com/?lang=en?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t13.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t13@x2.png",
    },
    {
      name: "Liverpool",
      url: "http://www.liverpoolfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t14.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t14@x2.png",
    },
    {
      name: "Manchester City",
      url: "https://www.mancity.com?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t43.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t43@x2.png",
    },
    {
      name: "Manchester United",
      url: "http://www.manutd.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t1.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t1@x2.png",
    },
    {
      name: "Newcastle United",
      url: "https://www.nufc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t21.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t21@x2.png",
    },
    {
      name: "Nottingham Forest",
      url: "https://www.nffc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t17@x2.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t17@x2.png",
    },
    {
      name: "Southampton",
      url: "https://www.sufc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t20@x2.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t20@x2.png",
    },
    {
      name: "Tottenham Hotspur",
      url: "https://www.tottenhamhotspur.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t6@x2.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t6@x2.png",
    },
    {
      name: "West Ham United",
      url: "https://www.whufc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t4.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t4@x2.png",
    },
    {
      name: "Wolverhampton Wanderers",
      url: "https://www.wolves.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
      badge:
        "https://resources.premierleague.com/premierleague/badges/50/t39@x2.png",
      badge2x:
        "https://resources.premierleague.com/premierleague/badges/50/t39@x2.png",
    },
  ];

  return (
    <nav
      className="clubNavigation js-club-navigation !fixed z-40 bg-soccerMainBanner"
      role="menubar"
    >
      <h4 className="clubSitesHeading flex items-center">
        Club Sites
        <svg
          className="clubSitesIcon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.293 8l4.293 4.293L8 12l-4-4 4-4 1.586 1.586L4.293 8z" />
        </svg>
      </h4>
      <ul className="clubList flex flex-row gap-2">
        {clubs.map((club) => (
          <li key={club.name}>
            <a href={club.url} className="flex items-center gap-2">
              <img
                src={club.badge}
                srcSet={`${club.badge2x} 2x`}
                alt={`${club.name} badge`}
                className="h-8 w-8"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ClubNavigation;
