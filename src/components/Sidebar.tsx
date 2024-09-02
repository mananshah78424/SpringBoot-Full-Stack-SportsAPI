import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">My Sidebar</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/f1/circuits" className="hover:text-gray-400">
              F1 Circuits
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/other-page" className="hover:text-gray-400">
              Other Page
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
