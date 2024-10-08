import Link from "next/link";
import React from "react";
import "../../styles/f1.css";
import MainBar from "../MainNavBar";
import ClubNavigation from "./ClubNavigation";

const SoccerNavbar: React.FC = () => {
  return (
    <div className="h-[11rem]">
      <div className="h-[4rem]">
        <MainBar></MainBar>
      </div>
      <div className="h-[4rem]">
        <ClubNavigation></ClubNavigation>
      </div>

      <nav
        className="subNav js-sub-nav w-full bg-white p-4 fixed z-40 h-[3rem] flex items-center justify-center font-PremierSans tracking-[5px]"
        role="menubar"
      >
        <ul className="flex flex-wrap justify-start space-x-4 text-[#76766f]  text-PremierSans">
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 text-PremierSans h-full flex items-center px-2 text-[1.2rem] tracking-[2px] font-normal"
              data-link-index="0"
              role="menuitem"
            >
              Home
            </Link>
          </li>
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer/teams"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 h-full flex items-center px-2 text-[1.2rem]"
              data-link-index="0"
              role="menuitem"
            >
              Teams
            </Link>
          </li>
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer/fixtures"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 h-full flex items-center px-2 text-[1.2rem]"
              data-link-index="0"
              role="menuitem"
            >
              Fixtures
            </Link>
          </li>
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer/standings"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 h-full flex items-center px-2 text-[1.2rem]"
              data-link-index="0"
              role="menuitem"
            >
              Standings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SoccerNavbar;
