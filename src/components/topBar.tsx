import Link from "next/link";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <div className="container mx-auto mt-4 flex flex-row justify-between">
      <Link href={"/"}>
        <p className="flex-1"> Home </p>
      </Link>
      <div className="flex flex-row justify-between space-x-4">
        <p>Soccer</p>
        <p>F1</p>
      </div>
    </div>
  );
};

export default TopBar;
