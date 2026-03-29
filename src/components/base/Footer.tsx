import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mx-auto items-center pt-6 gap-6 p-2 container flex justify-between  ">
      <div className="flex md:items-center w-full justify-between md:flex-row flex-col">
        <Logo />
        <p className="text-xs text-text">
          Made with ♥ for people who love making memories
        </p>
      </div>
      <div className="flex gap-4 text-xs text-text">
        <p>Privacy</p>
        <p>Terms</p>
        <p>Contact</p>
      </div>
    </footer>
  );
}
