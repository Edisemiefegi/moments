import {
  BookHeart,
  CalendarHeart,
  LayoutGrid,
  Lightbulb,
  LogOut,
  Mail,
} from "lucide-react";
import Logo from "../base/Logo";
import ThemeToggle from "../base/ThemeToggle";
import { NavLink } from "react-router-dom";

function Nav() {
  const navTabs = [
    { link: "/dashboard", tab: "Dashboard", icon: LayoutGrid },
    { link: "/dashboard/dates", tab: "Dates", icon: CalendarHeart },
    { link: "/dashboard/ideas", tab: "Ideas", icon: Lightbulb },
    { link: "/dashboard/timeline", tab: "Timeline", icon: BookHeart },
    { link: "/dashboard/loveletters", tab: "Love Letter", icon: Mail },
  ];

  return (
    <nav className="md:w-2/6 bg-card md:h-screen md:border-r border-t border-accent/20 fixed md:top-0 w-screen bottom-0">
      <div className="border-b items-center md:flex hidden justify-between p-6">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="md:p-6 p-2 flex md:flex-col md:gap-4 justify-between items-center md:items-start flex-row">
        {navTabs.map(({ link, tab, icon: Icon }) => (
          <NavLink
            key={tab}
            to={link}
            end={link === "/dashboard"}
            className={({ isActive }) =>
              `flex gap-2 w-full p-2 items-center rounded-lg transition ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text hover:bg-secondary/40"
              }`
            }
          >
            <Icon size={18} />
            <p className="md:block hidden">{tab}</p>
          </NavLink>
        ))}
      </div>

      <div className="border-t md:flex hidden text-text p-6 gap-2 absolute bottom-0 w-full">
        <LogOut size={18} />
        <p>Sign Out</p>
      </div>
    </nav>
  );
}

export default Nav;