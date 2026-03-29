import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto pt-6 gap-6 p-2 container flex justify-between  ">
      <span className="flex gap-2">
        <Heart fill="#e34a6f" stroke="0" />
        <p className="font-medium">
          Mo<span className="text-accent">ments</span>
        </p>
      </span>
      <p className="text-xs text-text">
        Made with ♥ for people who love making memories
      </p>
      <div className="flex flex-col sm:flex-row gap-4 text-xs text-text">
        <p>Privacy</p>
        <p>Terms</p>
        <p>Contact</p>
      </div>
    </footer>
  );
}
