import Link from "next/link";

type Props = {};

const MainBar = (props: Props) => {
  return (
    <div className="fixed top-0 w-full z-50 flex flex-row justify-between !font-f1NavbarFont bg-black h-[4rem] text-white">
      <Link href={"/"}>
        <p className="flex-1 pl-[2rem] mt-4"> Home </p>
      </Link>
      <div className="flex flex-row justify-between space-x-4 pr-[2rem] mt-4">
        <Link href={"/soccer"}>
          <p>Soccer</p>
        </Link>
        <Link href={"/f1"}>
          <p>F1</p>
        </Link>
      </div>
    </div>
  );
};

export default MainBar;
