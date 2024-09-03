import MyIcon from "@/src/images/F1_logo.svg"; // Update this path to your icon's location
import Image from "next/image";
import Link from "next/link";
import React from "react";

const F1Navbar: React.FC = () => {
  return (
    <div className="w-full p-4 f1-nav-primary flex items-center mx-auto justify-center lg:mt-[80px]">
      <div className="f1-logo">
        <span>
          <Image src={MyIcon} width={200} height={200} alt="F1 logo" />
        </span>
      </div>
      <div className="f1-primary-links text-white">
        <ul className="flex space-x-6">
          <li className="hover:text-gray-400 cursor-pointer">
            <Link href="/f1/circuits">Circuits</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer">
            <Link href="/f1/rankings">Rankings</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer">
            <Link href="/f1/drivers">Drivers</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default F1Navbar;
