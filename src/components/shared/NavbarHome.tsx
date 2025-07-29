import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavbarHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);

  const links = [
    { to: "/admin", label: "Admin" },
    { to: "/teams", label: "Teams" },
    { to: "/tasks", label: "Tasks" },
    { to: "/billing", label: "Billing" },
    { to: "/content", label: "Content" },
    { to: "/about", label: "About" },
  ];

  const filteredLinks = links.filter((link) =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <nav className="bg-black text-yellow-400 shadow-md py-3 z-50 relative">
      <div className="mx-auto px-4 flex items-center justify-between relative">
        {/* Menu button */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-yellow-400 hover:text-yellow-300 focus:outline-none cursor-pointer"
        >
          <Menu size={28} />
        </button>

        {/* Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="hover:underline">
            <h1 className="text-xl font-bold">Manage</h1>
          </Link>
        </div>

        {/* Placeholder space */}
        <div className="w-8 h-8" />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-yellow-400 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Search input */}
        <div className="p-4 border-b border-yellow-400">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded text-yellow-400 bg-black border border-yellow-400 focus:outline-none"
          />
        </div>

        {/* Links list */}
        <div className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setSidebarOpen(false)} // close sidebar on click
                    className="block px-4 py-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-yellow-300">No match</li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
