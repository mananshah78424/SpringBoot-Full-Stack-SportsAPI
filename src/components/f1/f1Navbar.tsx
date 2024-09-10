import MyIcon from "@/src/images/F1_logo.svg"; // Update this path to your icon's location
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../../styles/f1.css";

const F1Navbar: React.FC = () => {
  return (
    <div className="w-full hidden nav-primary lg:block bg-primary pt-[70px] pb-[20px] lg:py-0 px-[10px] lg:h-[70px] mt-10">
      <nav className="m-auto w-full grid grid-cols-globalNavMobile lg:grid-cols-globalNavDesktop max-w-[1320px] h-full lg:px-[10px]">
        <nav className="f1-logo">
          <span>
            <Link href="/f1">
              <Image src={MyIcon} width={200} height={200} alt="F1 logo" />
            </Link>
          </span>
        </nav>
        <ul className="flex flex-row w-full h-full text-white">
          <li className="w-full h-full  ">
            <div className="w-full h-full flex items-center justify-center">
              <Link href="/f1/circuits">Circuits</Link>
            </div>
          </li>

          <li className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
              <Link href="/f1/rankings">Rankings</Link>
            </div>
          </li>
          <li className="w-full h-full  ">
            <div className="w-full h-full flex items-center justify-center">
              <Link href="/f1/fixtures">Calendar</Link>
            </div>
          </li>
          <li className="w-full h-full  ">
            <div className="w-full h-full flex items-center justify-center">
              <Link href="/f1/drivers">Drivers</Link>
            </div>
          </li>
        </ul>
        {/* <ul className="grid list-none gap-[4px] lg:gap-[0] p-0 px-0 lg:gird-cols-1 lg:grid-flow-col lg:auto-cols-max w-full lg:w-max lg:h-full">
          <li className="w-full lg:w-max relative">
            <Link
              className="grid grid-flow-col auto-cols-max rounded-5 cursor-pointer items-center transition-colors duration-200 font-titillium font-[600] w-full min-w-max lg:w-auto lg:text-center lg:auto-cols-auto focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[3px] focus-visible:outline-carbonBlack disabled:pointer-events-none disabled:opacity-75 disabled:cursor-default  grid h-full grid-cols-[auto_max-content] lg:grid-cols-[auto] text-12 lg:text-14 !font-formula w-full text-white border-pink py-[13px] rounded-none text-left px-[6px] lg:px-[12px] font-light lg:border-0  border-b rounded-br-xs lg:rounded-none relative lg:w-auto lg:border-0 lg:py-0 lg:px-[4px] lg:my-0 lg:h-full lg:text-center transition-all !outline-none "
              href="/f1/circuits"
            >
              Circuits
            </Link>
          </li>
          <li className="w-full lg:w-max relative">
            <Link
              className="grid grid-flow-col auto-cols-max rounded-5 cursor-pointer items-center transition-colors duration-200 font-titillium font-[600] w-full min-w-max lg:w-auto laptop:text-center laptop:auto-cols-auto focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[3px] focus-visible:outline-carbonBlack disabled:pointer-events-none disabled:opacity-75 disabled:cursor-default  grid h-full grid-cols-[auto_max-content] laptop:grid-cols-[auto] text-12 lg:text-14 !font-formula w-full text-white border-pink py-[13px] rounded-none text-left px-[6px] lg:px-[12px] font-light laptop:border-0  border-b rounded-br-xs laptop:rounded-none relative laptop:w-auto laptop:border-0 laptop:py-0 laptop:px-[4px] laptop:my-0 laptop:h-full laptop:text-center transition-all !outline-none "
              href="/f1/rankings"
            >
              Rankings
            </Link>
          </li>
          <li className="w-full lg:w-max relative">
            <Link
              className="grid grid-flow-col auto-cols-max rounded-5 cursor-pointer items-center transition-colors duration-200 font-titillium font-[600] w-full min-w-max laptop:w-auto laptop:text-center laptop:auto-cols-auto focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[3px] focus-visible:outline-carbonBlack disabled:pointer-events-none disabled:opacity-75 disabled:cursor-default  grid h-full grid-cols-[auto_max-content] laptop:grid-cols-[auto] text-12 lg:text-14 !font-formula w-full text-white border-pink py-[13px] rounded-none text-left px-[6px] lg:px-[12px] font-light laptop:border-0  border-b rounded-br-xs laptop:rounded-none relative laptop:w-auto laptop:border-0 laptop:py-0 laptop:px-[4px] laptop:my-0 laptop:h-full laptop:text-center transition-all !outline-none "
              href="/f1/drivers"
            >
              Drivers
            </Link>
          </li>
          <li className="w-full lg:w-max relative">
            <Link
              className="grid grid-flow-col auto-cols-max rounded-5 cursor-pointer items-center transition-colors duration-200 font-titillium font-[600] w-full min-w-max lg:w-auto laptop:text-center laptop:auto-cols-auto focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[3px] focus-visible:outline-carbonBlack disabled:pointer-events-none disabled:opacity-75 disabled:cursor-default  grid h-full grid-cols-[auto_max-content] laptop:grid-cols-[auto] text-12 lg:text-14 !font-formula w-full text-white border-pink py-[13px] rounded-none text-left px-[6px] lg:px-[12px] font-light laptop:border-0  border-b rounded-br-xs laptop:rounded-none relative laptop:w-auto laptop:border-0 laptop:py-0 laptop:px-[4px] laptop:my-0 laptop:h-full laptop:text-center transition-all !outline-none "
              href="/f1/drivers"
            >
              Fixtures
            </Link>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};

export default F1Navbar;
