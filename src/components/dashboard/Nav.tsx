import {
  BookHeart,
  CalendarHeart,
  LayoutGrid,
  Lightbulb,
  Mail,
} from "lucide-react";
import Logo from "../base/Logo";
import ThemeToggle from "../base/ThemeToggle";
import { NavLink, } from "react-router-dom";
import LogoutComponent from "../base/LogoutComponent";

function Nav() {
  const navTabs = [
    { link: "/dashboard", tab: "Dashboard", icon: LayoutGrid },
    { link: "/dashboard/dates", tab: "Dates", icon: CalendarHeart },
    { link: "/dashboard/ideas", tab: "Ideas", icon: Lightbulb },
    { link: "/dashboard/timeline", tab: "Timeline", icon: BookHeart },
    { link: "/dashboard/mail", tab: "Love Letter", icon: Mail },
  ];


  return (
    <nav className="md:w-3/12 bg-card md:h-screen md:border-r border-t border-accent/20 z-30 fixed md:top-0 w-screen bottom-0">
      <div className="border-b items-center md:flex hidden justify-between p-6">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="md:p-6 p-2  flex md:flex-col md:gap-4 justify-between items-center md:items-start flex-row">
        {navTabs.map(({ link, tab, icon: Icon }) => (
          <NavLink
            key={tab}
            to={link}
            end={link === "/dashboard"}
            className={({ isActive }) =>
              `flex gap-2 md:w-full w-fit  p-2 items-center rounded-lg transition ${
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

      <div className=" border-t  md:flex hidden  p-6  absolute bottom-0 w-full">
        <LogoutComponent/>
      </div>
    </nav>
  );
}

export default Nav;
