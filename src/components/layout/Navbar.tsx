import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap  p-1  p-5 absolute z-20 w-full shadow-md">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl text-white tracking-tight ml-5">
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <img src="/logo.png" className="h-6" alt="" /> DAOFactoring
            </div>
          </Link>
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-white">
        <div className="border-l border-gray-300/25 pl-4 text-gray-300">
          <Link href="/app/create">create invoice</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
