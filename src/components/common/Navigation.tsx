import type { NavigationProps } from '@/types/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC<NavigationProps> = ({ to, label, setOpen }) => {
  return (
    <Link
      to={to}
      onClick={() => setOpen?.(false)}
      className="font-bold text-xl uppercase hover:text-yellow-800 hover:border-b-4 border-yellow-800 transition duration-300"
    >
      {label}
    </Link>
  );
};

export default Navigation;
