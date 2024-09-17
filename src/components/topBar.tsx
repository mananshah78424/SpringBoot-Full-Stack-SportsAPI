import Link from "next/link";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <div className="container mx-auto mt-4 flex flex-row justify-between !font-f1NavbarFont">
      <Link href={"/"}>
        <p className="flex-1"> Home </p>
      </Link>
      <div className="flex flex-row justify-between space-x-4">
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

export default TopBar;
