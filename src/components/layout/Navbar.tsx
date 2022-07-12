import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap  p-1  p-5 absolute">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl text-white tracking-tight ml-5">DAOFactoring</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
    </nav>
  );
};

export default Navbar;
