import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavbarHome = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
        ) {
        setOpenDropdown(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <nav className="bg-black text-yellow-400 shadow-md py-3 z-10">
      <div className="mx-auto px-4 flex items-center justify-between relative">
        <div className="flex items-center relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="text-yellow-400 hover:text-yellow-300 focus:outline-none cursor-pointer"
          >
            <Menu size={28} />
          </button>

          {openDropdown && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-black border border-yellow-400 font-bold rounded shadow-md z-20">
              <ul className="py-1">
                <li>
                  <Link
                    to="/teams"
                    className="block px-4 py-2 transition  hover:underline"
                  >
                    Teams
                  </Link>
                  <Link
                    to="/tasks"
                    className="block px-4 py-2 transition  hover:underline"
                  >
                    Tasks
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <div className="">
            <h1 className="text-xl font-bold">Manage</h1>
            </div>
        </Link>

        <div className="w-8 h-8" />
      </div>
    </nav>
  );
};

export default NavbarHome;
