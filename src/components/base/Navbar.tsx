import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    setIsDark(!isDark);
    console.log(isDark, "isadark");
  };

  return (
    <main className="shadow-sm z-20 bg-white/30  backdrop-blur-xl fixed top-0 w-full">
      <nav className="flex justify-between mx-auto container w-11/12 py-3 items-center">
        <Logo />

        <div className=" gap-8 sm:flex hidden  text-sm font-light text-muted-foreground">
          <Link to={"/"}>Features</Link>
          <Link to={"/"}>How it works</Link>
          <Link to={"/"}>Timeline</Link>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant={"ghost"} onClick={handleToggle} className="px-0">
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          <Button variant={"ghost"} className="font-normal px-0">
            <Link to={"/auth"}> Sign In</Link>
          </Button>

          <Button className="font-normal">
            {" "}
            <Link to={"/auth"}> Get Started</Link>{" "}
          </Button>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
