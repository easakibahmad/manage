import { useRef } from "react";

import Navigation from "@/components/common/Navigation";

import { useClickOutside } from "@/custom_hooks/common";
import type { SidebarProps } from "@/types/Navbar";

const Sidebar: React.FC<SidebarProps> = ({
  open,
  setOpen,
  searchTerm,
  setSearchTerm,
  navLinks,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useClickOutside(sidebarRef, () => setOpen(false), open);

  const filteredLinks = navLinks.filter((link) =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-black z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } flex flex-col`}
    >
      <div className="p-4">
        <input
          type="text"
          placeholder="SEARCH..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-black border-b border-yellow-400 text-yellow-400 font-bold rounded focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="py-2 space-y-4 px-4 flex flex-col justify-center items-center">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <li key={link.to}>
                <Navigation
                  to={link.to}
                  label={link.label}
                  setOpen={setOpen}
                />
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-yellow-300">No match</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
