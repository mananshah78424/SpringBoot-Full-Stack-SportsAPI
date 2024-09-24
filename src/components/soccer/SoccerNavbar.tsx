import Link from "next/link";
import React from "react";
import "../../styles/f1.css";
import MainBar from "../MainNavBar";

const SoccerNavbar: React.FC = () => {
  return (
    <div className="">
      <MainBar></MainBar>
      <nav
        className="subNav js-sub-nav w-full bg-white p-4 fixed top-6 z-40"
        role="menubar"
      >
        <ul className="flex flex-wrap justify-start space-x-4 text-[#76766f] pl-[5.5rem] h-[2.2rem] font-bold text-SoccerText">
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 text-SoccerText h-full flex items-center px-2 text-[0.9rem]"
              data-link-index="0"
              role="menuitem"
            >
              Home
            </Link>
          </li>
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer/teams"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 h-full flex items-center px-2 text-[0.9rem]"
              data-link-index="0"
              role="menuitem"
            >
              Teams
            </Link>
          </li>
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer/fixtures"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 h-full flex items-center px-2 text-[0.9rem]"
              data-link-index="0"
              role="menuitem"
            >
              Fixtures
            </Link>
          </li>
          <li data-nav-index="0" className="h-full">
            <Link
              href="/soccer/table"
              className="text-[#76766f] hover:text-gray-400 active:text-yellow-500 h-full flex items-center px-2 text-[0.9rem]"
              data-link-index="0"
              role="menuitem"
            >
              Table
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SoccerNavbar;
