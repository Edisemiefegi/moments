import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  
  return (
    <main className="shadow-sm z-20 bg-white/30  backdrop-blur-xl fixed top-0 w-full">
      <nav className="flex justify-between mx-auto container w-11/12 py-3 items-center">
        <Logo />

        <div className=" gap-8 sm:flex hidden dark:text-white  text-sm font-light text-muted-foreground">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#timeline">Timeline</a>
        </div>
        <div className="flex gap-2 items-center">
        
          <ThemeToggle/>
          <Link
            to="/auth?tab=signin"
            className={buttonVariants({ variant: "ghost", className: "font-normal" })}
          >
            Sign In
          </Link>

          <Link
            to="/auth?tab=signup"
            className={buttonVariants({ className: "font-normal" })}
          >
            Get Started
          </Link>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
