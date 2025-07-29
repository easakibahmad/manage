type NavLink = {
  to: string;
  label: string;
};

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  navLinks: NavLink[];
};

type NavigationProps = {
  to: string;
  label: string;
  setOpen?: (open: boolean) => void;
};

export type { NavLink, SidebarProps, NavigationProps };