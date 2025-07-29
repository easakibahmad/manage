import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import Navigation from "@/components/common/Navigation";

import { navLinks } from "@/constants/NavbarHome";

const NavbarHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <nav className="bg-black text-yellow-400 shadow-md py-3 z-50 relative">
      <div className="mx-auto px-4 flex items-center justify-between relative">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-yellow-400 rounded-lg hover:text-yellow-800 focus:outline-none cursor-pointer transition duration-300"
        >
          <Menu size={42} />
        </button>
        <Navigation to="/" label="Manage"/>
        <div className="w-8 h-8" />
      </div>

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        navLinks={navLinks}
      />
    </nav>
  );
};

export default NavbarHome;
