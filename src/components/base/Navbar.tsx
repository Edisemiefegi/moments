import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  
  return (
    <main className="shadow-sm z-20 bg-white/30  backdrop-blur-xl fixed top-0 w-full">
      <nav className="flex justify-between mx-auto container w-11/12 py-3 items-center">
        <Logo />

        <div className=" gap-8 sm:flex hidden dark:text-white  text-sm font-light text-muted-foreground">
          <Link to={"/"}>Features</Link>
          <Link to={"/"}>How it works</Link>
          <Link to={"/"}>Timeline</Link>
        </div>
        <div className="flex gap-2 items-center">
        
          <ThemeToggle/>
          <Button variant={"ghost"} className="font-normal px-0">
            <Link to="/auth?tab=signin"> Sign In</Link>
          </Button>

          <Button className="font-normal">
            {" "}
            <Link to="/auth?tab=signup"> Get Started</Link>{" "}
          </Button>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
